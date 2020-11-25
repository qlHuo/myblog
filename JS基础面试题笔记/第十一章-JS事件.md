#### 事件绑定和事件冒泡

**题目**

*  编写一个通用的事件监听函数
* 描述事件冒泡的流程
* 无限下拉图片列表，如何监听每个图片的点击

**知识点**

* 事件绑定
* 事件冒泡
* 事件代理

**事件绑定**

通过 `addEventListener(type, fn)` 进行事件绑定，下面为事件绑定函数简单封装

```js
// 通用的事件绑定函数
function bindEvent(elem, type, fn) {
  elem.addEventListener(type, fn)
}

const a = document.getElementById('link1')
bindEvent(a, 'click', event => {
  console.log(event.target) // 打印的时当前元素 a
  event.preventDefault() // 阻止默认行为
  alert('clicked')
})

```



**事件冒泡**

事件冒泡：基于DOM树形结构，事件会顺着触发元素向上冒泡。为父元素绑定事件，当触发子元素时利用事件冒泡机制会触发父元素绑定的事件。应用场景：事件代理

```js
// 通用的事件绑定函数
function bindEvent(elem, type, fn) {
  elem.addEventListener(type, fn)
}

const body = document.body
// 为 body 绑定事件，当点击body的子元素的时候，会冒泡到body身上，因此会触发body上面绑定的事件
bindEvent(body, 'click', event => {
  console.log('body clicked')
  console.log(event.target) // 点击的元素
})

// 当点击p1的时候，p1 会冒泡到body上，通过 stopPropagation() 阻止冒泡
const p1 = document.getElementById('p1')
bindEvent(p1, 'click', event => {
  event.stopPropagation() // 阻止冒泡
  console.log('p1 clicked')
})
```



**事件代理**

通过冒泡机制，内部元素不绑定事件，而为外层元素绑定事件，从而实现事件代理。**应用场景：**无限下拉图片列表，如何监听每个图片的点击

* 代码简洁
* 减少浏览器内存的占用
* 不要滥用代理

```html
<div id='div1'>
  <a href='#'>a1</a>
  <a href='#'>a2</a>
  <a href='#'>a3</a>
  <a href='#'>a4</a>
  <button>点击增加一个 a 标签</button>
</div>


<script>
  // 给父元素绑定事件，通过事件冒泡机制，点击子元素时触发事件
  const div1 = document.getElementById('div1')
  div1.addEventListener('click', event => {
    event.preventDefault() // 阻止a标签默认行为
    const target = event.target
    if (event.nodeName === 'A') {
      alert(target.innerHTML)
    }
  })
</script>
```



**通用的事件绑定函数(事件代理和普通绑定)**

```js
function bindEvent(elem, type, selector, fn) {
  // 如果是普通绑定，只需要传入三个参数，即把fn设置为selector，selector设置为null
  if (fn == null) {
    fn = selector
    selector = null
  }
  elem.addEventListener(type, event => {
    // 获取触发的元素
    const target = event.target
    // 如果有selector说明是代理的情况，并且触发的元素和传入的元素相同
    if (selector && target.matches(selector)) {
      fn.call(target, event)
    } else {
      // 普通绑定
      fn.call(target, event)   
    }
  })
}

// 普通绑定 注意箭头函数的this指向
const btn1 = document.getElementById('btn')
bindEvent(btn1, 'click', function (event) {
  event.preventDefault() // 阻止默认行为
  alert(this.innerHTML)
})

// 代理绑定
const div1 = document.getElementById('div1')
bindEvent(div1, 'click', 'A', function (event) {
  event.preventDefault()
  alert(this.innerHTML)
})
```



---------------------------下面为补充内容------------------------------

#### 事件捕获，事件冒泡和事件代理

事件捕获和事件冒泡都是为了解决页面中事件流(事件的执行顺序)的问题。

```html
<div id='outer'>
  <p id='inner'>click me</p>
</div>
```

**事件捕获：**事件从最外层触发，直到找到最具体的元素。

如上面的代码，在事件捕获下，如果点击p标签，click 事件的顺序应该是 `document->html->body->div->p`

**事件冒泡：**事件会从最内层的元素开始发生，一直向上传播，直到触发 `document` 对象。

因此在事件冒泡下，p 元素发生 click 事件的顺序为 `p->div->body->html->document`

**事件绑定：**

js 通过 `addEventListener` 绑定事件。`addEventListener` 的第三个参数就是为事件冒泡和事件捕获准备的。

`addEventListener` 有三个参数：

>element.addEventListener(event, function, useCapture)

* 第一个参数是：需要绑定的事件
* 第二个参数是：触发事件后要执行的函数
* 第三个参数是：默认值是 `false` ，表示在 **事件冒泡阶段** 调用事件处理函数；如果设置为 `true` ，则表示在 **事件捕获阶段** 调用事件处理函数。

**事件代理（事件委托）**

对于事件代理来说，在事件捕获或者事件冒泡阶段处理并没有明显的优劣之分，但是由于事件冒泡的事件流模型被所有的主流浏览器兼容，从兼容性角度来说通常使用事件冒泡模型。

**为什么要使用事件代理？**
比如100个（甚至更多）li 标签绑定事件，如果一个一个绑定，不仅相当麻烦，还会占用大量的内存空间，降低性能。而使用事件代理作用如下：

* 代码简洁
* 减少浏览器内存占用

**事件代理的原理：**

事件代理（事件委托）是利用事件的冒泡原理来实现的，比如当我们点击内容的li标签时，会冒泡到外层的ul标签上。因此，当我们想给很多个li标签添加事件的时候，可以给他的父级元素添加对应的事件，当触发任意li元素时，会冒泡到其父级元素，这时绑定在父级元素的事件就会被触发，这就是事件代理（委托），委托他们的父级元素代为执行事件。

demo

```html
<ul id="ul1">
    <li>111</li>
    <li>222</li>
    <li>333</li>
    <li>444</li>
</ul>
<script>
	window.onload = function(){
    	var oUl = document.getElementById("ul1");
   		oUl.onclick = function(){
        	alert(123);
    	}
	}
</script>
```



参考文章：https://segmentfault.com/a/1190000005654451

