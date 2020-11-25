知识点：cookie，localStorage，sessionStorage

#### cookie

* 本身用于浏览器和 server 端通信
* 被“借用”到本地存储来
* 可以使用 `document.cookie='...'` 来修改

> cookie的内容为 `key=value;`的形式，`document.cookie` 这个api每次只能设置一个`key=value` 的内容，设置其他值会追加到cookie

**cookie的缺点**

* 存储大小，最大4kb
* http 请求时需要发送到服务端，增加请求的数据量
* 只能使用 `document.cookie='...'` 来修改，太过简陋



#### localStorage 和 sessionStorage

* HTML5 专门为存储设计，最大可存 5M
* API 简单易用：setItem；getItem
* 不会随着 http 请求被发送出去

**localStorage 和 sessionStorage的区别**

* localStorage 数据会永久存储，除非代码或手动删除
* sessionStorage 数据只存在于当前会话，浏览器关闭则清空
* 一般使用 localStorage 更多



#### 总结：cookie、localStorage和sessionStorage的区别

**相同点：**都存储在客户端

**不同点：**

* 存储大小：
  * cookie 的大小受限于http请求头长度的限制，其大小不能超过4kb
  * sessionStorage 和 localStoragae 虽然也有存储大小的限制，但是比 cookie 大得多，可以达到5M甚至更大
* 有效时间：
  * cookie  设置 cookie 过期时间之前一直有效，即使窗口或浏览器关闭
  * sessionStorage  数据在当前浏览器窗口关闭之后自动删除
  * localStorage  存储持久化数据，浏览器关闭后数据不会丢失，除非主动删除数据
* 数据于服务器之间的交互方式：
  * cookie 的数据会随着 http 请求自动传递到服务器，服务端也可以写 cookie 到客户端
  * sessionStorage 和 localStorage 不会跟随 http 请求把数据发送给服务器，仅在本地存储