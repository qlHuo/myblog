在命令行窗口使用 npx 创建 react 项目的时候，报错如下图所示。

![image-20201129124554823](https://gitee.com/aurorapic/BlogPic/raw/master/img/image-20201129124554823.png)

百度一搜，很多都是说无法启动 cmd 命令的原因，系统变量加入 cmd 所在路径 `C:\WINDOWS\system32` 即可。可是添加到系统变量之后还是有这样的问题，后来发现可能是**权限**的问题，当我使用管理员权限执行 `npx create-react-app test` 的时候就可以完全执行完毕。可是为什么之前 npm / npx 创建应用的时候没有啥问题呢？暂时不明觉厉。那如何为 npm 设置全局的管理员权限呢？有的文章说重装 node 即可，但是我重装了好几次都没啥用，还是一样的问题。。。可能重装系统可以吧！我最后的解决方法是：**使用 windows terminal 这个命令行工具进行相关管理员权限的 npm 操作。**

### **windows terminal 安装使用**

windows terminal 是微软与2019年推出的面向 win10 的新的命令行程序，我们可以通过微软应用商店 或者从[Github](https://zh.wikipedia.org/wiki/GitHub)下载源码自行编译安装。这一程序把目前Windows上的PowerShell、CMD以及Windows Linux（WSL）三大环境实现了统一。

Windows下可以实现`sudo`一样的命令，来快速地对某一个标签页开启管理者权限。这里要介绍的[gsudo](https://github.com/gerardog/gsudo)就可以实现我们所要的功能。

#### 安装gsudo

Gsudo提供了多种安装方式，包括[Scoop](https://scoop.sh/)、[Chocolatey](https://chocolatey.org/install)和Powershell安装。

由于Powershell安装方式简单快捷，所以这里使用Powershell进行安装。

首先打开Windows Terminal，创建Powershell标签页，执行下述代码。

```js
PowerShell -Command "Set-ExecutionPolicy RemoteSigned -scope Process; iwr -useb https://raw.githubusercontent.com/gerardog/gsudo/master/installgsudo.ps1 | iex"
```

安装过程会询问你是否打算使用 `sudo` 作为 `gsudo` 的别名，这里可以根据个人需要进行选择。
运行结尾显示 `Done` 即表明安装完成.

#### 配置Windows Terminal

安装成功后，在Windows Terminal中使用 `Ctrl+,`，或选择

![image-20201129130802095](https://gitee.com/aurorapic/BlogPic/raw/master/img/image-20201129130802095.png)

打开`settings.json`文件，并在`list`列表中添加设置项：

```jso
"list": [
  {
      "guid": "{41dd7a51-f0e1-4420-a2ec-1a7130b7e950}",
      "name": "Windows PowerShell Elevated",
      "commandline": "gsudo.exe powershell.exe",
      "hidden": false,
      "colorScheme": "Solarized Dark",
      "fontFace": "Fira Code",
      "icon" : "https://i.imgur.com/Giuj3FT.png"
  },
  //...
]
```

其中，icon为标签页显示的图标，colorScheme为标签页的颜色，可以根据[微软提供的文档](https://docs.microsoft.com/en-us/windows/terminal/customize-settings/color-schemes)进行修改

设置完成后，重启 Powershell / windows terminal，即可正常使用，在添加标签页的时候，使用 Ctrl+Shift+1 即可创建管理员身份的 Powershell.

同时，在普通 Powershell 窗口，也可以通过执行`sudo`命令为标签页赋予管理员身份.

#### 添加Windows Terminal到鼠标右键菜单

### 测试变量

下面的两个变量后面的操作需要使用到。所以，先测试下是否正常。

```
echo %USERPROFILE%



echo %LOCALAPPDATA%
```

如果有报错，接下来的操作，请把对应的部分进行替换。

```
%USERPROFILE%` 替换成 `C:\Users\[userName]`
`%LOCALAPPDATA%` 替换成 `C:\Users\[userName]\AppData\Local
```

**注意** `[userName]`为自己的用户名

![12642878-4a6499e2cefc8731.png](https://ss.csdn.net/p?https://upload-images.jianshu.io/upload_images/12642878-4a6499e2cefc8731.png)

image

### 创建图标

从以下地址下载图标

[图标ico下载](https://links.jianshu.com/go?to=https%3A%2F%2Fraw.githubusercontent.com%2Fyanglr%2FWindowsDevTools%2Fmaster%2FawosomeTerminal%2Ficons%2Fwt_32.ico) ， 打开网址，鼠标右键保存到电脑。

打开命令行，输入

```
mkdir "%USERPROFILE%\AppData\Local\terminal"
```

这个命令是创建一个`terminal`文件夹，把下载的图标ico复制到这个文件夹。

### 写入注册表

创建一个txt文档，并把档后缀改为`reg`。文档的名字可自己创建，后缀名不可以错。右键菜单出现`Windows Terminal`有两种方法。一种是按`shift`+ `右键`,另一种是直接`右键`。

#### `shift`+ `右键`

把下面的内容复制到reg去

```
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\Directory\Background\shell\wt]
@="Windows Terminal"
"Icon"="%USERPROFILE%\\AppData\\Local\\terminal\\wt_32.ico"
"Extended"=""
[HKEY_CLASSES_ROOT\Directory\Background\shell\wt\command]
@="C:\\Users\\[user_name]\\AppData\\Local\\Microsoft\\WindowsApps\\wt.exe"
```

**注意**：请把`[user_name]`改成自己电脑的用户名

> 保存 reg 文件之后需要双击将配置写入注册表中

#### 右键

把下面的内容复制到reg去

```
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\Directory\Background\shell\wt]
@="Windows terminal here"
"Icon"="%USERPROFILE%\\AppData\\Local\\terminal\\wt_32.ico"
[HKEY_CLASSES_ROOT\Directory\Background\shell\wt\command]
@="C:\\Users\\[user_name]\\AppData\\Local\\Microsoft\\WindowsApps\\wt.exe"
```

**注意**：请把`[user_name]`改成自己电脑的用户名

> 保存 reg 文件之后需要双击将配置写入注册表中

### 修改`Windows Terminal`的`profile.json`

打开`profile.json`

![image-20201129131543747](https://gitee.com/aurorapic/BlogPic/raw/master/img/image-20201129131543747.png)

把`startingDirectory`改为`null`,没有的自己创建一个。

![image-20201129131424779](https://gitee.com/aurorapic/BlogPic/raw/master/img/image-20201129131424779.png)

照著上面的方法操作，相信右键菜单已经出现`Windows Terminal`的入口了。

![image-20201129131520113](https://gitee.com/aurorapic/BlogPic/raw/master/img/image-20201129131520113.png)

参考：

[报错记录 |npm start 报错 Error: spawn cmd ENOENT](https://blog.csdn.net/qq_44537414/article/details/100528478)

[Windows Terminal 使用管理员身份创建标签页](https://blog.csdn.net/weixin_39858881/article/details/107026065)

[添加Windows Terminal到鼠标右键菜单](https://blog.csdn.net/iamjerryc/article/details/103070816)