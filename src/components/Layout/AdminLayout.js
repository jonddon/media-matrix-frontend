import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
// import Footer from '../footer';
import styles from './AdminLayout.module.scss';


const AdminLayout = ({ children, className }) => {
  return (
        <main className={styles.container}>
          <section style={{paddingTop: '2.8rem'}} className={className} >
            <div style={{position: 'fixed', top: 0, width: '100%', zIndex: '32'}}>
              <Header/>  
            </div>
            {children}
          {/* <Footer /> */}
          </section>
        </main>
  );
};

AdminLayout.propTypes = {
        children: PropTypes.node.isRequired
};

export default AdminLayout;