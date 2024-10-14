import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    organization: process.env.EXPO_PUBLIC_OPENAI_ORGANIZATION_ID,
    project: process.env.EXPO_PUBLIC_OPENAI_PROJECT_ID,
});

export default openai;