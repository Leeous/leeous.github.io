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