import PromptCard from "@components/PromtCard";
import {Post} from "@components/Feed";
import {useLayoutEffect, useRef} from "react";


interface ProfileProps {
    name: string;
    desc: string;
    myProfile?: boolean;
    data: Post[];
    handleEdit: (post: Post) => void;
    handleDelete: (post: Post) => void;
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

            <h1 className="head_text text-left border-l-blue-800">


                <span className="blue_gradient">{myProfile ? "Менің Профилім" : `${name} Профилі`}</span>
            </h1>
            <p className="desc text-left">
                {desc}
            </p>

            <div className="mt-16 prompt_layout">
                {data.map((post: Post, index: number) => (
                    <PromptCard
                        key={index}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}/>
                ))}
            </div>

        </section>
    )
}


// const slowFunction = (num: number) => {
//     console.log("Медленный расчёт...");
//     return num * 2;
// };
//
// const App2 = () => {
//     const [count, setCount] = useState(0);
//     const [input, setInput] = useState(0);
//
//     const computedValue = useMemo(() => slowFunction(input), [input]);
//
//     return (
//         <div>
//             <p>Рассчитанное значение: {slowFunction(input)}</p>
//             <input type="number" onChange={(e) => setInput(Number(e.target.value))} />
//             <button onClick={() => setCount(count + 1)}>+1 ({count})</button>
//         </div>
//     );
// };