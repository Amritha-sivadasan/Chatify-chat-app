import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true, // Ensure the origin of the host header is changed to the target URL
        secure: false, // If the target server is using HTTPS, set this to true
        configure: (proxy, options) => {
          // Handle proxy errors for debugging purposes
          proxy.on('error', (err, req, res) => {
            console.error('Proxy error:', err);
            res.writeHead(500, {
              'Content-Type': 'text/plain',
            });
            res.end('Something went wrong with the proxy.');
          });

          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Additional custom headers or other configuration can be set here
            proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
          });
        },
      },
    },
  },
});
