import  {Link} from 'react-router';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <Link to="/">
                <p className="text-4xl font-bold text-gradient">StackScore</p>
            </Link>
            <Link to="/upload" className="all-button w-fit">
                Upload Resume
            </Link>
        </nav>
    )
}

export default Navbar;