import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return {
		define: {
			"process.env": env,
		},
		plugins: [react()],
		resolve: {
			alias: [
				{ find: "~", replacement: path.resolve(__dirname, "src") },
				{
					find: "@panda-css",
					replacement: path.resolve(__dirname, "./styled-system/"),
				},
			],
		},
	};
});
