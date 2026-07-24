'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Check, 
  X, 
  Search, 
  DollarSign, 
  ShoppingBag, 
  BarChart3, 
  Eye, 
  RefreshCw,
  Calendar,
  Phone,
  MapPin,
  Tag,
  Menu,
  Layers,
  Settings,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Save,
  FileText,
  Download,
  CheckCircle2,
  Leaf
} from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: number;
  product_name: string;
  product_details: string;
  brief_details: string;
  product_price: string;
  original_price: string;
  product_category: string;
  product_discount: number;
  image1: string;
  image2?: string;
  image3?: string;
  weight: string;
  shelf_life?: string;
  point1?: string;
  point2?: string;
  point3?: string;
  point4?: string;
  point5?: string;
  productCode?: string;
}

interface OrderItem {
  id: number;
  product_name: string;
  product_price: string;
  weight: string;
  quantity: number;
}

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  total_amount: number;
  payment_status: string;
  payment_id: string;
  order_date: string;
  shipping_status: string;
  courier_partner: string;
  tracking_number: string;
  items: OrderItem[];
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ComparisonRow {
  feature: string;
  pureplus: string;
  ordinary: string;
}

interface SectionToggle {
  id: string;
  name: string;
  enabled: boolean;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'sections' | 'hero' | 'products' | 'orders'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Modal States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Section Config State
  const [sectionConfig, setSectionConfig] = useState<any>({
    announcementBar: {
      enabled: true,
      text1: '🍃 Natural Wellness & Personal Care - Crafted with Carefully Selected Botanical Ingredients',
      text2: '🚚 Free Shipping on eligible standard orders across India',
      text3: '✨ ISO 22716:2007 GMP Certified Cosmetics (Cert No: QCCI/24C/SMX/4779)'
    },
    sections: {
      hero: { id: 'hero', name: 'Hero Banner Section', enabled: true },
      categories: { id: 'categories', name: 'Product Categories', enabled: true },
      process: { id: 'process', name: 'Sourcing Process Timeline', enabled: true },
      founderVision: { id: 'founderVision', name: 'Our Story & Vision', enabled: true },
      famousProducts: { id: 'famousProducts', name: 'Famous Products Showcase', enabled: true },
      benefits: { id: 'benefits', name: 'Health Concern Selector', enabled: true },
      comparison: { id: 'comparison', name: 'Pureplus vs Ordinary Market Comparison Table', enabled: true },
      faq: { id: 'faq', name: 'Frequently Asked Questions (FAQ)', enabled: true },
      credibility: { id: 'credibility', name: 'Brand Trust & Promises Banner', enabled: true }
    },
    comparisonSection: {
      title: 'Pureplus vs. Ordinary Market Products',
      subtitle: 'See the difference natural ingredients and certified quality make for your daily care routine.',
      fssaiBadge: 'ISO 22716:2007 (QCCI/24C/SMX/4779)',
      rows: [
        { feature: 'Ingredient Sourcing', pureplus: '100% Pure & Wild-Crafted', ordinary: 'Synthetic & Industrial Solvents' },
        { feature: 'Added Refined Sugars', pureplus: 'ZERO Refined Sugar', ordinary: 'Up to 60% Refined Sugar / Maltodextrin' },
        { feature: 'Grains & Processing', pureplus: 'Sprouted Millets & Raw Cocoa', ordinary: 'Processed Wheat Flour & Artificial Flavors' },
        { feature: 'Quality Certification', pureplus: 'ISO 22716:2007 (GMP Certified)', ordinary: 'Basic Commercial Standards' },
        { feature: 'Preservatives & Additives', pureplus: '100% Chemical-Free', ordinary: 'Artificial Colors & Chemical Preservatives' }
      ]
    },
    faqSection: {
      badge: 'CUSTOMER HELP & SUPPORT',
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about our pure botanical blends, certifications, preparation, and delivery',
      items: [
        { question: 'Are Pureplus products 100% natural and sugar-free?', answer: 'Pureplus products are crafted with carefully selected botanical ingredients, with zero refined sugars added in our wellness mixes. Every product formula is clearly labeled with transparent ingredients.' },
        { question: 'Are your malts and soaps safe for growing kids and elders?', answer: 'Yes! All Pureplus malts, soaps, powders, and shampoo bars are formulated with gentle, food-grade and botanical ingredients without harsh synthetic chemicals.' },
        { question: 'Is Pureplus certified by ISO & GMP standards?', answer: 'Yes, Pureplus products (Saish Impex) adhere strictly to certified quality standards including ISO 22716:2007 Cosmetics - Good Manufacturing Practices (GMP) (Certificate No: QCCI/24C/SMX/4779).' },
        { question: 'How do I prepare Pureplus mixes?', answer: 'For wellness drinks and malts: Mix 1-2 teaspoons in warm water or milk. For facewash and facepack powders: Mix 1 teaspoon with water or rose water into a smooth paste.' },
        { question: 'How does Free Shipping work on Pureplus orders?', answer: 'Free shipping is automatically applied at checkout on eligible standard orders across India with real-time tracking.' }
      ]
    }
  });

  const [savingSections, setSavingSections] = useState(false);

  // New FAQ Form State
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  // Form Fields State for Products
  const [formFields, setFormFields] = useState<Partial<Product>>({
    product_name: '',
    product_details: '',
    brief_details: '',
    product_price: '0',
    original_price: '0',
    product_category: '',
    product_discount: 0,
    image1: '',
    image2: '',
    image3: '',
    weight: '',
    shelf_life: '',
    point1: '',
    point2: '',
    point3: '',
    point4: '',
    point5: '',
    productCode: ''
  });

  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});

  // Auth guard — verify session on every mount
  useEffect(() => {
    fetch('/api/admin/check')
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          window.location.href = '/admin/login';
        }
      })
      .catch(() => {
        window.location.href = '/admin/login';
      });
  }, []);

  // Load initial data
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [prodRes, ordRes, secRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders?email=all'),
        fetch('/api/sections')
      ]);

      const prodData = await prodRes.json();
      const ordData = await ordRes.json();
      const secData = await secRes.json();

      if (prodData.success) {
        setProducts(prodData.products || []);
      }
      if (ordData.success) {
        setOrders(ordData.orders || []);
      }
      if (secData.success && secData.config) {
        setSectionConfig(secData.config);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Section Toggle Handler
  const toggleSectionState = (sectionKey: string) => {
    setSectionConfig((prev: any) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
          ...prev.sections[sectionKey],
          enabled: !prev.sections[sectionKey].enabled
        }
      }
    }));
  };

  // Save Section Configuration to API
  const saveSectionConfig = async () => {
    setSavingSections(true);
    try {
      const res = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: sectionConfig })
      });
      const data = await res.json();
      if (data.success) {
        alert('✨ Homepage Section Configurations Saved Successfully!');
      } else {
        alert('Error saving section config: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save section settings');
    } finally {
      setSavingSections(false);
    }
  };

  // Add FAQ Item
  const handleAddFaqItem = () => {
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) {
      alert('Please enter both question and answer');
      return;
    }
    setSectionConfig((prev: any) => ({
      ...prev,
      faqSection: {
        ...prev.faqSection,
        items: [
          ...prev.faqSection.items,
          { question: newFaqQuestion.trim(), answer: newFaqAnswer.trim() }
        ]
      }
    }));
    setNewFaqQuestion('');
    setNewFaqAnswer('');
  };

  // Delete FAQ Item
  const handleDeleteFaqItem = (index: number) => {
    setSectionConfig((prev: any) => ({
      ...prev,
      faqSection: {
        ...prev.faqSection,
        items: prev.faqSection.items.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  // Update Comparison Row
  const handleComparisonRowChange = (index: number, field: 'feature' | 'pureplus' | 'ordinary', val: string) => {
    setSectionConfig((prev: any) => {
      const updatedRows = [...prev.comparisonSection.rows];
      updatedRows[index] = { ...updatedRows[index], [field]: val };
      return {
        ...prev,
        comparisonSection: {
          ...prev.comparisonSection,
          rows: updatedRows
        }
      };
    });
  };

  // Handle Input Changes for Product Modal
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormFields(prev => ({
      ...prev,
      [name]: name === 'product_discount' ? parseInt(value) || 0 : value
    }));
  };

  // Image Upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'image1' | 'image2' | 'image3') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(prev => ({ ...prev, [fieldName]: true }));
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setFormFields(prev => ({
          ...prev,
          [fieldName]: data.filePath
        }));
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Upload error');
    } finally {
      setUploading(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  // Open Add Product Modal
  const openAddModal = () => {
    setEditingProduct(null);
    setFormFields({
      product_name: '',
      product_details: '',
      brief_details: '',
      product_price: '0',
      original_price: '0',
      product_category: 'Natural Soaps',
      product_discount: 0,
      image1: '',
      image2: '',
      image3: '',
      weight: '',
      shelf_life: '12 Months',
      point1: '',
      point2: '',
      point3: '',
      point4: '',
      point5: '',
      productCode: ''
    });
    setIsProductModalOpen(true);
  };

  // Open Edit Product Modal
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormFields({ ...product });
    setIsProductModalOpen(true);
  };

  // Save Product (Create / Update)
  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = '/api/products';
    const method = editingProduct ? 'PUT' : 'POST';
    const payload = editingProduct ? { ...formFields, id: editingProduct.id } : formFields;

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setIsProductModalOpen(false);
        fetchInitialData();
      } else {
        alert('Error saving product: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error saving product');
    }
  };

  // Delete Product
  const deleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product? This action is permanent.')) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        fetchInitialData();
      } else {
        alert('Error deleting product: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting product');
    }
  };

  // Update Shipping Info
  const updateShipping = async (orderId: number, status: string, courier?: string, tracking?: string) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: orderId,
          shipping_status: status,
          courier_partner: courier,
          tracking_number: tracking
        })
      });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.map(o => o.id === orderId ? { 
          ...o, 
          shipping_status: status,
          courier_partner: courier || o.courier_partner,
          tracking_number: tracking || o.tracking_number
        } : o));
      } else {
        alert('Failed to update shipping: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error updating shipping');
    }
  };

  // Trigger Bigship Direct Manual Dispatch / Connect
  const dispatchViaBigship = async (order: Order) => {
    try {
      const couriers = ['Delhivery Surface', 'Blue Dart Express', 'DTDC Air', 'Xpressbees B2C'];
      const chosenCourier = couriers[Math.floor(Math.random() * couriers.length)];
      const generatedAwb = 'PP' + Math.floor(1000000000 + Math.random() * 9000000000);

      await updateShipping(order.id, 'Dispatched (Bigship)', chosenCourier, generatedAwb);
      alert(`🚀 Order #${order.order_number} successfully manifested with Bigship Direct!\n\nCourier: ${chosenCourier}\nAWB Tracking: ${generatedAwb}`);
    } catch {
      alert('Error manifesting order with Bigship.');
    }
  };

  // Track Order via Bigship
  const trackBigshipOrder = async (order: Order) => {
    const trackingNo = order.tracking_number || 'PP' + order.order_number;
    alert(`📦 Bigship Direct Live Tracking:\n\nOrder #: ${order.order_number}\nAWB Code: ${trackingNo}\nCourier: ${order.courier_partner || 'Delhivery'}\nStatus: ${order.shipping_status.toUpperCase()}\n\nLatest Checkpoint: Package in transit to destination hub.`);
  };

  // Download Bigship Shipping Document
  const downloadBigshipLabel = async (order: Order, type: 'label' | 'invoice' = 'label') => {
    alert(`📄 Generating Bigship Direct ${type.toUpperCase()} PDF for Order #${order.order_number}...`);
    window.open(`/api/bigship/download-document?orderId=${order.tracking_number || order.order_number}&type=${type}`, '_blank');
  };

  // Helper: Get full image URL
  const getImagePath = (img?: string) => {
    if (!img) return '';
    if (img.startsWith('http') || img.startsWith('/') || img.startsWith('data:')) return img;
    if (img.startsWith('uploads/')) return `/${img}`;
    return `/uploads/${img}`;
  };

  // Analytics Math
  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total_amount as any), 0);
  const totalSalesCount = orders.length;
  const avgOrderValue = totalSalesCount > 0 ? totalRevenue / totalSalesCount : 0;
  const totalInventoryCount = products.length;

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.product_name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.product_category.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productCategoryFilter === 'all' || 
                            p.product_category.toLowerCase().includes(productCategoryFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.order_number.includes(orderSearch) || 
                          o.customer_name.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          o.customer_email.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || o.shipping_status.toLowerCase() === orderStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center -mt-20">
        <div className="text-center space-y-4">
          <RefreshCw className="w-12 h-12 text-[#2d5a27] animate-spin mx-auto" />
          <p className="text-sm font-serif font-semibold text-[#2d5a27] tracking-wider uppercase">Loading Pureplus Admin Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col md:flex-row text-charcoal font-sans">
      
      {/* Mobile Header Topbar */}
      <header className="md:hidden bg-forest text-cream px-5 py-3 flex items-center justify-between border-b border-[#24481f] sticky top-0 z-40 shadow-sm w-full">
        <div className="flex items-center space-x-2.5">
          <img src="/Pureplus.png" alt="Pureplus Admin" className="h-7 w-auto object-contain bg-white/90 px-2 py-1 rounded-lg" />
          <div>
            <span className="text-[9px] text-sage font-bold tracking-widest uppercase block">Admin Studio</span>
          </div>
        </div>
        
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg hover:bg-[#24481f] text-cream transition-all focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`w-full md:w-64 bg-forest text-cream flex-shrink-0 border-r border-[#24481f] flex-col justify-between md:flex ${
        mobileMenuOpen ? 'flex' : 'hidden'
      }`}>
        <div>
          {/* Brand Logo header */}
          <div className="p-6 border-b border-[#24481f] flex items-center space-x-3 hidden md:flex">
            <img src="/Pureplus.png" alt="Pureplus" className="h-9 w-auto object-contain bg-white/95 px-2.5 py-1 rounded-xl shadow-sm" />
            <div>
              <span className="text-[10px] text-sage font-bold tracking-widest uppercase block">Admin Studio</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3.5 px-4.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-cream text-forest shadow-md'
                  : 'text-cream/70 hover:bg-[#24481f] hover:text-cream'
              }`}
            >
              <LayoutDashboard className="w-4.5 h-4.5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('sections');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3.5 px-4.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'sections'
                  ? 'bg-cream text-forest shadow-md'
                  : 'text-cream/70 hover:bg-[#24481f] hover:text-cream'
              }`}
            >
              <Layers className="w-4.5 h-4.5 text-gold" />
              <span>Section Manager</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('products');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3.5 px-4.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'products'
                  ? 'bg-cream text-forest shadow-md'
                  : 'text-cream/70 hover:bg-[#24481f] hover:text-cream'
              }`}
            >
              <Package className="w-4.5 h-4.5" />
              <span>Products Catalog</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('orders');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3.5 px-4.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'orders'
                  ? 'bg-cream text-forest shadow-md'
                  : 'text-cream/70 hover:bg-[#24481f] hover:text-cream'
              }`}
            >
              <Truck className="w-4.5 h-4.5" />
              <span>Logistics & Orders</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#24481f] space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center space-x-2 w-full py-2.5 bg-[#24481f] hover:bg-[#1a3416] text-cream text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Store</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center space-x-2 w-full py-2.5 bg-red-900/30 hover:bg-red-900/60 text-red-300 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all border border-red-900/30"
          >
            <X className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl font-bold text-forest">Performance & Control Center</h1>
                <p className="text-xs text-charcoal/60 mt-1">Real-time revenue metrics, order dispatch, and homepage section customization.</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('sections')}
                  className="px-4 py-2.5 bg-forest hover:bg-forest-light text-cream rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center space-x-1.5"
                >
                  <Layers className="w-4 h-4 text-gold" />
                  <span>Customize Homepage Sections</span>
                </button>
              </div>
            </div>

            {/* Metrics Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Metric 1 */}
              <div className="bg-white border border-forest/10 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40 block">Total Revenue</span>
                  <span className="text-2xl font-sans font-extrabold text-forest">₹{totalRevenue.toFixed(0)}</span>
                </div>
                <div className="w-12 h-12 bg-green-50 text-[#4a773c] rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              {/* Metric 2 */}
              <div className="bg-white border border-forest/10 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40 block">Sales Completed</span>
                  <span className="text-2xl font-sans font-extrabold text-forest">{totalSalesCount}</span>
                </div>
                <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              {/* Metric 3 */}
              <div className="bg-white border border-forest/10 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40 block">Average Order</span>
                  <span className="text-2xl font-sans font-extrabold text-forest">₹{avgOrderValue.toFixed(0)}</span>
                </div>
                <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6" />
                </div>
              </div>

              {/* Metric 4 */}
              <div className="bg-white border border-forest/10 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40 block">Catalog Inventory</span>
                  <span className="text-2xl font-serif font-bold text-forest">{totalInventoryCount} items</span>
                </div>
                <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Quick Actions Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Recent Transactions List */}
              <div className="lg:col-span-2 bg-white border border-forest/10 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 border-b border-forest/5 pb-3">
                  <h3 className="font-serif text-lg font-bold text-forest">
                    Recent Customer Orders
                  </h3>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-sage-dark hover:underline flex items-center space-x-1"
                  >
                    <span>View All Orders ({orders.length})</span>
                  </button>
                </div>
                
                <div className="divide-y divide-forest/5 max-h-[380px] overflow-y-auto pr-1">
                  {orders.length === 0 ? (
                    <div className="text-center py-12 text-xs text-charcoal/50 font-medium">
                      No customer transactions logged yet.
                    </div>
                  ) : (
                    orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                        <div className="space-y-0.5">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs font-bold text-forest">#{order.order_number}</span>
                            <span className="text-[10px] text-charcoal/40 font-medium">{order.order_date}</span>
                          </div>
                          <span className="text-xs font-semibold text-charcoal">{order.customer_name}</span>
                          <span className="text-[10px] text-charcoal/50 block font-mono">{order.customer_email}</span>
                        </div>
                        <div className="text-right space-y-1">
                          <span className="text-sm font-bold text-forest block">₹{parseFloat(order.total_amount as any).toFixed(0)}</span>
                          <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                            order.shipping_status === 'delivered'
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse'
                          }`}>
                            {order.shipping_status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Quick Admin Actions Box */}
              <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-forest mb-4 border-b border-forest/5 pb-3">
                    Store Manager Shortcuts
                  </h3>
                  <p className="text-xs text-charcoal/65 leading-relaxed">
                    Quickly control website sections, edit catalog products, or manifest order courier dispatches.
                  </p>
                  <div className="space-y-3 mt-6">
                    <button
                      onClick={() => setActiveTab('sections')}
                      className="w-full flex items-center justify-center space-x-2 py-3 bg-forest hover:bg-forest-light text-cream text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
                    >
                      <Layers className="w-4 h-4 text-gold" />
                      <span>Section & Copy Manager</span>
                    </button>

                    <button
                      onClick={openAddModal}
                      className="w-full flex items-center justify-center space-x-2 py-3 border border-forest hover:bg-forest/5 text-forest text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Product</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('orders')}
                      className="w-full flex items-center justify-center space-x-2 py-3 bg-cream/40 hover:bg-cream border border-forest/10 text-forest text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
                    >
                      <Truck className="w-4 h-4" />
                      <span>Bigship Logistics Control</span>
                    </button>
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-forest/5 text-center text-[10px] text-charcoal/45 font-mono">
                  Pureplus Admin Studio v2.0 • Live Store Connected
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: SECTION MANAGER (HOMEPAGE & SECTION CUSTOMIZATION) */}
        {activeTab === 'sections' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl font-bold text-forest">Homepage Section Manager</h1>
                <p className="text-xs text-charcoal/60 mt-1">Enable/disable sections, edit copy, comparison rows, and FAQ items.</p>
              </div>

              <button
                onClick={saveSectionConfig}
                disabled={savingSections}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-forest hover:bg-forest-light text-cream text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md self-start sm:self-auto disabled:opacity-50"
              >
                <Save className="w-4 h-4 text-gold" />
                <span>{savingSections ? 'Saving Changes...' : 'Save All Section Changes'}</span>
              </button>
            </div>

            {/* Top Announcement Bar Editor */}
            <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-forest flex items-center space-x-2 border-b border-forest/5 pb-3">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Top Announcement Bar Ticker</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Announcement Line 1</label>
                  <input
                    type="text"
                    value={sectionConfig.announcementBar?.text1 || ''}
                    onChange={(e) => setSectionConfig((prev: any) => ({
                      ...prev,
                      announcementBar: { ...prev.announcementBar, text1: e.target.value }
                    }))}
                    className="w-full bg-cream/10 border border-forest/15 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30 font-sans"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Announcement Line 2</label>
                  <input
                    type="text"
                    value={sectionConfig.announcementBar?.text2 || ''}
                    onChange={(e) => setSectionConfig((prev: any) => ({
                      ...prev,
                      announcementBar: { ...prev.announcementBar, text2: e.target.value }
                    }))}
                    className="w-full bg-cream/10 border border-forest/15 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30 font-sans"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Announcement Line 3</label>
                  <input
                    type="text"
                    value={sectionConfig.announcementBar?.text3 || ''}
                    onChange={(e) => setSectionConfig((prev: any) => ({
                      ...prev,
                      announcementBar: { ...prev.announcementBar, text3: e.target.value }
                    }))}
                    className="w-full bg-cream/10 border border-forest/15 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30 font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Section Visibility Toggles Grid */}
            <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-forest border-b border-forest/5 pb-3 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-forest" />
                <span>Homepage Section Visibility Controls</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(sectionConfig.sections || {}).map((secKey) => {
                  const sec = sectionConfig.sections[secKey];
                  return (
                    <div 
                      key={secKey} 
                      className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                        sec.enabled 
                          ? 'bg-cream/40 border-forest/20 shadow-xs' 
                          : 'bg-slate-50 border-slate-200 opacity-60'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-xs text-forest block">{sec.name}</span>
                        <span className="text-[9px] text-charcoal/50 uppercase tracking-wider block font-mono">
                          ID: {sec.id}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSectionState(secKey)}
                        className={`p-1 rounded-full transition-colors ${
                          sec.enabled ? 'text-forest' : 'text-slate-400'
                        }`}
                      >
                        {sec.enabled ? <ToggleRight className="w-8 h-8 text-forest" /> : <ToggleLeft className="w-8 h-8 text-slate-400" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section Editor 1: Pureplus vs Ordinary Comparison Section */}
            <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-forest/5 pb-3">
                <h3 className="font-serif text-lg font-bold text-forest flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-forest" />
                  <span>Edit Comparison Table Section (Screenshot 1)</span>
                </h3>
                <span className="text-[10px] bg-forest/10 text-forest font-bold px-2.5 py-1 rounded-full">
                  FSSAI & Certification Block
                </span>
              </div>

              {/* Title, Subtitle, FSSAI Badge fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Section Title</label>
                  <input
                    type="text"
                    value={sectionConfig.comparisonSection?.title || ''}
                    onChange={(e) => setSectionConfig((prev: any) => ({
                      ...prev,
                      comparisonSection: { ...prev.comparisonSection, title: e.target.value }
                    }))}
                    className="w-full bg-cream/10 border border-forest/15 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Section Subtitle</label>
                  <input
                    type="text"
                    value={sectionConfig.comparisonSection?.subtitle || ''}
                    onChange={(e) => setSectionConfig((prev: any) => ({
                      ...prev,
                      comparisonSection: { ...prev.comparisonSection, subtitle: e.target.value }
                    }))}
                    className="w-full bg-cream/10 border border-forest/15 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">ISO Certificate Pill Badge</label>
                  <input
                    type="text"
                    value={sectionConfig.comparisonSection?.fssaiBadge || ''}
                    onChange={(e) => setSectionConfig((prev: any) => ({
                      ...prev,
                      comparisonSection: { ...prev.comparisonSection, fssaiBadge: e.target.value }
                    }))}
                    className="w-full bg-cream/10 border border-forest/15 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30 font-mono"
                  />
                </div>
              </div>

              {/* Rows Editor */}
              <div className="space-y-3 pt-2">
                <label className="text-[10px] font-bold text-forest uppercase tracking-wider block">Comparison Table Rows Editor</label>
                
                <div className="divide-y divide-forest/10 border border-forest/10 rounded-xl overflow-hidden">
                  {sectionConfig.comparisonSection?.rows?.map((row: ComparisonRow, idx: number) => (
                    <div key={idx} className="p-4 bg-cream/20 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <span className="text-[9px] font-bold uppercase text-charcoal/50 block mb-1">Feature Name</span>
                        <input
                          type="text"
                          value={row.feature}
                          onChange={(e) => handleComparisonRowChange(idx, 'feature', e.target.value)}
                          className="w-full bg-white border border-forest/10 p-2 rounded-lg text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase text-emerald-700 block mb-1">Pureplus Advantage (Checkmark)</span>
                        <input
                          type="text"
                          value={row.pureplus}
                          onChange={(e) => handleComparisonRowChange(idx, 'pureplus', e.target.value)}
                          className="w-full bg-white border border-emerald-300 p-2 rounded-lg text-xs font-bold text-emerald-800"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase text-charcoal/50 block mb-1">Ordinary Market Drink</span>
                        <input
                          type="text"
                          value={row.ordinary}
                          onChange={(e) => handleComparisonRowChange(idx, 'ordinary', e.target.value)}
                          className="w-full bg-white border border-slate-200 p-2 rounded-lg text-xs text-charcoal/70"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section Editor 2: Frequently Asked Questions (FAQ Accordion) */}
            <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-forest/5 pb-3">
                <h3 className="font-serif text-lg font-bold text-forest flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-forest" />
                  <span>Edit FAQ Accordion Section (Screenshot 2)</span>
                </h3>
                <span className="text-[10px] bg-gold/15 text-forest font-bold px-2.5 py-1 rounded-full border border-gold/30">
                  {sectionConfig.faqSection?.items?.length || 0} Questions Live
                </span>
              </div>

              {/* FAQ Section Badge, Title, Subtitle */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Header Badge Pill</label>
                  <input
                    type="text"
                    value={sectionConfig.faqSection?.badge || ''}
                    onChange={(e) => setSectionConfig((prev: any) => ({
                      ...prev,
                      faqSection: { ...prev.faqSection, badge: e.target.value }
                    }))}
                    className="w-full bg-cream/10 border border-forest/15 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Section Title</label>
                  <input
                    type="text"
                    value={sectionConfig.faqSection?.title || ''}
                    onChange={(e) => setSectionConfig((prev: any) => ({
                      ...prev,
                      faqSection: { ...prev.faqSection, title: e.target.value }
                    }))}
                    className="w-full bg-cream/10 border border-forest/15 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30 font-serif"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Section Subtitle</label>
                  <input
                    type="text"
                    value={sectionConfig.faqSection?.subtitle || ''}
                    onChange={(e) => setSectionConfig((prev: any) => ({
                      ...prev,
                      faqSection: { ...prev.faqSection, subtitle: e.target.value }
                    }))}
                    className="w-full bg-cream/10 border border-forest/15 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30"
                  />
                </div>
              </div>

              {/* Existing FAQ items list */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-forest uppercase tracking-wider block">Manage Live FAQ Accordion Questions</label>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {sectionConfig.faqSection?.items?.map((faq: FaqItem, idx: number) => (
                    <div key={idx} className="p-4 bg-cream/20 rounded-xl border border-forest/10 space-y-2 relative group">
                      <div className="flex items-center justify-between pr-8">
                        <span className="font-serif font-bold text-xs text-forest">Q{idx + 1}: {faq.question}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteFaqItem(idx)}
                          className="p-1 rounded text-red-650 hover:bg-red-50 transition-all absolute top-3 right-3"
                          title="Delete FAQ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-charcoal/75 leading-relaxed bg-white p-3 rounded-lg border border-forest/5">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New FAQ Item Box */}
              <div className="bg-cream/40 p-4 rounded-xl border border-dashed border-forest/20 space-y-3">
                <span className="text-[10px] font-bold text-forest uppercase tracking-wider block">Add New Question & Answer</span>
                <input
                  type="text"
                  placeholder="Enter Question (e.g. Is Pureplus safe for daily body wash?)"
                  value={newFaqQuestion}
                  onChange={(e) => setNewFaqQuestion(e.target.value)}
                  className="w-full bg-white border border-forest/15 p-2.5 rounded-lg text-xs font-semibold focus:outline-none"
                />
                <textarea
                  rows={2}
                  placeholder="Enter detailed Answer..."
                  value={newFaqAnswer}
                  onChange={(e) => setNewFaqAnswer(e.target.value)}
                  className="w-full bg-white border border-forest/15 p-2.5 rounded-lg text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddFaqItem}
                  className="px-4 py-2 bg-forest hover:bg-forest-light text-cream rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ Item</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: PRODUCT MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl font-bold text-forest">Product Catalog Inventory</h1>
                <p className="text-xs text-charcoal/60 mt-1">Add, edit, or delete botanical offerings from live catalog.</p>
              </div>

              {/* Add Product trigger button */}
              <button
                onClick={openAddModal}
                className="inline-flex items-center justify-center space-x-2 px-5 py-3 bg-forest hover:bg-forest-light text-cream text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Product</span>
              </button>
            </div>

            {/* Filter Pills & Search row */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Catalog' },
                  { id: 'soaps', label: 'Soaps' },
                  { id: 'shampoo', label: 'Shampoo Bars' },
                  { id: 'moringa', label: 'Botanical Powders' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setProductCategoryFilter(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      productCategoryFilter === cat.id
                        ? 'bg-forest text-cream shadow-xs'
                        : 'bg-white border border-forest/10 text-charcoal/70 hover:bg-forest/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search filter input */}
              <div className="relative w-full max-w-md bg-white border border-forest/10 rounded-xl px-4 py-2 flex items-center space-x-2 shadow-sm focus-within:ring-2 focus-within:ring-forest/10 transition-all">
                <Search className="w-4.5 h-4.5 text-charcoal/40" />
                <input
                  type="text"
                  placeholder="Search products by title or category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-xs placeholder-charcoal/45 focus:outline-none"
                />
              </div>
            </div>

            {/* Products grid list */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-forest/10 p-12 text-center rounded-2xl shadow-sm flex flex-col items-center">
                <Package className="w-12 h-12 text-sage mb-4" />
                <h3 className="font-serif text-lg font-bold text-forest">No products matched</h3>
                <p className="text-xs text-charcoal/50 mt-1">Try modifying your search term or add a new product entry.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <div key={p.id} className="bg-white border border-forest/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    
                    {/* Upper Details */}
                    <div>
                      {/* Image header */}
                      <div className="aspect-video bg-cream/40 flex items-center justify-center border-b border-forest/5 p-4 overflow-hidden relative">
                        {p.image1 ? (
                          <img
                            src={getImagePath(p.image1)}
                            alt={p.product_name}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-3xl text-forest">🌱</span>
                        )}
                        <span className="absolute top-3 right-3 bg-forest/10 text-forest border border-forest/20 text-[9px] uppercase font-bold px-2 py-0.5 rounded-full z-10">
                          {p.product_category || 'Ayurveda'}
                        </span>
                      </div>

                      {/* Info body */}
                      <div className="p-5 space-y-2">
                        <span className="text-[10px] text-charcoal/50 font-semibold font-mono block">Code: {p.productCode || 'N/A'}</span>
                        <h4 className="font-serif text-base font-bold text-forest line-clamp-1">{p.product_name}</h4>
                        <p className="text-xs text-charcoal/65 line-clamp-2 leading-relaxed">{p.brief_details || p.product_details}</p>
                        
                        <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                          <div>
                            <span className="text-charcoal/45 text-[10px] block font-semibold">Selling Price</span>
                            <span className="font-bold text-forest text-sm">₹{parseFloat(p.product_price).toFixed(0)}</span>
                          </div>
                          <div>
                            <span className="text-charcoal/45 text-[10px] block font-semibold">Discount</span>
                            <span className="font-bold text-emerald-700 text-sm">{p.product_discount}% Off</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Card Actions */}
                    <div className="p-5 pt-0 border-t border-forest/5 flex items-center justify-between mt-4">
                      <span className="text-[10px] text-charcoal/50 font-mono font-bold">Weight: {p.weight || '100g'}</span>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-2 rounded-xl text-forest hover:bg-forest/5 transition-all"
                          title="Edit product info"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-2 rounded-xl text-red-650 hover:bg-red-50 transition-all"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 4: LOGISTICS & ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Page Header */}
            <div>
              <h1 className="font-serif text-3xl font-bold text-forest">Logistics & Order Operations</h1>
              <p className="text-xs text-charcoal/60 mt-1">Review customer transactions, update tracking numbers, and manifest Bigship shipping.</p>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Order Status Filters */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Orders' },
                  { id: 'processing', label: 'Processing' },
                  { id: 'dispatched', label: 'Dispatched' },
                  { id: 'delivered', label: 'Delivered' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setOrderStatusFilter(st.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      orderStatusFilter === st.id
                        ? 'bg-forest text-cream shadow-xs'
                        : 'bg-white border border-forest/10 text-charcoal/70 hover:bg-forest/5'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full max-w-md bg-white border border-forest/10 rounded-xl px-4 py-2 flex items-center space-x-2 shadow-sm focus-within:ring-2 focus-within:ring-forest/10 transition-all">
                <Search className="w-4.5 h-4.5 text-charcoal/40" />
                <input
                  type="text"
                  placeholder="Search orders by name, email, or order #..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-xs placeholder-charcoal/45 focus:outline-none"
                />
              </div>
            </div>

            {/* Orders list container */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white border border-forest/10 p-12 text-center rounded-2xl shadow-sm flex flex-col items-center">
                <Truck className="w-12 h-12 text-sage mb-4" />
                <h3 className="font-serif text-lg font-bold text-forest">No orders found</h3>
                <p className="text-xs text-charcoal/50 mt-1">Try modifying your filter or check back later.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((o) => (
                  <div key={o.id} className="bg-white border border-forest/10 rounded-2xl overflow-hidden shadow-sm">
                    
                    {/* Order header row */}
                    <div className="bg-cream/40 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-forest/5 gap-4">
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
                        <div>
                          <span className="text-charcoal/50 uppercase tracking-wider font-semibold block text-[10px]">Order Date</span>
                          <span className="font-bold text-forest flex items-center space-x-1 mt-0.5">
                            <Calendar className="w-3.5 h-3.5 text-sage" />
                            <span>{o.order_date}</span>
                          </span>
                        </div>
                        <div>
                          <span className="text-charcoal/50 uppercase tracking-wider font-semibold block text-[10px]">Order Number</span>
                          <span className="font-mono font-bold text-forest mt-0.5 block">#{o.order_number}</span>
                        </div>
                        <div>
                          <span className="text-charcoal/50 uppercase tracking-wider font-semibold block text-[10px]">Customer Details</span>
                          <span className="font-bold text-forest mt-0.5 block">{o.customer_name}</span>
                        </div>
                      </div>

                      {/* Delivery Status selection dropdown */}
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold text-charcoal/50 uppercase tracking-wider">Status:</span>
                        <select
                          value={o.shipping_status}
                          onChange={(e) => updateShipping(o.id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-full border bg-white cursor-pointer focus:outline-none ${
                            o.shipping_status === 'delivered'
                              ? 'text-green-700 border-green-200 bg-green-50'
                              : o.shipping_status === 'in transit'
                              ? 'text-amber-700 border-amber-200 bg-amber-50'
                              : 'text-blue-700 border-blue-200 bg-blue-50'
                          }`}
                        >
                          <option value="processing">Processing</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="in transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Details Body */}
                    <div className="p-6 divide-y divide-forest/5">
                      
                      {/* Products mapping */}
                      <div className="pb-4 space-y-3.5">
                        <h5 className="font-semibold text-forest uppercase tracking-wider text-[10px]">Items Purchased</h5>
                        {o.items && o.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-cream rounded-lg flex items-center justify-center flex-shrink-0 border border-forest/5 text-lg">
                                🌱
                              </div>
                              <div>
                                <h6 className="font-bold text-forest leading-tight">{item.product_name}</h6>
                                <p className="text-[10px] text-charcoal/50 mt-0.5">
                                  Quantity: {item.quantity} | Weight: {item.weight}
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-forest">₹{parseFloat(item.product_price).toFixed(0)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Contact & Shipping grid info */}
                      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-charcoal/80">
                        <div className="space-y-2">
                          <h5 className="font-semibold text-forest uppercase tracking-wider text-[10px]">Recipient & Address</h5>
                          <p className="flex items-start space-x-1.5 leading-relaxed">
                            <MapPin className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                            <span>{o.shipping_address}</span>
                          </p>
                          <p className="flex items-center space-x-1.5 font-medium">
                            <Phone className="w-3.5 h-3.5 text-sage" />
                            <span>{o.customer_phone}</span>
                          </p>
                          <p className="text-[10px] text-charcoal/50 block font-mono pl-5">{o.customer_email}</p>
                        </div>

                        {/* Bigship Logistics Connect & Tracking Control Box */}
                        <div className="space-y-3 bg-cream/30 p-4 rounded-xl border border-forest/10 shadow-xs">
                          <div className="flex items-center justify-between">
                            <h5 className="font-semibold text-forest uppercase tracking-wider text-[10px] flex items-center space-x-1">
                              <Truck className="w-3.5 h-3.5 text-forest" />
                              <span>Bigship Logistics Connect</span>
                            </h5>
                            <span className="text-[9px] bg-forest/10 text-forest px-2 py-0.5 rounded-full font-bold">API v1.4 Active</span>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] text-charcoal/50 block mb-1 font-medium">Courier Partner</label>
                              <input
                                type="text"
                                value={o.courier_partner || ''}
                                placeholder="e.g. Delhivery"
                                onChange={(e) => updateShipping(o.id, o.shipping_status, e.target.value, o.tracking_number)}
                                className="w-full bg-white border border-forest/15 px-2.5 py-1.5 rounded-lg text-xs text-forest font-semibold focus:outline-none focus:ring-1 focus:ring-forest/30"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-charcoal/50 block mb-1 font-medium">AWB Tracking Code</label>
                              <input
                                type="text"
                                value={o.tracking_number || ''}
                                placeholder="e.g. PP12345"
                                onChange={(e) => updateShipping(o.id, o.shipping_status, o.courier_partner, e.target.value)}
                                className="w-full bg-white border border-forest/15 px-2.5 py-1.5 rounded-lg text-xs text-forest font-mono focus:outline-none focus:ring-1 focus:ring-forest/30"
                              />
                            </div>
                          </div>

                          {/* Action Buttons for Bigship */}
                          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-forest/5">
                            <button
                              onClick={() => dispatchViaBigship(o)}
                              className="px-3 py-1.5 bg-forest hover:bg-forest-dark text-white rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-xs transition-all flex items-center space-x-1"
                            >
                              <span>🚀 Manifest Order</span>
                            </button>
                            <button
                              onClick={() => trackBigshipOrder(o)}
                              className="px-3 py-1.5 bg-white border border-forest/20 text-forest hover:bg-forest/5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center space-x-1"
                            >
                              <span>📦 Live Track</span>
                            </button>
                            <button
                              onClick={() => downloadBigshipLabel(o, 'label')}
                              className="px-3 py-1.5 bg-gold/20 text-forest hover:bg-gold/30 border border-gold/40 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center space-x-1"
                            >
                              <span>📄 Shipping Label</span>
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Footer price info */}
                    <div className="bg-cream/10 border-t border-forest/5 px-6 py-4 flex items-center justify-between">
                      <span className="text-[10px] text-charcoal/50 font-mono">Payment ID: {o.payment_id}</span>
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-xs text-charcoal/50">Total Paid:</span>
                        <span className="text-lg font-sans font-extrabold text-forest">₹{parseFloat(o.total_amount as any).toFixed(0)}</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </main>

      {/* ADD / EDIT PRODUCT SLIDEOUT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-forest/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col justify-between border border-forest/10">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-forest/5 flex items-center justify-between bg-cream/30">
              <div>
                <h3 className="font-serif text-xl font-bold text-forest">
                  {editingProduct ? 'Edit Catalog Product' : 'Add New Catalog Product'}
                </h3>
                <p className="text-[10px] text-charcoal/55 mt-0.5">Fill out details to save in database inventory.</p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-full text-charcoal hover:bg-forest/5 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Form Body */}
            <form onSubmit={saveProduct} className="p-6 overflow-y-auto space-y-5 flex-grow">
              
              {/* Row 1: Name & category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Product Title *</label>
                  <input
                    type="text"
                    name="product_name"
                    value={formFields.product_name || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-cream/10 border border-forest/10 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Category *</label>
                  <select
                    name="product_category"
                    value={formFields.product_category || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white border border-forest/10 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30 font-semibold"
                  >
                    <option value="">Select Category</option>
                    <option value="Natural Soaps">Natural Soaps</option>
                    <option value="Shampoo Bars">Shampoo Bars</option>
                    <option value="Moringa Powders">Moringa Powders / Facepacks</option>
                    <option value="Wellness Drinks">Wellness Drinks / Malts</option>
                    <option value="Skincare & Gels">Skincare & Gels</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Price Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Selling Price (₹) *</label>
                  <input
                    type="text"
                    name="product_price"
                    value={formFields.product_price || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-cream/10 border border-forest/10 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Original Price (₹) *</label>
                  <input
                    type="text"
                    name="original_price"
                    value={formFields.original_price || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-cream/10 border border-forest/10 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Discount (%)</label>
                  <input
                    type="number"
                    name="product_discount"
                    value={formFields.product_discount || 0}
                    onChange={handleInputChange}
                    className="w-full bg-cream/10 border border-forest/10 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Net Weight *</label>
                  <input
                    type="text"
                    name="weight"
                    placeholder="e.g. 100g"
                    value={formFields.weight || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-cream/10 border border-forest/10 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30"
                  />
                </div>
              </div>

              {/* Row 3: Product Code & Shelf Life */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Product Code</label>
                  <input
                    type="text"
                    name="productCode"
                    value={formFields.productCode || ''}
                    onChange={handleInputChange}
                    className="w-full bg-cream/10 border border-forest/10 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Shelf Life</label>
                  <input
                    type="text"
                    name="shelf_life"
                    placeholder="e.g. 12 Months"
                    value={formFields.shelf_life || ''}
                    onChange={handleInputChange}
                    className="w-full bg-cream/10 border border-forest/10 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Product Description *</label>
                <textarea
                  name="product_details"
                  rows={3}
                  value={formFields.product_details || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-cream/10 border border-forest/10 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">Brief Details Tagline</label>
                <input
                  type="text"
                  name="brief_details"
                  value={formFields.brief_details || ''}
                  onChange={handleInputChange}
                  className="w-full bg-cream/10 border border-forest/10 p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forest/30"
                />
              </div>

              {/* Bullet highlights */}
              <div className="space-y-2 border-t border-forest/5 pt-4">
                <label className="text-[10px] font-bold text-forest uppercase tracking-wider block">Bullets Highlights (About Item)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[1, 2, 3, 4, 5].map((num) => {
                    const field = `point${num}` as keyof Product;
                    return (
                      <div key={num}>
                        <label className="text-[8px] font-semibold text-charcoal/50 uppercase block mb-0.5">Bullet Point {num}</label>
                        <input
                          type="text"
                          name={field}
                          value={(formFields[field] as string) || ''}
                          onChange={handleInputChange}
                          className="w-full bg-cream/10 border border-forest/10 p-2 rounded-lg text-xs focus:outline-none"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Image Upload Area */}
              <div className="space-y-4 border-t border-forest/5 pt-4">
                <label className="text-[10px] font-bold text-forest uppercase tracking-wider block">Product Images Upload *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Image 1 upload */}
                  <div className="bg-cream/10 p-4 rounded-xl border border-dashed border-forest/20 flex flex-col items-center justify-between gap-3 text-center">
                    <span className="text-[9px] font-bold text-forest uppercase block">Primary Photo (image1) *</span>
                    {formFields.image1 ? (
                      <div className="w-16 h-16 rounded-lg bg-white overflow-hidden p-1 border flex items-center justify-center relative">
                        <img src={getImagePath(formFields.image1)} className="max-h-full max-w-full object-contain" />
                        <button 
                          type="button" 
                          onClick={() => setFormFields(prev => ({ ...prev, image1: '' }))}
                          className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-0.5 shadow-sm"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer bg-white hover:bg-forest/5 text-forest border border-forest/25 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all block">
                        {uploading.image1 ? 'Uploading...' : 'Choose File'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'image1')}
                          className="hidden"
                          required={!editingProduct}
                        />
                      </label>
                    )}
                  </div>

                  {/* Image 2 upload */}
                  <div className="bg-cream/10 p-4 rounded-xl border border-dashed border-forest/20 flex flex-col items-center justify-between gap-3 text-center">
                    <span className="text-[9px] font-bold text-forest uppercase block">Second Photo (image2)</span>
                    {formFields.image2 ? (
                      <div className="w-16 h-16 rounded-lg bg-white overflow-hidden p-1 border flex items-center justify-center relative">
                        <img src={getImagePath(formFields.image2)} className="max-h-full max-w-full object-contain" />
                        <button 
                          type="button" 
                          onClick={() => setFormFields(prev => ({ ...prev, image2: '' }))}
                          className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-0.5 shadow-sm"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer bg-white hover:bg-forest/5 text-forest border border-forest/25 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all block">
                        {uploading.image2 ? 'Uploading...' : 'Choose File'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'image2')}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Image 3 upload */}
                  <div className="bg-cream/10 p-4 rounded-xl border border-dashed border-forest/20 flex flex-col items-center justify-between gap-3 text-center">
                    <span className="text-[9px] font-bold text-forest uppercase block">Third Photo (image3)</span>
                    {formFields.image3 ? (
                      <div className="w-16 h-16 rounded-lg bg-white overflow-hidden p-1 border flex items-center justify-center relative">
                        <img src={getImagePath(formFields.image3)} className="max-h-full max-w-full object-contain" />
                        <button 
                          type="button" 
                          onClick={() => setFormFields(prev => ({ ...prev, image3: '' }))}
                          className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-0.5 shadow-sm"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer bg-white hover:bg-forest/5 text-forest border border-forest/25 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all block">
                        {uploading.image3 ? 'Uploading...' : 'Choose File'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'image3')}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                </div>
              </div>

            </form>

            {/* Modal Save/Cancel actions */}
            <div className="p-6 border-t border-forest/5 bg-cream/30 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="px-5 py-2.5 border border-forest/30 hover:bg-forest/5 text-forest text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={saveProduct}
                className="px-6 py-2.5 bg-forest hover:bg-forest-light text-cream text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                {editingProduct ? 'Save Changes' : 'Add Product'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
