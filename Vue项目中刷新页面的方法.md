**Vue项目中刷新当前页面的方法**

* JS 原生刷新页面方法：`window.location.reload()`
* 利用路由刷新的方法：`this.$route.go(0)`
* 利用 vue 提供的 provide 和 inject 自定义刷新

> 前两种方法：js原生方法和路由刷新相当于强制刷新页面，虽然比较简单方便，但是一旦调用页面会出现明显的白屏现象，用户体样不好。下面介绍第三种方式，可以较好解决白屏问题。

#### 利用 `provide` 和 `inject` 实现页面刷新

* 首先在 App.vue 的 `<router-link />` 添加 `v-if` 属性

  ```html
  <router-link v-if='isRouterAlive'/>
  ```

* 其次在 data 里面添加 `isRouetrAlive`，这个属性名可以自定义，默认设置为 `true`，如果为 `false` 整个页面就不会显示了。

  ```js
  data () {
    return {
      isRouterAlive: true
    }
  }
  ```

* 然后在 methods 里面添加一个刷新方法

  ```js
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
  ```

* 最后需要把这个函数 provide 出去

  ```js
  provide () {
    return {
      reload: this.reload
    }
  }
  ```

**App.vue 组件上的设置已经完成，在需要刷新的页面上注入这个函数然后调用就可。**

* 首先注入这个函数，注意 `inject` 要放到 `data`  之前，否则会报错，报错原因有待研究。。

  ```js
  inject: ['reload']
  ```

* 然后再需要的地方调用即可

  ```js
  refresh () {
    this.reload()
  }
  ```

  > **这种方法不论子组件有多深，只要调用了inject那么就可以注入provide中的数据。**

**完整代码**

App.vue

```html
<template>
  <div id="app">
    <div class="wrap">
      <router-view v-if="isRouterAlive"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function() {
         this.isRouterAlive = true
      })
    }
  }
}
</script>
```

要使用的组件：

```html
<template>
  <button @click="refresh"></button>
</template>
<script>
  export default{
    name: 'refresh',
    inject: ['reload'],
    methods: {
      refresh () {
        this.reload()
      }
    }
  }
</script>
```

-----------不仔细导致的问题，记录一下----------

* 控制台报错 this.reload is not a funciton... 	**原因：**`App.vue` 组件中已经有了 `methods`，但我没仔细看于是多写了一个 `methods`，`reload()` 方法被覆盖

* 控制台报错 Maximum call stack size exceeded	**原因：** `inject:['reload']` 放在了 `data` 下面导致。

  ​

本文转自：<https://www.jianshu.com/p/b6d7db35b6e4>



