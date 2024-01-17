import { useContext, createContext, useState, useEffect } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import Firebase_app from '../firebase/config';

const AuthContext = createContext();
const provider = new GoogleAuthProvider();
const auth = getAuth(Firebase_app);

export const AuthContextProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const logIn = async () => {
    try{
      await signInWithPopup(auth, provider);
    }catch(error){
      setError({
        code: error.code,
        message: error.message
      })
    }
  }

  const logOut = () => {
    signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
  }, []);
  
  return (
    <AuthContext.Provider value={{user, logIn, logOut, error}}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext);
}