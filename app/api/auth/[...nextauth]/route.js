import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import User from '@models/user';
import { connectDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientSecret: process.env.GOOGLE_AUTH_SECRET,
            clientId: process.env.GOOGLE_AUTH_ID
        })
    ],
    callbacks: {
        async signIn({profile}) {
            await connectDB();
            try{
                if(! await User.findOne({email: profile.email})) {
                    // await User.create({
                    //     name: profile.name,
                    //     email: profile.email,
                    //     image: profile.picture
                    // })
                    return false
                } else{
                    return true
                }
                

            } catch(err) {
                console.log(err)
                return false
            }
        },
        async session({session}) {
            const user = await User.findOne({email: session.user.email});
            session.user.id = user._id;
            return session
        }
    }
})

export {handler as GET, handler as POST};