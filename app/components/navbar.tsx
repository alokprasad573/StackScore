import {Link} from 'react-router';
import {usePuterStore} from "~/lib/puter";

const Navbar = () => {
    const {auth} = usePuterStore();
    return (
        <nav className='navbar'>
            <Link to="/">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">Scanlytics</p>
            </Link>

            {auth.isAuthenticated ? (
                <Link to="/auth" className="all-button w-fit">
                    <button onClick={auth.signOut}>
                        <p className="text-sm sm:text-base">Sign Out</p>
                    </button>
                </Link>
            ) : null}
        </nav>
    )
}

export default Navbar;