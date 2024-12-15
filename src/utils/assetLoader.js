/**
 * Resolves asset paths for Vite builds
 * @param {string} path - The relative path to the asset
 * @returns {string} The resolved path
 */
export function resolveAssetPath(path) {
    // For development, use the public directory
    if (import.meta.env.DEV) {
        return `/sprites/${path}`;
    }
    
    // For production, assets will be in the dist folder
    // Vite will automatically handle the hashing and path resolution
    try {
        // Using dynamic imports for assets
        const assetUrl = new URL(`/sprites/${path}`, import.meta.url).href;
        return assetUrl;
    } catch (error) {
        console.error('Error resolving asset path:', error);
        return path;
    }
} 