## htmlWebpackAddModulePlugin

> add script attribute type module or nomodule

### Usage

```
npm i html-webpack-add-module-plugin -D
```

```
// webpack.conf.js
const htmlWebpackAddModulePlugin = require('html-webpack-add-module-plugin')


plugin:{
	new htmlWebpackAddModulePlugin({
      module: '', //  if key in src, change type attribute to module, if `module:'all'` , change all
      nomodule:'' //  same as above , add nomodule attribute
    }),
}
```


