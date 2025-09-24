import { useState } from 'react';
import Navbar from "~/components/navbar";

const Upload = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                        <div className="form-div">
                            <label htmlFor="uploader">Upload Resume</label>
                            <textarea rows={5} name="job-description" placeholder="Job Description" id="company-name"  />
                        </div>
                    </form>
                )}
            </div>
        </section>
    </main>
    )
}

export default Upload;
