# Company Chatbot

A retrieval-augmented generation (RAG) chatbot that answers questions using information from internal company documents. The project loads a PDF, splits it into smaller text chunks, creates OpenAI embeddings, stores those embeddings in Pinecone, and uses Groq's Llama model to generate answers from the most relevant chunks.

## Features

- PDF document ingestion with LangChain
- Recursive text chunking with overlap
- OpenAI `text-embedding-3-small` embeddings
- Pinecone vector storage and similarity search
- Groq Llama-powered question answering
- Interactive command-line chat interface

## How It Works

1. `rag.js` loads `cg-internal-docs.pdf` and starts the indexing process.
2. `prepare.js` splits the document into chunks of 500 characters with 100 characters of overlap.
3. The chunks are embedded and stored in an existing Pinecone index.
4. `chat.js` searches Pinecone for the three most relevant chunks for each question.
5. The retrieved context is sent to the Groq chat model to generate an answer.

## Prerequisites

- Node.js 18 or later
- An OpenAI API key for embeddings
- A Groq API key for chat completions
- A Pinecone account and an existing index
- The Pinecone index must support the `text-embedding-3-small` embedding dimension

## Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/<your-username>/company-chatbot.git
cd company-chatbot
npm install
```

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=your_openai_api_key
Groq_API_KEY=your_groq_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_pinecone_index_name
```

Never commit `.env` or API keys to GitHub. Add `.env` to `.gitignore` before pushing the project.

## Index the Company Document

Place the source PDF at `cg-internal-docs.pdf`, then run:

```bash
node rag.js
```

Run this again whenever the source document changes. The script adds the document chunks to the configured Pinecone index.

## Start the Chatbot

After the document has been indexed, start the interactive chatbot:

```bash
node chat.js
```

Type a question at the `You:` prompt. Enter `/bye` to exit.

## Project Structure

```text
company-chatbot/
├── cg-internal-docs.pdf   # Source company document
├── chat.js                # Interactive RAG chat client
├── implement.md           # Implementation notes
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Locked dependency versions
├── prepare.js             # PDF indexing entry point
└── rag.js                 # RAG document preparation and vector search setup
```

## Technology Stack

- JavaScript (Node.js, ES modules)
- LangChain
- OpenAI Embeddings
- Pinecone
- Groq SDK
- Llama 3 70B
- `pdf-parse` and LangChain PDF loaders

## GitHub Deployment

This version is a command-line application, so GitHub stores and versions the source code but does not host the chatbot as a web application.

To publish the repository:

```bash
git init
git add .
git commit -m "Initial company chatbot"
git branch -M main
git remote add origin https://github.com/<your-username>/company-chatbot.git
git push -u origin main
```

For production hosting, the CLI interaction should first be exposed through an HTTP API or web interface. API keys should then be configured as secrets in the selected hosting platform, and the PDF and Pinecone index should be managed as deployment resources.

## Security Notes

- Keep `.env` out of version control.
- Do not include private company documents in a public repository unless they are approved for publication.
- Restrict Pinecone and model-provider keys to the minimum permissions required.

## Current Limitations

- The application currently runs only in the terminal.
- No automated tests or CI workflow are included yet.
- Pinecone must be configured before indexing or chatting.
- The PDF path is currently fixed to `./cg-internal-docs.pdf`.
