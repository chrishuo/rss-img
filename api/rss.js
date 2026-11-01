export default async function handler(req, res) {
  const d = (s) => Buffer.from(s, "base64").toString("utf-8");

  const urls = [
    d("aHR0cHM6Ly9mZWVkLWNyYWZ0LmNvbGlueC5vbmUvY3JhZnQvcHJveHk/aW5wdXRfdXJsPWh0dHBzOi8vYm90YW53YW5nLmNvbS9yc3MueG1s"),
    d("aHR0cHM6Ly9tb3Jzcy5pdC9odHRwczovL2JvdGFud2FuZy5jb20vcnNzLnhtbA=="),
    d("aHR0cHM6Ly9hcGkuYWxsb3JpZ2lucy53aW4vcmF3P3VybD1odHRwcyUzQSUyRiUyRmJvdGFud2FuZy5jb20lMkZyc3MueG1s"),
    d("aHR0cHM6Ly9ib3RhbndhbmcuY29tL3Jzcy54bWw=")
  ];

  let xml = "";
  for (const u of urls) {
    try {
      const r = await fetch(u, {
        headers: {
          "User-Agent": "FeedFetcher-Google; (+http://google.com)",
          "Accept": "application/rss+xml, application/xml, text/xml, */*"
        }
      });
      const t = await r.text();
      if (t.includes("<rss") || t.includes("<channel>")) {
        xml = t;
        break;
      }
    } catch (e) {}
  }

  const replaceStr = d("c3JjPSQxaHR0cHM6Ly93c3J2Lm5sLz91cmw9aHR0cHM6Ly9ib3RhbndhbmcuY29tL3NpdGVzL2RlZmF1bHQvZmlsZXMv");
  const pattern = d("c3JjPSgmcXVvdDt8IikoPzpodHRwcz86Ly8oPzp3d3dcLik/Ym90YW53YW5nXC5jb20pPy9zaXRlcy9kZWZhdWx0L2ZpbGVzLw==");

  const regex = new RegExp(pattern, "g");
  xml = xml.replace(regex, replaceStr);

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
  res.status(200).send(xml);
}
