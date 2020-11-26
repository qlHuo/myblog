使用 css 实现 loading 省略号效果，如下所示。

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/loading-test.gif)

示例代码：

```html
<span class="loading">等待中</span>

<style>
    .loading {
      color: red;
    }
    .loading:after {
      overflow: hidden;
      display: inline-block;
      /* vertical-align: bottom; */
      animation: ellipsis 1.5s infinite;
      content: "\2026"; /* ascii code for the ellipsis character */
      /* \2026 == ... */ 
      /* content: "..." */
    }
    @keyframes ellipsis {
      from {
        width: 2px;
      }
      to {
        width: 15px;
      }
    }
</style>
```

> 主要就是利用 css 动画实现 loading 效果，配合 `overflow: hidden` 属性实现。

这篇[张鑫旭的博文](https://www.zhangxinxu.com/wordpress/2016/11/css-content-pre-animation-character-loading/)也有相关介绍

参考文章：<https://blog.csdn.net/u014034575/article/details/46544969>