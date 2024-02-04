import { callAPI } from "./callApi";
import { FileDTO } from "../models/filedto";
import { VersionDTO } from "../models/versiondto";

/**
 *
 * @param userId - The ID of the user who created the file
 * @param name - The name of the file
 * @param description  - The description of the file
 * @param content - The content of the file
 * @param language - The language of the file
 * @returns - Promise of the created file
 */
export const createFile = (
    userId: string,
    name: string,
    description: string,
    content: string,
    language: string
): Promise<FileDTO> => callAPI<FileDTO, {userId: string, name: string, description: string, content: string, language: string}>('post', '/api/files', {userId, name, description, content, language});

/**
 *
 * @param userId - The ID of the user who created the file
 * @param name - The name of the file
 * @param description  - The description of the file
 * @param content - The content of the file
 * @param language - The language of the file
 * @returns - Promise of the created file
 */
export const updateFile = (
    id: string,
    name: string,
    description: string,
    language: string,
    starred: boolean
): Promise<FileDTO> => callAPI<FileDTO, {name: string, description: string, language: string, starred: boolean}>('put', `/api/files/${id}`, {name, description, language, starred});

/**
 *
 * @param id - The ID of the file to delete
 * @returns - Promise that resolves when the file is deleted
 */
export const deleteFile = (id: string): Promise<void> => callAPI<void>('delete', `/api/files/${id}`);

/**
 *
 * @param fileId - The ID of the file to remove from the collection
 * @returns - Promise that resolves when the file is removed from the collection
 */
export const removeFileFromCollection = (fileId: string): Promise<void> => callAPI<void>('delete', `/api/files/${fileId}/collection`);

/**
 *
 * @param id - The ID of the file to get
 * @returns - Promise of the file
 */
export const getFile = (id: string): Promise<FileDTO> => callAPI<FileDTO>('get', `/api/files/${id}`);

/**
 *
 * @param userId - The ID of the user to get files for
 * @returns - Promise of the files
 */
export const listFileVersions = (fileId: string): Promise<VersionDTO[]> => callAPI<VersionDTO[]>('get', `/api/files/${fileId}/versions`);

/**
 *
 * @param fileId - The ID of the file to get
 * @param version - The version of the file to get
 * @returns - Promise of the file
 */
export const addFileToCollection = (fileId: string, collectionId: string): Promise<FileDTO> => callAPI<FileDTO>('post', `/api/files/${fileId}/collection/${collectionId}`);

