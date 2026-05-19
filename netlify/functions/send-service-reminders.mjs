import webpush from "web-push";
import {
  dbQuery,
  dbRows,
  env,
  response,
} from "./shared.mjs";

export const config = {
  schedule: "0 6 * * *",
};

export default async function handler() {
  try {
    const publicKey = env("WEB_PUSH_PUBLIC_KEY") || env("VAPID_PUBLIC_KEY");
    const privateKey = env("WEB_PUSH_PRIVATE_KEY") || env("VAPID_PRIVATE_KEY");
    if (!publicKey || !privateKey) return response(200, { ok: false, error: "Missing Web Push keys" });

    webpush.setVapidDetails(
      env("WEB_PUSH_SUBJECT") || "mailto:sayarati.online@zayoun.com",
      publicKey,
      privateKey,
    );

    const today = lebanonDate();
    const dueRecords = await dbRows(`
      select
        sr.id as record_id,
        sr.customer_id,
        sr.next_due,
        sr.next_service_note,
        c.brand,
        c.model,
        c.plate
      from service_records sr
      join cars c on c.id = sr.car_id
      where sr.next_due = $1
        and not exists (
          select 1
          from service_due_push_log log
          where log.record_id = sr.id
            and log.due_date = sr.next_due
        )
      limit 1000
    `, [today]);

    let sent = 0;
    let skipped = 0;
    let failed = 0;

    for (const record of dueRecords) {
      const subscriptions = await dbRows(`
        select endpoint, subscription
        from push_subscriptions
        where customer_id = $1
      `, [record.customer_id]);

      if (!subscriptions.length) {
        skipped += 1;
        continue;
      }

      const title = "Sayarati service reminder";
      const car = [record.brand, record.model, record.plate].filter(Boolean).join(" ");
      const body = record.next_service_note
        ? `${car}: ${record.next_service_note}`
        : `${car}: your next service is due today.`;

      let sentForRecord = 0;
      for (const item of subscriptions) {
        try {
          await webpush.sendNotification(item.subscription, JSON.stringify({
            title,
            body,
            url: "/",
          }));
          sent += 1;
          sentForRecord += 1;
          await dbQuery("update push_subscriptions set last_success_at = now(), last_error = null where endpoint = $1", [item.endpoint]);
        } catch (error) {
          failed += 1;
          const statusCode = error?.statusCode || 0;
          if (statusCode === 404 || statusCode === 410) {
            await dbQuery("delete from push_subscriptions where endpoint = $1", [item.endpoint]);
          } else {
            await dbQuery("update push_subscriptions set last_error = $2 where endpoint = $1", [item.endpoint, error?.message || "Push failed"]);
          }
        }
      }

      if (sentForRecord > 0) {
        await dbQuery(`
          insert into service_due_push_log (customer_id, record_id, due_date)
          values ($1, $2, $3)
          on conflict (record_id, due_date) do nothing
        `, [record.customer_id, record.record_id, record.next_due]);
      }
    }

    return response(200, { ok: true, date: today, due: dueRecords.length, sent, skipped, failed });
  } catch (error) {
    return response(500, { error: error.message || "Could not send service reminders" });
  }
}

function lebanonDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Beirut",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (type) => parts.find((part) => part.type === type)?.value || "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}
