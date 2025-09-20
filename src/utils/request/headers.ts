export function forwardRequestHeaders(req: Request): Record<string, string> {
  const headers: Record<string, string> = {};

  req.headers.forEach((value, key) => {
    if (["host", "connection", "content-length"].includes(key.toLowerCase())) {
      return;
    }
    headers[key] = value;
  });

  return headers;
}
