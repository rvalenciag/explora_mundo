import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
    plugins: [react()],
    base: command === "build" ? "/inf240/grupo03sx/proyectofinal/" : "/",
}));
