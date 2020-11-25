#### 1. 跳转到另一个页面，回到顶部

在 main.js 中添加

```js
// 跳转到另一个页面时，回到顶部
router.afterEach(() => {
  window.scrollTo(0,0);
})

```



-----------------------------------------------------

#### 8.3 问题记录

* this.$router.resolve() 的作用？就是窗口跳转的
* vue实现拖拽的组件 awe-dnd <https://blog.csdn.net/weixin_41646716/article/details/82905765>
* 判断数组中是否存在某个值  <https://segmentfault.com/a/1190000014202195>
* 开启https后，vue 项目报sockjs错误，暂时注释掉一行代码 <https://blog.csdn.net/weixin_38694789/article/details/105056938>

#### 8.4问题记录

* `import * as eventFilterService from '@/service/event-filter-service';` 引入该文件中的所有内容，并取别名。如果要使用该文件中的某方法，使用 `eventFilterService.方法()`

#### 8.6问题记录

**系统升级待做**

* `update.vue` 点击进入系统升级页面，发送请求获取当前系统名称和系统版本（或者将系统信息放到本地存储？）
* `upload-update.vue` 配置文件上传的地址，在el-upload 的 action 属性中配置
* 前端拦截判断文件的扩展名，如何通过 input:file 判断自定义扩展名
* `update-progress.vue` 后端以怎样的形式返回升级过程的数据，前端怎么接收？如果后端验证数字签名失败该怎么处理？
* 升级之后，点击导出生成升级日志（应该有交互吧）； 升级成功之后，点击完成强制重新登陆？如果升级失败，点击完成该咋整，不做处理？
* `update-log.vue` 进入该页面获取升级日志数据，对数据格式进行处理

```js
// 测试数据
{
  	timeStamp: 1596695468293,
    updateType: '系统升级',
    lastVersion: 'V1.2.0',
    targetVersion: 'V2.0.5',
	result: '成功'
}
```

-------

探索式测试

#### 8.10 问题记录

* 如果使用 `el-upload` 上传自定义后缀的文件，可以不设置 `accept` 属性，通过 `on-change` 方法获取到文件名，然后使用字符串的 `indexOf` 方法，判断所选文件后缀名是不是期望的后缀，如果是就可以进行下一步，否则就提示错误消息。
* vue 轮询获取接口数据并渲染到页面






```js
            // this.updateInfo =？？ res.data.msg 升级过程中的信息
            // if (升级失败) {
            //   升级失败
            //   清除定时器
            // } else if (升级成功) {
            //   // this.isDisabled = false
            //   // this.btnType = 'primary'
            //   // this.isShowWarn = false
            //   清除定时器
            // }
            // // clearInterval(this.timer)
            // // this.timer = null
```





```json
data: {id: "5f3367cf9d3255f9527f6929", updateStatus: 3, updateProgress: 101, updateLog: "2020-08-12 13:58:22 开始升级↵2020-08-12 13:58:22 开始升级 …cover-server 2.0.2↵2020-08-12 14:09:26 升级失败，升级结束↵", rollbackStatus: 2, …}
errorCode: 0
success: true
```



```html
"2020-08-12 14:08:43 开始回滚 discover-server
2020-08-12 14:08:45 回滚 discover-server 完成
2020-08-12 14:09:26 回滚 discover-server 成功。停止升级
"
```

```js
let str = 'aasdasd
asdfasdfb
adfasdfasdc'
console.log(str.split('\n'))
```

* updateStatus=1代表升级进行中 要一直轮询

* updateStatus=2 代表升级成功 停止轮询**(停止轮询清除定时器)**

* updateStatus=3 代表升级失败 会执行回滚 要继续轮询 并且要展示回滚日志

  -------------

* rollbackStatus=1 回滚中 轮询

* rollbackStatus=2 回滚成功 停止轮询**（清除定时器）**

* rollbackStatus=3 回滚失败 停止轮询**（清除定时器）**





```js
// 轮询获取更新过程中的信息
          if (this.timer) {
            clearInterval(this.timer)
            this.updateInfo = []
          } else {
            this.timer = setInterval(() => {
              getUpdateLog().then( res => {
                console.log(res)
                // this.updateInfo = res.data
                if (res.data.updateStatus !== 1 && res.data.updateStatus !== 1) {
                  clearInterval(self.timer)
                  self.timer = null
                }
              })

              // 当有滚动条时，展示底部最新信息
              this.$nextTick(() => {
                let info = this.$refs.updateInfoRef
                info.scrollTop = info.scrollHeight
              })
            }, 1500);
          }





```

```js
// 升级过程和日志----完整代码
updateProgress().then(res => {
        console.log(res)
        let self = this
        if (res.success) {
          // 轮询获取更新过程中的信息
          if (this.timer) {
            clearInterval(this.timer)
            this.updateInfo = []
          } else {
            this.timer = setInterval(() => {
              getUpdateLog().then( res => {
                // console.log(res)

                let data = res.data
                let tempRollBackLog = data.rollbackLog
                let rollbackLog = tempRollBackLog.split('\n')

                let tempUpdateLog = data.updateLog
                let updateLog = tempUpdateLog.split('\n')
                // 页面展示的升级日志
                self.updateInfo = [...updateLog, ...rollbackLog]

                if (data.updateStatus == 2 || data.rollbackStatus != 1) {
                  // 当有滚动条时，展示底部最新信息
                  self.$nextTick(() => {
                    let info = self.$refs.updateInfoRef
                    info.scrollTop = info.scrollHeight
                  })
                  clearInterval(self.timer)
                  self.timer = null
                }

                if (res.success) {
                  self.isShowWarn = false
                  self.isDisabled = false
                  self.btnType = 'primary'
                }
              })
            }, 1500);
            
          }
        }
      })

<span :class="row.result == '成功' ? {success: true} : {error: true}">● </span>{{ row.result }}
```

#### 8.14

* windows 修改默认浏览器不成功：关闭电脑管家即可。

#### 8.19

subscriptioin.vue

```vue
<qz-pro-table 
      :data-source="subData"
      ref="table"
      search-label-width="150px"
      search-keywords="host"
      search-placeholder="请输入接口URL进行筛选">
      <qz-table-column 
        label="事件时间" 
        prop="timeStamp"
        qz-sortable
        default-sort="asc"
        :search-config="{type: 'daterange', pickerOptions: dateQuickChoose}"> 
        <template slot-scope="{ row }">{{ row.timeStamp | timeFormat("YYYY-MM-DD HH:mm:ss") }}</template>  
      </qz-table-column>
      <qz-table-column label="接口/应用" prop="interface" min-width="160" :search-config="{placeholder: '请输入域名进行筛选'}" clearable />
      <qz-table-column label="接口类型" prop="interfaceType" :search-config="{type: 'multi-selection', options: returnType, optionProps: {label: 'name', value: 'id'}, placeholder: '请选择接口类型'}"/>
      <qz-table-column label="订阅名称" prop="subName" :search-config="{type: 'multi-selection', options: subscriptionName, optionProps: {label: 'name', value: 'id'}, placeholder: '请选择订阅名称'}"/>
      <qz-table-column label="订阅特征" prop="subFeature" />
      <qz-table-column label="查看" width="80"><i><qz-icon class="icon-file-search text-color action-link"/></i></qz-table-column>
    </qz-pro-table> 



```

模拟数据

```json
subData: [
          {
            timeStamp: 1597716293334,
            interface: 'www.quanzhi.info',
            interfaceType: '文件上传接口',
            subName: '新增敏感接口',
            subFeature: '新增数据标签-手机号，电话号码，银行卡号，社保卡号'
          },
          {
            timeStamp: 1597616193334,
            interface: 'www.qzkj.com',
            interfaceType: '文件上传接口',
            subName: '新增接口',
            subFeature: '新增数据标签-手机号，电话号码，银行卡号，社保卡号'
          },
          {
            timeStamp: 1596616193334,
            interface: 'www.qzkj.com.cn',
            interfaceType: '文件上传接口',
            subName: '新增接口',
            subFeature: '新增数据标签-手机号，电话号码，银行卡号，社保卡号'
          }
        ],
```

自定义qz-pro-table.vue

```vue
<template>
  <div class="main-content mt20">
    <qz-pro-table
      ref="table"
      :data-source="subData"
      :request-params-formatter="parameFormatter"
    >
      <qz-search-input
        slot="customSearch"
        v-model.trim="keywords"
        form-width="680px"
        placeholder="请输入接口URL进行筛选"
        :popper-visible.sync="popperVisible"
        clearable
        @keydown.enter.native="reloadTable"
        @clear="reloadTable"
        @confirm="searchConfirm"
      >
        <el-form slot="form" label-width="120px" class="search-form mt10">
          <el-form-item label="订阅名称">
            <el-select
              clearable
              size="small"
              style="width:100%;"
              multiple
              placeholder="请选择订阅名称"
              v-model="subscriptionNameSelected"
            >
              <el-option
                v-for="item of subscriptionName"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="应用">
            <el-input
              clearable
              size="small"
              style="width:100%;"
              v-model="appUrl"
              placeholder="请输入域名进行筛选"
            ></el-input>
          </el-form-item>
          <el-form-item label="返回类型">
            <el-select
              multiple
              clearable
              size="small"
              style="width:100%;"
              placeholder='请选择返回类型'
              v-model="returnTypeItemSelected"
            >
              <el-option
                v-for="item in returnType "
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发现时间">
            <el-date-picker
              v-model="dateItem"
              value-format="timestamp"
              type="daterange"
              range-separator="~"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :picker-options="dateQuickChoose"
              size="small"
              style="width: 100%;"
              unlink-panels
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </qz-search-input>

      <qz-table-column 
        label="事件时间" 
        prop="timeStamp"
        
        qz-sortable
        default-sort="asc"> 
        <template slot-scope="{ row }">{{ row.timeStamp | timeFormat("YYYY-MM-DD HH:mm:ss") }}</template>  
      </qz-table-column>
      <qz-table-column label="接口" prop="interface" min-width="160" />
      <qz-table-column label="接口类型" prop="interfaceType" :search-config="{type: 'multi-selection', options: returnType, optionProps: {label: 'name', value: 'id'}}" />
      <qz-table-column label="订阅名称" prop="subName" />
      <qz-table-column label="订阅特征" prop="subFeature" />
      <qz-table-column label="查看" width="80"><i><qz-icon class="icon-file-search text-color action-link"/></i></qz-table-column>
    </qz-pro-table>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 日期选择的快捷选项
        dateQuickChoose: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近半年',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                picker.$emit('pick', [start, end]);
              }
            }
          ],
        },

        // 搜索框关键字
        keywords: '',
        // 按域名搜索
        appUrl: '',
        // 选择的日期范围
        dateItem: "",
        // 选中的订阅名称
        subscriptionNameSelected: [],
        // 选中的返回类型
        returnTypeItemSelected: [],
        // 控制高级筛选框的显示与隐藏
        popperVisible: false,
        // 订阅名称
        subscriptionName: [
          {
            name: '新增接口', 
            id: 1
          },
          {
            name: '新增敏感接口', 
            id: 2
          },
          {
            name: '新增数据标签', 
            id: 3
          }
        ],
        // 返回类型
        returnType: [
          {
            name: '登陆接口', 
            id: 4
          },
          {
            name: '文件上传接口', 
            id: 5
          },
          {
            name: '文件下载接口', 
            id: 6
          }
        ],
        
        subData: [
          {
            timeStamp: 1597716293334,
            interface: 'www.quanzhi.info',
            interfaceType: '文件上传接口',
            subName: '新增敏感接口',
            subFeature: '新增数据标签-手机号，电话号码，银行卡号，社保卡号'
          },
          {
            timeStamp: 1597616193334,
            interface: 'www.qzkj.com',
            interfaceType: '文件上传接口',
            subName: '新增接口',
            subFeature: '新增数据标签-手机号，电话号码，银行卡号，社保卡号'
          },
          {
            timeStamp: 1596616193334,
            interface: 'www.qzkj.com.cn',
            interfaceType: '文件上传接口',
            subName: '新增接口',
            subFeature: '新增数据标签-手机号，电话号码，银行卡号，社保卡号'
          }
        ],
      }
    },
    
    methods: {
      parameFormatter(params) {
        console.log(params)
      },

      reloadTable() {
        console.log('发起请求，重新加载表格')
      },

      searchConfirm() {
        console.log('确定搜索')
        this.popperVisible = false
      }
    }
  }
</script>

<style lang="less" scoped>

  .text-color {
    color: #4A97EB;
  }
  .action-link {
    cursor: pointer;
  }
</style>
```



```vue
{property: 'subName', label: '订阅名称', type: 'multi-selection', options: this.returnType, optionProps: {label: 'name', value: 'id'}, placeholder: '请选择接口类型'},
        {property: 'interface', label: '应用', type: 'multi-selection', options: this.returnType, optionProps: {label: 'name', value: 'id'}, placeholder: '请选择接口类型'},
        {property: 'interfaceType', label: '接口类型', type: 'multi-selection', options: this.returnType, optionProps: {label: 'name', value: 'id'}, placeholder: '请选择接口类型'},
        {property: 'timeStamp', label: '时间时间', type: 'daterange', pickerOptions: dateQuickChoose}
```



#### 8.21 首页

- [ ] 登陆成功之后跳转到首页，修改一下路由即可

-----------

- [ ] 获取接口数据，分别渲染到头部三个标签页
- [ ] 点击今日新增，拿到今天的时间戳（可能是数组，可能是两个数字），把时间戳作为参数传递到跳转的路径------------一共有三个，除了首页要修改，还要修改对应跳转页的逻辑
- [x] 点击数据数字，跳转到对应的页面（已完成）

--------

订阅页面：

- [ ] 获取订阅数据并渲染，并且每隔 10s 刷新订阅列表
- [ ] 点击更多跳转到订阅内容页面，获取数据并渲染即可
- [x] 点击配置跳转到订阅配置页面，未作。
- [x] 点击查看详情，先不做。

-------------

弱点TOP5：

- [x] 按照弱点个数展示包含弱点的 TOP5 应用，qz-pro-table 组件设置按**弱点个数降序**排序


- [x] 点击更多直接跳转到弱点页面下的应用模式 （已完成）
- [ ] 点击详情，需要传递 id 和 host，注意修改相关参数
- [ ] 点击应用域名，跳转到该应用的应用画像，参数是：该应用域名 + id
- [ ] 30 min 更新一次

-------------

弱点事件：

- [x] 按发现时间倒序展示 5 条数据（优先展示最新的）
- [x] 点击 更多 跳转到弱点页面（已完成）
- [ ] 点击查看详情，弹出弱点详情（参考 weakness/webapp.vue -> showDetail 方法）
- [ ] 点击接口 URL 跳转到接口画像页面，参数是：id 和 appid
- [ ] 发现新弱点同步更新






--------------------------

proxy: 'http://192.168.10.179:8083'








