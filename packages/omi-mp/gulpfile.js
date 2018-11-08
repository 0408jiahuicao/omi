var gulp = require('gulp')
var path = require('path')
var tap = require('gulp-tap')
var compile = require('./scripts/index')
var fs = require('fs');

gulp.task('components', ['copy'], function () {
  return gulp.src('dist/src/source/components/*/*.js')
    .pipe(tap(function (file) {
      var name = path.basename(file.path).replace('.js', '')
      var dir = path.dirname(file.path)
      var wxml = fs.readFileSync(dir + '/' + name + '.wxml', 'utf8')
      var json = require(dir + '/' + name + '.json')
      var importStr = json2import(json)
      var hyperscript = compile(wxml)
      file.contents = Buffer.concat([
        new Buffer(
          `${importStr}import myChildCss from './${name}.wxss'
import { h, WeElement } from 'omi'
import { setData } from '../../../utils/set-data'


function css() {
  return rpx2px(myChildCss)
}
`+ hyperscript + '\r\n'),
        new Buffer(file.contents.toString().replace('Component({', 'const mpOption = Component({')),
        new Buffer(`
class Element extends WeElement {
  data = mpOption.data

  render = render

  css = css

  beforeRender() {}

  beforeUpdate() {}

  afterUpdate() {}

  install() {}

  uninstall() {}

  installed() {}

  setData = setData
}

Object.keys(mpOption).forEach(key => {
  Element.prototype[key] = mpOption[key]
})

customElements.define('${name}', Element)
        `)
      ])
    }))
    .pipe(gulp.dest('dist/src/source/components/'))
})

gulp.task('copy', function () {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist/src/source'))
});


gulp.task('pages', ['copy'], function () {
  return gulp.src('dist/src/source/pages/*/*.js')
    .pipe(tap(function (file) {
      var name = path.basename(file.path).replace('.js', '')
      var dir = path.dirname(file.path)
      var wxml = fs.readFileSync(dir + '/' + name + '.wxml', 'utf8')
      var hyperscript = compile(wxml)
      var json = require(dir + '/' + name + '.json')
      var importStr = json2import(json)
      var hyperscript = compile(wxml)
      file.contents = Buffer.concat([
        new Buffer(
          `${importStr}import appCss from '../../app.wxss'
import indexCss from './${name}.wxss'
import { h, WeElement } from 'omi'

function css() {
  return rpx2px(appCss + indexCss)
}
`+ hyperscript + '\r\n'),
        new Buffer(file.contents.toString().replace('Component({', 'const mpOption = Component({')),
        new Buffer(`
class Element extends WeElement {
  data = mpOption.data

  render = render

  css = css

  beforeRender() {}

  beforeUpdate() {}

  afterUpdate() {}

  install() {}

  uninstall() {}

  installed = mpOption.onLoad
}

Object.keys(mpOption).forEach(key => {
  Element.prototype[key] = mpOption[key]
})

customElements.define('we-${name}', Element)
        `)
      ])
    }))
    .pipe(gulp.dest('dist/src/source/pages/'))
})

gulp.task('appjs', function () {
  return gulp.src('src/app.js')
    .pipe(tap(function (file) {

      var list = walk('src/pages')
      file.contents = Buffer.concat([
        file.contents,
        new Buffer(list2require(list))
      ])
    }))
    .pipe(gulp.dest('dist/src/source'))
});

gulp.task('default', ['copy', 'components', 'pages', 'appjs'])

function json2import(json) {
  var arr = []
  if (json.usingComponents) {
    Object.keys(json.usingComponents).forEach(key => {
      arr.push(`import '${json.usingComponents[key]}'`)
    })
  }
  return arr.join('\r\n') + '\r\n'
}

function list2require(list) {
  return '\r\n'+list.map(item => {
    return `require('./pages/${item}/${item}')`
  }).join('\r\n')
}

function walk(path) {
  var dirList = fs.readdirSync(path)
  var fileList = []
  dirList.forEach(function (item) {
    if (fs.statSync(path + '/' + item).isDirectory()) {
      fileList.push(item)
    }
  })

  return fileList
}
