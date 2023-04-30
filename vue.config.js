const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  devServer: { // api 요청이 있을때 어디에서 처리할지를 설정
    proxy: {
      '/api': {
        // 개발 서버에서만 적용됨 -> 빌드 후, 운영 서버에서는 적용 X
        target: 'http://ec2-43-200-233-190.ap-northeast-2.compute.amazonaws.com:3001/',
        // target: 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    },
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    }
  },
  outputDir: './backend/public',  // 배포 파일의 위치를 지정
})
