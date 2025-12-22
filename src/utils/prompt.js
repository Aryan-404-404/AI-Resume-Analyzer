export const customPrompt = (resumeText, jobText)=>{
    return `
                Act as a **strict** ATS and Senior Hiring Manager.
                Analyze the Resume against the Job Description.

                YOUR TASK:
                1. **Match Score**: 0-100 (be harsh, 90+ only for near-perfect matches)

                2. **Summary**: Keep it SHORT and ACTIONABLE. Use this EXACT format:

                ✅ STRENGTHS:
                [1-2 sentences max]

                ❌ GAPS:
                [1-2 sentences max]

                ⚡ QUICK FIXES (1-7 days):
                - Add "communication skills" and "teamwork" to a Skills section
                - Reword project bullets to include keywords: "responsive," "testing," "debugging"
                - Quantify 1-2 achievements with numbers

                🔧 MEDIUM-TERM (1-4 weeks):
                - Build a portfolio project highlighting UI/UX design
                - Take a short course on [missing technical skill]

                🎯 LONG-TERM (1-6 months):
                - Seek team collaboration experience (open-source/group projects)
                - Gain hands-on experience with [major missing skill]

                💡 RESUME TIP:
                [ONE specific formatting/structure suggestion]

                3. **Missing Keywords**: Technical + soft skills missing from resume

                RESUME:
                ${resumeText}

                JOB DESCRIPTION:
                ${jobText}

                OUTPUT (valid JSON only, no markdown):
                {
                "score": number,
                "summary": "Use the exact format above with emojis and bullet points",
                "missingKeywords": ["skill1", "skill2"]
                }
                Return your analysis as a valid JSON object with this exact structure:

                IMPORTANT: 
                - Return ONLY the JSON object
                - No markdown code blocks
                - No additional text before or after
                - Ensure all strings are properly escaped
                - No trailing commas
            `
}