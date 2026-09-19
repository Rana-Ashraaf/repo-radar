import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  GithubCommit,
  GithubRepo,
  GithubRepoSummary,
  GithubSearchResponse,
  RepoDetails,
} from './types';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  tagTypes: ['RepoDetails'],
  endpoints: (builder) => ({
    searchRepositories: builder.query<GithubRepoSummary[], string>({
      query: (q) =>
        `/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=20`,
      transformResponse: (response: GithubSearchResponse) => response.items,
    }),

    getRepoDetails: builder.query<RepoDetails, string>({
      queryFn: async (fullName, _api, _extraOptions, baseQuery) => {
        const repoResult = await baseQuery(`/repos/${fullName}`);
        if (repoResult.error) return { error: repoResult.error };

        const commitsResult = await baseQuery(`/repos/${fullName}/commits?per_page=1`);
        if (commitsResult.error) return { error: commitsResult.error };

        const repo = repoResult.data as GithubRepo;
        const commits = commitsResult.data as GithubCommit[];
        const lastCommit = commits[0]?.commit;

        return {
          data: {
            fullName: repo.full_name,
            htmlUrl: repo.html_url,
            description: repo.description,
            stars: repo.stargazers_count,
            openIssues: repo.open_issues_count,
            lastCommitDate: lastCommit?.committer?.date ?? lastCommit?.author?.date ?? null,
          },
        };
      },
      providesTags: (_result, _error, fullName) => [{ type: 'RepoDetails', id: fullName }],
    }),
  }),
});

export const { useSearchRepositoriesQuery, useGetRepoDetailsQuery } = githubApi;
