const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const fs = require('fs');

var name = process.argv[2]


webpack({
  devtool: 'source-map',
  entry: {
    [name]: './src/' + name + '/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, '../src/' + name),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'to-string-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,

            // mdc-web doesn't use sass-loader's normal syntax for imports
            // across modules, so we add all module directories containing
            // mdc-web components to the Sass include path
            // https://github.com/material-components/material-components-web/issues/351
            includePaths: glob.sync(path.join(__dirname, '../node_modules/@material')).map((dir) => path.dirname(dir))

          }
        }
      ]
    },
    {
      test: /\.[t|j]sx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }
    ]
  }
}, (err, stats) => { // Stats Object
  if (err || stats.hasErrors()) {
    // Handle errors here
  }
  // Done processing
  fs.renameSync(path.resolve(__dirname, '../dist/'+ name +'/index.d.ts'), path.resolve(__dirname, '../src/' + name+'/index.d.ts'))
  deleteFolderRecursive('dist')
  console.log(`Build ${name} successfully!`)
});

var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};