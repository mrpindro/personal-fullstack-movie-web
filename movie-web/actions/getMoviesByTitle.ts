import { Movie } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getMovies from "./getMovies";

const getMoviesByTitle = async (title: string): Promise<Movie[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies,
    });

    if (!title) {
        const allMovies = await getMovies();

        return allMovies;
    }

    const { data, error } = await supabase.from('videos')
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at', {ascending: false});

    if (error) {
        console.log(error);
    }

    return (data as any) || [];
}

export default getMoviesByTitle;