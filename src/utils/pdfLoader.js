import * as pdfjsLib from 'pdfjs-dist';

// 1. SETUP THE WORKER
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const extractTextFromPDF = async (file) => {
    try {
        let text = ""
        // converting file to ArrayBuffer (binary form 0's and 1's)
        const arrayBuffer = await file.arrayBuffer();
        // We hand the binary data to the library.
        // This returns a 'pdf' object that acts like a book (it knows how many pages it has).
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item) => item.str).join(" ")
            text += pageText + "\n"
        }
        return text;
    }
    catch (error) {
        console.error("Error parsing PDF:", error);
        throw new Error("Failed to extract text from PDF.");
    }
}