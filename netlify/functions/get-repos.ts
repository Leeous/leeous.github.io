import { Handler } from "@netlify/functions";
import { graphql } from "@octokit/graphql";
import type {RawGitHubRepoData, SimplifiedRepo } from "../../src/lib/github/types";
import { simplifyRepos } from "../../src/lib/github/transforms";

const token = process.env.GITHUB_PAT!;
const graphqlWithAuth = graphql.defaults({
  headers: { authorization: `token ${token}` },
});

export const handler: Handler = async () => {
  try {
    const rawData: RawGitHubRepoData = await graphqlWithAuth(`
      query {
        user(login: "Leeous") {
          repositories(first: 20, orderBy: { field: CREATED_AT, direction: DESC }) {
            nodes { name isArchived description url createdAt updatedAt stargazerCount repositoryTopics(first: 10) { nodes { topic { name } } } primaryLanguage { name color } defaultBranchRef { target { ... on Commit { message committedDate url history { totalCount } } } } }
          }
        }
      }
    `);

    const repos: SimplifiedRepo[] = simplifyRepos(rawData);
    return {
      statusCode: 200,
      body: JSON.stringify(repos),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
