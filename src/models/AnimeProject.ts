import mongoose from "mongoose";

// Tipe yang hilang untuk model AnimeProject
export interface IAnimeProject extends mongoose.Document {
  title: string;
  slug: string;
  description: string;
  genre: string[];
  status: 'Recruiting' | 'In-Progress' | 'Completed' | 'Hiatus';
  coverImage: string;
  author: mongoose.Schema.Types.ObjectId;
  teamMembers: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Tipe untuk sumber video dari API scraper Anda
export interface IVideoSource {
  id: string;
  quality: number;
  size: string;
  format: string;
  proxyUrl: string;
}

// Tipe untuk response lengkap dari API scraper
export interface ISourceResponse {
  status: string;
  data: {
    downloads: any[];
    captions: any[];
    processedSources: IVideoSource[];
  };
}
