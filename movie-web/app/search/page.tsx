import getMoviesByTitle from '@/actions/getMoviesByTitle';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import React from 'react';
import SearchContent from './components/SearchContent';

export const revalidate = 0;

interface SearchProps {
    searchParams: {
        title: string;
    }
}

const Search = async ({searchParams}: SearchProps ) => {
    const movies = await getMoviesByTitle(searchParams.title);

    return (
        <div
            className='bg-neutral-900 h-full w-full overflow-hidden 
                overflow-y-auto text-white
            '
        >
           <Header
            className="flex items-center justify-between p-10"
            />
            <div
                className='mb-2 flex flex-col gap-y-6'
            >
                <h1
                    className='text-3xl font-semibold'
                >
                    Search
                </h1>
                <SearchInput />
            </div>
            <SearchContent 
                movies={movies}
            />
        </div>
    );
}

export default Search;