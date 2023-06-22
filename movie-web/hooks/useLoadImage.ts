import { Movie } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (movie: Movie) => {
    const supabaseClient = useSupabaseClient();

    if (!movie) {
        return null;
    }

    const { data: imageData } = supabaseClient.storage.from('images')
        .getPublicUrl(movie.image_path);

    return imageData.publicUrl;
}

export default useLoadImage;