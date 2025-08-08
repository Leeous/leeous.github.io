import { Handler } from '@netlify/functions';
import { graphql } from '@octokit/graphql';

const token = process.env.GITHUB_PAT!;
const graphqlWithAuth = graphql.defaults({
  headers: { authorization: `token ${token}` },
});

interface DiscussionsResponse {
  repository: {
    discussions: {
      nodes: {
        number: number;
        title: string;
        body: string;
        createdAt: string;
        author?: {
          login: string;
          avatarUrl: string;
        };
      }[];
    };
  };
}

export const handler: Handler = async () => {
  try {
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
    return {
      statusCode: 200,
      body: JSON.stringify(result.repository.discussions.nodes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch discussions', details: error }),
    };
  }
};