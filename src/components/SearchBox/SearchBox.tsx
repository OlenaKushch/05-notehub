
import type { DebouncedState } from 'use-debounce';
import css from './SearchBox.module.css';




interface SearchBoxProps {
    onSearch: DebouncedState<(search: string) => void>
    searchQuery: string;
}

export default function SearchBox({ onSearch, searchQuery }: SearchBoxProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };
    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            value={searchQuery}
            onChange={handleChange}
        />
    );
}