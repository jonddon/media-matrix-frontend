import React from 'react';
import {Link} from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import {RiCompassDiscoverLine, BsArrowRight, FiDownload} from 'react-icons/all';

import styles from'./LandingPage.module.css';
import Button from '../../components/button';



class LandingPage extends React.Component {
    // constructor(props) {
    //     // super(props);
    //     // this.state = {
    //     // };
    //   }
      state ={}

    render(){

        return(
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.overlay}>
                        <div className={styles.topSectionText}>
                            <h1>
                                Discover Media Opportunitites around the World
                                 
                            </h1>
                             
                        </div>
                        <Link className={styles.exploreButton} to='/login'>
                            <div>Explore</div>
                            <BsArrowRight />
                        </Link>
                    </div>
                </div>
                <div className={styles.middleSection}>
                    <div className={styles.middleSectionText}>Streamline your media relations</div>
                    <div className={styles.middleSectionText}>in three easy steps</div>
                    <div className={styles.middleSectionContainer}>
                        <div className={styles.middleSectionCard}>
                            <div className={styles.middleSectionCardHeader}>
                                <FiSearch className={styles.logo} />
                                <div>
                                    Search
                                </div>
                            </div>
                            <div className={styles.cardText}>
                                Search our database for the media opportunities that meet your needs.
                            </div>
                        </div>
                        <div className={styles.middleSectionCard}>
                            <div className={styles.middleSectionCardHeader}>
                                <RiCompassDiscoverLine className={styles.logo} />
                                <div>
                                    Discover
                                </div>
                            </div>
                            <div className={styles.cardText}>
                                Explore available options based on the region, media, and content type.
                            </div>
                        </div>
                        <div className={styles.middleSectionCard}>
                            <div className={styles.middleSectionCardHeader}>
                                <FiDownload className={styles.logo} />
                                <div>
                                    Save
                                </div>
                            </div>
                            <div className={styles.cardText}>
                                Save your search results on your account or export for offline use. 
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottomSection}>
                        <div className={styles.footerOverlay}>
                            <div className={styles.footerOverlayOne}>
                                <div className={styles.newsLetterHeader}>Stay in the know</div>
                                <div className={styles.newsLetterFooter}>Sign up for our newsletter to get the latest updates and news</div>
                                <form className={styles.newsLetter}>
                                    <input className={styles.emailField} 
                                    placeholder='Enter your email address' 
                                    type='text'
                                    />
                                    <Button
                                    className={styles.emailButton}
                                    label='Subscribe' type='submit' 
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default LandingPage;