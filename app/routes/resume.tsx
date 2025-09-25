import {useNavigate, useParams} from "react-router";
import { Link } from 'react-router';
import {useState, useEffect} from "react";
import {usePuterStore} from "~/lib/puter";
import Summary from "~/components/Summary";
import  ATS from "~/components/ATS";
import Details from "~/components/Details";


export const meta = () => ([
    { title: 'StackScore | Feedback'},
    { name: 'description', content: 'Detailed feedback of Your Resume.' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated)  navigate(`/auth?next=/resume/${id}`);
    }, [isLoading]);

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`/resume/${id}`);
            if (!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;
            const pdfBlob = new Blob([resumeBlob], {type: 'application/pdf'});
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({resumeUrl, imageUrl, feedback: data.feedback});
        }
        loadResume().then(r => console.log(r)).catch(e => console.log(e));

    }, [id])

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
                 <section className="feedback-section ">
                     {imageUrl && resumeUrl && (
                         <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                             <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                 <img src={imageUrl} alt="image" className="w-full h-full object-contain rounded-2xl" title="resume"/>
                             </a>
                         </div>
                     )}
                 </section>
                <section className="feedback-section ">
                    <h2 className="text-4xl text-dark-200 font-bold">Resume FeedBack</h2>
                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            <Summary feedback={feedback} />
                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                            <Details feedback={feedback} />
                        </div>
                    ) : (
                        <img src="/images/resume-scan-2.gif" alt="scan" className="w-fit" />
                    )}
                </section>
            </div>
        </main>
    )
}

export default Resume;