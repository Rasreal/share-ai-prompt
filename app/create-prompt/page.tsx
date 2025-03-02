'use client'
import React, {useState} from "react";

import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

import {PromptForm} from "@components/NewForm";

export default function CreatePrompt() {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    return (
        <div>
            <PromptForm handleSubmit={()=>{}} post={post} setPost={() => {}} submitting={false} type={"Пост Жазу"}/>
        </div>
    )


}
