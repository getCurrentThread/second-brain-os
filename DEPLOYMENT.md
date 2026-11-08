# Chinese learning site

This fork publishes the translated guide at https://fuyundev.github.io/second-brain-os/.
GitHub Pages serves the root of `codex/zh-cn-pages`. Pushing an update to this
branch rebuilds the public site. The upstream contribution remains on the
separate `codex/add-zh-cn-ui` branch.

The learning site defaults to Simplified Chinese and remembers explicit language
choices. It preserves the original author's attribution. Its deployment excludes
the upstream custom domain and analytics, and article source links point to this
fork's publishing branch.

After bringing translation updates into this branch, rebuild the committed site:

```sh
python3 tools/build_graph_site.py
python3 tools/extract_site.py
python3 tools/build_site.py
python3 scripts/build_tree.py
```

Keep `.nojekyll`, the fork source links and the `data-default-language="zh-CN"`
attributes. Do not restore the upstream `CNAME` file when merging updates.
