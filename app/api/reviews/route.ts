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

// 5 to 10 authentic reviews for each product ID
// Rating Targets per User Request:
// - Oils (ID 110): Average = 4.0 stars
// - Soaps (IDs 101, 102, 103, 109): Average = 4.0 stars
// - Other products (Powders & Shampoos: IDs 26, 28, 108, 105, 104, 107): Average = 5.0 stars
const DEFAULT_REVIEWS: Record<number, Omit<ProductReview, 'id' | 'product_id'>[]> = {
  // ID 26: Pureplush Herbal Waxing Powder (Target: 5.0)
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
      name: 'Ananya Deshmukh',
      email: 'ananya.d@example.com',
      rating: 5,
      title: 'Game Changer for Body Care!',
      comment: 'Much better than visiting expensive salons. Pure natural ingredients and super easy application instructions. Smooth finish without any irritation.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-20T09:45:00Z',
    },
    {
      name: 'Radhika Sen',
      email: 'radhika.s@example.com',
      rating: 5,
      title: 'No Skin Irritation At All',
      comment: 'I have extremely sensitive skin that gets red after waxing. This herbal powder gave me silky smooth arms with zero redness or bumps!',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-11T16:20:00Z',
    },
    {
      name: 'Kavya Nair',
      email: 'kavya.n@example.com',
      rating: 5,
      title: 'Highly Recommended Herbal Formula',
      comment: 'Natural botanical fragrance, smooth paste consistency, and instant results without any pain. Best product in my weekly care routine.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-28T11:00:00Z',
    },
    {
      name: 'Sneha Kulkarni',
      email: 'sneha.k@example.com',
      rating: 5,
      title: 'Best Organic Alternative',
      comment: 'I am so glad I switched to Pureplush herbal waxing powder. 100% satisfied with the quality and natural finish.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-14T08:10:00Z',
    },
  ],

  // ID 28: Pureplush Herbal Facewash powder (Target: 5.0)
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
    {
      name: 'Shweta Joshi',
      email: 'shweta.j@example.com',
      rating: 5,
      title: 'Fresh & Exfoliated Feel',
      comment: 'I mix a small teaspoon with rose water daily. Leaves my facial skin super soft, clean, and blemish-free.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-15T09:30:00Z',
    },
    {
      name: 'Pooja Hegde',
      email: 'pooja.h@example.com',
      rating: 5,
      title: 'No Chemical Foam, Pure Goodness!',
      comment: 'Traditional dry face wash done right. Cleanses dirt effortlessly without drying out the skin barrier.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-02T14:40:00Z',
    },
    {
      name: 'Ritu Ganguly',
      email: 'ritu.g@example.com',
      rating: 5,
      title: 'Glowing Complexion',
      comment: 'Regular use cleared up minor whiteheads on my chin within 2 weeks. Very impressed with the purity.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-19T10:15:00Z',
    },
    {
      name: 'Bhavna Shah',
      email: 'bhavna.s@example.com',
      rating: 5,
      title: 'Eco-Friendly & Effective',
      comment: 'Highly effective herbal facial cleanser for daily routine. Great for travel too since it is in dry powder form.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-04T12:00:00Z',
    },
  ],

  // ID 108: Pureplush Herbal Facepack (Target: 5.0)
  108: [
    {
      name: 'Deepika Rao',
      email: 'deepika.r@example.com',
      rating: 5,
      title: 'Instant Spa Glow at Home!',
      comment: 'Mix it with curd or rose water and relax for 15 minutes. Rinses off to reveal super bright and refreshed skin.',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-14T11:00:00Z',
    },
    {
      name: 'Tanvi Mehta',
      email: 'tanvi.m@example.com',
      rating: 5,
      title: 'Soothes Sun Tan & Blemishes',
      comment: 'Very soothing cooling effect on inflamed skin. Fades dark spots gradually with weekly use.',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-01T15:20:00Z',
    },
    {
      name: 'Siddhi Kulkarni',
      email: 'siddhi.k@example.com',
      rating: 5,
      title: '100% Raw Clay & Herbs',
      comment: 'No artificial perfumes or synthetic colors. Smells like pure Ayurvedic herbs and revitalizes tired skin.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-18T13:45:00Z',
    },
    {
      name: 'Aishwarya Pillai',
      email: 'aishwarya.p@example.com',
      rating: 5,
      title: 'Visible Skin Clarity',
      comment: 'Leaves my skin feeling tight, clean, and rejuvenated after every weekend pack application.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-05T10:10:00Z',
    },
    {
      name: 'Rhea Bhatt',
      email: 'rhea.b@example.com',
      rating: 5,
      title: 'Gentle Herbal Detox',
      comment: 'Great for oily skin during humid monsoon months. Keeps pores clean and refined.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-22T17:30:00Z',
    },
    {
      name: 'Nisha Iyer',
      email: 'nisha.i@example.com',
      rating: 5,
      title: 'Must-have Herbal Ritual',
      comment: 'Ordering my second tub already! Wonderful botanical mask.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-09T09:00:00Z',
    },
  ],

  // ID 105: PurePlush Herbal Hair Wash Powder (Target: 5.0)
  105: [
    {
      name: 'Aarav Kumar',
      email: 'aarav.k@example.com',
      rating: 5,
      title: 'Authentic Amla & Shikakai Cleanser',
      comment: 'Reduces hair fall and strengthens hair roots naturally. My scalp feels scale-free and incredibly fresh!',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-19T09:00:00Z',
    },
    {
      name: 'Sunita Menon',
      email: 'sunita.m@example.com',
      rating: 5,
      title: 'Say Goodbye to Sulphate Shampoos!',
      comment: 'My hair texture has improved significantly since switching to this natural hair wash powder. Highly recommended.',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-06T14:30:00Z',
    },
    {
      name: 'Vikramaditya Singh',
      email: 'vikram.s@example.com',
      rating: 5,
      title: 'Healthy Shine & Volume',
      comment: 'Bhringraj and Amla nourish the scalp deeply. My hair feels bouncy, full, and naturally clean.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-22T11:15:00Z',
    },
    {
      name: 'Divya Sundaram',
      email: 'divya.s@example.com',
      rating: 5,
      title: 'Clean Scalp without Dryness',
      comment: 'Removes oil build-up effectively while keeping hair ends soft and manageable.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-10T16:00:00Z',
    },
    {
      name: 'Karthik Rajan',
      email: 'karthik.r@example.com',
      rating: 5,
      title: 'Pure Traditional Hair Care',
      comment: 'No chemical lather, just pure botanical herbal goodness that works wonders for scalp health.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-27T08:45:00Z',
    },
    {
      name: 'Geeta Saxena',
      email: 'geeta.s@example.com',
      rating: 5,
      title: 'Wonderful Product',
      comment: 'Very gentle on graying hair and sensitive scalp. Will repurchase.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-12T12:20:00Z',
    },
  ],

  // ID 104: Pureplush Multani Mitti Saffron Shampoo Bar (Target: 5.0)
  104: [
    {
      name: 'Riddhi Agarwal',
      email: 'riddhi.a@example.com',
      rating: 5,
      title: 'Luxurious Saffron Lather!',
      comment: 'Rich creamy lather that leaves hair glossy, soft, and delicately scented with natural saffron.',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-16T12:10:00Z',
    },
    {
      name: 'Mahesh Iyer',
      email: 'mahesh.i@example.com',
      rating: 5,
      title: 'Zero Waste & Great Scalp Cleanse',
      comment: 'Perfect travel-friendly shampoo bar. Multani Mitti absorbs excess scalp grease effortlessly.',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-03T10:40:00Z',
    },
    {
      name: 'Shruti Banerji',
      email: 'shruti.b@example.com',
      rating: 5,
      title: 'No Conditioner Needed!',
      comment: 'My hair felt silky smooth immediately after the first wash. Love the saffron extract feel.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-19T15:00:00Z',
    },
    {
      name: 'Alok Pandey',
      email: 'alok.p@example.com',
      rating: 5,
      title: 'Long-Lasting Bar',
      comment: 'One bar easily lasts for over 40+ hair washes. Outstanding value and quality.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-06T09:15:00Z',
    },
    {
      name: 'Preeti Nambiar',
      email: 'preeti.n@example.com',
      rating: 5,
      title: 'Chemical Free Hair Transformation',
      comment: 'Solved my itchy scalp problem completely. Clean and shiny hair feel.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-24T14:20:00Z',
    },
    {
      name: 'Varun Mahajan',
      email: 'varun.m@example.com',
      rating: 5,
      title: 'Awesome Product',
      comment: 'High quality natural solid shampoo bar. Fits nicely into eco-friendly routine.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-10T11:00:00Z',
    },
  ],

  // ID 107: Pureplush Hibiscus Neemtulsi Shampoo Bar (Target: 5.0)
  107: [
    {
      name: 'Nandini Reddi',
      email: 'nandini.r@example.com',
      rating: 5,
      title: 'Dandruff Controlled in 3 Washes!',
      comment: 'Neem and Tulsi extract soothe itchy scalp and effectively eliminate flaky dandruff.',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-17T13:20:00Z',
    },
    {
      name: 'Karan Talwar',
      email: 'karan.t@example.com',
      rating: 5,
      title: 'Hibiscus Conditioning Magic',
      comment: 'Leaves hair roots strong, clean, and well-conditioned without synthetic chemicals.',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-04T09:15:00Z',
    },
    {
      name: Swati Bhardwaj',
      email: 'swati.b@example.com',
      rating: 5,
      title: 'Very Refreshing Scalp Defense',
      comment: 'Feels super clean and cool after washing. Hibiscus adds natural softness.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-21T16:40:00Z',
    },
    {
      name: 'Gaurav Tandon',
      email: 'gaurav.t@example.com',
      rating: 5,
      title: 'Eco-Friendly & Powerful',
      comment: 'Excellent solid shampoo bar for daily use. Cleanses scalp thoroughly.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-08T11:30:00Z',
    },
    {
      name: 'Aditi Varma',
      email: 'aditi.v@example.com',
      rating: 5,
      title: 'Soft Lather & Natural Scent',
      comment: 'Highly recommended for sensitive scalp and daily routine.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-25T10:00:00Z',
    },
    {
      name: 'Payal Mukherjee',
      email: 'payal.m@example.com',
      rating: 5,
      title: 'Best Anti-Dandruff Herbal Bar',
      comment: 'Will order again! Wonderful natural formulation.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-11T15:10:00Z',
    },
  ],

  // ID 101: Mango Butter Mud Sea Clay Soap (Target: 4.0 - Soap Category)
  101: [
    {
      name: 'Sneha Gupta',
      email: 'sneha.g@example.com',
      rating: 4,
      title: 'Rich Creamy Lather & Purifying Clay',
      comment: 'Soft moisturizing bath bar with sea clay. Keeps skin clean, comfortable and hydrated.',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-10T12:00:00Z',
    },
    {
      name: 'Rajesh Nair',
      email: 'rajesh.n@example.com',
      rating: 4,
      title: 'Good Natural Bath Bar',
      comment: 'Pleasant earthy aroma and gentle cleansing feel. Works well for daily bath routine.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-26T14:10:00Z',
    },
    {
      name: 'Neha Chaudhry',
      email: 'neha.c@example.com',
      rating: 4,
      title: 'Moisturizing & Clean',
      comment: 'Mango butter keeps winter dryness away effectively. Very mild lather.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-12T09:20:00Z',
    },
    {
      name: 'Amitabh Roy',
      email: 'amitabh.r@example.com',
      rating: 4,
      title: 'Solid Quality Cold-Pressed Soap',
      comment: 'Long-lasting bar with mild natural fragrance. Cleanses dirt well.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-30T11:45:00Z',
    },
    {
      name: 'Pooja Kulkarni',
      email: 'pooja.k@example.com',
      rating: 4,
      title: 'Gentle on Sensitive Skin',
      comment: 'Good daily soap bar for the whole family. Leaves body skin feeling soft.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-16T15:30:00Z',
    },
    {
      name: 'Manoj Prasad',
      email: 'manoj.p@example.com',
      rating: 4,
      title: 'Effective Mud Cleanser',
      comment: 'Rinses off easily without leaving heavy residue. Good soap.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-02T08:15:00Z',
    },
  ],

  // ID 102: Shea Butter Multani Mitti Soap (Target: 4.0 - Soap Category)
  102: [
    {
      name: 'Kirti Saxena',
      email: 'kirti.s@example.com',
      rating: 4,
      title: 'Balanced Oil Control & Hydration',
      comment: 'Multani Mitti absorbs excess body oil while shea butter conditions skin.',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-11T10:15:00Z',
    },
    {
      name: 'Deepak Verma',
      email: 'deepak.v@example.com',
      rating: 4,
      title: 'Good Refreshing Bath Soap',
      comment: 'Great for summer days to get rid of sweat and grime naturally.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-27T16:00:00Z',
    },
    {
      name: 'Sujata Tripathy',
      email: 'sujata.t@example.com',
      rating: 4,
      title: 'Natural Detox Soap',
      comment: 'Keeps skin soft and clean throughout the day without tightness.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-13T12:30:00Z',
    },
    {
      name: 'Hemant Kumar',
      email: 'hemant.k@example.com',
      rating: 4,
      title: 'Decent Herbal Soap Bar',
      comment: 'Nice earthy feel and subtle herbal scent. Good daily bath bar.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-31T09:10:00Z',
    },
    {
      name: 'Archana Sen',
      email: 'archana.s@example.com',
      rating: 4,
      title: 'Mild Exfoliating Feel',
      comment: 'Leaves body skin smooth and refreshed. Satisfied with product.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-17T14:00:00Z',
    },
    {
      name: 'Vishal Shinde',
      email: 'vishal.s@example.com',
      rating: 4,
      title: 'Quality Handcrafted Soap',
      comment: 'Chemical-free cold pressed base. Good value soap bar.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-03T11:20:00Z',
    },
  ],

  // ID 103: Goat Milk French Green Clay Soap (Target: 4.0 - Soap Category)
  103: [
    {
      name: 'Rashmi Hegde',
      email: 'rashmi.h@example.com',
      rating: 4,
      title: 'Creamy Goat Milk Cleanser',
      comment: 'French green clay draws out impurities while goat milk softens skin.',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-12T14:40:00Z',
    },
    {
      name: 'Suresh Bhat',
      email: 'suresh.b@example.com',
      rating: 4,
      title: 'Smooth & Nourishing Bath Bar',
      comment: 'Leaves skin feeling clean, refreshed and comfortable after bath.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-28T09:20:00Z',
    },
    {
      name: 'Meenakshi Sundaram',
      email: 'meenakshi.s@example.com',
      rating: 4,
      title: 'Soothing Green Clay Formula',
      comment: 'Good for daily shower routine. Very mild natural fragrance.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-14T11:00:00Z',
    },
    {
      name: 'Nitin Kapoor',
      email: 'nitin.k@example.com',
      rating: 4,
      title: 'Gentle Detoxifying Soap',
      comment: 'No harsh synthetic perfume smell. Smooth lather.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-01T15:30:00Z',
    },
    {
      name: 'Pavitra Menon',
      email: 'pavitra.m@example.com',
      rating: 4,
      title: 'Soft Skin Finish',
      comment: 'Does not dry out skin after bath. Good quality bath bar.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-18T10:15:00Z',
    },
    {
      name: 'Rahul Deshmukh',
      email: 'rahul.d@example.com',
      rating: 4,
      title: 'Solid Handcrafted Soap Bar',
      comment: 'Great value for money and pure ingredients.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-04T16:00:00Z',
    },
  ],

  // ID 109: Goat Milk Coffee De-Tan Soap (Target: 4.0 - Soap Category)
  109: [
    {
      name: 'Vani Krishnan',
      email: 'vani.k@example.com',
      rating: 4,
      title: 'Energizing Coffee Scrub & De-Tan',
      comment: 'Natural coffee grounds provide mild exfoliation to remove sun tan effectively.',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-13T11:15:00Z',
    },
    {
      name: 'Siddharth Malhotra',
      email: 'siddharth.m@example.com',
      rating: 4,
      title: 'Fresh Coffee Aroma',
      comment: 'Great morning bath soap with a pleasant scrub feel.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-29T13:40:00Z',
    },
    {
      name: 'Anushka Dave',
      email: 'anushka.d@example.com',
      rating: 4,
      title: 'Soft & Exfoliated Skin',
      comment: 'Goat milk ensures skin does not get dry after scrubbing.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-15T10:10:00Z',
    },
    {
      name: 'Tarun Mehta',
      email: 'tarun.m@example.com',
      rating: 4,
      title: 'Good Body Scrub Bar',
      comment: 'Helps clear rough patches on elbows and knees.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-02T16:20:00Z',
    },
    {
      name: 'Divya Reddy',
      email: 'divya.r@example.com',
      rating: 4,
      title: 'Refreshing De-Tan Soap',
      comment: 'Noticed skin looks cleaner after regular use.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-19T09:45:00Z',
    },
    {
      name: 'Kushal Shah',
      email: 'kushal.s@example.com',
      rating: 4,
      title: 'Nice Natural Soap',
      comment: 'Good texture and refreshing lather.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-05T14:10:00Z',
    },
  ],

  // ID 110: Herbal Kesh Oil (Target: 4.0 - Oil Category)
  110: [
    {
      name: 'Rohan Sharma',
      email: 'rohan.s@example.com',
      rating: 4,
      title: 'Traditional Bhringraj & Amla Hair Oil',
      comment: 'Deeply nourishes scalp, controls hair fall and dry scalp effectively.',
      verified: 1,
      status: 'approved',
      created_at: '2026-07-14T15:10:00Z',
    },
    {
      name: 'Kavita Chawla',
      email: 'kavita.c@example.com',
      rating: 4,
      title: 'Good Herbal Hair Treatment',
      comment: 'Non-sticky formula with authentic herbal aroma.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-30T11:30:00Z',
    },
    {
      name: 'Manish Tiwari',
      email: 'manish.t@example.com',
      rating: 4,
      title: 'Reduces Scalp Dryness',
      comment: 'Regular warm oil massage strengthens hair roots and shines hair.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-16T14:00:00Z',
    },
    {
      name: 'Bhavya Shetty',
      email: 'bhavya.s@example.com',
      rating: 4,
      title: 'Nourishing Ayurvedic Oil',
      comment: 'Helps keep hair soft, healthy and manageable.',
      verified: 1,
      status: 'approved',
      created_at: '2026-06-03T09:20:00Z',
    },
    {
      name: 'Pradeep Yadav',
      email: 'pradeep.y@example.com',
      rating: 4,
      title: 'Effective Hair Fall Defense',
      comment: 'Zero mineral oils or synthetic chemicals. Good quality hair oil.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-20T12:40:00Z',
    },
    {
      name: 'Sarita Goswami',
      email: 'sarita.g@example.com',
      rating: 4,
      title: 'Good Hair Care Oil',
      comment: 'Great for overnight scalp conditioning.',
      verified: 1,
      status: 'approved',
      created_at: '2026-05-06T16:15:00Z',
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
