import React,{Component} from 'react';
import './LuckItem.css'

class LuckItem extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let {luckItem} = this.props;
        return (
            <div className="content-luck-item" key={luckItem.id}>
                <img src={luckItem.imgUrl}  className="luck-img"/>
                <div className="luck-title">{luckItem.title}</div>
            </div>
        )
    }
}

export default LuckItem