import type { SimplifiedRepo } from "./types";
import type { RawGitHubRepoData } from "./types";

export function simplifyRepos(raw: RawGitHubRepoData): SimplifiedRepo[] {
  return raw.user.repositories.nodes.map((node) => {
    const topics = node.repositoryTopics?.nodes?.map((n) => n.topic.name) ?? [];
    const language = node.primaryLanguage
      ? { name: node.primaryLanguage.name, color: node.primaryLanguage.color }
      : null;

    const latestCommitTarget = node.defaultBranchRef?.target;
    const latestCommit = latestCommitTarget
      ? {
          message: latestCommitTarget.message,
          date: latestCommitTarget.committedDate,
          url: latestCommitTarget.url,
        }
      : null;

    return {
      id: node.name,
      name: node.name,
      description: node.description ?? null,
      url: node.url,
      createdAt: node.createdAt,
      updatedAt: node.updatedAt,
      stars: node.stargazerCount ?? null,
      topics,
      language,
      latestCommit,
      commitCount: latestCommitTarget?.history?.totalCount ?? null,
    };
  });
}
