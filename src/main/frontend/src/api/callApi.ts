import API from './api';

interface DatabaseError {
    type: "database";
    code: number;
    statusText: string;
}

interface NetworkError {
    type: "http";
    code?: number;
    response?: {
        data: {
            status: string;
            statusText: string;
        };
    };
}

/**
 *
 * @param method - HTTP method
 * @param path - API endpoint
 * @param data - Request body
 * @param headers - Request headers
 * @param params - Query parameters
 * @returns - Promise of the API response
 */
export async function callAPI<T, D = unknown>(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    path: string = '',
    data?: D,
    headers?: Record<string, string>,
    params?: Record<string, string | number>
): Promise<T> {
    const config = {
        url: path,
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        ...(data && { data }), // Conditionally add data if present
        params, // Optional query parameters
    };

    try {
        const response = await API(config);
        return response.data;
    } catch (error: unknown) {
        let errorData: DatabaseError | NetworkError;

        if ((error as NetworkError).response) {
            errorData = {
                type: "http",
                response: {
                    data: {
                        status: (error as NetworkError).response?.data?.status || "500",
                        statusText:
                             (error as NetworkError).response?.data?.statusText ||
                            "[ERROR_AXIOS_API] An error occurred during the HTTP request",
                    },
                },
            };
        } else {
            errorData = {
                type: "database",
                code: 500,
                statusText: "[ERROR_PRISMA_API] An error occurred during the database request",
            };
        }

        console.error(errorData);
        throw new Error(errorData.type === 'http' ? errorData.response?.data?.statusText : errorData.statusText);
    }
}