/// <reference types="vitest" />
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts'

export default defineConfig({
    test: {
        globals: true
    },
    build: {
        //lib mode only
        lib: {
            entry: "lib/index.ts",
            name: "SPColumnFormatter",
            formats: ['es'],
            fileName: 'index'
        },
        rollupOptions: {
            external: ["sp-formatters"],
            output: {
                globals: {
                    "sp-formatters": "SPFormatters"
                }
            }
        }
    },
    plugins: [dts()]
});