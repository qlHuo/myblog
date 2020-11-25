#### 方法一：

```js
// num 可以是 number 或者 string 类型
let num = 1234; 
let splitNum = Number(num).toLocaleString()
console.log(splitNum) // 1,234
```

> `Number()` 可以换成 `parseInt()` 或者 `parseFloat()`。但是 `parseInt()` 不会保留小数，而 `Number()` 和 `parseFloat()` 则会保留小数点后三位。

#### 方法二：

自定义格式化函数：

> 如果将 `parseInt(n).toString();` 换成 `Number()` 或者 `parseInt()` 得到的结果会不准确

```js
function format_number(n){
  var b = parseInt(n).toString();
  var len = b.length;
  if(len<=3){return b;}
  var r=len%3;
  // b.slice(r,len).match(/\d{3}/g).join(",") 每三位数加一个逗号。
  return r > 0 ? b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(",")
    	: b.slice(r,len).match(/\d{3}/g).join(",");
 }
 
var a="53669988.000";
alert(format_number(a)); // 53,669,988
alert(format_number("wahh")); // NAN
alert(format_number(0));
alert(format_number(6698.0023)); // 6,698

```

参考文章：<https://blog.csdn.net/fyq891014/article/details/41869807>