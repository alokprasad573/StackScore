import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";


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
        <main className="min-h-screen inset-0 bg-gradient-to-b from-[#1E3A8A]/50 via-[#3B82F6]/50 to-[#60A5FA]/50 flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div>
                        <h1>Welcome</h1>
                        <h2>SignIn to Continue Your Job Journey.</h2>
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