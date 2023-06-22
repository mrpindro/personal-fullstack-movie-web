import { Movie } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadMovieUrl = (movie: Movie) => {
    const supabaseClient = useSupabaseClient();

    if (!movie) {
        return '';
    }

    const { data: movieData } = supabaseClient.storage.from('videos')
        .getPublicUrl(movie.video_path);

    return movieData.publicUrl;
}

export default useLoadMovieUrl;