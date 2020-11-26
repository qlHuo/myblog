nprogress 插件是在**页面刷新**和**跳转**时出现在浏览器顶部的进度条，它会随着页面的加载而显示进度状态。可在[官网](http://ricostacruz.com/nprogress/) 查看相关效果。

#### 在vue项目中使用 nprogress 插件

1.安装：`npm install --save nprogress`

2.在 src -> utils 文件夹下创建 nprogress.js 文件

```js
import router from '@/router' // 必须引入router
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 注意要引入css样式文件

router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
  next()
})

router.afterEach(() => {
  NProgress.done() // 进度条结束
})

// 进度条的配置项：ease可以设置css3动画，如ease，linear；speed是进度条从开始到结束的耗时
NProgress.configure({ease:'linear',speed: 500});
```

3.在 main.js 中引入 nprogress.js 文件

```js
import './utils/nprogress'
```

4.自定义进度条样式

​	在 app.vue 中的 style 中可以自定义进度条的样式

```html
<style>
  #nprogress .bar {
	background: red !important;
  }
</style>
```



参考文章：<https://blog.csdn.net/yxf15732625262/article/details/97319514>