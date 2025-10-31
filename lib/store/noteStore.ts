import { Note } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type draftNote = Pick<Note, 'title' | 'content' | 'tag'>;

interface NoteDraftStore {
  draft: draftNote;
  setDraft: (note: draftNote) => void;
  clearDraft: () => void;
}

const initialDraft: draftNote = {
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
