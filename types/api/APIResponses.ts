export interface PaginatedResponse<T extends Array<any> = any[]> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}
