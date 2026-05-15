import {
  bearerToken,
  dbOne,
  dbQuery,
  dbRows,
  methodOptions,
  readJson,
  response,
  verifySession,
} from "./shared.mjs";

export default async function handler(request) {
  const options = methodOptions(request);
  if (options) return options;

  const session = verifySession(bearerToken(request));
  if (!session?.sub) return response(401, { error: "Please sign in again" });

  if (request.method === "GET") return loadCustomerData(session.sub);
  if (request.method === "POST") return saveCustomerData(request, session.sub);
  return response(405, { error: "Method not allowed" });
}

async function loadCustomerData(customerId) {
  const [cars, records] = await Promise.all([
    dbRows("select * from cars where customer_id = $1 order by created_at desc", [customerId]),
    dbRows("select * from service_records where customer_id = $1 order by created_at desc", [customerId]),
  ]);

  const carIdByUuid = new Map(cars.map((car) => [car.id, car.client_id || car.id]));

  return response(200, {
    ok: true,
    cars: cars.map((car) => ({
      id: car.client_id || car.id,
      brand: car.brand || "",
      model: car.model || "",
      year: car.year || "",
      plate: car.plate || "",
      mileage: car.mileage || "",
      vin: car.vin || "",
      notes: car.notes || "",
      photo: parseJson(car.photo_path),
    })),
    records: records.map((record) => ({
      id: record.client_id || record.id,
      carId: carIdByUuid.get(record.car_id) || record.car_id,
      date: formatDate(record.service_date),
      mechanicName: record.mechanic_name || "",
      mileage: record.mileage || "",
      serviceType: record.service_type || "",
      serviceTypes: record.service_types || [],
      oilViscosity: record.oil_viscosity || "",
      oilLiters: record.oil_liters || "",
      brakePadPosition: record.brake_pad_position || "",
      otherServiceDetails: record.other_service_details || "",
      parts: record.parts || "",
      cost: record.cost || "",
      nextDue: formatDate(record.next_due),
      nextServiceNote: record.next_service_note || "",
      invoice: record.invoice_path || "",
      partPhotos: record.part_photo_paths || [],
      notes: record.notes || "",
    })),
  });
}

async function saveCustomerData(request, customerId) {
  const body = await readJson(request);
  const cars = Array.isArray(body.cars) ? body.cars : [];
  const records = Array.isArray(body.records) ? body.records : [];

  const keptCarClientIds = cars.map((car) => String(car.id || "")).filter(Boolean);
  const keptRecordClientIds = records.map((record) => String(record.id || "")).filter(Boolean);
  const carUuidByClientId = new Map();

  for (const car of cars) {
    const clientId = String(car.id || "");
    if (!clientId) continue;
    const savedCar = await dbOne(`
      insert into cars (customer_id, client_id, brand, model, year, plate, mileage, vin, notes, photo_path, updated_at)
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now())
      on conflict (customer_id, client_id)
      do update set
        brand = excluded.brand,
        model = excluded.model,
        year = excluded.year,
        plate = excluded.plate,
        mileage = excluded.mileage,
        vin = excluded.vin,
        notes = excluded.notes,
        photo_path = excluded.photo_path,
        updated_at = now()
      returning id, client_id
    `, [
      customerId,
      clientId,
      car.brand || "Other",
      car.model || "Other",
      car.year || null,
      car.plate || null,
      toInteger(car.mileage),
      car.vin || null,
      car.notes || null,
      car.photo ? JSON.stringify(car.photo) : null,
    ]);
    if (savedCar) carUuidByClientId.set(savedCar.client_id, savedCar.id);
  }

  for (const record of records) {
    const clientId = String(record.id || "");
    const carUuid = carUuidByClientId.get(String(record.carId || ""));
    if (!clientId || !carUuid) continue;
    await dbQuery(`
      insert into service_records (
        customer_id, car_id, client_id, service_date, mechanic_name, mileage, service_type, service_types,
        oil_viscosity, oil_liters, brake_pad_position, other_service_details, parts, cost,
        next_due, next_service_note, invoice_path, part_photo_paths, notes, updated_at
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18::jsonb, $19, now())
      on conflict (customer_id, client_id)
      do update set
        car_id = excluded.car_id,
        service_date = excluded.service_date,
        mechanic_name = excluded.mechanic_name,
        mileage = excluded.mileage,
        service_type = excluded.service_type,
        service_types = excluded.service_types,
        oil_viscosity = excluded.oil_viscosity,
        oil_liters = excluded.oil_liters,
        brake_pad_position = excluded.brake_pad_position,
        other_service_details = excluded.other_service_details,
        parts = excluded.parts,
        cost = excluded.cost,
        next_due = excluded.next_due,
        next_service_note = excluded.next_service_note,
        invoice_path = excluded.invoice_path,
        part_photo_paths = excluded.part_photo_paths,
        notes = excluded.notes,
        updated_at = now()
    `, [
      customerId,
      carUuid,
      clientId,
      record.date || null,
      record.mechanicName || null,
      toInteger(record.mileage),
      record.serviceType || "",
      record.serviceTypes || [],
      record.oilViscosity || null,
      toNumber(record.oilLiters),
      record.brakePadPosition || null,
      record.otherServiceDetails || null,
      record.parts || null,
      toNumber(record.cost),
      record.nextDue || null,
      record.nextServiceNote || null,
      record.invoice || null,
      JSON.stringify(record.partPhotos || []),
      record.notes || null,
    ]);
  }

  if (keptRecordClientIds.length) {
    await dbQuery("delete from service_records where customer_id = $1 and not (client_id = any($2::text[]))", [customerId, keptRecordClientIds]);
  } else {
    await dbQuery("delete from service_records where customer_id = $1", [customerId]);
  }

  if (keptCarClientIds.length) {
    await dbQuery("delete from cars where customer_id = $1 and not (client_id = any($2::text[]))", [customerId, keptCarClientIds]);
  } else {
    await dbQuery("delete from cars where customer_id = $1", [customerId]);
  }

  return response(200, { ok: true });
}

function toInteger(value) {
  const number = Number(String(value || "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(number) ? Math.round(number) : null;
}

function toNumber(value) {
  const number = Number(String(value || "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(number) ? number : null;
}

function parseJson(value) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function formatDate(value) {
  if (!value) return "";
  if (typeof value === "string") return value.slice(0, 10);
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return "";
}
