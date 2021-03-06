import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {fauna} from '../../../services/fauna'
import { query as q } from 'faunadb'

export default NextAuth({
    providers:[
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_SECRET,
            scope: 'read:user'
        })
    ],
    
    callbacks:{
        async session(session){
            try{
                const userActiveSubscription = await fauna.query(
                    q.Get(
                        q.Intersection(
                            q.Match(
                                q.Index('subscription_by_user_ref'),
                                q.Select('ref', 
                                    q.Get(
                                        q.Match(
                                            q.Index('user_by_email'), q.Casefold(session.user.email)
                                        )
                                    )
                                )
                            ),
                            q.Match(
                                q.Index('subscription_by_status'),
                                "active"
                            )
                        )
                    )
                )

                return {
                    ...session,
                    activeSubscription: userActiveSubscription
                } 
            } catch(err){
                return session
            }

        },
        async signIn(user, account, profile){
            const {email} = user
            try {
                await fauna.query(
                    q.If(
                        // User dooesn't exist
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'), q.Casefold(user.email)
                                )
                            )
                        ),

                        // Create user
                        q.Create(
                            q.Collection('users'), 
                            { data: { email } }
                        ),
                        
                        // Get user
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'), q.Casefold(user.email)
                            )
                        )
                    )
                )
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
})