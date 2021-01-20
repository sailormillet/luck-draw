import React from 'react'
import './styles/index.scss'
class LuckDraw extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            active_index: null,   // 奖品是否被选中，选中时，值为奖品index, 例如0,1,2,3...
            times: 'times' in props ? props.times * 1 : 1, // 抽奖次数
            is_rolling: false,  // 正在抽奖时，禁止重复点击
            roll_map_list: [0, 1, 2, 7, 8, 3, 6, 5, 4],  // 运动顺序，数据映射
        };
        this.lotteryTimer = null;
        this.current_index = 0;
        this.CYCLE_TIMES = 0;
        this.speed = 50;
    }
    componentWillUnmount() {
        clearTimeout(this.lotteryTimer);
        clearTimeout(this.callbacktimer)
    }
    data_format(data) {
        if (data) {
            let gift_list = data.slice(0, 8);
            gift_list.splice(gift_list.length / 2, 0, {
                name: "立即抽奖",
                image: "",
                id: "",
                startBtn: true
            })
            return gift_list
        } else {
            console.error('未获取到奖品信息！');
            return []
        }
    }
    start = () => {
        const { roll_map_list, times } = this.state;
        const { gift, giftList, speed = 120, cycle_times = 3 } = this.props
        const gift_list = this.data_format(giftList)
        this.setState(
            {
                active_index: this.current_index,
            },
            () => {
                let act_item = gift_list[roll_map_list.indexOf(this.current_index)] || {}
                if (this.speed > speed && (act_item.id * 1 === gift.id * 1)) {
                    clearTimeout(this.lotteryTimer);
                    this.lotteryTimer = null;
                    this.CYCLE_TIMES = 0;
                    this.speed = 50;
                    this.callbacktimer = setTimeout(() => {
                        this.setState({ is_rolling: false, times: times - 1 })
                        this.props.callback && this.props.callback({ ...act_item, ...gift }, this)
                    }, 500);
                    return
                }
                this.current_index = ++this.current_index % gift_list.length;
                this.current_index === 0 && this.CYCLE_TIMES++;
                this.lotteryTimer = setTimeout(() => {
                    this.start();
                }, this.speed);
                if (this.CYCLE_TIMES > cycle_times) this.speed += 10;
            }
        );
    };
    reset = () => {
        this.setState({
            active_index: null,
        })
        this.lotteryTimer = null;
        this.current_index = 0;
        this.CYCLE_TIMES = 0;
        this.speed = 50;
    }
    handlePlay = () => {
        if (!this.state.times) return this.props.finishCallback && this.props.finishCallback(this);
        if (this.state.is_rolling) return;
        this.current_index = 0;
        this.CYCLE_TIMES = 0;
        this.speed = 50;
        if (this.props.beforeStart) {
            this.props.beforeStart().then(() => {
                this.setState({
                    is_rolling: true,
                }, () => {
                    this.start();
                })
            })
        } else {
            this.setState({
                is_rolling: true,
            }, () => {
                this.start();
            })
        }
    };
    render() {
        const { active_index, roll_map_list } = this.state;
        const gift_list = this.data_format(this.props.giftList)
        if (gift_list.length < 8) return null;
        return (
            <div className={`lottery pos-r`}>
                <div className={`lottery_content`}>
                    {gift_list.map((item, index) => {
                        let content = (
                            <div key={index} className={`lottery_item ${active_index === roll_map_list[index] ? 'lottery_item-active' : ''}`} >
                                {item.ele ? item.ele : <div className={`lottery_item_main`}>{item.name}</div>}
                            </div>
                        );
                        if (item.startBtn) {
                            content = (
                                <div key={index} className={`lottery_item`} onClick={this.handlePlay} >
                                    {typeof this.props.playBtn === 'object' ? this.props.playBtn : <div className={`lottery_item_main`} >{this.props.playBtn || item.name}</div>}
                                </div>
                            );
                        }
                        return content;
                    })}
                </div>
            </div>
        );
    }
}
export default LuckDraw