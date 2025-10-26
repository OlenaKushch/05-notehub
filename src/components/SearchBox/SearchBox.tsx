
import type { DebouncedState } from 'use-debounce';
import css from './SearchBox.module.css';
import { useState } from 'react';




interface SearchBoxProps {
    onSearch: DebouncedState<(search: string) => void>
    searchQuery: string;
}

export default function SearchBox({ onSearch, searchQuery }: SearchBoxProps) {
const [localValue, setLocalValue] = useState(searchQuery);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalValue(value);
        onSearch(value);
    };
    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            value={localValue}
            onChange={handleChange}
        />
    );
}