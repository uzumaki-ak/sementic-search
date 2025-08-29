/* eslint-disable @next/next/no-img-element */
import prisma from "@/lib/db";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

const IDPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const movie = await prisma.movie.findUnique({
    where: { id },
  });

  if (!movie) {
    return (
      <div className="container mx-auto py-8">
        <Card className="bg-[#fefbf7] dark:bg-[#2a201c] border border-[#d1c7b8] dark:border-[#3b3029] shadow-lg">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-[#3b2c24] dark:text-[#f5e9d8]">
              Movie not found
            </h1>
            <Link
              href="/"
              className="text-[#8b3a2d] dark:text-[#d9826b] hover:underline mt-4 inline-block font-serif"
            >
              ← Back to movies
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Link
        href="/"
        className="text-[#8b3a2d] dark:text-[#d9826b] hover:underline mb-6 inline-block font-serif"
      >
        ← Back to movies
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Poster */}
        <div className="lg:col-span-1">
          <Card className="bg-[#fefbf7] dark:bg-[#2a201c] border border-[#d1c7b8] dark:border-[#3b3029] shadow-xl">
            <CardContent className="p-0">
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className="w-full h-auto object-cover rounded-md"
              />
            </CardContent>
          </Card>
        </div>

        {/* Movie Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#fefbf7] dark:bg-[#2a201c] border border-[#d1c7b8] dark:border-[#3b3029] shadow-md">
            <CardHeader>
              <CardTitle className="text-4xl font-bold font-serif text-[#3b2c24] dark:text-[#f5e9d8] tracking-wide">
                {movie.title}
              </CardTitle>
              <CardDescription className="text-lg font-[Cormorant Garamond] italic text-[#6b5c4a] dark:text-[#c1b09a]">
                {movie.year}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Genres */}
          <Card className="bg-[#fefbf7] dark:bg-[#2a201c] border border-[#d1c7b8] dark:border-[#3b3029]">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-[#3b2c24] dark:text-[#f5e9d8]">
                Genres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-4 py-1 border border-[#3b2c24] dark:border-[#c1b09a] text-[#3b2c24] dark:text-[#f5e9d8] font-[Cormorant Garamond] text-sm uppercase tracking-wider shadow-sm bg-[#f9f6ef] dark:bg-[#1c1613]"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cast */}
          <Card className="bg-[#fefbf7] dark:bg-[#2a201c] border border-[#d1c7b8] dark:border-[#3b3029]">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-[#3b2c24] dark:text-[#f5e9d8]">
                Cast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {movie.cast.map((actor, index) => (
                  <li
                    key={index}
                    className="font-[Cormorant Garamond] text-[#3b2c24] dark:text-[#e9decf] border-b border-[#d1c7b8] dark:border-[#3b3029] pb-1"
                  >
                    {actor}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Plot Summary */}
          <Card className="bg-[#fefbf7] dark:bg-[#2a201c] border border-[#d1c7b8] dark:border-[#3b3029]">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-[#3b2c24] dark:text-[#f5e9d8]">
                Plot Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed font-[Cormorant Garamond] text-[#4a3f35] dark:text-[#d9cbb7]">
                {movie.extract}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IDPage;
