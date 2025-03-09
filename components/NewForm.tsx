"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {useEffect, useRef} from "react";

const FormSchema = z.object({
    prompt: z.string().min(2, { message: "Prompt кем дегенде 2 таңбадан тұру қаже" }),
    tag: z.string().min(1, { message: "Tag жазу керек" }),
});

interface Post {
    tag: string;
    prompt: string;
}

interface PromptFormProps {
    type: string;
    post: Post;
    setPost: (post: Post) => void;
    submitting: boolean;
    handleSubmit?: (data: z.infer<typeof FormSchema>) => void;
}

export function PromptForm({ type = "Create", post, setPost, submitting = false, handleSubmit }: PromptFormProps) {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: post?.prompt || "",
            tag: post?.tag || "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        form.reset(post)
    }, [post, form]);


    // Refs to prevent unnecessary state updates
    const promptRef = useRef<HTMLTextAreaElement>(null);
    const tagRef = useRef<HTMLInputElement>(null);




    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (promptRef.current && tagRef.current) {
            setPost({
                prompt: promptRef.current.value,
                tag: tagRef.current.value,
            });

            console.log("111111:", post);
        }
        console.log(data);
        if (handleSubmit) {
            handleSubmit(data);
        }
    }

    const handleCancel = () => {
        form.reset();
    };

    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{type}</span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-2 flex font-satoshi font-semibold text-2xl">Сіздің AI промптыңыз</FormLabel>
                                <FormControl>
                                    <textarea
                                        {...field}
                                        ref={(el) => {
                                            promptRef.current = el!;
                                            field.ref(el);
                                        }}
                                        placeholder="Промпты еңгізіңіз..."
                                        required
                                        className="form_textarea"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-600 text-lg" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tag"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-2 flex font-satoshi font-semibold text-2xl">
                                    Тег {''} <span className="font-normal">(#продукт, #көлік, #үй, #деңсаулық)</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        ref={(el) => {
                                            tagRef.current = el!;
                                            field.ref(el);
                                        }}
                                        type="text"
                                        placeholder="Тегті еңгізіңіз"
                                        className="rounded-xl h-11"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-600 text-lg" />
                            </FormItem>
                        )}
                    />

                    {/* Buttons */}
                    <div className="flex-end space-x-4 mt-4 ">
                        <Button type="button" variant="outline_red" size="lg" className="w-[120px]" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" size="lg" variant="outline_blue" className="w-[120px]" disabled={submitting}>
                            {submitting ? "Жазылып жатыр..." : "Өткізу"}
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    );
}
