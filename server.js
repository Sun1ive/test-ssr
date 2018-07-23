const Express = require('express');
const LRU = require('lru-cache');
const favicon = require('serve-favicon');
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const path = require('path');
const fs = require('fs');
const resolve = file => path.resolve(__dirname, file);

const server = new Express();

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve('./index.html'), 'utf-8'),
  clientManifest,
});

server.use('./dist', Express.static(resolve('./dist')));

server.get('*', async (req, res) => {
  const context = {
    url: req.url,
    title: 'Vue JS - Server Render',
    meta: `
    <meta description="vuejs server side render">
    `,
  };

  try {
    const html = await renderer.renderToString(context);
    res.send(html);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

server.listen(3000, () => console.log('Server on port 3000'));
