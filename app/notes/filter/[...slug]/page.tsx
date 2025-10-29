import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes, PER_PAGE } from '@/lib/api';
import NotesClient from './Notes.client';
import { NOTES_FILTER_ALL } from '@/lib/constants';

interface Props {
  params: Promise<{ slug: string[] }>;
}

const NotesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const category = slug[0] === NOTES_FILTER_ALL ? /* null */ undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', { search: '', tag: category, page: 1, perPage: PER_PAGE }],
    queryFn: () => fetchNotes('', category, 1, PER_PAGE),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
};

export default NotesPage;
