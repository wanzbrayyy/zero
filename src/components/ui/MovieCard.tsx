import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface MovieCardProps {
  id: string | number;
  title: string;
  image: string;
  rating?: number | string;
  subjectType?: number | string; 
  year?: string | number;
}

export const MovieCard = ({ id, title, image, rating, subjectType, year }: MovieCardProps) => {
  const numRating = Number(rating);
  const isValidRating = !isNaN(numRating) && numRating > 0;

  return (
    <Link 
      href={`/watch/${id}?type=${subjectType}&title=${encodeURIComponent(title)}`} 
      className="group relative block w-full aspect-[2/3] bg-gray-900 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
        {isValidRating && (
          <div className="bg-black/70 backdrop-blur-sm text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm">
            <FontAwesomeIcon icon={faStar} className="w-2 h-2" />
            <span>{numRating.toFixed(1)}</span>
          </div>
        )}
        <div className="bg-primary/80 backdrop-blur-sm text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
          HD
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-3 flex flex-col justify-end">
        <h3 className="text-white text-xs md:text-sm font-bold leading-tight line-clamp-2 drop-shadow-md group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center justify-between mt-1.5 text-[10px] text-gray-300 font-medium">
          <span className="truncate">{Number(subjectType) === 2 ? 'TV Series' : 'Movie'}</span>
          {year && <span>{year}</span>}
        </div>
      </div>
    </Link>
  );
};
