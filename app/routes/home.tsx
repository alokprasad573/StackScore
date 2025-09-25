
import Navbar from "~/components/navbar";
import ResumeCard from "~/components/resume_card"
import {resumes} from "../../constants";
import {usePuterStore} from "~/lib/puter";
import {Link, useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

export const meta = () => ([
    { title: 'StackScore | Home'},
    { name: 'description', content: 'Home Page' },
])

export default function Home() {

    const {  auth } = usePuterStore();
    const navigate = useNavigate();

    //Redirection Logic
    useEffect(() => {
        if(!auth.isAuthenticated) {
            navigate('/auth?next=/');
        }
    }, [auth.isAuthenticated]);

    return <main className="inset-0 bg-gradient-to-b from-[#1E3A8A]/50 via-[#3B82F6]/50 to-[#60A5FA]/50">
      <Navbar />

      <section className="main-section">
          <div className="page-heading py-16">
              <h1>Score Your Resume. <br/> Sharpen Your Edge.</h1>
              <h2>Get Instant Feedback on Your Resume from AI.</h2>
          </div>
          {resumes.length > 0 && (
              <div className="resumes-section">
                  {resumes.map((resume) => (
                      <ResumeCard key={resume.id} resume={resume} />
                  ))}
              </div>
          )}
      </section>

  </main>
}
