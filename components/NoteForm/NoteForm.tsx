'use client';

import { useId, useState } from 'react';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { Note } from '@/types/note';
import { NOTES_FILTER_CATEGORIES } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import * as Yup from 'yup';

const noteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title too short')
    .max(50, 'Title too long')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content too long'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
    .required('Tag is required'),
});

const NoteForm = () => {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate: createMutate, isPending: isCreatePending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.push('/notes/filter/All');
      clearDraft();
    },
  });

  const handleCreateNote = async (formData: FormData) => {
    const values = Object.fromEntries(formData) as Pick<Note, 'title' | 'content' | 'tag'>;

    try {
      await noteFormSchema.validate(values, { abortEarly: false });
      setErrors({});
      createMutate(values);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  const handleCancel = () => router.push('/notes/filter/All');

  return (
    <form className={css.form} action={handleCreateNote}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
        {errors.title && <p className={css.error}>{errors.title}</p>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
        {errors.content && <p className={css.error}>{errors.content}</p>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          {NOTES_FILTER_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.tag && <p className={css.error}>{errors.tag}</p>}
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isCreatePending}>
          {isCreatePending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
