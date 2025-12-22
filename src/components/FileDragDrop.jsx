import { React, useState, useEffect, useRef } from 'react'
import { extractTextFromPDF } from '../utils/pdfLoader'

const FileDragDrop = ({ onTextExtract, label = "Upload Resume" }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [fileName, setFileName] = useState("")
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState("")

    const fileInputRef = useRef(null);
    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }
    const handleDragLeave = () => {
        setIsDragging(false)
    }
    const handleDrop = async(e) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0];
        await processFile(file);
    }
    const handleClick = () => {
        fileInputRef.current.click();
    }
    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        await processFile(file);
    }
    const processFile = async (file) => {
        if (!file) return
        if (file.type !== "application/pdf") {
            setError("❌ Only PDF files are supported!");
            return;
        }
        setFileName(file.name)
        setIsLoading(true)
        setError("")
        try {
            const text = await extractTextFromPDF(file)
            onTextExtract(text)
        }
        catch (err) {
            setError("❌ Failed to read PDF. Is it a scanned image?");
            console.error(err);
            setFileName("");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col h-full">
            {/* LABEL */}
            <label className="block text-xl font-semibold text-white mb-2">
                {label}
            </label>

            <div onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    flex-1 flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer relative overflow-hidden
                    ${isDragging ? "border-orange-500 bg-orange-500/10" : "border-gray-600 bg-gray-900"}
                `}>
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileSelect}
                />

                {isLoading ? (
                    <div className="flex flex-col items-center animate-pulse">
                        <svg fill="#57F6FAFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="12" r="3"><animate id="spinner_jObz" begin="0;spinner_vwSQ.end-0.25s" attributeName="r" dur="0.75s" values="3;.2;3" /></circle><circle cx="12" cy="12" r="3"><animate begin="spinner_jObz.end-0.6s" attributeName="r" dur="0.75s" values="3;.2;3" /></circle><circle cx="20" cy="12" r="3"><animate id="spinner_vwSQ" begin="spinner_jObz.end-0.45s" attributeName="r" dur="0.75s" values="3;.2;3" /></circle></svg>
                    </div>
                ) : fileName && !isLoading ? (
                    <div className="text-center z-10">
                        <p className="font-bold text-white">{fileName}</p>
                        <button
                            className="text-red-400 text-sm mt-2 hover:underline cursor-pointer"
                            onClick={(e)=>{
                                e.stopPropagation();
                                setFileName("")
                                onTextExtract("")
                            }}
                        >
                            Remove
                        </button>
                    </div>

                ) : (
                    <div className="text-center">
                        <div className='flex justify-center items-center'>
                            <img className='h-8 invert' src="../public/folder.svg" alt="" />
                        </div>
                        <p>Drag & Drop PDF</p>
                    </div>

                )}

                {error && (
                    <div className="absolute bottom-4">
                        <p className="text-red-400 bg-red-900 px-2 rounded">
                            {error}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FileDragDrop
