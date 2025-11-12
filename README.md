# Textual.io – Smart Learning Assistant

Textual.io is a full-stack AI-powered learning assistant that allows users to upload PDFs, chat with document content, and manage uploaded files.
It also features user authentication (JWT) and an admin panel for user and content management.

## Project Presentation

[![View Presentation](https://img.shields.io/badge/View_PPT-Canva-blue?style=for-the-badge&logo=canva)](https://www.canva.com/design/DAG2CufMg7U/HQUiDjFQJJAqaUx-DfIhWA/edit?utm_content=DAG2CufMg7U&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

### Features
## User Features 

* User Authentication (JWT) – Register, login, and logout securely.

* Upload PDF Notes – Upload and extract text content from PDFs.

* Chat with PDF – Ask questions about uploaded documents using AI (OpenRouter or local LLMs).

* Manage PDFs (CRUD) –

* Add / upload PDFs

* Rename PDFs

* Delete PDFs

* Persistent Storage – Uploaded files and metadata are stored in MongoDB & local uploads/ directory.

* Responsive UI – Built with React and Bootstrap for a smooth experience.

## Admin Features

* Admin Authentication

* Admins have elevated privileges managed through the same JWT system.

* Admin Dashboard

* View all registered users

* Manage uploaded PDFs (view, rename, delete)

* Monitor application activity and usage logs

## Tech Stack
Layer	Technology
* Frontend:	React.js, Bootstrap
* Backend:	Node.js, Express.js
* Database:	MongoDB Atlas
* Authentication:	JWT (JSON Web Token)
* File Handling:	Multer
* PDF Parsing:	pdf-parse / pdfjs-dist
* AI API:	OpenRouter API (LLMs like Llama / DeepSeek)
* Version Control:	Git & GitHub

  
## Project Structure
<img width="289" height="740" alt="image" src="https://github.com/user-attachments/assets/95222cd4-ebc0-491b-83ed-c6d21c1855c4" />

🔑 Environment Variables

Create a .env file inside backend/ and add:

* PORT=5000
* MONGO_URI=your_mongodb_connection_string
* JWT_SECRET=your_secret_key
* OPENROUTER_API_KEY=your_openrouter_key
* MODEL_NAME=meta-llama/llama-3.1-70b-instruct

## Result

<img width="1360" height="882" alt="Screenshot 2025-11-10 200234" src="https://github.com/user-attachments/assets/2c086399-caeb-458f-abe6-5a8084788c99" />
