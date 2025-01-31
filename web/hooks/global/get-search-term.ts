'use client';

import { useSearchParams } from 'next/navigation';

const useGetSearchTerm = (queryName) => {
  const searchParams = useSearchParams();

  const queryParam = new URLSearchParams(searchParams.get('search') || undefined);
  const querySearchTerm = queryParam.get(queryName);

  return querySearchTerm;
};

export default useGetSearchTerm;
