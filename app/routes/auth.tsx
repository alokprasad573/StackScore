import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router";
import Navbar from "~/components/navbar";


export const meta = () => ([
    { title: 'Resumind | Auth'},
    { name: 'description', content: 'Description of Auth' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    //Redirection Logic
    useEffect(() => {
        if(auth.isAuthenticated) {
            navigate(next)
        }
    }, [auth.isAuthenticated, next]);

    return (

        <main className="inset-0 bg-gradient-to-b from-[#1E3A8A]/50 via-[#3B82F6]/50 to-[#60A5FA]/50">
            <Navbar />
            <div className=" w-fit fixed top-1/4 left-1/4 gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div>
                        <h1>Welcome</h1>
                        <p className="text-xl max-sm:text-xl  font-serif text-dark-200">Please SignIn to continue ...</p>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in..</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button" onClick={auth.signOut}>
                                        <p>Sign Out</p>
                                    </button>
                                ) : (
                                    <button className="auth-button" onClick={auth.signIn}>
                                        Sign In
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Auth;