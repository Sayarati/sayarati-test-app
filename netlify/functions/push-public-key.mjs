import { env, methodOptions, response } from "./shared.mjs";

export default async function handler(request) {
  const options = methodOptions(request);
  if (options) return options;
  if (request.method !== "GET") return response(405, { error: "Method not allowed" });

  const publicKey = env("WEB_PUSH_PUBLIC_KEY") || env("VAPID_PUBLIC_KEY");
  return response(200, { ok: Boolean(publicKey), publicKey });
}
