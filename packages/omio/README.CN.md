[English](./README.md) | 简体中文

# Omio

> 兼容老浏览器的 Omi 版本(支持到IE9+和移动端浏览器)


---

- [Getting Started](#getting-started)
	- [Hello Omi](#hello-omi)
    - [Scoped CSS](#scoped-css)
	- [Store](#store)
	- [Lifecycle](#lifecycle)
- [CLI](#cli)
- [Install](#install)
- [Official Plugins](#official-plugins)
- [Links](#links)
- [License](#license)


## Getting Started

### Hello Omi


``` js
import { render, Component } from 'omi';

class Hello extends Component {
    render() {
        return <div> {this.props.name}</div>
    }
}

class App extends Component {
    install() {
        this.name = 'Omi'
    }

    handleClick = (e) => {
        this.name = 'Hello Omi !' 
        this.update()
    }

    css() {
        return `h3{
                    cursor:pointer;
                    color: ${Math.random() > 0.5 ? 'red' :'green'};
                }`
    }

    staticCss() {
        return `div{
                    font-size:20px;
                }`
    }
	
    render() {
        return (
		<div>
			<Hello name={this.name}></Hello>
			<h3 onclick={this.handleClick}>Scoped css and event test! click me!</h3>
		</div>
		)
    }
}

render(<App />, 'body')
```

和 preact 不同的是,你不再需要 `import { h } from 'omi'`.

配置 Babel 转换 JSX 变成调用 Omi.h() :

``` json
{
    "presets": ["env", "omi"]
}
```

你需要安装这两个 babel 插件:

``` bash
"babel-preset-env": "^1.6.0",
"babel-preset-omi": "^0.1.1",
```

还有一点需要提醒一下，上面绑定的事件不需要在构造函数里进行 bind this 操作，因为依靠 `babel-plugin-transform-class-properties` 可以自动绑定。

### Scoped CSS

`css` 和 `staticCss` 的区别是 ? 例如：

``` js
render() {
        return (
		<div>
			<Hello name={this.name}></Hello>
			<Hello name={this.name}></Hello>
			<Hello name={this.name}></Hello>
		</div>
		)
    }
```

如上面的例子,`css`方法会渲染三次，并插入到 head，而`staticCss` 只会渲染一次。
当你 update 组件或者 setState 时候，`css`方法会渲染三次，并更新head里对应三个地方的样式，`staticCss` 不再渲染。


如果你想使用 scoped css 但又不想写在 js 里, 你可以使用 [to-string-loader](https://www.npmjs.com/package/to-string-loader), 看下 [omi-cli config](https://github.com/AlloyTeam/omi-cli/blob/master/template/app/config/webpack.config.dev.js#L156-L162)：

``` js
{
    test: /[\\|\/]_[\S]*\.css$/,
    use: [
        'to-string-loader',
        'css-loader'
    ]
}
```

这里约定了以下划线 '_' 开头的，会经过 to-string-loader 处理成字符串。例如:


``` js
import Omi from 'omi'
//import 进来的 style 是字符串
import style from './_index.css' 

class App extends Omi.Component {

  staticCss() {
    return style
  }

  css() {
    return `
      code{
        color: ${Math.random() > 0.5 ? 'red' : 'blue'}
      }
      .app-logo{
        cursor: pointer; 
      }
    `
  }

  render() {
    return (
      <div class="app">
        <header class="app-header">
          <h1 class="app-title">Welcome to Omi</h1>
        </header>
      </div>
    )
  }
}
```

你如果使用 omi-cli 创建项目的话，就可以直接使用上面这个特性，omi-cli 帮你配置好了一切。

### Store

``` js
import { render, Component } from 'omi';

class Hello extends Component {
  render() {
    return <div>{this.$store.name}</div>
  }
}

class App extends Component {

  handleClick = () => {
    this.$store.rename('Hello Omi !')
  }

  render() {
    return (
      <div>
        <Hello ref={c => { this.hello = c }} ></Hello>
        <button onclick={this.handleClick}>Click me to call this.$store.rename('Hello Omi !') </button>
      </div>
    )
  }
}

class AppStore {
  constructor(data, callbacks) {
    this.name = data.name || ''
    this.onRename = callbacks.onRename || function () { }
  }

  rename(name) {
    this.name = name
    this.onRename()
  }
}

const app = new App()
const store = new AppStore({ name: 'Omi' }, {
  onRename: () => {
    app.update()
    //也可以进行更快速的局部更新
    //app.hello.update()
  }
})

render(app, document.body, { store })
```

通过根节点注入后，你可以在所有组件中使用 `this.$store` 来获取 store 的数据或者调用 store 的方法。

### Lifecycle

| Lifecycle method            | When it gets called                              |
|-------------------------------|--------------------------------------------------|
| `componentWillMount / install`        | before the component gets mounted to the DOM     |
| `componentDidMount / installed`         | after the component gets mounted to the DOM      |
| `componentWillUnmount / uninstall`      | prior to removal from the DOM                    |
| `componentWillReceiveProps` | before new props get accepted                    |
| `shouldComponentUpdate`     | before `render()`. Return `false` to skip render |
| `componentWillUpdate / beforeUpdate`       | before `render()`                                |
| `componentDidUpdate / afterUpdate`        | after `render()`                                 |

## CLI

```bash
$ npm i omi-cli -g               # install cli
$ omi init your_project_name     # init project, you can also exec 'omi init' in an empty folder
$ cd your_project_name           # please ignore this command if you executed 'omi init' in an empty folder
$ npm start                      # develop
$ npm run build                  # release
```

服务端同构直出:

```bash
$ omi init-ssr your_project_name     # init ssr project, you can also exec 'omi init-ssr' in an empty folder
$ cd your_project_name               # please ignore this command if you executed 'omi init' in an empty folder
$ npm run dev                        # develop
$ npm run build                      # release
$ npm start                          # release 
```

## Install

``` bash
npm i omi
```

或从 CDN 获取:

* [https://unpkg.com/omi@3.0.7/dist/omi.min.js](https://unpkg.com/omi@3.0.7/dist/omi.min.js)
* [https://unpkg.com/omi@3.0.7/dist/omi.js](https://unpkg.com/omi@3.0.7/dist/omi.js)

## Official Plugins

- [omi-tap](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-tap): Support tap event in your Omi project.
- [omi-router](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-router): Router for Omi.
- [omi-finger](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-finger): Omi /[AlloyFinger](https://github.com/AlloyTeam/AlloyFinger) integration.
- [omi-transform](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-transform): Omi /[transformjs](https://alloyteam.github.io/AlloyTouch/transformjs/) integration.
- [omi-touch](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-touch): Omi /[AlloyTouch](https://github.com/AlloyTeam/AlloyTouch) integration.

## Links

- [preact github](https://github.com/developit/preact)
- [preactjs.com](https://preactjs.com/)
- [omijs.org](http://omijs.org/)
- [differences to react](https://preactjs.com/guide/differences-to-react)
- [native support](https://github.com/AlloyTeam/omi/tree/master/src/native)

## License

MIT © [dntzhang](https://github.com/dntzhang)
