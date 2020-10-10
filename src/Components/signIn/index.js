import React from "react";
import PropTypes from "prop-types";
import styles from "./signIn.module.scss";

const SignInSignUp = (props) => {
  const { signIn, handleClick, handleAuthLogOut, authButtonStyles } = props;

  return (
    <ul className={styles.signInButtons} style={{ ...authButtonStyles }}>
      {!signIn ? (
        <li>
          <input type="button" value="Log In" onClick={handleClick} />
          <input type="button" value="Sign Up" onClick={handleClick} />
        </li>
      ) : (
        <li>
          <input type="button" value="Sign Out" onClick={handleAuthLogOut} />
        </li>
      )}
    </ul>
  );
};

SignInSignUp.propTypes = {
  signIn: PropTypes.bool,
  isLoading: PropTypes.bool,
};

SignInSignUp.defaultProps = {
  signIn: false,
  isLoading: false,
  authButtonStyles: {},
};

export default SignInSignUp;
