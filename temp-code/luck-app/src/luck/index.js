/**
 * @Description: 抽奖主页面
 * @author 霍青利
 * @date 2020/12/1 14:49
*/
import React,{Component} from 'react';
import LuckItem from "./LuckItem";
import './index.css'


class Luck extends Component{
    constructor(props){
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
                    imgUrl: '/static/luck01.jpg',
                    title: "柠檬温和去角质素2"
                },
                {
                    id: 3,
                    imgUrl: '/static/luck01.jpg',
                    title: "柠檬温和去角质素3"
                },
                {
                    id: 4,
                    imgUrl: '/static/luck01.jpg',
                    title: "柠檬温和去角质素4"
                },
                {
                    id: 5,
                    imgUrl: '/static/luck01.jpg',
                    title: "柠檬温和去角质素5"
                },
                {
                    id: 6,
                    imgUrl: '/static/luck01.jpg',
                    title: "柠檬温和去角质素6"
                },
                {
                    id: 7,
                    imgUrl: '/static/luck01.jpg',
                    title: "柠檬温和去角质素7"
                },
                {
                    id: 8,
                    imgUrl: '/static/luck01.jpg',
                    title: "柠檬温和去角质素8"
                },

            ],
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
    handleClickLuck() {
        let {luckChance, restWishes} = this.state;
        if(luckChance <= 0) {
            return alert('今天没有抽奖机会啦！');
        } else if (restWishes < 5){
            return alert('心愿不足，快去收集吧！');
        }
        let {luckItem} = this.state
        let percent = Math.floor(Math.random()*100+1);
        // console.log(percent)
        if (percent <= 5) {
            console.log(luckItem[0].title); // 5%
        } else if (percent > 5 && percent <= 10) {
            console.log(luckItem[2].title); // 5%
        } else if (percent > 10 && percent <= 15) {
            console.log(luckItem[4].title); // 5%
        } else if (percent > 15 && percent <= 20) {
            console.log(luckItem[6].title);
        } else if (percent > 20 && percent <= 70) {
            console.log(luckItem[5].title);
        } else if (percent > 70 && percent <= 90) {
            console.log(luckItem[1].title);
        } else if (percent > 90 && percent <= 95) {
            console.log(luckItem[3].title);
        } else if (percent > 95 && percent <= 100) {
            console.log(luckItem[7].title);
        }
    }

    render(){
        let {luckItem} = this.state;
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
                        <LuckItem luckItem={luckItem[0]}></LuckItem>
                        <LuckItem luckItem={luckItem[1]}></LuckItem>
                        <LuckItem luckItem={luckItem[2]}></LuckItem>
                        <LuckItem luckItem={luckItem[7]}></LuckItem>
                        <div className="luck-button" onClick={() => this.handleClickLuck()}>
                            <div className="click-Luck">点击抽奖</div>
                            <div className="consume-wishes">消耗 5 心愿</div>
                        </div>
                        <LuckItem luckItem={luckItem[3]}></LuckItem>
                        <LuckItem luckItem={luckItem[6]}></LuckItem>
                        <LuckItem luckItem={luckItem[5]}></LuckItem>
                        <LuckItem luckItem={luckItem[4]}></LuckItem>


                    </div>
                </div>
                {/* 提示中将信息区域 */}
                <div className="luck-tips">
                    <div className="tips-left">
                        <img src="static/laba.png" alt=""/>
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