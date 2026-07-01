# Post-Deployment Actions

Use this after deploying production changes to Vercel.

## Immediate Verification

```bash
vercel inspect <deployment-url>
curl -I https://robinfrancis.in/
curl -I https://www.robinfrancis.in/
```

Confirm:

- Deployment status is `READY`.
- `robinfrancis.in` and `www.robinfrancis.in` are aliased to the latest deployment.
- Response is `200`.
- CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, Referrer Policy, and Permissions Policy are present.

## Route Smoke Test

Open or curl:

- [https://robinfrancis.in/](https://robinfrancis.in/)
- [https://robinfrancis.in/projects/](https://robinfrancis.in/projects/)
- [https://robinfrancis.in/blog/](https://robinfrancis.in/blog/)
- [https://robinfrancis.in/gallery/](https://robinfrancis.in/gallery/)
- [https://robinfrancis.in/card/](https://robinfrancis.in/card/)
- [https://robinfrancis.in/blog/ieee-r10-volunteer-award/](https://robinfrancis.in/blog/ieee-r10-volunteer-award/)

## Crawl Checks

Run a quick page-source check when SEO files or route metadata changed:

```bash
python3 - <<'PY'
from html.parser import HTMLParser
from urllib.request import urlopen

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta = []
        self.h = []
        self.cur = None
        self.links = []
        self.alts = []
        self.jsonld = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta" and attrs.get("name") == "description":
            self.meta.append(attrs.get("content", ""))
        if tag in ("h1", "h2"):
            self.cur = [tag, ""]
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag == "link" and attrs.get("rel") == "alternate":
            self.alts.append((attrs.get("hreflang"), attrs.get("href")))
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.jsonld += 1

    def handle_data(self, data):
        if self.cur:
            self.cur[1] += data

    def handle_endtag(self, tag):
        if self.cur and tag == self.cur[0]:
            self.h.append((self.cur[0], " ".join(self.cur[1].split())))
            self.cur = None

for path in ["/", "/projects/", "/blog/", "/gallery/", "/card/"]:
    html = urlopen("https://robinfrancis.in" + path, timeout=20).read().decode("utf-8", "replace")
    p = Parser()
    p.feed(html)
    print(path, "meta", len(p.meta), "h1", [h for h in p.h if h[0] == "h1"], "jsonld", p.jsonld, "xdefault", any(a[0] == "x-default" for a in p.alts))
PY
```

## Search Console

When routes, sitemap, or metadata change:

- Submit [https://www.robinfrancis.in/sitemap.xml](https://www.robinfrancis.in/sitemap.xml).
- Request indexing for changed canonical URLs.
- Check indexing status after a few days.

## Monitoring

- Review Vercel deployment logs.
- Check browser console for frontend errors.
- Review contact form submissions.
- Re-run a crawl if metadata or structured data changed.

Last updated: July 1, 2026
