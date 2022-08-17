# Typescript - Js的超集

- [官网](https://www.typescriptlang.org/)
- [中文文档](http://shouce.jb51.net/typescript-handbook/index.html/)
- [Github](https://github.com/microsoft/TypeScript/)

## 常用技巧
### 交叉类型 And 联合联
```sh
# 交叉类型
T & U
# 联合类型
T | U
```
- 交叉类型表示最终输出的类型必须是 T和U的联合, 假设有T类型有name,U类型有sex键,那么输出的类型必须包含两者. 联合类型则更多表示"或"的关系,即为类型要么是T类型或与U类型

### 改变类型的某一个键的类型
```typescript
// 假设从第三方类型库拿到一个类型 zoom
// zoom : { dog: Quadruped, tiger: Quadruped, monkey: Amphibian, people: Mammal, immortal: Mammal }
// 但现在你认为人类和神仙应该有无限可能, 不限于 Mammal, 那么应该可以用 extends 的关键字技巧

type TAnyProbablyKey = "people" | "immortal"
type TUpgrade<T> = {
    [P in keyof T]: P extends TAnyProbablyKey ? any : T[P]
}

type TZoom = TUpgrade<zoom>
```

### 关键字&运算符
- keyof \<type\> 用于表示一个对象类型的【键名的实际类型】
- in 整体举例 \[变量 in 类型\]用于获取一个对象类型里的每个【键名】暂存给左边申明的变量
- typeof \<type\> 用户检出实际值的类型,也可以用来做类型保护
- extends 该关键字的用户很多,这里只解释在对于类型使用的时候的作用
  - 继承使用 interface a extends b 用于表示交叉类型
  - 类型使用 type Exclude<T, U> = T extends U ? never : T
- readonly 用于表明一个【键名】为只读不可更改
- 运算符
    - "+","-","?","!.","?."
    - "+"和"-" 都表示用于增加类型和清除指定类型
    - "?" 表示用于键盘名为可选
    - "!." 在浮动类型的时候申明强制有这个键名
    - "?." 在不确定类型的键名里，使用联合判断

### 工具类型 as 工具函
- 以下源码展示，均可在 TypeScript 项目的 ./node_modules/typescript/lib/lib.es5.d.ts 路径找到
- 因为官方文档实施更新的缘故，此文章可能过时，请以官方文档为准 [传送门](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- 本目录感谢作者 [蜡笔小伟](https://www.jianshu.com/u/491bd4155f96) [#原文出处](https://www.jianshu.com/p/050cc5ba098a?u_atoken=f9cf64a8-0b0d-47df-8507-73e48d090594&u_asession=01uC_GOhfjRwhm2ZBaH-apr6ItV86kTGtyAuRsyTWuuGZvfmOliAtCF9JggU2fLchNX0KNBwm7Lovlpxjd_P_q4JsKWYrT3W_NKPr8w6oU7K_b4nAKDS5wNeu8acUFitOzUPWO0ljqS-0m6uUj231Ub2BkFo3NEHBv0PZUm6pbxQU&u_asig=05kTpl17A0roe5q06Aol0_Pzpdyz8Wvh0l2HH_SE719lbEO48XSvhvcxuXsYEXmt0PMg9u8l78zjs99HJzpDxrS6H-WhIsgzfy2mtuUxBlaGUQHNkXObDm9pGSWw5DQOTi3wOOJCeYgI4YeybzJQpJ1dQ-H7PlKuFS7UbQjJQpoSv9JS7q8ZD7Xtz2Ly-b0kmuyAKRFSVJkkdwVUnyHAIJzTp1YTXDBCsygQ1GxYWtsKK078mEbbqh3WLyYen1w_g2U1_gr7b-5Q11Fu-gS_hPv-3h9VXwMyh6PgyDIVSG1W_H-gYl_9bUa9eCAD_UvsYvko3vS8lKQvxYTphZ3n_8OVVAaippJOesBdc1exo2UpRC3meqmuThudBbNBA9PwpNmWspDxyAEEo4kbsryBKb9Q&u_aref=JlNs1Z0Fs1Z8IbUxZxQtkdXJbV8%3D)

#### Partial\<Type\>
##### 会创建一个新的类型同时它内部所有属性都变成可选的新类型
```typescript
type Type = { x: string, y: string }
// { x?: string; y?: string }
type PartialType = Partial<Type>
```
```typescript
// 源码实现
type Partial<T> = {
    [P in keyof T]?: T[P];
}
// 或
type Partial<T> = {
    [P in keyof T]+?: T[P]; // 多个加号
}
```
比如在一些set函数里对用户信息的更改，一般会要求传入完整的用户信息，如果我们想重构一个函数但又不不破坏用户的类型，我们就可以使用该工具函数把用户类型变为全部键可选，来达到局部更新

#### Required\<Type\>
##### Required是Partial的反面，Required 创造一个新类型，规定内部内部所有的属性都是必须的
```typescript
type Type = { x?: string, y?: string }
// { x: string; y: string }
type RequiredType = Required<Type>
```
```typescript
// 源码实现
type Required<T> = {
    [P in keyof T]-?: T[P]
};
```

#### Readonly\<Type\>
##### 创建一个新类型，同时所有属性都变为只读属性，这也就意味着这些属性不能被重新赋值
```typescript
type Type = { x: string, y: string }
// { readonly x: string; readonly y: string }
type ReadonlyType = Readonly<Type>
```
```typescript
// 源码实现,我们也可以使用关键字即可完成
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
// 或
type Readonly<T> = {
    +readonly [P in keyof T]: T[P];
};
```
TypeScript 没有给出去除 Readonly 修饰符工具函数此时我们就可以自己来实现了，我们把这个工具类型叫 NonReadonly。
```typescript
type position = { readonly x: string; readonly y: string}
type NonReadonly<T> = {
    -readonly [P in keyof T]: T[P]
}
// type NonReadonlyPos = { x: string; y: string; }
type NonReadonlyPos = NonReadonly<position>
```

#### Record\<Keys, Type\>
##### 创造一个新类型，同时将Keys中所有的属性的值的类型转化为 T 类型。
```typescript
// { x: string; y: string }
type Type = Record<"x" | "y", string>
```
```typescript
interface UserInfo {
  age: number
}
type UserName = "john" | "andrew" | "elon" | "jack"
const userList: Record<UserName, UserInfo> = {
  john: { age: 18 },
  andrew: { age: 20 },
  elon: { age: 49 },
  jack: { age: 56 },
}
```
```typescript
// 源码实现,我们也可以使用关键字即可完成
type Record<K extends keyof any, T> = {
    [P in K]: T
}
```
泛型约束 `K extends` 相信你能看懂，`keyof any` 你可能有点犯迷糊，`keyof any` 表示对象 `key` 的类型，所以 `keyof any === string | number | symbol`，不信你可以复制以下代码，在 TS 环境测试下：
```typescript
// type unionKeyType = string | number | symbol
type unionKeyType = keyof any
```

#### Exclude\<Type, ExcludedUnion\>
##### 通过排除类型中可分配给 ExcludedUnion 的所有联合成员来创建新类型
```typescript
// "x" | "y"
type ExcludedType = Exclude<"x" | "y" | "z", "z">
```
```typescript
// 确定从对象中获取固定的 key 非常有用：

interface User {
  name: string
  surname: string
  personalNumber: number
}
type AllowedKeys = Exclude<keyof User, "personalNumber">
const getUserProperty = (user: User, key: AllowedKeys) => user[key]
const user: User = {
  name: "John",
  surname: "Doe",
  personalNumber: 999999999,
}
const nameProp = getUserProperty(user, "name")
const surnameProp = getUserProperty(user, "surname")
// Argument of type "personalNumber" is not assignable to parameter of type "name" | "surname"
const personalNumberProp = getUserProperty(user, "personalNumber")
```
```typescript
// 源码实现
type Exclude<T, U> = T extends U ? never : T
```

#### Extract\<Type, Union\>
##### Extract 是 Exclude 的反面。它通过从可分配给联合的类型中提取所有联合成员来创建新类型。
```typescript
// "x" | "y"
type ExtractedType = Extract<"x" | "y" | "z", "x" | "y">
```
```typescript
// 用来提取两个类型的公有属性名会非常的合适：

interface Human {
  id: string
  name: string
  surname: string
}
interface Cat {
  id: string
  name: string
  sound: string
}
// "id" | "name"
type CommonKeys = Extract<keyof Human, keyof Cat>
```
```typescript
// 源码实现
type Extract<T, U> = T extends U ? T : never
```

#### Pick\<Type, Keys\>
##### Pick 的作用是将 Type 类型中的 Keys 类型提取出来，创建为一个新类型。
```typescript
type LongType = {
  a: string
  b: string
  c: string
  d: string
}
// { a: string; b: string }
type ShortType = Pick<LongType, "a" | "b">

// Pick 创建的类型是 Type 类型的子类型，所以它的使用常常是从一个大类型中提取某些小类型。
interface User {
  name: string
  surname: string
  street: string
  house: number
}
type UserAddress = Pick<User, "street" | "house">
const address: UserAddress = {
  street: "Street",
  house: 1,
}
```
```typescript
// 源码实现，注意下泛型约束 K extends keyof T
type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}
```

#### Omit\<Type, Keys\>
##### Omit 从 Type 的所有属性中，移除 Keys 键用剩下的键来创建新类型。
```typescript
type LongType = {
  a: string
  b: string
  c: string
  d: string
}
// { c: string; d: string }
type ShortType = Omit<LongType, "a" | "b">
```
```typescript
// 源码展示， Pick 的实现用到了 Exclude 来实现的：
type Omit<T, K extends keyof any> = { [P in Exclude<keyof T, K>]: T[P]; }
// 如果你用较早期的 TS ,Omit 的实现可能是这样的，效果一样，思路不通而已：
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>; 
```

那么`keyof any` 等价于 `number | string | symbol`，我们知道 `number | string | symbol` 是能作为对象的 `key` 的类型，也就是说 `Omit<Type, Keys>` 移除键的时候，`keys` 可以不为 `Type` 里面的 `key` ，简单来讲写法更加宽松。
那么问题来了，移除 `key` 照理说应该是移除对象里面的 `key` ，即 `K extends keyof any` 应该改为 `K extends keyof T`，TS 没有这么做的道理是啥捏？
原因我想破了脑袋也没想到，去 Github 搜了下，发现大家普遍的需求是让 Omit 的写法更严谨，TS 官方答应着，并没实现，点击了解 ["Omit" type using "keyof any" instead of "keyof T"](https://github.com/microsoft/TypeScript/issues/32376)
如果说，我们想要一个严格的 `Omit`，我们可以把 `Omit` 的 `K extends keyof any` 改为 `K extends keyof T` 自己实现一个较为严格的 `Omit`，我们叫它 Remove ，源码：

```typescript
type Remove<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P]; }
interface IPerson {
    age: number;
    name: string;
}
type noAge = Remove<IPerson, "age">; // yes type noAge = { name: string; }
type noRandomKey = Remove<IPerson, "灰机">; // no
```

#### NonNullable\<Type\>
##### NonNullable 通过从类型中排除 null 和 undefined 来创建新类型。
基本上，它是 Exclude<T，null | undefined> 的缩写：
```typescript
type Type = string | null | undefined;
// "string"
type NonNullableType = NonNullable<Type>
```

#### Parameters\<Type\>
##### 参数从函数类型 Type 的参数中使用的类型构造元组类型
```typescript
const addNumbers = (x: number, y: number) => {
  return x + y;
}
// [x: number, y: number]
type FunctionParameters = Parameters<typeof addNumbers>
```

使用 addNumbers 的时候为什么还要加上 typeof 呢？因为 addNumbers 是 JS 代码实现，我们需要的是函数签名，所以加上 typeof ，如果我们直接给一个函数签名，就不需要加上 typeof ，例如：

```typescript
type addNumbers = (x: number, y: number) => number

// [x: number, y: number]
type FunctionParameters = Parameters<addNumbers>
```
您还可以检索单个参数：
```typescript
const addNumbers = (x: number, y: number) => {
  return x + y
}
// "number"
type FirstParam = Parameters<typeof addNumbers>[0]
// "number"
type SecondParam = Parameters<typeof addNumbers>[1]
// "undefined"
type ThirdParam = Parameters<typeof addNumbers>[2]
```
如果获取函数参数的类型以确保类型安全很有用，尤其是在外部使用时：
```typescript
const saveUser = (user: { name: string; surname: string; age: number }) => {
  // ...
}
const user: Parameters<typeof saveUser>[0] = {
  name: "John",
  surname: "Doe",
  age: 18
}
```
```typescript
// 源码展示，仔细看这个条件泛型，尤其是 infer R
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
```

#### ConstructorParameters\<Type\>
##### 根据构造函数的类型构造元组或数组类型。

基本上，它类似于参数，但适用于类构造函数：
```typescript
class UserManager {
    private name: string
    private surname: string
    constructor(user: { name: string; surname: string }) {
        this.name = user.name
        this.surname = user.surname
    }
}
// "[user: { name: string, surname: string} ]"
type UserManagerConstructorParams = ConstructorParameters<typeof UserManager>
```
与 Parameters 类型相同，当我们外部使用时，它有助于确保构造函数接受我们的参数：
```typescript
class UserManager {
    private name: string
    private surname: string
    
    constructor(user: { name: string; surname: string }) {
        this.name = user.name
        this.surname = user.surname
    }
}
const params: ConstructorParameters<typeof UserManager>[0] = {
    name: "John",
    surname: "Doe"
}
```
```typescript
// 源码展示
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never
```

#### ReturnType\<Type\>
##### 构造函数Type的返回类型的类型
```typescript
const getUser = () => ({
    name: "John",
    surname: "Doe",
    age: 18
})
// { name: string; surname: string; age: number; }
type FunctionReturnType = ReturnType<typeof getUser>
```
与 Parameters 和 ConstructionParameters 一样，当您外部使用并希望获得导入函数的返回类型时，它很有用:
```typescript
const getUser = () => ({
    name: "John",
    surname: "Doe",
    age: 18
})
type User = ReturnType<typeof getUser>;
const user: User = {
    name: "Andrew",
    surname: "Hopkins",
    age: 20
}
```
```typescript
// 源码展示
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

#### InstanceType\<Type\>
##### 构建一个类型包括实例类型的构造函数的类型。

基本上，它类似于 ReturnType，但作用于类构造函数：
```typescript
class UserManager {
    name: string
    surname: string
    
    constructor(user: { name: string; surname: string }) {
        this.name = user.name
        this.surname = user.surname
    }
}
// { name: string; surname: string }
type UserMangerInstanceType = InstanceType<typeof UserManager>
```
您可能不会这样做，因为您可以直接使用 UserManager 类型
```typescript
class UserManager {
    name: string
    surname: string
    
    constructor(user: { name: string; surname: string }) {
        this.name = user.name
        this.surname = user.surname
    }
}
const user2: UserManager = {
    name: "John",
    surname: "Doe"
}
```
```typescript
// 源码展示
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any
```

#### ThisParameterType\<Type\>
##### 提取函数 this 的类型，若函数类型并没有此参数，则提取为 unknown 类型
```typescript
// 因为 this 指向的问题，项目中并不常用
function toHex(this: Number) {
    return this.toString(16)
}
function numberToString(n: ThisParameterType<typeof toHex>) {
    return toHex.apply(n)
}
```
```typescript
// 源码展示
type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown
```
