import { appConfig } from "../config/app.config.js";

export interface PageParams {
  page: number;
  limit: number;
  offset: number;
}

/**
 * Parses ?page=&limit= query params into safe, bounded values.
 * Never trusts the client's limit beyond the configured ceiling.
 */
export function parsePagination(query: Record<string, unknown>): PageParams {
  const page = Math.max(1, Number(query.page) || appConfig.pagination.defaultPage);
  const requestedLimit = Number(query.limit) || appConfig.pagination.defaultLimit;
  const limit = Math.min(Math.max(1, requestedLimit), appConfig.pagination.maxLimit);
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

export function buildPaginatedResult<T>(
  items: T[],
  total: number,
  { page, limit }: PageParams
) {
  return {
    items,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
