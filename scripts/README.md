# Scripts

Helpers for installing Lirum Cards into a real Home Assistant instance.

## `setup-ha-dashboard.mjs`

Adds the Lirum bundle as a Lovelace resource and creates a "Lirum Showcase" dashboard wired to real entities from your HA. Idempotent — re-running updates the dashboard config in place.

```bash
HA_URL=http://homeassistant.local:8123 \
HA_TOKEN=<long-lived-token> \
RESOURCE_URL=<url-to-lirum-cards.js> \
node scripts/setup-ha-dashboard.mjs
```

### `RESOURCE_URL` — pick one

1. **JSDelivr (preferred, once cached)** — `https://cdn.jsdelivr.net/gh/Lirum-Labs/ha-lirum@v0.1.0/dist/lirum-cards.js`. New repos may need ~30 min for jsdelivr to index. Once it works, this URL is the durable choice.
2. **LAN server (immediate)** — run `scripts/serve-local.mjs` and point HA at `http://<your-mac>.local:8765/lirum-cards.js`. Requires the Mac to stay running and on the same network.
3. **Self-host in HA `www/`** — copy `dist/lirum-cards.js` to your HA config's `www/lirum-cards/` directory and use `/local/lirum-cards/lirum-cards.js`. Most reliable but requires file access to HA.

## `serve-local.mjs`

Tiny CORS-aware HTTP server for the LAN-server path. Sets the headers Chrome's Private Network Access policy needs when an HA page (in a `.local` origin) loads a script from a LAN IP.

```bash
node scripts/serve-local.mjs            # serves ./dist on :8765
node scripts/serve-local.mjs dist 9000  # custom dir and port
```

The resource URL to feed into HA is the LAN address: `http://<your-mac>.local:<port>/lirum-cards.js` or `http://<lan-ip>:<port>/lirum-cards.js`.
