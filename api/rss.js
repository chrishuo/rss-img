export default async function handler(req, res) {
  const d = (s) => Buffer.from(s, "base64").toString("utf-8");
  
  const targetUrl = d("aHR0cHM6Ly93d3cuYm90YW53YW5nLmNvbS9yc3MueG1s");
  const replaceStr = d("c3JjPSQxaHR0cHM6Ly93c3J2Lm5sLz91cmw9aHR0cHM6Ly9ib3RhbndhbmcuY29tL3NpdGVzL2RlZmF1bHQvZmlsZXMv");
  const pattern = d("c3JjPSgmcXVvdDt8IikoPzpodHRwcz86Ly8oPzp3d3dcLik/Ym90YW53YW5nXC5jb20pPy9zaXRlcy9kZWZhdWx0L2ZpbGVzLw==");

  const response = await fetch(targetUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
  });
  let xml = await response.text();

  const regex = new RegExp(pattern, "g");
  xml = xml.replace(regex, replaceStr);

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.status(200).send(xml);
}
