# 9宫格抽奖
# API
 属性      | 说明     | 类型     | 默认值     
| ------------- | ------------- |------------- | ------------- |
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
                    奖品1
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
                    奖品2
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
                    奖品3
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
    import 'luck-draw-react/dist/luck-draw.css';
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
