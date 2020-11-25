#### BOM(Browser Object Model，浏览器对象模型)

题目：

* 如何识别浏览器的类型？
* 分析拆解url各个部分？

知识点：

* navigator（浏览器信息）
* screen（屏幕尺寸信息）
* location（地址栏信息）
* history（历史信息-前进/后退）

1. 通过 `navigator.userAgent` 判断浏览器的类型，判断方法可参考[这篇文章](https://blog.csdn.net/qq_33106863/article/details/80907071)，判断[safari浏览器](https://blog.csdn.net/xmy_wh/article/details/81060344)

谷歌浏览器测试：

![谷歌浏览器](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200726135907.png)

火狐浏览器测试：

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200726140130.png)

2. 通过 `screen.width screen.height ` 可以获取当前屏幕的宽高。

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200726141040.png)

3. 通过 location 可以获取浏览器地址栏中的信息

|        方法         |        描述        |
| :---------------: | :--------------: |
|   location.href   |   获取当前页面url地址    |
| location.protocol |       获取协议       |
|   location.host   |     获取主机/域名      |
| location.pathname |      获取文件路径      |
|  location.search  |      获取查询参数      |
|   location.hash   | 获取hash信息，#及后面的信息 |

![location演示](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200726142144.png)

4. 通过 `history.back() / history.forward()` 可以实现浏览器的前进后退功能，效果同点击左上角的箭头。



---------------------------------上面为课程内容，下面为补充内容-----------------------------

BOM(Browser Object Model)是指浏览器对象模型，提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。BOM由多个对象组成，其中代表浏览器窗口的 `window` 对象是 BOM 的顶级对象，其他对象都是 `window` 对象的子对象。

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200726145348.png)

#### BOM顶级对象 window

window是浏览器的顶级对象，当调用 window 下的属性和方法时，可以省略 window，如前文获取浏览器类型时完整写法为：`window.navigator.userAgent` 

> 注意：document 从属于 window

##### onload事件

`onload()` 事件于页面**加载完成**之后执行，作为JavaScript的入口函数，script 标签写在body 标签之前是需要使用 onload 来作为入口函数，否则 script 标签会阻塞页面的加载。

##### 定时器

**setTimeout() 和 clearTimeout()**

接受两个参数：第一个参数为回调函数（实现某一功能），第二个参数为 时间（毫秒数）；在指定的毫秒数到达之后执行指定的函数，只执行一次。

```js
// 创建一个定时器，1000毫秒后执行，返回定时器的标示
var timerId = setTimeout(function () {
  console.log('Hello World');
}, 1000);

// 取消定时器的执行
clearTimeout(timerId);
```

**setInterval() 和 clearInterval()**

定时调用，如果不停止或者清除会永远执行下去。

```js
// 创建一个定时器，每隔1秒调用一次
var timerId = setInterval(function () {
  var date = new Date();
  console.log(date.toLocaleTimeString());
}, 1000);

// 取消定时器的执行
clearInterval(timerId);
```

##### location 补充

```js
    onload=function () {
      document.getElementById("btn").onclick=function () {
        //设置跳转的页面的地址
       //location.href="http://www.jd.com";//属性
       //location.assign("http://www.jd.com");//方法
        //location.reload();//重新加载--刷新
        //location.replace("http://www.jd.com");//没有历史记录
      };
    };
```



参考文章：<https://juejin.im/entry/5aabcfc7f265da239f07228f>