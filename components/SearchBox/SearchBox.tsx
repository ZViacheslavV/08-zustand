import type { ChangeEvent } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
}

const SearchBox = ({ onChange, defaultValue }: SearchBoxProps) => (
  <input
    className={css.input}
    onChange={onChange}
    type="text"
    placeholder="Search notes"
    defaultValue={defaultValue}
  />
);
export default SearchBox;
