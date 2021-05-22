import React from 'react';
import PropTypes from 'prop-types';
import { composeClasses } from '../../utils';
import styles from './input_password.module.scss';
import { ReactComponent as ViewIcon } from '../../images/view.svg';
import { ReactComponent as HideIcon } from '../../images/hide.svg';

const InputPassword = ({
  id,
  label,
  placeholder,
  onChange,
  toggle,
  onToggle,
  className,
  inputStyle,
  maxLength,
  minLength,
  name,
  pattern
}) => (
  <div className={composeClasses(styles.input_wrapper, className)}>
    <label className={styles.visually_hidden} htmlFor={id}>
      {label}
    </label>
    <input
      className={composeClasses(styles.input, inputStyle)}
      id={id}
      maxLength={maxLength}
      minLength={minLength}
      name={name}
      onChange={onChange}
      pattern={pattern}
      placeholder={placeholder}
      type={toggle ? 'text' : 'password'}
    />

    {toggle ? (
      <ViewIcon aria-label="View" className={styles.icon} data-testid="view_icon" onClick={onToggle} />
    ) : (
      <HideIcon aria-label="Hide" className={styles.icon} data-testid="hide_icon" onClick={onToggle} />
    )}
  </div>
);

InputPassword.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  toggle: PropTypes.bool,
  visuallyHidden: PropTypes.bool,
  pattern: PropTypes.string,
  maxLength: PropTypes.string,
  minLength: PropTypes.string,
  name: PropTypes.string,
  onToggle: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string
};

export default InputPassword;
