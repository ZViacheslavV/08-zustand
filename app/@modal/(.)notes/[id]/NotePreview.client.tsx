'use client';

import { useParams } from 'next/navigation';
import css from './NotePreview.module.css';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const NotePreview = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const closeModal = useCallback(() => {
    router.back();
  }, [router]);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const formattedDate = note
    ? new Date(note.createdAt).toLocaleString('uk-UA', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={closeModal}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>
        <span className={css.tag}>{note.tag}</span>
      </div>
      <button onClick={closeModal} className={css.backBtn}>
        Close
      </button>
    </Modal>
  );
};

export default NotePreview;
