import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/youtube",
    createProxyMiddleware({
      target: "https://www.youtube.com",
      changeOrigin: true,
    })
  );
}
