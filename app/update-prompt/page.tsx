'use client'
import React, {useActionState, useEffect, useState} from "react";

import {useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";

import {PromptForm} from "@components/NewForm";
import {toast} from "sonner";

export default function UpdatePrompt() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });


    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const res = await response.json();

            setPost({
                prompt: res.prompt,
                tag: res.tag,
            });
        }

        if(promptId) {
            getPromptDetails();
        }

    }, [promptId])

    const updatePrompt = async (data: any) => {
        const {prompt, tag} = data;
        setSubmitting(true);

        if(!promptId){
            toast.error("Prompt not found :(");
            alert("Prompt ID Табылмады :(")
        }

        try{

            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: prompt,
                    tag: tag,
                })
            });

            if(response.ok){
                toast.success("Prompt successfully updated");
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
            <PromptForm handleSubmit={updatePrompt} post={post} setPost={setPost} submitting={submitting} type={"Пост Өзгерту"}/>
        </div>
    )


}
