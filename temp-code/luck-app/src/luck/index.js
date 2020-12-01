/**
 * @Description: 抽奖主页面
 * @author 霍青利
 * @date 2020/12/1 14:49
*/
import React, { Component } from 'react';
import LuckItem from "./LuckItem";
import './index.css'


class Luck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            luckChance: 10,
            restWishes: 100,
            luckItem: [
                {
                    id: 1,
                    imgUrl: '/static/luck01.jpg',
                    title: "柠檬温和去角质素1"
                },
                {
                    id: 2,
                    imgUrl: '/static/luck02.png',
                    title: "柠檬温和去角质素2"
                },
                {
                    id: 3,
                    imgUrl: '/static/luck01.jpg',
                    title: "柠檬温和去角质素3"
                },
                {
                    id: 4,
                    imgUrl: '/static/luck02.png',
                    title: "柠檬温和去角质素4"
                },
                {
                    id: 5,
                    imgUrl: '/static/luck01.jpg',
                    title: "柠檬温和去角质素5"
                },
                {
                    id: 6,
                    imgUrl: '/static/luck02.png',
                    title: "柠檬温和去角质素6"
                },
                {
                    id: 7,
                    imgUrl: '/static/luck01.jpg',
                    title: "柠檬温和去角质素7"
                },
                {
                    id: 8,
                    imgUrl: '/static/luck02.png',
                    title: "柠檬温和去角质素8"
                },

            ],
            // 选中的id
            choosedId: '',
            // 中奖结果
            luckResult: '',
            // 是否正在抽奖
            isRunning: false,
            // 总共需要执行的次数
            runTimes: 0,
            // 当前动画执行的次数
            currentTimes: 0,
            luckTips: '恭喜 钱芳 抽中 柠檬温和去角质素',
        }
    }

    /**
     * 点击按钮
     * @author 霍青利
     * @date 2020/12/1 21:15
     * @param
     * @param
     * @return
    */
    handleClickLuck () {
        let { luckChance, restWishes, isRunning } = this.state;
        if (luckChance <= 0) {
            return alert('今天没有抽奖机会啦！');
        } else if (restWishes < 5) {
            return alert('心愿不足，快去收集吧！');
        }

        // 如果 isRunning 为 false 的时候才会进行抽奖
        if (!isRunning) {

            this.setState({
                choosedId: '',
                luckResult: '',
                isRunning: false,
                runTimes: 0,
                currentTimes: 0,
            }, () => {
                this.handleRunning()
            })
        }
    }

    // 正在执行抽奖结果
    handleRunning () {
        let { luckItem } = this.state;

        // 控制每一项出现的概率
        let percent = Math.floor(Math.random() * 100 + 1);
        // 提前确定选中的结果
        if (percent <= 5) {
            // console.log(luckItem[0].title); // 5%
            this.setState({
                luckResult: luckItem[0].id
            })
        } else if (percent > 5 && percent <= 10) {
            this.setState({
                luckResult: luckItem[2].id
            })
        } else if (percent > 10 && percent <= 15) {
            this.setState({
                luckResult: luckItem[4].id
            })
        } else if (percent > 15 && percent <= 20) {
            this.setState({
                luckResult: luckItem[6].id
            })
        } else if (percent > 20 && percent <= 70) {
            this.setState({
                luckResult: luckItem[5].id
            })
        } else if (percent > 70 && percent <= 90) {
            this.setState({
                luckResult: luckItem[1].id
            })
        } else if (percent > 90 && percent <= 95) {
            this.setState({
                luckResult: luckItem[3].id
            })
        } else if (percent > 95 && percent <= 100) {
            this.setState({
                luckResult: luckItem[7].id
            })
        }

        this.setState({
            choosedId: 0
        })

        let runTimes = luckItem.length * 2;
        this.setState({
            runTimes: runTimes
        })

        this.timer = setInterval(() => {
            let num;
            if (this.state.choosedId === this.state.luckResult
                && this.state.currentTimes > this.state.runTimes) {
                clearInterval(this.timer);
                this.setState({
                    isRunning: false
                })
                return
            }

            // 以下是动画执行时对id的判断
            if (this.state.choosedId === '') {
                num = 0;
                this.setState({
                    choosedId: num
                })
            } else {
                num = this.state.choosedId;
                if (num === 9) {
                    num = 0;
                    this.setState({
                        choosedId: num
                    })
                } else {
                    num = num + 1;
                    this.setState({
                        choosedId: num
                    })
                }
            }
            this.setState({
                currentTimes: this.state.currentTimes + 1
            })
        }, 100)

    }

    render () {
        let { luckItem, choosedId } = this.state;
        return (
            <div className="container">
                {/* 头部提示区域 */}
                <div className="header">
                    <div className="luck-chance">今日还有 {this.state.luckChance} 次抽奖机会</div>
                    <div className="rest-wishes">剩余 {this.state.restWishes} 心愿</div>
                </div>

                {/* 抽奖主体区域 */}
                <div className="content">
                    <div className="content-luck-main">
                        <LuckItem luckItem={luckItem[0]} choosedId={choosedId}></LuckItem>
                        <LuckItem luckItem={luckItem[1]} choosedId={choosedId}></LuckItem>
                        <LuckItem luckItem={luckItem[2]} choosedId={choosedId}></LuckItem>
                        <LuckItem luckItem={luckItem[7]} choosedId={choosedId}></LuckItem>
                        <div className="luck-button" onClick={() => this.handleClickLuck()}>
                            <div className="click-Luck">点击抽奖</div>
                            <div className="consume-wishes">消耗 5 心愿</div>
                        </div>
                        <LuckItem luckItem={luckItem[3]} choosedId={choosedId}></LuckItem>
                        <LuckItem luckItem={luckItem[6]} choosedId={choosedId}></LuckItem>
                        <LuckItem luckItem={luckItem[5]} choosedId={choosedId}></LuckItem>
                        <LuckItem luckItem={luckItem[4]} choosedId={choosedId}></LuckItem>
                    </div>
                </div>
                {/* 提示中将信息区域 */}
                <div className="luck-tips">
                    <div className="tips-left">
                        <img src="static/laba.png" alt="" />
                    </div>
                    <div className="tips-right">{this.state.luckTips}</div>
                </div>

                {/* 中奖记录 */}
                <div className="luck-record">中奖记录 ></div>
            </div>
        );
    }
}

export default Luck;