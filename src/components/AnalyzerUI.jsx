import { useState } from 'react';
import { runGemini } from '../lib/gemini';
import ResultsCard from './ResultsCard';
import FileDragDrop from './FileDragDrop';
import Navbar from './Navbar';
import Heading from './Heading';
import { customPrompt } from '../utils/prompt';
import Toast from './Toast';

export default function AnalyzerUI() {
    const [resumeText, setresumeText] = useState("")
    const [jobText, setjobText] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const [result, setresult] = useState("")
    const [isResponse, setIsResponse] = useState(false)
    const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

    const showToast = (message, type = 'error') => {
        setToast({ show: true, message, type });
    };

    const handleRoast = async () => {
        if (!resumeText && !jobText) {
            showToast("Please upload a resume first!", "error"); // Example usage
            return;
        }
        setisLoading(true)
        setresult("")
        try {
            const prompt = customPrompt(resumeText, jobText);
            const rawText = await runGemini(prompt);
            let cleanJson = rawText
                .replace(/```json\n?/gi, '')
                .replace(/```\n?/g, '')
                .trim();

            const firstBrace = cleanJson.indexOf('{');
            const lastBrace = cleanJson.lastIndexOf('}');

            if (firstBrace !== -1 && lastBrace !== -1) {
                cleanJson = cleanJson.substring(firstBrace, lastBrace + 1);
            }
            const parsedData = JSON.parse(cleanJson);
            setresult(parsedData)
            setIsResponse(true)
        }
        catch (error) {
            console.error("Roast failed:", error);
            const errorMessage = error.toString().toLowerCase();

            if (errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("limit")) {
                showToast("⏳ Free Tier Limit Reached. Please wait 60s.", "warning");
            } else {
                showToast("Analysis failed. Please try again.", "error");
            }
        }
        finally {
            setisLoading(false)
        }
    };


    return (
        <>
            <Navbar />
            <div className="max-w-full mx-auto p-6 min-h-screen">
                <Heading />

                {/* INPUT SECTION */}
                {isLoading ? (
                    <div className="h-20 flex justify-center">
                        {isLoading && (
                            <div className='flex flex-col justify-center items-center'>
                                <svg className='h-12' viewBox="0 0 57 60" xmlns="http://www.w3.org/2000/svg" stroke="#88FFE1FF"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="3"><circle cx="5" cy="50" r="5"><animate attributeName="cy" begin="0s" dur="2.2s" values="50;5;50;50" calcMode="linear" repeatCount="indefinite" /><animate attributeName="cx" begin="0s" dur="2.2s" values="5;27;49;5" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="27" cy="5" r="5"><animate attributeName="cy" begin="0s" dur="2.2s" from="5" to="5" values="5;50;50;5" calcMode="linear" repeatCount="indefinite" /><animate attributeName="cx" begin="0s" dur="2.2s" from="27" to="27" values="27;49;5;27" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="49" cy="50" r="5"><animate attributeName="cy" begin="0s" dur="2.2s" values="50;50;5;50" calcMode="linear" repeatCount="indefinite" /><animate attributeName="cx" from="49" to="49" begin="0s" dur="2.2s" values="49;5;27;49" calcMode="linear" repeatCount="indefinite" /></circle></g></g></svg>
                                <p className="text-gray-400 mt-4 animate-pulse font-medium">
                                    Analyzing Resume...
                                </p>
                            </div>
                        )}
                    </div>
                ) : result && isResponse ? (
                    <div className="w-full mx-auto animate-fade-in">
                        <div className="my-4 flex justify-center">
                            <button
                                onClick={() => {
                                    setIsResponse(false);
                                    setresult(null);
                                }}
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105 flex items-center gap-2"
                            >
                                ⬅️ Analyze Another Resume
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <ResultsCard data={result} />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                            <div className="h-full bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                                <FileDragDrop
                                    label="📄 Your Resume"
                                    onTextExtract={(text) => setresumeText(text)}
                                />

                            </div>
                            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                                <label className="block text-xl font-semibold text-white mb-4">
                                    💼 Job Description
                                </label>
                                <textarea onChange={(e) => { setjobText(e.target.value) }} className='w-full h-80 bg-gray-900 text-white p-4 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none whitespace-pre-wrap wrap-break-word' />
                            </div>
                        </div>
                        <div className="mt-10 flex justify-center">
                            <button disabled={isLoading} onClick={handleRoast} className='bg-linear-to-r from-orange-600 to-red-600 text-white font-bold py-4 px-10 rounded-full text-xl hover:scale-105 transition transform shadow-xl cursor-pointer disabled:opacity-5 disabled:cursor-not-allowed disabled:hover:scale-100'>ANALYZE MY RESUME 🔍</button>
                        </div>
                        {toast.show && (
                            <Toast
                                message={toast.message}
                                type={toast.type}
                                onClose={() => setToast({ ...toast, show: false })}
                            />
                        )}
                        {/* The Disclaimer */}
                        <p className="mt-20 text-xs text-slate-500 text-center">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                            Powered by Gemini AI (Free Tier).
                            <span className="block sm:inline sm:ml-1">
                                If analysis fails, please wait 1 minute and try again.
                            </span>
                        </p>
                    </>
                )}
            </div>
        </>
    );
}