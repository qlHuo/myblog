本文转自：https://mp.weixin.qq.com/s/rQmekUa0wCRId57cZ0ejcQ

之前推荐过一波**自用的 Markdown 编辑器**，当时提到了 **Typora**，缺点就是**无法集成图床**。

其中一个折中的办法就是手动使用 PicGo 上传到图床，然后将地址粘贴到 Typora。

**那么 Typora 中能不能直接粘贴图片后，就自动上传到图床呢？**

网上搜索时，给出的解决方案大都是 Mac 下的：Typora+iPic。

可惜矮矬穷的小编用的是 Windows。

![img](https://mmbiz.qpic.cn/mmbiz_png/6b3KbEywh0VeEPHfrJL8Nicic38RXLblLibawlP21FH3pNqiaBOXe0rjSClVbHU5bA05OUy5Hj1pqSHxrAMfm60s8w/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

今天无意间打开 Typora，检测更新时，发现这一幕！

![img](https://mmbiz.qpic.cn/mmbiz_png/6b3KbEywh0VeEPHfrJL8Nicic38RXLblLibfHcOChhVgWHW6Ea7DQDp8K5ic4ibtusIyuaJBCLMUYYHL2nYQOQy0ttQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)▲ 更新日志

没想到啊，没想到

**浓眉大眼的 Typora 和 PicGo 竟然勾结在一起了！**

![img](https://mmbiz.qpic.cn/mmbiz_gif/6b3KbEywh0VeEPHfrJL8Nicic38RXLblLibGiadibosZfFszSDPPJoBhSUAx9F5TctCQ4qZPibicrTgszf5ibYZN3kWvhw/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

小编当即试用了一把，感觉还不错，后面可以考虑将 Typora 作为主力 Markdown 编辑器了。

**毕竟颜值高！**

下面分享下 Typora + PicGo 的设置步骤。

当然，**只是针对 Windows 版。**

# PicGo设置

## 版本要求

PicGo 2.2.0 及以上。

图床的设置这里不说了，不会的，自行百度。

![img](https://mmbiz.qpic.cn/mmbiz_gif/6b3KbEywh0VWz9bpUiaHJRXQ0DJdZy3TQKibLIkDo6oibxnQ9zibWgmoHXibPEdGQLp44sy1HfaSBG8DSCicMAbM5Avw/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

## 激活PicGo-Server

2.2.0 版本之后，**PicGo 内部会默认开启一个小型的服务器，用于配合其他应用来调用 PicGo 进行上传。**

**如何设置呢？**

打开 PicGo 详细页面，进入 **PicGo 设置--设置Server**

参考下图进行设置即可。

> **配置 gitee 的 Server 端口 36677**，否则可能不生效

![img](https://mmbiz.qpic.cn/mmbiz_png/6b3KbEywh0VeEPHfrJL8Nicic38RXLblLibYzaktN0BbibDSQcCAtPM7PwJDCeCJ0vicv0icgxZic7OcRQreGOY5BYnug/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

# Typora设置

下面是 Typora 的设置。

## 版本要求

Typora 0.9.84 及以上。

## 设置

**文件--偏好设置--图像**

参考图片中的进行配置。

![img](https://mmbiz.qpic.cn/mmbiz_png/6b3KbEywh0VeEPHfrJL8Nicic38RXLblLibONeqdr6RcAdibv98blwnmxn4EeZ9rlTqib09Rtzdc7Io9yotrlbZICRQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

选择本机 PicGo 的路径。

## 验证图片上传

这里还可以**验证图片上传功能**。

验证成功会返回下图结果：

![img](https://mmbiz.qpic.cn/mmbiz_png/6b3KbEywh0VeEPHfrJL8Nicic38RXLblLibdOcpNdZEztlDP21pI7gibdsJhd3By6Db2gMpUam4PqNxDjIlaiaGsFiaQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)▲ 验证上传

# 使用

上面的设置完成后，在 Typora 里写字时，就可以自动上传图片到图床啦。

## 拖拽

可以直接选择图片，然后拖拽到编辑页面。

![img](https://mmbiz.qpic.cn/mmbiz_gif/6b3KbEywh0VeEPHfrJL8Nicic38RXLblLib9CG1r50jnYJxeooh9SKSVfwXKCHs7H9ooXLJ4YIbHXFrCP2OO409HQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)▲ 拖拽上传

## 编辑器内插入

使用快捷键 **Ctrl + Shift + I**，可以调出插入图片的功能。

![img](https://mmbiz.qpic.cn/mmbiz_gif/6b3KbEywh0VeEPHfrJL8Nicic38RXLblLib8gLicndHpeQdUkxSwy24Ha9SegaP4INGAI1LrQT6XqdHDticHQEbibMwQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)▲ 编辑器内插入

## 复制粘贴

也可以直接复制图片，然后再编辑器中直接粘贴。

或者**截图后直接粘贴**（比如 Snipaste）。

![img](https://mmbiz.qpic.cn/mmbiz_gif/6b3KbEywh0VeEPHfrJL8Nicic38RXLblLibCicanLDicNK7TjZE6Ymoncjf0DodjibHdYgh7ibveq9NXTTnaOOEU8YEWA/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)▲ 截图后直接粘贴

这里需要多一个**点击上传图片**的操作。

然后图片就可以上传到图床了。

另外，还可以看到**所有的上传在 PicGo 的相册里都能找到**



gitee + PicGo 图床配置： https://zhuanlan.zhihu.com/p/102594554