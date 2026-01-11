export interface RawGitHubRepoData {
  name: string;
  isArchived: boolean;
  description: string | null;
  url: string;
  createdAt: string;   // ISO date
  updatedAt: string;   // ISO date
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
    color: string | null;
  } | null;

  defaultBranchRef: {
    target: Commit;
  } | null;
}

export interface Commit {
  message: string;
  committedDate: string; // ISO date
  url: string;
  history: {
    totalCount: number;
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
  error?: string;
}