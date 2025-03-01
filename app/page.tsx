'use client'

import {Button} from "@/components/ui/button";
import {useForm} from "@node_modules/react-hook-form";
import React from "react";
import {Input} from "@components/ui/input";
import {InputForm} from "@components/NewForm";
import Feed from "@components/Feed";


export default function Home() {

    const form = useForm()


    return (
        <section className="w-full flex-center flex-col">
            <h1 className="text-4xl font-bold text-center">
                Bolis & Koris AI promttary
                <br className="max-md:hidden"/>
                <span className="orange_gradient text-center">AI Powered</span>
            </h1>
            <p className="desc text-center">BirBale BirBale Tema project anay mynau</p>

            {/*<InputForm/>*/}

            <Feed/>


        </section>
    );
}
