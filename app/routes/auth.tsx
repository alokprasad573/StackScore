import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router";
import Navbar from "~/components/navbar";


export const meta = () => ([
    {title: 'StackScore | Auth'},
    {name: 'description', content: 'Description of Auth'},
])

const Auth = () => {
    const {isLoading, auth} = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    //Redirection Logic
    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate(next)
        }
    }, [auth.isAuthenticated, next]);

    return (

        <main className="inset-0 bg-gradient-to-b from-[#1E3A8A]/50 via-[#3B82F6]/50 to-[#60A5FA]/50 min-h-screen flex flex-col">
            <Navbar/>
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md gradient-border shadow-lg">
                    <section className="flex flex-col items-center text-center gap-8 bg-white rounded-2xl p-8 sm:p-10">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-4">Welcome</h1>
                            <p className="text-lg sm:text-xl font-serif text-dark-200">Please SignIn to continue...</p>
                        </div>
                        <div className="w-full">
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
            </div>
        </main>
    )
}

export default Auth;