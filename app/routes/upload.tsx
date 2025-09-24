import React, { useState } from 'react';
import Navbar from "~/components/navbar";
import FileUploader from "~/components/FileUploader";

const Upload = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null)

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;

        const formData = new FormData(form);

        const companyName = formData.get('company-name');
        const jobTitle = formData.get('job-title');
        const jobDescription = formData.get('job-description');

        console.log({
            companyName,
            jobTitle,
            jobDescription,
            file
        });

    }

    return (
     <main className="inset-0 bg-gradient-to-b from-[#1E3A8A]/50 via-[#3B82F6]/50 to-[#60A5FA]/50">
        <Navbar />
        <section className="main-section">
            <div className="page-heading py-16 ">
                <h1>Focused Feedback for Your Dream Role.</h1>
                {isProcessing ? (
                    <>
                        <h2>{statusText}</h2>
                        <img src="/images/resume-scan.gif" className="w-full"/>
                    </>
                ) : (
                    <h2>Upload Your Resume for ATS Optimization.</h2>
                )}
                {!isProcessing && (
                    <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                        <div className="form-div">
                            <label htmlFor="company-name">Company Name</label>
                            <input type="text" name="company-name" placeholder="Company Name" id="company-name"  />
                        </div>
                        <div className="form-div">
                            <label htmlFor="job-title">Job Title</label>
                            <input type="text" name="job-title" placeholder="Job Title" id="company-name"  />
                        </div>
                        <div className="form-div">
                            <label htmlFor="job-description">Job Description</label>
                            <textarea rows={5} name="job-description" placeholder="Job Description" id="company-name"  />
                        </div>
                        <div>
                            <label htmlFor="uploader">Upload Resume</label>
                            <div>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>
                        </div>
                        <button className="upload-button" type="submit">
                            Evaluate resume
                        </button>
                    </form>

                )}
            </div>
        </section>
    </main>
    )
}

export default Upload;
