# Korean learning site

This fork builds a Korean edition of the guide from the `ko-pages` branch. It is
not published yet; to publish it, point GitHub Pages at the root of `ko-pages`.
It replaces the earlier Simplified Chinese edition (`codex/zh-cn-pages`).

The learning site defaults to Korean and remembers explicit language choices. It
preserves the original author's attribution. Its deployment excludes the
upstream custom domain and analytics, and article source links point to this
fork's `ko-pages` branch.

After bringing translation updates into this branch, rebuild the committed site:

```sh
python3 tools/build_graph_site.py
python3 tools/extract_site.py
python3 tools/build_site.py
python3 scripts/build_tree.py
```

Keep `.nojekyll`, the fork source links and the `data-default-language="ko"`
attributes. Do not restore the upstream `CNAME` file when merging updates.
