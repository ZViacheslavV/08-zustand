import { Note } from '@/types/note';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const BASE_URL = 'https://notehub-public.goit.study/api/notes';

export const PER_PAGE = 10;
/* const API_ENDPOINTS = {
  SEARCH: '?search',
}; */

const noteService = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

//Function for cleaning objects from null, '', undefined
/* const cleanParams = <T extends Record<string, unknown>>(obj: T): Partial<T> =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null && v !== '')) as Partial<T>; */
export const cleanParams = <T extends object>(obj: T): Partial<T> =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null && v !== '')) as Partial<T>;

export const fetchNotes = async (
  search: string,
  tag?: string | undefined,
  page: number = 1,
  perPage: number = PER_PAGE
  /* sortBy: string = '' */
): Promise<NotesResponse> => {
  const params = cleanParams({
    search,
    tag,
    page,
    perPage,
    /* sortBy, */
  });

  // console.log(params);

  const { data } = await noteService.get<NotesResponse>('', { params });

  return data;
};

export const createNote = async (newNote: Pick<Note, 'title' | 'content' | 'tag'>) => {
  const { data } = await noteService.post<Note>('', newNote);
  return data;
};

export const deleteNote = async (noteId: Note['id']) => {
  const { data } = await noteService.delete<Note>(`/${noteId}`);
  return data;
};

export const fetchNoteById = async (noteId: Note['id']) => {
  const { data } = await noteService.get<Note>(`/${noteId}`);
  return data;
};
