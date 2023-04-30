import { defineConfig } from 'vite';
import sass from 'node-sass';

export default defineConfig({
  plugins: [
    {
      apply: 'build',
      enforce: 'pre',
      test: /\.(sass|scss)$/,
      use: [
        {
          loader: 'sass-loader',
          options: {
            implementation: sass,
          },
        },
      ],
    },
  ],
});
