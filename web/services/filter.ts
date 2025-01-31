// https://github.com/fastschema/dash/blob/master/src/lib/types/content.ts

export type FilterOperator =
  | '$eq'
  | '$neq'
  | '$gt'
  | '$gte'
  | '$lt'
  | '$lte'
  | '$like'
  | '$in'
  | '$nin'
  | '$null';
export type FilterValue =
  | string
  | number
  | boolean
  | null
  | string[]
  | number[]
  | boolean[]
  | null[];

export type FilterObject = {
  [k in FilterOperator]: FilterValue;
};

export interface Filter {
  [key: string]: FilterObject | FilterValue | Filter[] | undefined;
  $or?: Filter[];
  $and?: Filter[];
}

export interface FilterParams {
  filter?: Filter;
  page?: number;
  limit?: number;
  sort?: string;
  select?: string;
}

export const getContentFilterQuery = (params?: FilterParams) => {
  const query: { [k: string]: any } = {};
  params?.limit && (query['limit'] = params.limit);
  params?.page && (query['page'] = params.page);
  params?.sort && (query['sort'] = params.sort);
  params?.select && (query['select'] = params.select);
  params?.filter && (query['filter'] = JSON.stringify(params.filter));
  return new URLSearchParams(query).toString();
};
