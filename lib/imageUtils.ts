/**
 * Centralized image path resolver for Pureplush workspace.
 * Resolves images with exact case-sensitivity and maps legacy folder names for Linux servers.
 */
export function resolveImagePath(s?: string): string {
  if (!s) return '';
  if (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('data:')) return s;

  let res = s.trim();

  // Strip leading slash if present
  if (res.startsWith('/')) {
    res = res.substring(1);
  }

  const parts = res.split('/');
  const filename = parts[parts.length - 1];

  // 1. Direct filename mapping for legacy database records
  if (filename === 'Soap2.png' || filename === 'Soap2.jpg') {
    return '/Frenchgreenclay/Soap2.png';
  }
  if (filename === 'Soap.png' || filename === 'Soap.jpg') {
    return '/MangoButter/Soap.png';
  }
  if (filename === 'Soap3.png' || filename === 'Soap3.jpg') {
    return '/Multanimitti/Soap3.png';
  }
  if (filename === 'new1.png' || filename === 'new1.jpg') {
    return '/CoffeeD/new1.png';
  }
  if (filename === 'Kesh1.jpeg' || filename === 'Kesh1.jpg') {
    return '/Keshoil/Kesh1.jpeg';
  }
  if (filename === 'Shampoobar2.png') {
    return '/multanimittishampoo/Shampoobar2.png';
  }
  if (filename === 'new2.png') {
    return '/Hibisus neem/new2.png';
  }

  // 2. Folder name case-sensitivity mapping (Linux server fix)
  const exactFolderMap: { [key: string]: string } = {
    'categoryimg': 'Categoryimg',
    'coffeed': 'CoffeeD',
    'frenchgreenclay': 'Frenchgreenclay',
    'herbal': 'Herbal',
    'herbalfacepack': 'Herbalfacepack',
    'hibisus neem': 'Hibisus neem',
    'hibiscusneem': 'Hibisus neem',
    'keshoil': 'Keshoil',
    'mangobutter': 'MangoButter',
    'multanimitti': 'Multanimitti',
    'multanimittishampoo': 'multanimittishampoo',
    'uploads': 'uploads',
    'headerimage': 'HeaderImage',
    'facewash': 'Herbal',
    'soap': 'Frenchgreenclay',
    'soaps': 'Frenchgreenclay',
    'shampoobar': 'multanimittishampoo',
    'shampoobars': 'multanimittishampoo'
  };

  const firstSegment = parts[0]?.toLowerCase() || '';

  if (exactFolderMap[firstSegment]) {
    parts[0] = exactFolderMap[firstSegment];
    return `/${parts.join('/')}`;
  }

  // 3. Default fallback for raw uploaded filenames
  return `/uploads/${res}`;
}
