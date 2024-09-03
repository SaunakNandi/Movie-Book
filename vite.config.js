// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip', // or 'brotliCompress'
      threshold: 10240,
      ext: '.gz', // or '.br' for Brotli
    }),
    compression({
      algorithm: 'brotliCompress',
      threshold: 10240,
      ext: '.br',
      compressionOptions: { level: 11 },
    }),
  ],
});
