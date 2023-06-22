import { Movie } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getMovies = async (): Promise<Movie[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies,
    });

    const { data, error } = await supabase.from('videos').select('*').order('created_at', {ascending: false});

    if (error) {
        console.log(error);
    }

    return (data as any) || [];
}

export default getMovies;