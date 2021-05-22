// import { cleanup } from '@testing-library/react';
import React from 'react';
import {AiOutlineClose, BiChevronDown} from 'react-icons/all';
import styles from './accordion.module.css';

class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: false
        };
      }

      handleToggle=()=> {
        this.setState({isShown: !this.state.isShown})
      }

      cleanUp=()=>{
        this.setState({isShown: false})
      }

      componentWillUnmount(){
        this.cleanUp()
      }

    render(){

        return(
            <div className={`${this.state.isShown ? styles.card : styles.cardOne}`}>
                <div className={`${this.state.isShown ? styles.cardHeader : styles.cardHeaderOne}`}>
                  <div>How do I export my search results?</div>
                  {this.state.isShown === false ? 
                  <BiChevronDown onClick={this.handleToggle} className={styles.logoTwo} />
                  :<AiOutlineClose onClick={this.handleToggle} className={styles.logo} /> 
                  }
                </div>
                <div className={`${ !this.state.isShown ? styles.cardBodyOne : styles.cardBody}`}>
                  Lorem ipsum dolor sit amet, do
                  adised do eiusmod tempor
                  incididunt lorem ipsum dolor sit
                  amet, do adised do eiusmod
                  tempor incididunt do sit amet.
                  Lorem ipsum dolor sit amet, do
                  adised do eiusmod tempor
                  incididunt lorem ipsum dolor sit.
                </div>
            </div>
        );
    }
}
export default Accordion;