#### 对象数组去重(格式化)

前端拿到后端返回的数据后，往往要格式化以满足页面需求。我们可以使用数组的 `reduce()` 方法对象数组（数组里面存放的是对象）进行去重。

示例代码如下：

```js
let data = [
      { name: 'tom', id: 1 },
  	  { name: 'jack', id: 2 },
  	  { name: 'sam', id: 3 },
  	  { name: 'mike', id: 1 },
  	  { name: 'amy', id: 2 },
  	  { name: 'eric', id: 3 }
    ]
	
    let hash = {}
    data = data.reduce((item, next) => {
      // 根据 id 去重
      if(!hash[next.id]) {
        hash[next.id] = true
        item.push(next)
      }
      return item
    }, [])
	console.log(hash) // {1: true, 2: true, 3: true}
    console.log(data) 
```

去重后结果如下所示：

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200827221239.png)

#### reduce() 方法用法记录

语法：

```js
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

* `reduce()` 方法接受两个参数，第一个为回调函数（必填），第二个为初始值（非必填项）
* `callback()` 执行数组中每个值 (如果没有提供 `initialValue则第一个值除外`)的函数
  * **accumulator: **累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或`initialValue`
  * `currentValue`: 数组中正在处理的元素
  * `index` (可选): 数组中正在处理的当前元素的索引。 如果提供了`initialValue`，则起始索引号为0，否则从索引1起始。
  * `array` (可选): 调用`reduce()`的数组
* `initialValue ` 可选
  * 作为第一次调用 `callback`函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

> callback() 回调函数中要有一个返回值

**描述：**

回调函数第一次执行时，`accumulator` 和 `currentValue` 的取值有两种情况：

* 如果调用 `reduce()` 时提供了初始值 `initialValue` ，那么 `accumulator` 取值为 `initialValue()`, `currentValue`取数组中的第一个值；
* 如果没有提供 `initialValue`，那么`accumulator`取数组中的第一个值，`currentValue`取数组中的第二个值。

> 如果数组为空且没有提供`initialValue`，会抛出[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 。如果数组仅有一个元素（无论位置如何）并且没有提供`initialValue`， 或者有提供`initialValue`但是数组为空，那么此唯一值将被返回并且`callback`不会被执行。

**计算数组中每个元素出现的次数**

```js
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

**数组去重**

```js
let myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
let myOrderedArray = myArray.reduce(function (accumulator, currentValue) {
  if (accumulator.indexOf(currentValue) === -1) {
    accumulator.push(currentValue)
  }
  return accumulator
}, [])

console.log(myOrderedArray) // ["a", "b", "c", "e", "d"]
```

参考文章：<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce>

<https://blog.csdn.net/alisa_lisa/article/details/100927226>