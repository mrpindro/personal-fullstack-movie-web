"use client";
import LikeButton from '@/components/LikeButton';
import MediaItem from '@/components/MediaItem';
import { Movie } from '@/types';
import React from 'react';

interface SearchContentProps {
    movies: Movie[];
}

const SearchContent: React.FC<SearchContentProps> = ({movies}) => {
    if (movies.length === 0) {
        return (
            <div
                className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'
            >
                No movies found.
            </div>
        )
    }

    return (
        <div
            className='flex flex-col gap-y-2 w-full px-6'
        >
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    className='flex items-center gap-x-4  w-full'
                >
                    <div className='flex-1'>
                        <MediaItem 
                            onClick={() => {}}
                            data={movie}
                        />
                    </div>
                    <LikeButton movieId={movie.id} />
                </div>
            ))}
        </div>
    );
}

export default SearchContent;