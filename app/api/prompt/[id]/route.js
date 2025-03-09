import connectDatabase from "utils/database";
import Prompt from "models/prompt.ts";


export const GET = async (req, {params}) => {
    try {


        await connectDatabase();

        const prompts = await Prompt.findById(params.id).populate("creator");


        if(!prompts) {
            return new Response("Promp tabylmady", {status: 404});
        }

        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (e) {
        console.error(e);
        return new Response(
            JSON.stringify({error: `Qap, Prompt Fetch bolmady. ${e.message}`}),
            {status: 500}
        );
    }
};


export const PATCH = async (req, {params}) => {

    const {prompt, tag} = await req.json();


    try {

        await connectDatabase();

        const existingPrompt = await Prompt.findById(params.id);


        if(!existingPrompt) {
            return new Response("Promp tabylmady", {status: 404});
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();


        return new Response(JSON.stringify(existingPrompt), {status: 200});
    } catch (e) {
        console.error(e);
        return new Response(
            JSON.stringify({error: `Qap, Patch Prompt Fetch bolmady. ${e.message}`}),
            {status: 500}
        );
    }
};


export const DELETE = async (req, {params}) => {


    try {

        await connectDatabase();

        await Prompt.findByIdAndDelete(params.id);

        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (e) {
        console.error(e);
        return new Response(
            JSON.stringify({error: `Qap, Delete Prompt Fetch bolmady. ${e.message}`}),
            {status: 500}
        );
    }
};