// import { vectorStore } from '@langchain/core/vectorstores';
import { vectorStore } from "./prepare.js";

import 'dotenv/config';
import  Groq from 'groq-sdk';
import readline from 'node:readline/promises';

const groq = new Groq({ apiKey: process.env.Groq_API_KEY });

console.log("OpenAI key loaded:", process.env.OPENAI_API_KEY ? "✅ Yes" : "❌ No");
console.log("Loaded key:", process.env.OPENROUTER_API_KEY);
export  async function chat() {
    
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout});   

    while (true) {
        const question =  await rl.question("You: ");

        if (question === '/bye') {
            break;
        }

        // retrival step

        const revelantChunks = await vectorStore.similaritySearch(question, 3);
        const context =  revelantChunks.map((chunk) => chunk.pageContent).join('\n\n');
        
        const SYSTEM_PROMPT = `You are a helpful AI assistant. Use the following context to answer the question.`;

        
        
        
        
        const usserQuery  = `Question: ${question}
        Relebvant context: ${context}
        \n\nAnswer: `;
        const completion = await groq.chat.completions.create({ message: [
            
            
            {
                role: 'syetem',
                content: ' SYSTEM_PROMPT '
            },
            {
                role: 'user',
                content: 'Exaplain the importance of fast language models'
            },
        ],
        model: 'llama-3-70b-versatile',
    });
        console.log(`Assiistant: ${completion.choices[0].message.content}` );
           
} 

rl.close();
}

    chat(); 