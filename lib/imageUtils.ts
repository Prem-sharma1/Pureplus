/**
 * Centralized image path resolver for Pureplush workspace.
 * Correctly handles root-level public subfolders vs. /uploads/ files.
 */
export function resolveImagePath(s?: string): string {
  if (!s) return '';
  if (s.startsWith('http://') || s.startsWith('https://')) return s;

  let res = s.trim();

  // Strip leading slash if present for normalized check
  if (res.startsWith('/')) {
    res = res.substring(1);
  }

  // Known subdirectories located directly inside the public/ folder
  const knownRootFolders = [
    'categoryimg',
    'coffeed',
    'frenchgreenclay',
    'herbal',
    'herbalfacepack',
    'hibisus neem',
    'keshoil',
    'mangobutter',
    'multanimitti',
    'multanimittishampoo',
    'uploads',
    'facewash',
    'shampoobar',
    'soap'
  ];

  const firstSegment = res.split('/')[0]?.toLowerCase() || '';

  if (knownRootFolders.includes(firstSegment)) {
    return `/${res}`;
  }

  // Default fallback for raw filenames
  return `/uploads/${res}`;
}
