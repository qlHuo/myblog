### 一、真实 DOM 及其解析流程

本节我们主要介绍真实 DOM 的解析过程，通过介绍其解析过程以及存在的问题，从而引出为什么需要虚拟 DOM 。下图为 Webkit 渲染引擎工作流程图。

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20201012181014.png)

所有的浏览器渲染引擎工作流程大致分为 5 步：创建 DOM 树 -- 创建 style Rules -- 构建 Render 树 -- 布局 layout -- 绘制 Painting。

* **构建 DOM 树：**用 HTML 分析器，分析 HTML 元素，构建一个 DOM 树
* **生成样式表：**用 CSS 分析器，分析 CSS 文件和元素上的 inline 样式，生成页面的样式表
* **构建 Render 树：**将 DOM 树和样式表关联起来，构建一棵 render 树（attachment）。每个 DOM 节点都有 attach 方法，接受样式信息，返回一个 render对象（又名 renderer），这些 render 对象最终会被构建成一个 render 树。
* **确定节点坐标：**根据 Render 树结构，为每个 render 书上的节点确定一个在显示屏上出现的精确坐标
* **绘制页面：**根据 render 树和节点显示坐标，然后调用每个节点的 paint 方法，将他们绘制出来。

**注意点：**

1. **DOM 树的构建是文档加载完成开始的？**构建 DOM 树是一个渐进的过程，为达到更好的用户体验，渲染引擎会尽快将内容显示在屏幕上，它不必等到整个 HTML 文档解析完成之后才开始构建 render 树和布局。
2. **render 树是 DOM 树和 CSS 样式表构建完毕后才开始创建的？**这三个过程在实际进行的时候并不是完全独立的，而是会有交叉，会一边加载、一边解析、一边渲染。
3. **CSS 的解析注意点？**CSS 的解析是从右往左逆向解析的，嵌套标签越多，解析越慢。
4. **JS 操作真实 DOM 的代价？** 使用传统的开发模式，原生 JS 或者 JQ 操作 DOM 时，浏览器会从构建 DOM 树开始从头到尾执行一遍流程。在一次操作中，我需要更新 10 个 DOM 节点，浏览器收到第一个 DOM 请求后并不知道还有 9 次 更新操作，因此会马上执行流程，最终执行 10 次。例如，第一次计算完，紧接着下一个 DOM 更新请求，这个节点的坐标值就变了，前一次计算为无用功。计算 DOM 节点坐标值等都是白白浪费的性能。即使计算机硬件一直在迭代更新，操作 DOM 的代价仍旧是昂贵，频繁操作还是会出现页面卡顿，影响用户体验。

### 二、Virtual-DOM 介绍

#### 2.1 虚拟 DOM 的好处

虚拟 DOM 就是为了解决浏览器性能问题而被设计出来的。如前，若一次操作中有 10 次更新 DOM 的动作，虚拟 DOM 不会立即操作 DOM ，而是将这 10 次更新的 diff 内容保存到一个 JS 对象中，最终将这个 JS 对象一次性 attch 到 DOM 树上，再进行后续操作，避免大量无谓的计算量。所以，**用 JS 对象模拟 DOM 节点的好处是：**页面的更新可以先全部反映到 JS 对象（虚拟 DOM ）上，操作内存中的 JS 对象的速度显然要更快，等全部更新完成后，再将最终的 JS 对象隐射成真实的 DOM，交由浏览器去绘制。

简单理解：虚拟 DOM 就是一个普通的 JavaScript 对象，包含了 tag、props、children 三个属性。

#### 2.2 算法实现

**2.2.1 用 JS 对象模拟 DOM 树**

例如，一个真实的 DOM 节点如下：

```html
<div id="virtual-dom">
    <p>Virtual DOM</p>
    <ul id="list">
        <li class="item">Item 1</li>
        <li class="item">Item 2</li>
        <li class="item">Item 3</li>
    </ul>
    <div>Hello World</div>
</div> 
```

我们用 `JavaScript` 对象来表示 `DOM` 节点，使用对象的属性记录节点的类型、属性、子节点等。

`element.js` 中表示节点对象代码如下：

```js
/**
 * Element virdual-dom 对象定义
 * @param {String} tagName - dom 元素名称
 * @param {Object} props - dom 属性
 * @param {Array<Element|String>} - 子节点
 */
function Element(tagName, props, children) {
    this.tagName = tagName
    this.props = props
    this.children = children
    // dom 元素的 key 值，用作唯一标识符
    if(props.key){
       this.key = props.key
    }
    var count = 0
    children.forEach(function (child, i) {
        if (child instanceof Element) {
            count += child.count
        } else {
            children[i] = '' + child
        }
        count++
    })
    // 子元素个数
    this.count = count
}

function createElement(tagName, props, children){
 return new Element(tagName, props, children);
}

module.exports = createElement;

```

根据 `element` 对象的设定，则上面的 `DOM` 结构就可以简单表示为：

```js
var el = require("./element.js");
var ul = el('div',{id:'virtual-dom'},[
  el('p',{},['Virtual DOM']),
  el('ul', { id: 'list' }, [
	el('li', { class: 'item' }, ['Item 1']),
	el('li', { class: 'item' }, ['Item 2']),
	el('li', { class: 'item' }, ['Item 3'])
  ]),
  el('div',{},['Hello World'])
]) 
```

现在 `ul` 就是我们用 `JavaScript` 对象表示的 `DOM` 结构，我们输出查看 `ul` 对应的数据结构如下：

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20201012201047.png)

**2.2.2 渲染用 js 表示的 DOM 对象**

但是页面上并没有这个结构，下一步我们介绍如何将 `ul` 渲染成页面上真实的 `DOM` 结构，相关渲染函数如下：

```js
/**
 * render 将virdual-dom 对象渲染为实际 DOM 元素
 */
Element.prototype.render = function () {
    var el = document.createElement(this.tagName)
    var props = this.props
    // 设置节点的DOM属性
    for (var propName in props) {
        var propValue = props[propName]
        el.setAttribute(propName, propValue)
    }

    var children = this.children || []
    children.forEach(function (child) {
        var childEl = (child instanceof Element)
            ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
            : document.createTextNode(child) // 如果字符串，只构建文本节点
        el.appendChild(childEl)
    })
    return el
} 

```

我们通过查看以上 `render` 方法，会根据  `tagName` 构建一个真正的 `DOM` 节点，然后设置这个节点的属性，最后递归地把自己的子节点也构建起来。

我们将构建好的 `DOM` 结构添加到页面 `body` 上面，如下：

```
ulRoot = ul.render();
document.body.appendChild(ulRoot); 
```

这样，页面 `body` 里面就有真正的 `DOM` 结构，效果如下图所示：

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20201012201612.png)



通过 JS 模拟 DOM 并渲染相对应的 DOM 只是第一步，难点在于如何判断新旧两个 JS 对象的最小差异并且实现局部更新 DOM。这就需要 diff 算法了。

#### 虚拟 DOM 真的能提升性能吗？

使用虚拟 DOM，**在DOM 阶段操作少了通讯的确是变高效了，但代价是在 JS 阶段需要完成额外的工作**（diff计算），这项额外的工作是需要耗时的！

虚拟 DOM **并不是说比原生 DOM API 的操作快，而是说不管数据怎么变化，都可以以最小的代价来进行更新 DOM**。在每个点上，其实用手工的原生方法会比 diff 好很多。比如说仅仅是修改了一个属性，需要整体重绘吗？显然这不是虚拟 DOM 提出来的意义。框架的意义在于掩盖底层的 DOM 操作，用更声明式的方式来描述，从而让代码更容易维护。

#### diff算法

首先 DOM 是一个多叉树的结构，如果需要完整的对比两颗树的差异，那么需要的时间复杂度会是 O(n ^ 3)，这个复杂度肯定是不能接受的。于是 React 团队优化了算法，实现了 O(n) 的复杂度来对比差异。 实现 O(n) 复杂度的关键就是**只对比同层的节点**，而不是跨层对比，这也是考虑到在实际业务中很少会去跨层的移动 DOM 元素。 所以判断差异的算法就分为了两步

- 首先从上至下，从左往右遍历对象，也就是树的深度遍历，这一步中会给每个节点添加索引，便于最后渲染差异
- 一旦节点有子元素，就去判断子元素是否有不同，包括**节点互换、顺序替换、属性更改、文本改变**

在第一步算法中，需要判断新旧节点的 `tagName` 是否相同，如果不相同的话就代表节点被替换了。如果没有更改 `tagName` 的话，就需要判断是否有子元素，有的话就进行第二步算法。

在第二步算法中，需要判断原本的列表中是否有节点被移除，在新的列表中需要判断是否有新的节点加入，还需要判断节点是否有移动。

举个例子来说，假设页面中只有一个列表，我们对列表中的元素进行了变更

```js
`// 假设这里模拟一个 ul，其中包含了 5 个 li``[1, 2, 3, 4, 5]``// 这里替换上面的 li``[1, 2, 5, 4]`
```

从上述例子中，我们一眼就可以看出先前的 `ul` 中的第三个 `li` 被移除了，四五替换了位置。

那么在实际的算法中，我们如何去识别改动的是哪个节点呢？这就引入了 `key` 这个属性。这个属性是用来给每一个节点打标志的，用于判断是否是同一个节点。

当然在判断以上差异的过程中，我们还需要判断节点的属性是否有变化等等。

当我们判断出以上的差异后，就可以把这些差异记录下来。当对比完两棵树以后，就可以通过差异去局部更新 DOM，实现性能的最优化。

本文转自：https://juejin.im/post/6844903895467032589

https://blog.nowcoder.net/n/98624ca487424703aa72caf601141b78

