import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.css';
import { composeClasses } from '../../utils';

const Button = ({ className, label, onClick, icon, isDisabled, type }) => (
  <button className={composeClasses(className, styles.button)} disabled={isDisabled} onClick={onClick} type={type}>
    {label ? label : icon}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  // label: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.node
};

export default Button;
