**题目：**

* http 常见的状态码有哪些？
* http 常见的 header 有哪些？
* 什么是 Restful API？
* 描述一下 http 的缓存机制（重要）

#### http 状态码

**状态码分类**

* 1xx 服务器收到请求
* 2xx 请求成功，如 200
* 3xx 重定向（到某一个地址不被允许，重新定向到另一个地址，浏览器做），如 302
* 4xx 客户端错误（客户端请求的地址不存在），如 404
* 5xx 服务端错误（服务端报错、挂掉之类），如 500

**常见的状态码**

* 200 成功
* 301 永久重定向（配合location，浏览器自动处理。）
  * 场景：旧的地址不再使用，浏览器访问返回 301 和 location 地址，重新定向到新地址，浏览器下次访问时直接到新的地址，不再访问旧的地址
* 302 临时重定向（配合 location，浏览器自动处理。）
  * 场景：浏览器访问时根据 302 状态码和 location 携带的新地址，重新定向到新地址，但下次访问时还会访问之前的地址。
  * 实例：在百度上搜索某项内容，实际上会先跳转到百度内部的网址，然后服务端返回302状态码，以及 location 携带的新的网址，浏览器就会重定向到目标内容的网址。
* 304 资源未被修改：可以使用本地缓存，不会再次发起请求
* 404 资源未找到
* 403 没有权限
* 500 服务器错误
* 504 网关超时



#### Restful API

**传统的 methods**

* get 获取服务器的数据
* post 向服务器提交数据
* 简单的网页功能，就这两个操作

**现在的 methods**

* get 获取数据
* post 新建数据
* patch/put 更新数据
* delete 删除数据

**Restful API**

* 一种新的 API 设计方法（早已推广使用）
* 传统 API 设计：把每个 url 当作一个功能
* Restful API 设计：把每个 url 当作一个唯一的资源

**如何设计成一个资源？**

* 尽量不用 url 参数
  * 传统 API 设计： `/api/list?pageIndex=2`
  * Restful API 设计：`/api/list/2`
* 用 **methods** 表示操作类型
  * **传统 API 设计：**
    - post 请求  `/api/create-blog`
    - post 请求  `/api/updata-blog?id=100`
    - get 请求 `/api/get-blog?id=100`
  * **Restful API 设计:**
    * post 请求 `/api/blog`
    * patch 请求 `/api/blog/100`
    * get 请求 `/api/blog/100`



#### 常见的http headers

**常见的 Request Headers（请求头）**

* Accept 浏览器可接收的数据格式
* Accept-Encoding 浏览器可接收的压缩算法，如gzip
* Accept-Language 浏览器可接收的语言，如 zh-CN
* Connection：值为keep-alive，一次TCP连接可重复使用
* cookie
* Host 请求的域名
* User-Agent(UA) 浏览器信息
* Content-type 发送数据的格式，如 application/json

**常见的 Response Headers（响应头）**

* Content-type 返回数据的格式，如 application/json
* Content-length 返回数据的大小，多少字节
* Content-Encoding 返回数据的压缩算法，如 gzip
* Set-Cookie 

缓存相关的 headers

* Cache-Control
* Expires
* Last-Modified
* If-Modified-Since
* Etag
* If-None-Match

#### http 缓存

**缓存介绍**

缓存：把没有必要请求的内容，缓存一份，就不用浪费资源去发起请求了。

为什么需要缓存？

**让页面加载更快。**网络请求加载速度比较慢，因此尽量减少网络请求可以让页面加载速度更快

哪些资源可以被缓存？**静态资源（js css img）**



**强制缓存-Cache-Control**

* 由服务端在 Response Headers 中设置
* 控制强制缓存的逻辑
* 例如 `Cache-Control: max-age=31536000(单位秒)`设置缓存的时间

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200728214259.png)

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200728214406.png)

**cache-control 的取值：**

* <span style="color: red;">max-age：</span>最长缓存时间
* <span style="color: red;">no-cache：</span>不用本地缓存，到服务端请求
* no-store：不用本地缓存，而且不用服务端的缓存
* private：最终用户缓存
* public：允许中间的路由缓存



**协商缓存( Etag 和 Last-Modified )**

* 服务端缓存策略
* 服务端判断客户端资源，是否和服务端资源一样
* 一致则返回 304 ，否则返回 200 和最新的

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200728215753.png)

**资源标识：**

* 在 Response Headers 中，有两种标识
* Last-Modified 资源的最后修改时间
* Etag 资源的**唯一标识**（一个字符串）

**Last-Modified**

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200728220430.png)

**Etag**

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200728220615.png)

**协商缓存效果：**

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200728220854.png)

**Last-Modified 和 Etag** 

* 会优先使用 Etag
* Last-Modified 只能精确到秒级
* 如果资源被重复生成，而内容不变，则 Etag 更精准



**Http 缓存综述**

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200728224323.png)

#### 页面刷新对http缓存的影响

**三种刷新操作：**

* 正常操作：地址栏输入 url，跳转链接，前进后退等
* 手动刷新：F5或点击刷新按钮，右击菜单刷新
* 强制刷新：ctrl + F5

**不同刷新操作，不同的缓存策略**

* 正常操作：强制缓存和协商刷新都有效
* 手动刷新：强制缓存失效，协商缓存有效
* 强制刷新：强制缓存和协商缓存都失效



