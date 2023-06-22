"use client"; 
import MovieItem from '@/components/MovieItem';
import useOnPlay from '@/hooks/useOnPlay';
import { useUser } from '@/hooks/useUser';
import { Movie } from '@/types';
import { useRouter } from 'next/navigation';
import React from 'react';

interface PageContentProps {
    movies: Movie[];
}

const PageContent: React.FC<PageContentProps> = ({ movies }) => {
    const router = useRouter();
    const { user } = useUser();
    const onPlay = useOnPlay(movies);
    if (movies.length === 0) {
        return (
            <div
                className='mt-4 text-neutral-400'
            >
                No movies available
            </div>
        )
    }

    const onClick = () => {
        if(!user) {
            return;
        } else {
            router.push('/videoplayer')
        }
    }
    return (
        <div
            onClick={onClick}
            className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 
                xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4
            '
        >
            {movies.map((item) => (
                <MovieItem 
                    key={item.id}
                    onClick={(id: string) => onPlay(id)}
                    data={item}
                />
            ))}
        </div>
    );
}

export default PageContent;