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
  console.log(repo_name)

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
      console.log(result)
      return {
        statusCode: 200,
        body: JSON.stringify(result.repository.object.text ?? ""),
      }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: "Failed to fetch project README.md.", details: error})
    }

  }
}