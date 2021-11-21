import styles from './styles.module.scss'

import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'

import { useState } from 'react'

export function SignInButton(){

    const isUserLoggedIn = useState(true)

     return isUserLoggedIn ? (
        <button className={styles.signInButton}>
            <FaGithub color="#04d301"/>
            UserName XYZ
            <FiX color={"#737380"} className={styles.closeIcon}/>
        </button>
     ) :

     (
        <button className={styles.signInButton}>
            <FaGithub color="#eba417"/>
            Sign In With Github
        </button>
     )
}