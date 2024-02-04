import { useAuth } from '@clerk/clerk-react';
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { HubSidebar } from '../components/hub/hub-sidebar.tsx';

export default function HubLayout() {
    const { userId, isLoaded } = useAuth()
    const navigate = useNavigate();

    console.log('test', userId)

    useEffect(() => {
        if (!userId) {
            navigate("/")
        }
    }, [navigate, userId])

    if (!isLoaded) return "Loading..."

    return (
        <section>
            <div className='fixed inset-y-0 flex-col hidden md:flex'>
                <HubSidebar />
            </div>
            <main className='h-full pt-16 md:pl-20'>
                <Outlet />
            </main>
        </section>
    )
};