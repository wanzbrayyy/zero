const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const MOVIE_API_URL = process.env.NEXT_PUBLIC_MOVIE_API_URL || "http://localhost:5000/api";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

async function fetcher<T>(
  endpoint: string,
  method: RequestMethod = "GET",
  body?: unknown
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}/api${endpoint}`;
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "An error occurred while fetching data");
  }

  return data;
}

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    return fetcher<{ user: any; token: string }>("/auth/login", "POST", credentials);
  },

  register: async (userData: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => {
    return fetcher<{ user: any; token: string }>("/auth/register", "POST", userData);
  },

  getProfile: async () => {
    return fetcher<any>("/auth/me", "GET");
  },
};

export const projectService = {
  getAllProjects: async () => {
    return fetcher<any[]>("/projects", "GET");
  },

  getProjectBySlug: async (slug: string) => {
    return fetcher<any>(`/projects/${slug}`, "GET");
  },

  createProject: async (projectData: {
    title: string;
    description: string;
    genre: string[];
  }) => {
    return fetcher<any>("/projects", "POST", projectData);
  },

  updateProject: async (id: string, updates: Partial<any>) => {
    return fetcher<any>(`/projects/${id}`, "PUT", updates);
  },

  deleteProject: async (id: string) => {
    return fetcher<{ message: string }>(`/projects/${id}`, "DELETE");
  },
};

export const collaborationService = {
  applyToProject: async (data: {
    projectId: string;
    role: string;
    message: string;
  }) => {
    return fetcher<any>("/collaborations/apply", "POST", data);
  },

  getProjectRequests: async (projectId: string) => {
    return fetcher<any[]>(`/collaborations/project/${projectId}`, "GET");
  },

  updateRequestStatus: async (
    requestId: string,
    status: "accepted" | "rejected"
  ) => {
    return fetcher<any>(`/collaborations/${requestId}`, "PUT", { status });
  },
};

export const userService = {
  updateProfile: async (data: { bio?: string; skills?: string[]; image?: string }) => {
    return fetcher<any>("/users/profile", "PUT", data);
  },
  
  getUserProjects: async (userId: string) => {
    return fetcher<any[]>(`/users/${userId}/projects`, "GET");
  }
};

export const movieService = {
  getHomePage: async () => {
    try {
      const res = await fetch(`${MOVIE_API_URL}/homepage`);
      if (!res.ok) throw new Error("Failed to fetch homepage");
      return await res.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  getTrending: async () => {
    try {
      const res = await fetch(`${MOVIE_API_URL}/trending`);
      if (!res.ok) throw new Error("Failed to fetch trending");
      return await res.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  getVideoSource: async (id: string, season?: number, episode?: number) => {
    try {
      let url = `${MOVIE_API_URL}/sources/${id}`;
      
      const params = new URLSearchParams();
      if (season !== undefined && season !== null) params.append("season", season.toString());
      if (episode !== undefined && episode !== null) params.append("episode", episode.toString());
      
      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch source");
      return await res.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
