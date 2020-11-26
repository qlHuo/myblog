#### `router.resolve()` 的解释

```js
const resolved: {
  location: Location;
  route: Route;
  href: string;
} = router.resolve(location, current?, append?)
```

解析目标位置 (格式和 `<router-link>` 的 `to` prop 一样)。

- `current` 是当前默认的路由 (通常你不需要改变它)
- `append` 允许你在 `current` 路由上附加路径 (如同 [`router-link`](https://router.vuejs.org/zh/api/#router-link.md-props))

上面的内容为官网中的说明，可以得知其作用是：<span style="color: red;">返回一个完整的路径信息。</span>

> `location` 参数为必填项；`current` 和 `append` 为可选参数，暂时没有遇到过相关用法。

#### 应用场景

我们可以利用 `router.resolve` 自定义一个页面跳转的方法，

```js
Vue.prototype.$linkTo = function ({ path, query, type }) {
  if (typeof (arguments[0]) != 'object') {
    // 跳转路径
    path = arguments[0];
  }
  // 请求参数
  query = query || {};
  // 跳转类型
  type = type || '_self';
  let routeData = router.resolve({
    path: path,
    query: query || {}
  })
  console.log('router.resolve()的返回值：', routeData)
  window.open(routeData.href, type);
}

```

```html
// 调用
<button @click="$linkTo({ path: demoURL, query: { param1: xxx, param2: yyy } })"></button>
```

下面是 `router.resolve()` 的返回信息

![router.resolve()的返回值](https://gitee.com/aurorapic/BlogPic/raw/master/img/router.resolve()返回值.png)

