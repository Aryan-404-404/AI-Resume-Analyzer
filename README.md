# 🚀 AI Resume Analyzer

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-F55036?style=for-the-badge&logo=groq&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A smart, AI-powered career tool that helps developers optimize their resumes for Applicant Tracking Systems (ATS).**

## 🚀 Live Preview Link
https://ai-resume-analyzer-pi-ruby.vercel.app/


This application uses the **Groq Llama 3.3 70B** model to perform a deep-dive analysis of your resume against specific job descriptions. It provides a detailed match score, identifies missing technical keywords, and offers actionable feedback to help you land more interviews.

---

## ✨ Key Features

* **📄 Smart PDF Analysis:** Automatically parses and extracts text from uploaded PDF resumes.
* **🔍 Job Description Matching:** Compares your skills directly against the target JD to calculate a relevance score.
* **📥 Download Reports:** Export your detailed analysis and missing keyword list (PDF/Text) for offline reference.
* **📊 ATS Score Calculation:** Detailed breakdown of why your resume passes or fails specific ATS filters.
* **💡 Intelligent Feedback:** Provides "Quick Fixes" and long-term improvements based on the identified gaps.
* **⚡ Lightning-Fast Processing:** Powered by Groq's LPU™ architecture for instant AI responses (1000+ requests/day free tier).

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite)
* **Styling:** Tailwind CSS
* **AI Engine:** Groq API (`llama-3.3-70b-versatile`)
* **PDF Engine:** `pdfjs-dist` (Client-side PDF parsing)
* **State Management:** React Hooks
* **Build Tool:** Vite

---

## 🧠 Challenges & Learnings

Building this wasn't just about calling an API. The biggest technical hurdle was **Client-Side PDF Parsing**.

* **The Problem:** Integrating `pdfjs-dist` with Vite requires complex worker configuration to avoid "Global is not defined" errors and ensure text is extracted correctly from binary PDF data.
* **The Solution:** Implemented a custom worker handler to parse PDFs directly in the browser without needing a heavy backend server, ensuring user privacy and speed.
* **The Outcome:** A zero-latency parsing engine that handles complex resume layouts instantly.

### Why Groq?

Initially built with Google Gemini, but switched to **Groq** for:
* **50x Better Rate Limits:** 1,000 requests/day vs Gemini's 20
* **10x Faster Responses:** Sub-second inference thanks to LPU architecture
* **Better JSON Handling:** Llama 3.3 70B excels at structured output
* **No Surprise Changes:** Reliable, consistent API limits

---

## 💻 Installation & Setup

Follow these steps to run the analyzer locally:

### 1. Clone the Repository
```bash
git clone https://github.com/aryan-404-404/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Get Your Groq API Key
1. Visit [console.groq.com](https://console.groq.com/)
2. Sign up for free (no credit card required)
3. Navigate to **API Keys** → Create new key
4. Copy your API key

### 4. Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### 5. Run the Development Server
```bash
npm run dev
```

---

## 🚀 Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variable: `VITE_GROQ_API_KEY`
4. Deploy!

---

## 📈 Performance

* **Response Time:** < 2 seconds average
* **Free Tier Limits:** 1,000 requests/day
* **PDF Processing:** Client-side (instant)
* **No Backend Required:** 100% frontend application

---


## 🙏 Acknowledgments

* **Groq** for providing blazing-fast AI inference
* **Meta** for the Llama 3.3 70B model
* **Mozilla** for pdfjs-dist

---

**Built with ❤️ by Aryan**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aryan-599443271/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aryan-404-404)
