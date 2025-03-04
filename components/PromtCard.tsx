"use client"
import {Post} from "@components/Feed";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";


interface PromptCardProps {
    post: Post;
    handleTagClick: () => void;
    handleEdit: () => void;
    handleDelete: () => void;
}

export default function PromptCard({post, handleTagClick, handleEdit, handleDelete}: PromptCardProps) {
    // @ts-ignore

    console.log(post);
    console.log(post.creator.username);
    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-52">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Image
                        src={post.creator.image}

                        alt="user_image" width={40}
                        height={40} className="rounded-full object-cover"/>
                </div>
            </div>

        </div>
    )
}