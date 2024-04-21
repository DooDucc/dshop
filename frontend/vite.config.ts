import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import basicSsl from "@vitejs/plugin-basic-ssl"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    mockReset: true,
  },
})
