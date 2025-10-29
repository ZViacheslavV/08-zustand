'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { deleteNote } from '@/lib/api';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteNote,
    onMutate: (id: string) => setDeletingId(id),
    onSettled: () => setDeletingId(null),
    onSuccess: /* deletedNote */ () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
    // queryClient.setQueryData<Note[]>(['notes'], prevNotes =>
    //   !prevNotes ? [] : prevNotes.filter(note => note.id !== deletedNote.id)
    // ),

    //     queryClient.setQueryData/* <NoteRespType> */(
    //   ['notes', { search: '', page: 1, perPage: PER_PAGE }], // key should be as in useQuery
    //   prev =>
    //     !prev
    //       ? prev
    //       : {
    //           ...prev,
    //           notes: prev.notes.filter(
    //             (note: Note) => note.id !== deletedNote.id
    //           ),
    //         }
    // ),
  });

  const handleDeleteNote = (noteId: string) => {
    deleteMutate(noteId);
  };

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, /* createdAt, */ tag /* updatedAt */ }) => (
        <li className={css.listItem} key={id}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <Link className={css.link} href={`/notes/${id}`}>
              View details
            </Link>
            <button className={css.button} onClick={() => handleDeleteNote(id)}>
              {deletingId === id ? 'Deleting' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
