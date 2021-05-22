import React from 'react';
// import {Link} from 'react-router-dom';

import styles from './plans.module.css';
import Plan from '../../components/plan';



class Plans extends React.Component {
    // constructor(props) {
    //     // super(props);
    //     // this.state = {
    //     // };
    //   }
      state ={}


    render(){
        const blue = { backgroundColor: '#1551AB' }

        const green = { backgroundColor: '#43C117'}

        const content = 'Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit'

        return(
            <div className={styles.container}>
                <div className={styles.welcomeText}>Search and discover opportunities in the Nigerian media space</div>
                <div className={styles.body}> 
                    <Plan headerColor={blue} title={'Personal'} price={5} content={content} buttonStyle={blue} />
                    <Plan headerColor={green} title={'Business'} price={20} content={content} buttonStyle={green} />
                </div>
            </div>
        );
    }
}
export default Plans;