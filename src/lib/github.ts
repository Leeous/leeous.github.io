export type Author = {
  login: string;
  avatarUrl: string;
};

export type Discussion = {
  number: number;
  title: string;
  body: string;
  createdAt: string;
  author: Author;
};

export interface ProjectResponse {
  user: {
    repositories: {
      nodes: {
        name: string;
        description: string | null;
        url: string;
        createdAt: string;
        updatedAt: string;
        stargazerCount: number;
        repositoryTopics: {
          nodes: {
            topic: {
              name: string;
            };
          }[];
        };
        primaryLanguage: {
          name: string;
          color: string;
        } | null;
      }[];
    };
  };
}

export type Project = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  createdAt: string;
  updatedAt: string;
  stargazerCount: number;
  topics: string[];
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  defaultBranchRef: {
    target: {
      history: {
        totalCount: number;
      }
      committedDate: string;
      message: string;
      oid: string;
      url: string;
      author: {
        name: string | null;
        email: string | null;
        user: {
          login: string;
          avatarUrl: string;
        } | null;
      } | null;
    }
  } | null;
};


export async function fetchDiscussions(): Promise<Discussion[]> {
  const res = await fetch("/.netlify/functions/getDiscussions");
  if (!res.ok) throw new Error("Failed to fetch discussions");
  return await res.json();
}

export async function fetchDiscussionByNumber(number: number): Promise<Discussion | null> {
  const res = await fetch(`/.netlify/functions/getDiscussionByNumber?number=${number}`);
  if (!res.ok) throw new Error("Failed to fetch discussion");
  return await res.json();
}

export async function fetchAllDiscussions(): Promise<Pick<Discussion, "number" | "title">[]> {
  const res = await fetch("/.netlify/functions/getAllDiscussions");
  if (!res.ok) throw new Error("Failed to fetch all discussions");
  return await res.json();
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`/.netlify/functions/getProjects`);
  if (!res.ok) throw new Error("Failed to fetch all projects");
  return await res.json();
}

export async function fetchReadme(repo_name: string): Promise<string> {
  const res = await fetch(`/.netlify/functions/getProjectReadMe?repo=${repo_name}`);
  if (res.status === 404) throw new Error("Project not found. (404)");
  if (res.status === 500) throw new Error("Internal Server Error. (500)");
  if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
  return await res.json();
}