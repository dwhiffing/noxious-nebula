import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import html from 'rollup-plugin-html-bundle'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import kontra from 'rollup-plugin-kontra'
import { terser } from 'rollup-plugin-terser'

const prod = process.env.NODE_ENV === 'production'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
  },
  plugins: [
    kontra({
      gameObject: { velocity: true, anchor: true, group: true, ttl: true },
      sprite: { animation: false },
      text: { textAlign: true },
      vector: { add: true, dot: true, distance: true, subtract: true },
    }),
    commonjs(),
    resolve(),
    esbuild({
      include: /\.[jt]s$/,
      tsconfig: 'tsconfig.json',
    }),
    prod && terser(),
    html({
      template: 'src/index.html',
      target: 'dist/index.html',
      inline: true,
    }),
    !prod && serve('dist'),
    !prod && livereload('dist'),
  ],
}
