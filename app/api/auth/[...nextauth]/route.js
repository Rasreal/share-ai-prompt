import GoogleProvider from 'next-auth/providers/google'
import User from "../../../../models/user";
import NextAuth from "next-auth";
import {connectDatabase} from "../../../../utils/database";


// console.log({clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,})

const handler = NextAuth({
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })],
    callbacks: {
        async session({session}) {
            // store the user id from MongoDB to session
            const sessionUser = await User.findOne({email: session.user.email});
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({profile}) {
            try {
                await connectDatabase();
                //user exists
                const userExists = await User.findOne({
                    email: profile.email,
                })

                if(userExists) {
                    // Update the user's image if it's missing or outdated
                    if(!userExists.image || userExists.image !== profile.picture) {
                        await User.updateOne(
                            {email: profile.email},
                            {$set: {image: profile.picture}}
                        );
                    }
                }

                //user doesn't exist
                if(!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    })
                }
                return true;
            } catch
                (e) {
                console.error(e)
                return false;
            }
        }
    }

})


export {handler as GET, handler as POST, handler as PUT, handler as PATCH};