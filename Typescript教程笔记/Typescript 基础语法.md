#### Typescript 的定义

[官网](https://www.typescriptlang.org/)对 typescript 的定义：Typescript 是 JavaScript 的超集，它可以编译成纯 Javascript 。就是说，Typescript 可以使用 JavaScript 的语法，并且对 JS 语法进行了扩展，而且浏览器并不能直接解析出 TS 代码，必须编译成 JS 才可以执行。[中文文档](https://www.tslang.cn/)

ts 代码

```typescript
// ts 语法，ts 是静态类型的
let a = 123; // 定义 a 为数字类型
// 标准写法为 let a: number = 123;
a = '123'; // 此时 a 为字符串类型，所以会报错
a = 456; // 如果设置 a 为字符串类型则不会报错
```

js 代码

```javascript
// js 语法，js是动态类型的语言
let a = 123;
a = '123'; // 默认转换为字符串类型，不会报错
```

#### Typescript 的优势

* 编写代码过程中，更好的错误提示
* 更加友好的编辑器提示
* 代码语义更加清晰

js代码

```js
function demo(data) {
  return Math.sqrt(data.x ** 2 + data.y ** 2)
}

demo(); // 不传参数会报错，但编辑器没有相应的错误提示
```

ts代码

```typescript
// 可以将参数的格式定义在外面
interface Point {x: number, y: number}

// 为参数定义类型，传参的时候，必须以这种格式传参，否则编辑器提示错误信息
// 为参数明确类型，编辑器的提示会更加友好，同时也使代码的语义化更加清晰
function tsDemo (data: Point) {
  return Math.sqrt(data.x ** 2 + data.y ** 2)
}

tsDemo({x: 1, y:2}); // 在ts中如果不传参数，编辑器会有报错提示
```

#### Typescipt 基础环境搭建

* 首先需要下载安装 nodejs
* 在 vsCode 中找到设置，搜索 quote 和 tab 设置编辑 typescript 代码为单引号，tab缩进为 2 空格。下载prettier插件，搜索设置 preitter->single quote 勾选，然后搜索 formateOnSave 设置并勾选，然后每次保存就会格式化代码。
* 然后运行 `npm install typescript@3.6.4 -g` 安装 typescript，然后使用`tsc demo.ts` 可以将 demo.ts 编译为 demo.js，然后使用 `node demo.js` 可以打印出demo.js 中的内容
* 上述编译执行ts代码过于复杂，安装 `npm install -g ts-node ` 工具，然后直接运行 `ts-node demo.ts` 即可直接打印ts代码

#### 静态类型的深度理解

我们定义了一个常量 count ，它的类型为 数字类型，那么它就 number 类型所有的属性和方法。

```typescript
const count: number = 2019
console.log(typeof count.toString()) // 结果为 string
```

我们使用 `interface` 可以自定义一个类型，那么这个类型的实例必须是这种类型的数据，并且其实例可以使用该类型所有的属性和方法。

```typescript
interface Point {
  x: number
  y: number
}
const point: Point = {
  x: 3,
  y: 4,
}
console.log(point.x)
```

#### 基础类型和对象类型

* 基础类型 `null`, `undefined`, `symbol`, `boolean`, `viod`
* 对象类型 `{}`, `Class`, `function`, `[]`

```typescript
// 基础类型 null, undefined, symbol, boolean, viod
const count: number = 123
const myName: string = 'aurora'

// 对象类型
const teachr: {
  name: string
  age: number
} = {
  name: 'aurora',
  age: 18,
}

// numbers 是一个数组，数组中的每一项都是数字类型
const numbers: number[] = [1, 2, 3, 4, 5]

class Person {}
const aurora: Person = new Person()

// getTotal 是一个函数，返回值是数字类型
const getTotal: () => number = () => {
  return 123
}
```

#### 类型注解和类型推断

在使用 TS 的时候我们就是希望变量以及属性的类型固定，因此就有了类型注解和类型推断。

* **类型注解** type annotation: 我们告诉TS变量是什么类型的
* **类型推断** type inference: TS会自动地去尝试分析变量的类型
* 如果 TS 能够自动分析变量类型，我们就不需要添加类型注解了
* 如果 TS 无法分析变量类型的话，我们需要为定义的变量添加类型注解

```typescript
// 类型推断：TS 可以推断出这三个变量的类型为 number
const firstNumber = 1
const secondNumber = 2
const total = firstNumber + secondNumber

// 类型注解：TS 无法判断参数的类型，因此需要添加类型注解，明确参数的类型
function getTotal(firstNumber: number, secondNumber: number) {
  return firstNumber + secondNumber
}
const total = getTotal(1, 2)
```

> 非必要不使用类型注解，尽量让TS自己判断类型.

#### 函数相关类型

TS 的函数定义与 JS 定义函数的方式基本一致。

```typescript
function hello() {}
const hello1 = function () {}
const hello2 = () => {}
```

函数返回值的类型与参数并不完全相关，下面介绍几种返回值的类型。

```typescript
// 指定函数的返回值为 number 类型，如果不指定当返回值为其他类型的时候，就不会提示错误信息
function add(first: number, second: number): number {
   return first + second
}
const total = add(1, 2)
// void 表示这个函数不应该有返回值，如果写了 return 则提示错误信息
function sayHello(): void {
  console.log('hello')
}
// never 永远也执行不到最后一行代码
function errorEmitter(): never {
  // throw new Error()
  // console.log(123)
  while (true) {}
  console.log('123')
}
// 解构赋值的类型注解
function add({ first, second }: { first: number; second: number }) {
  return first + second
}

function getNumber({ first }: { first: number }) {
  return first
}

const total = add({ first: 1, second: 2 })
```

#### 基础语法复习

**函数返回值的写法**

```typescript
// 这种写法 TS 能够类型推断出返回的结果为 number 类型,因此函数的类型注解可以省略
const func = (str: string): number => {
  return parseInt(str, 10)
}
// 冒号后面是类型注解, 等号后面是按照类型注解格式编写的代码
const func1: (str: string) => number = (str) => {
  return parseInt(str, 10)
}
```

其他类型补充:

```typescript
// date 类型
const date = new Date()

interface Person {
  name: 'string'
}
// TS 无法识别出 JSON 格式的类型,我们可以自定义一个类型
const rawData = '{"name": "aurora"}'
const newData: Person = JSON.parse(rawData)

// 设置 temp 的类型可以是 number 或者 string
let temp: number | string = 123;
temp = 'str'
```

#### 数组和元组

* ts 中的数组和 js 数组的定义方式完全一致
* ts 中引入了元组(tuple)的概念, 使用元组可以更好的对数组的内容进行约束

```typescript
// 数组
const arr: (number | string)[] = [1, '2', 3]
const str = ['a', 'b', 'c']
// 类型别名： type alias
type User = { name: string; age: number }
const objArr: User[] = [
  {
    name: 'aurora',
    age: 18,
  },
]
// 借助class进行类型注解
class Teacher {
  name: string
  age: number
}
const teacherArr: Teacher[] = [
  new Teacher(),
  {
    name: 'aurora',
    age: 20,
  },
]
--------------------------------------------------
// 元组 tuple 使用元组可以更准确地约束数组中的每一项内容
const personInfo: [string, string, number] = ['aurora', 'male', 20]
// csv 格式
const personList: [string, string, number][] = [
  ['aurora', 'male', 21],
  ['tony', 'male', 30],
  ['amy', 'female', 25],
]
```

#### interface 接口

TypeScript的核心之一就是类型检查。`interface` 和 `type` 都可以定义类型注解。在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约并让代码看起来更好理解。

**接口(interface)和类型别名(type alias)**

* `interface` 可以定义一个函数或者对象，**无法直接定义基础类型**
* `type` 类型别名可以定义基础类型和对象类型
* 在 TS 中如果能用 接口（`interface`）表示类型就用接口表示类型，否则使用`type`

```typescript
// interface 可以定义一个函数或者对象，无法直接定义基础类型
interface Person {
  // readonly 表示这个属性只能读不能写
  // readonly name: string
  name: string
  // 属性后面添加 ? 表示这个属性是可选的
  age?: number
  // 定义任何额外的属性
  [propName: string]: any
  // 定义一个方法，返回值是string类型
  say(): string
}

// type 类型别名可以定义基础类型和对象类型
type Student = {
  name: string
}
type num = number
```

接口的使用：

* 接口可以继承

  ```typescript
  interface Teacher extends Person {
    teach(): string
  }
  ```

* 接口可以直接定义一个方法

  ```typescript
  interface SayHi {
    // 参数是一个 string 类型，返回值是一个 string 类型
    (word: string): string
  }
  ```

* 一个class想要使用 interface，可以使用 `implements `属性

  ```typescript
  class User implements Person {
    name = 'zhangsan'
    say() {
      return 'hello'
    }
  }
  ```

#### 类的定义与继承

* TS 中类的定义和继承与 ES6 中类基本一致。
* 子类使用 `extends` 关键字继承父类的属性和方法
* 子类可以重写父类的方法
* 当我们重写了父类的方法然后还想要使用父类的方法的时候，可以通过super关键字调用父类中的方法

```typescript
class Person1 {
  name = 'aurora'
  getName() {
    return this.name
  }
}
class Teacher1 extends Person1 {
  getTeacherName() {
    return 'teacher'
  }
  // 子类把父类的getName覆盖了（重写了）
  getName() {
    // super 关键字相当于父类的实例
    // super 的作用：当重写了父类的方法，但是还想要使用父类的方法时，使用super调用
    return super.getName() + ' abc'
  }
}
const teacher = new Teacher1()
console.log(teacher.getName()) // aurora abc
console.log(teacher.getTeacherName()) // teacher
```

#### 类中的访问类型和构造器

* TS 中的访问类型有: `public` `protected` `private`
* `public` 允许在类的内外被调用
* `private` 允许在类内被使用
* `protected` 允许在类内及继承的子类中使用
* 如果在属性或者方法之前没有添加访问类型, 那么默认为 `public`

```typescript
class Person2 {
  protected name: string | undefined
  // 如果在属性或者方法之前没有添加访问类型，默认是 public
  public say() {
    this.name
    console.log('hey')
  }
}
class Teacher2 extends Person2 {
  public sayBye() {
 	// Teacher2 类继承成了 Person2 ,因此这里不报错    
    this.name
  }
}
const per = new Person2()
// 由于在Person2类中定义了name的访问属性为 protect, 因此这里报错
per.name = 'aurora'
console.log(per.name)
// 可以使用say() 方法
per.say()
```

constructor 构造器的使用

```typescript
class Person2 {
  // 传统写法
  public name: string | undefined
  constructor(name: string) {
  	this.name = name
  }

  // 简化写法
  constructor(public name: string) {}
}

const per = new Person2('aurora')
console.log(per.name)
```

**super 用法**

* super(参数) 表示调用父类的 constructor
* 如果父类的 constructor 不存在，也需要调用 super() 否则报错

```typescript
class Person2 {
  constructor(public name: string) {}
}

class Teacher2 extends Person2 {
  constructor(public age: number) {
    // super(参数) 表示调用父类的 constructor
    // 如果父类的 constructor 不存在也需要调用 super() 否则报错
    super('aurora')
  }
}

const teacher2 = new Teacher2(20)
console.log(teacher2.name)
console.log(teacher2.age)
```

#### 静态属性: Setter 和 Getter

使用 getter 和 setter 可以获取和设置类中的私有属性.

```typescript
class Person3 {
  constructor(private _name: string) {}
  get name() {
      // 返回 私有属性
    return this._name
  }
  set name(name: string) {
    const realName = name.split('_')[0]
    this._name = realName
  }
}

const per = new Person3('aurora')
console.log(per.name) // aurora
per.name = 'aurora132_ql'
console.log(per.name) // aurora132
```

**单例模式**

单例模式: 只生成一个实例

```typescript
// 单例模式 只能生成一个实例
// static 将属性/方法直接挂载到 Demo 类上，而不是类的实例上
class Demo {
  // 创建一个属性，它的类型为 Demo 并把它挂载到Demo类上
  private static instance: Demo
  private constructor(public name: string) {}

  static getInstance(name: string) {
    if (!Demo.instance) {
      // 这里的 new Demo() 是在当前 Demo 这个类内的，因此可以创建实例
      Demo.instance = new Demo(name)
    }
    return Demo.instance
  }
}

const demo = Demo.getInstance('aurora')
const demo1 = Demo.getInstance('ql')
console.log(demo) // Demo { name: 'aurora' }
console.log(demo1) // Demo { name: 'aurora' }
```

> static 表示将属性或者方法挂载到 类 上，而不是类的实例上。

#### readonly 和 抽象类

在类中的某一属性之前添加一个 `readonly` 属性, 可以限制该属性为只读属性, 不能被修改.

```typescript
class Person4 {
  // readonly 限制属性只读
  public readonly name: string
  constructor(name: string) {
    this.name = name
  }
}

const person4 = new Person4('aurora')
// person4.name = 'hello' // 此处报错，name 属性只读
console.log(person4.name)
```

抽象类

抽象类实际上是一些公用方法的封装, 可以被继承

```typescript
abstract class Geom {
  getType() {
    return 'Geom'
  }
  // 抽象方法
  abstract getArea(): number
}

class Circle extends Geom {
  getArea() {
    return 123
  }
}

class Square extends Geom {
  getArea() {
    return 456
  }
}
```

