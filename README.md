# 🚀 AI Resume Analyzer

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A smart, AI-powered career tool that helps developers optimize their resumes for Applicant Tracking Systems (ATS).**

This application uses the **Google Gemini 2.5 Flash-Lite** model to perform a deep-dive analysis of your resume against specific job descriptions. It provides a detailed match score, identifies missing technical keywords, and offers actionable feedback to help you land more interviews.

---

## ✨ Key Features

* **📄 Smart PDF Analysis:** Automatically parses and extracts text from uploaded PDF resumes.
* **🔍 Job Description Matching:** Compares your skills directly against the target JD to calculate a relevance score.
* **📥 Download Reports:** Export your detailed analysis and missing keyword list (PDF/Text) for offline reference.
* **📊 ATS Score Calculation:** detailed breakdown of why your resume passes or fails specific ATS filters.
* **💡 Intelligent Feedback:** Provides "Quick Fixes" and long-term improvements based on the identified gaps.
* **⚡ High-Speed Processing:** Powered by Gemini 2.5 Flash-Lite for instant feedback without rate limits.

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite)
* **Styling:** Tailwind CSS
* **AI Engine:** Google Gemini API (`gemini-2.5-flash-lite`)
* **PDF Engine:** `pdfjs-dist` (The heavy lifter for client-side parsing)
* **State Management:** React Hooks
* **Build Tool:** Vite

## 🧠 Challenges & Learnings

Building this wasn't just about calling an API. The biggest technical hurdle was **Client-Side PDF Parsing**.
* **The Problem:** integrating `pdfjs-dist` with Vite requires complex worker configuration to avoid "Global is not defined" errors and ensure text is extracted correctly from binary PDF data.
* **The Solution:** Implemented a custom worker handler to parse PDFs directly in the browser without needing a heavy backend server, ensuring user privacy and speed.
* **The Outcome:** A zero-latency parsing engine that handles complex resume layouts instantly.
---

## 💻 Installation & Setup

Follow these steps to run the analyzer locally:

### 1. Clone the Repository
```bash
git clone [https://github.com/aryan-404-404/AI-Resume-Analyzer.git](https://github.com/aryan-404-404/AI-Resume-Analyzer.git)
cd AI-Resume-Analyzer
