import { Handler } from "@netlify/functions";
import { graphql } from "@octokit/graphql";

const token = process.env.GITHUB_PAT!;
const graphqlWithAuth = graphql.defaults({
  headers: { authorization: `token ${token}` },
});

interface ProjectResponse {
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
            }
          }
        }
        primaryLanguage: {
          name: string;
          color: string;
        }
      }[];
    };
  };
}

export const handler: Handler = async () => {
  try {
    const result = await graphqlWithAuth<ProjectResponse>(`
        query {
          user(login: "Leeous") {
            repositories(first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
              nodes {
                name
                description
                url
                createdAt
                updatedAt
                stargazerCount
                  repositoryTopics(first: 5) {
                    nodes {
                      topic {
                        name
                      }
                    }
                  }
                  primaryLanguage {
                    name
                    color
                  }
                  defaultBranchRef {
                    name
                    target {
                      ... on Commit {
                        history {
                          totalCount
                        }
                        committedDate
                        message
                        oid
                        url
                        author {
                          name
                          email
                          user {
                            login
                            avatarUrl
                          }
                        }
                      }
                  }
                }
              }
            }
          }
        }
      `);
    return {
      statusCode: 200,
      body: JSON.stringify(result.user.repositories.nodes)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch projects.', details: error
      })
    }
  }
}