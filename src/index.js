function htmlWebpackAddModulePlugin(options) {
  // Configure your plugin with options...
  // options key
}

htmlWebpackAddModulePlugin.prototype.apply = function (compiler) {
  // console.log(compiler)
  var self = this;

  if (compiler.hooks) {
    console.log('run1')
    // webpack 4 support
    compiler.hooks.compilation.tap('htmlWebpackAddModulePlugin', (compilation) => {
      console.log('The compiler is starting a new compilation...');

      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
        'htmlWebpackAddModulePlugin',
        (data, cb) => {
          data.html += 'The Magic Footer'
          console.log(data)
          cb(null, data)
        }
      )
    })
  } else {
    console.log('run2')
    // Hook into the html-webpack-plugin processing
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', function (htmlPluginData, callback) {
        console.log('tags')
        console.log(htmlPluginData.body)

        // let newArr = htmlPluginData.body.map(i => {
        //   i.attributes.noModule = true
        // })
        htmlPluginData.body.forEach(i => {
          console.log(i,i.type = 'module')
            i.attributes.type = 'module'
        })
        // htmlPluginData.body = [...htmlPluginData.body,...newArr]

        callback(null, htmlPluginData)
      });
    });
  }

}