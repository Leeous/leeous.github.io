export interface RawGitHubRepoData {
  user: {
    repositories: {
      nodes: {
        name: string;
        isArchived: boolean;
        description?: string | null;
        url: string;
        createdAt: string;
        updatedAt: string;
        stargazerCount: number;
        repositoryTopics?: {
          nodes: { topic: { name: string; } }[]
        }
        primaryLanguage?: {
          name: string;
          color: string;
        } | null;
        defaultBranchRef?: {
          target?: {
            url: string;
            message: string;
            committedDate: string;
            history: {
              totalCount: number;
            }
          }
        }
      }[];
    };
  };
}

export interface SimplifiedRepo {
  id: string;
  name: string;
  isArchived: boolean;
  description: string | null;
  url: string;
  createdAt: string;
  updatedAt: string;
  stars: number;
  topics: string[];
  language: {
    name: string;
    color: string;
  } | null;
  latestCommit: {
    message: string;
    date: string;
    url: string;
  } | null;
  commitCount: number | null;
}