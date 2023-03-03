// vite.config.ts
import { defineConfig } from "file:///home/bruno-linux/ProjetosInternos/sp-list-formatting/node_modules/.pnpm/vite@4.1.4_@types+node@18.14.1/node_modules/vite/dist/node/index.js";
import dts from "file:///home/bruno-linux/ProjetosInternos/sp-list-formatting/node_modules/.pnpm/vite-plugin-dts@2.0.2_75ucbpp7logpdg7n5tkyaoxqqm/node_modules/vite-plugin-dts/dist/index.mjs";
var vite_config_default = defineConfig({
  test: {
    globals: true
  },
  build: {
    //lib mode only
    lib: {
      entry: "lib/index.ts",
      name: "SPColumnFormatter",
      formats: ["es"],
      fileName: "sp-list-formatter"
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
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9icnVuby1saW51eC9Qcm9qZXRvc0ludGVybm9zL3NwLWxpc3QtZm9ybWF0dGluZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvYnJ1bm8tbGludXgvUHJvamV0b3NJbnRlcm5vcy9zcC1saXN0LWZvcm1hdHRpbmcvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvYnJ1bm8tbGludXgvUHJvamV0b3NJbnRlcm5vcy9zcC1saXN0LWZvcm1hdHRpbmcvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgdGVzdDoge1xuICAgICAgICBnbG9iYWxzOiB0cnVlXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgICAvL2xpYiBtb2RlIG9ubHlcbiAgICAgICAgbGliOiB7XG4gICAgICAgICAgICBlbnRyeTogXCJsaWIvaW5kZXgudHNcIixcbiAgICAgICAgICAgIG5hbWU6IFwiU1BDb2x1bW5Gb3JtYXR0ZXJcIixcbiAgICAgICAgICAgIGZvcm1hdHM6IFsnZXMnXSxcbiAgICAgICAgICAgIGZpbGVOYW1lOiAnc3AtbGlzdC1mb3JtYXR0ZXInXG4gICAgICAgIH0sXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGV4dGVybmFsOiBbXCJzcC1mb3JtYXR0ZXJzXCJdLFxuICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgICAgICAgICAgICBcInNwLWZvcm1hdHRlcnNcIjogXCJTUEZvcm1hdHRlcnNcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcGx1Z2luczogW2R0cygpXVxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUVoQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixNQUFNO0FBQUEsSUFDRixTQUFTO0FBQUEsRUFDYjtBQUFBLEVBQ0EsT0FBTztBQUFBO0FBQUEsSUFFSCxLQUFLO0FBQUEsTUFDRCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsSUFBSTtBQUFBLE1BQ2QsVUFBVTtBQUFBLElBQ2Q7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNYLFVBQVUsQ0FBQyxlQUFlO0FBQUEsTUFDMUIsUUFBUTtBQUFBLFFBQ0osU0FBUztBQUFBLFVBQ0wsaUJBQWlCO0FBQUEsUUFDckI7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDbkIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
