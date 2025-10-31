'use client';

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes, PER_PAGE } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import EmptyListMessage from '@/components/EmptyListMessage/EmptyListMessage';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import css from './NotesPage.module.css';
import Link from 'next/link';

interface NotesClientProps {
  category: string | /* null */ undefined;
}

const NotesClient = ({ category }: NotesClientProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.trim());
    setCurrentPage(1);
  }, 500);

  const {
    data: { notes = [], totalPages = 0 } = {},
    isFetching,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['notes', { searchQuery, tag: category, page: currentPage, perPage: PER_PAGE }],
    queryFn: () => fetchNotes(searchQuery, category, currentPage, PER_PAGE),
    placeholderData: keepPreviousData,
    refetchOnMount: false, //true - variant for new notes refetch?
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} defaultValue={searchQuery} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        {/* <button className={css.button} onClick={openModal}>
          Create note +
        </button> */}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}
      {!notes.length && !isFetching && !isError && <EmptyListMessage />}

      {/* {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )} */}
    </div>
  );
};

export default NotesClient;
