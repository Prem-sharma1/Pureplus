import { NextResponse } from 'next/server';
import { query, testConnection } from '@/lib/db';

export interface ProductReview {
  id: number;
  product_id: number;
  name: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
  location?: string;
  images?: string;
  verified: number;
  status: string;
  created_at: string;
}


const DEFAULT_REVIEWS: Record<number, Omit<ProductReview, 'id' | 'product_id'>[]> = {
  26: [
    {
      name: 'Priya Sharma',
      email: 'priya.s@example.com',
      rating: 5,
      title: 'Pain-free and super easy to use!',
      comment: 'I was skeptical at first, but this herbal waxing powder is amazing! Absolutely no pain or rash, leaves my skin feeling incredibly smooth and clean. Highly recommended!',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-15T10:30:00Z',
    },
    {
      name: 'Meera Patel',
      email: 'meera.p@example.com',
      rating: 5,
      title: 'Natural & Gentle on Sensitive Skin',
      comment: 'Loved that it is 100% botanical with no harsh chemical smell. Took off fine body hair smoothly within 8-10 minutes. Will definitely reorder!',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-02T14:15:00Z',
    },
    {
      name: 'Rohan Verma',
      email: 'rohan.v@example.com',
      rating: 4,
      title: 'Very effective & natural product',
      comment: 'Great alternative to traditional waxing or razors. Very gentle on the skin. Super easy application instructions.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-20T09:45:00Z',
    },
  ],
  28: [
    {
      name: 'Ananya Roy',
      email: 'ananya.r@example.com',
      rating: 5,
      title: 'Best natural face cleanser!',
      comment: 'Deeply cleanses my pores without stripping away moisture. My face feels clean, fresh and naturally glowing every morning.',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-18T16:20:00Z',
    },
    {
      name: 'Kavita Nair',
      email: 'kavita.n@example.com',
      rating: 5,
      title: 'Pure botanical bliss',
      comment: 'Smells purely of authentic herbs. Helps control excess oil production on my T-zone effectively.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-28T11:10:00Z',
    },
  ],
  101: [
    {
      name: 'Sneha Gupta',
      email: 'sneha.g@example.com',
      rating: 5,
      title: 'Luxurious lather & ultra moisturizing',
      comment: 'The mango butter and sea clay bar is heavenly! Soft, rich creamy lather that keeps my skin hydrated all day.',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-10T12:00:00Z',
    },
  ],
};

const GENERIC_DEFAULT_REVIEWS: Omit<ProductReview, 'id' | 'product_id'>[] = [
  {
    name: 'Aarav Kumar',
    email: 'aarav.k@example.com',
    rating: 5,
    title: 'Highly Recommended Pure & Authentic Product',
    comment: 'Authentic Pureplush quality. Noticed remarkable improvement in skin texture within a week of regular use.',
    verified: 1,
    status: 'approved',
    created_at: '2026-07-12T08:30:00Z',
  },
  {
    name: 'Divya Sundaram',
    email: 'divya.s@example.com',
    rating: 5,
    title: 'Love the herbal purity',
    comment: 'Loved the natural aroma and gentle formula. Packed with care and delivered fast!',
    verified: 1,
    status: 'approved',
    created_at: '2026-06-25T15:40:00Z',
  },
];

// In-memory reviews store for fallback mode
let memoryReviews: ProductReview[] = [];
let memoryIdCounter = 100;

function getFallbackReviews(productId: number): ProductReview[] {
  const specific = DEFAULT_REVIEWS[productId] || GENERIC_DEFAULT_REVIEWS;
  const initial = specific.map((r, i) => ({
    id: i + 1,
    product_id: productId,
    ...r,
  }));

  const userAdded = memoryReviews.filter((r) => r.product_id === productId);
  return [...userAdded, ...initial];
}

async function ensureTableExists() {
  const sql = `
    CREATE TABLE IF NOT EXISTS product_reviews (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      rating INT NOT NULL DEFAULT 5,
      title VARCHAR(255) DEFAULT '',
      comment TEXT NOT NULL,
      location VARCHAR(255) DEFAULT '',
      images TEXT DEFAULT '',
      verified TINYINT(1) DEFAULT 1,
      status VARCHAR(20) DEFAULT 'approved',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX (product_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  await query(sql);

  // Add location column if missing in existing table
  try {
    const existing = await query<any[]>('SELECT * FROM product_reviews LIMIT 1');
    if (existing && existing.length > 0 && !('location' in existing[0])) {
      await query('ALTER TABLE product_reviews ADD COLUMN location varchar(255) DEFAULT ""');
    }
  } catch {}
}


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productIdParam = searchParams.get('productId');

    if (!productIdParam) {
      return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 });
    }

    const productId = parseInt(productIdParam);
    const isDbConnected = await testConnection();

    if (!isDbConnected) {
      const reviews = getFallbackReviews(productId);
      return NextResponse.json({
        success: true,
        source: 'fallback',
        reviews,
      });
    }

    await ensureTableExists();

    const dbReviews = await query<ProductReview[]>(
      'SELECT * FROM product_reviews WHERE product_id = ? AND status = "approved" ORDER BY id DESC',
      [productId]
    );

    if (!dbReviews || dbReviews.length === 0) {
      // Seed default reviews into DB for this product so DB has data
      const defaultItems = DEFAULT_REVIEWS[productId] || GENERIC_DEFAULT_REVIEWS;
      for (const item of defaultItems) {
        await query(
          'INSERT INTO product_reviews (product_id, name, email, rating, title, comment, verified, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [productId, item.name, item.email, item.rating, item.title, item.comment, item.verified, item.status, item.created_at]
        );
      }

      const freshSeeded = await query<ProductReview[]>(
        'SELECT * FROM product_reviews WHERE product_id = ? AND status = "approved" ORDER BY id DESC',
        [productId]
      );

      return NextResponse.json({
        success: true,
        source: 'database_seeded',
        reviews: freshSeeded || [],
      });
    }

    return NextResponse.json({
      success: true,
      source: 'database',
      reviews: dbReviews,
    });
  } catch (error: any) {
    console.error('Error fetching product reviews:', error);
    const productId = parseInt(new URL(request.url).searchParams.get('productId') || '0');
    return NextResponse.json({
      success: true,
      source: 'error_fallback',
      reviews: getFallbackReviews(productId),
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product_id, name, email, rating, title, comment, location, images } = body;

    if (!product_id || !name || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: 'Required fields missing (product_id, name, rating, comment)' },
        { status: 400 }
      );
    }

    const numericRating = Math.min(5, Math.max(1, parseInt(rating) || 5));
    const isDbConnected = await testConnection();

    if (!isDbConnected) {
      memoryIdCounter += 1;
      const newMemoryReview: ProductReview = {
        id: memoryIdCounter,
        product_id: parseInt(product_id),
        name: name.trim(),
        email: (email || '').trim(),
        rating: numericRating,
        title: (title || '').trim(),
        comment: comment.trim(),
        location: (location || '').trim(),
        images: images || '',
        verified: 1,
        status: 'approved',
        created_at: new Date().toISOString(),
      };
      memoryReviews.unshift(newMemoryReview);

      return NextResponse.json({
        success: true,
        source: 'fallback',
        review: newMemoryReview,
        message: 'Review submitted successfully!',
      });
    }

    await ensureTableExists();

    const result: any = await query(
      'INSERT INTO product_reviews (product_id, name, email, rating, title, comment, location, images, verified, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, "approved")',
      [
        parseInt(product_id),
        name.trim(),
        (email || '').trim(),
        numericRating,
        (title || '').trim(),
        comment.trim(),
        (location || '').trim(),
        images || '',
      ]
    );

    const insertedId = result?.insertId || Date.now();

    const createdReview: ProductReview = {
      id: insertedId,
      product_id: parseInt(product_id),
      name: name.trim(),
      email: (email || '').trim(),
      rating: numericRating,
      title: (title || '').trim(),
      comment: comment.trim(),
      location: (location || '').trim(),
      images: images || '',
      verified: 1,
      status: 'approved',
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      source: 'database',
      review: createdReview,
      message: 'Review submitted successfully!',
    });
  } catch (error: any) {
    console.error('Error adding product review:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit review' },
      { status: 500 }
    );
  }
}
