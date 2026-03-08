import React from 'react'
// import {generatePDF} from "../utils/pdfGenerator"

// ── demo stub so the component renders standalone ──────────────────────────
const generatePDF = (data) => alert('Downloading report…')

// ── mock data for preview ──────────────────────────────────────────────────
const DEMO = {
    score: 82,
    missingKeywords: ['TypeScript', 'CI/CD', 'Docker', 'GraphQL', 'System Design'],
    summary: `Your resume demonstrates strong frontend fundamentals and solid React experience. 
The job description emphasises full-stack proficiency and DevOps awareness, areas where your current resume falls short.

Consider adding measurable impact to each role (e.g. "reduced load time by 40 %") and weaving in the missing keywords naturally inside your project descriptions.

Overall structure is clean, but the skills section would benefit from grouping by category rather than a flat list.`,
}

// ── helpers ────────────────────────────────────────────────────────────────
const scoreConfig = (score) => {
    if (score >= 80) return { label: 'Excellent', hex: '#22c55e', glow: '#22c55e55', ring: 'rgba(34,197,94,0.25)' }
    if (score >= 50) return { label: 'Good',      hex: '#f59e0b', glow: '#f59e0b55', ring: 'rgba(245,158,11,0.25)' }
    return                  { label: 'Needs Work', hex: '#ef4444', glow: '#ef444455', ring: 'rgba(239,68,68,0.25)' }
}

// ── radial arc SVG ─────────────────────────────────────────────────────────
const ArcGauge = ({ score, color, glow }) => {
    const R = 70, C = 2 * Math.PI * R
    const dash = (score / 100) * C

    return (
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ filter: `drop-shadow(0 0 16px ${glow})` }}>
            {/* track */}
            <circle cx="90" cy="90" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
            {/* fill */}
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

// ── main component ─────────────────────────────────────────────────────────
const ResultsCard = ({ data = DEMO }) => {
    const { label, hex, glow, ring } = scoreConfig(data.score)

    return (
        <>
            {/* Google Font */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

                .rc-root *{box-sizing:border-box;font-family:'DM Sans',sans-serif}
                .rc-root{
                    --bg:      #0d1117;
                    --surface: #161b22;
                    --surface2:#1c2330;
                    --border:  rgba(255,255,255,0.07);
                    --purple:  #a855f7;
                    --purple2: #7c3aed;
                    --text:    #e2e8f0;
                    --muted:   #6b7280;
                    background:var(--bg);
                    min-height:100vh;
                    display:flex;
                    align-items:flex-start;
                    justify-content:center;
                    padding:40px 24px;
                }

                .rc-card{
                    width:100%;
                    max-width:1000px;
                    background:var(--surface);
                    border:1px solid var(--border);
                    border-radius:28px;
                    overflow:hidden;
                    box-shadow:0 0 0 1px var(--border),0 40px 80px rgba(0,0,0,0.6);
                    animation:slideUp .5s ease both;
                }
                @keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}

                /* ── header band ── */
                .rc-header{
                    background:linear-gradient(135deg,#1a1f2e 0%,#1e1330 100%);
                    border-bottom:1px solid var(--border);
                    padding:44px 52px;
                    display:flex;
                    align-items:center;
                    gap:48px;
                    position:relative;
                    overflow:hidden;
                }
                .rc-header::before{
                    content:'';
                    position:absolute;inset:0;
                    background:radial-gradient(ellipse 55% 90% at 85% 50%, rgba(168,85,247,0.15), transparent);
                    pointer-events:none;
                }
                .rc-gauge-wrap{position:relative;flex-shrink:0;width:180px;height:180px}
                .rc-gauge-inner{
                    position:absolute;inset:0;
                    display:flex;flex-direction:column;
                    align-items:center;justify-content:center;
                }
                .rc-score-num{
                    font-family:'Space Mono',monospace;
                    font-size:3rem;
                    font-weight:700;
                    line-height:1;
                    color:var(--text);
                }
                .rc-score-pct{font-size:1rem;color:var(--muted);margin-top:4px}

                .rc-header-meta{flex:1;min-width:0}
                .rc-score-label{
                    font-size:.8rem;
                    font-weight:600;
                    letter-spacing:.14em;
                    text-transform:uppercase;
                    color:var(--muted);
                    margin-bottom:10px;
                }
                .rc-score-tag{
                    display:inline-flex;align-items:center;gap:7px;
                    padding:6px 18px;border-radius:20px;
                    font-size:.85rem;font-weight:600;
                    border:1px solid;
                    margin-bottom:18px;
                }
                .rc-bar-track{
                    height:7px;border-radius:4px;
                    background:rgba(255,255,255,0.06);
                    overflow:hidden;
                }
                .rc-bar-fill{
                    height:100%;border-radius:4px;
                    transition:width 1.4s cubic-bezier(.4,0,.2,1);
                }
                .rc-bar-hint{font-size:.78rem;color:var(--muted);margin-top:8px}

                /* ── body ── */
                .rc-body{padding:36px 48px;display:flex;flex-direction:column;gap:28px}

                /* section card */
                .rc-section{
                    background:var(--surface2);
                    border:1px solid var(--border);
                    border-radius:18px;
                    padding:28px 32px;
                }
                .rc-section-title{
                    display:flex;align-items:center;gap:12px;
                    font-size:.9rem;font-weight:700;
                    text-transform:uppercase;letter-spacing:.08em;
                    color:var(--text);
                    margin-bottom:20px;
                }
                .rc-section-icon{
                    width:32px;height:32px;border-radius:9px;
                    display:flex;align-items:center;justify-content:center;
                    font-size:.95rem;flex-shrink:0;
                }

                /* keywords */
                .rc-kw-grid{display:flex;flex-wrap:wrap;gap:10px}
                .rc-kw{
                    padding:6px 16px;
                    border-radius:9px;
                    font-family:'Space Mono',monospace;
                    font-size:.75rem;
                    background:rgba(239,68,68,0.08);
                    color:#f87171;
                    border:1px solid rgba(239,68,68,0.25);
                    display:flex;align-items:center;gap:7px;
                }
                .rc-kw::before{content:'✕';font-size:.6rem;opacity:.7}
                .rc-kw-empty{
                    display:flex;align-items:center;gap:8px;
                    color:#4ade80;font-size:.9rem;font-weight:500;
                }

                /* summary */
                .rc-summary{
                    color:rgba(226,232,240,0.75);
                    font-size:.9rem;
                    line-height:1.8;
                    white-space:pre-line;
                }

                /* footer */
                .rc-footer{
                    padding:24px 48px 36px;
                    border-top:1px solid var(--border);
                    display:flex;justify-content:flex-end;
                }
                .rc-dl-btn{
                    display:flex;align-items:center;gap:9px;
                    padding:13px 28px;
                    border-radius:14px;
                    font-size:.9rem;font-weight:700;
                    letter-spacing:.02em;
                    border:none;cursor:pointer;
                    background:linear-gradient(135deg,#7c3aed,#a855f7);
                    color:#fff;
                    box-shadow:0 0 0 0 rgba(168,85,247,0);
                    transition:transform .15s,box-shadow .15s,filter .15s;
                    position:relative;overflow:hidden;
                }
                .rc-dl-btn::before{
                    content:'';
                    position:absolute;inset:0;
                    background:linear-gradient(135deg,rgba(255,255,255,0.12),transparent);
                    opacity:0;transition:opacity .2s;
                }
                .rc-dl-btn:hover{
                    transform:translateY(-2px);
                    filter:brightness(1.12);
                    box-shadow:0 8px 28px rgba(168,85,247,0.45);
                }
                .rc-dl-btn:hover::before{opacity:1}
                .rc-dl-btn:active{transform:translateY(0);filter:brightness(.95)}
            `}</style>

            <div className="rc-root">
                <div className="rc-card">

                    {/* ── HEADER ── */}
                    <div className="rc-header">
                        <div className="rc-gauge-wrap">
                            <ArcGauge score={data.score} color={hex} glow={glow} />
                            <div className="rc-gauge-inner">
                                <span className="rc-score-num" style={{ color: hex }}>{data.score}</span>
                                <span className="rc-score-pct">/ 100</span>
                            </div>
                        </div>

                        <div className="rc-header-meta">
                            <div className="rc-score-label">ATS Match Score</div>
                            <div className="rc-score-tag" style={{ color: hex, borderColor: `${hex}44`, background: `${hex}12` }}>
                                <span style={{ width:7, height:7, borderRadius:'50%', background:hex, display:'inline-block' }} />
                                {label}
                            </div>
                            <div className="rc-bar-track">
                                <div className="rc-bar-fill" style={{ width: `${data.score}%`, background: `linear-gradient(90deg, ${hex}99, ${hex})` }} />
                            </div>
                            <div className="rc-bar-hint">
                                {data.score >= 80
                                    ? 'Your resume is well-optimised for this role.'
                                    : data.score >= 50
                                    ? 'A few tweaks could significantly boost your score.'
                                    : 'Several key areas need attention before applying.'}
                            </div>
                        </div>
                    </div>

                    {/* ── BODY ── */}
                    <div className="rc-body">

                        {/* Missing Keywords */}
                        <div className="rc-section">
                            <div className="rc-section-title">
                                <div className="rc-section-icon" style={{ background:'rgba(239,68,68,0.12)', color:'#f87171' }}>⚠️</div>
                                Missing Keywords
                            </div>
                            {(data.missingKeywords?.length || 0) === 0
                                ? <div className="rc-kw-empty"><span>✅</span> No missing keywords — great alignment!</div>
                                : <div className="rc-kw-grid">
                                    {data.missingKeywords.map((kw, i) => (
                                        <span key={i} className="rc-kw">{kw}</span>
                                    ))}
                                  </div>
                            }
                        </div>

                        {/* Professional Summary */}
                        <div className="rc-section">
                            <div className="rc-section-title">
                                <div className="rc-section-icon" style={{ background:'rgba(168,85,247,0.12)', color:'#c084fc' }}>📝</div>
                                Professional Summary
                            </div>
                            <p className="rc-summary">{data.summary}</p>
                        </div>

                    </div>

                    {/* ── FOOTER ── */}
                    <div className="rc-footer">
                        <button className="rc-dl-btn" onClick={() => generatePDF(data)}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Full Report
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ResultsCard