import { Handler } from '@netlify/functions';
import { graphql } from '@octokit/graphql';

const token = process.env.GITHUB_PAT!;
const graphqlWithAuth = graphql.defaults({
  headers: { authorization: `token ${token}` },
});

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

export const handler: Handler = async () => {
  try {
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

    return {
      statusCode: 200,
      body: JSON.stringify(result.repository.discussions.nodes),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch all discussions', details: err }),
    };
  }
};