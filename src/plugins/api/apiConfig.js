export const API_BASE_URL = 'http://localhost:3000/api';

export async function fetchData(endpoint, data) {
  const url = `${API_BASE_URL}/${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: data,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.error?.message ||
          `Server responded with status ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Failed:', error);
    throw new Error(error.message || 'Network request failed');
  }
}
