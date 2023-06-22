import { Movie } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const useGetMovieById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState<Movie | undefined>(undefined);
    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        if (!id) {
            return;
        }

        setIsLoading(true);

        const fetchMovie = async () => {
            const { data, error } = await supabaseClient.from('videos')
                .select('*')
                .eq('id', id)
                .single();
            
            if (error) {
                setIsLoading(false);
                return toast.error(error.message);
            }

            setMovie(data as Movie);
            setIsLoading(false);
        }

        fetchMovie();
    }, [id, supabaseClient]);

    return useMemo(() => ({
        isLoading,
        movie
    }), [isLoading, movie]);
}

export default useGetMovieById;