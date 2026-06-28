import React, { useState, useEffect } from 'react';
import { 
  Home, 
  FolderHeart, 
  Sparkles, 
  Users, 
  User, 
  Plus, 
  Upload, 
  Heart, 
  MessageCircle, 
  Search, 
  TrendingUp, 
  Filter, 
  Check, 
  Info,
  Sliders,
  CloudSun,
  MapPin,
  Calendar,
  Save,
  ChevronRight,
  Eye,
  Camera,
  Layers,
  X
} from 'lucide-react';

export default function App() {
  // State Navigasi Menu
  const [activeTab, setActiveTab] = useState('home');

  // State Profil Pengguna (Dapat diedit penuh di halaman Akun)
  const [userProfile, setUserProfile] = useState({
    name: 'Rezal Fauzian',
    nim: '20240040246',
    email: 'rezal.fauzian@nusaputra.ac.id',
    university: 'Nusa Putra University',
    bio: 'Tech enthusiast & digital fashion collector. Suka gaya minimalis futuristik dan techwear.',
    stylePreference: 'Cyber Minimalist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
  });

  // State untuk edit profil
  const [editProfile, setEditProfile] = useState({ ...userProfile });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  // Database Lemari Virtual default (Sesuai dengan ERD & mockup)
  const [wardrobe, setWardrobe] = useState([
    {
      id: 1,
      name: 'Oversized White Tee',
      category: 'atasan',
      color: 'Putih',
      colorHex: '#ffffff',
      texture: 'Polos - Katun Premium',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=300',
      isFavorite: true,
      tag: 'Essentials'
    },
    {
      id: 2,
      name: 'Technical Cargo Pants',
      category: 'bawahan',
      color: 'Hitam',
      colorHex: '#18181b',
      texture: 'Serat Grid - Ripstop Nylon',
      image: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&q=80&w=300',
      isFavorite: true,
      tag: 'Techwear'
    },
    {
      id: 3,
      name: 'Cyber Runner X1',
      category: 'sepatu',
      color: 'Hitam Neon',
      colorHex: '#10b981',
      texture: 'Mesh Futuristik',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=300',
      isFavorite: false,
      tag: 'Footwear'
    },
    {
      id: 4,
      name: 'Unstructured Blazer',
      category: 'atasan',
      color: 'Midnight Blue',
      colorHex: '#1e3a8a',
      texture: 'Linen Halus',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=300',
      isFavorite: false,
      tag: 'Outerwear'
    },
    {
      id: 5,
      name: 'Midnight Chrono Watch',
      category: 'aksesoris',
      color: 'Hitam Matte',
      colorHex: '#27272a',
      texture: 'Titanium & Silikon',
      image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=300',
      isFavorite: true,
      tag: 'Accessories'
    },
    {
      id: 6,
      name: 'Oversized Silk Blazer',
      category: 'atasan',
      color: 'Hitam Satin',
      colorHex: '#09090b',
      texture: 'Sutera Premium',
      image: 'https://images.unsplash.com/photo-1598808503744-44d885d5aa13?auto=format&fit=crop&q=80&w=300',
      isFavorite: true,
      tag: 'Noir Label'
    },
    {
      id: 7,
      name: 'Obsidian Tech Boots',
      category: 'sepatu',
      color: 'Hitam Kilap',
      colorHex: '#18181b',
      texture: 'Kulit Premium & Baja',
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=300',
      isFavorite: true,
      tag: 'Cyber Step'
    }
  ]);

  // State untuk form Tambah Pakaian Baru
  const [newClothing, setNewClothing] = useState({
    name: '',
    category: 'atasan',
    color: '',
    texture: '',
    tag: 'Kasual',
    image: ''
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  // State Filter di halaman Lemari
  const [closetFilter, setClosetFilter] = useState('Semua');

  // State AI Stylist Interaktif
  const [stylistContext, setStylistContext] = useState('Kuliah');
  const [stylistWeather, setStylistWeather] = useState('Cerah');
  const [isGeneratingStyle, setIsGeneratingStyle] = useState(false);
  const [generatedOutfit, setGeneratedOutfit] = useState(null);

  // State untuk Posting Baru di Komunitas Gaya Digital
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);

  // Database Komunitas & Trend Radar (Mockup data OOTD)
  const [communityPosts, setCommunityPosts] = useState([
    {
      id: 101,
      author: 'Aria Pramudya',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      time: '2 jam yang lalu',
      description: 'Mencoba gaya Penjelajah Urban hasil padu padan AI Stylist pagi ini. Sangat nyaman buat jalan kaki keliling Jakarta Selatan yang lagi cerah-cerahnya! 🏙️⚡',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
      likes: 42,
      isLiked: false,
      comments: [
        { name: 'Siti Sarah', text: 'Keren banget blazernya! Beli di mana kak?' },
        { name: 'Rian Kusuma', text: 'Tekstur ripstop cargo-nya dapet banget paduannya.' }
      ],
      newComment: ''
    },
    {
      id: 102,
      author: 'Kirana Laras',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      time: '6 jam yang lalu',
      description: 'Gaya Organic Linen emang nggak pernah salah buat cuaca tropis kita. Tetap elegan tapi adem seharian 🌿✨ #OrganicLinen #GayaGue',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      likes: 128,
      isLiked: true,
      comments: [
        { name: 'Rezal Fauzian', text: 'Rekomendasi yang sangat ramah lingkungan!' }
      ],
      newComment: ''
    }
  ]);

  // State Notifikasi Mengambang
  const [appNotification, setAppNotification] = useState(null);

  const showToast = (message) => {
    setAppNotification(message);
    setTimeout(() => {
      setAppNotification(null);
    }, 4000);
  };

  // Fungsi meng-handle upload foto dari galeri untuk Lemari (File Reader -> Base64)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
        setNewClothing({ ...newClothing, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi meng-handle upload foto profil dari galeri (File Reader -> Base64)
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile(prev => ({ ...prev, avatar: reader.result }));
        setEditProfile(prev => ({ ...prev, avatar: reader.result }));
        showToast('Foto profil digital Anda berhasil diperbarui! 👤✨');
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi meng-handle upload foto OOTD komunitas dari galeri (File Reader -> Base64)
  const handleCommunityImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostImage(reader.result);
        showToast('Foto OOTD berhasil dimuat! Ketik deskripsi lalu klik Posting.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi submit postingan OOTD baru ke komunitas
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) {
      showToast('Ketik deskripsi atau cerita gaya OOTD Anda terlebih dahulu!');
      return;
    }
    if (!newPostImage) {
      showToast('Harap unggah foto OOTD dari galeri Anda!');
      return;
    }

    const newPost = {
      id: Date.now(),
      author: userProfile.name,
      avatar: userProfile.avatar,
      time: 'Baru saja',
      description: newPostText,
      image: newPostImage,
      likes: 0,
      isLiked: false,
      comments: [],
      newComment: ''
    };

    setCommunityPosts([newPost, ...communityPosts]);
    setNewPostText('');
    setNewPostImage(null);
    showToast('Inspirasi OOTD Anda berhasil dibagikan ke komunitas! 🌟');
  };

  // Fungsi submit penambahan pakaian baru
  const handleAddClothing = (e) => {
    e.preventDefault();
    if (!newClothing.name || !newClothing.image) {
      showToast('Harap masukkan Nama Pakaian dan Unggah Foto terlebih dahulu!');
      return;
    }

    const newId = wardrobe.length > 0 ? Math.max(...wardrobe.map(w => w.id)) + 1 : 1;
    const addedItem = {
      id: newId,
      name: newClothing.name,
      category: newClothing.category,
      color: newClothing.color || 'Custom',
      colorHex: '#8b5cf6', // Default purple accent
      texture: newClothing.texture || 'Bahan Standar',
      image: newClothing.image,
      isFavorite: false,
      tag: newClothing.tag || 'Terbaru'
    };

    setWardrobe([addedItem, ...wardrobe]);
    setNewClothing({
      name: '',
      category: 'atasan',
      color: '',
      texture: '',
      tag: 'Kasual',
      image: ''
    });
    setFilePreview(null);
    setShowAddModal(false);
    showToast(`Sukses menambahkan "${addedItem.name}" ke Lemari Virtual! 🎉`);
  };

  // Fungsi toggle favorit pakaian
  const toggleFavorite = (id) => {
    setWardrobe(wardrobe.map(item => {
      if (item.id === id) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    }));
  };

  // Fungsi hapus pakaian dari Lemari
  const deleteClothing = (id) => {
    const itemToDelete = wardrobe.find(w => w.id === id);
    setWardrobe(wardrobe.filter(w => w.id !== id));
    showToast(`"${itemToDelete.name}" telah dihapus dari Lemari Virtual.`);
  };

  // Fungsi update profil user
  const handleProfileSave = (e) => {
    e.preventDefault();
    setUserProfile({ ...editProfile });
    setIsEditingProfile(false);
    setProfileSuccessMsg('Profil Anda berhasil diperbarui!');
    showToast('Profil digital Anda telah berhasil diperbarui! 👤✨');
    setTimeout(() => setProfileSuccessMsg(''), 3000);
  };

  // Algoritma Rekomendasi (AI Stylist Engine)
  const generateAIRecommendation = () => {
    setIsGeneratingStyle(true);
    setGeneratedOutfit(null);

    setTimeout(() => {
      const tops = wardrobe.filter(item => item.category === 'atasan');
      const bottoms = wardrobe.filter(item => item.category === 'bawahan');
      const shoes = wardrobe.filter(item => item.category === 'sepatu');
      const accessories = wardrobe.filter(item => item.category === 'aksesoris');

      if (tops.length === 0 || bottoms.length === 0) {
        showToast('Minimal miliki 1 Atasan dan 1 Bawahan di lemari untuk rekomendasi AI!');
        setIsGeneratingStyle(false);
        return;
      }

      let selectedTop, selectedBottom, selectedShoes, selectedAccessory;

      if (stylistContext === 'Kuliah') {
        selectedTop = tops.find(t => t.name.toLowerCase().includes('tee') || t.name.toLowerCase().includes('blazer')) || tops[0];
        selectedBottom = bottoms.find(b => b.name.toLowerCase().includes('cargo') || b.name.toLowerCase().includes('pants')) || bottoms[0];
        selectedShoes = shoes.find(s => s.name.toLowerCase().includes('runner')) || shoes[0];
        selectedAccessory = accessories[0];
      } else if (stylistContext === 'Formal') {
        selectedTop = tops.find(t => t.name.toLowerCase().includes('blazer') || t.name.toLowerCase().includes('shirt')) || tops[0];
        selectedBottom = bottoms.find(b => !b.name.toLowerCase().includes('cargo')) || bottoms[0];
        selectedShoes = shoes.find(s => s.name.toLowerCase().includes('boots') || s.name.toLowerCase().includes('leather')) || shoes[0];
        selectedAccessory = accessories.find(a => a.name.toLowerCase().includes('chrono') || a.name.toLowerCase().includes('watch')) || accessories[0];
      } else {
        selectedTop = tops.find(t => t.name.toLowerCase().includes('white') || t.name.toLowerCase().includes('t-shirt')) || tops[0];
        selectedBottom = bottoms[0];
        selectedShoes = shoes[0];
        selectedAccessory = accessories[0];
      }

      setGeneratedOutfit({
        id: Date.now(),
        title: `Gaya Penjelajah ${stylistContext}`,
        styleType: stylistContext === 'Formal' ? 'Classic Modern / Noir' : 'Techwear Minimalis',
        desc: `Kombinasi optimal untuk cuaca ${stylistWeather} Jakarta. Desain fungsional untuk memudahkan mobilitas tinggi dengan paduan material nyaman.`,
        top: selectedTop,
        bottom: selectedBottom,
        shoes: selectedShoes,
        accessory: selectedAccessory
      });

      setIsGeneratingStyle(false);
      showToast('AI berhasil menemukan kombinasi gaya terbaik untuk Anda! 🧠✨');
    }, 1500);
  };

  useEffect(() => {
    if (activeTab === 'stylist' && !generatedOutfit) {
      generateAIRecommendation();
    }
  }, [activeTab]);

  const handleLikePost = (id) => {
    setCommunityPosts(communityPosts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleAddComment = (e, postId) => {
    e.preventDefault();
    setCommunityPosts(communityPosts.map(post => {
      if (post.id === postId && post.newComment.trim() !== '') {
        return {
          ...post,
          comments: [...post.comments, { name: userProfile.name, text: post.newComment }],
          newComment: ''
        };
      }
      return post;
    }));
    showToast('Komentar Anda telah terkirim! 💬');
  };

  const handleCommentChange = (text, postId) => {
    setCommunityPosts(communityPosts.map(post => {
      if (post.id === postId) {
        return { ...post, newComment: text };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      
      {/* HEADER UTAMA */}
      <header className="sticky top-0 z-40 bg-[#07070a]/90 backdrop-blur-md border-b border-zinc-900/60 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/20">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-zinc-200 to-purple-400 bg-clip-text text-transparent">
                GAYA GUE
              </h1>
              <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest block -mt-1">
                AI Fashion Assistant & Virtual Wardrobe
              </span>
            </div>
          </div>

          {/* User Quick Info */}
          <div 
            onClick={() => { setActiveTab('profile'); }}
            className="flex items-center space-x-3 bg-zinc-900/50 hover:bg-zinc-800/60 p-1.5 pr-4 rounded-full border border-zinc-800 cursor-pointer transition-all duration-300 group"
          >
            <img 
              src={userProfile.avatar} 
              alt={userProfile.name} 
              className="w-8 h-8 rounded-full object-cover border border-purple-500/50 group-hover:scale-105 transition-transform" 
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-zinc-200 group-hover:text-purple-400 transition-colors">{userProfile.name}</p>
              <p className="text-[10px] text-zinc-500">{userProfile.nim}</p>
            </div>
          </div>
        </div>
      </header>

      {/* FLOATING TOAST NOTIFICATION */}
      {appNotification && (
        <div className="fixed top-20 right-4 left-4 sm:left-auto sm:max-w-sm z-50 bg-zinc-900 border-l-4 border-purple-500 text-zinc-200 p-4 rounded-r-xl shadow-2xl shadow-black/80 flex items-center space-x-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0" />
          <p className="text-xs font-medium">{appNotification}</p>
        </div>
      )}

      {/* KONTEN UTAMA */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6 pb-24 md:pb-6">
        
        {/* TAB 1: DASBOR UTAMA (HOME) */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* SPANDUK PENJELAJAH URBAN & SIDEBAR TREND */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Spanduk Utama - Rekomendasi AI */}
              <div className="lg:col-span-2 relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-purple-900/20 shadow-2xl flex flex-col justify-between min-h-[350px] p-6 md:p-8">
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full filter blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-12 w-60 h-60 bg-emerald-500/5 rounded-full filter blur-[60px] pointer-events-none" />

                <div className="relative z-10">
                  <div className="inline-flex items-center space-x-2 bg-purple-900/40 text-purple-300 border border-purple-700/50 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Rekomendasi AI Terpopuler</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                    Penjelajah Urban
                  </h2>
                  <p className="text-zinc-400 text-sm md:text-base max-w-md leading-relaxed mb-6">
                    Paduan techwear minimalis untuk mobilitas tinggi di cuaca cerah Jakarta. Nyaman, bernapas, dan tetap terlihat tajam.
                  </p>
                </div>

                <div className="relative z-10 flex flex-wrap items-center gap-4 pt-4">
                  <button 
                    onClick={() => {
                      setStylistContext('Kuliah');
                      setStylistWeather('Cerah');
                      setActiveTab('stylist');
                      generateAIRecommendation();
                    }}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold px-6 py-3 rounded-xl shadow-lg shadow-purple-900/30 transition-all duration-300 flex items-center space-x-2 active:scale-95"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Pakai Sekarang</span>
                  </button>
                  <button 
                    onClick={() => {
                      setStylistContext('Kuliah');
                      setActiveTab('stylist');
                    }}
                    className="bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 text-sm font-semibold px-5 py-3 rounded-xl border border-zinc-700/50 transition-all active:scale-95"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>

              {/* Sidebar Peringkat Tren AI */}
              <div className="bg-[#0b0b0f] border border-zinc-900 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                      <h3 className="font-bold text-zinc-200">Radar Tren Gaya AI</h3>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
                      LIVE
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/30 border border-zinc-800/30 hover:border-purple-500/20 transition-all">
                      <div className="flex items-center space-x-4">
                        <span className="w-8 h-8 rounded-lg bg-purple-950/50 text-purple-400 font-black text-xs flex items-center justify-center">
                          01
                        </span>
                        <div>
                          <p className="text-xs font-bold text-zinc-100">Cyber Minimalist</p>
                          <p className="text-[10px] text-emerald-400 font-medium">+24% Minggu ini</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-600" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/30 border border-zinc-800/30 hover:border-purple-500/20 transition-all">
                      <div className="flex items-center space-x-4">
                        <span className="w-8 h-8 rounded-lg bg-zinc-950 text-zinc-400 font-black text-xs flex items-center justify-center">
                          02
                        </span>
                        <div>
                          <p className="text-xs font-bold text-zinc-300">Organic Linen</p>
                          <p className="text-[10px] text-emerald-400 font-medium">+12% Minggu ini</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-600" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/30 border border-zinc-800/30 hover:border-purple-500/20 transition-all">
                      <div className="flex items-center space-x-4">
                        <span className="w-8 h-8 rounded-lg bg-zinc-950 text-zinc-400 font-black text-xs flex items-center justify-center">
                          03
                        </span>
                        <div>
                          <p className="text-xs font-bold text-zinc-300">Digital Archive</p>
                          <p className="text-[10px] text-purple-400 font-medium">Baru Muncul</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-600" />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => { setActiveTab('community'); }}
                  className="w-full mt-6 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold py-3 rounded-xl border border-zinc-800 transition-colors"
                >
                  Lihat Semua Tren Komunitas
                </button>
              </div>

            </div>

            {/* ITEM TERBARU GRID */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight">Koleksi Terkini</h3>
                  <p className="text-xs text-zinc-500">Pakaian teratas di lemari virtual Anda siap dipadankan</p>
                </div>
                <button 
                  onClick={() => setActiveTab('closet')} 
                  className="inline-flex items-center text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors group"
                >
                  <span>Buka Lemari</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {wardrobe.slice(0, 5).map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-[#0b0b0f] border border-zinc-900 rounded-2xl p-3 flex flex-col justify-between hover:border-zinc-800 transition-all group"
                  >
                    <div className="relative rounded-xl overflow-hidden aspect-square mb-3 bg-zinc-950">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <button 
                        onClick={() => toggleFavorite(item.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-rose-500 transition-all"
                      >
                        <Heart className={`w-3.5 h-3.5 ${item.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                      <span className="absolute bottom-2 left-2 text-[8px] bg-zinc-950/90 text-purple-300 border border-purple-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {item.tag}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-zinc-200 line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-zinc-500 uppercase font-semibold mt-0.5 tracking-wider">{item.category}</p>
                    </div>

                    <button 
                      onClick={() => {
                        setStylistContext('Santai');
                        setActiveTab('stylist');
                      }}
                      className="w-full mt-3 bg-zinc-900 hover:bg-purple-600 hover:text-white text-[10px] font-bold py-2 rounded-lg text-zinc-400 transition-all"
                    >
                      Coba Padu Padan
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SPANDUK EXCLUSIVE */}
            <div className="rounded-3xl p-6 bg-gradient-to-r from-[#0d0718] via-zinc-950 to-[#070b0c] border border-purple-500/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full filter blur-[50px] pointer-events-none" />
              
              <div className="space-y-2 text-center sm:text-left relative z-10">
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full font-extrabold uppercase tracking-widest">
                  Fitur Eksklusif
                </span>
                <h3 className="text-xl font-bold text-zinc-100">Sempurnakan Gaya Digitalmu</h3>
                <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                  Gaya Gue merevolusi cara Anda menentukan gaya busana harian dengan melacak keselarasan warna, jenis bahan pakaian, serta dinamika tren global secara otomatis.
                </p>
              </div>

              <div className="flex-shrink-0 relative z-10 w-full sm:w-auto">
                <button 
                  onClick={() => setActiveTab('stylist')}
                  className="w-full bg-white hover:bg-zinc-200 text-black text-xs font-black py-3 px-6 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Mulai Penataan AI</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: LEMARI VIRTUAL (CLOSET) */}
        {activeTab === 'closet' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Closet */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">Lemari Virtual Anda</h2>
                <p className="text-xs text-zinc-500">Koleksi busana digital Anda. Tambah pakaian baru dan kelompokkan sesuai kategori.</p>
              </div>

              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-purple-900/20 transition-all duration-300 flex items-center space-x-2 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Pakaian</span>
              </button>
            </div>

            {/* Filter Kategori */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-zinc-900">
              {['Semua', 'atasan', 'bawahan', 'sepatu', 'aksesoris'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setClosetFilter(cat)}
                  className={`text-xs font-bold px-4 py-2 rounded-xl transition-all capitalize ${
                    closetFilter === cat 
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-900/20' 
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  {cat === 'Semua' ? 'Semua Item' : cat}
                </button>
              ))}
            </div>

            {/* Grid Closet Items */}
            {wardrobe.filter(item => closetFilter === 'Semua' || item.category === closetFilter).length === 0 ? (
              <div className="text-center py-16 bg-[#0b0b0f] rounded-3xl border border-dashed border-zinc-800/80">
                <FolderHeart className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400 text-sm font-semibold">Tidak ada pakaian ditemukan</p>
                <p className="text-zinc-600 text-xs mt-1">Gunakan tombol 'Tambah Pakaian' untuk mengunggah pakaian baru Anda!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {wardrobe
                  .filter(item => closetFilter === 'Semua' || item.category === closetFilter)
                  .map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-[#0b0b0f] border border-zinc-900 rounded-2xl p-3 flex flex-col justify-between hover:border-zinc-800 transition-all group relative"
                    >
                      <div className="relative rounded-xl overflow-hidden aspect-square mb-3 bg-zinc-950">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        
                        {/* Favorite Button Overlay */}
                        <button 
                          onClick={() => toggleFavorite(item.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-rose-500 transition-all z-10"
                        >
                          <Heart className={`w-3.5 h-3.5 ${item.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>

                        <span className="absolute bottom-2 left-2 text-[8px] bg-zinc-950/95 text-purple-300 border border-purple-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          {item.tag}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-zinc-200 line-clamp-1">{item.name}</h4>
                        
                        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium">
                          <span className="uppercase tracking-wider">{item.category}</span>
                          <span className="flex items-center space-x-1">
                            <span 
                              className="w-2.5 h-2.5 rounded-full border border-zinc-700 block" 
                              style={{ backgroundColor: item.colorHex }} 
                            />
                            <span>{item.color}</span>
                          </span>
                        </div>
                        
                        <p className="text-[10px] text-zinc-600 italic line-clamp-1">{item.texture}</p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-zinc-900 flex items-center justify-between gap-1.5">
                        <button 
                          onClick={() => {
                            setStylistContext('Formal');
                            setActiveTab('stylist');
                          }}
                          className="flex-1 bg-zinc-900 hover:bg-purple-950 text-purple-400 hover:text-purple-300 text-[10px] font-bold py-1.5 rounded-lg border border-zinc-800 hover:border-purple-900/40 transition-all text-center"
                        >
                          Padukan
                        </button>
                        <button 
                          onClick={() => deleteClothing(item.id)}
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-rose-950 text-zinc-600 hover:text-rose-400 transition-all border border-zinc-800"
                          title="Hapus pakaian"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* MODAL TAMBAH PAKAIAN BARU */}
            {showAddModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                <div className="bg-[#0b0b0f] border border-zinc-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
                  
                  <div className="px-6 py-4 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Camera className="w-5 h-5 text-purple-400" />
                      <h3 className="font-bold text-zinc-100">Tambah Pakaian Baru</h3>
                    </div>
                    <button 
                      onClick={() => {
                        setShowAddModal(false);
                        setFilePreview(null);
                      }}
                      className="text-zinc-500 hover:text-zinc-300 font-bold text-sm"
                    >
                      Batal
                    </button>
                  </div>

                  <form onSubmit={handleAddClothing} className="p-6 space-y-4">
                    
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                        Unggah Foto Pakaian (Galeri/Kamera)
                      </label>
                      
                      {!filePreview ? (
                        <div className="border-2 border-dashed border-zinc-800 hover:border-purple-500/40 rounded-2xl p-6 text-center transition-all bg-zinc-950 cursor-pointer relative group">
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <Upload className="w-8 h-8 text-zinc-600 mx-auto mb-2 group-hover:text-purple-400 transition-colors" />
                          <p className="text-xs font-bold text-zinc-400">Pilih dari Galeri Foto</p>
                          <p className="text-[10px] text-zinc-600 mt-1">Mendukung format PNG, JPG, JPEG</p>
                        </div>
                      ) : (
                        <div className="relative rounded-2xl overflow-hidden aspect-video bg-zinc-950 border border-zinc-800">
                          <img src={filePreview} alt="Preview" className="w-full h-full object-contain" />
                          <button 
                            type="button"
                            onClick={() => setFilePreview(null)}
                            className="absolute top-2 right-2 bg-black/80 hover:bg-rose-950 text-rose-400 border border-zinc-800 px-3 py-1 rounded-xl text-[10px] font-bold transition-all"
                          >
                            Hapus & Ganti
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Nama Pakaian</label>
                        <input 
                          type="text" 
                          required
                          value={newClothing.name}
                          onChange={(e) => setNewClothing({ ...newClothing, name: e.target.value })}
                          placeholder="contoh: Jaket Parka Bomber"
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl px-3 py-2 text-xs text-zinc-100 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Kategori</label>
                        <select 
                          value={newClothing.category}
                          onChange={(e) => setNewClothing({ ...newClothing, category: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl px-3 py-2 text-xs text-zinc-300 outline-none transition-all"
                        >
                          <option value="atasan">Atasan (Outerwear/Tops)</option>
                          <option value="bawahan">Bawahan (Pants/Bottoms)</option>
                          <option value="sepatu">Sepatu (Footwear)</option>
                          <option value="aksesoris">Aksesoris (Accessories)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Warna Utama</label>
                        <input 
                          type="text" 
                          value={newClothing.color}
                          onChange={(e) => setNewClothing({ ...newClothing, color: e.target.value })}
                          placeholder="contoh: Hijau Sage, Hitam Matte"
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl px-3 py-2 text-xs text-zinc-100 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Tekstur & Bahan</label>
                        <input 
                          type="text" 
                          value={newClothing.texture}
                          onChange={(e) => setNewClothing({ ...newClothing, texture: e.target.value })}
                          placeholder="contoh: Rajutan Tebal, Katun Polos"
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl px-3 py-2 text-xs text-zinc-100 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Label/Gaya</label>
                        <input 
                          type="text" 
                          value={newClothing.tag}
                          onChange={(e) => setNewClothing({ ...newClothing, tag: e.target.value })}
                          placeholder="contoh: Cyber Step, Noir Label, Essentials"
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl px-3 py-2 text-xs text-zinc-100 outline-none transition-all"
                        />
                      </div>

                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95"
                    >
                      Simpan Pakaian ke Lemari
                    </button>

                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: AI STYLIST (REKOMENDASI CERDAS) */}
        {activeTab === 'stylist' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div>
              <h2 className="text-2xl font-black text-white">AI Stylist Personal</h2>
              <p className="text-xs text-zinc-500">Menganalisis koleksi lemari virtual untuk membuat kombinasi gaya cerdas secara instan.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="bg-[#0b0b0f] border border-zinc-900 rounded-3xl p-6 space-y-6 shadow-xl h-fit">
                <div className="flex items-center space-x-2 pb-4 border-b border-zinc-900">
                  <Sliders className="w-5 h-5 text-purple-400" />
                  <h3 className="font-bold text-zinc-200">Parameter AI Stylist</h3>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Konteks / Acara</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Kuliah', 'Formal', 'Santai'].map((ctx) => (
                      <button
                        key={ctx}
                        type="button"
                        onClick={() => setStylistContext(ctx)}
                        className={`text-xs py-2 px-1.5 rounded-xl font-bold border transition-all ${
                          stylistContext === ctx 
                            ? 'bg-purple-900/30 text-purple-300 border-purple-500' 
                            : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:bg-zinc-900'
                        }`}
                      >
                        {ctx}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <CloudSun className="w-3.5 h-3.5" />
                    <span>Kondisi Cuaca</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Cerah', 'Hujan / Dingin'].map((wtr) => (
                      <button
                        key={wtr}
                        type="button"
                        onClick={() => setStylistWeather(wtr)}
                        className={`text-xs py-2 rounded-xl font-bold border transition-all ${
                          stylistWeather === wtr 
                            ? 'bg-purple-900/30 text-purple-300 border-purple-500' 
                            : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:bg-zinc-900'
                        }`}
                      >
                        {wtr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-zinc-950/50 p-4 rounded-2xl border border-zinc-900/80 text-[10px] text-zinc-500 space-y-2">
                  <p className="font-bold text-zinc-400 flex items-center space-x-1">
                    <Info className="w-3.5 h-3.5 text-purple-400" />
                    <span>Algoritma Collaborative Filtering</span>
                  </p>
                  <p className="leading-relaxed">
                    Sistem ini menganalisis karakteristik pakaian di lemari Anda dan memadukannya dengan preferensi gaya global yang sedang tren saat ini.
                  </p>
                </div>

                <button 
                  onClick={generateAIRecommendation}
                  disabled={isGeneratingStyle}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isGeneratingStyle ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sedang Merajut Gaya...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Dapatkan Rekomendasi Gaya</span>
                    </>
                  )}
                </button>
              </div>

              <div className="lg:col-span-2">
                {isGeneratingStyle ? (
                  <div className="h-[400px] bg-[#0b0b0f] border border-zinc-900 rounded-3xl flex flex-col items-center justify-center space-y-4 shadow-xl">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                      <Sparkles className="w-6 h-6 text-purple-400 absolute top-5 left-5 animate-pulse" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-zinc-200">Kecerdasan Buatan Sedang Berjalan</p>
                      <p className="text-xs text-zinc-500 mt-1">Menyeimbangkan nilai warna, kecocokan tekstur, & tren acara...</p>
                    </div>
                  </div>
                ) : generatedOutfit ? (
                  <div className="bg-[#0b0b0f] border border-zinc-900 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl animate-fadeIn relative overflow-hidden">
                    
                    <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/5 rounded-full filter blur-[60px] pointer-events-none" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-900">
                      <div>
                        <div className="inline-flex items-center space-x-1 bg-purple-900/30 text-purple-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                          <Sparkles className="w-3 h-3" />
                          <span>AI STYLIST VERIFIED</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">{generatedOutfit.title}</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">Klasifikasi Gaya: <span className="text-purple-400 font-semibold">{generatedOutfit.styleType}</span></p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-[10px] uppercase font-bold text-zinc-500">Kondisi Cuaca</p>
                        <p className="text-xs font-semibold text-emerald-400 flex items-center sm:justify-end space-x-1">
                          <CloudSun className="w-3.5 h-3.5" />
                          <span>{stylistWeather}</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-950 p-4 rounded-2xl border border-zinc-900">
                      {generatedOutfit.desc}
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center space-x-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Kombinasi Rekomendasi Pakaian</span>
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        
                        {generatedOutfit.top && (
                          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-3 flex flex-col justify-between">
                            <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-zinc-900">
                              <img src={generatedOutfit.top.image} alt="Tops" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-[8px] uppercase tracking-wider text-purple-400 font-bold">Atasan</p>
                              <h5 className="text-[11px] font-bold text-zinc-200 line-clamp-1">{generatedOutfit.top.name}</h5>
                              <p className="text-[10px] text-zinc-500 mt-0.5">{generatedOutfit.top.color}</p>
                            </div>
                          </div>
                        )}

                        {generatedOutfit.bottom && (
                          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-3 flex flex-col justify-between">
                            <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-zinc-900">
                              <img src={generatedOutfit.bottom.image} alt="Bottoms" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-[8px] uppercase tracking-wider text-purple-400 font-bold">Bawahan</p>
                              <h5 className="text-[11px] font-bold text-zinc-200 line-clamp-1">{generatedOutfit.bottom.name}</h5>
                              <p className="text-[10px] text-zinc-500 mt-0.5">{generatedOutfit.bottom.color}</p>
                            </div>
                          </div>
                        )}

                        {generatedOutfit.shoes && (
                          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-3 flex flex-col justify-between">
                            <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-zinc-900">
                              <img src={generatedOutfit.shoes.image} alt="Shoes" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-[8px] uppercase tracking-wider text-purple-400 font-bold">Sepatu</p>
                              <h5 className="text-[11px] font-bold text-zinc-200 line-clamp-1">{generatedOutfit.shoes.name}</h5>
                              <p className="text-[10px] text-zinc-500 mt-0.5">{generatedOutfit.shoes.color}</p>
                            </div>
                          </div>
                        )}

                        {generatedOutfit.accessory && (
                          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-3 flex flex-col justify-between">
                            <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-zinc-900">
                              <img src={generatedOutfit.accessory.image} alt="Accessories" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-[8px] uppercase tracking-wider text-purple-400 font-bold">Aksesoris</p>
                              <h5 className="text-[11px] font-bold text-zinc-200 line-clamp-1">{generatedOutfit.accessory.name}</h5>
                              <p className="text-[10px] text-zinc-500 mt-0.5">{generatedOutfit.accessory.color}</p>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-500">Rekomendasi ini bersifat dinamis sesuai ketersediaan stok lemari.</span>
                      <button 
                        onClick={() => {
                          showToast('Gaya Berhasil Disimpan ke OOTD Favorit Anda! ❤️');
                        }}
                        className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold py-2.5 px-4 rounded-xl border border-zinc-800 transition-all active:scale-95 flex items-center space-x-1.5"
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span>Simpan Kombinasi</span>
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="h-[400px] bg-[#0b0b0f] border border-zinc-900 rounded-3xl flex flex-col items-center justify-center space-y-4 shadow-xl text-center p-6">
                    <Sparkles className="w-12 h-12 text-zinc-600" />
                    <div>
                      <p className="text-zinc-400 text-sm font-bold">Rekomendasi Belum Dibuat</p>
                      <p className="text-zinc-600 text-xs mt-1">Konfigurasikan Parameter AI di samping kiri lalu klik tombol 'Dapatkan Rekomendasi Gaya'.</p>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: KOMUNITAS (SOCIAL FEED) */}
        {activeTab === 'community' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">Komunitas Gaya Digital</h2>
                <p className="text-xs text-zinc-500">Berbagi inspirasi OOTD, temukan tren terbaru dari sesama pengguna, dan kembangkan gayamu.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 space-y-6">
                
                {/* Form Post Baru - Unggah Foto Berfungsi */}
                <div className="bg-[#0b0b0f] border border-zinc-900 rounded-3xl p-5 shadow-lg flex items-start space-x-4">
                  <img src={userProfile.avatar} alt="Me" className="w-10 h-10 rounded-full object-cover ring-1 ring-purple-500/30" />
                  <div className="flex-1 space-y-4">
                    <textarea 
                      placeholder="Bagikan inspirasi gaya OOTD-mu hari ini..."
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 focus:border-purple-500 rounded-2xl p-3 text-xs text-zinc-100 outline-none resize-none h-20 transition-all placeholder:text-zinc-600"
                    />

                    {newPostImage && (
                      <div className="relative rounded-2xl overflow-hidden max-w-sm aspect-video bg-zinc-950 border border-zinc-800 flex items-center justify-center group">
                        <img src={newPostImage} alt="Pratinjau OOTD" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => setNewPostImage(null)}
                          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/80 hover:bg-rose-950 text-rose-400 border border-zinc-800/80 transition-all"
                          title="Hapus foto"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <input 
                          type="file" 
                          id="ootd-upload-input"
                          accept="image/*"
                          onChange={handleCommunityImageUpload}
                          className="hidden"
                        />
                        <label 
                          htmlFor="ootd-upload-input"
                          className="inline-flex items-center space-x-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-purple-400 text-xs font-semibold px-4 py-2 rounded-xl border border-zinc-850 cursor-pointer transition-all active:scale-95"
                        >
                          <span>📸 Unggah Foto OOTD</span>
                        </label>
                      </div>

                      <button 
                        onClick={handleCreatePost}
                        className="bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-purple-950/20 hover:shadow-purple-900/20 transition-all active:scale-95"
                      >
                        Posting
                      </button>
                    </div>
                  </div>
                </div>

                {/* Daftar Postingan Komunitas */}
                {communityPosts.map((post) => (
                  <div key={post.id} className="bg-[#0b0b0f] border border-zinc-900 rounded-3xl overflow-hidden shadow-lg space-y-4 p-5">
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={post.author === userProfile.name ? userProfile.avatar : post.avatar} 
                          alt={post.author} 
                          className="w-10 h-10 rounded-full object-cover border border-zinc-800" 
                        />
                        <div>
                          <p className="text-xs font-bold text-zinc-200">{post.author}</p>
                          <p className="text-[10px] text-zinc-500">{post.time}</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-zinc-950 text-purple-400 border border-purple-500/10 px-2.5 py-1 rounded-full font-bold">
                        OOTD Verified
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {post.description}
                    </p>

                    <div className="rounded-2xl overflow-hidden aspect-video bg-zinc-950 border border-zinc-900">
                      <img src={post.image} alt="OOTD Post" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex items-center space-x-6 pt-2 border-t border-zinc-900">
                      <button 
                        onClick={() => handleLikePost(post.id)}
                        className={`inline-flex items-center space-x-1.5 text-xs font-bold transition-colors ${
                          post.isLiked ? 'text-rose-500' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-500' : ''}`} />
                        <span>{post.likes} Suka</span>
                      </button>
                      <span className="inline-flex items-center space-x-1.5 text-xs text-zinc-500 font-bold">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments.length} Komentar</span>
                      </span>
                    </div>

                    <div className="space-y-3 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-900">
                      
                      <div className="space-y-2.5 max-h-36 overflow-y-auto">
                        {post.comments.map((comment, index) => (
                          <div key={index} className="text-xs">
                            <span className="font-bold text-zinc-300 mr-2">{comment.name}</span>
                            <span className="text-zinc-400">{comment.text}</span>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex items-center gap-2 pt-2 border-t border-zinc-900/60">
                        <input 
                          type="text" 
                          required
                          value={post.newComment}
                          onChange={(e) => handleCommentChange(e.target.value, post.id)}
                          placeholder="Tulis tanggapan atau komentar..."
                          className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-purple-500 rounded-xl px-3 py-2 text-[11px] text-zinc-200 outline-none transition-all"
                        />
                        <button 
                          type="submit"
                          className="bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold px-4 py-2 rounded-xl transition-all"
                        >
                          Kirim
                        </button>
                      </form>

                    </div>

                  </div>
                ))}

              </div>

              <div className="space-y-6">
                
                <div className="bg-[#0b0b0f] border border-zinc-900 rounded-3xl p-6 shadow-xl space-y-4">
                  <h3 className="font-bold text-zinc-200 flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    <span>Tagar Terpopuler Hari Ini</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-purple-400 font-bold">#GayaGue</span>
                      <span className="text-zinc-500 font-semibold">1,242 posts</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-purple-400 font-bold">#UrbanExplorer</span>
                      <span className="text-zinc-500 font-semibold">892 posts</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-purple-400 font-bold">#CyberMinimalist</span>
                      <span className="text-zinc-500 font-semibold">542 posts</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-purple-400 font-bold">#SustainabilityFashion</span>
                      <span className="text-zinc-500 font-semibold">324 posts</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0b0b0f] border border-zinc-900 rounded-3xl p-6 shadow-xl space-y-4">
                  <h3 className="font-bold text-zinc-200 flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span>Fashion Enthusiast Terpopuler</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="user" className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-bold text-zinc-200">Siti Sarah</p>
                          <p className="text-[9px] text-zinc-500">Noir & Classic Stylist</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => showToast('Anda telah mengikuti Siti Sarah!')}
                        className="bg-zinc-900 hover:bg-zinc-800 text-purple-400 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-zinc-800"
                      >
                        Ikuti
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="user" className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-bold text-zinc-200">Rian Kusuma</p>
                          <p className="text-[9px] text-zinc-500">Streetwear Enthusiast</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => showToast('Anda telah mengikuti Rian Kusuma!')}
                        className="bg-zinc-900 hover:bg-zinc-800 text-purple-400 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-zinc-800"
                      >
                        Ikuti
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 5: AKUN / PROFIL (EDIT IDENTITAS) */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
            
            <div>
              <h2 className="text-2xl font-black text-white">Profil Gaya Digital</h2>
              <p className="text-xs text-zinc-500">Kelola identitas personal Anda yang terintegrasi dengan preferensi asisten cerdas AI Stylist.</p>
            </div>

            {/* Kartu Profil Utama */}
            <div className="bg-[#0b0b0f] border border-zinc-900 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/5 rounded-full filter blur-[80px] pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
                
                {/* Avatar & NIM - Fungsional Unggah Foto */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative group cursor-pointer">
                    <input 
                      type="file" 
                      id="profile-avatar-upload"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                    <label htmlFor="profile-avatar-upload" className="cursor-pointer block relative">
                      <img 
                        src={userProfile.avatar} 
                        alt={userProfile.name} 
                        className="w-28 h-28 rounded-full object-cover border-2 border-purple-500 shadow-xl shadow-purple-950/20 group-hover:brightness-75 transition-all duration-300" 
                      />
                      <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Camera className="w-5 h-5 text-white mb-1" />
                        <span className="text-[9px] font-bold text-white uppercase tracking-wider">Ubah Foto</span>
                      </div>
                    </label>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-500/20 px-3 py-1 rounded-full font-bold">
                      NIM {userProfile.nim}
                    </span>
                  </div>
                </div>

                {/* Deskripsi Detil */}
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white">{userProfile.name}</h3>
                    <p className="text-xs text-zinc-400 font-medium mt-0.5">{userProfile.university}</p>
                    <p className="text-xs text-zinc-500 font-medium">{userProfile.email}</p>
                  </div>

                  <div className="space-y-1 bg-zinc-950 p-4 rounded-2xl border border-zinc-900">
                    <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-black">Bio Saya</span>
                    <p className="text-xs text-zinc-300 leading-relaxed">{userProfile.bio}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <div className="bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-xl text-xs">
                      <span className="text-zinc-500 font-bold mr-1.5">Gaya Pilihan:</span>
                      <span className="text-purple-400 font-extrabold">{userProfile.stylePreference}</span>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-xl text-xs">
                      <span className="text-zinc-500 font-bold mr-1.5">Item Lemari:</span>
                      <span className="text-emerald-400 font-extrabold">{wardrobe.length} Pakaian</span>
                    </div>
                  </div>

                  {!isEditingProfile && (
                    <div className="pt-2">
                      <button 
                        onClick={() => {
                          setEditProfile({ ...userProfile });
                          setIsEditingProfile(true);
                        }}
                        className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-lg active:scale-95 transition-all"
                      >
                        Ubah Identitas Saya
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* FORM EDIT IDENTITAS (PROFIL) */}
            {isEditingProfile && (
              <div className="bg-[#0b0b0f] border border-zinc-900 rounded-3xl p-6 shadow-xl animate-fadeIn space-y-6">
                <div className="flex items-center space-x-2 pb-4 border-b border-zinc-900">
                  <User className="w-5 h-5 text-purple-400" />
                  <h3 className="font-bold text-zinc-200">Form Pembaruan Profil Digital</h3>
                </div>

                {profileSuccessMsg && (
                  <div className="p-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl text-xs font-semibold">
                    {profileSuccessMsg}
                  </div>
                )}

                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Nama Lengkap</label>
                      <input 
                        type="text" 
                        required
                        value={editProfile.name}
                        onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl px-3 py-2.5 text-xs text-zinc-100 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Nomor Induk Mahasiswa (NIM)</label>
                      <input 
                        type="text" 
                        required
                        value={editProfile.nim}
                        onChange={(e) => setEditProfile({ ...editProfile, nim: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl px-3 py-2.5 text-xs text-zinc-100 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Email Kampus / Pribadi</label>
                      <input 
                        type="email" 
                        required
                        value={editProfile.email}
                        onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl px-3 py-2.5 text-xs text-zinc-100 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Universitas / Institusi</label>
                      <input 
                        type="text" 
                        required
                        value={editProfile.university}
                        onChange={(e) => setEditProfile({ ...editProfile, university: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl px-3 py-2.5 text-xs text-zinc-100 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Preferensi Gaya Default</label>
                      <select 
                        value={editProfile.stylePreference}
                        onChange={(e) => setEditProfile({ ...editProfile, stylePreference: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl px-3 py-2.5 text-xs text-zinc-300 outline-none transition-all"
                      >
                        <option value="Cyber Minimalist">Cyber Minimalist (Techwear & Minimalis)</option>
                        <option value="Organic Linen">Organic Linen (Casual, Natural & Earthy)</option>
                        <option value="Classic Noir">Classic Noir (Formal, Elegant & Vintage)</option>
                        <option value="Streetwear Trend">Streetwear Trend (Hypebeast & Loose-fit)</option>
                      </select>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Bio Singkat Saya</label>
                      <textarea 
                        value={editProfile.bio}
                        onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                        rows="3"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl p-3 text-xs text-zinc-100 outline-none resize-none transition-all"
                        placeholder="Tuliskan bio gaya atau hobi fashionmu..."
                      />
                    </div>

                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-bold py-2.5 px-6 rounded-xl transition-all"
                    >
                      Batal
                    </button>
                    <button 
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-lg active:scale-95 transition-all flex items-center space-x-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Perubahan</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Hubungan Terintegrasi (Data ERD Informasi) */}
            <div className="bg-[#0b0b0f] border border-zinc-900 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-zinc-200 text-sm flex items-center space-x-2">
                <Info className="w-4 h-4 text-purple-400" />
                <span>Arsitektur Sistem (Analisis Tugas & Perancangan)</span>
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Aplikasi GAYA GUE dirancang menggunakan skema basis data terstruktur (ERD) yang mengaitkan entitas <strong className="text-purple-400">PENGGUNA</strong> dengan lemari virtual <strong className="text-purple-400">PAKAIAN</strong>, sistem penentuan asisten cerdas <strong className="text-purple-400">AI_REKOMENDASI</strong>, serta interaksi sosial digital melalui <strong className="text-purple-400">OOTD_POST</strong> dan <strong className="text-purple-400">KOMENTAR</strong>.
              </p>
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-900 text-[10px] text-zinc-500 flex flex-wrap gap-4">
                <div>
                  <span className="font-bold text-zinc-400 block">Metodologi Pengembangan</span>
                  <span>Rapid Application Development (RAD)</span>
                </div>
                <div>
                  <span className="font-bold text-zinc-400 block">Computer Vision Classifier</span>
                  <span>RGB Color matching, Texture, & Category classification</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER & BOTTOM NAVIGATION */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#07070a]/90 backdrop-blur-md border-t border-zinc-900/80 px-4 py-2 sm:py-3 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between">
          
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              activeTab === 'home' ? 'text-purple-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-[9px] font-bold tracking-wider">Home</span>
          </button>

          <button 
            onClick={() => setActiveTab('closet')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              activeTab === 'closet' ? 'text-purple-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <FolderHeart className="w-5 h-5 mb-1" />
            <span className="text-[9px] font-bold tracking-wider">Closet</span>
          </button>

          <button 
            onClick={() => setActiveTab('stylist')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              activeTab === 'stylist' ? 'text-purple-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Sparkles className="w-5 h-5 mb-1 animate-pulse" />
            <span className="text-[9px] font-bold tracking-wider">AI Stylist</span>
          </button>

          <button 
            onClick={() => setActiveTab('community')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              activeTab === 'community' ? 'text-purple-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Users className="w-5 h-5 mb-1" />
            <span className="text-[9px] font-bold tracking-wider">Community</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              activeTab === 'profile' ? 'text-purple-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-[9px] font-bold tracking-wider">Profile</span>
          </button>

        </div>
      </footer>

    </div>
  );
}
