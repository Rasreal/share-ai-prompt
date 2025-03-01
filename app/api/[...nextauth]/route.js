import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import {connectDatabase} from "utils/database";
import User from 'models/user';


// console.log({clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,})

const handler = NextAuth({
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })],
    async session({session}) {
        const sessionUser = await User.findOne({
            where: {
                email: session.user.email,
            }
        })

        session.user.id = sessionUser._id.toString();


    },
    async signIn({profile}) {
        try {
            await connectDatabase();
            //user exists
            const userExists = await User.findOne({
                email: profile.email,
            })
            //user doesn't exist
            if(!userExists){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.image,

                })
            }
            return true;
        } catch (e) {
            console.error(e)
            return false;
        }
    }
})


export {handler as GET, handler as POST, handler as PUT, handler as PATCH};