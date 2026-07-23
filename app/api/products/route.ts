import { NextResponse } from 'next/server';
import { query, testConnection } from '@/lib/db';
import fs from 'fs';
import path from 'path';

const SEED_PRODUCTS = [
  {
    id: 26,
    product_name: 'Pureplush Herbal Waxing Powder',
    product_details: 'Pureplush Herbal Waxing Powder is a pain-free, natural hair removal solution. Made with standard botanicals to remove hair gently while leaving skin soft, smooth, and clean. 100g.',
    brief_details: 'Pain-free natural hair removal powder made with organic botanical ingredients for smooth skin.',
    product_price: '249.00',
    original_price: '299.00',
    product_category: 'moringa',
    product_discount: 16,
    image1: 'uploads/Herbal2.png',
    image2: 'uploads/herbal_waxing_powder_banner_1784778537801.png',
    image3: '',
    image4: '',
    weight: '100g',
    shelf_life: '12 Months',
    point1: '100% Organic & Natural',
    point2: 'Pain-Free Hair Removal',
    point3: 'Soft & Smooth Results',
    point4: 'No Skin Irrigation',
    point5: 'Chemical Free Base',
    productCode: 'PP-POWDER-WAXING'
  },
  {
    id: 28,
    product_name: 'Pureplush Herbal Facewash powder',
    product_details: 'Pureplush Herbal Facewash Powder is a traditional dry face wash blend. It deeply cleanses pores, removes excess oil, and gently exfoliates for a clear, glowing complexion. 100g.',
    brief_details: 'Traditional exfoliating dry face wash powder to cleanse pores and restore natural glow.',
    product_price: '249.00',
    original_price: '299.00',
    product_category: 'moringa',
    product_discount: 16,
    image1: 'uploads/Herbal4.png',
    image2: 'uploads/Artboard 1 (1).png',
    image3: '',
    image4: '',
    weight: '100g',
    shelf_life: '12 Months',
    point1: 'Deep Cleanses Pores',
    point2: 'Controls Excess Oil',
    point3: 'Gentle Natural Exfoliation',
    point4: 'Chemical-Free Daily Cleanser',
    point5: 'Suitable for All Skin Types',
    productCode: 'PP-POWDER-FACEWASH'
  },
  {
    id: 108,
    product_name: 'Pureplush Herbal Facepack',
    product_details: 'Pureplush Herbal Facepack is a nutrient-rich skin reviving treatment. Infused with organic herbs to detoxify, soothe, and brighten the skin barrier. 100g.',
    brief_details: 'Botanical detoxifying face mask to soothe irritation and brighten skin complexion.',
    product_price: '249.00',
    original_price: '299.00',
    product_category: 'moringa',
    product_discount: 16,
    image1: 'Herbalfacepack/Artboard 1.png',
    image2: 'Herbalfacepack/Artboard 2.png',
    image3: '',
    image4: '',
    weight: '100g',
    shelf_life: '12 Months',
    point1: 'Detoxifies Skin Barrier',
    point2: 'Soothes Irritated Skin',
    point3: 'Brightens & Clarifies Tone',
    point4: '100% Raw Botanical Mud & Clay',
    point5: 'Fades Dark Blemishes',
    productCode: 'PP-POWDER-FACEPACK'
  },
  {
    id: 105,
    product_name: 'PurePlush Herbal Hair Wash Powder with Amla, Shikakai & Bhringraj',
    product_details: 'Pureplush Herbal Hair Wash Powder is a complete hair nourishment blend. Sourced with organic Amla, Shikakai, and Bhringraj to promote hair growth, prevent graying, and clean hair naturally. 100g.',
    brief_details: 'Complete organic hair wash powder containing Amla, Shikakai & Bhringraj for strong, healthy hair.',
    product_price: '249.00',
    original_price: '349.00',
    product_category: 'moringa',
    product_discount: 29,
    image1: 'Herbal/Herbal3.png',
    image2: 'Herbal/WhatsApp Image 2026-01-27 at 11.19.00 AM.jpeg',
    image3: 'Herbal/WhatsApp Image 2026-01-27 at 11.19.00 AM (1).jpeg',
    image4: 'Herbal/WhatsApp Image 2026-01-27 at 11.19.00 AM (2).jpeg',
    weight: '100g',
    shelf_life: '12 Months',
    point1: 'Amla & Shikakai Cleanser',
    point2: 'Bhringraj for Hair Growth',
    point3: 'Prevents Premature Graying',
    point4: 'Anti-Dandruff & Scalp Health',
    point5: 'Zero Synthetic Preservatives',
    productCode: 'PP-POWDER-HAIRWASH'
  },
  {
    id: 101,
    product_name: 'Pureplush mangobutter Mud Sea Clay Soap',
    product_details: 'Pureplush Handcrafted Mango Butter, Mud & Sea Clay Soap. Deeply purifies with sea clay, extracts impurities with natural mud, and intensely moisturizes with organic mango butter. 100g.',
    brief_details: 'Handcrafted moisturizing soap bar with sea clay mud and rich organic mango butter.',
    product_price: '99.00',
    original_price: '149.00',
    product_category: 'soaps',
    product_discount: 33,
    image1: 'MangoButter/Soap.png',
    image2: 'MangoButter/WhatsApp Image 2026-07-15 at 5.18.11 PM.jpeg',
    image3: 'MangoButter/IMG-20260123-WA0020.jpg',
    image4: '',
    weight: '100g',
    shelf_life: '24 Months',
    point1: 'Deep Purifying Mud',
    point2: 'Moisturizing Mango Butter',
    point3: 'Handcrafted & Vegan',
    point4: 'Creamy Hydrating Lather',
    point5: 'Sulphate & Paraben Free',
    productCode: 'PP-SOAP-MANGO-MUD'
  },
  {
    id: 102,
    product_name: 'Pureplush Sheabutter Multani Mitti Soap',
    product_details: 'Pureplush Handcrafted Shea Butter & Multani Mitti Soap. Combines the oil-absorbing power of Multani Mitti (fullers earth) with the deep conditioning of organic raw shea butter. 100g.',
    brief_details: 'Handcrafted oil-control soap containing fullers earth clay and nourishing shea butter.',
    product_price: '99.00',
    original_price: '149.00',
    product_category: 'soaps',
    product_discount: 33,
    image1: 'Multanimitti/Soap3.png',
    image2: 'Multanimitti/WhatsApp Image 2026-07-10 at 7.10.16 PM (1).jpeg',
    image3: '',
    image4: '',
    weight: '100g',
    shelf_life: '24 Months',
    point1: 'Absorbs Excess Oils',
    point2: 'Nourishing Shea Butter',
    point3: 'Combats Acne & Pimples',
    point4: 'Gentle Detoxifying Clay',
    point5: 'Soft & Nourished Skin Texture',
    productCode: 'PP-SOAP-SHEA-MULTANI'
  },
  {
    id: 103,
    product_name: 'Pureplush Goatmilk French Green Clay Soap',
    product_details: 'Pureplush Handcrafted Goat Milk & French Green Clay Soap. French green clay draws out toxins, while fresh farm goat milk softens, hydrates, and restores natural pH. 100g.',
    brief_details: 'Handcrafted detoxifying soap containing French green clay and moisturizing goat milk.',
    product_price: '99.00',
    original_price: '149.00',
    product_category: 'soaps',
    product_discount: 33,
    image1: 'Frenchgreenclay/Soap2.png',
    image2: 'Frenchgreenclay/WhatsApp Image 2026-07-10 at 7.10.16 PM.jpeg',
    image3: '',
    image4: '',
    weight: '100g',
    shelf_life: '24 Months',
    point1: 'Toxin-Extracting Green Clay',
    point2: 'Soften & Hydrates Skin',
    point3: 'Rich Goat Milk Proteins',
    point4: 'Gentle pH Balanced Cleanser',
    point5: 'Handcrafted Cold-Pressed Base',
    productCode: 'PP-SOAP-GOAT-CLAY'
  },
  {
    id: 109,
    product_name: 'Pureplush Goatmilk Coffee D Tan Soap',
    product_details: 'Pureplush Handcrafted Goat Milk & Coffee D-Tan Soap. Gently exfoliates dead skin cells, draws out impurities, and deeply moisturizes with fresh farm goat milk and rich aromatic coffee. 100g.',
    brief_details: 'Handcrafted exfoliating soap containing fresh goat milk and aromatic coffee to brighten and scrub skin.',
    product_price: '99.00',
    original_price: '149.00',
    product_category: 'soaps',
    product_discount: 33,
    image1: 'CoffeeD/new1.png',
    image2: 'CoffeeD/WhatsApp Image 2026-07-15 at 5.18.10 PM.jpeg',
    image3: '',
    image4: '',
    weight: '100g',
    shelf_life: '24 Months',
    point1: 'Brightens & Evens Skin',
    point2: 'Fresh Farm Goat Milk',
    point3: 'Natural Coffee Scrub',
    point4: 'Draws Out Impurities',
    point5: 'Sulphate & Paraben Free',
    productCode: 'PP-SOAP-GOAT-COFFEE'
  },
  {
    id: 104,
    product_name: 'Pureplush Multani Mitti Saffron Shampoo Bar',
    product_details: 'Pureplush Solid Multani Mitti & Saffron Shampoo Bar. Saffron extracts enhance natural hair shine, while Multani Mitti clay gently cleanses the scalp of grease and build-up. 80g.',
    brief_details: 'Zero-waste solid shampoo bar with shine-enhancing saffron and cleansing Multani Mitti.',
    product_price: '199.00',
    original_price: '299.00',
    product_category: 'shampoo',
    product_discount: 33,
    image1: 'multanimittishampoo/Shampoobar2.png',
    image2: 'multanimittishampoo/1770380073526.png',
    image3: '',
    image4: '',
    weight: '80g',
    shelf_life: '18 Months',
    point1: 'Scale-Free Scalp Cleansing',
    point2: 'Infused with Real Saffron',
    point3: 'Zero Waste Solid Bar',
    point4: 'Promotes Rich Hair Volume',
    point5: 'Chemical & Sulphate Free',
    productCode: 'PP-SHAMPOO-MULTANI-SAFFRON'
  },
  {
    id: 107,
    product_name: 'Pureplush Hibiscus Neemtulsi Shampoo Bar',
    product_details: 'Pureplush Solid Hibiscus, Neem & Tulsi Shampoo Bar. Hibiscus conditions hair shafts, while Neem and Tulsi extract provide antibacterial protection to reduce dandruff and itching. 80g.',
    brief_details: 'Zero-waste conditioning shampoo bar with Hibiscus, antibacterial Neem, and soothing Tulsi.',
    product_price: '199.00',
    original_price: '299.00',
    product_category: 'shampoo',
    product_discount: 33,
    image1: 'Hibisus neem/new2.png',
    image2: 'Hibisus neem/Hibiscus neem tulsi1.jpeg',
    image3: 'Hibisus neem/hibiscus neem tulsi2.jpeg',
    image4: '',
    weight: '80g',
    shelf_life: '18 Months',
    point1: 'Antibacterial Neem & Tulsi',
    point2: 'Hibiscus Hair Conditioning',
    point3: 'Controls Dandruff & Itch',
    point4: 'Soothing Scalp Defense',
    point5: 'Biodegradable Travel Bar',
    productCode: 'PP-SHAMPOO-HIBISCUS-NEEM'
  }
];

export async function GET() {
  try {
    // Copy generated waxing powder banner if it does not exist
    try {
      const srcPath = "C:\\Users\\ADMIN\\.gemini\\antigravity-ide\\brain\\b1f4f283-0e9a-4001-bf68-d558a82a29f3\\herbal_waxing_powder_banner_1784778537801.png";
      const destPath = path.join(process.cwd(), 'public', 'uploads', 'HerbalWaxingBanner.png');
      if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log('Successfully copied waxing banner to public/uploads/HerbalWaxingBanner.png');
      }
    } catch (err) {
      console.error('Error copying waxing banner:', err);
    }

    const isDbConnected = await testConnection();
    if (!isDbConnected) {
      console.log('DB offline — returning seed products as fallback.');
      return NextResponse.json({
        success: true,
        source: 'seed_fallback',
        products: SEED_PRODUCTS
      });
    }

    let products = await query<any[]>('SELECT * FROM add_product ORDER BY id DESC');
    if (products) {
      // Ensure image4 column exists if missing
      if (products.length > 0 && !('image4' in products[0])) {
        await query('ALTER TABLE add_product ADD COLUMN image4 varchar(255) DEFAULT NULL');
        console.log('Successfully added image4 column to add_product database.');
      }

      const existingIds = products.map(p => p.id);
      const seedIds = SEED_PRODUCTS.map(p => p.id);

      // Delete obsolete products
      for (const id of existingIds) {
        if (!seedIds.includes(id)) {
          await query('DELETE FROM add_product WHERE id = ?', [id]);
        }
      }

      // Insert missing or update existing
      for (const p of SEED_PRODUCTS) {
        if (!existingIds.includes(p.id)) {
          const sql = `INSERT INTO add_product (id, product_name, product_details, brief_details, product_price,
            original_price, product_category, product_discount, image1, image2, image3, image4, weight, shelf_life,
            point1, point2, point3, point4, point5, productCode) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
          await query(sql, [p.id, p.product_name, p.product_details, p.brief_details, p.product_price,
            p.original_price, p.product_category, p.product_discount, p.image1, p.image2, p.image3, p.image4,
            p.weight, p.shelf_life, p.point1, p.point2, p.point3, p.point4, p.point5, p.productCode]);
        } else {
          const sql = `UPDATE add_product SET product_name = ?, product_details = ?, brief_details = ?, product_price = ?,
            original_price = ?, product_category = ?, product_discount = ?, image1 = ?, image2 = ?, image3 = ?, image4 = ?,
            weight = ?, shelf_life = ?, point1 = ?, point2 = ?, point3 = ?, point4 = ?, point5 = ?, productCode = ? WHERE id = ?`;
          await query(sql, [p.product_name, p.product_details, p.brief_details, p.product_price,
            p.original_price, p.product_category, p.product_discount, p.image1, p.image2, p.image3, p.image4,
            p.weight, p.shelf_life, p.point1, p.point2, p.point3, p.point4, p.point5, p.productCode, p.id]);
        }
      }
      products = await query<any[]>('SELECT * FROM add_product ORDER BY id DESC');
    }

    if (!products) {
      return NextResponse.json({ success: true, source: 'seed_fallback', products: SEED_PRODUCTS });
    }
    return NextResponse.json({ success: true, source: 'database', products });
  } catch (error) {
    console.error('API Products GET route error:', error);
    return NextResponse.json({ success: true, source: 'seed_fallback', products: SEED_PRODUCTS });
  }
}

export async function POST(req: Request) {
  try {
    const isDbConnected = await testConnection();
    if (!isDbConnected) return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
    const data = await req.json();
    const fields = ['product_name','product_details','brief_details','product_price','original_price','product_category','product_discount','image1','image2','image3','image4','weight','shelf_life','point1','point2','point3','point4','point5','productCode'];
    const insertFields: string[] = [];
    const placeholders: string[] = [];
    const values: any[] = [];
    for (const f of fields) {
      if (data[f] !== undefined) { insertFields.push(f); placeholders.push('?'); values.push(data[f]); }
    }
    if (!insertFields.length) return NextResponse.json({ success: false, error: 'No fields provided' }, { status: 400 });
    const sql = `INSERT INTO add_product (${insertFields.join(', ')}) VALUES (${placeholders.join(', ')})`;
    const result: any = await query(sql, values);
    return NextResponse.json({ success: true, message: 'Product created successfully', productId: result?.insertId });
  } catch (e: any) {
    console.error('API Products POST route error:', e);
    return NextResponse.json({ success: false, error: e?.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const isDbConnected = await testConnection();
    if (!isDbConnected) return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
    const data = await req.json();
    const id = data.id;
    if (!id) return NextResponse.json({ success: false, error: 'Product ID is required for updates' }, { status: 400 });
    const fields = ['product_name','product_details','brief_details','product_price','original_price','product_category','product_discount','image1','image2','image3','image4','weight','shelf_life','point1','point2','point3','point4','point5','productCode'];
    const clauses: string[] = [];
    const values: any[] = [];
    for (const f of fields) {
      if (data[f] !== undefined) { clauses.push(`${f} = ?`); values.push(data[f]); }
    }
    if (!clauses.length) return NextResponse.json({ success: false, error: 'No fields provided for update' }, { status: 400 });
    values.push(id);
    const sql = `UPDATE add_product SET ${clauses.join(', ')} WHERE id = ?`;
    await query(sql, values);
    return NextResponse.json({ success: true, message: 'Product updated successfully' });
  } catch (e: any) {
    console.error('API Products PUT route error:', e);
    return NextResponse.json({ success: false, error: e?.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const isDbConnected = await testConnection();
    if (!isDbConnected) return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'Product ID is required for deletion' }, { status: 400 });
    await query('DELETE FROM add_product WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (e: any) {
    console.error('API Products DELETE route error:', e);
    return NextResponse.json({ success: false, error: e?.message || 'Server error' }, { status: 500 });
  }
}
