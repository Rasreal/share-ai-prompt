import PromptCard from "@components/PromtCard";
import {Post} from "@components/Feed";
import {useLayoutEffect, useRef} from "react";



interface ProfileProps {
    name: string;
    desc: string;
    myProfile?: boolean;
    data: Post[];
    handleEdit: ()=>void;
    handleDelete: ()=>void;
}
export default function Profile({name, myProfile, desc, data, handleEdit, handleDelete}: ProfileProps) {

    //В будущем добавлю мощную анимацию
    const divRef = useRef<HTMLElement>(null);
    useLayoutEffect(() => {
        if (divRef.current) {
            console.log("Div width:", divRef.current.offsetWidth);
        }
    }, []);


    return (
        <section ref={divRef} className="w-full;">

            <h1 className="head_text text-left border-l-blue-800">{myProfile ? "Менің Профилім" : `${name} Профилі`}</h1>

        </section>
    )
}