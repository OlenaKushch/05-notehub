import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface URLResponse {
  notes: Note[],
  totalPages: number
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`
  },
});

export type FetchNotesParams = {
  page?: number;
  perPage?: number;
  search?: string;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<URLResponse> => {
  const { data } = await api.get<URLResponse>("/notes", {
    params: { page, perPage,  search},
  });
  return data;
};
export interface NewNoteData {
  id: number;
  title?: string;
  content?: string;

  tag?: string;
}
export const createNote = async (newNoteData: NewNoteData): Promise<Note> => {
  const res = await api.post<Note>("/notes", newNoteData);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const res = await api.delete<Note>(`notes/${noteId}`);
  return res.data;
};
export interface NoteUpdateData {
  id: string;
  title?: string;
  content?: string;
  tag?: string;
}
export const updateNote = async (noteUpdateData: NoteUpdateData) => {
  const res = await api.put<Note>(
    `/notes/${noteUpdateData.id}`,
    noteUpdateData
  );
  return res.data;
};
