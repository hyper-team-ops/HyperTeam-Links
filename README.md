# HyperTeam Links

Arabic RTL social and contact page for HyperTeam, designed for GitHub Pages.

## Add links

Add links to `links.json`. Each entry supports:

```js
{ name: "اسم القناة", handle: "@account", icon: "telegram", description: "وصف قصير", action: "انضموا للقناة", url: "https://…" }
```

Supported icon names: `telegram`, `instagram`, `facebook`, `youtube`, and `link`.
Run `python generate_qr.py` to create self-hosted QR images and the browser data file.
Install the generator dependency with `python -m pip install -r requirements.txt`.

## Publish

The page is static. Generate the QR images before publishing, push the files to `main`, then enable **Settings → Pages → Deploy from a branch → main / (root)**.

## Brand assets

The logo symbol and Cairo font files are copied from HyperTeam's approved identity assets. `assets/fonts/OFL.txt` contains the Cairo font license.
