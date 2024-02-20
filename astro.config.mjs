import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercelAdapter from "@sveltejs/adapter-vercel";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte({ preprocess: [] })],
  adapter: vercelAdapter(),
  output: "hybrid",
});
