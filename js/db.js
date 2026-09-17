/* ==========================================================================
   Ek Mutho Khabar Manobik Foundation - Local Database & Dynamic Balance Engine
   ========================================================================== */

const DB_KEY = 'emkf_database_v8';

// Initial Seed Data
const defaultDatabase = {
  openingBalance: 0,
  
  funds: [
    { id: 'food', nameBn: 'খাদ্য ফান্ড (Food Fund)', nameEn: 'Food Fund', opening: 0 },
    { id: 'housing', nameBn: 'আশ্রয় ও গৃহ নির্মাণ ফান্ড (Shelter & Housing Fund)', nameEn: 'Shelter & Housing Fund', opening: 0 },
    { id: 'education', nameBn: 'শিক্ষা সহায়তা ফান্ড', nameEn: 'Education Support Fund', opening: 0 },
    { id: 'medical', nameBn: 'চিকিৎসা সহায়তা ফান্ড', nameEn: 'Medical Support Fund', opening: 0 },
    { id: 'self_reliance', nameBn: 'আত্মকর্মসংস্থান ফান্ড', nameEn: 'Self-Reliance Fund', opening: 0 },
    { id: 'elderly', nameBn: 'প্রবীণ সেবা ফান্ড', nameEn: 'Elderly Care Fund', opening: 0 },
    { id: 'old_age_home', nameBn: 'বৃদ্ধাশ্রম প্রকল্প ফান্ড', nameEn: 'Old Age Home Project Fund', opening: 0 },
    { id: 'religious', nameBn: 'ধর্মীয় ও সামাজিক উন্নয়ন ফান্ড', nameEn: 'Religious & Social Dev Fund', opening: 0 },
    { id: 'general', nameBn: 'সাধারণ মানবিক ফান্ড', nameEn: 'General Humanitarian Fund', opening: 0 }
  ],

  notices: [
    {
      id: 'NOT-2026-001',
      title: '২০২৬ সালের বার্ষিক সাধারণ সভা (AGM) সংক্রান্ত জরুরী নোটিশ',
      category: 'জরুরী নোটিশ',
      date: '2026-09-10',
      content: 'এক মুঠো খাবার ও পুনর্বাসন ফাউন্ডেশনের সকল সম্মানিত সদস্যদের জানানো যাচ্ছে যে আগামী ২৫ ডিসেম্বর ২০২৬ তারিখ কেন্দ্রীয় কার্যালয়ে বার্ষিক সাধারণ সভা অনুষ্ঠিত হবে।',
      status: 'Published'
    },
    {
      id: 'NOT-2026-002',
      title: 'বৃদ্ধাশ্রম নির্মাণ প্রকল্পে জমি অধিগ্রহণ অগ্রগতির নোটিশ',
      category: 'প্রকল্প আপডেট',
      date: '2026-09-01',
      content: 'আমাদের স্বপ্নের ১০০ শয্যা বিশিষ্ট প্রবীণ বাসস্থানের জমি রেজিস্ট্রেশন প্রক্রিয়া সম্পন্ন হতে যাচ্ছে। সকল দাতাদের বিনীত অভিনন্দন।',
      status: 'Published'
    }
  ],
  
  donations: [],

  expenses: [],

  // Monthly Responsibility Members Directory
  members: [
    {
      id: 'HRF-001',
      name: 'মো: আহসান হাবিব কাজল',
      phone: '01400844602',
      whatsapp: '01400844602',
      email: '',
      district: 'নটানপাড়া, রৌমারী বাজার, কুড়িগ্রাম',
      occupation: 'পর্যবেক্ষক, প্রোপ্রাইটর: মেসার্স রিসান ট্রেড ইন্টারন্যাশনাল (বয়স: ৩৬)',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: 'https://i.postimg.cc/9Fp0pmXv/Ahshan-habib-kajol.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-002',
      name: 'মো: শাহাজামাল',
      phone: '01953228870',
      whatsapp: '01306406917',
      email: '',
      district: 'মির্জাপাড়া, রৌমারী, কুড়িগ্রাম',
      occupation: 'কোষাধ্যক্ষ, প্রোপ্রাইটর: মেসার্স শাহাজামাল এন্টারপ্রাইজ (বয়স: ৪০)',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#2563EB',
      profileImage: 'https://i.postimg.cc/RZp0kgHj/Md-Shahjamal.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-003',
      name: 'মো: আল আমিন অনিক',
      phone: '01832630299',
      whatsapp: '01936758675',
      email: '',
      district: 'মধ্য ইছাকুড়ি, রৌমারী, কুড়িগ্রাম',
      occupation: 'হিসাব রক্ষক, চেয়ারম্যান: ঢাকা এয়ার ট্রাভেলস (বয়স: ৩৬)',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#7C3AED',
      profileImage: 'https://i.postimg.cc/MTVKjxrd/Md-Al-Amin-Onik-Director.png',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-004',
      name: 'মো: আশিকুল ইসলাম সৈকত',
      phone: '+96871779081',
      whatsapp: '+96871779081',
      email: '',
      district: 'বন্দবেড়, রৌমারী, কুড়িগ্রাম',
      occupation: 'পর্যবেক্ষক, রেমিটেন্স যোদ্ধা-ওমান (বয়স: ৪৪)',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য (প্রবাসী)',
      frequency: 'Monthly',
      amount: 5000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#D97706',
      profileImage: 'https://i.postimg.cc/PJMX2yHb/Md-Ashikul-Islam-Soikot.jpg',
      isAnonymous: false,
      isProbashi: true
    },
    {
      id: 'HRF-005',
      name: 'মো: জাহাঙ্গীর আলম লিপু',
      phone: '+008898951482',
      whatsapp: '+008898951482',
      email: '',
      district: 'বন্দবেড়, রৌমারী, কুড়িগ্রাম',
      occupation: 'রেমিটেন্স যোদ্ধা-ওমান (বয়স: ৩৬)',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য (প্রবাসী)',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: 'https://i.postimg.cc/tCXC7Kdd/Md-jahangir-Alam-Lipu.jpg',
      isAnonymous: false,
      isProbashi: true
    },
    {
      id: 'HRF-006',
      name: 'মো: মেহেদী হাসান',
      phone: '01999883659',
      whatsapp: '01999883659',
      email: '',
      district: 'মধ্য ইছাকুড়ি, রৌমারী, কুড়িগ্রাম',
      occupation: 'রেমিটেন্স যোদ্ধা-জাপান (বয়স: ২৮)',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য (প্রবাসী)',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#DC2626',
      profileImage: 'https://i.postimg.cc/BQMZFmMb/Md-Mehedi-Hasan.jpg',
      isAnonymous: false,
      isProbashi: true
    },
    {
      id: 'HRF-007',
      name: 'মো: মোখলেছুর রহমান',
      phone: '+60102123702',
      whatsapp: '+60102123702',
      email: '',
      district: 'কাঠালবাড়ী মোড়, রৌমারী, কুড়িগ্রাম',
      occupation: 'রেমিটেন্স যোদ্ধা-মালয়েশিয়া (বয়স: ৩৪)',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য (প্রবাসী)',
      frequency: 'Monthly',
      amount: 800,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#0284C7',
      profileImage: 'https://i.postimg.cc/s2Z3tsyd/Md-Mokhlesur-Rahman.jpg',
      isAnonymous: false,
      isProbashi: true
    },
    {
      id: 'HRF-008',
      name: 'ডা: রিয়াদ আরফিন বিদ্যুৎ',
      phone: '01710585108',
      whatsapp: '01710585108',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'চিকিৎসক, চেম্বার: রৌমারী জেনারেল হাসপাতাল (বয়স: ৩৮)',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: 'https://i.postimg.cc/HxDTmRs6/Dr-Riyad-Arefin-Biddut.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-009',
      name: 'ডা: অলোক কুমার',
      phone: '01710000000',
      whatsapp: '',
      email: '',
      district: 'রৌমারী স্বাস্থ্য কমপ্লেক্স, রৌমারী, কুড়িগ্রাম',
      occupation: 'উপ-সহকারী কমিউনিটি মেডিকেল অফিসার (বয়স: ৪০)',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#7C3AED',
      profileImage: 'https://i.postimg.cc/kG796SSd/Alok-Kumar.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-010',
      name: 'মো: শাহ আলম',
      phone: '01966442769',
      whatsapp: '01966442769',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'ম্যানেজিং ডিরেক্টর, লাইফ কেয়ার হাসপাতাল (বয়স: ৩৪)',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#2563EB',
      profileImage: 'https://i.postimg.cc/Hn3mQL0K/Shah-Alam.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-011',
      name: 'মো: রুহুল আমিন বিএসসি',
      phone: '01924060499',
      whatsapp: '01924060499',
      email: '',
      district: 'মধ্য ইছাকুড়ি, রৌমারী, কুড়িগ্রাম',
      occupation: 'সহকারী শিক্ষক, রৌমারী সিজি জামান উচ্চ বিদ্যালয় (বয়স: ৩৮)',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#D97706',
      profileImage: 'https://i.postimg.cc/9F8V0rF6/Ruhul-Amin-Bsc.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-012',
      name: 'মো: আব্দুল আলিম',
      phone: '01936142119',
      whatsapp: '01936142119',
      email: '',
      district: 'চেরাগ আলী, টঙ্গী, গাজীপুর',
      occupation: 'পরিচালক, আজাদ আর্ট',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: 'https://i.postimg.cc/KcWJYbym/Md-abdul-Alim.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-013',
      name: 'মো: আনারুল ইসলাম',
      phone: '01832681221',
      whatsapp: '01832681221',
      email: '',
      district: 'ঢাকা (স্থায়ী: হাজিরহাট, দাঁতভাঙ্গা, রৌমারী, কুড়িগ্রাম)',
      occupation: 'চাকুরীজীবী',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#2563EB',
      profileImage: null,
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-014',
      name: 'মোছা: রেবেকা',
      phone: '01715026715',
      whatsapp: '01715026715',
      email: '',
      district: 'ঢাকা',
      occupation: 'সদস্য',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1500,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#EC4899',
      profileImage: null,
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-015',
      name: 'মো: বায়জিদ বোস্তামি',
      phone: '01717664000',
      whatsapp: '01717664000',
      email: '',
      district: 'কোদালকাটি, রাজিবপুর, কুড়িগ্রাম',
      occupation: 'ইউপি সদস্য',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: 'https://i.postimg.cc/8cnZL8Y0/Md-Bayezid-Bostami.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-016',
      name: 'মো: আপেল মিয়া',
      phone: '01715549788',
      whatsapp: '01715549788',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'চেয়ারম্যান, আনোয়ার ডায়াগনস্টিক সেন্টার',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#7C3AED',
      profileImage: 'https://i.postimg.cc/05ZrG5yh/Md-Apel-Mia.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-017',
      name: 'এম এইচ মামুন কবীর',
      phone: '01645215894',
      whatsapp: '01645215894',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'ম্যানেজিং ডিরেক্টর, ঢাকা এয়ার ট্রাভেলস',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: 'https://i.postimg.cc/RFgdz5vx/MH-Mamun-Kabir.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-018',
      name: 'মো: আবু সায়েম মুন্না',
      phone: '01728930504',
      whatsapp: '01728930504',
      email: '',
      district: 'রৌমারী বাজার, কুড়িগ্রাম',
      occupation: 'প্রোপ্রাইটর, মুন্না মেডিকেল হল',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#2563EB',
      profileImage: 'https://i.postimg.cc/8C0xg0D0/Abu-Sayem-Munna.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-019',
      name: 'মো: নাজমুল ইসলাম',
      phone: '+96565924680',
      whatsapp: '+96565924680',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'রেমিটেন্স যোদ্ধা-কুয়েত',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য (প্রবাসী)',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: 'https://i.postimg.cc/0yTjgVDY/Chat-GPT-Image-Sep-17-2026-10-37-55-PM.png',
      isAnonymous: false,
      isProbashi: true
    },
    {
      id: 'HRF-020',
      name: 'মো: মাহবুবুর রহমান',
      phone: '01915604026',
      whatsapp: '01915604026',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'চেয়ারম্যান, রৌমারী জেনারেল হসপিটাল',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#2563EB',
      profileImage: 'https://i.postimg.cc/0NTZfR9D/Mahbub-Alam.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-021',
      name: 'মো: মনির হোসেন',
      phone: '01710005007',
      whatsapp: '01710005007',
      email: '',
      district: 'রাজীবপুর, কুড়িগ্রাম',
      occupation: 'ব্যবসায়ী',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#D97706',
      profileImage: 'https://i.postimg.cc/3NNcfMkd/Monir-Hosen.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-022',
      name: 'মো: হুমায়ুন কবীর মিলন',
      phone: '',
      whatsapp: '',
      email: '',
      district: 'রাজিবপুর, কুড়িগ্রাম',
      occupation: 'রেমিটেন্স যোদ্ধা-সৌদি আরব',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য (প্রবাসী)',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: 'https://i.postimg.cc/HxWnFjWs/Md-Kabir-Hosen.jpg',
      isAnonymous: false,
      isProbashi: true
    },
    {
      id: 'HRF-023',
      name: 'খন্দকার সাদমান ফুয়াদ',
      phone: '01917155329',
      whatsapp: '01917155329',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'পার্টনার, লাইফ কেয়ার হসপিটাল',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#2563EB',
      profileImage: 'https://i.postimg.cc/qqGKy2ZW/khondokar-sadman-Fuyad.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-024',
      name: 'মাওলানা মো: আজিজুর রহমান',
      phone: '01992882934',
      whatsapp: '01992882934',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'চেয়ারম্যান, আয়শা ডায়াগনস্টিক সেন্টার',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: 'https://i.postimg.cc/RVV626Yv/Maolana-Azizur-Rahman.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-025',
      name: 'ওয়ালিদ বিন বকুল',
      phone: '01856741750',
      whatsapp: '01856741750',
      email: '',
      district: 'রৌমারী বাজার, রৌমারী, কুড়িগ্রাম',
      occupation: 'ব্যবসায়ী',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#D97706',
      profileImage: 'https://i.postimg.cc/jSSYPNjK/walid-Bin-Bokul.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-026',
      name: 'মো: সোলায়মান হোসেন উজ্জল',
      phone: '01796693092',
      whatsapp: '01796693092',
      email: '',
      district: 'বাইমমারী, রৌমারী, কুড়িগ্রাম',
      occupation: 'সহকারী শিক্ষক',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: 'https://i.postimg.cc/XNs8XytL/Solaiman-Hosen-Ujjol.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-027',
      name: 'মো: আবু রায়হান',
      phone: '01929150414',
      whatsapp: '01929150414',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'অফিস সহকারী, উপজেলা পরিষদ',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#2563EB',
      profileImage: null,
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-028',
      name: 'মো: শফিকুল ইসলাম',
      phone: '01745953668',
      whatsapp: '01745953668',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'প্রোপ্রাইটর: শান্ত কম্পিউটার',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#7C3AED',
      profileImage: null,
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-029',
      name: 'মো: রবিন হোসেন',
      phone: '01931742839',
      whatsapp: '01931742839',
      email: '',
      district: 'জন্দিরকান্দা, রৌমারী, কুড়িগ্রাম',
      occupation: 'ব্যবসায়ী',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: null,
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-030',
      name: 'মো: সোরহাব হোসেন',
      phone: '01716492126',
      whatsapp: '01716492126',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'প্রিন্সিপাল, মনিংসান কিন্ডারগার্টেন',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#DC2626',
      profileImage: null,
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-031',
      name: 'মো: সুখ বাদশা',
      phone: '01966721699',
      whatsapp: '01966721699',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'প্রোপ্রাইটর, এসএস কম্পিউটার',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#2563EB',
      profileImage: 'https://i.postimg.cc/sDwDk3Qn/Sukh-Badsha.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-032',
      name: 'মো: মশিউর রহমান পলাশ',
      phone: '01912438250',
      whatsapp: '01912438250',
      email: '',
      district: 'রৌমারী বাজার, কুড়িগ্রাম',
      occupation: 'ব্যবসায়ী',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: 'https://i.postimg.cc/wvRZqQjR/Md-Moshiur-Rahman-Polash.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-033',
      name: 'মো: বাবুল হোসেন',
      phone: '',
      whatsapp: '',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'চেয়ারম্যান, লাইফ কেয়ার হসপিটাল',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#2563EB',
      profileImage: null,
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-034',
      name: 'ডা: যোবায়ের আল মাহমুদ শিমুল',
      phone: '01677122889',
      whatsapp: '01677122889',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'চিকিৎসক, চেম্বার: লাইফ কেয়ার হসপিটাল',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#7C3AED',
      profileImage: 'https://i.postimg.cc/J0wgGHym/Dr-Jubayer-al-mahmud-shimul.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-035',
      name: 'ডা: অনুপ বিশ্বাস',
      phone: '01719410752',
      whatsapp: '01719410752',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'চিকিৎসক, চেম্বার: হক ফার্মেসী',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1500,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: 'https://i.postimg.cc/MZRNg54k/Dr-Anup-Kumar.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-036',
      name: 'ডা: রেজাউল করিম রুবেল',
      phone: '01729567575',
      whatsapp: '01729567575',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'চিকিৎসক, চেম্বার: রৌমারী জেনারেল হসপিটাল',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#D97706',
      profileImage: 'https://i.postimg.cc/kXmzC83t/Md-Rezaul-Karim-Rubel.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-037',
      name: 'ডা: ফজলুর রহমান শুভ',
      phone: '01737390812',
      whatsapp: '01737390812',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'চিকিৎসক, চেম্বার: আয়শা ডায়াগনস্টিক সেন্টার',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#2563EB',
      profileImage: 'https://i.postimg.cc/jSq1wbjD/Dr-Fazlur-rahman-Suvo.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-038',
      name: 'মো: আব্দুর রশিদ',
      phone: '01931878636',
      whatsapp: '01931878636',
      email: '',
      district: 'চর ফুলবাড়ী, রৌমারী, কুড়িগ্রাম',
      occupation: 'ব্যবসায়ী',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: null,
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-039',
      name: 'মো: খালিদ রাতুল',
      phone: '01717156004',
      whatsapp: '01717156004',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'ব্যবসায়ী',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#7C3AED',
      profileImage: 'https://i.postimg.cc/jjm3Fn4D/Khalid-Ratul.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-040',
      name: 'মো: আবুল হাশেম',
      phone: '01728118647',
      whatsapp: '01728118647',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'উপসহকারী কৃষি কর্মকর্তা',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: null,
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-041',
      name: 'মো: আতিকুর রহমান আশিক',
      phone: '',
      whatsapp: '',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'সদস্য',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#2563EB',
      profileImage: null,
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-042',
      name: 'মো: মওদুদ আহমেদ রিশাদ',
      phone: '',
      whatsapp: '',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'রেমিটেন্স যোদ্ধা',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#D97706',
      profileImage: 'https://i.postimg.cc/wMVVg1LN/Mowdud-ahmed-Rishad.jpg',
      isAnonymous: false,
      isProbashi: true
    },
    {
      id: 'HRF-043',
      name: 'মো: আলমগীর হোসেন',
      phone: '01920816120',
      whatsapp: '01920816120',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'ভাইস চেয়ারম্যান, আয়শা ডায়াগনস্টিক সেন্টার',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#059669',
      profileImage: 'https://i.postimg.cc/YCJ1c6Z5/Md-Alomgir-Hossen.jpg',
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-044',
      name: 'মো: মান্না মেহেদী মিরন',
      phone: '01934327029',
      whatsapp: '01934327029',
      email: '',
      district: 'রৌমারী, কুড়িগ্রাম',
      occupation: 'ব্যবসায়ী',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#2563EB',
      profileImage: null,
      isAnonymous: false,
      isProbashi: false
    },
    {
      id: 'HRF-045',
      name: 'মো: আলতাফ হোসেন',
      phone: '',
      whatsapp: '',
      email: '',
      district: 'ঠিকানা প্রকাশে অনিচ্ছুক',
      occupation: 'সম্মানিত দাতা',
      type: '3-Month',
      typeLabelBn: '৩/৬/১২ মাসের দাতা (ত্রিমাসিক)',
      frequency: 'Every 3 Months',
      amount: 1200,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#7C3AED',
      profileImage: null,
      isAnonymous: true,
      isProbashi: false
    },
    {
      id: 'HRF-046',
      name: 'মো: আমিনুল ইসলাম',
      phone: '',
      whatsapp: '',
      email: '',
      district: 'মধ্য ইছাকুড়ি, রৌমারী, কুড়িগ্রাম',
      occupation: 'রেমিটেন্স যোদ্ধা-জাপান',
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য (প্রবাসী)',
      frequency: 'Monthly',
      amount: 1000,
      joiningDate: '২০২৬-০৯-০১',
      status: 'Verified',
      avatarBg: '#DC2626',
      profileImage: 'img/md-aminul-islam.jpg',
      isAnonymous: false,
      isProbashi: true
    }
  ],

  advisors: [
    { id: 1, nameBn: 'প্রফেসর ড. আনিসুর রহমান', nameEn: 'Prof. Dr. Anisur Rahman', roleBn: 'প্রধান উপদেষ্টা', roleEn: 'Chief Advisor' },
    { id: 2, nameBn: 'বিচারপতি মো: শামীম হোসেন', nameEn: 'Justice Md. Shamim Hossain', roleBn: 'আইন বিষয়ক উপদেষ্টা', roleEn: 'Legal Advisor' },
    { id: 3, nameBn: 'ড. ফারজানা ইয়াসমিন', nameEn: 'Dr. Farzana Yasmin', roleBn: 'স্বাস্থ্য উপদেষ্টা', roleEn: 'Health Advisor' },
    { id: 4, nameBn: 'হাজী গোলাম মোস্তফা', nameEn: 'Haji Golam Mostafa', roleBn: 'সমাজসেবা উপদেষ্টা', roleEn: 'Social Welfare Advisor' },
    { id: 5, nameBn: 'প্রকৌশলী সাজ্জাদ হোসেন', nameEn: 'Engr. Sajjad Hossain', roleBn: 'প্রকল্প উপদেষ্টা', roleEn: 'Project Advisor' },
    { id: 6, nameBn: 'মো: আশরাফ উদ্দিন', nameEn: 'Md. Ashraf Uddin', roleBn: 'অর্থ উপদেষ্টা', roleEn: 'Finance Advisor' },
    { id: 7, nameBn: 'বেগম রাজিয়া সুলতানা', nameEn: 'Begum Razia Sultana', roleBn: 'নারী ও শিশু বিষয়ক উপদেষ্টা', roleEn: 'Women & Child Advisor' },
    { id: 8, nameBn: 'অধ্যক্ষ মো: জাহেদুল ইসলাম', nameEn: 'Principal Md. Zahedul Islam', roleBn: 'শিক্ষা উপদেষ্টা', roleEn: 'Education Advisor' },
    { id: 9, nameBn: 'ড. মাহমুদুর রহমান', nameEn: 'Dr. Mahmudur Rahman', roleBn: 'গবেষণা উপদেষ্টা', roleEn: 'Research Advisor' },
    { id: 10, nameBn: 'এডভোকেট শাহজাহান কবির', nameEn: 'Advocate Shahjahan Kabir', roleBn: 'নীতি উপদেষ্টা', roleEn: 'Policy Advisor' }
  ],

  executiveCommittee: [
    { pos: '১', titleBn: 'সভাপতি (President)', titleEn: 'President', nameBn: 'মো: ইকবাল হোসেন', nameEn: 'Md. Iqbal Hossain' },
    { pos: '২', titleBn: 'সহ-সভাপতি (Vice President)', titleEn: 'Vice President', nameBn: 'সৈয়দা খালেদা সিদ্দিকা', nameEn: 'Syeda Khaleda Siddiqua' },
    { pos: '৩', titleBn: 'সাধারণ সম্পাদক (General Secretary)', titleEn: 'General Secretary', nameBn: 'তারিকুল ইসলাম', nameEn: 'Tariqul Islam' },
    { pos: '৪', titleBn: 'যুগ্ম সাধারণ সম্পাদক', titleEn: 'Joint General Secretary', nameBn: 'কামরুল হাসান', nameEn: 'Kamrul Hasan' },
    { pos: '৫', titleBn: 'সাংগঠনিক সম্পাদক', titleEn: 'Organizing Secretary', nameBn: 'মাহমুদ আলম', nameEn: 'Mahmud Alam' },
    { pos: '৬', titleBn: 'অর্থ সম্পাদক (Treasurer)', titleEn: 'Treasurer', nameBn: 'মো: জহিরুল হক', nameEn: 'Md. Zohirul Haq' },
    { pos: '৭', titleBn: 'দপ্তর সম্পাদক', titleEn: 'Office Secretary', nameBn: 'আরিফুল ইসলাম', nameEn: 'Ariful Islam' },
    { pos: '৮', titleBn: 'শিক্ষা সম্পাদক', titleEn: 'Education Secretary', nameBn: 'শামীমা পারভীন', nameEn: 'Shamima Parveen' },
    { pos: '৯', titleBn: 'স্বাস্থ্য সম্পাদক', titleEn: 'Health Secretary', nameBn: 'ড. তানজিল রহমান', nameEn: 'Dr. Tanzil Rahman' },
    { pos: '১০', titleBn: 'সমাজকল্যাণ সম্পাদক', titleEn: 'Social Welfare Secretary', nameBn: 'আব্দুল্লাহ আল মামুন', nameEn: 'Abdullah Al Mamun' },
    { pos: '১১', titleBn: 'প্রচার ও প্রকাশনা সম্পাদক', titleEn: 'Publicity Secretary', nameBn: 'নাসিম আহমেদ', nameEn: 'Nasim Ahmed' },
    { pos: '১২', titleBn: 'আইটি ও প্রযুক্তি সম্পাদক', titleEn: 'IT Secretary', nameBn: 'আসিফ মাহতাব', nameEn: 'Asif Mahtab' },
    { pos: '১৩', titleBn: 'প্রবীণ সেবা সম্পাদক', titleEn: 'Elderly Care Secretary', nameBn: 'রবেয়া বেগম', nameEn: 'Robeya Begum' },
    { pos: '১৪', titleBn: 'আইন প্রতিনিধি', titleEn: 'Legal Representative', nameBn: 'এডভোকেট আনোয়ার হোসেন', nameEn: 'Adv. Anwar Hossain' }
  ],

  auditLogs: [],

  beneficiariesCount: 0,
  volunteersCount: 0,
  mealSponsors: {},
  settings: { heroImage: 'img/hero-cover.jpg' },
  news: [],
  bloodDonors: [],
  quickPledges: []
};

class HeroImageStore {
  constructor() {
    this.dbName = 'EkMuthoHeroDB';
    this.storeName = 'heroImages';
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getImages() {
    try {
      const db = await this.initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.get('hero');
        request.onsuccess = () => {
          if (request.result && request.result.images) {
            resolve(request.result.images);
          } else {
            resolve(null);
          }
        };
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error("IndexedDB error on getImages:", e);
      return null;
    }
  }

  async setImages(imagesArray) {
    try {
      const db = await this.initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.put({ id: 'hero', images: imagesArray });
        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
      });
    } catch(e) {
      console.error("IndexedDB error on setImages:", e);
      return false;
    }
  }
}

// Database Storage Controller
class Database {
  constructor() {
    this.heroStore = new HeroImageStore();
    this.data = this.loadData();
  }

  loadData() {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('emkf_database_') && key !== DB_KEY) {
          localStorage.removeItem(key);
        }
      }
    } catch(e) { console.warn('Could not clear old DB keys:', e); }

    const json = localStorage.getItem(DB_KEY);
    let parsed;
    if (!json) {
      parsed = JSON.parse(JSON.stringify(defaultDatabase));
    } else {
      try {
        parsed = JSON.parse(json);
      } catch(e) {
        console.error('Failed to parse database, resetting', e);
        parsed = JSON.parse(JSON.stringify(defaultDatabase));
      }
    }
    if (!parsed.userCredentials) {
      parsed.userCredentials = {};
    }
    if (!parsed.mealSponsors) {
      parsed.mealSponsors = {};
    }
    if (!parsed.settings) {
      parsed.settings = { heroImage: 'img/hero-cover.jpg' };
    }
    if (!parsed.advisors) {
      parsed.advisors = JSON.parse(JSON.stringify(defaultDatabase.advisors || []));
    }
    if (!parsed.executiveCommittee) {
      parsed.executiveCommittee = JSON.parse(JSON.stringify(defaultDatabase.executiveCommittee || []));
    }
    if (!parsed.funds || !parsed.funds.some(f => f.id === 'housing')) {
      parsed.funds = JSON.parse(JSON.stringify(defaultDatabase.funds));
    }
    if (!parsed.members || !Array.isArray(parsed.members) || parsed.members.length === 0) {
      parsed.members = JSON.parse(JSON.stringify(defaultDatabase.members));
    } else {
      defaultDatabase.members.forEach(dm => {
        if (!parsed.members.some(m => m.id === dm.id || m.name === dm.name)) {
          parsed.members.push(JSON.parse(JSON.stringify(dm)));
        }
      });
    }
    if (!parsed.customSubmenus) {
      parsed.customSubmenus = {};
    }
    localStorage.setItem(DB_KEY, JSON.stringify(parsed));
    return parsed;
  }

  clearAllMembers() {
    this.data.members = [];
    this.save();
    return true;
  }

  getSubmenuContent(key) {
    if (!this.data.customSubmenus) this.data.customSubmenus = {};
    return this.data.customSubmenus[key] || null;
  }

  saveSubmenuContent(key, title, content, icon = '') {
    if (!this.data.customSubmenus) this.data.customSubmenus = {};
    this.data.customSubmenus[key] = {
      title,
      content,
      icon,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return true;
  }

  deleteSubmenuContent(key) {
    if (this.data.customSubmenus && this.data.customSubmenus[key]) {
      delete this.data.customSubmenus[key];
      this.save();
    }
    return true;
  }

  save() {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(this.data));
    } catch(e) {
      console.warn('localStorage save warning (possibly quota exceeded):', e);
    }
    document.dispatchEvent(new CustomEvent('dbUpdated'));
  }

  // Normalize phone numbers for matching
  cleanPhone(phone) {
    if (!phone) return '';
    return String(phone).replace(/\D/g, '').replace(/^880/, '0');
  }

  // Meal Sponsor methods
  getMealSponsor(dateStr) {
    if (!this.data.mealSponsors) this.data.mealSponsors = {};
    return this.data.mealSponsors[dateStr] || null;
  }

  setMealSponsor(dateStr, sponsorName) {
    if (!this.data.mealSponsors) this.data.mealSponsors = {};
    this.data.mealSponsors[dateStr] = sponsorName;
    this.save();
    return true;
  }

  // Hero Image methods
  async getHeroImage() {
    const imgs = await this.getHeroImages();
    return imgs[0] || 'img/hero-cover.jpg';
  }

  async getHeroImages() {
    let imgs = await this.heroStore.getImages();
    if (!imgs) {
      if (!this.data.settings) this.data.settings = { heroImage: ['img/hero-cover.jpg'] };
      imgs = this.data.settings.heroImage;
    }
    if (Array.isArray(imgs) && imgs.length > 0) return imgs;
    return ['img/hero-cover.jpg'];
  }

  async setHeroImages(base64Array) {
    await this.heroStore.setImages(base64Array);
    if (this.data.settings && this.data.settings.heroImage) {
      delete this.data.settings.heroImage;
    }
    this.save();
    return true;
  }

  async setHeroImage(base64Str) {
    return this.setHeroImages([base64Str]);
  }

  getMedia(key, defaultVal) {
    if (!this.data.settings) this.data.settings = {};
    if (!this.data.settings.media) this.data.settings.media = {};
    return this.data.settings.media[key] || defaultVal;
  }

  setMedia(key, base64Str) {
    if (!this.data.settings) this.data.settings = {};
    if (!this.data.settings.media) this.data.settings.media = {};
    this.data.settings.media[key] = base64Str;
    this.save();
    if (key === 'heroImage') {
      this.setHeroImage(base64Str);
    }
    return true;
  }

  // Check if phone number is pre-registered in members or donations database
  findPreRegisteredUser(phone) {
    const clean = this.cleanPhone(phone);
    if (!clean) return null;

    // Check members database first
    const member = this.data.members.find(m => this.cleanPhone(m.phone) === clean);
    if (member) {
      return {
        name: member.name,
        phone: member.phone,
        cleanPhone: clean,
        type: 'member',
        memberId: member.id,
        status: member.status
      };
    }

    // Check donations database
    const donation = this.data.donations.find(d => this.cleanPhone(d.donorPhone) === clean);
    if (donation) {
      return {
        name: donation.isAnonymous ? 'সম্মানিত দাতা' : donation.donorName,
        phone: donation.donorPhone,
        cleanPhone: clean,
        type: 'donor',
        donorId: donation.donorId
      };
    }

    return null;
  }

  // User credentials management
  getUserCredential(phone) {
    const clean = this.cleanPhone(phone);
    if (!this.data.userCredentials) this.data.userCredentials = {};
    return this.data.userCredentials[clean] || null;
  }

  setUserPassword(phone, password) {
    const clean = this.cleanPhone(phone);
    if (!this.data.userCredentials) this.data.userCredentials = {};
    this.data.userCredentials[clean] = {
      password: password,
      createdAt: new Date().toISOString()
    };
    this.save();
    return true;
  }

  verifyUserPassword(phone, password) {
    const cred = this.getUserCredential(phone);
    if (!cred) return false;
    return cred.password === password;
  }

  // Real-time Balance Engine Calculation
  getAccountingSummary() {
    const verifiedDonations = this.data.donations.filter(d => d.status === 'Verified');
    const totalIncome = verifiedDonations.reduce((sum, d) => sum + Number(d.amount), 0);
    
    const verifiedExpenses = this.data.expenses.filter(e => e.verified !== false);
    const totalExpense = verifiedExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
    
    const availableBalance = this.data.openingBalance + totalIncome - totalExpense;

    // Today's Date Calculation (YYYY-MM-DD match)
    const todayStr = new Date().toISOString().split('T')[0];
    
    const todayDonationsList = verifiedDonations.filter(d => d.date.startsWith(todayStr));
    const todayIncome = todayDonationsList.reduce((sum, d) => sum + Number(d.amount), 0);
    
    const todayExpensesList = verifiedExpenses.filter(e => e.date.startsWith(todayStr));
    const todayExpense = todayExpensesList.reduce((sum, e) => sum + Number(e.amount), 0);

    // Fund breakdown calculation
    const fundSummaries = this.data.funds.map(f => {
      const fundIncome = verifiedDonations.filter(d => d.fund === f.id).reduce((sum, d) => sum + Number(d.amount), 0);
      const fundExpense = verifiedExpenses.filter(e => e.fund === f.id).reduce((sum, e) => sum + Number(e.amount), 0);
      const balance = f.opening + fundIncome - fundExpense;
      return {
        ...f,
        income: fundIncome,
        expense: fundExpense,
        balance: balance
      };
    });

    const donorUniqueSet = new Set();
    (this.data.members || []).forEach(m => {
      if (m.id || m.phone || m.name) donorUniqueSet.add(m.id || m.phone || m.name);
    });
    (this.data.donations || []).forEach(d => {
      if (d.donorPhone || d.donorName || d.id) donorUniqueSet.add(d.donorPhone || d.donorName || d.id);
    });
    const totalDonorsCount = Math.max(donorUniqueSet.size, (this.data.members ? this.data.members.length : 0));

    return {
      openingBalance: this.data.openingBalance,
      totalIncome,
      totalExpense,
      availableBalance,
      todayIncome,
      todayExpense,
      fundSummaries,
      totalDonorsCount,
      volunteersCount: Number(this.data.volunteersCount || 0),
      beneficiariesCount: Number(this.data.beneficiariesCount || 0)
    };
  }

  // Add Donation Entry
  addDonation(donationData) {
    const count = this.data.donations.length + 101;
    const year = new Date().getFullYear();
    const formattedId = `EMKF-DON-${year}-${String(count).padStart(6, '0')}`;
    
    const newDonation = {
      id: formattedId,
      donorId: `DON-${String(count).padStart(3, '0')}`,
      donorName: donationData.donorName || 'Anonymous Donor',
      donorPhone: donationData.donorPhone || '',
      donorEmail: donationData.donorEmail || '',
      memberCategory: donationData.memberCategory || 'সাধারণ দাতা (General Donor)',
      fund: donationData.fund || 'general',
      amount: Number(donationData.amount),
      paymentMethod: donationData.paymentMethod || 'bKash',
      txnRef: donationData.txnRef || `TXN-${Math.floor(Math.random()*900000 + 100000)}`,
      status: 'Verified',
      isAnonymous: Boolean(donationData.isAnonymous),
      isInstitutional: Boolean(donationData.isInstitutional),
      notes: donationData.notes || '',
      privacy: donationData.privacy || { showName: !donationData.isAnonymous },
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    this.data.donations.unshift(newDonation);
    this.save();
    return newDonation;
  }

  // Delete Donation Record with Immutable Audit Trail
  deleteDonation(donationId, adminUser, reason) {
    const idx = this.data.donations.findIndex(d => d.id === donationId);
    if (idx === -1) return false;

    const removed = this.data.donations[idx];
    this.data.donations.splice(idx, 1);

    const auditEntry = {
      id: `AUD-${String(this.data.auditLogs.length + 1).padStart(4, '0')}`,
      recordId: donationId,
      type: 'Donation Deleted',
      oldValue: `৳${removed.amount} (${removed.donorName})`,
      newValue: 'DELETED (রেকর্ড অপসারিত)',
      changedBy: adminUser,
      reason: reason || 'ভুল বা ডুপ্লিকেট রেকর্ড অপসারণ',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    this.data.auditLogs.unshift(auditEntry);
    this.save();
    return true;
  }

  // Add Expense Entry
  addExpense(expenseData, adminUser = 'Finance Admin') {
    const count = this.data.expenses.length + 52;
    const year = new Date().getFullYear();
    const formattedId = `EMKF-EXP-${year}-${String(count).padStart(6, '0')}`;

    const newExpense = {
      id: formattedId,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      category: expenseData.category,
      fund: expenseData.fund,
      description: expenseData.description,
      amount: Number(expenseData.amount),
      paymentMethod: expenseData.paymentMethod || 'Cash',
      paidBy: expenseData.paidBy || adminUser,
      receiver: expenseData.receiver || 'Supplier',
      receiptNo: expenseData.receiptNo || `VOUCHER-${Math.floor(Math.random()*9000 + 1000)}`,
      verified: true,
      cashMemo: expenseData.cashMemo || null
    };

    this.data.expenses.unshift(newExpense);
    this.save();
    return newExpense;
  }

  // Log Correction in Financial Records with Audit Log
  correctDonation(donationId, newAmount, adminUser, reason) {
    const donation = this.data.donations.find(d => d.id === donationId);
    if (!donation) return false;

    const oldAmountFormatted = `৳${donation.amount.toLocaleString()}`;
    const newAmountFormatted = `৳${Number(newAmount).toLocaleString()}`;
    
    donation.amount = Number(newAmount);

    const auditEntry = {
      id: `AUD-${String(this.data.auditLogs.length + 1).padStart(4, '0')}`,
      recordId: donationId,
      type: 'Donation Correction',
      oldValue: oldAmountFormatted,
      newValue: newAmountFormatted,
      changedBy: adminUser,
      reason: reason || 'Admin Correction',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    this.data.auditLogs.unshift(auditEntry);
    this.save();
    return true;
  }

  // Member CRUD & Approval Engine
  approveMember(memberId, status) {
    const mem = this.data.members.find(m => m.id === memberId);
    if (mem) {
      mem.status = status;
      this.save();
      return true;
    }
    return false;
  }

  deleteMember(memberId) {
    const idx = this.data.members.findIndex(m => m.id === memberId);
    if (idx !== -1) {
      this.data.members.splice(idx, 1);
      this.save();
      return true;
    }
    return false;
  }

  // Committee & Advisor Management CRUD
  updateCommitteeMember(posIndex, dataObj) {
    if (this.data.executiveCommittee && this.data.executiveCommittee[posIndex]) {
      const item = this.data.executiveCommittee[posIndex];
      item.titleBn = dataObj.titleBn || dataObj.title || item.titleBn;
      item.titleEn = dataObj.titleEn || item.titleEn || item.titleBn;
      item.nameBn = dataObj.nameBn || dataObj.name || item.nameBn;
      item.nameEn = dataObj.nameEn || item.nameEn || item.nameBn;
      if (dataObj.image !== undefined) item.image = dataObj.image;
      if (dataObj.phone !== undefined) item.phone = dataObj.phone;
      if (dataObj.whatsapp !== undefined) item.whatsapp = dataObj.whatsapp;
      if (dataObj.district !== undefined) item.district = dataObj.district;
      this.save();
      return true;
    }
    return false;
  }

  addCommitteeMember(dataObj) {
    if (!this.data.executiveCommittee) this.data.executiveCommittee = [];
    const newPos = String(this.data.executiveCommittee.length + 1);
    this.data.executiveCommittee.push({
      pos: newPos,
      titleBn: dataObj.titleBn || dataObj.title || '',
      titleEn: dataObj.titleEn || dataObj.titleBn || dataObj.title || '',
      nameBn: dataObj.nameBn || dataObj.name || '',
      nameEn: dataObj.nameEn || dataObj.nameBn || dataObj.name || '',
      image: dataObj.image || null,
      phone: dataObj.phone || '',
      whatsapp: dataObj.whatsapp || '',
      district: dataObj.district || dataObj.address || ''
    });
    this.save();
  }

  deleteCommitteeMember(posIndex) {
    if (this.data.executiveCommittee && this.data.executiveCommittee[posIndex]) {
      this.data.executiveCommittee.splice(posIndex, 1);
      this.save();
      return true;
    }
    return false;
  }

  updateAdvisor(advisorId, dataObj) {
    if (!this.data.advisors) this.data.advisors = [];
    const adv = this.data.advisors.find(a => Number(a.id) === Number(advisorId));
    if (adv) {
      adv.nameBn = dataObj.nameBn || dataObj.name || adv.nameBn;
      adv.nameEn = dataObj.nameEn || adv.nameEn || adv.nameBn;
      adv.roleBn = dataObj.roleBn || dataObj.role || adv.roleBn;
      adv.roleEn = dataObj.roleEn || adv.roleEn || adv.roleBn;
      if (dataObj.image !== undefined) adv.image = dataObj.image;
      if (dataObj.phone !== undefined) adv.phone = dataObj.phone;
      if (dataObj.district !== undefined) adv.district = dataObj.district;
      this.save();
      return true;
    }
    return false;
  }

  addAdvisor(dataObj) {
    if (!this.data.advisors) this.data.advisors = [];
    const newId = this.data.advisors.length > 0 ? Math.max(...this.data.advisors.map(a => Number(a.id) || 0)) + 1 : 1;
    this.data.advisors.push({
      id: newId,
      nameBn: dataObj.nameBn || dataObj.name || '',
      nameEn: dataObj.nameEn || dataObj.nameBn || dataObj.name || '',
      roleBn: dataObj.roleBn || dataObj.role || '',
      roleEn: dataObj.roleEn || dataObj.roleBn || dataObj.role || '',
      image: dataObj.image || null,
      phone: dataObj.phone || '',
      district: dataObj.district || dataObj.address || ''
    });
    this.save();
  }

  deleteAdvisor(advisorId) {
    if (!this.data.advisors) return false;
    const idx = this.data.advisors.findIndex(a => Number(a.id) === Number(advisorId));
    if (idx !== -1) {
      this.data.advisors.splice(idx, 1);
      this.save();
      return true;
    }
    return false;
  }

  // Notice Management CRUD
  addNotice(title, category, content) {
    const newNotice = {
      id: `NOT-${new Date().getFullYear()}-${String(this.data.notices.length + 1).padStart(3, '0')}`,
      title: title,
      category: category || 'সাধারণ নোটিশ',
      date: new Date().toISOString().split('T')[0],
      content: content,
      status: 'Published'
    };
    this.data.notices.unshift(newNotice);
    this.save();
    return newNotice;
  }

  deleteNotice(noticeId) {
    const idx = this.data.notices.findIndex(n => n.id === noticeId);
    if (idx !== -1) {
      this.data.notices.splice(idx, 1);
      this.save();
      return true;
    }
    return false;
  }

  // Get members filtered by type
  getMembers(filterType = 'all') {
    if (filterType === 'all' || !filterType) {
      return this.data.members;
    }
    return this.data.members.filter(m => m.type.toLowerCase() === filterType.toLowerCase());
  }

  // Quick Pledges
  addQuickPledge(pledgeData) {
    if (!this.data.quickPledges) {
      this.data.quickPledges = [];
    }
    this.data.quickPledges.push(pledgeData);
    this.logAudit('add_pledge', 'System', `New quick pledge added: ${pledgeData.name} - ${pledgeData.amount}`);
    this.save();
    return true;
  }

  getQuickPledges() {
    return this.data.quickPledges || [];
  }

  // Register new member
  addMember(memberData) {
    const newMember = {
      id: `HRF-${String(this.data.members.length + 1).padStart(3, '0')}`,
      name: memberData.name,
      phone: memberData.phone,
      whatsapp: memberData.whatsapp || '',
      email: memberData.email || '',
      district: memberData.district || '',
      occupation: memberData.occupation || 'স্বত্বাধিকারী / চাকুরীজীবী',
      type: memberData.type,
      typeLabelBn: memberData.typeLabelBn || memberData.type,
      frequency: 'Monthly',
      amount: parseInt(memberData.amount) || 0,
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      avatarBg: '#059669',
      profileImage: memberData.profileImage || null,
      isAnonymous: Boolean(memberData.isAnonymous),
      isProbashi: Boolean(memberData.isProbashi)
    };

    this.data.members.push(newMember);
    this.save();
    return newMember;
  }

  // Get dynamic donation stats for a member
  getMemberDonationStats(phone) {
    const clean = this.cleanPhone(phone);
    if (!clean) return { count: 0, totalAmount: 0 };
    
    let count = 0;
    let totalAmount = 0;
    
    this.data.donations.forEach(d => {
      if (this.cleanPhone(d.donorPhone) === clean && d.status === 'Verified') {
        count++;
        totalAmount += parseInt(d.amount);
      }
    });

    return { count, totalAmount };
  }

  // Paginated and Searched Donors for Scalability (Supports 5,000+ mock records)
  getDonorsPaginated(page = 1, limit = 10, search = '', fundFilter = '') {
    let list = [...this.data.donations];
    
    if (search) {
      const query = search.toLowerCase();
      list = list.filter(d => 
        d.id.toLowerCase().includes(query) ||
        d.donorName.toLowerCase().includes(query) ||
        d.donorPhone.includes(query) ||
        d.txnRef.toLowerCase().includes(query)
      );
    }
    
    if (fundFilter) {
      list = list.filter(d => d.fund === fundFilter);
    }

    const total = list.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const items = list.slice(startIndex, startIndex + limit);

    return {
      items,
      total,
      page,
      totalPages
    };
  }

  // --- News Portal System ---
  getNews() {
    if (!this.data.news) {
      this.data.news = [];
      this.save();
    }
    // Return sorted by date descending (newest first)
    return this.data.news.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  addNews(newsData) {
    if (!this.data.news) this.data.news = [];
    const newNews = {
      id: 'NEWS-' + Date.now(),
      title: newsData.title,
      content: newsData.content,
      image: newsData.image || null,
      date: new Date().toISOString(),
      author: newsData.author || 'Admin'
    };
    this.data.news.unshift(newNews);
    
    this.logAudit('CREATE', 'News', newNews.id, `News published: ${newNews.title}`);
    this.save();
    return newNews;
  }

  deleteNews(newsId) {
    if (!this.data.news) return false;
    const index = this.data.news.findIndex(n => n.id === newsId);
    if (index > -1) {
      const deleted = this.data.news.splice(index, 1)[0];
      this.logAudit('DELETE', 'News', newsId, `News deleted: ${deleted.title}`);
      this.save();
      return true;
    }
    return false;
  }

  // --- Blood Donation System ---
  getBloodDonors() {
    if (!this.data.bloodDonors) {
      this.data.bloodDonors = [];
      this.save();
    }
    return this.data.bloodDonors;
  }

  addBloodDonor(donorData) {
    if (!this.data.bloodDonors) this.data.bloodDonors = [];
    const newDonor = {
      id: 'BLOOD-' + Date.now(),
      name: donorData.name,
      phone: donorData.phone,
      bloodGroup: donorData.bloodGroup,
      district: donorData.district,
      lastDonation: donorData.lastDonation || null,
      status: 'Available',
      dateAdded: new Date().toISOString()
    };
    this.data.bloodDonors.unshift(newDonor);
    this.save();
    return newDonor;
  }

  deleteBloodDonor(donorId) {
    if (!this.data.bloodDonors) return false;
    const index = this.data.bloodDonors.findIndex(d => d.id === donorId);
    if (index > -1) {
      this.data.bloodDonors.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }

}

const db = new Database();
