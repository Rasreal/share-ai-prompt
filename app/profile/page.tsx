"use client"

import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {Post} from "@components/Feed";

import Profile from "@components/Profile"
import {useRouter} from "next/navigation";

export default function MyProfile() {
    const router = useRouter();


    const {data: session} = useSession();

    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch(`api/users/${session?.user?.id}/posts`);
            const data = await response.json();

            if (response.ok) {
                setPosts(data);
            } else {
                alert("Посттар фетч жасамай жатыр");
            }
        };

        if(session?.user?.id) {
            fetchPrompts();
        }


    }, []);

    const handleEdit = (post: Post) => {
        router.push(`/update-prompt?id=${post._id}`);

    }
    const handleDelete = async (post: Post) => {
        const confirmed = confirm("Точно ма ? ");

        if(confirmed) {
            try {
                await fetch(`api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = posts.filter((p) => p._id !== post._id);

                setPosts(filteredPosts);
            } catch (e) {

            }
        }
    }

    return (
        <Profile
            name="Menin"
            myProfile={true}
            desc={"Qosh Keldin"}
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}

        />
    )
}

