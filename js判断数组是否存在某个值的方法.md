js判断数据中是否存在某个值的方法：

* `indexOf(searchElement)` ：判断数组中是否存在某个值，如果存在返回数组元素的索引，不存在则返回 -1。
* `includes(searchElement)`：判断一个数组是否包含一个指定的值，如果存在返回 true，否则返回 false。 
* `find(callback)` ：返回数组中满足条件的第一个元素的值，如果没有返回 undefined。
* `findIndex(callback)`： 返回数组中满足条件的第一个元素的索引，如果没有找到，返回 -1.

**indexOf()**

> 判断数组中是否存在某个值，如果存在返回数组元素的索引，不存在则返回 -1

```js
let arr = ["a", "b", "c"]
let index = arr.indexOf('c')
console.log(index) // c存在，返回c的索引：2
let i = arr.indexOf('d')
console.log(i) // d不存在，返回：-1
```

**includes(searchElement[,fromIndex])**

> 判断一个数组是否包含一个指定的值，如果存在返回 true，否则返回 false。

参数：

* searchElement --- 需要查找的值
* fromIndex --- 索引，可选。从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索，默认为 0。

```js
let arr = ["a", "b", "c"]
let res = arr.includes('a')
console.log(res) // true
let res1 = arr.includes('d')
console.log(res1) // false
// 从 -2 + arr.length = 1 开始查找
let res2 = arr.includes('c', -2) 
console.log(res2) // true
```

**find(callback[, thisArg])**

> 返回数组中满足条件的**第一个**元素的值，如果没有返回 undefined。

参数：callback

* element 当前遍历到的元素。
* index 当前遍历到的索引。
* array 数组本身。

参数：thisArg(可选)---指定 callback 的 this 参数

```js
// ---------- 元素是普通字面值 ----------
let numbers = [12, 5, 8, 130, 44];
let result = numbers.find(item => {
    return item > 8;
});
console.log(result) // 结果： 12
// ---------- 元素是对象 ----------
let items = [
    {id: 1, name: 'something'},
    {id: 2, name: 'anything'},
    {id: 3, name: 'nothing'},
    {id: 4, name: 'anything'}
];
let item = items.find(item => {
    return item.id == 3;
});
console.log(item) // 结果： Object { id: 3, name: "nothing" }
```

**findIndex(callback[, thisArg])**

> 返回数组中满足条件的第一个元素的索引，如果没有找到，返回 -1.

参数：callback

- element 当前遍历到的元素。
- index 当前遍历到的索引。
- array 数组本身。

参数：thisArg(可选)---指定 callback 的 this 参数

```js
// ---------- 元素是普通字面值 ----------
let numbers = [12, 5, 8, 130, 44];
let result = numbers.findIndex(item => {
    return item > 8;
});
console.log(result) // 返回第一个大于8的值得索引：0

// ---------- 元素是对象 ----------
let items = [
    {id: 1, name: 'something'},
    {id: 2, name: 'anything'},
    {id: 3, name: 'nothing'},
    {id: 4, name: 'anything'}
];
let item = items.findIndex(item => {
    return item.id == 3;
});
console.log(item) // 返回索引为 2
```

本文转自：<https://segmentfault.com/a/1190000014202195>