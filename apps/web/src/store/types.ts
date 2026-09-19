export interface GithubRepoSummary {
  id: number;
  full_name: string;
  description: string | null;
  stargazers_count: number;
}

export interface GithubSearchResponse {
  total_count: number;
  items: GithubRepoSummary[];
}

export interface GithubRepo {
  full_name: string;
  name: string;
  owner: { login: string };
  html_url: string;
  description: string | null;
  stargazers_count: number;
  open_issues_count: number;
}

export interface GithubCommit {
  commit: {
    committer: { date: string } | null;
    author: { date: string } | null;
  };
}

export interface RepoStats {
  stars: number;
  openIssues: number;
  lastCommitDate: string | null;
}

export interface RepoDetails extends RepoStats {
  fullName: string;
  htmlUrl: string;
  description: string | null;
}
