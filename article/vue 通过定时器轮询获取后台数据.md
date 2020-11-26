需求：每隔一段时间获取最新数据，然后渲染到页面。如下图效果。

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/test.gif)

思路：使用定时器，每隔一段时间发起一次请求。

代码：

```js
data() {
  return {
    // 定时器
    timer: null，
    // 展示的数据
    info: []
  }
}，
methods: {
  getInfo() {
    // 轮询获取更新过程中的信息
      let num = 1
      if (this.timer) {
        clearInterval(this.timer)
      } else {
        this.timer = setInterval(() => {
          // 在这里发送请求获取数据
          this.updateInfo.push('升级的第'+ num++ +'步')
          if (num === 3) {
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1500);
      }
  }
}
```

**清理定时器的时机：**

* 通常情况下，我们可以在 `destroyed`钩子函数中清除定时器
* 但有些时候，比如在 dialog 弹出框中就无法使用 `destroyed` 钩子清除，可以根据代码逻辑在合适的地方清除定时器。

```js
// 清除定时器的代码
clear() {
  clearInterval(this.timer)
  this.timer = null
}
```

#### 滚动条显示在对底部---展示最新的内容

当轮询的数据过多出现滚动条的时候，我们希望滚动条显示在最底部，也就是展示最新的信息。

**思路：**利用 JS 中的 `scrollTop = scrollHeight` 来实现

* `scrollHeight` ：包括 `overflow` 样式属性导致的视图中不可见内容，没有垂直滚动条的情况下，`scrollHeight` 值与元素视图填充所有内容所需要的最小值`clientHeight` 相同。包括元素的 `padding`，但不包括元素的 ` margin`。
* `scrollTop `：可以设置或者获取一个元素距离他容器顶部的像素距离。一个元素的 `scrollTop` 是可以去计算出这个元素距离它容器顶部的可见高度。当一个元素的容器没有产生垂直方向的滚动条,那它的 `scrollTop` 的值默认为0。

**实现代码：**

添加下面的代码到定时器中 

```js
this.$nextTick(() => {
  let info = this.$refs.updateInfoRef
  info.scrollTop = info.scrollHeight
})
```

参考文章：<https://blog.csdn.net/weixin_38858002/article/details/82114774>

<https://blog.csdn.net/weixin_41190571/article/details/86509383>