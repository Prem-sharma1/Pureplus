import { NextResponse } from 'next/server';
import { query, testConnection } from '@/lib/db';

const SEED_PRODUCTS = [
  {
    id: 26,
    product_name: 'ABC Latte Mix(Malt) Powder',
    product_details: 'Pureplush ABC Latte Mix Malt Powder – a wholesome blend of Apple, Beetroot, and Carrot with natural malt for a nourishing, tasty, and energizing health drink. 100g',
    brief_details: 'Pureplush ABC Latte Mix Malt Powder. Discover the goodness of nature in every sip with Apple, Beetroot, Carrot (ABC) and wholesome malt.',
    product_price: '199.00',
    original_price: '249.00',
    product_category: 'Moringa Powders',
    product_discount: 20,
    image1: 'FaceWash/Herbal2.png',
    image2: 'FaceWash/Herbal1.png',
    image3: 'FaceWash/Herbal3.png',
    weight: '100g',
    shelf_life: '12 Months',
    point1: 'Rich in Nutrients',
    point2: 'Immunity Support',
    point3: 'Glowing Skin & Eyes',
    point4: 'No Added Sugar',
    point5: '100% Vegan & Natural',
    productCode: 'PP-ABC-LATTE'
  },
  {
    id: 28,
    product_name: 'Choco Multigrain Millet Malt Mix',
    product_details: 'Pureplush Choco Multigrain Millet Malt Mix Powder – A delicious and nutritious blend of wholesome millets, grains, and natural cocoa, crafted to give you energy, strength, and taste in every sip. 100g.',
    brief_details: 'Pureplush Choco Multigrain Millet Malt Mix Powder is a perfect fusion of health and taste. Made with the goodness of nutrient-rich millets and natural cocoa.',
    product_price: '199.00',
    original_price: '249.00',
    product_category: 'Moringa Powders',
    product_discount: 20,
    image1: 'FaceWash/Herbal3.png',
    image2: 'FaceWash/Herbal2.png',
    image3: 'FaceWash/Herbal4.png',
    weight: '100g',
    shelf_life: '12 Months',
    point1: 'Rich in Protein & Fiber',
    point2: 'No Preservatives',
    point3: 'Suitable for All Ages',
    point4: 'Energy Booster',
    point5: 'Calcium & Iron Rich',
    productCode: 'PP-CHOCO-MILLET'
  },
  {
    id: 101,
    product_name: 'Vedic Neem & Turmeric Soap',
    product_details: 'Pureplush Handcrafted Neem & Turmeric soap combines natural skin protection with gentle botanical nourishment, leaving skin refreshed and pure. 100g.',
    brief_details: 'Vedic soap handcrafted with fresh neem extracts and wild turmeric root oil for daily antibacterial defense.',
    product_price: '120.00',
    original_price: '180.00',
    product_category: 'Natural Soaps',
    product_discount: 33,
    image1: 'Soap/Soap.png',
    image2: 'Soap/Soap2.jpg',
    image3: 'Soap/Soap3.jpg',
    weight: '100g',
    shelf_life: '24 Months',
    point1: '100% Handcrafted Soap',
    point2: 'Antibacterial Neem Extract',
    point3: 'Soothes Dry & Sensitive Skin',
    point4: 'Rich Creamy Lather',
    point5: 'Paraben & Sulphate Free',
    productCode: 'PP-SOAP-NEEM'
  },
  {
    id: 102,
    product_name: 'Honey & Sandalwood Glow Soap',
    product_details: 'A moisturizing, glow-enhancing soap bar loaded with pure organic forest honey and steam-distilled sandalwood oils. 100g.',
    brief_details: 'Moisturizing bar containing deep forest honey and pure sandalwood to hydrate and restore natural radiance.',
    product_price: '140.00',
    original_price: '190.00',
    product_category: 'Natural Soaps',
    product_discount: 26,
    image1: 'Soap/Soap2.jpg',
    image2: 'Soap/Soap.png',
    image3: 'Soap/Soap3.jpg',
    weight: '100g',
    shelf_life: '24 Months',
    point1: 'Forest Wild Honey',
    point2: 'Steam-Distilled Sandalwood',
    point3: 'Hydrates & Restores Glow',
    point4: 'Gentle Cleansing',
    point5: 'Natural Scent',
    productCode: 'PP-SOAP-HONEY'
  },
  {
    id: 103,
    product_name: 'Lavender Relaxation Soap',
    product_details: 'Relax your mind and body with pure French lavender essential oils and cold-pressed botanical bases. 100g.',
    brief_details: 'A calming body wash bar infused with absolute lavender oil and skin-softening goat milk extracts.',
    product_price: '130.00',
    original_price: '180.00',
    product_category: 'Natural Soaps',
    product_discount: 27,
    image1: 'Soap/Soap3.jpg',
    image2: 'Soap/Soap.png',
    image3: 'Soap/Soap2.jpg',
    weight: '100g',
    shelf_life: '24 Months',
    point1: 'French Lavender Oil',
    point2: 'Calming Aromatherapy Benefit',
    point3: 'Rich Conditioning Lather',
    point4: 'Pure Goat Milk Base',
    point5: 'Cruelty Free',
    productCode: 'PP-SOAP-LAVENDER'
  },
  {
    id: 104,
    product_name: 'Rosemary & Tea Tree Shampoo Bar',
    product_details: 'A luxurious solid shampoo bar formulated with fresh rosemary herbs and organic tea tree oils to reduce dandruff and strengthen hair roots. 80g.',
    brief_details: 'Solid zero-waste shampoo bar loaded with rosemary leaves and tea tree oil for clean scalp and healthy hair.',
    product_price: '220.00',
    original_price: '280.00',
    product_category: 'Shampoo Bars',
    product_discount: 21,
    image1: 'Shampoobar/Shampoobar.png',
    image2: 'Shampoobar/Shampoobar2.png',
    image3: '',
    weight: '80g',
    shelf_life: '18 Months',
    point1: 'Zero Waste Solid Bar',
    point2: 'Tea Tree Oil for Scalp Health',
    point3: 'Strengthens Root Follicles',
    point4: 'Reduces Dandruff & Flaking',
    point5: 'Travel Friendly Size',
    productCode: 'PP-SHAMPOO-ROSEMARY'
  },
  {
    id: 105,
    product_name: 'Aloe Vera Rejuvenating Gel',
    product_details: 'Pure fresh aloe vera inner leaf jelly to soothe, cool, and hydrate the face and body. 120g.',
    brief_details: 'Natural cooling moisturizer made with 99% pure aloe vera juice to soothe sunburn, acne, and redness.',
    product_price: '180.00',
    original_price: '240.00',
    product_category: 'others',
    product_discount: 25,
    image1: '6330345451856531104.jpg',
    image2: 'FaceWash/Herbal4.png',
    image3: 'FaceWash/Herbal1.png',
    weight: '120g',
    shelf_life: '12 Months',
    point1: '99% Pure Inner Leaf Aloe',
    point2: 'Cools Sunburns & Skin Redness',
    point3: 'Non-Greasy Daily Hydration',
    point4: 'Absorbs Instantly',
    point5: 'Chemical Free Base',
    productCode: 'PP-ALOE-GEL'
  },
  {
    id: 106,
    product_name: 'Kashmiri Saffron Glow Face Oil',
    product_details: 'Traditional Kumkumadi tailam facial serum infused with authentic Kashmiri saffron threads, sandalwood, and licorice. 30ml.',
    brief_details: 'Premium night beauty serum made with Kashmiri saffron to improve skin texture and complexions.',
    product_price: '399.00',
    original_price: '499.00',
    product_category: 'others',
    product_discount: 20,
    image1: 'FaceWash/Herbal4.png',
    image2: 'FaceWash/Herbal2.png',
    image3: 'FaceWash/Herbal3.png',
    weight: '30ml',
    shelf_life: '18 Months',
    point1: 'Authentic Kumkumadi Formulation',
    point2: 'Infused with Real Saffron Threads',
    point3: 'Fades Dark Spots & Pigmentation',
    point4: 'Anti-Aging Elixir',
    point5: 'Lightweight & Non-Sticky',
    productCode: 'PP-SAFFRON-OIL'
  },
  {
    id: 107,
    product_name: 'Charcoal & Bamboo Shampoo Bar',
    product_details: 'Pureplush Charcoal & Bamboo Shampoo Bar provides deep scalp detox, pulling out oils and toxins while moisturizing with organic coconut and argan base. 80g.',
    brief_details: 'Detoxifying solid shampoo bar with active bamboo charcoal and tea tree for clean, bouncy hair.',
    product_price: '230.00',
    original_price: '290.00',
    product_category: 'Shampoo Bars',
    product_discount: 21,
    image1: 'Shampoobar/Shampoobar2.png',
    image2: 'Shampoobar/Shampoobar.png',
    image3: '',
    weight: '80g',
    shelf_life: '18 Months',
    point1: 'Active Bamboo Charcoal',
    point2: 'Deep Scalp Detoxification',
    point3: 'Restores Volume & Shine',
    point4: 'Toxin & Residue Free',
    point5: '100% Solid & Vegan',
    productCode: 'PP-SHAMPOO-CHARCOAL'
  },
  {
    id: 108,
    product_name: 'Vedic Neem & Aloe Facewash',
    product_details: 'Gentle, non-drying foaming facewash packed with active neem leaves and cooling aloe vera gel to wash away impurities and fight acne-causing germs. 150ml.',
    brief_details: 'Organic purifying facewash formulated with neem leaf extracts and soothing aloe vera.',
    product_price: '190.00',
    original_price: '250.00',
    product_category: 'others',
    product_discount: 24,
    image1: 'FaceWash/Herbal1.png',
    image2: 'FaceWash/Herbal2.png',
    image3: 'FaceWash/Herbal3.png',
    weight: '150ml',
    shelf_life: '12 Months',
    point1: 'Purifying Organic Neem',
    point2: 'Hydrating Aloe Vera Gel',
    point3: 'Fights Acne & Impurities',
    point4: 'Sulphate & Soap Free',
    point5: 'Restores pH Balance',
    productCode: 'PP-FACEWASH-NEEM'
  }
];

export async function GET() {
  try {
    const isDbConnected = await testConnection();
    
    if (!isDbConnected) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed',
        products: []
      });
    }

    let products = await query<any[]>('SELECT * FROM add_product ORDER BY id DESC');
    
    // TEMPORARY INSPECTOR LOGGING
    try {
      const fs = require('fs');
      const path = require('path');
      const addProductCols = await query('DESCRIBE add_product');
      const orderCols = await query('SHOW TABLES LIKE "orders"');
      const orderSingularCols = await query('SHOW TABLES LIKE "order"');
      
      const inspectData = {
        addProductCols,
        hasOrdersTable: orderCols,
        hasOrderSingularTable: orderSingularCols
      };
      
      fs.writeFileSync(
        path.join('C:', 'Users', 'ADMIN', '.gemini', 'antigravity-ide', 'brain', 'd62f023d-26ed-41ea-97d7-d9f287b08664', 'scratch', 'db_info.json'),
        JSON.stringify(inspectData, null, 2),
        'utf8'
      );
    } catch (inspectErr: any) {
      console.error('Inspector error:', inspectErr);
    }

    // Auto-seed mock data into client database if table is empty
    if (products && products.length === 0) {
      console.log('Database products catalog is empty. Initializing auto-seed...');
      for (const p of SEED_PRODUCTS) {
        const sql = `INSERT INTO add_product (
          id, product_name, product_details, brief_details, product_price,
          original_price, product_category, product_discount, image1,
          image2, image3, weight, shelf_life, point1, point2,
          point3, point4, point5, productCode
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        await query(sql, [
          p.id, p.product_name, p.product_details, p.brief_details, p.product_price,
          p.original_price, p.product_category, p.product_discount, p.image1,
          p.image2, p.image3, p.weight, p.shelf_life, p.point1, p.point2,
          p.point3, p.point4, p.point5, p.productCode
        ]);
      }
      // Re-fetch seeded data
      products = await query<any[]>('SELECT * FROM add_product ORDER BY id DESC');
    }

    if (!products) {
      return NextResponse.json({
        success: false,
        error: 'Failed to retrieve products from database',
        products: []
      });
    }

    return NextResponse.json({ 
      success: true,
      products: products
    });
  } catch (error: any) {
    console.error('API Products GET route error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Server error',
      products: []
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isDbConnected = await testConnection();
    if (!isDbConnected) {
      return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
    }

    const data = await req.json();
    const fields = [
      'product_name', 'product_details', 'brief_details', 'product_price',
      'original_price', 'product_category', 'product_discount', 'image1',
      'image2', 'image3', 'weight', 'shelf_life', 'point1', 'point2',
      'point3', 'point4', 'point5', 'productCode'
    ];

    const values: any[] = [];
    const placeholders: string[] = [];
    const insertFields: string[] = [];

    for (const f of fields) {
      if (data[f] !== undefined) {
        insertFields.push(f);
        placeholders.push('?');
        values.push(data[f]);
      }
    }

    if (insertFields.length === 0) {
      return NextResponse.json({ success: false, error: 'No fields provided' }, { status: 400 });
    }

    const sql = `INSERT INTO add_product (${insertFields.join(', ')}) VALUES (${placeholders.join(', ')})`;
    const result: any = await query(sql, values);

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      productId: result?.insertId
    });
  } catch (error: any) {
    console.error('API Products POST route error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const isDbConnected = await testConnection();
    if (!isDbConnected) {
      return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
    }

    const data = await req.json();
    const id = data.id;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID is required for updates' }, { status: 400 });
    }

    const fields = [
      'product_name', 'product_details', 'brief_details', 'product_price',
      'original_price', 'product_category', 'product_discount', 'image1',
      'image2', 'image3', 'weight', 'shelf_life', 'point1', 'point2',
      'point3', 'point4', 'point5', 'productCode'
    ];

    const updateClauses: string[] = [];
    const values: any[] = [];

    for (const f of fields) {
      if (data[f] !== undefined) {
        updateClauses.push(`${f} = ?`);
        values.push(data[f]);
      }
    }

    if (updateClauses.length === 0) {
      return NextResponse.json({ success: false, error: 'No fields provided for update' }, { status: 400 });
    }

    values.push(id);
    const sql = `UPDATE add_product SET ${updateClauses.join(', ')} WHERE id = ?`;
    await query(sql, values);

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully'
    });
  } catch (error: any) {
    console.error('API Products PUT route error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const isDbConnected = await testConnection();
    if (!isDbConnected) {
      return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID is required for deletion' }, { status: 400 });
    }

    const sql = 'DELETE FROM add_product WHERE id = ?';
    await query(sql, [id]);

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error: any) {
    console.error('API Products DELETE route error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}
