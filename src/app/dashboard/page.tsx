"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NavbarDashboard } from "@/components/layout/NavbarDashboard";
import { movieService } from "@/services/api";
import { MovieCard } from "@/components/ui/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faPlay, faInfoCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [greeting, setGreeting] = useState("");
  const [userName, setUserName] = useState("Creator");
  const [homeData, setHomeData] = useState<any>(null);
  const [trendingData, setTrendingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [homeError, setHomeError] = useState<string | null>(null);
  const [trendingError, setTrendingError] = useState<string | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserName(parsed.username || parsed.firstName || "Creator");
      } catch (e) {
        setUserName("Creator");
      }
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const homePromise = movieService.getHomePage();
        const trendingPromise = movieService.getTrending();

        const [home, trending] = await Promise.all([homePromise, trendingPromise]);

        if (home && home.status === 'success') {
          setHomeData(home);
        } else {
          setHomeError(home?.message || "Failed to fetch homepage data.");
        }

        if (trending && trending.status === 'success') {
          setTrendingData(trending);
        } else {
          setTrendingError(trending?.message || "Failed to fetch trending data.");
        }
        
      } catch (e: any) {
        setHomeError(e.message || "An unexpected error occurred.");
        setTrendingError(e.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const heroItem = homeData?.data?.operatingList?.find(
    (op: any) => op.type === "BANNER" && op.banner?.items?.length > 0
  )?.banner.items[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text pb-20 overflow-x-hidden w-full max-w-[100vw]">
      <NavbarDashboard />

      {heroItem ? (
        <div className="relative w-full h-[60vh] md:h-[80vh] min-h-[400px]">
          <div className="absolute inset-0">
            <img 
              src={heroItem.image.url} 
              alt={heroItem.title} 
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent"></div>
          </div>

          <div className="absolute bottom-0 left-0 w-full px-4 md:px-12 pb-8 z-10">
            <div className="max-w-xl">
              <span className="inline-block px-2 py-1 bg-primary text-white text-[10px] font-bold rounded mb-2 tracking-wider uppercase">
                #1 Featured
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-white leading-tight drop-shadow-lg line-clamp-2">
                {heroItem.title}
              </h1>
              
              <div className="flex items-center gap-2 mb-4 text-xs font-medium text-gray-300">
                 <span className="text-green-400 font-bold">98% Match</span>
                 <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                 <span>2024</span>
                 <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                 <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] text-white">HD</span>
              </div>

              <div className="flex gap-3">
                <Link 
                  href={`/watch/${heroItem.subjectId}?type=${heroItem.subjectType}&title=${encodeURIComponent(heroItem.title)}`}
                  className="px-5 py-2.5 bg-white text-black hover:bg-gray-200 font-bold text-sm rounded flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faPlay} /> Play
                </Link>
                <Link 
                  href={`/info/${heroItem.subjectId}`}
                  className="px-5 py-2.5 bg-gray-600/60 hover:bg-gray-600/80 text-white font-bold text-sm rounded flex items-center gap-2 backdrop-blur-sm"
                >
                  <FontAwesomeIcon icon={faInfoCircle} /> Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl mb-4" />
          <p className="text-lg font-semibold">Could not load featured content.</p>
          {homeError && <p className="text-sm mt-2">{homeError}</p>}
        </div>
      )}

      <div className="pl-4 md:pl-12 mt-6 space-y-8">
        <div className="pr-4 md:pr-12">
          <h2 className="text-lg md:text-xl font-light text-gray-300">
            {greeting}, <span className="font-bold text-white">{userName}</span>
          </h2>
        </div>

        {trendingData?.data?.items && trendingData.data.items.length > 0 ? (
          <section className="w-full">
            <h3 className="text-sm md:text-lg font-bold text-white flex items-center gap-2 mb-3">
              Trending Now <FontAwesomeIcon icon={faFire} className="text-primary text-xs" />
            </h3>
            <div className="flex overflow-x-auto gap-3 pb-4 pr-4 scrollbar-hide snap-x">
              {trendingData.data.items.map((item: any) => (
                <div key={item.subjectId} className="w-[110px] sm:w-[130px] md:w-[160px] lg:w-[180px] flex-none snap-start">
                  <MovieCard 
                    id={item.subjectId}
                    title={item.title}
                    image={item.cover?.url || item.stills?.url || ""}
                    rating={item.imdbRatingValue}
                    subjectType={item.subjectType}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : trendingError ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-3xl mb-3" />
            <p className="text-sm">Could not load trending movies.</p>
            <p className="text-xs">{trendingError}</p>
          </div>
        ) : !isLoading && (!trendingData || !trendingData.data || !trendingData.data.items) && (
           <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-3xl mb-3" />
            <p className="text-sm">No trending movies found.</p>
          </div>
        )}


        {homeData?.data?.operatingList?.map((op: any, index: number) => {
          if (op.subjects && op.subjects.length > 0) {
            return (
              <section key={index} className="w-full">
                <h3 className="text-sm md:text-lg font-bold mb-3 text-white">
                  {op.title}
                </h3>
                <div className="flex overflow-x-auto gap-3 pb-4 pr-4 scrollbar-hide snap-x">
                  {op.subjects.map((item: any) => (
                    <div key={item.subjectId} className="w-[110px] sm:w-[130px] md:w-[160px] flex-none snap-start">
                      <MovieCard 
                        id={item.subjectId}
                        title={item.title}
                        image={item.cover?.url || item.stills?.url || ""}
                        rating={item.imdbRatingValue}
                        subjectType={item.subjectType}
                      />
                    </div>
                  ))}
                </div>
              </section>
            );
          }
          return null;
        })}
        
        {homeError && !heroItem && (
           <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-3xl mb-3" />
            <p className="text-sm">Could not load homepage sections.</p>
            <p className="text-xs">{homeError}</p>
          </div>
        )}
      </div>
    </div>
  );
}
