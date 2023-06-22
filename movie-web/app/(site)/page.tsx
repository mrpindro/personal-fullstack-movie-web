import getMovies from "@/actions/getMovies";
import Header from "@/components/Header";
import PageContent from "./components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const movies = await getMovies();

  return (
    <div
      className='bg-neutral-900 text-white w-full h-full'
    >
      <Header
        className="flex items-center justify-between p-10"
      />
      <div className="h-[90vh] w-[100vw]">
        <PageContent movies={movies} />
      </div>
    </div>      
  );
}
