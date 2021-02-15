module.exports = {
    productionSourceMap: process.env.NODE_ENV != 'production',
    integrity: true,
    pages: {
        index: {
          entry: 'src/main.js',
          template: 'public/index.html',
          filename: 'index.html',
          title: 'Blob Image Hosting',
          chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    }
};