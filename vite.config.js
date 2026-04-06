const { defineConfig } = require('vite');
const path = require('node:path');

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        modes: path.resolve(__dirname, 'modes.html'),
        operatives: path.resolve(__dirname, 'operatives.html'),
        maps: path.resolve(__dirname, 'maps.html'),
        esports: path.resolve(__dirname, 'esports.html'),
        notfound: path.resolve(__dirname, '404.html')
      }
    }
  }
});
