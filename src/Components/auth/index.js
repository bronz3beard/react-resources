import React, { useState } from "react";
import PropTypes from "prop-types";
import firebase from "../../Firebase/firebase";
import SignInSignUp from "../signIn";
import Modal from "../modal";
import styles from "./authenticate.module.scss";

const Authenticate = (props) => {
  const [signUp, setSignUp] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const [formInputValue, setFormInputValue] = useState({
    email: {
      value: "",
      placeHolder: "@email",
    },
    userName: {
      value: "",
      placeHolder: "userName",
    },
    password: {
      value: "",
      placeHolder: "password",
    },
  });
  const { email, userName, password } = formInputValue;
  const { signIn, uid, data, isLoading, authButtonStyles } = props;

  const handleFirebaseAuth = (event) => {
    event.preventDefault();
    // setShowHide(!showHide);
    const name = event.target.name;

    console.log("you are logged in!");

    if (name === "email") {
      if (email.value && password.value) {
        const promise = firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        promise.catch((error) => console.log(error.message));
      }
    }

    if (name === "facebook") {
      const providerFacebook = new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithRedirect(providerFacebook);
      firebase
        .auth()
        .getRedirectResult()
        .then((result) => {
          if (result.credential) {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            // const token = result.credential.accessToken;
            // console.log('TCL: token', token);
          }
          // The signed-in user info.
          // const user = result.user;
          // console.log('TCL: user', user.displayName);
          // console.log('TCL: user', user);
        })
        .catch((error) => {
          console.log("handleFirebaseAuth -> error", error);
          // Handle Errors here.
          // const errorCode = error.code;
          // console.log('TCL: errorCode', errorCode);
          // const errorMessage = error.message;
          // console.log('TCL: errorMessage', errorMessage);
          // The email of the user's account used.
          // const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // const credential = error.credential;
        });
    }

    if (name === "google") {
      const providerGoogle = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithRedirect(providerGoogle);
      firebase
        .auth()
        .getRedirectResult()
        .then((result) => {
          if (result.credential) {
            // console.log('result', result);
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            // const token = result.credential.accessToken;
            // console.log('TCL: token', token);
          }
          // The signed-in user info.
          // const user = result.user;
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          console.log("handleFirebaseAuth -> errorCode", errorCode);
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
        });
    }
  };

  const handleFirebaseAuthSignUp = (event) => {
    event.preventDefault();
    const name = event.target.name;
    console.log("you signed up!");
    setShowHide(!showHide);
    if (name === "email") {
      const promise = firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      promise.catch((error) => console.log(error.message));
    }
  };

  const handleClick = (event) => {
    const value = event.target.value;
    console.log("handleClick -> value", value);
    setShowHide(!showHide);
    setSignUp(value === "Sign Up" ? true : false);
  };

  const handleAuthLogOut = () => {
    firebase.auth().signOut();
    console.log("you logged out!");
  };

  const formInputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormInputValue({
      ...formInputValue,
      [name]: {
        ...formInputValue[name],
        value,
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SignInSignUp
        signIn={signIn}
        signUp={signUp}
        handleClick={handleClick}
        authButtonStyles={authButtonStyles}
        handleAuthLogOut={handleAuthLogOut}
      />
      <Modal
        backgroundColor="white"
        hideBodyOverflowY={true}
        handleModal={handleClick}
        showModal={showHide}
      >
        <div className={styles.signInFormContainer}>
          <form className={styles.signInForm}>
            <ul className={styles.flexOuter}>
              <>
                {signUp && (
                  <li>
                    <input
                      type="text"
                      name="userName"
                      required
                      placeholder={userName.placeHolder}
                      value={userName.value}
                      onChange={formInputChangeHandler}
                    />
                  </li>
                )}
                <li>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={email.placeHolder}
                    value={email.value}
                    onChange={formInputChangeHandler}
                  />
                </li>
                <li>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder={password.placeHolder}
                    value={password.value}
                    onChange={formInputChangeHandler}
                  />
                </li>
                <li>
                  <input
                    type="submit"
                    value={
                      !signUp ? "Sign in with Email" : "Sign up with Email"
                    }
                    name="email"
                    style={
                      !signUp
                        ? { backgroundColor: "#4180c5" }
                        : { backgroundColor: "#333333" }
                    }
                    onClick={
                      !signUp ? handleFirebaseAuth : handleFirebaseAuthSignUp
                    }
                  />
                  <input
                    type="submit"
                    value={
                      !signUp
                        ? "Sign in with Facebook"
                        : "Sign up with Facebook"
                    }
                    name="facebook"
                    style={
                      !signUp
                        ? { backgroundColor: "#4180c5" }
                        : { backgroundColor: "#333333" }
                    }
                    onClick={handleFirebaseAuth}
                  />
                  <input
                    type="submit"
                    value={
                      !signUp ? "Sign in with Google" : "Sign up with Google"
                    }
                    name="google"
                    style={
                      !signUp
                        ? { backgroundColor: "#4180c5" }
                        : { backgroundColor: "#333333" }
                    }
                    onClick={handleFirebaseAuth}
                  />
                </li>
              </>
            </ul>
          </form>
        </div>
      </Modal>
    </>
  );
};

Authenticate.propTypes = {
  signIn: PropTypes.bool,
  isLoading: PropTypes.bool,
};

Authenticate.defaultProps = {
  signIn: false,
  isLoading: false,
};

export default Authenticate;
