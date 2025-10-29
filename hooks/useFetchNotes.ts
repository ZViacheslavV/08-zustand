import { fetchNotes, PER_PAGE } from '@/lib/api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
// import { fetchNotes, PER_PAGE } from '../services/noteService';

interface UseFetchNotesOptions {
  search: string;
  tag?: string | /* null */ undefined;
  page?: number;
  perPage?: number;
  /* sortBy?: string; */
}

export const useFetchNotes = ({
  search,
  tag = undefined,
  page = 1,
  perPage = PER_PAGE,
}: /* sortBy = '', */
UseFetchNotesOptions) => {
  return useQuery({
    queryKey: ['notes', { search, tag, page, perPage /* , sortBy */ }],
    queryFn: () => fetchNotes(search, tag, page, perPage /* , sortBy */),
    placeholderData: keepPreviousData,
  });
};
