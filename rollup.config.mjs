import resolve from '@rollup/plugin-node-resolve';
import { derver } from 'derver/rollup-plugin';
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';
import malina from 'malinajs/malina-rollup.js';
import malinaSass from 'malinajs/plugins/sass.js';

const DEV = !!process.env.ROLLUP_WATCH;
const cssInJS = false;

export default {
  input: 'src/main.js',
  preserveEntrySignatures: false,
  output: {
    format: 'es',
    dir: 'public',
  },
  plugins: [
    malina({
      hideLabel: !DEV,
      css: cssInJS,
      plugins: [malinaSass()],
    }),
    resolve(),
    !cssInJS && css({ output: 'bundle.css' }),
    DEV && derver(),
    !DEV && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
