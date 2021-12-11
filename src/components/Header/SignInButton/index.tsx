import styles from './styles.module.scss'

import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'

import { useState } from 'react'
import {signIn, signOut, useSession} from 'next-auth/client'

export function SignInButton(){

    const [session] = useSession()
    
    // Changes button state based on user login
    return session ? (
    <button 
    onClick={() => signOut()}
    className={styles.signInButton}>
        <FaGithub color="#04d301"/>
        {session.user.name}
        <FiX color={"#737380"} className={styles.closeIcon}/>
    </button>
    ) :

    (
    <button 
    onClick={() => signIn('github')}
    className={styles.signInButton}>
        <FaGithub color="#eba417"/>
        Sign In With Github
    </button>
    )
}