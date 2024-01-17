'use client'

import Image from 'next/image';
import LoginImage from '/public/images/login.jpg'
import { UserAuth } from "../context/AuthContext";
import styles from './login.module.css'

const LoginPage = () => {

  const {logIn, error} = UserAuth();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome</h1>
      <p>Please sign in to continue</p>
      <Image src={LoginImage} alt='login' width={300}/>
      <button className={`btn ${styles.loginBtn}`} onClick={logIn}>Sign In</button>
      {error && (
        <p>{error.code}: {error.message}</p>
      )}
    </div>
  )
}
export default LoginPage;