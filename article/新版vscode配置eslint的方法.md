不同的 vsCode 版本配置 eslint 会有所不同，下面记录 eslint 的配置。

1.下载 eslint 和 Prettier - Code formatter 插件

2.找到设置 -> 用户 -> 扩展 -> eslint，选择在 settings.json 中编辑配置项

![](https://gitee.com/aurorapic/BlogPic/raw/master/img/20200802221003.png)

3.配置项中添加如下代码

```json
// 每次保存时将代码按eslint格式进行保存
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
// 添加vue支持
"eslint.validate": ["javascript", "vue", "html"],
```

4.在 .eslintrc.js 文件中配置 `rules` 中添加

```js
rules: {
  ...
  'prettier/prettier': [
    // eslint校验不成功后，error或2则报错，warn或1则警告，off或0则无提示
    'error',
    {
      // 不要分号
      semi: false,
      // 设置单引号
      singleQuote: true,
      // 设置换行长度
      printWidth: 160
    }
  ]
}
```

