import { Handler } from "@netlify/functions";
import { graphql } from "@octokit/graphql";

const graphqlWithAuth = graphql.defaults({
  headers: { authorization: `token ${process.env.GITHUB_PAT}`}
})

interface ProjectReadmeResponse {
  repository: {
    object: {
      text: string
    }
  }
}

export const handler: Handler = async (event) => {
  const repo_name = event.queryStringParameters?.repo;
  if (!repo_name) {
    return {
      statusCode: 400,
      body: JSON.stringify({error: "Missing repo name."}),
    };
  }

  try {
    const result = await graphqlWithAuth<ProjectReadmeResponse>(`
        query GetReadme($repo_name: String!) {
          repository(owner: "Leeous", name: $repo_name) {
            object(expression: "HEAD:README.md") {
              ... on Blob {
                text
              }
            }
          }
        }
      `, { repo_name });
      
      // Repo exists but no README.md
      if (!result.repository.object) {
        return {
          statusCode: 404,
          body: JSON.stringify({ hasReadme: false, content: null }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(result.repository.object.text ?? ""),
      }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({error: "Failed to fetch project README.md."})
    }

  }
}