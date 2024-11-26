import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'es',
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    copy({
      targets: [
        {
          src: 'src/assets/*',
          dest: 'dist',
        },
      ],
    }),
  ],
};
