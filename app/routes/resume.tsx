import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => [
    { title: "StackScore | Feedback" },
    { name: "description", content: "Detailed feedback of Your Resume." },
];

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [data, setData] = useState<Resume | null>(null);
    const [imageUrl, setImageUrl] = useState("");
    const [resumeUrl, setResumeUrl] = useState("");
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    // 🔐 Redirect if not authenticated
    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate(`/auth?next=/resume/${id}`);
        }
    }, [isLoading, auth.isAuthenticated, id]);

    // 📦 Load resume data from KV
    useEffect(() => {
        const loadResume = async () => {
            try {
                const response = await kv.get(`/resume/${id}`);
                console.log(response);
                if (!response) {
                    setData(null);
                } else {
                    const parsed = JSON.parse(response);
                    setData(parsed);
                }
            } catch (err) {
                console.error("Failed to load resume:", err);
                setData(null);
            }
        };

        loadResume();
    }, [id]);

    useEffect(() => {
        const callReRender = async () => {
            if (!data) return;

            try {
                const resumeBlob = await fs.read(data.resumePath);
                if (resumeBlob) {
                    const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
                    setResumeUrl(URL.createObjectURL(pdfBlob));
                }

                const imageBlob = await fs.read(data.imagePath);
                if (imageBlob) {
                    setImageUrl(URL.createObjectURL(imageBlob));
                }

                setFeedback(data.feedback);
            } catch (err) {
                console.error("Failed to render resume:", err);
            }
        };

        callReRender();
    }, [data, fs]);

    return (
        <main className="pt-0 inset-0 bg-gradient-to-b from-[#1E3A8A]/50 via-[#3B82F6]/50 to-[#60A5FA]/50">
            <nav className="resume-nav">
                <Link to="/" className="all-button">
                    <span>Back to Home Page</span>
                </Link>
                <Link to="/upload" className="all-button w-fit">
                    Upload Resume
                </Link>
            </nav>

            <div className="flex flex-row w-full max-lg:flex-col-reverse justify-evenly">
                <section className="feedback-section">
                    {imageUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={imageUrl}
                                    alt="resume"
                                    className="w-full h-full object-contain rounded-2xl"
                                    title="resume"
                                />
                            </a>
                        </div>
                    )}
                </section>

                <section className="feedback-section">
                    <h2 className="text-4xl text-dark-200 font-bold">Resume Feedback</h2>
                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            <Summary feedback={feedback} />
                            <ATS
                                score={feedback.ATS?.score || 0}
                                suggestions={feedback.ATS?.tips || []}
                            />
                            <Details feedback={feedback} />
                        </div>
                    ) : (
                        <img
                            src="/images/resume-scan-2.gif"
                            alt="scan"
                            className="w-fit"
                        />
                    )}
                </section>
            </div>
        </main>
    );
};

export default Resume;