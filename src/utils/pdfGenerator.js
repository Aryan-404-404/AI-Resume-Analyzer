import jsPDF from 'jspdf';

export const generatePDF = (data, resumeName = "Candidate") => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxLineWidth = pageWidth - margin * 2;

    // 1. HEADER
    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setFillColor(249, 115, 22);
    doc.rect(0, 40, pageWidth, 2, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("AI Resume Analysis Report", margin, 25);
    
    // Score Badge
    const scoreWidth = 45;
    const scoreHeight = 20;
    doc.setFillColor(249, 115, 22);
    doc.roundedRect(pageWidth - scoreWidth - margin, 15, scoreWidth, scoreHeight, 3, 3, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.score}/100`, pageWidth - scoreWidth - margin + 22, 26, { align: "center" });

    // Date
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    doc.text(`Generated on ${date}`, margin, 50);

    let yPos = 65;

    // 2. MISSING KEYWORDS SECTION
    if (data.missingKeywords && data.missingKeywords.length > 0) {
        doc.setFillColor(254, 242, 242);
        doc.roundedRect(margin - 3, yPos - 5, maxLineWidth + 6, 25, 2, 2, 'F');
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(185, 28, 28);
        doc.text("Missing Keywords", margin, yPos);
        yPos += 8;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(127, 29, 29);
        
        const keywordsText = data.missingKeywords.join(", ");
        const splitKeywords = doc.splitTextToSize(keywordsText, maxLineWidth - 6);
        doc.text(splitKeywords, margin, yPos);
        yPos += splitKeywords.length * 5 + 15;
    }

    // 3. DETAILED ANALYSIS SECTION
    doc.setFillColor(241, 245, 249);
    doc.rect(margin - 3, yPos - 5, maxLineWidth + 6, 10, 'F');
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text("Detailed Analysis", margin, yPos);
    yPos += 12;

    // Clean the text - REMOVE ALL EMOJIS AND SPECIAL CHARACTERS
    const textContent = data.analysis || data.summary || "No analysis content available.";
    
    const cleanAnalysis = textContent
        .replace(/#{1,6}\s+/g, "") // Remove markdown headers
        .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold
        .replace(/\*([^*]+)\*/g, "$1") // Remove italic
        .replace(/`([^`]+)`/g, "$1") // Remove code blocks
        .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "") // Remove ALL emojis
        .replace(/[^\x20-\x7E\n]/g, "") // Keep only printable ASCII
        .replace(/\n{3,}/g, "\n\n")
        .trim();

    const lineHeight = 5.5;
    const footerSpace = 25;

    // Split into lines and process
    const lines = cleanAnalysis.split('\n');
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);

    lines.forEach((line) => {
        if (!line.trim()) {
            yPos += 3;
            return;
        }

        // Check if new page needed
        if (yPos + lineHeight + 10 > pageHeight - footerSpace) {
            addFooter(doc, pageWidth, pageHeight);
            doc.addPage();
            yPos = 25;
        }

        // Check if it's a section header (ALL CAPS followed by colon)
        if (/^[A-Z\s\-()]+:$/.test(line.trim())) {
            yPos += 3;
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(249, 115, 22);
            doc.text(line.trim().replace(':', ''), margin, yPos);
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(51, 65, 85);
            yPos += 8;
            return;
        }

        // Check if it's a bullet point
        const isBullet = line.trim().startsWith('-');
        const cleanLine = line.replace(/^[-•]\s*/, '').trim();

        if (isBullet && cleanLine) {
            const splitLine = doc.splitTextToSize(cleanLine, maxLineWidth - 12);
            doc.text('-', margin + 3, yPos);
            doc.text(splitLine, margin + 10, yPos);
            yPos += splitLine.length * lineHeight + 2;
        } else if (cleanLine) {
            const splitLine = doc.splitTextToSize(cleanLine, maxLineWidth - 3);
            doc.text(splitLine, margin + 3, yPos);
            yPos += splitLine.length * lineHeight + 2;
        }
    });

    // Add footer to last page
    addFooter(doc, pageWidth, pageHeight);

    // Save
    doc.save(`${resumeName}_Analysis_Report.pdf`);
};

// Footer function
function addFooter(doc, pageWidth, pageHeight) {
    const footerY = pageHeight - 12;
    
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.line(20, footerY - 4, pageWidth - 20, footerY - 4);
    
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    
    const pageNum = doc.internal.getCurrentPageInfo().pageNumber;
    doc.text(`Page ${pageNum}`, pageWidth / 2, footerY, { align: "center" });
}