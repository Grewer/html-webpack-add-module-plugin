function htmlWebpackAddModulePlugin(options) {
  this.module = options.module
  this.nomodule = options.nomodule
  this.removeCSS = options.removeCSS
}


htmlWebpackAddModulePlugin.prototype.apply = function (compiler) {

  function addModule(htmlPluginData, callback) {
    if (this.module) {
      changeAttributes.call(this, htmlPluginData, this.module === 'all' ? false : 'module', 'type', 'module')
    }

    if (this.nomodule) {
      if (this.module !== 'all' && this.nomodule === 'all') {
        changeAttributes.call(this, htmlPluginData, false, 'nomodule', true)
      } else {
        changeAttributes.call(this, htmlPluginData, 'nomodule', 'nomodule', true)
      }
    }

    if (this.removeCSS) {
      htmlPluginData.head.forEach((k, i) => {
        if (k.attributes.href.indexOf(this.removeCSS) > -1) {
          htmlPluginData.head.splice(i, 1)
        }
      })
    }
    callback(null, htmlPluginData)
  }

  function changeAttributes(htmlData, condition, key, value) {
    htmlData.body.forEach(i => {
      if (condition) {
        if (i.attributes.src.indexOf(this[condition]) > -1) {
          delete i.attributes['type']
          i.attributes[key] = value
        }
      } else {
        delete i.attributes['type']
        i.attributes[key] = value
      }
    })
  }

  var self = this

  if (compiler.hooks) {
    // webpack 4 support
    compiler.hooks.compilation.tap('htmlWebpackAddModulePlugin', (compilation) => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
        'htmlWebpackAddModulePlugin', addModule.bind(self)
      )
    })
  } else {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', addModule.bind(self));
    });
  }

}

module.exports = htmlWebpackAddModulePlugin
