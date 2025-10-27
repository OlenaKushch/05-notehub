import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import css from './App.module.css';

import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import SearchBox from '../SearchBox/SearchBox';
import Loader from '../../Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSearch = useDebouncedCallback(
    (value: string) => {
      setSearchQuery(value)
    }, 600
  );

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", page, searchQuery, perPage],
    queryFn: () => fetchNotes({ page, search: searchQuery, perPage }),
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    if (isSuccess && data?.notes.length === 0) {
      toast("No notes found", {
        duration: 4000,
        position: 'top-center',
      });
    }
  }, [isSuccess, data]);


  if (isError) return <p>Error loading notes...</p>;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (<div className={css.app}>
    <header className={css.toolbar}>
      <SearchBox value={inputValue} onChange={(value) => {setInputValue(value); handleSearch(value);}} />
      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
      <button className={css.button} type='button' onClick={openModal}>Create note +</button>
    </header>

    <main >
      {isLoading && <Loader />}{/* <strong className={css.loading}>Loading tasks...</strong>} */}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}

    </main>

    {isModalOpen && (
      <Modal onClose={closeModal}>
        <NoteForm onClose={closeModal} />
      </Modal>
    )}

    <Toaster position="top-right" reverseOrder={false} />
  </div>
  );
}

