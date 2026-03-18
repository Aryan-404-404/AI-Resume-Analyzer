import React from 'react'

const Heading = () => {
  return (
    <header className="bg-slate-900 text-white">
                    <div className="max-w-6xl mx-auto px-4 pb-10 text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-linear-to-br from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            AI RESUME ANALYZER <span className='text-white'>🚀</span>
                        </h1>

                        {/* Subtitle */}
                        <p className=" md:text-xl mb-8 text-slate-300 max-w-3xl mx-auto">
                            Upload your resume and job description. Get instant ATS feedback and actionable tips.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap justify-center gap-4 items-center">
                            <div className="bg-slate-800 rounded-full px-6 py-3 flex items-center gap-2 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:scale-105">
                                <span className="text-2xl">✓</span>
                                <span className="font-semibold text-slate-200">AI-Powered</span>
                            </div>

                            <div className="bg-slate-800 rounded-full px-6 py-3 flex items-center gap-2 border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:scale-105">
                                <span className="text-2xl">⚡</span>
                                <span className="font-semibold text-slate-200">Instant Results</span>
                            </div>

                            <div className="bg-slate-800 rounded-full px-6 py-3 flex items-center gap-2 border border-slate-700 hover:border-pink-500 transition-all duration-300 hover:scale-105">
                                <span className="text-2xl">💡</span>
                                <span className="font-semibold text-slate-200">Actionable Tips</span>
                            </div>
                        </div>
                    </div>
                </header>
  )
}

export default Heading
