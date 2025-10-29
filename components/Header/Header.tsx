import { NOTES_FILTER_ALL } from '@/lib/constants';
import TagsMenu from '../TagsMenu/TagsMenu';
import css from './Header.module.css';
import Link from 'next/link';

const Header = () => (
  <header className={css.header}>
    <Link href="/" aria-label="Home">
      NoteHub
    </Link>
    <nav aria-label="Main Navigation">
      <ul className={css.navigation}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href={`/notes/filter/${NOTES_FILTER_ALL}`}>Notes</Link>
        </li>
        <li>
          <TagsMenu />
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
