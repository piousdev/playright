import { UserDTO } from '../models/userdto.ts';
import { callAPI } from './callApi.ts'

/**
 * Creates a new user.
 * @param user - The user data.
 * @returns A Promise that resolves to the created user.
 */
export const createUser = (user: UserDTO): Promise<UserDTO> => callAPI<UserDTO, UserDTO>('post', '/users', user);

/**
 * Updates a user with the specified ID.
 * @param id - The ID of the user to update.
 * @param user - The updated user data.
 * @returns A Promise that resolves to the updated user.
 */
export const updateUser = (id: string, user: UserDTO): Promise<UserDTO> => callAPI<UserDTO, UserDTO>('put', `/users/${id}`, user);

/**
 * Deletes a user with the specified ID.
 * @param id - The ID of the user to delete.
 * @returns A Promise that resolves when the user is deleted.
 */
export const getUsers = (): Promise<UserDTO[]> => callAPI<UserDTO[]>('get');

/**
 * Gets a user with the specified ID.
 * @param id - The ID of the user to get.
 * @returns A Promise that resolves to the user.
 */
export const getUser = (id: string): Promise<UserDTO> => callAPI<UserDTO>('get', `/users/${id}`);