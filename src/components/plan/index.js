import React from 'react';
// import {Link} from 'react-router-dom';

import styles from './plan.module.css';



class Plan extends React.Component {
    // constructor(props) {
    //     // super(props);
    //     // this.state = {
    //     // };
    //   }
      state ={}

    render(){
        const {headerColor, buttonStyle, title, price, content} = this.props
        const divider = {width: '2rem', height: '0.15rem', alignSelf: 'center', backgroundColor: '#fff'}
        return(
            <div className={styles.container}>
                <div style={headerColor} className={styles.title}>
                    <div className={styles.titleText}>{title}</div>
                    <div style={divider}></div>
                    <div className={styles.price}>${price}</div>
                    <div className={styles.duration}>Monthly</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentText}>{content}</div>
                    <button style={buttonStyle} className={styles.button}>Choose Plan</button>
                </div>
            </div>
        );
    }
}
export default Plan;