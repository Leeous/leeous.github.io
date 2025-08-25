import type { SimplifiedRepo } from "./types";

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

export async function fetchDiscussions(): Promise<Discussion[]> {
  const res = await fetch("/.netlify/functions/get-discussions");
  if (!res.ok) throw new Error("Failed to fetch discussions");
  return await res.json();
}

export async function fetchDiscussionByNumber(number: number): Promise<Discussion | null> {
  const res = await fetch(`/.netlify/functions/get-discussion-by-number?number=${number}`);
  if (!res.ok) throw new Error("Failed to fetch discussion");
  return await res.json();
}

export async function fetchAllDiscussions(): Promise<Pick<Discussion, "number" | "title">[]> {
  const res = await fetch("/.netlify/functions/get-all-discussions");
  if (!res.ok) throw new Error("Failed to fetch all discussions");
  return await res.json();
}

export async function fetchProjects(): Promise<SimplifiedRepo[]> {
  const res = await fetch(`/.netlify/functions/get-repos`);
  if (!res.ok) throw new Error("Failed to fetch all projects");
  return await res.json();
}

export async function fetchReadme(repo_name: string): Promise<string> {
  const res = await fetch(`/.netlify/functions/get-repo-readme?repo=${repo_name}`);
  if (res.status === 404) throw new Error("Project not found. (404)");
  if (res.status === 500) throw new Error("Internal Server Error. (500)");
  if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
  return await res.json();
}