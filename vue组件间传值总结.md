vue 组件间传值总结：

* 父组件向子组件传值
* 子组件向父组件传值
* 祖孙组件间传值
* 兄弟组件间传值

#### 父组件向子组件传值

* `props` 和 `$emit()`
* `$parent ` 和  `$children` ：子组件通过`this.$parent`可以获取到父组件的数据，父组件通过 `this.$chilren()`可以直接获取子组件中的数据，而不用通过数据绑定或者监听自定义组件的形式获取数据。
* `$refs`：`$refs`可以直接获取组件的数据，通过`this.$refs.组件名()`可以直接获取该组件的所有内容

基本思路：

在父组件中使用子组件，以属性绑定的方式绑定数据到子组件上，子组件通过 `props` 属性接收，即可实现父组件向子组件传值。参照下面的例子。

father.vue

```vue
<template>
  <div class="father">
    <div>我是父组件</div>
    <child :words="msg"></child>
  </div>
</template>
<script>
import child from '@/components/child.vue'
export default {
  name: 'Home',
  components: {
    child
  },
  data () {
    return {
      msg: "我是父组件传递的值"
    }
  }
}
</script>
```

child.vue

```vue
<template>
  <div class="child">
    <div>我是子组件</div>
    <span class="words">{{words}}</span>
  </div>
</template>
<script>
export default {
  props: ['words']
}
</script>
<style scoped>
  .child {
    background: pink;
  }
  .words {
    color: red;
  }
</style>
```

显示结果如下：当前页面为父组件渲染出来的页面效果，粉红背景区域为子组件渲染部分，红色的字是父组件向子组件传递的值。

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200801170607.png)

#### 子组件向父组件传值

* 子组件使用 `$emit()` 向父组件传值，`$emit('自定义事件名'， 参数)` 
* 父组件使用 `v-on` 监听子组件传递的自定义事件

home.vue

```vue
<template>
  <div class="father">
    <div>我是父组件</div>
    <child @receiveMeg="handleMeg($event)"></child>
    <div>{{message}}</div>
  </div>
</template>
<script>
import child from '@/components/child.vue'
export default {
  components: {
    child
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    handleMeg (msg) {
      console.log(msg)
      this.message = msg
    }
  }

}
</script>
```

child.vue

```vue
<template>
  <div class="child">
    <div>我是子组件</div>
    <button @click="transMsg">点击向父组件传值</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      childMeg: '我是子组件的数据'
    }
  },
  methods: {
    transMsg () {
      this.$emit('receiveMeg', this.childMeg)
    }
  }
}
</script>
<style scoped>
  .child {
    background: pink;
  }
</style>
```

显示结果如下：当点击按钮时，子组件通过 `this.$emit('receiveMeg', this.childMeg)` 将子组件中的数据传递出去，在父组件中通过监听子组件传递的自定义事件获取到子组件中的数据。

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200801173143.png)

#### 祖孙组件传值

祖孙组件传值实际上是在父子组件传值的基础上再次传递了一层，father组件实际上充当了过渡者的角色，本质上还是父子组件传值的套路。

**祖向孙传值**

grandfather.vue

```vue
<template>
  <div class="father">
    <div>我是GrandFather组件</div>
    <child :msg='message'></child>
  </div>
</template>
<script>
import child from '@/components/child.vue'
export default {
  components: {
    child
  },
  data () {
    return {
      message: '我是GrandFather组件的数据'
    }
  }
}
</script>
```

father.vue

```vue
<template>
  <div class="child">
    <div>我是father组件</div>
    <grandson :parentmsg="msg"></grandson>
  </div>
</template>
<script>
import grandson from '@/components/grandson.vue'
export default {
  props: ['msg'],
  components: {
    grandson
  }
}
</script>
<style scoped>
  .child {
    background: pink;
  }
</style>
```

grandSon.vue

```vue
<template>
  <div class="grandson">
    <div>我是grandson组件</div>
    <div>{{parentmsg}}</div>
  </div>
</template>
<script>
export default {
  props:['parentmsg']  
}
</script>
<style scoped>
.grandson {
  background: #ccc;
}
</style>
```

**孙向组传值**

grandFather.vue

```vue
<template>
  <div class="father">
    <div>我是GrandFather组件</div>
    <child @receiveGrandSon="handleMsg"></child>
    <div>{{msg}}</div>
  </div>
</template>
<script>
import child from '@/components/child.vue'
export default {
  components: {
    child
  },
  data () {
    return {
      msg: ""
    }
  },
  methods: {
    handleMsg(msg) {
      this.msg = msg
    }
  }
}
</script>
```

father.vue

```vue
<template>
  <div class="child">
    <div>我是father组件</div>
    <grandson @listenGrandSon="sendFather"></grandson>
  </div>
</template>
<script>
import grandson from '@/components/grandson.vue'
export default {
  components: {
    grandson
  },
  methods: {
    sendFather (msg) {
      this.$emit('receiveGrandSon', msg)
    } 
  }
}
</script>
<style scoped>
  .child {
    background: pink;
  }
</style>
```

grandSon.vue

```vue
<template>
  <div class="grandson">
    <div>我是grandson组件</div>
    <button @click="sendMsg">孙向祖传值</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '我是来自孙组件的值'
    }
  },
  methods: {
    sendMsg() {
      this.$emit('listenGrandSon', this.msg)
    }
  }
}
</script>
<style scoped>
.grandson {
  background: #ccc;
}
</style>
```

效果如下：

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200801234849.png)

**另外一种祖孙组件传值**

中间组件（父组件）使用 `v-bind="$attrs"` 和 `v-on="$listeners"` 简化传值操作。`$attrs` 是祖组件向孙组件传递的值，`$listeners` 是孙组件向祖组件传递的值。

**祖传孙**

父组件添加 `v-bind="$attrs"` ： 祖孙组件的代码如上面通过 `props` 传值方式，grandSon组件接收时直接接收grandFather绑定的属性即可。修改父组件的代码如下：

```vue
<template>
  <div class="child">
    <div>我是father组件</div>
    <grandson v-bind="$attrs"></grandson>
  </div>
</template>
<script>
import grandson from '@/components/grandson.vue'
export default {
  components: {
    grandson
  }
}
</script>
```

**孙传祖**

父组件添加 `v-on="$listeners"` ：同祖向孙传值类似，父组件添加 `v-on="$listeners"` ，祖组件直接监听孙组件传递过来的自定义事件即可。

孙组件向祖组件触发自定义事件时有两种方式：

* `this.$listeners.eventName(param)`
* `this.$emit('eventName', param)`

```vue
<template>
  <div class="child">
    <div>我是father组件</div>
    <grandson v-on="$listeners"></grandson>
  </div>
</template>
<script>
import grandson from '@/components/grandson.vue'
export default {
  components: {
    grandson
  }
}
</script>
```

#### 兄弟组件间传值（非父子组件）

* 兄弟组件间（非父子组件）传值需要借助事件中心，通过事件中心传递数据
* 事件中心的定义方式：`const bus = new Vue();`
* 传递数据方：通过一个事件触发 `bus.$emit('监听的事件', 传递的数据)`
* 接收数据方：通过 `mounted (){}` 钩子函数中触发 `bus.$on('监听的事件', param => {})` 方法获取，回调函数中的 param 就是兄弟组件传递的数据。
* 销毁事件：通过 `bus.$off('监听的事件')` 销毁之后，
* 无法进行数据的传递。

1.新建一个 eventbus.js 文件，定义事件中心

```js
import Vue from 'vue'

export default new Vue
```

2.新建第一个兄弟组件（发送方），引入事件中心bus，通过 `bus.$emit('监听的事件', 传递的数据)`向外传递一个监听事件并传递数据。

```vue
<template>
  <div id="first">
    <h2>第一个兄弟组件</h2>
    <button @click="sendMsg">向兄弟组件传值</button>
  </div>
</template>
<script>
import bus from '../assets/event-bus'
export default {
  data () {
    return {
      msg: '我是first组件中的数据'
    }
  },
  methods: {
    sendMsg () {
      bus.$emit('receiveMsg', this.msg)
    }
  }
}
</script>
```

3.新建第二个兄弟组件（接收方），引入事件中心bus，在 `mounted` 钩子函数中，通过 `bus.$on()` 监听 `receiveMsg` 事件，回调函数的参数用来接收传递过来的数据。

```vue
<template>
  <div id="second">
    <h2>第二个兄弟组件</h2>
    <button @click="sendMessage">向兄弟组件传值</button>
    <div>{{msg}}</div>
  </div>
</template>

<script>
import bus from '../assets/event-bus'
export default {
  data () {
    return {
      msg: ''
    }
  },
  mounted () {
    bus.$on("receiveMsg", msg => {
      this.msg = msg
    })
  }
}
</script>
```

4.父组件引入上面的俩组件，通过 `bus.$off()` 可以销毁事件，销毁之后就不可以传值了。

```vue
<template>
  <div class="father">
    <button @click="destroyBus">销毁事件</button>
    <first></first>
    <second></second>
  </div>
</template>
<script>
import bus from '../assets/event-bus'
import first from '@/components/first.vue'
import second from '@/components/second.vue'
export default {
  components: {
    first,
    second
  },
  methods: {
    destroyBus () {
      bus.$off('receiveMsg')
    }
  }
}
</script>
```

 

参考文章：<https://juejin.im/post/6844903686926254087>

<https://blog.csdn.net/qq_40738077/article/details/106765455>