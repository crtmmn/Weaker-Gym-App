import { Link } from "react-router-dom"
import './navbar.css';

function Navbar() {
    return (
        <nav>
            <Link id="navbar" to="/">Home</Link>
            <Link id="navbar" to="/exercises">Exercises</Link>
        </nav>
    )
}
export default Navbar