/**
 * Implementation plan
 * Stage 1: Indexting 
 * 1. load the documents -pdf, text --compleeted
 * 2. Chunk the documents  -- compeleted
 * 3. Generate vectors embeddings --completed 
 * 4. Store the vectors embeddings  - vector databse like pinecone, weaviate, chroma etc
 * 
 * Stage 2 : Using the chatbat 
 * 1. Setup LLm
 * 2. Add Retrival step  
 * 3. parse input + revelant information to LLM
 * 4. Congratulations  
 */


import { indexTheDocuments } from "./prepare.js";

import 'dotenv/config';


const filePath = './cg-internal-docs.pdf'
indexTheDocuments(filePath);    