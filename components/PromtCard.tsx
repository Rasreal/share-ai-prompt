"use client"
import {Post} from "@components/Feed";
import Image from "next/image";
import {Dispatch, useState} from "react";
import {toast} from "sonner";
import {useSession} from "next-auth/react";
import {usePathname} from "@node_modules/next/dist/client/components/navigation";
import {useRouter} from "next/navigation";
import moment from "moment";


interface PromptCardProps {
    post: Post;
    handleTagClick?: Dispatch<React.SetStateAction<string>>;
    handleEdit: () => void;
    handleDelete: () => void;
}

export default function PromptCard({post, handleTagClick, handleEdit, handleDelete}: PromptCardProps) {
    // @ts-ignore
    const {data: session} = useSession();
    const pathName = usePathname();
    const router = useRouter();

    const [copied, setCopied] = useState<string>('');

    const handleCopy = (prompt: string) => {

        setCopied(prompt);
        navigator.clipboard.writeText(prompt);


        toast.success("Copied!");

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
                        <div className="flex-row mb-1 gap-2">
                            <h3 className="font-satoshi font-semibold text-gray-900">
                                {post.creator.username}
                            </h3>
                            <h3 className="text-gray-500 text-sm">
                                {post?.createdAt || ""}
                            </h3>
                        </div>

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
                #{post.tag}
            </p>

            {session?.user?.id === post.creator._id && pathName === '/profile' &&

                <div className="mt-5 flex-center gap-4 border-t border-gray-200 pt-3">
                    <p
                        className="font-inter text-[16px] green_gradient cursor-pointer font-semibold relative after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:after:left-0"
                        onClick={handleEdit}
                    >
                        Өзгерту
                    </p>

                    <p
                        className="font-inter text-[16px] font-semibold orange_gradient cursor-pointer relative after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:after:left-0"
                        onClick={handleDelete}
                    >
                        Жою
                    </p>
                </div>
            }
        </div>
    )
}