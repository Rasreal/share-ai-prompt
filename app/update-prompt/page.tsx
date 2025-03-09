'use client'
import React, {useActionState, useEffect, useState} from "react";

import {useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";

import {PromptForm} from "@components/NewForm";

export default function UpdatePrompt() {

    const router = useRouter();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const promtId = searchParams.get("id");

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });


    useEffect(() => {


    }, [promtId])

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
