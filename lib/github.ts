export interface RepoStats {
  stars: number;
  license?: string;
  pushedAt: string;
  latestRelease?: string;
}

const init = {
  headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
  next: { revalidate: 86400 },
};

/** Ne lève jamais : `null` si GitHub ne répond pas, pour que ni le rendu ni le build n'en dépendent. */
export async function getRepoStats(repoUrl: string): Promise<RepoStats | null> {
  const api = `https://api.github.com/repos/${new URL(repoUrl).pathname.slice(1)}`;

  try {
    const [repoResponse, releaseResponse] = await Promise.all([
      fetch(api, init),
      fetch(`${api}/releases/latest`, init).catch(() => null),
    ]);

    if (!repoResponse.ok) {
      return null;
    }

    const repo = await repoResponse.json();
    const release = releaseResponse?.ok ? await releaseResponse.json().catch(() => null) : null;
    const license = repo.license?.spdx_id;

    return {
      stars: repo.stargazers_count,
      license: license && license !== 'NOASSERTION' ? license : undefined,
      pushedAt: repo.pushed_at,
      latestRelease: release?.tag_name,
    };
  } catch {
    return null;
  }
}
