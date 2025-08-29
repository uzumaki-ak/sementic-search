"use client";

import React, { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";
// 👇 import package and optimized styles
import { SearchBar } from "@upstash/search-ui";
import "@upstash/search-ui/dist/index.css";

import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { Search } from "@upstash/search";

type Movie = {
  title: string;
  year: number;
  cast: string[];
  genres: string[];
  extract: string;
  thumbnail: string;
};

type Metadata = {
  id: string;
  thumbnail: string;
  thumbnail_width: number;
  thumbnail_height: number;
};

export const SearchClient = new Search({
  url: process.env.NEXT_PUBLIC_UPSTASH_SEARCH_REST_URL,
  token: process.env.NEXT_PUBLIC_UPSTASH_SEARCH_READ_TOKEN,
});

//  your search index name look on data browser there will be an index name write it exactly
const index = SearchClient.index<Movie, Metadata>("semantic-mov-search",);

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  //this useffect now listens for ur keboard when u type word ctrl+k or cmd+k it opens the search dialog

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  
  return (
    <div className="relative">
      {/* Vintage ornamental border */}
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-amber-800 via-yellow-700 to-amber-800 dark:from-amber-600 dark:via-yellow-500 dark:to-amber-600"></div>
      <div className="absolute inset-x-0 top-2 h-px bg-amber-900 dark:bg-amber-400"></div>
      
      {/* Desktop version */}
      <div className="hidden md:block container mx-auto py-12 flex justify-between items-center relative">
        {/* Vintage decorative elements */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 border-2 border-amber-700 dark:border-amber-300 rotate-45 opacity-30"></div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 border-2 border-amber-700 dark:border-amber-300 rotate-45 opacity-30"></div>
        
        <Link href="/" className="relative">
          <div className="text-center">
            {/* Vintage ornamental line above */}
            <div className="flex justify-center items-center mb-2">
              <div className="w-12 h-px bg-amber-700 dark:bg-amber-300"></div>
              <div className="w-2 h-2 bg-amber-700 dark:bg-amber-300 rounded-full mx-2"></div>
              <div className="w-12 h-px bg-amber-700 dark:bg-amber-300"></div>
            </div>
            
            {/* Main title with vintage typography */}
            <h1 className="text-5xl font-bold font-serif text-amber-900 dark:text-amber-100 tracking-wide relative">
              <span className="relative z-10">Cine</span>
              <span className="text-yellow-700 dark:text-yellow-400 relative z-10">Vault</span>
              {/* Vintage text shadow effect */}
              <div className="absolute inset-0 text-amber-800 dark:text-amber-200 opacity-20 transform translate-x-1 translate-y-1 -z-10 font-serif font-bold text-5xl tracking-wide">
                CineVault
              </div>
            </h1>
            
            {/* Vintage subtitle */}
            <p className="text-sm text-amber-700 dark:text-amber-300 font-serif italic mt-1 tracking-widest">
              ✦ CINEMATOGRAPHIC ARCHIVES ✦
            </p>
            
            {/* Vintage ornamental line below */}
            <div className="flex justify-center items-center mt-2">
              <div className="w-12 h-px bg-amber-700 dark:bg-amber-300"></div>
              <div className="w-2 h-2 bg-amber-700 dark:bg-amber-300 rounded-full mx-2"></div>
              <div className="w-12 h-px bg-amber-700 dark:bg-amber-300"></div>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <div className="w-64 relative">
            {/* Vintage frame around search */}
            <div className="absolute inset-0 border-2 border-amber-700 dark:border-amber-300 rounded-lg transform rotate-1"></div>
            <div className="absolute inset-0 border border-yellow-600 dark:border-yellow-400 rounded-lg transform -rotate-1"></div>
            
            <div className="relative z-10 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-600 dark:border-amber-400">
              <SearchBar.Dialog open={open} onOpenChange={setOpen}>
                <SearchBar.DialogTrigger placeholder="Search movies..." />

                <SearchBar.DialogContent>
                  <SearchBar.Input placeholder="Type to search movies..." />
                  <SearchBar.Results
                    searchFn={(query) => {
                      // 👇 100% type-safe: whatever you return here is
                      // automatically typed as `result` below
                      return index.search({ query, limit: 10, reranking: true });
                    }}
                  >
                    {(result) => (
                      <SearchBar.Result
                      //when clicked on movie showing that movie page and closing the dialog
                        onSelect={() => {
                          router.push(`/movie/${result.metadata?.id}`);
                          setOpen(false);
                        }}
                        value={result.id}
                        key={result.id}
                      >
                        <SearchBar.ResultIcon>
                          <FileText className="text-gray-600" />
                        </SearchBar.ResultIcon>

                        <SearchBar.ResultContent>
                          <SearchBar.ResultTitle>
                            {result.content.title}
                          </SearchBar.ResultTitle>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {result.score.toFixed(2)}% match
                          </p>
                        </SearchBar.ResultContent>
                      </SearchBar.Result>
                    )}
                  </SearchBar.Results>
                </SearchBar.DialogContent>
              </SearchBar.Dialog>
            </div>
          </div>

          {/* Vintage theme toggle with ornamental frame */}
          <div className="relative">
            <div className="absolute inset-0 w-10 h-10 border border-amber-600 dark:border-amber-400 rounded-full transform rotate-12"></div>
            <div className="relative z-10">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile version - only search and toggle */}
      <div className="md:hidden container mx-auto py-6 px-4 flex justify-center items-center gap-4">
        <div className="flex-1 max-w-sm">
          <SearchBar.Dialog open={open} onOpenChange={setOpen}>
            <SearchBar.DialogTrigger placeholder="Search movies..." />

            <SearchBar.DialogContent>
              <SearchBar.Input placeholder="Type to search movies..." />
              <SearchBar.Results
                searchFn={(query) => {
                  return index.search({ query, limit: 10, reranking: true });
                }}
              >
                {(result) => (
                  <SearchBar.Result
                    onSelect={() => {
                      router.push(`/movie/${result.metadata?.id}`);
                      setOpen(false);
                    }}
                    value={result.id}
                    key={result.id}
                  >
                    <SearchBar.ResultIcon>
                      <FileText className="text-gray-600" />
                    </SearchBar.ResultIcon>

                    <SearchBar.ResultContent>
                      <SearchBar.ResultTitle>
                        {result.content.title}
                      </SearchBar.ResultTitle>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {result.score.toFixed(2)}% match
                      </p>
                    </SearchBar.ResultContent>
                  </SearchBar.Result>
                )}
              </SearchBar.Results>
            </SearchBar.DialogContent>
          </SearchBar.Dialog>
        </div>

        <ThemeToggle />
      </div>
      
      {/* Bottom vintage border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-amber-900 dark:bg-amber-400"></div>
      <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-amber-800 via-yellow-700 to-amber-800 dark:from-amber-600 dark:via-yellow-500 dark:to-amber-600 transform translate-y-2"></div>
    </div>
  );
};

export default Navbar;