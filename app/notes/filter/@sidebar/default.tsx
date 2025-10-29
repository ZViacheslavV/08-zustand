import Link from 'next/link';
import css from './SideBarNotes.module.css';
import { NOTES_FILTER_CATEGORIES, NOTES_FILTER_ALL } from '@/lib/constants';

const SideBarNotes = () => (
  <ul className={css.menuList}>
    <li className={css.menuItem}>
      <Link href={`/notes/filter/${NOTES_FILTER_ALL}`} className={css.menuLink}>
        All notes
      </Link>
    </li>
    {NOTES_FILTER_CATEGORIES.map((category, i) => (
      <li className={css.menuItem} key={'SideBarMenu' + i}>
        <Link href={`/notes/filter/${category}`} className={css.menuLink}>
          {category}
        </Link>
      </li>
    ))}
  </ul>
);

export default SideBarNotes;
