export async function loadPrompt(filePath) {
    const res = await fetch(
        `/api/prompts/${filePath}`
    );
    if (!res.ok) {
        throw new Error(`Received unexpected status ${res.status} when loading prompt. ${await res.text()}`);
    }
    return await res.json();
}