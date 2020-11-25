**题目**

* 手写一个简易的ajax
* 跨域的常用实现方式

**知识点**

* XMLHttpRequest
* 状态码
* 跨域：同源策略，跨域解决方案

#### ajax核心API-XMLHttpRequest

手写原生Ajax请求

```js
// get 请求
// 初始化ajax实例
const xhr = new XMLHttpRequest()
// true 表示异步请求, false 表示同步请求
xhr.open('GET', '/api', true)
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      alert(xhr.responseText)
    } else {
      console.log('其他情况')
    }
  }
}
xhr.send(null)


// post 请求
// 初始化ajax实例
const xhr = new XMLHttpRequest()
// true 表示异步请求
xhr.open('POST', '/api', true)
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      alert(xhr.responseText)
    } else {
      console.log('其他情况')
    }
  }
}
const postData = {
  userName: 'zhangsan',
  password: '123456'
}

xhr.send(JSON.stringify(postData))
```



**`xhr.readyState` 取值含义**

* 0 - （未初始化）还没有调用 `send()`方法
* 1 - （载入）已经调用 `send()` 方法，正在发送请求
* 2 - （载入完成）`send()` 方法执行完成，已经接收到全部响应内容
* 3 - （交互）正在解析相应的内容
* 4 - （完成）响应内容解析完成，可以在客户端调用

只有在 `readyState` 的值为 4 的时候才能拿到 `responseText` 并使用



**`xhr.status` 取值**

* 2xx - 表示成功处理请求，如 200
* 3xx - 需要重定向，浏览器直接跳转，如 301 302 304
* 4xx - 客户端请求错误，如404（资源未找到） 403（没有权限）
* 5xx - 服务器端错误



#### 跨域

**什么是同源策略(浏览器中)？**

* Ajax 请求时，**浏览器**要求当前网页和 server 必须同源（保证安全）
* 同源： 协议、域名、端口，三者必须一致。
* 前端：http://a.com:8080/;  server: https://b.com/api/xxx; 两者不同源

**加载图片 css js 可以无视同源策略**

* `<img src=跨域的图片地址>` 如果引用的图片网站做了图片的防盗链，那么浏览器就无法加载这个图片
* `<link href=跨域的css地址>`
* `<script src=跨域的js地址><script>`
* `<img />` 可用于统计打点，可使用第三方统计服务
* `<link /> 和 <script> ` 可使用 CDN，CDN一般都是外域
* `<script>` 可实现 JSONP

**跨域**

* 所有的跨域都必须经过 server 端的允许和配合 
* 未经过 server 端允许就实现跨域，说明浏览器有漏洞，危险信号



#### 跨域的常见方式 JSONP 和 CORS

* `<script>` 可绕过跨域限制
* 服务器可以任意动态拼接数据返回
* 所以，通过`<script>` 可以获得跨域的数据，只要服务端允许

demo

```html
<script>
  window.jsonpFun = function (data) {
	console.log(data)
  }
</script>
<script src='http://localhost:8081/jsonp.js?name=zhangsan&callback=jsonpFun'></script>
```

**jQuery 实现 ajax跨域**

```js
$.ajax({
  url: 'http://localhost:8081/jsonp.js',
  dataType: 'jsonp',
  jsonpCallback: 'callback',
  success: function (data) {
    console.log(data)
  }
})
```



**CORS-服务器设置 http header**

CORS跨域是通过后端实现的，如果后端设置了CORS跨域，那么浏览器就可以直接请求

![CORS设置跨域](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200727213749.png)



**手写简易ajax请求**

```js
function ajax(url) {
  const p = new Promise((resolve, reject) => {
	const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function () {
	  if (xhr.readyState === 4 && xhr.status === 200) {
		resolve(JSON.parse(xhr.responseText))
      } else {
        reject(new Error('error'))
      }
    }
    xhr.send(null)
  })
  return p
}

const url = '/data/test.json'
ajax(url)
.then(res => {console.log(res)})
.catch(err => {console.log(err)})
```

实际中常用的ajax插件：jquery使用ajax；fetch(兼容性不好)；axios(多用于框架中)