export const getStories = async (limit, cursor) => {
    const url = new URL(`${process.env.REACT_APP_API_URL}stories/pagination`);
    url.searchParams.append('limit', limit);
    if (cursor) url.searchParams.append('cursor', cursor);

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error("Failed to fetch stories");
    }

    return await response.json();
};