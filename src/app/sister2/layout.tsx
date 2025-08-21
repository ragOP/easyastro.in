import type { Metadata } from 'next';
import './sister2.css';
import Header from '@/components/layout/header';
import Sister2Header from '@/components/sister2/sister2-header';

export const metadata: Metadata = {
    title: 'Soulmate Sketch - Reveal Your Soulmate\'s Face Today | EasyAstro',
    description: 'Discover your soulmate\'s face through the power of astrology and psychic art. 9,427 sketches revealed this week. Don\'t be left wondering - reveal your soulmate now!',
    keywords: 'soulmate sketch, psychic art, astrology, love reading, soulmate face, destiny, relationship',
};

export default function Sister2Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="sister2-layout font-montserrat">
            <Sister2Header />

            {children}
        </div>
    );
} 