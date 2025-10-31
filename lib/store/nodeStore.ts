import { Note } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NoteDraftStore {
  draft: Pick<Note, 'title' | 'content' | 'tag'>;
  setDraft: (note: Pick<Note, 'title' | 'content' | 'tag'>) => void;
  clearDraft: () => void;
}

const initialDraft: Pick<Note, 'title' | 'content' | 'tag'> = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
