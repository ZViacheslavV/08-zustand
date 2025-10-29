'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';
import { NOTES_FILTER_CATEGORIES, NOTES_FILTER_ALL } from '@/lib/constants';

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (tag: string | undefined) => {
    setSelectedTag(tag);
    setTimeout(() => setSelectedTag(undefined), 2000);
    closeMenu();
  };

  const buttonText = selectedTag ? `Notes: ${selectedTag}` : 'Notes ▾';

  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button
        className={css.menuButton}
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="tags-menu-list"
      >
        {buttonText}
      </button>

      {isOpen && (
        <ul id="tags-menu-list" className={css.menuList} role="menu">
          <li className={css.menuItem} role="none">
            <Link
              href={`/notes/filter/${NOTES_FILTER_ALL}`}
              className={css.menuLink}
              role="menuitem"
              onClick={() => {
                handleSelect(NOTES_FILTER_ALL);
              }}
            >
              All notes
            </Link>
          </li>
          {NOTES_FILTER_CATEGORIES.map((category, i) => (
            <li className={css.menuItem} role="none" key={category + i}>
              <Link
                href={`/notes/filter/${category}`}
                className={css.menuLink}
                role="menuitem"
                onClick={() => {
                  handleSelect(category);
                }}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;

/* import Link from 'next/link';
import css from './TagsMenu.module.css';
import { NOTES_FILTER_CATEGORIES } from '@/lib/constants';

const TagsMenu = () => (
  <div className={css.menuContainer}>
    <button className={css.menuButton}>Notes ▾</button>
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/All`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {NOTES_FILTER_CATEGORIES.map((category, i) => (
        <li className={css.menuItem} key={'TagsMenu' + i}>
          <Link href={`/notes/filter/${category}`} className={css.menuLink}>
            {category}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default TagsMenu; */
