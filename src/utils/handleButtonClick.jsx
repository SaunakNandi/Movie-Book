import { validateUserCredentials } from "./validation";
import { handleLoginPopUp } from "../store/reducers/userSlice";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// const handleLoginPopUp=React.lazy(()=> import("../store/reducers/userSlice"))

export const handleButtonClick = ({
  auth,
  name,
  email,
  password,
  showSignUp,
  setshowErrorMessage,
  dispatch,
}) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 2);

  const result = validateUserCredentials(
    email.current.value,
    password.current.value
  );
  if (result) {
    email.current.value = "";
    password.current.value = "";
    setshowErrorMessage(true);
    return;
  }
  if (showSignUp) {
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        user.getIdToken().then((token) => {
          // Cookies.set('authToken', token, { expires: 1, secure: true });
          document.cookie = `authToken=${token}; expires=${expirationDate.toUTCString()}; path='/'; Secure;`;
        });
        updateProfile(user, {
          displayName: name.current.value,
        })
          .then(() => {
            // console.log("Reached here")
            dispatch(handleLoginPopUp(false));
          })
          .catch((error) => {
            console.log(error);
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setshowErrorMessage(true);
        console.log(errorCode);
        // ..
      });
  } else {
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.getIdToken().then((token) => {
          // document.cookie=`authToken=${token}; expires=${expirationDate.toUTCString()}; path='/'`
          document.cookie = `authToken=${token}; expires=${expirationDate.toUTCString()}; path=/; Secure;`;
          dispatch(handleLoginPopUp(false));
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setshowErrorMessage(true);
        email.current.value = "";
        password.current.value = "";
        console.log(errorCode);
        console.log(errorMessage);
      });
  }
};

export const GoogleLogin = ({ auth, dispatch }) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      document.cookie = `authToken=${token}; expires=${expirationDate.toUTCString()}; path='/'; Secure;`;
      dispatch(handleLoginPopUp(false));
      // const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorMessage);
      // ...
    });
};
