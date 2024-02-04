import { UserButton } from "@clerk/nextjs";
import { Link } from "react-router-dom";
import LogoContainer from "./logo-container";
import SearchBar from "./searchbar";


const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex items-center h-14 max-w-screen-2xl">
                <div className="hidden mr-4 md:flex">
                    <LogoContainer />
                    <nav className="flex items-center justify-between gap-6 text-sm ml-[2rem]">
                        <Link to="/hub">Hub</Link>
                        <Link to="/playground">Playground</Link>
                        <Link to="/developers">Developers</Link>
                    </nav>
                </div>
                <div className="flex items-center justify-between flex-1 space-x-4 md:justify-end">
                    <SearchBar />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </header>
    );
};

export default Navbar