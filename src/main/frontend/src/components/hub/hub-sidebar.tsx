import { Dna, Flame, MessageCircle, SquarePen, TerminalSquare } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

type Route = {
    icon: typeof Flame | typeof SquarePen | typeof Dna | typeof MessageCircle | typeof TerminalSquare;
    href: string;
    label: string;
    external?: boolean;
};

export const Sidebar = () => {
    const location = useLocation();
    // const router = useRouter();

    const routes: Route[] = [
        {
            icon: Flame,
            href: '/hub/new-releases',
            label: 'New Releases',
        },
        {
            icon: SquarePen,
            href: '/hub/creators',
            label: 'Creators',
        },
        {
            icon: Dna,
            href: '/hub/genres',
            label: 'Genres',
        },
        {
            icon: MessageCircle,
            href: '/hub/reviews',
            label: 'Reviews',
        }
    ];

    // const onNavigate = (url: string) => {
    //     return router.push(url);
    // };

    return (
        <div className='space-y-4 flex flex-col h-full text-primary bg-secondary mt-[3.5rem] pt-[2rem] w-[180px]'>
            <div className='flex justify-center flex-1 p-3'>
                <div className='space-y-2'>
                    {routes.map((route) => (
                        <div
                            key={route.href}
                            className={`text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition ${location.pathname === route.href && 'bg-primary-10 text-primary gap-4'}`}
                        >
                            {route.external ? (
                                <a href={route.href} className='flex flex-col items-center flex-1 gap-2'>
                                    <div role="button" tabIndex={0}>
                                        <route.icon className='w-5 h-5' />
                                    </div>
                                    <span>{route.label}</span>
                                </a>
                            ) : (
                                <NavLink
                                    to={route.href}
                                    className='flex flex-row items-center flex-1 gap-2'
                                >
                                    <route.icon className='w-5 h-5' />
                                    <span>{route.label}</span>
                                </NavLink>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};