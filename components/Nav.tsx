'use client'

import Link from "next/link";
import Image from "next/image";

import {getProviders, signIn, signOut, useSession} from 'next-auth/react';
import {Button} from "@components/ui/button";
import React, {useCallback, useEffect, useState} from "react";



export default function Nav() {


    const {data: session} = useSession();


    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);


    useEffect(() => {
        const setProvidersFunc = async () => {
            const res: any = await getProviders();

            setProviders(res);
        }

        setProvidersFunc();
    },[])


    // @ts-ignore
    return (
        <nav className="flex-between w-full mb-16 pt-3">
            {/*<Parent/>*/}
            <Link href="/" className="flex gap-2 flex-center ">
                <Image className="object-contain"
                       src='/assets/images/logo.svg' width={30} height={30} alt="Logo"/>
                <p className="logo_text">Promptopia</p>
            </Link>


            {/*PC Navigation*/}

            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Пост жазу
                        </Link>

                        <Button variant="outline2" size="lg" onClick={() => signOut()}>
                            Шығу
                        </Button>


                        <Link href="/profile">
                            <Image className="rounded-full mt-1.5"
                                   src= {session?.user.image || '/assets/images/logo.svg'} width={37} height={37} alt="Profile"/>
                        </Link>
                    </div>

                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider: any) => (
                                <Button variant="outlineBlackBtn" key={provider.name}
                                        onClick={() => signIn(provider.id)}>
                                    Кіру
                                </Button>
                            ))}
                    </>
                )}
            </div>

            {/*Mobilka Navigation*/}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                        <div className="flex gap-3 md:gap-5">
                            <Image className="rounded-full"
                                   src={session?.user.image || "assets/images/logo.svg"}
                                   onClick={() => setToggleDropdown((prev) => !prev)}
                                   width={37} height={37} alt="Profile"/>


                            {toggleDropdown && (
                                <div className="flex gap-3 md:gap-5 dropdown">
                                    <Link onClick={() => setToggleDropdown(false)}
                                          className="dropdown_link" href="/profile">Профиль</Link>
                                    <Link onClick={() => setToggleDropdown(false)}
                                          className="dropdown_link" href="/create-prompt">Промпт Жазу</Link>
                                    <Button variant="outlineBlackBtn" className="mt-5 w-full" onClick={() => {
                                        setToggleDropdown(false);
                                        signOut()
                                    }}>Шығу</Button>
                                </div>
                            )}
                        </div>
                    ) :
                    <>
                        {providers &&
                            Object.values(providers).map((provider: any) => (
                                <Button variant="outlineBlackBtn" key={provider.name}
                                        onClick={() => signIn(provider.id)}>
                                    Кіру
                                </Button>
                            ))}
                    </>
                }
            </div>
        </nav>
    )
}