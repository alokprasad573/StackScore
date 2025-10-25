import Navbar from "~/components/navbar";

import {usePuterStore} from "~/lib/puter";
import {Link, useLocation, useNavigate} from "react-router";
import {use, useEffect, useState} from "react";

export const meta = () => ([
    {title: 'StackScore | Home'},
    {name: 'description', content: 'Home Page'},
])

export default function Home() {

    const {auth, kv} = usePuterStore();
    const navigate = useNavigate();


    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/auth?next=/');
        }
    }, [auth.isAuthenticated]);



    return <main className="inset-0 bg-gradient-to-b from-[#1E3A8A]/50 via-[#3B82F6]/50 to-[#60A5FA]/50">
        <Navbar/>

        <section className="main-section">
            <div className="page-heading py-16">
                <h1>Score Your Resume. <br/> Sharpen Your Edge.</h1>
                <h2>Get Instant Feedback on Your Resume from AI.</h2>
                <Link to='/upload' className="upload-button">
                    <h3>
                        Upload Your Resume &nbsp;
                        <i className="fa-solid fa-file-arrow-up"></i>
                    </h3>
                </Link>
            </div>

        </section>

    </main>
}
