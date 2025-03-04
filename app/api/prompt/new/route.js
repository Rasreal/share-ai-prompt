import connectDatabase from "../../../../utils/database";
import Prompt from "../../../../models/prompt.ts";
import moment from "moment";
import "moment/locale/ru"; // Import Russian locale

export const POST = async (req) => {  // Removed ': Request'
    try {
        // Parse request body
        const { userID, prompt, tag } = await req.json();

        // Connect to database
        await connectDatabase();

        // Create a new prompt with Russian locale datetime
        const newPrompt = new Prompt({
            creator: userID,
            prompt: prompt,
            tag: tag,
            createdAt: moment().locale("ru").format("LLLL"), // Store formatted Russian date
        });

        // Save to database
        await newPrompt.save();

        // Return success response
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (e) {
        console.error(e);
        return new Response(
            JSON.stringify({ error: `Qat, Prompt Zhazylmady. ${e.message}` }),
            { status: 500 }
        );
    }
};
