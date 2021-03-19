### 【Git】pull遇到错误及 git 如何 stash 部分文件

> 【Git】pull遇到错误：error: Your local changes to the following files would be overwritten by merge:

这种情况下，如何保留本地的修改同时又把远程的合并过来呢？

首先取决于你是否想要保存本地修改。

### 是

别急我们有如下三部曲

```bash
    git stash  
    git pull origin master  
    git stash pop  
```

`git stash`的时候会把你本地快照，然后`git pull` 就不会阻止你了，pull完之后这时你的代码并没有保留你的修改。惊了！ 别急，我们之前好像做了什么？

### STASH

这时候执行 `git stash pop` 你去本地看会发现发生冲突的本地修改还在，这时候你该commit push啥的就悉听尊便了。

### 否

既然不想保留本地的修改，那好办。直接将本地的状态恢复到上一个commit id 。然后用远程的代码直接覆盖本地就好了。

```bash
git reset --hard 
git pull origin master
```



### Git 如何 stash 部分文件

今天工作的时候有这样一个诉求,改了本地大量的代码,但是有两个文件是适配本地的配置文件不需要上库,如果`git commit [filename]`的话需要写很多文件,很不方便,于是使用了stash方法,这里做个记录.

首先解释下`git stash`的作用,`git stash`是将本地没有commit的部份全部存储起来,这样方便你进行pull之类的操作,具体可以参考[Git 工具 - 储藏与清理](https://git-scm.com/book/zh/v2/Git-工具-储藏与清理).

但是如果直接git stash的话,会将当前所有文件都存储起来,而我只想存储两个配置文件,其他的全部一起commit,这应该怎么办呢?这里需要用到一个`git stash -p`的命令;它是一个交互式命令,我们可以一个文件一个文件的遍历,决定每个文件的操作方式.

```cpp
root /u/c/s/cbs (master)# git stash -p
diff --git a/cmd/scripts/cbs.sh b/cmd/scripts/cbs.sh
old mode 100644
new mode 100755
Stash mode change [y,n,q,a,d,/,?]? 
```

这里的`[y,n,q,a,d,/,?]`分别代表的含义如下:

```kotlin
   y - stage this hunk
   n - do not stage this hunk
   q - quit; do not stage this hunk nor any of the remaining ones
   a - stage this hunk and all later hunks in the file
   d - do not stage this hunk nor any of the later hunks in the file
   g - select a hunk to go to
   / - search for a hunk matching the given regex
   j - leave this hunk undecided, see next undecided hunk
   J - leave this hunk undecided, see next hunk
   k - leave this hunk undecided, see previous undecided hunk
   K - leave this hunk undecided, see previous hunk
   s - split the current hunk into smaller hunks
   e - manually edit the current hunk
   ? - print help
```

所以,遇到我们需要stash的文件,我们就y,不需要stash需要commit的文件,我们就n,如果接下来没有需要stash的文件,则直接q退出就行.

将文件保存好后,我们就可以commit和push剩下的代码了.

```bash
git commit -m ""
git push origin master
```

然后我们将stash的文件恢复到本地,所有的操作就完成了.

```bash
git stash pop
```

转自：

* [【Git】pull遇到错误：error: Your local changes to the following files would be overwritten by merge:](https://blog.csdn.net/nakiri_arisu/article/details/80259531)
* [Git如何stash部分文件](https://www.jianshu.com/p/fe4d54cb6244)

