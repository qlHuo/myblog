所谓动态组件就是让多个组件使用同一个挂载点，并动态切换。

#### is 用法

通过使用保留的 `<component></component>` 元素，动态地绑定到它的 is 特性，我们让多个组件可以使用同一个挂载点，并动态切换。根据 `v-bind:is="组件名"` ，组件名就会自动去匹配对应的组件，如果匹配不到，则不显示。改变挂载的组件，只需要修改 is 属性的值即可。

demo 

```html
<!DOCTYPE html>
<html>
<head>
  <title>动态组件demo</title>
  <script src="https://unpkg.com/vue"></script>
</head>
<body>
  <div id="example">
    <span @click="index = 0">主页</span>
    <span @click="index = 1">详情页</span>
    <span @click="index = 2">存档页</span>
    <component :is="currentView"></component>
  </div>
  <script>
    const home = {
      template: '<div>我是主页</div>'
    };
    const detail = {
      template: '<div>我是详情页</div>'
    };
    const archive = {
      template: '<div>我是存档页</div>'
    };
    new Vue({
      el: '#example',
      components: {
        home,
        detail,
        archive,
      },
      data: {
        index: 0,
        arr: ['home', 'detail', 'archive'],
      },
      computed: {
        currentView() {
          return this.arr[this.index];
        }
      }
    })
  </script>
</body>
</html>
```

#### keep-alive 组件

上面我们已经通过绑定 `is` 属性来切换不同的组件，被切换掉的组件(非当前显示组件)，是被直接移除了。用 `<keep-alive></keep-alive>` 包裹组件，可以使被切换掉的组件保留在内存中，从而保留它的状态避免切换显示的时候重新渲染，能够提高性能。 

> keep-alive 是一个抽象组件，它本身不会被渲染为一个DOM元素，也不会出现在父组件链中。当 keep-alive 包裹组件时，会缓存不活动的组件实例，而不是直接销毁

基础用法示例：

```html
 <div id="example">
    <button @click="change">切换页面</button>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
  </div>
```

**activated 和 deactivated**

在 2.2.0 及其更高版本中，activated 和 deactivated 将会在 `<keep-alive>` 树内的所有嵌套组件中触发。

当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。

**props**

* `include` 字符串或者正则表达式，只有名称匹配的组件会被缓存
* `exclude` 字符串或者正则表达式，任何名称匹配的组件都不会被缓存
* `max` 数字，最多可以缓存多少组件实例

匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。

```html
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>
 
<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>
 
<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

max 最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。

```html
<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>
```

**注意**

> <keep-alive> 不会在函数式组件中正常工作，因为它们没有缓存实例。



本文转自：<https://blog.csdn.net/z591102/article/details/107380262>