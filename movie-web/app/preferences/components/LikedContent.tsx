"use client";
import LikeButton from '@/components/LikeButton';
import MediaItem from '@/components/MediaItem';
import { useUser } from '@/hooks/useUser';
import { Movie } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface LikedContentProps {
    movies: Movie[];
}

const LikedContent: React.FC<LikedContentProps> = ({ movies }) => {
    const router = useRouter();
    const { isLoading, user } = useUser();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    if (movies.length === 0) {
        return (
            <div
                className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'
            >
                No movies on your watchlist
            </div>
        )
    }

    return (
        <div
            className='flex flex-col gap-y-2 w-full p-6'
        >
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    className='flex items-center gap-x-4 w-full'
                >
                    <div
                        className='flex-1'
                    >
                        <MediaItem 
                            onClick={() => {}}
                            data={movie}
                        />
                    </div>
                    <LikeButton 
                        movieId={movie.id}
                    />
                </div>
            ))}
        </div>
    );
}

export default LikedContent;