import { graphql } from "@octokit/graphql";
const token = import.meta.env.VITE_GITHUB_PAT;

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${token}`,
  },
});

type Author = {
  login: string;
  avatarUrl: string;
};

export type Discussion = {
  number: number;
  title: string;
  body: string;
  createdAt: string;
  author?: Author;
};

type DiscussionsResponse = {
  repository: {
    discussions: {
      nodes: Discussion[];
    };
  };
};

type SingleDiscussionResponse = {
  repository: {
    discussion: Discussion | null;
  };
};

interface AllDiscussionsResponse {
  repository: {
    discussions: {
      nodes: {
        number: number;
        title: string;
      }[];
    };
  };
}

export async function fetchDiscussions(): Promise<Discussion[]> {
  const result = await graphqlWithAuth<DiscussionsResponse>(`
    query {
      repository(owner: "Leeous", name: "leeous.github.io") {
        discussions(first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            number
            title
            body
            createdAt
            author {
              login
              avatarUrl
            }
          }
        }
      }
    }
  `);
  return result.repository.discussions.nodes;
}

export async function fetchDiscussionByNumber(number: number): Promise<Discussion | null> {
  const result = await graphqlWithAuth<SingleDiscussionResponse>(`
    query ($number: Int!) {
      repository(owner: "Leeous", name: "leeous.github.io") {
        discussion(number: $number) {
          number
          title
          body
          createdAt
          author {
            login
            avatarUrl
          }
        }
      }
    }
  `, { number });

  return result.repository.discussion;
}

export async function fetchAllDiscussions(): Promise<Pick<Discussion, "number" | "title">[]> {
  const result = await graphqlWithAuth<AllDiscussionsResponse>(`
    query {
      repository(owner: "Leeous", name: "leeous.github.io") {
        discussions(first: 100) {
          nodes {
            number
            title
          }
        }
      }
    }
  `);

  return result.repository.discussions.nodes;
}