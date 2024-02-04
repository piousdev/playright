import { Link } from "react-router-dom";


const LogoContainer = () => {
    return (
        <Link to="/" className="flex items-center space-x-2">
            <span className="text-4xl font-bold">Playright</span>
        </Link>
    )
}

export default LogoContainer;