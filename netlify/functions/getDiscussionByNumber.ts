import { Handler } from '@netlify/functions';
import { graphql } from '@octokit/graphql';

const token = process.env.GITHUB_PAT!;
const graphqlWithAuth = graphql.defaults({
  headers: { authorization: `token ${token}` },
});

interface SingleDiscussionResponse {
  repository: {
    discussion: {
      number: number;
      title: string;
      body: string;
      createdAt: string;
      author?: {
        login: string;
        avatarUrl: string;
      };
    } | null;
  };
}

export const handler: Handler = async (event) => {
  const number = parseInt(event.queryStringParameters?.number || '', 10);
  if (isNaN(number)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing or invalid number' }),
    };
  }

  try {
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

    return {
      statusCode: 200,
      body: JSON.stringify(result.repository.discussion),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch discussion', details: err }),
    };
  }
};
