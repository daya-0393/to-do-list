'use client'

import Image from 'next/image';
import LoginImage from '/public/images/login.jpg';
import GoogleImg from '/public/images/google.png';
import { UserAuth } from "../context/AuthContext";
import styles from './login.module.scss'

const LoginPage = () => {

  const {logIn, error} = UserAuth();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Day</h1>
      <p>Please sign in to continue</p>
      <Image src={LoginImage} alt='login' width={300}/>
      <button className={`btn ${styles.loginBtn}`} onClick={logIn}>
        <Image src={GoogleImg} alt='google' width={20} height={20}/>
        Sign in with Google
      </button>
      {error && (
        <p>{error.code}: {error.message}</p>
      )}
    </div>
  )
}
export default LoginPage;