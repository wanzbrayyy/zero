export interface ISubject {
  subjectId: string;
  subjectType: number;
  title: string;
  description: string;
  cover: {
    url: string;
    width: number;
    height: number;
  };
  countryName?: string;
  imdbRatingValue?: string;
  genre?: string;
}

export interface IHomeItem {
  id: string;
  title: string;
  image: {
    url: string;
  };
  subjectId: string;
  subjectType: number;
}

export interface IOperatingItem {
  type: string;
  title: string;
  banner?: {
    items: IHomeItem[];
  };
  subjects?: ISubject[];
}

export interface IHomeResponse {
  data: {
    operatingList: IOperatingItem[];
  };
}

export interface ITrendingResponse {
  data: {
    subjectList: ISubject[];
  };
}

// ... interface sebelumnya ...

export interface IVideoSource {
  id: string;
  quality: number;
  directUrl: string;
  proxyUrl: string; // Kita akan pakai ini
  size: string;
  format: string;
}

export interface ICaption {
  id: string;
  lan: string;
  lanName: string;
  url: string;
}

export interface ISourceResponse {
  data: {
    downloads: any[];
    captions: ICaption[];
    processedSources: IVideoSource[];
  };
}
