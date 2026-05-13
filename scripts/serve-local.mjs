#!/usr/bin/env node
// Local CORS-aware HTTP server for serving the Lirum bundle to Home Assistant
// when jsdelivr hasn't cached the new release yet. Sets the headers required
// for Chrome's Private Network Access policy when HA pages cross-origin into
// a LAN address.
//
// Usage:
//   node scripts/serve-local.mjs           # serves ./dist on :8765
//   node scripts/serve-local.mjs dist 8000 # custom dir and port
//
// The resulting URL is something like:
//   http://<your-mac>.local:8765/lirum-cards.js
//
// Pass that URL as RESOURCE_URL to setup-ha-dashboard.mjs.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || 'dist');
const port = Number(process.argv[3] || 8765);

const TYPES = {
  '.js': 'text/javascript; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
};

const baseHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Private-Network': 'true',
  'Cross-Origin-Resource-Policy': 'cross-origin',
  'Cache-Control': 'no-cache',
};

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, baseHeaders);
    res.end();
    return;
  }
  const filepath = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.writeHead(404, baseHeaders);
      res.end('not found');
      return;
    }
    const ct = TYPES[path.extname(filepath)] || 'application/octet-stream';
    res.writeHead(200, { ...baseHeaders, 'Content-Type': ct, 'Content-Length': data.length });
    res.end(data);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Lirum LAN bundle server: http://0.0.0.0:${port} -> ${root}`);
});
