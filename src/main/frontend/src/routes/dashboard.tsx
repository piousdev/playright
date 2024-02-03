import { Link } from "react-router-dom";
import UserList from "../components/userList";

export default function DashboardPage() {
    return (
        <>
            <h1>Dashboard page</h1>
            <p>This is a protected page.</p>

            <UserList/>

            <ul>
                <li><Link to="/">Return to index</Link></li>
            </ul>
        </>
    );
}