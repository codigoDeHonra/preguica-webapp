module.exports = {
  pluginOptions: {
    moment: {
      locales: [
        'pt-br'
      ]
    }
  },
  devServer: {
    port: 8080,
    https: true,
    host: 'app.xn--preguia-zxa.money',
    allowedHosts: [
      'app.xn--preguia-zxa.money',
    ],
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
}
