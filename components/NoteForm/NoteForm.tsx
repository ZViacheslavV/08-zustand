import { useId } from 'react';
import css from './NoteForm.module.css';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { createNote } from '../../services/noteService';
// import type { Note } from '../../types/note';
import { createNote } from '@/lib/api';
import { Note } from '@/types/note';

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

/* interface NotesResponse {
  notes: Note[];
  totalPages: number;
} */

interface NoteFormProps {
  onClose: () => void;
  // setIsOpen: (arg: boolean) => void;
}

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

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

const NoteForm = ({ onClose /*setIsOpen  , onSubmit */ }: NoteFormProps) => {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const { mutate: createMutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
    /* onSuccess: (newNote) => {
      queryClient.setQueryData<NotesResponse>(
        ['notes', { tag: newNote.tag, page: 1, searchQuery: '' }],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            notes: [newNote, ...oldData.notes],
          };
        }
      );
      onClose();
    }, */
  });

  const handleCreateNote = async (
    values: Pick<Note, 'title' | 'content' | 'tag'>,
    actions: FormikHelpers<Pick<Note, 'title' | 'content' | 'tag'>>
  ) => {
    await createMutate(values, {
      onSuccess: () => {
        actions.resetForm();
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleCreateNote}
      validationSchema={noteFormSchema}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field id={`${fieldId}-title`} type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              as="textarea"
              id={`${fieldId}-content`}
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
