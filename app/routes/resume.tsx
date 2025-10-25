import { Link, useNavigate, useParams } from 'react-router';
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";


export const meta = () => ([
    { title: 'StackScore | Review and Feedback' },
    { name: 'description', content: 'Description of overview of resume.' },
])


const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();

    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate(`/auth?next=/resume/${id}`);
        }
    }, [isLoading, auth.isAuthenticated]);

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if (!resume) return;

            const data = JSON.parse(resume);
            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
        }

        loadResume();
    }, [id]);


    return (
        <main className="inset-0 bg-gradient-to-b from-[#1E3A8A]/50 via-[#3B82F6]/50 to-[#60A5FA]/50">
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <span>Back to HomePage</span>
                </Link>
                <Link to="/upload" className="back-button">
                    <span>Upload Resume</span>
                </Link>
            </nav>
            <div>
                {(imageUrl & resumeUrl) || feedback ? (
                    <div className="flex flex-col">
                        <section className="feedback-section justify-center items-center gap-4 sm:gap-6 lg:gap-8 min-h-[100vh] px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6">
                            <div className="page-heading py-16">
                                <h1>Here's Brief Analysis of your Resume.</h1>
                            </div>
                            <div className="flex flex-col xl:flex-row items-center justify-center gap-6 sm:gap-8 xl:gap-12 w-full max-w-7xl">
                                <div className="w-full max-w-2xl xl:flex-1">
                                    <Summary feedback={feedback} />
                                </div>
                                <div className="animate-in fade-in duration-1000 gradient-border w-full max-w-lg xl:max-w-xl xl:flex-1">
                                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                        <img src={imageUrl} className="w-full h-auto object-contain rounded-sm"
                                            title="resume" alt="resume" />
                                    </a>
                                </div>
                            </div>
                        </section>
                        <section className="feedback-section px-4 sm:px-6 md:px-8 lg:px-10 gap-y-4 sm:gap-y-6">
                            <div className="w-full">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Suggestions</h2>
                                <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                            </div>
                            <div className="w-full">
                                <Details feedback={feedback} />
                            </div>
                        </section>
                    </div>
                ) : (
                    <div className="flex flex-row justify-evenly w-full max-lg:flex-col-reverse">
                        <section className="feedback-section my-11">
                            <img src="/images/resume-scan.gif" className="w-[50%]" alt="resume" />
                        </section>
                    </div>
                )}
            </div>
        </main>
    )
}
export default Resume;