"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "sonner"
import { Button } from "@components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
    prompt: z.string().min(2, {
        message: "Prompt must be at least 2 characters.",
    }),
    tag: z.string().min(1, {
        message: "Tag is required.",
    }),
})


interface Post{
    tag: string,
    prompt: string,
}
interface PromptFormProps {
    type: string
    post: Post
    setPost: any
    submitting: boolean
    handleSubmit: (data: z.infer<typeof FormSchema>) => void
}

export function PromptForm({
                               type = "Create",
                               post,
                               setPost,
                               submitting = false,
                               handleSubmit: externalHandleSubmit,
                           }: PromptFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: "",
            tag: "",
        },
    })


    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        toast("Промпт сақталып жатыр", {
            description: new Date().toLocaleString("ru-RU"), // Russian date format
            action: {
                label: "ОК",
                onClick: () => console.log("ОК"),
            },
        })
        externalHandleSubmit(data)
    }

    const handleCancel = () => {
        // You could call setPost("") or reset the form, whichever suits your use-case.
        form.reset()
    }

    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{type} Post</span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="mb-2 flex font-satoshi font-semibold text-2xl">Сіздің AI
                                    промптыңыз</FormLabel>
                                <FormControl>
                                    <textarea
                                        value={post?.prompt || ""}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setPost({...post, prompt: e.target.value})
                                        }}
                                        placeholder="Промпты еңгізіңіз..."
                                        required
                                        className="form_textarea"
                                    />

                                </FormControl>
                                <FormMessage className="text-red-600 text-lg"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tag"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="mb-2 flex font-satoshi font-semibold text-2xl">Тег {''}
                                    <span className="font-normal">(#продукт, #көлік, #үй, #деңсаулық)</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        value={post?.tag || ""}
                                        type="text"
                                        placeholder="Тегті еңгізіңіз"
                                        className="rounded-xl h-11"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setPost({...post, tag: e.target.value})
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-600 text-lg"/>
                            </FormItem>
                        )}
                    />


                    {/*Buttons*/}

                    <div className="flex-end space-x-4 mt-4 ">
                        <Button type="button" variant="outline_red" size="lg" className = "w-[120px]" onClick={handleCancel} >
                            Cancel
                        </Button>
                        <Button type="button" size="lg" variant="outline_blue" className="w-[120px]" disabled={submitting} onClick={form.handleSubmit(onSubmit)}>
                            {submitting ? "Жазылып жатыр..." : "Өткізу"}
                        </Button>
                    </div>
                </form>
            </Form>

        </section>
    )
}