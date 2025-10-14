
import {Link, useNavigate, useParams} from 'react-router';
import { useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";



export const meta = () => ([
    { title: 'StackScore | Review and Feedback'},
    { name: 'description', content: 'Description of overview of resume.' },
])


const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const {id} = useParams();

    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resumes:${id}`);

            if(!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({resume: resumeUrl, image: imageUrl, feedback: data.feedback});
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
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {imageUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradiet-border max-sm:m-0 h-[90%] max-w-xl:h-fit w-fit">
                            <a>
                                <img src={imageUrl} className="w-full h-full object-contain rounded-2xl" title="resume"/>
                            </a>
                        </div>
                    )
                    }
                </section>
            </div>
        </main>
    )
}

export default Resume;