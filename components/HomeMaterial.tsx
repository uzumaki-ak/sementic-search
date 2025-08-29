/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

// Define the Movie type
interface Movie {
  id: string;
  title: string;
  year: number;
  thumbnail: string;
  // Add other properties as needed
}

interface HomeProps {
  movies: Movie[];
}

export default function Home({ movies: initialMovies }: HomeProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const moviesPerPage = 20;
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  // Calculate movies to display for current page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Reset to page 1 when component mounts
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  // Generate page numbers for pagination controls
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Show limited page numbers with ellipsis for many pages
  const getDisplayedPages = () => {
    if (totalPages <= 7) {
      return pageNumbers;
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const displayedPages = getDisplayedPages();

  return (
    <div className="min-h-screen bg-[#f4f1e9] dark:bg-[#1a1412] py-12 px-6 transition-colors">
      <h1 className="text-center text-5xl font-bold font-serif text-[#3b2c24] dark:text-[#e9decf] mb-12 tracking-widest">
        🎞️ Vintage Semantic Search⇲
      </h1>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {currentMovies.map((movie) => (
          <Card
            key={movie.id}
            className="bg-[#fefbf7] dark:bg-[#2a201c] border border-[#d1c7b8] dark:border-[#3b3029] shadow-xl rounded-md overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl"
          >
            <CardHeader className="bg-[#e9e2d0] dark:bg-[#322822] border-b border-[#d1c7b8] dark:border-[#3b3029] p-4">
              <CardTitle className="text-2xl font-bold font-[Bebas Neue] text-[#3b2c24] dark:text-[#f5e9d8] line-clamp-1">
                <Link href={`/movie/${movie.id}`} className="hover:text-[#8b3a2d] dark:hover:text-[#d9826b] transition">
                  {movie.title}
                </Link>
              </CardTitle>
              <CardDescription className="font-[Cormorant Garamond] text-[#6b5c4a] dark:text-[#c1b09a] italic">
                {movie.year}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <div className="relative group">
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-[#3b2c24]/40 dark:bg-[#f5e9d8]/20 opacity-0 group-hover:opacity-100 transition" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-16 flex flex-wrap justify-center items-center gap-2">
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-[#d1c7b8] dark:border-[#3b3029] bg-[#fefbf7] dark:bg-[#2a201c] text-[#3b2c24] dark:text-[#e9decf] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e9e2d0] dark:hover:bg-[#322822] transition"
            aria-label="First page"
          >
            <ChevronsLeft size={20} />
          </button>
          
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-[#d1c7b8] dark:border-[#3b3029] bg-[#fefbf7] dark:bg-[#2a201c] text-[#3b2c24] dark:text-[#e9decf] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e9e2d0] dark:hover:bg-[#322822] transition"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          {displayedPages.map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => typeof pageNumber === 'number' ? paginate(pageNumber) : null}
              className={`min-w-10 h-10 rounded-md border ${
                currentPage === pageNumber
                  ? 'border-[#8b3a2d] dark:border-[#d9826b] bg-[#8b3a2d] dark:bg-[#d9826b] text-white'
                  : 'border-[#d1c7b8] dark:border-[#3b3029] bg-[#fefbf7] dark:bg-[#2a201c] text-[#3b2c24] dark:text-[#e9decf] hover:bg-[#e9e2d0] dark:hover:bg-[#322822]'
              } transition flex items-center justify-center px-2`}
              disabled={pageNumber === '...'}
            >
              {pageNumber}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-[#d1c7b8] dark:border-[#3b3029] bg-[#fefbf7] dark:bg-[#2a201c] text-[#3b2c24] dark:text-[#e9decf] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e9e2d0] dark:hover:bg-[#322822] transition"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
          
          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-[#d1c7b8] dark:border-[#3b3029] bg-[#fefbf7] dark:bg-[#2a201c] text-[#3b2c24] dark:text-[#e9decf] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e9e2d0] dark:hover:bg-[#322822] transition"
            aria-label="Last page"
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      )}

      {/* Page info */}
      <div className="mt-6 text-center text-[#6b5c4a] dark:text-[#c1b09a] font-[Cormorant Garamond] italic">
        Showing {indexOfFirstMovie + 1}-{Math.min(indexOfLastMovie, movies.length)} of {movies.length} movies
      </div>
    </div>
  );
}