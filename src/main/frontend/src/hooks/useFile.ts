import { useState } from "react";
import { showToast } from "../utils/getToast.ts";
import { callAPI } from "../api/callApi.ts";
import { FileDTO } from "../models/filedto";

interface UseFileReturn {
	saveFile: (fileData: {
		createdAt: string | undefined;
		starred: boolean;
		name: string;
		currentVersionId: number | undefined;
		description: string;
		language: string;
		id: string | undefined;
		userId: string | undefined;
		collectionId: string | undefined;
		content: string;
		updatedAt: string | undefined
	}, onSuccess: (file: SavedFile) => void, onError: (error: (ErrorResponse | NetworkError)) => void) => Promise<void>;
	isLoading: boolean;
}

export interface ErrorResponse {
	message: string;
	timestamp?: string;
	response?: {
		data: {
			statusText: string;
			status: number;
		};
	};
}

export interface NetworkError {
	type: "http";
	message: string;
	status: number;
	response?: {
		data: {
			statusText: string;
			status: number;
		};
	}
}

/**
 * A hook to handle file operations.
 * @returns {Object} The file operations.
 * @returns {Function} saveFile - Saves a file to the server.
 * @returns {boolean} isLoading - Whether the file is currently being saved.
 * @returns {Function} handleAPIError - Handles an API error.
 */
const useFile = (): UseFileReturn => {
	const [isLoading, setIsLoading] = useState(false);

	const handleAPIError = (error: ErrorResponse | NetworkError) => {
		// This function should be tailored based on how errors are structured in your Java backend
		const errorData: ErrorResponse | NetworkError = {
			type: "http",
			message: "An unknown error occurred",
			status: 500,
		};
		if (error.response) {
			errorData.message = error.response.data.statusText || "An error occurred during the HTTP request";
			errorData.status = error.response.data.status || 500;
		}

		return errorData;
	};

	/**
	 * Saves a file to the server.
	 * @param fileData - The file data to save.
	 * @param onSuccess - The function to call when the file is saved successfully.
	 * @param onError - The function to call when an error occurs.
	 */
	const saveFile = async (
		fileData: FileDTO,
		onSuccess: (_file: FileDTO) => void,
		onError: (_error: (ErrorResponse | NetworkError)) => void,
	) => {
		setIsLoading(true);

		try {
			const method = fileData.id ? 'put' : 'post';
			const path = fileData.id ? `/api/files/${fileData.id}` : "/api/files";
			const file = await callAPI<FileDTO>(method, path, fileData);

			showToast({ message: "File saved successfully" });
			onSuccess(file);
		} catch (error) {
			const errorData = handleAPIError(error as ErrorResponse | NetworkError);
			if ('statusText' in errorData) {
				showToast({ message: errorData.statusText as string, isError: true })
			}
			onError(errorData);
		} finally {
			setIsLoading(false);
		}
	};

	return { saveFile, isLoading };
};

export default useFile;