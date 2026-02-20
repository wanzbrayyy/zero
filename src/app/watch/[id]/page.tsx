"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { NavbarDashboard } from "@/components/layout/NavbarDashboard";
import { movieService } from "@/services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlay, 
  faDownload, 
  faClosedCaptioning, 
  faArrowLeft, 
  faTv, 
  faFilm,
  faExclamationTriangle,
  faRedo
} from "@fortawesome/free-solid-svg-icons";

const formatSize = (bytes: string) => {
  const b = parseInt(bytes, 10);
  if (isNaN(b)) return "N/A";
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (b === 0) return '0 B';
  const i = Math.floor(Math.log(b) / Math.log(1024));
  return Math.round(b / Math.pow(1024, i)) + ' ' + sizes[i];
};

export default function WatchPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const id = params.id as string;
  const typeParam = searchParams.get("type");
  const title = searchParams.get("title") || "Unknown Title";
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const isSeries = typeParam === "2";

  const [sourceData, setSourceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState<any>(null);
  const [videoError, setVideoError] = useState(false);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setVideoError(false);
      setSelectedQuality(null);
      setSourceData(null);

      try {
        const reqSeason = isSeries ? season : 0;
        const reqEpisode = isSeries ? episode : 0;

        const data = await movieService.getVideoSource(id, reqSeason, reqEpisode);
        
        if (isMounted && data?.data) {
          setSourceData(data);
          
          if (data.data.processedSources && data.data.processedSources.length > 0) {
            const sortedSources = [...data.data.processedSources].sort((a: any, b: any) => b.quality - a.quality);
            const defaultSource = sortedSources.find(s => s.quality === 720) || 
                                  sortedSources.find(s => s.quality === 480) || 
                                  sortedSources[0];
            setSelectedQuality(defaultSource);
          } else {
            setSelectedQuality(null); // Reset jika tidak ada sources
          }
        } else {
          setVideoError(true); // Error jika data tidak valid
          setSelectedQuality(null);
        }
      } catch (error) {
        if (isMounted) {
          setVideoError(true); 
          console.error("Fetch error in WatchPage:", error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => { isMounted = false; };
  }, [id, isSeries, season, episode]);

  // Handler untuk error video playback
  const handleVideoError = () => {
    console.error("Video playback error detected.");
    setVideoError(true);
  };

  useEffect(() => {
    if (videoRef.current && selectedQuality) {
      console.log("Attempting to load video with URL:", selectedQuality.proxyUrl);
      videoRef.current.load();
      videoRef.current.play().catch((e) => {
        console.warn("Autoplay prevented or failed:", e);
        // Jika autoplay gagal, mungkin perlu UI khusus di sini
      });
    } else if (!selectedQuality && !loading) {
      // Jika sudah tidak loading tapi tidak ada kualitas terpilih, berarti memang tidak ada source
      setVideoError(true); // Tampilkan pesan error "No Sources Available"
    }
  }, [selectedQuality, loading]);

  if (!id) return null; // Handle jika ID tidak ada

  return (
    <div className="min-h-screen bg-background text-text pb-20 overflow-x-hidden">
      <NavbarDashboard />

      <div className="pt-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <Link href="/dashboard" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition text-sm font-medium">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
        </Link>

        <div className="mb-6">
          <h1 className="text-xl md:text-3xl font-bold mb-3 text-white leading-tight">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-400">
            <div className="bg-white/10 px-3 py-1 rounded flex items-center gap-2 border border-white/5 uppercase tracking-wide">
              {isSeries ? <><FontAwesomeIcon icon={faTv} className="text-primary"/> Series</> : <><FontAwesomeIcon icon={faFilm} className="text-primary"/> Movie</>}
            </div>
            
            {isSeries && (
              <div className="bg-primary/10 text-primary px-3 py-1 rounded border border-primary/20 tracking-wide font-bold">
                SEASON {season} <span className="mx-1 text-gray-600">|</span> EPISODE {episode}
              </div>
            )}
          </div>
        </div>

        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800 relative group">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080808] z-20">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-3"></div>
              <p className="text-xs text-gray-500 uppercase tracking-widest animate-pulse">Loading Stream...</p>
            </div>
          ) : videoError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#080808] z-10">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-red-600 mb-4" />
              <p className="text-white font-bold text-base mb-2">Stream Error</p>
              <p className="text-gray-500 text-xs max-w-md mb-6">
                Could not load the video stream. Try reloading or checking the direct link.
              </p>
              {selectedQuality && (
                <div className="flex gap-3">
                   <button 
                    onClick={() => { setVideoError(false); videoRef.current?.load(); }}
                    className="px-6 py-2 bg-white text-black text-xs font-bold rounded hover:bg-gray-200 transition"
                  >
                    Retry
                  </button>
                  <a 
                    href={selectedQuality.proxyUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-primary hover:bg-red-700 text-white text-xs font-bold rounded transition"
                  >
                    Direct Link
                  </a>
                </div>
              )}
            </div>
          ) : selectedQuality ? (
            <video 
              ref={videoRef}
              className="w-full h-full object-contain focus:outline-none bg-black"
              controls 
              autoPlay
              playsInline
              preload="auto"
              controlsList="nodownload"
              onError={handleVideoError}
              src={selectedQuality.proxyUrl}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#080808]">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-3xl text-gray-700 mb-3" />
              <p className="text-gray-400 text-sm font-bold">No Sources Available</p>
              <p className="text-gray-600 text-xs mt-1">
                {isSeries ? "This episode might not be released yet, or no valid sources were found." : "No valid video sources were found for this movie."}
              </p>
            </div>
          )}
        </div>

        {isSeries && (
          <div className="mt-6 bg-[#121212] p-6 rounded-xl border border-gray-800">
            <div className="flex flex-col sm:flex-row items-end gap-4">
              <div className="w-full sm:w-auto">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5 block">Season</label>
                <div className="flex items-center bg-black rounded border border-gray-700 w-full sm:w-28 h-10">
                  <div className="bg-gray-900 h-full px-3 flex items-center justify-center text-gray-400 font-bold text-xs border-r border-gray-700 select-none">S</div>
                  <input 
                    type="number" 
                    min="1" 
                    value={season} 
                    onChange={(e) => setSeason(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-transparent text-white text-center font-bold focus:outline-none p-1"
                  />
                </div>
              </div>
              
              <div className="w-full sm:w-auto">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5 block">Episode</label>
                <div className="flex items-center bg-black rounded border border-gray-700 w-full sm:w-28 h-10">
                  <div className="bg-gray-900 h-full px-3 flex items-center justify-center text-gray-400 font-bold text-xs border-r border-gray-700 select-none">E</div>
                  <input 
                    type="number" 
                    min="1" 
                    value={episode} 
                    onChange={(e) => setEpisode(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-transparent text-white text-center font-bold focus:outline-none p-1"
                  />
                </div>
              </div>

              <button 
                onClick={() => window.location.reload()} 
                className="h-10 w-full sm:w-auto px-6 bg-primary hover:bg-red-700 text-white text-xs font-bold rounded shadow-lg shadow-primary/20 transition-all active:scale-95 sm:ml-auto uppercase tracking-wide flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faRedo} /> Reload
              </button>
            </div>
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-wide">
              <FontAwesomeIcon icon={faDownload} /> Stream Options
            </h3>
            
            <div className="bg-[#121212] rounded-xl border border-gray-800 overflow-hidden shadow-lg">
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap min-w-[500px]">
                  <thead>
                    <tr className="bg-black/40 text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                      <th className="p-4 pl-6">Quality</th>
                      <th className="p-4">Size</th>
                      <th className="p-4 text-center">Format</th>
                      <th className="p-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50 text-sm">
                    {sourceData?.data?.processedSources && sourceData.data.processedSources.length > 0 ? (
                      sourceData.data.processedSources.map((src: any) => (
                        <tr 
                          key={src.id} 
                          className={`hover:bg-white/5 transition duration-200 cursor-pointer ${selectedQuality?.id === src.id ? 'bg-primary/5' : ''}`}
                          onClick={() => { setSelectedQuality(src); setVideoError(false); }}
                        >
                          <td className="p-4 pl-6">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${src.quality >= 1080 ? 'text-primary bg-primary/10 border border-primary/20' : 'text-gray-300 bg-gray-800'}`}>
                              {src.quality}p
                            </span>
                          </td>
                          <td className="p-4 text-gray-400 font-mono text-xs">{formatSize(src.size)}</td>
                          <td className="p-4 text-gray-500 text-[10px] font-bold text-center uppercase">{src.format}</td>
                          <td className="p-4 pr-6 text-right">
                            <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                              <button 
                                onClick={() => { setSelectedQuality(src); setVideoError(false); }}
                                className={`h-8 px-4 text-[10px] font-bold uppercase rounded border transition flex items-center gap-2 
                                  ${selectedQuality?.id === src.id 
                                    ? 'bg-white text-black border-white' 
                                    : 'bg-transparent border-gray-600 text-gray-300 hover:border-white hover:text-white'}`}
                              >
                                <FontAwesomeIcon icon={faPlay} /> Play
                              </button>
                              <a 
                                href={src.proxyUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="h-8 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 text-[10px] font-bold uppercase rounded flex items-center gap-2 transition border border-gray-700"
                              >
                                <FontAwesomeIcon icon={faDownload} /> DL
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      // Tampilkan pesan jika tidak ada sumber tapi juga tidak error dan tidak loading
                      !loading && !videoError && (!sourceData?.data?.processedSources || sourceData.data.processedSources.length === 0) && (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-gray-500 text-xs italic">
                            No valid sources found.
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2 uppercase tracking-wide">
              <FontAwesomeIcon icon={faClosedCaptioning} className="text-gray-500" /> Subtitles
            </h3>
            
            <div className="bg-[#121212] rounded-xl border border-gray-800 overflow-hidden shadow-lg h-[400px] flex flex-col">
              <div className="overflow-y-auto p-2 scrollbar-hide flex-1">
                {sourceData?.data?.captions && sourceData.data.captions.length > 0 ? (
                  <div className="space-y-1">
                    {sourceData.data.captions.map((cap: any, index: number) => (
                      <a 
                        key={cap.id || index}
                        href={cap.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-transparent hover:bg-white/5 rounded-lg transition group"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <span className="text-[9px] font-black text-black bg-gray-400 px-1.5 py-0.5 rounded uppercase w-8 text-center">{cap.lan}</span>
                          <span className="text-gray-400 font-medium text-xs truncate group-hover:text-white transition-colors">{cap.lanName || cap.lan}</span>
                        </div>
                        <FontAwesomeIcon icon={faDownload} className="text-gray-700 group-hover:text-primary text-xs transition-colors" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-600 text-xs italic p-6">
                    <p>{!loading ? "No subtitles found." : "Scanning..."}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
