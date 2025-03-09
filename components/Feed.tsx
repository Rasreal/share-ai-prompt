'use client'

import {useEffect, useState, ChangeEvent, Dispatch} from "react";
import PromptCard from "@components/PromtCard";

export interface Post {
    _id?: any;
    tag: string;
    prompt: string;
    creator?: any;
    createdAt?: string;
}

interface PromptCardListProps {
    data: Post[];
    handleTagClick?: any;
}

const PromptCardList: React.FC<PromptCardListProps> = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post: Post, index: number) => (
                <PromptCard
                    key={index}
                    post={post}
                    handleTagClick={handleTagClick}
                    handleEdit={()=>{}}
                    handleDelete={()=>{}}/>
            ))}
        </div>
    );
};

export default function Feed() {
    const [searchText, setSearchText] = useState<string>('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchResults, setSearchResults] = useState<Post[]>([]);
    const [searchTimeout, setSearchTimeout] = useState<any>(null);


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

    const filterSearch = (searchText: any) => {
        const regEx = new RegExp(searchText, "i");
        return posts.filter((p) =>
            regEx.test(p.creator.username) ||
            regEx.test(p.tag) ||
            regEx.test(p.prompt)
        );
    }

    const handleTagClick = (tagName: string) => {
        setSearchText(tagName);

        const searchResult = filterSearch(tagName);
        setSearchResults(searchResult);
    };


    const handleSearchChange = (e: any) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterSearch(e.target.value);
                setSearchResults(searchResult);
            }, 500)
        );

    }

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

            {searchResults.length > 0 ? <PromptCardList data={searchResults} handleTagClick= {handleTagClick} /> :
                <PromptCardList data={posts} handleTagClick= {handleTagClick} />}

        </section>
    );
}
