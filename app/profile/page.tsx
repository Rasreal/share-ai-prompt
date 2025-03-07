"use client"

import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {Post} from "@components/Feed";

import Profile from "@components/Profile"

export default function MyProfile() {
    const {data: session} = useSession();

    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch(`api/users/${session?.user.id}/posts`);
            const data = await response.json();

            if (response.ok) {
                setPosts(data);
            } else {
                alert("Посттар фетч жасамай жатыр");
            }
        };

        if(session?.user.id) {
            fetchPrompts();
        }


    }, []);

    const handleEdit = () => {

    }
    const handleDelete = () => {

    }

    return (
        <Profile
            name="Menin"
            myProfile={true}
            desc={"Qosh Keldin"}
            data={posts}
            handleEdit={() => {
            }}
            handleDelete={() => {
            }}

        />
    )
}

