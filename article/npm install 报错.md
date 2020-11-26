在安装 nprogress 进度条插件时，控制台报错：npm install ERR! ...

**解决方法**

**方法一：**

直接删掉 package-lock.json 文件，然后再次运行 `npm install --save nprogress` 命令即可安装成功。关于 package-lock.json 文件的作用，参考[这篇文章](https://www.cnblogs.com/wangweizhang/p/10530294.html)



**方法二：**

1.清缓存：`npm cache verify`

2.重新安装npm/降低npm版本：`npm install -g npm(@4)`

3.安装需要安装的依赖：`npm install ...`

这种方法未成功，可能是我没有降低npm版本的原因。



参考文章：<https://blog.csdn.net/dualvencsdn/article/details/86511288>

<https://blog.csdn.net/xiaocy66/article/details/82716928>