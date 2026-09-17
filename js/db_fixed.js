?/* ==========================================================================
   Ek Mutho Khabar Manobik Foundation - Local Database & Dynamic Balance Engine
   ========================================================================== */

const DB_KEY = 'emkf_database_v4';

// Initial Seed Data
const defaultDatabase = {
  openingBalance: 0,
  
  funds: [
    { id: 'food', nameBn: 'খাদ্য ফান্ড (Food Fund)', nameEn: 'Food Fund', opening: 0 },
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
      content: 'এক মুঠো খাবার মানবিক ফাউন্ডেশনের সকল সম্মানিত সদস্যদের জানানো যাচ্ছে যে আগামী ২৫ ডিসেম্বর ২০২৬ তারিখ কেন্দ্রীয় কার্যালয়ে বার্ষিক সাধারণ সভা অনুষ্ঠিত হবে।',
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

  // Live Clean Slate for Members Directory & Approvals
  members: [],

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
    localStorage.setItem(DB_KEY, JSON.stringify(parsed));
    return parsed;
  }

  save() {
    localStorage.setItem(DB_KEY, JSON.stringify(this.data));
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
      this.save();
    } else {
      document.dispatchEvent(new CustomEvent('dbUpdated'));
    }
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

    return {
      openingBalance: this.data.openingBalance,
      totalIncome,
      totalExpense,
      availableBalance,
      todayIncome,
      todayExpense,
      fundSummaries,
      totalDonorsCount: this.data.donations.length,
      volunteersCount: this.data.volunteersCount,
      beneficiariesCount: this.data.beneficiariesCount
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
  updateCommitteeMember(posIndex, nameBn, titleBn) {
    if (this.data.executiveCommittee[posIndex]) {
      this.data.executiveCommittee[posIndex].nameBn = nameBn;
      this.data.executiveCommittee[posIndex].titleBn = titleBn;
      this.save();
      return true;
    }
    return false;
  }

  addCommitteeMember(dataObj) {
    const newPos = String(this.data.executiveCommittee.length + 1);
    this.data.executiveCommittee.push({
      pos: newPos,
      titleBn: dataObj.title,
      titleEn: dataObj.title,
      nameBn: dataObj.name,
      nameEn: dataObj.name,
      image: dataObj.image || null,
      phone: dataObj.phone || '',
      whatsapp: dataObj.whatsapp || '',
      email: dataObj.email || '',
      address: dataObj.address || '',
      bio: dataObj.bio || ''
    });
    this.save();
  }

  deleteCommitteeMember(posIndex) {
    if (this.data.executiveCommittee[posIndex]) {
      this.data.executiveCommittee.splice(posIndex, 1);
      this.save();
      return true;
    }
    return false;
  }

  updateAdvisor(advisorId, nameBn, roleBn) {
    const adv = this.data.advisors.find(a => a.id === advisorId);
    if (adv) {
      adv.nameBn = nameBn;
      adv.roleBn = roleBn;
      this.save();
      return true;
    }
    return false;
  }

  addAdvisor(advisorData) {
    const newId = this.data.advisors.length + 1;
    this.data.advisors.push({
      id: newId,
      nameBn: advisorData.name,
      nameEn: advisorData.name,
      roleBn: advisorData.role,
      roleEn: advisorData.role,
      image: advisorData.image || null,
      phone: advisorData.phone || '',
      email: advisorData.email || '',
      address: advisorData.address || '',
      bio: advisorData.bio || ''
    });
    this.save();
  }

  deleteAdvisor(advisorId) {
    const idx = this.data.advisors.findIndex(a => a.id === advisorId);
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
      id: `MEM-${String(this.data.members.length + 1).padStart(3, '0')}`,
      name: memberData.name,
      phone: memberData.phone,
      whatsapp: memberData.whatsapp || '',
      email: memberData.email || '',
      district: memberData.district || '',
      occupation: '',
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
