import React from 'react'
import LuckDraw from 'luck-draw';
import './index.scss'
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            luck_draw_data: [{
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
            }],
            sudoku_lottery_times: 1,
            gift: { id: 4 }
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <>
                <LuckDraw
                    giftList={this.state.luck_draw_data}
                    times={this.state.sudoku_lottery_times}
                    gift={this.state.gift}
                    speed={120}
                    callback={(act_item, e) => {
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
                    finishCallback={() => {
                        alert('没有次数了')
                    }}
                ></LuckDraw>
            </>
        )
    }
}
