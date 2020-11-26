### 1. 通过 for...in... 遍历属性

```js
function checkObjNull(obj) {
    // 如果对象不为空，则会执行到这一步
    for (var item in obj) {
        return true
    }
    // 如果为空，返回 false
    return false
}
let obj = {
    name: 'aurora'
}
let obj1 = {}
let res = checkObjNull(obj); // true
let res1 = checkObjNull(obj1); // false
```

### 2. 通过 JSON 自带的 stringify() 方法判断

`JSON.stringify()` 方法用于将 JS 对象转换成 JSON 字符串

```js
function checkObjNull(obj) {
    if (JSON.stringify(obj) === "{}"){
        return false
    }
    return true
}
let obj = {}
let obj1 = {
    name: 'aurora'
}
let res = checkObjNull(obj) // false
let res1 = checkObjNull(obj1) // true
```

### 3. es6 新增的方法 Object.keys()

`Object.keys()` 方法会返回一个由给定对象的自身可枚举属性组成的数组

如果对象为空，那么它会返回一个空数组

```js
let obj = {}
Object.keys(a) // []
```

我们可以依靠 `Object.keys()` 这个方法通过判断对象属性的长度来判断这个对象是不是数组

```js
function checkObjNull(obj) {
    return !!Object.keys(obj).length
    // return Object.keys(obj).length > 0
}
let obj = {};
let obj1 = {
    name: 'aurora'
};
let res = checkObjNull(obj); // false
let res1 = checkObjNull(obj1); // true
```

转自：https://blog.csdn.net/FungLeo/article/details/78113661