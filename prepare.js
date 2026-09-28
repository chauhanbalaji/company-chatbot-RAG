import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import { OpenAIEmbeddings } from "@langchain/openai";

import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

import 'dotenv/config';



const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small"
});

const pinecone = new PineconeClient();

const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX_NAME);

const vectorStore = await PineconeStore.fromExistingIndex(
  embeddings,
  {
    pineconeIndex,
    // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
    maxConcurrency: 5,
    // You can pass a namespace here too
    // namespace: "foo",
  }
);

 




export async function indexTheDocuments(filePath) {
    const loader = new PDFLoader(filePath);
    const doc = await loader.load();


       const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 100,
});

const texts = await textSplitter.splitText(doc[0].pageContent);
      
  const documents = texts.map((chunk) => {
    return {
      pageContent: chunk,
      metadata: doc[0].metadata
    }
  })
await vectorStore.addDocuments(documents);
// console.log(documents);

}
export { vectorStore };
