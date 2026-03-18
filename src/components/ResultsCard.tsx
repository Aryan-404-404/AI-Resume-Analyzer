import { generatePDF } from "../utils/pdfGenerator"

const DEMO = {
    score: 82,
    missingKeywords: ['TypeScript', 'CI/CD', 'Docker', 'GraphQL', 'System Design'],
    summary: `Your resume demonstrates strong frontend fundamentals and solid React experience. 
        The job description emphasises full-stack proficiency and DevOps awareness, areas where your current resume falls short.

        Consider adding measurable impact to each role (e.g. "reduced load time by 40 %") and weaving in the missing keywords naturally inside your project descriptions.

        Overall structure is clean, but the skills section would benefit from grouping by category rather than a flat list.`,
}

const scoreConfig = (score: number) => {
    if (score >= 80) return { label: 'Excellent', hex: '#22c55e', glow: '#22c55e55' }
    if (score >= 50) return { label: 'Good', hex: '#f59e0b', glow: '#f59e0b55' }
    return { label: 'Needs Work', hex: '#ef4444', glow: '#ef444455' }
}

interface ArcGaugeProps {
    score: number
    color: string
    glow: string
}

const ArcGauge = ({ score, color, glow }: ArcGaugeProps) => {
    const R = 70, C = 2 * Math.PI * R
    const dash = (score / 100) * C

    return (
        <svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            style={{ filter: `drop-shadow(0 0 16px ${glow})` }}
        >
            <circle cx="90" cy="90" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
            <circle
                cx="90" cy="90" r={R}
                fill="none"
                stroke={color}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${C}`}
                strokeDashoffset={C * 0.25}
                style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)' }}
            />
        </svg>
    )
}

const ResultsCard = ({ data = DEMO }) => {
    const { label, hex, glow } = scoreConfig(data.score)

    const barHint =
        data.score >= 80
            ? 'Your resume is well-optimised for this role.'
            : data.score >= 50
                ? 'A few tweaks could significantly boost your score.'
                : 'Several key areas need attention before applying.'

    return (
        <div className="min-h-screen bg-[#0d1117] flex items-start justify-center px-6 py-10">
            <div className="w-full max-w-4xl bg-[#161b22] border border-white/7 rounded-3xl overflow-hidden shadow-2xl">

                {/* HEADER */}
                <div
                    className="relative flex items-center gap-12 px-13 py-11 overflow-hidden border-b border-white/7"
                    style={{ background: 'linear-gradient(135deg, #1a1f2e 0%, #1e1330 100%)' }}
                >
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse 55% 90% at 85% 50%, rgba(168,85,247,0.15), transparent)' }}
                    />

                    {/* Gauge */}
                    <div className="relative shrink-0 w-44 h-44">
                        <ArcGauge score={data.score} color={hex} glow={glow} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="font-mono text-5xl font-bold leading-none" style={{ color: hex }}>
                                {data.score}
                            </span>
                            <span className="text-base text-gray-500 mt-1">/ 100</span>
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2.5">
                            ATS Match Score
                        </p>

                        <div
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border mb-4"
                            style={{ color: hex, borderColor: `${hex}44`, background: `${hex}12` }}
                        >
                            <span className="inline-block w-2 h-2 rounded-full" style={{ background: hex }} />
                            {label}
                        </div>

                        <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                            <div
                                className="h-full rounded-full transition-[width] duration-1400 ease-in-out"
                                style={{ width: `${data.score}%`, background: `linear-gradient(90deg, ${hex}99, ${hex})` }}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{barHint}</p>
                    </div>
                </div>

                {/* BODY */}
                <div className="flex flex-col gap-7 px-12 py-9">

                    {/* Missing Keywords */}
                    <div className="bg-[#1c2330] border border-white/7 rounded-2xl px-8 py-7">
                        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-slate-200 mb-5">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0 bg-red-500/10 text-red-400">
                                ⚠️
                            </div>
                            Missing Keywords
                        </div>

                        {(data.missingKeywords?.length || 0) === 0 ? (
                            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                                <span>✅</span> No missing keywords — great alignment!
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2.5">
                                {data.missingKeywords.map((kw, i) => (
                                    <span
                                        key={i}
                                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-mono text-xs
                                                   bg-red-500/8 text-red-400 border border-red-500/25
                                                   before:content-['✕'] before:text-[0.6rem] before:opacity-70"
                                    >
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Professional Summary */}
                    <div className="bg-[#1c2330] border border-white/7 rounded-2xl px-8 py-7">
                        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-slate-200 mb-5">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0 bg-purple-500/10 text-purple-300">
                                📝
                            </div>
                            Professional Summary
                        </div>
                        <p className="text-slate-200/75 text-sm leading-relaxed whitespace-pre-line">
                            {data.summary}
                        </p>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex justify-end px-12 pb-9 pt-6 border-t border-white/7">
                    <button
                        onClick={() => generatePDF(data)}
                        className="group relative flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold
                                   text-white cursor-pointer overflow-hidden
                                   bg-linear-to-br from-violet-700 to-purple-500
                                   hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_8px_28px_rgba(168,85,247,0.45)]
                                   active:translate-y-0 active:brightness-95
                                   transition-all duration-150"
                    >
                        <span className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="relative z-10">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="relative z-10">Download Full Report</span>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ResultsCard