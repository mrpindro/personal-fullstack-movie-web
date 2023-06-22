import { Movie } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedMovies = async (): Promise<Movie[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies,
    });

    const { data: { session } } = await supabase.auth.getSession();

    const { data, error } = await supabase.from('liked_videos')
        .select('*, videos(*)')
        .eq('user_id', session?.user?.id)
        .order('created_at', {ascending: false});

    if (error) {
        console.log(error);
        return [];
    }

    if (!data) {
        return [];
    }

    return data.map((item) => ({
        ...item.videos
    }))
}

export default getLikedMovies;