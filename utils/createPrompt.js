async function createPromptAction(prevState, formData) {
    try {
        const response = await fetch("/api/prompt/new", {
            method: "POST",
            body: JSON.stringify({
                prompt: formData.get("prompt"),
                userID: formData.get("userID"),
                tag: formData.get("tag"),
            }),
        });

        if (!response.ok) throw new Error("Failed to create prompt");

        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
}


export default createPromptAction;