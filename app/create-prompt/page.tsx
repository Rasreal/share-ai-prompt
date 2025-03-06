'use client'
import React, {useActionState, useState} from "react";

import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

import {PromptForm} from "@components/NewForm";

export default function CreatePrompt() {

    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const createPrompt = async (e:any) => {

        setSubmitting(true);

        try{

            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userID: session!.user!.id,
                    tag: post.tag,
                })
            });

            if(response.ok){
                router.push('/')
            }

        } catch (e) {
            console.log(e);
        } finally {
            setSubmitting(false);
        }

    }


    return (
        <div>
            <PromptForm handleSubmit={createPrompt} post={post} setPost={setPost} submitting={submitting} type={"Пост Жазу"}/>
        </div>
    )


}
