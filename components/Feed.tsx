'use client'

import { useEffect, useState, ChangeEvent } from "react";
import PromptCard from "@components/PromtCard";

export interface Post {
    tag: string;
    prompt: string;
}

interface PromptCardListProps {
    data: Post[];
    handleTagClick: (tag: string) => void;
}

const PromptCardList: React.FC<PromptCardListProps> = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16">
            {data.map((post: Post, index: number) => (
                <PromptCard
                    key={index}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

export default function Feed() {
    const [searchText, setSearchText] = useState<string>('');
    const [posts, setPosts] = useState<Post[]>([]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch("api/prompt");
            const data = await response.json();

            if (response.ok) {
                setPosts(data);
            } else {
                alert("Посттар фетч жасамай жатыр");
            }
        };

        fetchPrompts();
    }, []);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    className="search_input bg-amber-300"
                    type="text"
                    placeholder="Поиск"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                />
            </form>
            <PromptCardList data={posts} handleTagClick={(tag) => { console.log(tag) }} />
        </section>
    );
}
