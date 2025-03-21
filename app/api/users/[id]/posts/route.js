import {connectDatabase} from "utils/database";
import Prompt from "models/prompt.ts";


export const GET = async (req, {params}) => {
    try {


        await connectDatabase();

        const prompts = await Prompt.find({
            creator: params.id,
        }).populate("creator");


        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response(
            JSON.stringify({ error: `Qap, User Prompttary Fetch bolmady. ${e.message}` }),
            { status: 500 }
        );
    }
};
