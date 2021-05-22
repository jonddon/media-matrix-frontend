import React from 'react';
import Accordion from '../../components/accordion';
import styles from './faq.module.css';



class Faq extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isShown: false,
        };
      }

      

    render(){
        return(
          <div className={styles.container}>
            <div className={styles.header}>Have any questions?</div>
            <div className={styles.body}>
              <Accordion />
              <Accordion />
              <Accordion />
              <Accordion />
            </div>
          </div>
        );
    }
}
export default Faq;