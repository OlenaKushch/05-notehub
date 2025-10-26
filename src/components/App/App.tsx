import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import css from './App.module.css';

import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import SearchBox from '../SearchBox/SearchBox';

export default function App() {
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);



  const handleSearch = useDebouncedCallback(
    (search: string) => {
      setSearchQuery(search);

    }, 1000
  );


  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, searchQuery, perPage],
    queryFn: () => fetchNotes({ page, search: searchQuery, perPage }),
    placeholderData: (prev) => prev,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes...</p>;
  if (!data || data.notes.length === 0) return <p>No notes found.</p>;


  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  // const handleSearch = (search: string) => {
  //   setSearchQuery(search);

  // };



  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} searchQuery={searchQuery} />
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} type='button' onClick={openModal}>Create note +</button>

        {/* Кнопка створення нотатки */}
      </header>
      <NoteList notes={data.notes} />

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}