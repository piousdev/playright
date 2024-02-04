import { useState } from "react";
import { showToast } from "../utils/getToast.ts";
import { callAPI } from "../api/callApi.ts";
import { FileDTO } from "../models/filedto";

interface ErrorResponse {
	message: string;
	timestamp?: string;
	details?: string;
}

interface NetworkError {
	type: "http";
	status: number;
	statusText: string;
	errorResponse?: ErrorResponse;
}

const useFile = () => {
	const [isLoading, setIsLoading] = useState(false);

	const handleAPIError = (error: any): ErrorResponse | NetworkError => {
		// This function should be tailored based on how errors are structured in your Java backend
		let errorData: ErrorResponse | NetworkError = {
			type: "http",
			statusText: "An unknown error occurred",
			status: 500,
		};
		if (error.response) {
			errorData.statusText = error.response.data.statusText || "An error occurred during the HTTP request";
			errorData.status = error.response.data.status || "500";
		}
		// Add more logic if you have specific error handling for database errors
		return errorData;
	};

	const saveFile = async (
		fileData: FileDTO, // Adjusted to use FileDTO directly
		onSuccess: (file: FileDTO) => void,
		onError: (error: ErrorResponse | NetworkError) => void
	) => {
		setIsLoading(true);
		try {
			const method = fileData.id ? 'put' : 'post';
			const path = fileData.id ? `/api/files/${fileData.id}` : "/api/files";
			const file = await callAPI<FileDTO>(method, path, fileData);

			showToast({ message: "File saved successfully" });
			onSuccess(file);
		} catch (error) {
			const errorData = handleAPIError(error);
			if ('statusText' in errorData) {
				showToast({ message: errorData.statusText, isError: true })
			}
			onError(errorData);
		} finally {
			setIsLoading(false);
		}
	};

	return { saveFile, isLoading };
};

export default useFile;