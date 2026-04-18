export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function parsePagination(
  searchParams: URLSearchParams,
  defaults = { page: 1, limit: 12 }
): Required<PaginationParams> {
  const page = Math.max(1, Number(searchParams.get('page')) || defaults.page);
  const limit = Math.min(
    100,
    Math.max(1, Number(searchParams.get('limit')) || defaults.limit)
  );
  return { page, limit };
}

export function paginationMeta(total: number, page: number, limit: number): PaginationMeta {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export function paginationOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}
