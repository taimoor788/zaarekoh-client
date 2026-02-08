export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const resolveImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/300';

    // 1. Return absolute URLs as is (e.g. Cloudinary, placeholders) 
    // BUT only if they DON'T point to localhost
    if (path.startsWith('http')) {
        if (!path.includes('localhost:5173') && !path.includes('localhost:5000')) {
            return path;
        }
        // If it is a legacy localhost link, strip the base and treat as relative
        path = path.replace('http://localhost:5173', '').replace('http://localhost:5000', '');
    }

    // 2. Resolve frontend static images (in public/images)
    if (path.startsWith('/images')) {
        return path;
    }

    // 3. Resolve backend uploads
    if (path.startsWith('/uploads')) {
        return `${BASE_URL}${path}`;
    }

    // 4. Default: prepend BASE_URL for any other relative paths
    return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

