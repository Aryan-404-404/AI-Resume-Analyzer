import React from 'react'
import {generatePDF} from "../utils/pdfGenerator"

const ResultsCard = ({ data }) => {

    const colorClass = data.score >= 80 ? "text-green-500" : data.score >= 50 ? "text-yellow-500" : "text-red-500"
    const borderClass = data.score >= 80 ? "border-green-500" : data.score >= 50 ? "border-yellow-500" : "border-red-500"
    const bgClass = data.score >= 80 ? "bg-green-900/20" : data.score >= 50 ? "bg-yellow-900/20" : "bg-red-900/20"

    return (
        <div className={`mt-8 p-8 rounded-3xl border-2 ${borderClass} ${bgClass} shadow-2xl animate-fade-in`}>
            <div className="flex flex-col items-center mb-8">
                <span className="text-gray-400 uppercase tracking-widest font-bold text-sm">Match Score</span>
                <div className={`text-6xl font-black ${colorClass} mt-2`}>
                    {data.score}
                </div>
            </div>
            {/* 3. MISSING KEYWORDS */}
            <div className='mb-6'>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    ⚠️ Missing Keywords
                </h3>

                {(data.missingKeywords?.length || 0) === 0 ? (
                    <p className="text-green-400">✅ No missing keywords detected!</p>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {data.missingKeywords?.map((keyword, index) => (
                            <span key={index} className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/50 rounded-lg font-mono text-sm">
                                {keyword}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {/* 2. THE SUMMARY */}
            <div className="mb-8 p-6 bg-gray-900/50 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    📝 Professional Summary
                </h3>
                <div className="text-gray-300 text-sm leading-relaxed space-y-3 whitespace-pre-line">
                    {data.summary}
                </div>
            </div>
            {/* pdf generator */}
            <div className="mt-10 pt-6 border-t border-slate-700 flex justify-end">
                <button 
                    onClick={() => generatePDF(data)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/25"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Full Report
                </button>
            </div>
        </div>
    )
}
export default ResultsCard
