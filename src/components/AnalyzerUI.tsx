import { useState } from 'react';
import { runGroq } from '../lib/groq';
import ResultsCard from './ResultsCard';
import FileDragDrop from './FileDragDrop';
import Navbar from './Navbar';
import Heading from './Heading';
import { customPrompt } from '../utils/prompt';
import Toast from './Toast';
import { ResumeFormate } from '../types/resume';

type ToastType = 'error' | 'warning' | 'success';

interface ToastState {
    show: boolean
    message: string,
    type: ToastType
}

export default function AnalyzerUI() {
    const [resumeText, setresumeText] = useState("")
    const [jobText, setjobText] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const [result, setresult] = useState<ResumeFormate | null>(null);
    const [isResponse, setIsResponse] = useState(false)
    const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'error' });

    const showToast = (message: string, type: ToastType): void => {
        setToast({ show: true, message, type });
    };

    const formatSummary = (summaryText: string): string => {
        if (!summaryText) return '';

        return summaryText
            .replace(/STRENGTHS:/g, '✅ STRENGTHS:')
            .replace(/GAPS:/g, '❌ GAPS:')
            .replace(/QUICK FIXES/g, '⚡ QUICK FIXES')
            .replace(/MEDIUM-TERM/g, '🔧 MEDIUM-TERM')
            .replace(/LONG-TERM/g, '🎯 LONG-TERM')
            .replace(/RESUME TIP:/g, '💡 RESUME TIP:');
    };

    const handleRoast = async () => {
        if (!resumeText && !jobText) {
            showToast("Please upload a resume first!", "error");
            return;
        }

        setisLoading(true);
        setresult(null);

        try {
            const prompt = customPrompt(resumeText, jobText);
            const result = await runGroq(prompt);
            if (result.summary) {
                result.summary = formatSummary(result.summary);
            }
            setresult(result);
            setIsResponse(true);
        } catch (error) {
            console.error("Error:", error);
            if (error instanceof Error) {
                if (error.toString().includes("429") || error.toString().includes("quota")) {
                    showToast("Rate limit hit. Wait 60 seconds.", "warning");
                } else {
                    showToast("Failed. Try again.", "error");
                }
            }
        } finally {
            setisLoading(false);
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
                            {/* Analyze Another Resume button */}
                            <button
                                onClick={() => {
                                    setIsResponse(false);
                                    setresult(null);
                                }}
                                className="group relative flex items-center gap-2 px-7 py-3 rounded-2xl text-sm font-bold
                                       text-white overflow-hidden cursor-pointer
                                       bg-[#161b22] border border-white/10
                                       hover:-translate-y-0.5 hover:border-purple-500/40 hover:shadow-[0_0_24px_rgba(168,85,247,0.2)]
                                       transition-all duration-150"
                            >
                                <span className="absolute inset-0 bg-linear-to-br from-violet-700/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                <span className="relative z-10 text-base">⬅️</span>
                                <span className="relative z-10">Analyze Another Resume</span>
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <ResultsCard data={result} />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                            {/* Analyze button */}
                            <button
                                disabled={isLoading}
                                onClick={handleRoast}
                                className="group relative flex items-center gap-3 px-10 py-4 rounded-2xl text-base font-bold
                                       text-white overflow-hidden cursor-pointer
                                       bg-linear-to-br from-violet-700 to-purple-500
                                       hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_8px_32px_rgba(168,85,247,0.45)]
                                       active:translate-y-0 active:brightness-95
                                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100 disabled:hover:shadow-none
                                       transition-all duration-150"
                            >
                                <span className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                <span className="relative z-10">ANALYZE MY RESUME</span>
                                <span className="relative z-10 text-lg">🔍</span>
                            </button>
                        </div>

                        {toast.show && (
                            <Toast
                                message={toast.message}
                                type={toast.type}
                                onClose={() => setToast({ ...toast, show: false })}
                            />
                        )}

                        <p className="mt-20 text-xs text-slate-500 text-center">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                            Powered by Groq AI (Free Tier).
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