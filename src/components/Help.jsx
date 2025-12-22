import React from 'react'

const Help = () => {
    return (
        <div className="absolute top-10 right-0 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-5 z-50">
            <div className="absolute -top-2 right-2 w-4 h-4 bg-slate-800 border-t border-l border-slate-700 rotate-45"></div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                🚀 How it works
            </h3>
            <div className="space-y-4">
                
                <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                    <p className="text-sm text-slate-300 leading-tight">
                        Upload or Drag & Drop your <span className="text-white font-medium">Resume PDF</span>.
                    </p>
                </div>
                
                <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                    <p className="text-sm text-slate-300 leading-tight">
                        Paste the <span className="text-white font-medium">Job Description</span> into the text box.
                    </p>
                </div>

                <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                    <p className="text-sm text-slate-300 leading-tight">
                        Click <span className="text-orange-400 font-bold">Analyze</span> to get your AI Score & Feedback.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Help
