第一种方法: main.js

```js
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
});
```



第二种方法：
　在创建router实例时，做如下的配置
　savedPosition当且仅当通过浏览器的前进/后退按钮触发时才可用

```js
scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    }
    return {x: 0, y: 0}
}
```



第三种方法：

​	找到入口切换路由的页面App.vue文件下，添加watch事件，全局监听路由。

```js
// 使用watch 监听$router的变化,
 watch: {
    '$route': function(to,from){
　    document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
```



本文转自：<https://blog.csdn.net/iCrazyTimor/article/details/103309939>