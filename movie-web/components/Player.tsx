"use client";
import useGetMovieById from '@/hooks/useGetMovieById';
import useLoadMovieUrl from '@/hooks/useLoadMovieUrl';
import usePlayer from '@/hooks/usePlayer';
import React from 'react';
import PlayerContent from './PlayerContent';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

const Player = () => {
    const player = usePlayer();
    const { movie } = useGetMovieById(player.activeId);

    const movieUrl = useLoadMovieUrl(movie!);

    if (!movie || !movieUrl || !player.activeId) {
        return null;
    }
    
    return (
        <div
            className='fixed bottom-1 bg-black w-full py-2 h-[90vh] px-4'
        >
            <div
                className='fixed left-1 top-10 text-neutral-400'
            >
                <p>watching:</p>
            </div>
            <PlayerContent
                key={movieUrl}
                movie={movie}
                movieUrl={movieUrl}
            />
        </div>
    );
}

export default Player;