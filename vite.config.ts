import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

function copyGeneratedImages(): Plugin {
  const imageMap: Record<string, string> = {
    'hero_1784904574.png': 'hero.png',
    'operative-breacher_1784904596.png': 'operative-breacher.png',
    'operative-recon_1784904616.png': 'operative-recon.png',
    'operative-engineer_1784904637.png': 'operative-engineer.png',
    'operative-assault_1784904677.png': 'operative-assault.png',
    'sector-refinery_1784904701.png': 'sector-refinery.png',
    'sector-cryo_1784904737.png': 'sector-cryo.png',
    'cta-bg_1784904754.png': 'cta-bg.png',
  };

  const copy = () => {
    const src = path.resolve(__dirname, 'vibe_images');
    const dst = path.resolve(__dirname, 'public/assets/images');
    if (!fs.existsSync(src) || !fs.existsSync(dst)) return;
    for (const [from, to] of Object.entries(imageMap)) {
      const srcFile = path.join(src, from);
      const dstFile = path.join(dst, to);
      if (fs.existsSync(srcFile) && !fs.existsSync(dstFile)) {
        fs.copyFileSync(srcFile, dstFile);
      }
    }
  };

  return {
    name: 'copy-generated-images',
    buildStart() {
      copy();
    },
    configureServer() {
      copy();
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), copyGeneratedImages()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
