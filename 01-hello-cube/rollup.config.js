import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import url from '@rollup/plugin-url';
import typescript from 'rollup-plugin-typescript2';

// this override is needed because Module format cjs does not support top-level await
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { devDependencies, main, module: outFile } = require('./package.json');

const globals = {
  ...devDependencies,
};

export default {
  input: 'src/main.ts',
  output: [
    {
      file: main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: outFile,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        exclude: ['**/*.stories.*'],
      },
    }),
    commonjs({
      exclude: 'node_modules',
      ignoreGlobal: true,
    }),
    url({
      include: [
        '**/*.frag',
        '**/*.vert',
      ]
    }),
  ],
  external: Object.keys(globals),
};
