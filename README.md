# 9宫格抽奖
# API
 属性      | 说明     | 类型     | 默认值     
 -------- | :-----------:  | :-----------: | :-----------:   | :-----------:  
giftList    | 所有的奖品 | arr     | null| 必填
gift     | 中奖的奖品 | number     | null| 非必填
playBtn | 开始按钮的文案 | String/React.Element     | 立即抽奖| 非必填
times    | 抽奖的次数  | number     | 1| 非必填
speed    | 默认减速到ms展示结果  | number    | 120| 非必填
CYCLE_TIMES   | 50ms的速度转多少圈  |  number | 3| 非必填
className| 样式  | object   | ''| 非必填
callback| 每次抽完奖的回调  | (item): void     | ''| 非必填
finishCallback| 抽奖次数用完的回调  | (content, props): void    | ''| 非必填

```
giftList = [{
                name: '奖品1',
                id: 1,
                ele: <div className={`custom_item`}>
                    <div className={`custom_item_main`}>
                    </div>
                </div>
            }, {
                name: '奖品2',
                id: 2,
            }, {
                name: '奖品3',
                id: 3,
                ele: <div className={`custom_item`}>
                    <div className={`custom_item_main`}>
                    </div>
                </div>
            }, {
                name: '奖品4',
                image: '',
                id: 4,
            }, {
                name: '奖品5',
                id: 5,
            }, {
                name: '奖品6',
                id: 6,
                ele: <div className={`custom_item`}>
                    <div className={`custom_item_main`}>
                    </div>
                </div>
            }, {
                name: '奖品7',
                id: 7,
            }, {
                name: '奖品8',
                id: 8,
            }]
```


# 奖品数据顺序
   1  2  3
   4     5
   6  7  8


#  用法
```
    import { LuckDraw } from 'LuckDraw'

    <LuckDraw
      giftList={this.state.luck_draw_data}
      times={this.state.sudoku_lottery_times}
      gift={this.state.gift}
      speed={120}
      callback={(act_item, e) => {
          console.log(act_item, e)
          e.reset()
          alert('中奖了')
      }}
      playBtn={<div className={`custom_item`}><div className={`custom_item_btn`} > </div></div>}
      beforeStart={() => {
          return new Promise((resolve) => {
              setTimeout(() => {
                  this.setState({
                      gift: { id: 3 }
                  })
                  resolve(11111)
              }, 1000)
          })
      }}
      finishCallback={(e) => {
          alert('没有次数了')
      }}
  ></LuckDraw>
```


#  注意： 

    调用抽奖组件的方法： 1. 通过ref,  2. 通过callback回调函数参数中的current对象，例如：current.reset()


#  总结：
1、rollup 适合打包 js 库，不适合打包 css，如果想制作 基于 react 和antd 的组件首选 webpack
2、rollup-plugin-commonjs这个包一定要引入好，并且注意使用

//告诉rollup不要将此lodash打包，而作为外部依赖，否则会报 <div >不识别或者  React 的Component 各种错
```
external: ["react", "lodash", "antd"],
commonjs({
      include: ["node_modules/**"]
    }),
```
3、npm 和 git 使用共同的 version和 tags
4、npm 发布用下面的，添加包用上面的
```
npm set registry https://registry.npm.taobao.org
npm set registry http://registry.npmjs.org
```
# 发布到 npm
```
npm login
npm version new-version
npm publish
git push origin --tags
```
### 配置.npmignore

如果项目中没有编写 .npmignore 文件，则需要在 package.json 中新增 files 字段，用于申明将要发布到 NPM 的文件。如果省略掉这一项，所有文件包括源代码会被一起上传到 NPM。
本文采用写 .npmignore 文件的方式，实现仅发布打包后的组件代码。 .npmignore 文件的具体内容如下：

# 指定发布 npm 的时候需要忽略的文件和文件夹
# npm 默认不会把 node_modules 发上去
```
config # webpack配置
example # 开发时预览代码
src # 组件源代码目录
.babelrc # babel 配置
```