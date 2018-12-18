# 腾讯 Omio 发布 - 全面兼容 IE9 和移动端

> 兼容老浏览器的 Omi 版本，[→ Github](https://github.com/Tencent/omi/tree/master/packages/omio)

![](https://github.com/Tencent/omi/blob/master/assets/omio-ie.png)

---

## 立即使用

```bash
$ npm i omi-cli -g             
$ omi init-o my-app   
$ cd my-app           
$ npm start                     
$ npm run build               
```

### 与 omi 不同之处

omio 拥有 omi一样的语法，但是也有一些差异需要注意：

* omio 支持 `staticCss`，omi 是不支持的

`css` 和 `staticCss` 的区别是 ? 例如：

``` js
render() {
  return (
    <div>
      <my-ele name={this.name}></my-ele>
      <my-ele name={this.name}></my-ele>
      <my-ele name={this.name}></my-ele>
    </div>
  )
}
```

如上面的例子,`css`方法会渲染三次，并插入到 head，而`staticCss` 只会渲染一次。
当你 update 组件或者 setState 时候，`css`方法会渲染三次，并更新head里对应三个地方的样式，`staticCss` 不再渲染。

* Omio 不支持 slot, 请使用 `props.children` 代替，像 react 一样
* Omio 支持 store 注入，但不支持 store path updating
* Omio 不支持 render array，未来可能支持
* Omio 不支持 `fire` 触发自定义事件，可以和 react 一样使用 `props.xxx()` 去触发。Omi 同时支持 `fire` and `props.xxx()` 两种方式。


## Omi 项目中使用 Omio

先安装:

``` bash
npm i omio
```

配置 Webpack Alias

如果你想在已经存在的 omi 项目下使用 omio，你可以使用下面配置，不用任何代码更改:

```js
module.exports = {
  //...
  resolve: {
    alias: {
      omi: 'omio'
    }
  }
};
```

## 兼容 IE 踩坑

### 第一坑 - 伪数组

IE下 querySelectorAll 出来的伪数组,没有 array 相关的方法：
``` js
const codes = document.querySelectorAll('xxx')
//挂了
codesArr.forEach(() => {

})
```

需要转成真数组:

``` js
const codes = Array.prototype.slice.call(document.querySelectorAll('xxx'))
```

### 第二坑 - 静态属性丢失

这是 Omi 的源码:

``` js
function define(name, ctor) {
  if (ctor.is === 'WeElement') {
    options.mapping[name] = ctor;
    if (ctor.data && !ctor.pure) {
      ctor.updatePath = getUpdatePath(ctor.data);
    }
  }
}
```

但是在 IE 下进入不了 if 条件！！Omi 源码里明明有有静态属性:

``` js
class WeElement {
  static is = 'WeElement'

  constructor(props, store) {
    ...
  }
  ...
  ...
  render() { }
}
```

为什么丢失了呢？追根溯源一下：

使用 define:

``` js
define('my-p', class extends WeElement {
  render(props) {
    return props.children[0]
  }
})
```

编译后的代码:

``` js
define('my-p', function (_WeElement) {
  _inherits(_class, _WeElement);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, _WeElement.apply(this, arguments));
  }

  _class.prototype.render = function render$$1(props) {
    return props.children[0];
  };

  return _class;
}(WeElement));
```

那么问题就出在 _inherits 过程中把静态属性 `is` 丢失了！ 

``` js
function _inherits(subClass, superClass) {
  subClass.prototype = Object.create(superClass && superClass.prototype, { 
    constructor: { 
      value: subClass, 
      enumerable: false, 
      writable: true, 
      configurable: true 
    } 
  }); 
  if (superClass) {
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  } 
}
```

好，由于是编译注入代码，后面可能也需要支持纯函数的组件定义，所以这样解决了:

```js
function define(name, ctor) {
  //if (ctor.is === 'WeElement') {
    options.mapping[name] = ctor;
    if (ctor.data && !ctor.pure) {
      ctor.updatePath = getUpdatePath(ctor.data);
    }
  //}
}
```

### 第三坑 - Object.assign IE 不支持

由于 Omio 源码里使用了 Object.assign，所以这里需要 polyfill 一下：

```js
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
```

由于 IE9 支持了 ES5, webpack 编译出来的 es5，所以并不需要引入 [es5-shim](https://github.com/es-shims/es5-shim) 来兼容。

### 第四坑 - Proxy 不支持

因为需要监听数据变化，Omi 使用的是 Proxy，所以这里需要一个降级方案 - [obaa 库](https://github.com/Tencent/omi/tree/master/packages/obaa)，监听任意对象的任意变化。


#### 安装 obaa

```js
npm install obaa
```

### 使用

observe object:

```js
var obj = { a: 1 };
obaa(obj, function (name, value , old) {
    console.log(name + "__" + value + "__" + old);
});
obj.a = 2; //a__2__1 
```

observe array:

```js
var arr = [1, 2, 3];
obaa(arr, function (name, value, old) {
    console.log(name + "__" + value+"__"+old);
});
arr.push(4);//Array-push__[1,2,3,4]__[1,2,3] 
arr[3] = 5;//3__5__4
```

observe class instance:

```js
var User = function (name, age) {
    this.name = name;
    this.age = age;
    //observe name only
    obaa(this, ["name"], function (name, value, oldValue) {
        console.log(name + "__" + value + "__" + oldValue);
    });
}
var user = new User("lisi", 25);
user.name = "wangwu";//name__wangwu__lisi 
user.age = 20; //nothing output
```

其他:

```js
arr.push(111) //trigger observe callback
//every method of array has a pureXXX function
arr.purePush(111) //don't trigger observe callback

arr.size(2) //trigger observe callback
arr.length = 2 //don't trigger observe callback

//if obj.c is undefined
obaa.set(obj, 'c', 3)
obj.c = 4 //trigger observe callback

//if obj.c is undefined
obj.c = 3
obj.c = 4 //don't trigger observe callback
```

### 第五坑 - MVVM 的 mappingjs 不支持

![](https://github.com/Tencent/omi/blob/master/assets/mappingjs.png)

mappingjs 完全利用的 proxy，所以数据 mapping 的过程中会自动更新视图。但是切换成 obaa 之后，发现数组 length 更新视图不会更新，数组增加视图不会更新。review 了 mappingjs 发现：

* mappingjs 使用了 array.length 改变数组长度
* mappingjs 使用 array[index] 增加元素

这样在 obaa 是不允许的，不然的话无法监听到变化， obaa 要求：

* 使用 array.size(len) 改变数组长度
* 使用 array.push 增加元素

所以就有了 [mappingjs-omio](https://github.com/Tencent/omi/blob/master/packages/omi-cli/template/o/src/utils/mapping-omio.js), 这样的话， Omio 同样可以使用真正的 MVVM 架构。

## Omio 实战

[md2site](https://tencent.github.io/omi/assets/md2site/) 完全使用 omio 打造，拥有良好的阅读体验和兼容性。

![](https://github.com/Tencent/omi/blob/master/assets/ie9a.png)

![](https://github.com/Tencent/omi/blob/master/assets/ie9b.png)

![](https://github.com/Tencent/omi/blob/master/assets/mobile.png)

## 开始使用吧

[→ Omi Github](https://github.com/Tencent/omi/tree/master/packages/omio)