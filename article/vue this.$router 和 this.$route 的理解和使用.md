#### 理解

官方文档说明如下：

通过注入路由，我们可以在任何组件内通过 `this.$router`  访问路由器，也可以通过 `this.$route` 访问当前的路由。

注入路由，在 mian.js 中引入 路由，并且注入。

```js
import router from './router';
new Vue({
  el: '#app',
  router,
  ...
  mounted() { }
})
```

**可以理解为：**

* `this.$router` 相当于一个<span style='color: red'>全局</span>的路由对象，包含路由相关的属性、对象 (如 history 对象) 和方法，在任何页面都可以通过 `this.$router` 调用其方法如 `push()` 、`go()` 、`resolve()` 等。
*  `this.$route` 表示<span style='color: red'>当前</span>的路由对象。每一个路由都有一个 `route` 对象，它是一个局部的对象，可以获取当前路由对应的 `name ` , `params`,  `path` , `query` 等属性。 

> this.$router 等同于 router。在 main.js 中，我们直接引入了 router 则可以使用类似这样的方式 router.push() 调用相关属性或者方法。 

#### 使用: 以 push() 方法为例

在 vue 项目开发中， 我们通常使用 `router.push()` 实现页面间的跳转，称为编程式导航。这个方法会向 history 栈中添加一个历史记录，但用户点击浏览器的后退按钮时，就会回到之前的 URL。

> 当我们点击 <router-link > 时，会在内部调用 router.push() 方法。

**push方法调用：**

```js
//字符串  
this.$router.push('home') //->/home

//对象
this.$router.push({path:'home'}) //->/home

//命名的路由
this.$router.push({name:'user', params:{userId: '123'}}) //->/user/123

//带查询参数，变成 /register?plan=private
this.$router.push({path:'register', query:{plan:private}}) 

const userId = '123';
//这里的 params 不生效
this.$router.push({path:'/user', params:{userId}});  //->/user
```

> params 传参，push 里面只能是 name: 'xxx', 不能是 path: 'xxx'，因为 params  只能用 name 来引入路由，如果这里写成了 path ，接收参数页面会是 undefined。

**路由传参的方式：**

```js
1、手写完整的 path:
 
    this.$router.push({path: `/user/${userId}`});
 
    获取参数：this.$route.params.userId
 
2、用 params 传递：
 
    this.$router.push({name:'user', params:{userId: '123'}});
 
    获取参数：this.$route.params.userId
 
    url 形式：url 不带参数，http:localhost:8080/#/user
 
3、用 query 传递：
 
    this.$router.push({path:'/user', query:{userId: '123'}});
 
    获取参数：this.$route.query.userId
 
    url 形式：url 带参数，http:localhost:8080/#/user?userId=123
```

直白的说，query 相当于 get 请求，页面跳转的时候可以在地址栏看到请求参数，params 相当于 post 请求，参数不在地址栏中显示。

要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。