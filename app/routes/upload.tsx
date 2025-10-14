import {type FormEvent, useState} from 'react'
import Navbar from "~/components/navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";


export const meta = () => ([
    { title: 'StackScore | Upload Resume'},
    { name: 'description', content: 'Upload Your Resume Here.' },
])

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({companyName, jobTitle, jobDescription, file}: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        setIsProcessing(true);

        try {
            setStatusText("Uploading the file...");
            const uploadedFile = await fs.upload([file]);
            if (!uploadedFile) return setStatusText("Failed to upload file.");

            setStatusText("Converting to image...");
            const imageFile = await convertPdfToImage(file);
            if (!imageFile.file) return setStatusText("Failed to convert PDF to image.");

            setStatusText("Uploading the image...");
            const uploadedImage = await fs.upload([imageFile.file]);
            if (!uploadedImage) return setStatusText("Failed to upload image.");

            setStatusText("Preparing data...");
            const uuid = generateUUID();
            const data = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName,
                jobTitle,
                jobDescription,
                feedback: "",
            };
            await kv.set(`resume:${uuid}`, JSON.stringify(data));

            setStatusText("Analyzing...");
            const feedback = await ai.feedback(
                uploadedFile.path,
                prepareInstructions({ jobTitle, jobDescription })
            );
            if (!feedback) return setStatusText("Failed to analyze resume.");

            let feedbackText = "";
            const content = await feedback.message?.content;

            if (typeof content === "string") {
                feedbackText = content;
            } else if (Array.isArray(content) && content[0]?.text) {
                feedbackText = content[0].text;
            } else {
                return setStatusText("Unexpected feedback format.");
            }

            try {
                console.log(JSON.parse(feedbackText));
                data.feedback = JSON.parse(feedbackText);
            } catch (err) {
                console.error("Failed to parse feedback JSON:", err);
                return setStatusText("Error parsing feedback.");
            }

            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            setStatusText("Analysis complete, redirecting...");
            navigate(`/resume/${uuid}`);
        } catch (err) {
            console.error("Unhandled error during analysis:", err);
            setStatusText("Something went wrong during analysis.");
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

       handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="inset-0 bg-gradient-to-b from-[#1E3A8A]/50 via-[#3B82F6]/50 to-[#60A5FA]/50">
            <nav className='navbar'>
                <Link to="/">
                    <p className="text-4xl font-bold text-gradient">StackScore</p>
                </Link>
            </nav>
            <section className="main-section">
                <div className="page-heading py-16 ">
                    <h1>Focused Feedback for Your Dream Role.</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" alt="resume-scan" className="w-full"/>
                        </>
                    ) : (
                        <h2>Upload Your Resume for ATS Optimization.</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 ">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name="company-name" placeholder="E.g. Meta" id="company-name" required={true} />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" placeholder="E.g Cloud Engineer" id="company-name" required={true} />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name="job-description" placeholder="Write a brief professional summary highlighting your skills, experience, and career goals." id="company-name"  required={true} />
                            </div>
                            <div>
                                <label htmlFor="uploader">Upload Resume</label>
                                <div>
                                    <FileUploader onFileSelect={handleFileSelect} />
                                </div>
                            </div>
                            <button className="all-button" type="submit">
                                Submit
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
