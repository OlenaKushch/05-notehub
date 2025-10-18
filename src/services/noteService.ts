import axios, { AxiosResponse } from 'axios';
import { Note, NoteTag } from '../types/note';

const RequestURL = 'https://notehub-public.goit.study/api/auth'
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;


export interface FetchNotesResponse {
    notes: Note[];
    page: number;
    perPage: number;
    
    totalPages: number;
}

export interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
}

export function fetchNotes({
    page = 1,
    perPage = 12,
    search = '',
}: FetchNotesParams = {}): Promise<FetchNotesResponse>{ const response: AxiosResponse<FetchNotesResponse> await axios.get {`${RequestURL}/notes` }
{
    params: { pageXOffset, perPage, search,},
    headers: { Autorization: `Bearer ${TOKEN}`, },
});
return Response.data;
}
    
}
export async function createNotes({content, }: CreateNoteParams): {

}
deleteNotes(){

}