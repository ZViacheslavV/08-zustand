import { fetchNoteById } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
// import NoteDetailsClient from '../../../notes/[id]/NoteDetails.client';
// import Modal from '@/components/Modal/Modal';
import NotePreview from './NotePreview.client';
/* import { GRAPH_IMAGE_URL, SITE_URL } from '@/lib/constants';
import { Metadata } from 'next'; */

type Props = {
  params: Promise<{ id: string }>;
};

/* export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;
  const { title, content } = await fetchNoteById(id);

  return {
    title: `Note: ${title}`,
    description: content,
    openGraph: {
      title: `Note: ${title}`,
      description: content,
      url: `${SITE_URL}/notes/filter/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: GRAPH_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: 'Note image',
        },
      ],
    },
  };
}; */

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
};

export default NoteDetails;
