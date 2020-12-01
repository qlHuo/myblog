import React, { Component } from 'react';
import './LuckItem.css'

class LuckItem extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        let { luckItem, choosedId } = this.props;
        return (
            <div className={choosedId === luckItem.id ? 'content-luck-item choose-item' : 'content-luck-item'} key={luckItem.id}>
                <img src={luckItem.imgUrl} className="luck-img" />
                <div className="luck-title">{luckItem.title}</div>
            </div>
        )
    }
}

export default LuckItem