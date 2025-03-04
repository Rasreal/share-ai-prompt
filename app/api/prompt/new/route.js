import connectDatabase from "../../../../utils/database";
import Prompt from "../../../../models/prompt.ts";

export const POST = async (req) => {
    const {userID, prompt, tag} = await req.json();

    try{
        await connectDatabase();

        const newPrompt = new Prompt({
            creator: userID,
            prompt: prompt,
            tag: tag,
        });


        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), {status: 201});
    } catch (e) {
        console.log(e);

        return new Response(JSON.stringify(`Qat, Prompt Zhazylmady + ${e}`), {status: 500});
    }
}