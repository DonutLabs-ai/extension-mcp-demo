import { defineConfig } from '@umijs/max'
// import fs from 'fs'
import GenerateJsonPlugin from 'generate-json-webpack-plugin'

import manifest from './manifest'
import routes from './routes'

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,
  npmClient: 'npm',
  routes,
  proxy: {
    '.*': {
      target: '.*',
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
    },
  },
  history: {
    type: 'hash',
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  writeToDisk: true,
  copy: [
    {
      from: './node_modules/webextension-polyfill/dist/browser-polyfill.js',
      to: './dist/browser-polyfill.js',
    },
    {
      from: './node_modules/webextension-polyfill/dist/browser-polyfill.js.map',
      to: './dist/browser-polyfill.js.map',
    },
  ],
  jsMinifier: 'esbuild',
  jsMinifierOptions: {
    keepNames: true,
  },
  codeSplitting: {
    jsStrategy: 'depPerChunk',
    jsStrategyOptions: {},
  },
  polyfill: {
    imports: ['core-js/stable'],
  },
  fastRefresh: false,
  targets: {
    chrome: 80,
  },
  mfsu: false,
  chainWebpack(memo, { env }) {
    if (env !== 'development') {
      memo.devServer.hot(false)
      memo.plugins.delete('hmr')
    }

    // generate manifest.json, it will auto load version/env
    memo
      .plugin('generate-json-webpack-plugin')
      .use(new GenerateJsonPlugin('manifest.json', manifest))

    memo.devServer.headers({
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    })

    return memo
  },
})
