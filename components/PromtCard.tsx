"use client"
import {Post} from "@components/Feed";
import Image from "next/image";
import {useState} from "react";


interface PromptCardProps {
    post: Post;
    handleTagClick: (tag: string) => void;
    handleEdit: () => void;
    handleDelete: () => void;
}

export default function PromptCard({post, handleTagClick, handleEdit, handleDelete}: PromptCardProps) {
    // @ts-ignore

    const [copied, setCopied] = useState<string>('');

    const handleCopy = (prompt: string) => {
        setCopied(prompt);
        navigator.clipboard.writeText(prompt);
        //this prompt will be copied and save into clipvoard for 10 seconds
        setTimeout(() => {
            setCopied("")
        }, 10000);
    }


    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Image
                        src={post.creator.image}

                        alt="user_image" width={40}
                        height={40} className="rounded-full object-cover"/>

                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">
                            {post.creator.username}
                        </h3>
                        <p className="text-gray-500 font-inter text-sm">
                            {post.creator.email}
                        </p>
                    </div>


                </div>

                <div className="copy_btn" onClick={() => handleCopy(post.prompt)}>
                    <Image src={copied === post.prompt ?
                        '/assets/icons/tick.svg' : '/assets/icons/copy.svg'
                    } width={12} height={12} alt="copied"/>
                </div>


            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700">
                {post.prompt}
            </p>
            <p className="font-inter text-sm blue_gradient cursor-pointer"
               onClick={() => handleTagClick && handleTagClick(post.tag)}>
                {post.tag}
            </p>
        </div>
    )
}