/* ==========================================================================
   Ek Mutho Khabar Manobik Foundation - Core Application Router & Lifecycle
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initAppRouter();
  transparency.renderTransparencyDashboard();
  updateLiveHeaderStats();
  renderMealSponsorsBanner();
  applyDynamicImages();
  if (window.renderFullConstitution) {
    renderFullConstitution();
  }

  // Handle URL Hash Anchors (e.g. #chap-10) for direct chapter links
  if (window.location.hash) {
    const hash = window.location.hash;
    if (hash.startsWith('#chap-') || hash.includes('about') || hash.includes('constitution') || hash.includes('mission')) {
      showView('view-about');
      setTimeout(() => {
        const targetEl = document.querySelector(hash);
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);
    }
  }

  // Database update re-renders
  document.addEventListener('dbUpdated', () => {
    transparency.renderTransparencyDashboard();
    updateLiveHeaderStats();
    renderMealSponsorsBanner();
    applyDynamicImages();
  });

  // Auth status re-renders
  document.addEventListener('authChanged', (e) => {
    if (e.detail.type === 'donor') {
      donorPortal.renderDonorDashboard();
    } else if (e.detail.type === 'admin') {
      adminPanel.renderAdminDashboard();
    }
  });

  // Language changed listener
  document.addEventListener('languageChanged', (e) => {
    translateStaticElements();
    transparency.renderTransparencyDashboard();
  });
});

// Toast notification helper
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Apply dynamic images from db
async function applyDynamicImages() {
  const logo = document.getElementById('dynamic-site-logo');
  const logoSrc = db.getMedia('siteLogo');
  if (logo && logoSrc) {
    logo.src = logoSrc;
  }
  
  const hero = document.getElementById('dynamic-hero-img');
  if (hero) {
    const mediaHero = db.getMedia('heroImage');
    if (mediaHero) {
      hero.src = mediaHero;
    } else {
      const heroSrc = await db.getHeroImage();
      if (heroSrc && heroSrc !== '[object Promise]') {
        hero.src = heroSrc;
      }
    }
  }
  
  const foodMedia = db.getMedia('foodActivityImage');
  if (foodMedia) {
    document.querySelectorAll('.dynamic-food-img').forEach(img => img.src = foodMedia);
  }
  
  const eduMedia = db.getMedia('eduActivityImage');
  if (eduMedia) {
    document.querySelectorAll('.dynamic-edu-img').forEach(img => img.src = eduMedia);
  }
  
  const oldAgeMedia = db.getMedia('oldAgeHomeImage');
  if (oldAgeMedia) {
    document.querySelectorAll('.dynamic-oldage-img').forEach(img => img.src = oldAgeMedia);
  }
}

// Router & View Switcher
function showView(viewId, subFilter = null) {
  try {
    const views = document.querySelectorAll('.view-section');
    views.forEach(v => v.style.display = 'none');

    const targetView = document.getElementById(viewId);
    if (targetView) {
      targetView.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Highlight Nav
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.target === viewId);
    });

    // Close mobile drawer if open
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.remove('open');

    // Trigger special view renders
    if (viewId === 'view-donor-login') {
      donorPortal.renderDonorDashboard();
    } else if (viewId === 'view-admin') {
      adminPanel.renderAdminDashboard();
    } else if (viewId === 'view-transparency') {
      transparency.renderTransparencyDashboard();
    } else if (viewId === 'view-about') {
      if (window.renderFullConstitution) renderFullConstitution();
      renderCustomAboutSections();
    } else if (viewId === 'view-old-age') {
      renderCustomOldAgeSection();
    } else if (viewId === 'view-membership') {
      if (subFilter === 'directory') {
        showMembershipTab('directory');
      } else {
        showMembershipTab('form');
      }
    } else if (viewId === 'view-leadership') {
      renderPublicLeadership();
    } else if (viewId === 'view-notices') {
      renderPublicNotices();
    } else if (viewId === 'view-news') {
      renderPublicNews();
    } else if (viewId === 'view-blood') {
      searchBloodDonors();
    }
  } catch (err) {
    alert("System Error in showView: " + err.message + "\nPlease clear your browser cache or contact support.");
    console.error(err);
  }
}

// Render dynamic activity article with custom admin edits support
function showActivityArticle(categoryId) {
  const container = document.getElementById('dynamic-activity-container');
  if (!container) return;

  const custom = db.getSubmenuContent(categoryId);
  if (custom && custom.content) {
    container.innerHTML = custom.content;
  } else if (typeof activityArticles !== 'undefined' && activityArticles[categoryId]) {
    container.innerHTML = activityArticles[categoryId];
  } else {
    container.innerHTML = `
      <div style="padding:4rem 2rem; text-align:center; background:#fff; border-radius:var(--radius-lg);">
        <i class="fas fa-folder-open" style="font-size:3rem; color:var(--text-light); margin-bottom:1rem;"></i>
        <h3>এই ক্যাটাগরিতে কোনো নিবন্ধ পাওয়া যায়নি।</h3>
      </div>
    `;
  }
  showView('view-dynamic-activity');
}

function renderCustomAboutSections() {
  const customStory = db.getSubmenuContent('about_story');
  if (customStory && customStory.content) {
    const storyEl = document.getElementById('about-story-container');
    if (storyEl) storyEl.innerHTML = customStory.content;
  }
  const customMission = db.getSubmenuContent('about_mission');
  if (customMission && customMission.content) {
    const missionEl = document.getElementById('mission-vision-container');
    if (missionEl) missionEl.innerHTML = customMission.content;
  }
}

function renderCustomOldAgeSection() {
  const customOldAge = db.getSubmenuContent('old_age');
  if (customOldAge && customOldAge.content) {
    const el = document.getElementById('old-age-custom-content');
    if (el) el.innerHTML = customOldAge.content;
  }
}

// Render Public Leadership (Executive Committee & Advisory Board)
function renderPublicLeadership() {
  const advisorsGrid = document.getElementById('public-advisors-grid');
  const committeeGrid = document.getElementById('public-committee-grid');

  if (advisorsGrid) {
    const advisors = db.data.advisors || [];
    advisorsGrid.innerHTML = advisors.map(adv => `
      <div class="feature-card" style="text-align:center; cursor:pointer;" onclick="showLeadershipProfile('${adv.nameBn}', '${adv.roleBn}')">
        <div style="width:72px; height:72px; border-radius:50%; background:var(--primary-mid); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.8rem; margin:0 auto 1rem auto;"><i class="fas fa-user-tie"></i></div>
        <h4 style="font-size:1.15rem; color:var(--primary-deep);">${adv.nameBn}</h4>
        <span style="color:var(--accent-gold); font-size:0.85rem; font-weight:600;">${adv.roleBn}</span>
      </div>
    `).join('');
  }

  if (committeeGrid) {
    const committee = db.data.executiveCommittee || [];
    committeeGrid.innerHTML = committee.map((item, idx) => `
      <div class="feature-card" style="text-align:center; cursor:pointer; border-top: 3px solid var(--primary-accent);" onclick="showLeadershipProfile('${item.nameBn}', '${item.titleBn}')">
        <div style="width:64px; height:64px; border-radius:50%; background:rgba(15, 90, 62, 0.1); color:var(--primary-deep); display:flex; align-items:center; justify-content:center; font-size:1.4rem; margin:0 auto 1rem auto;">
          <i class="fas fa-user-shield"></i>
        </div>
        <h4 style="font-size:1.1rem; color:var(--primary-deep); margin-bottom:0.25rem;">${item.nameBn}</h4>
        <span class="badge badge-verified" style="display:inline-block; font-size:0.8rem; padding:0.35rem 0.65rem;">${item.titleBn}</span>
      </div>
    `).join('');
  }
}

function showLeadershipProfile(nameBn, titleBn) {
  const members = db.getMembers();
  // Try to find a registered member profile by matching the name
  const member = members.find(m => m.name.includes(nameBn) || nameBn.includes(m.name));
  
  let contentHtml = '';
  
  if (member) {
    const stats = db.getMemberDonationStats(member.phone);
    const avatarHtml = member.profileImage 
      ? `<img src="${member.profileImage}" style="width:100px; height:100px; border-radius:50%; object-fit:cover; border:3px solid ${member.avatarBg || 'var(--primary-mid)'};">`
      : `<div style="width:100px; height:100px; border-radius:50%; background:${member.avatarBg || 'var(--primary-mid)'}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:2.5rem; font-weight:700;">${member.name.charAt(0)}</div>`;

    contentHtml = `
      <div style="text-align:center; margin-bottom:1.5rem;">
        ${avatarHtml}
        <h3 style="font-size:1.4rem; color:var(--primary-deep); margin-top:1rem; margin-bottom:0.25rem;">${member.name}</h3>
        <span class="badge badge-verified" style="margin-bottom:0.5rem; display:inline-block;">${titleBn}</span><br>
        <span class="badge badge-pending" style="font-size:0.75rem;">${member.typeLabelBn || member.type}</span>
      </div>
      
      <div style="background:rgba(212, 175, 55, 0.1); border-left:4px solid var(--accent-gold); padding:1rem; margin-bottom:1.5rem; border-radius:0 var(--radius-md) var(--radius-md) 0;">
        <h4 style="font-size:1rem; color:var(--primary-deep); margin-bottom:0.5rem;"><i class="fas fa-briefcase"></i> ফাউন্ডেশনের দায়িত্বসমূহ</h4>
        <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.4;">
          <strong>${nameBn}</strong> বর্তমানে এক মুঠো খাবার ও পুনর্বাসন ফাউন্ডেশনের <strong>${titleBn}</strong> হিসেবে গুরুত্বপূর্ণ দায়িত্ব পালন করছেন।
        </p>
      </div>

      <div style="background:var(--bg-light); border-radius:var(--radius-md); padding:1rem; margin-bottom:1.5rem;">
        <p style="margin-bottom:0.5rem;"><strong>আইডি:</strong> ${member.id}</p>
        <p style="margin-bottom:0.5rem;"><strong>ঠিকানা ও জেলা:</strong> ${member.district || 'দেওয়া হয়নি'}</p>
        <p style="margin-bottom:0.5rem;"><strong>মোবাইল নম্বর:</strong> ${member.phone}</p>
        <p style="margin-bottom:0.5rem;"><strong>হোয়াটসঅ্যাপ:</strong> ${member.whatsapp || 'দেওয়া হয়নি'}</p>
        <p style="margin-bottom:0;"><strong>ইমেইল:</strong> ${member.email || 'দেওয়া হয়নি'}</p>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:1rem; text-align:center; margin-bottom:1.5rem;">
        <div style="background:#fff; border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-sm);">
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.5rem;">অঙ্গীকার</p>
          <strong style="font-size:1.1rem; color:var(--primary-accent);">৳ ${Number(member.amount).toLocaleString()}</strong>
        </div>
        <div style="background:#fff; border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-sm);">
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.5rem;">কত তম অনুদান</p>
          <strong style="font-size:1.1rem; color:var(--primary-deep);">${stats.count} বার</strong>
        </div>
        <div style="background:#fff; border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-sm);">
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.5rem;">সর্বমোট প্রদান</p>
          <strong style="font-size:1.1rem; color:var(--accent-gold);">৳ ${stats.totalAmount.toLocaleString()}</strong>
        </div>
      </div>
    `;
  } else {
    // Basic Profile for Unregistered Leaders
    contentHtml = `
      <div style="text-align:center; margin-bottom:1.5rem;">
        <div style="width:100px; height:100px; border-radius:50%; background:var(--primary-mid); color:#fff; display:flex; align-items:center; justify-content:center; font-size:2.5rem; font-weight:700; margin:0 auto;">
          <i class="fas fa-user-shield"></i>
        </div>
        <h3 style="font-size:1.4rem; color:var(--primary-deep); margin-top:1rem; margin-bottom:0.25rem;">${nameBn}</h3>
        <span class="badge badge-verified" style="margin-bottom:0.5rem; display:inline-block;">${titleBn}</span>
      </div>
      
      <div style="background:rgba(212, 175, 55, 0.1); border-left:4px solid var(--accent-gold); padding:1.25rem; margin-bottom:1.5rem; border-radius:0 var(--radius-md) var(--radius-md) 0;">
        <h4 style="font-size:1.05rem; color:var(--primary-deep); margin-bottom:0.5rem;"><i class="fas fa-briefcase"></i> ফাউন্ডেশনের দায়িত্বসমূহ</h4>
        <p style="font-size:0.95rem; color:var(--text-muted); line-height:1.5;">
          <strong>${nameBn}</strong> বর্তমানে এক মুঠো খাবার ও পুনর্বাসন ফাউন্ডেশনের <strong>${titleBn}</strong> হিসেবে অত্যন্ত নিষ্ঠার সাথে গুরুত্বপূর্ণ দায়িত্ব পালন করছেন।
        </p>
      </div>
      
      <p style="text-align:center; color:var(--text-muted); font-size:0.85rem; margin-bottom:1.5rem;">
        (এই সদস্যের প্রোফাইল ডাটাবেজে এখনো সম্পূর্ণভাবে নিবন্ধিত হয়নি।)
      </p>
    `;
  }

  const modalBody = document.getElementById('global-modal-body');
  modalBody.innerHTML = `
    ${contentHtml}
    <button class="btn btn-secondary" style="width:100%;" onclick="closeModal()">বন্ধ করুন</button>
  `;
  
  document.getElementById('global-modal').classList.add('active');
}

// Render Public Notice Board
function renderPublicNotices() {
  const container = document.getElementById('public-notices-container');
  if (!container) return;

  const notices = db.data.notices || [];

  if (!notices.length) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:3rem; background:#fff; border-radius:var(--radius-md); color:var(--text-muted);">
        <i class="fas fa-bullhorn" style="font-size:2.5rem; margin-bottom:1rem; color:var(--text-light);"></i>
        <p>বর্তমানে কোনো সাম্প্রতিক অফিশিয়াল নোটিশ নেই।</p>
      </div>
    `;
    return;
  }

  container.innerHTML = notices.map(n => `
    <div style="background:#fff; border-radius:var(--radius-lg); padding:1.75rem; box-shadow:var(--shadow-sm); border:1px solid var(--border-color); border-top:4px solid var(--primary-mid); display:flex; flex-direction:column; justify-space-between;">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <span class="badge badge-verified"><i class="fas fa-tag"></i> ${n.category}</span>
          <small style="color:var(--text-muted); font-weight:600;"><i class="far fa-calendar-alt"></i> ${n.date}</small>
        </div>
        <h3 style="font-size:1.2rem; font-weight:700; color:var(--primary-deep); margin-bottom:0.75rem; line-height:1.4;">${n.title}</h3>
        <p style="color:var(--text-color); font-size:0.92rem; line-height:1.7; white-space:pre-line;">${n.content}</p>
      </div>
      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px dashed var(--border-color); display:flex; align-items:center; gap:0.5rem; font-size:0.8rem; color:var(--primary-deep); font-weight:600;">
        <i class="fas fa-shield-alt"></i> এক মুঠো খাবার ও পুনর্বাসন ফাউন্ডেশন অফিশিয়াল ঘোষণা
      </div>
    </div>
    </div>
  `).join('');
}

// Render Public News Portal
function renderPublicNews() {
  const container = document.getElementById('public-news-container');
  if (!container) return;

  const newsList = db.getNews();

  if (newsList.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem; background:var(--bg-light); border-radius:var(--radius-lg);">
      <i class="fas fa-newspaper" style="font-size:3rem; color:var(--text-muted); opacity:0.5; margin-bottom:1rem;"></i>
      <h3 style="color:var(--primary-deep);">এখনো কোনো আপডেট নেই</h3>
      <p style="color:var(--text-muted);">খুব শীঘ্রই আমাদের কার্যক্রমের খবর এখানে প্রকাশিত হবে।</p>
    </div>`;
    return;
  }

  container.innerHTML = newsList.map(n => `
    <div class="feature-card" style="display:flex; flex-direction:column; height:100%;">
      ${n.image ? `<img src="${n.image}" style="width:100%; height:200px; object-fit:cover; border-radius:var(--radius-md) var(--radius-md) 0 0; margin:-1.5rem -1.5rem 1rem -1.5rem;" alt="News Image">` : ''}
      <div style="flex-grow:1;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <span class="badge badge-verified" style="font-size:0.75rem;"><i class="far fa-calendar-alt"></i> ${new Date(n.date).toLocaleDateString('en-GB')}</span>
          <span style="font-size:0.75rem; color:var(--text-muted);"><i class="fas fa-user-edit"></i> ${n.author}</span>
        </div>
        <h3 style="font-size:1.25rem; color:var(--primary-deep); margin-bottom:1rem; line-height:1.4;">${n.title}</h3>
        <p style="font-size:0.95rem; color:var(--text-muted); line-height:1.6; white-space:pre-wrap;">${n.content}</p>
      </div>
      <div style="margin-top:1.5rem; border-top:1px solid var(--border-color); padding-top:1rem; text-align:right;">
        <button class="btn btn-sm" style="background:#1877F2; color:#fff; padding:0.5rem 1rem; font-weight:600;" onclick="shareOnFacebook('${n.id}', '${encodeURIComponent(n.title).replace(/'/g, "\\'")}')">
          <i class="fab fa-facebook-f" style="margin-right:0.5rem;"></i> Share on Facebook
        </button>
      </div>
    </div>
  `).join('');
}

function shareOnFacebook(newsId, encodedTitle) {
  // Assuming the site is hosted on the current domain.
  const currentUrl = encodeURIComponent(window.location.href.split('#')[0]);
  const fbShareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + currentUrl + '&quote=' + encodedTitle;
  
  window.open(fbShareUrl, 'facebook-share-dialog', 'width=800,height=600');
}

// --- Blood Bank Logic ---
window.app = window.app || {};

window.searchBloodDonors = function() {
  const groupFilter = document.getElementById('blood-search-group').value;
  const locationFilter = document.getElementById('blood-search-location').value.toLowerCase();
  const container = document.getElementById('public-blood-container');
  
  let donors = db.getBloodDonors();

  if (groupFilter) {
    donors = donors.filter(d => d.bloodGroup === groupFilter);
  }
  if (locationFilter) {
    donors = donors.filter(d => d.district.toLowerCase().includes(locationFilter));
  }

  if (donors.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:2rem; background:var(--bg-light); border-radius:var(--radius-md);">
      <i class="fas fa-search" style="font-size:2rem; color:var(--text-muted); opacity:0.5; margin-bottom:1rem;"></i>
      <h4 style="color:var(--primary-deep);">কোনো রক্তদাতা পাওয়া যায়নি</h4>
      <p style="color:var(--text-muted); font-size:0.9rem;">ভিন্ন গ্রুপ বা এলাকা দিয়ে পুনরায় চেষ্টা করুন।</p>
    </div>`;
    return;
  }

  container.innerHTML = donors.map(d => `
    <div class="feature-card" style="display:flex; gap:1rem; align-items:center;">
      <div style="flex-shrink:0; width:64px; height:64px; background:#c0392b; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:700;">
        ${d.bloodGroup}
      </div>
      <div>
        <h4 style="color:var(--primary-deep); margin-bottom:0.25rem;">${d.name}</h4>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:0.25rem;"><i class="fas fa-map-marker-alt"></i> ${d.district}</p>
        <p style="color:var(--text-muted); font-size:0.85rem;"><i class="fas fa-phone-alt"></i> <a href="tel:${d.phone}" style="color:var(--primary-accent); font-weight:600;">${d.phone}</a></p>
      </div>
    </div>
  `).join('');
};

window.handleBloodDonorSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('blood-reg-name').value;
  const phone = document.getElementById('blood-reg-phone').value;
  const bloodGroup = document.getElementById('blood-reg-group').value;
  const district = document.getElementById('blood-reg-location').value;
  const lastDonation = document.getElementById('blood-reg-last').value;

  db.addBloodDonor({ name, phone, bloodGroup, district, lastDonation });
  
  showToast('রক্তদাতা হিসেবে আপনার রেজিস্ট্রেশন সফল হয়েছে! ধন্যবাদ।', 'success');
  e.target.reset();
  searchBloodDonors();
};

function initAppRouter() {
  // Mobile Hamburger Toggle
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const drawer = document.getElementById('mobile-drawer');
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });

    drawer.querySelectorAll('a, button').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    });
  }

  // Header scroll detection
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function updateLiveHeaderStats() {
  const summary = db.getAccountingSummary();

  const heroImg = document.getElementById('dynamic-hero-img');
  if (heroImg) {
    const customHero = db.getMedia('heroImage');
    if (customHero) {
      heroImg.src = customHero;
    } else {
      db.getHeroImage().then(src => {
        if (src && src !== '[object Promise]') heroImg.src = src;
      });
    }
  }

  const elTodayInc = document.getElementById('stat-today-inc');
  if (elTodayInc) elTodayInc.innerText = `৳ ${summary.todayIncome.toLocaleString()}`;

  const elTodayExp = document.getElementById('stat-today-exp');
  if (elTodayExp) elTodayExp.innerText = `৳ ${summary.todayExpense.toLocaleString()}`;

  const elTodayFood = document.getElementById('stat-today-food');
  if (elTodayFood) elTodayFood.innerText = `${Number(db.data.todayFoodRecipients || 0)} জন`;

  const elDonors = document.getElementById('stat-total-donors');
  if (elDonors) elDonors.innerText = summary.totalDonorsCount;

  const elVols = document.getElementById('stat-total-vols');
  if (elVols) elVols.innerText = summary.volunteersCount;

  const elBenes = document.getElementById('stat-total-benes');
  if (elBenes) elBenes.innerText = summary.beneficiariesCount.toLocaleString();

  const elAvail = document.getElementById('stat-avail-fund');
  const tBal = summary.todayBalance !== undefined ? summary.todayBalance : (summary.todayIncome - summary.todayExpense);
  if (elAvail) elAvail.innerText = `৳ ${tBal.toLocaleString()}`;

  // Update Old Age Home Fund Stats
  const oldAgeFund = summary.fundSummaries.find(f => f.id === 'old_age_home');
  if (oldAgeFund) {
    const elCollected = document.getElementById('oah-collected');
    if (elCollected) elCollected.innerText = `৳ ${oldAgeFund.income.toLocaleString()}`;

    const elSpent = document.getElementById('oah-spent');
    if (elSpent) elSpent.innerText = `৳ ${oldAgeFund.expense.toLocaleString()}`;

    const elBal = document.getElementById('oah-balance');
    if (elBal) elBal.innerText = `৳ ${oldAgeFund.balance.toLocaleString()}`;

    // Progress bar fill (Target: 1.5 Crore = 15,000,000)
    const target = 15000000;
    const pct = Math.min(100, ((oldAgeFund.income / target) * 100).toFixed(1));
    const fill = document.getElementById('oah-progress-fill');
    if (fill) fill.style.width = `${pct}%`;

    const elPctText = document.getElementById('oah-progress-text');
    if (elPctText) elPctText.innerText = `${pct}% অর্জিত`;
  }

  // Populate Member Marquee Slider
  renderMemberMarqueeTrack();
}

function renderMemberMarqueeTrack() {
  const marqueeTrack = document.getElementById('member-marquee-track');
  if (!marqueeTrack) return;

  const members = (db.data && db.data.members) ? db.data.members : (db.getMembers ? db.getMembers() : []);
  if (!members || members.length === 0) return;

  // Duplicate list to create seamless infinite marquee scroll
  const displayList = [...members, ...members];

  marqueeTrack.innerHTML = displayList.map(m => {
    const avatarHtml = m.profileImage 
      ? `<img src="${m.profileImage}" style="width:46px; height:46px; border-radius:50%; object-fit:cover; border:2px solid var(--accent-gold); flex-shrink:0;">`
      : `<div style="width:46px; height:46px; border-radius:50%; background:${m.avatarBg || 'var(--primary-mid)'}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.1rem; flex-shrink:0;">${(m.name || 'M').charAt(0)}</div>`;

    return `
      <div class="member-marquee-card" onclick="showMemberProfile('${m.id}')" style="display:inline-flex; align-items:center; gap:0.75rem; background:#fff; padding:0.65rem 1.25rem; border-radius:50px; box-shadow:0 3px 10px rgba(0,0,0,0.06); border:1px solid var(--border-color); cursor:pointer; flex-shrink:0;">
        ${avatarHtml}
        <div style="text-align:left;">
          <h4 style="font-size:0.92rem; font-weight:700; color:var(--primary-deep); margin:0; line-height:1.2;">${m.name}</h4>
          <span style="font-size:0.76rem; color:var(--text-muted); font-weight:600;">${m.typeLabelBn || m.type || 'সদস্য'}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Translate Static Elements with i18n
function translateStaticElements() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerText = getTranslation(key);
  });
}

// Membership Submenu Tab Switcher
function showMembershipTab(tabType) {
  const formBox = document.getElementById('membership-form-container');
  const directoryBox = document.getElementById('membership-directory-container');

  document.querySelectorAll('.mem-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabType);
  });

  if (tabType === 'directory') {
    if (formBox) formBox.style.display = 'none';
    if (directoryBox) directoryBox.style.display = 'block';
    renderMemberDirectory('all');
  } else {
    if (formBox) formBox.style.display = 'block';
    if (directoryBox) directoryBox.style.display = 'none';
  }
}

// Member Directory Renderer with Filter Tabs & WhatsApp Reminder Trigger
function renderMemberDirectory(filterType = 'all') {
  const container = document.getElementById('member-cards-grid');
  if (!container) return;

  const members = db.getMembers(filterType);

  if (!members.length) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:3rem; background:#fff; border-radius:var(--radius-md); color:var(--text-muted);">
        <i class="fas fa-users-slash" style="font-size:2.5rem; margin-bottom:1rem; color:var(--text-light);"></i>
        <p>এই ক্যাটাগরিতে কোনো সদস্য রেকর্ড পাওয়া যায়নি।</p>
      </div>
    `;
    return;
  }

  container.innerHTML = members.map(m => {
    const formattedAmount = `৳ ${m.amount.toLocaleString()}`;
    const cleanPhone = m.phone.replace(/[^0-9]/g, '');

    const avatarHtml = m.profileImage 
      ? `<img src="${m.profileImage}" style="width:60px; height:60px; border-radius:50%; object-fit:cover; flex-shrink:0; border:2px solid ${m.avatarBg || 'var(--primary-mid)'};">`
      : `<div style="width:60px; height:60px; border-radius:50%; background:${m.avatarBg || 'var(--primary-mid)'}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.6rem; font-weight:700; flex-shrink:0;">${m.name.charAt(0)}</div>`;

    return `
      <div class="feature-card" style="position:relative; display:flex; flex-direction:column; justify-content:space-between; border-top:4px solid ${m.avatarBg || 'var(--primary-mid)'};">
        <div>
          <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.25rem;">
            ${avatarHtml}
            <div>
              <h4 style="font-size:1.1rem; font-weight:700; color:var(--primary-deep); margin:0;">${m.name}</h4>
              <span class="badge badge-verified" style="margin-top:4px;">${m.typeLabelBn || m.type}</span>
            </div>
          </div>

          <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:1.25rem;">
            <p style="margin-bottom:0.35rem;"><i class="fas fa-id-badge" style="width:20px; color:var(--primary-mid);"></i> আইডি: <strong>${m.id}</strong></p>
            <p style="margin-bottom:0.35rem;"><i class="fas fa-map-marker-alt" style="width:20px; color:var(--accent-gold);"></i> এলাকা: ${m.district}</p>
            <p style="margin-bottom:0.35rem;"><i class="fas fa-briefcase" style="width:20px; color:var(--accent-blue);"></i> পেশা: ${m.occupation}</p>
            <p style="margin-bottom:0.35rem;"><i class="fas fa-hand-holding-usd" style="width:20px; color:var(--primary-accent);"></i> অঙ্গীকার: <strong style="color:var(--primary-deep);">${formattedAmount} (${m.frequency})</strong></p>
            <p style="margin-bottom:0.35rem;"><i class="fas fa-calendar-alt" style="width:20px; color:var(--text-light);"></i> যোগদানের তারিখ: ${m.joiningDate}</p>
          </div>
        </div>

        <div>
          <button class="btn btn-sm btn-primary" style="width:100%; margin-bottom:0.5rem;" onclick="showMemberProfile('${m.id}')">
            <i class="fas fa-user-circle"></i> বিস্তারিত প্রোফাইল দেখুন
          </button>
          <button class="btn btn-sm btn-primary" style="width:100%; background:#25D366; border:none; color:#fff; box-shadow:0 4px 10px rgba(37,211,102,0.25);" onclick="sendWhatsAppReminder('${cleanPhone}', '${encodeURIComponent(m.name)}', ${m.amount}, '${encodeURIComponent(m.typeLabelBn || m.type)}')">
            <i class="fab fa-whatsapp" style="font-size:1.1rem;"></i> WhatsApp-এ অনুদান তাগিদ পাঠান
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// 1-Click Respectful WhatsApp Reminder Generator
function sendWhatsAppReminder(phone, encodedName, amount, encodedType) {
  const name = decodeURIComponent(encodedName);
  const type = decodeURIComponent(encodedType);
  const formattedAmt = Number(amount).toLocaleString();

  const msg = `সম্মানিত ${name} ভাই/আপু,\n\nআসসালামু আলাইকুম। এক মুঠো খাবার ও পুনর্বাসন ফাউন্ডেশনের পক্ষ থেকে সুবিধাবঞ্চিত পথশিশু, অসহায় প্রবীণ ও দুঃস্থ মানুষের পাশে থাকার জন্য আমরা আপনার প্রতি চিরকৃতজ্ঞ।\n\nআপনার চলতি মাসের নির্ধারিত অনুদান (৳ ${formattedAmt}) জমা দেওয়ার জন্য বিনীত ও সম্মানজনক তাগিদ প্রদান করা হচ্ছে।\n\nঅনুদানের মাধ্যম:\n- বিকাশ/নগদ: 01700-000000 (Merchant)\n- ব্যাংক: এক মুঠো খাবার ও পুনর্বাসন ফাউন্ডেশন, হি: 10293847561, ডাচ-বাংলা ব্যাংক\n\nওয়েবসাইট থেকে রসিদ পেতে সরাসরি অনুদান জমা দিন: https://ekmuthokhabar.org\n\nমানুষের পাশে থাকার জন্য আপনাকে আন্তরিক ধন্যবাদ।`;

  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
  showToast(`${name}-এর হোয়াটসঅ্যাপে তাগিদ বার্তা পাঠানো হচ্ছে...`, 'success');
}

// Modal Controllers
function closeModal() {
  const modal = document.getElementById('global-modal');
  if (modal) modal.classList.remove('active');
}

function openModal(title, contentHtml) {
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body-content');
  const modal = document.getElementById('global-modal');

  if (modalTitle) modalTitle.innerText = title;
  if (modalBody) modalBody.innerHTML = contentHtml;
  if (modal) modal.classList.add('active');
}

function showDonationModal(defaultFund = 'general') {
  const modalBody = document.getElementById('modal-body-content');
  document.getElementById('modal-title').innerText = getTranslation('btn_donate_now');

  const allMembers = db.getMembers() || [];
  const membersOptionsHtml = allMembers.map(m => {
    const label = `${m.name} (${m.id}) - ${m.typeLabelBn || m.type || ''} ${m.phone ? '[' + m.phone + ']' : ''}`;
    return `<option value="${m.id}">${label}</option>`;
  }).join('');

  modalBody.innerHTML = `
    <form id="donation-submit-form" onsubmit="handleDonationFormSubmit(event)">
      <div class="form-group">
        <label class="form-label">${getTranslation('amount_lbl')}</label>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
          <button type="button" class="btn btn-sm btn-secondary amount-chip" onclick="setDonationAmount(100)">৳১০০</button>
          <button type="button" class="btn btn-sm btn-secondary amount-chip" onclick="setDonationAmount(500)">৳৫০০</button>
          <button type="button" class="btn btn-sm btn-secondary amount-chip active" onclick="setDonationAmount(1000)">৳১,০০০</button>
          <button type="button" class="btn btn-sm btn-secondary amount-chip" onclick="setDonationAmount(2000)">৳২,০০০</button>
        </div>
        <input type="number" id="don-amount-input" class="form-control" value="1000" min="10" required>
      </div>

      <div class="form-group">
        <label class="form-label">${getTranslation('fund_lbl')}</label>
        <select id="don-fund-select" class="form-control">
          <option value="food" ${defaultFund === 'food' ? 'selected' : ''}>খাদ্য ফান্ড (Food Fund)</option>
          <option value="housing" ${defaultFund === 'housing' ? 'selected' : ''}>আশ্রয় ও গৃহ নির্মাণ ফান্ড (Shelter & Housing Fund)</option>
          <option value="education" ${defaultFund === 'education' ? 'selected' : ''}>শিক্ষা সহায়তা ফান্ড</option>
          <option value="medical" ${defaultFund === 'medical' ? 'selected' : ''}>চিকিৎসা সহায়তা ফান্ড</option>
          <option value="self_reliance" ${defaultFund === 'self_reliance' ? 'selected' : ''}>আত্মকর্মসংস্থান ফান্ড</option>
          <option value="elderly" ${defaultFund === 'elderly' ? 'selected' : ''}>প্রবীণ সেবা ফান্ড</option>
          <option value="old_age_home" ${defaultFund === 'old_age_home' ? 'selected' : ''}>বৃদ্ধাশ্রম প্রকল্প ফান্ড</option>
          <option value="religious" ${defaultFund === 'religious' ? 'selected' : ''}>ধর্মীয় ও সামাজিক উন্নয়ন ফান্ড</option>
          <option value="general" ${defaultFund === 'general' ? 'selected' : ''}>সাধারণ মানবিক ফান্ড</option>
        </select>
      </div>

      <div class="form-group" style="background:rgba(5,150,105,0.06); padding:0.85rem; border-radius:var(--radius-md); border:1px solid rgba(5,150,105,0.2);">
        <label class="form-label" style="font-weight:700; color:var(--primary-deep); margin-bottom:0.35rem; display:flex; align-items:center; gap:0.4rem;">
          <i class="fas fa-id-card-alt" style="color:var(--primary-mid);"></i> নিবন্ধিত সদস্য নির্বাচন করুন (যদি আপনি নিবন্ধিত হন)
        </label>
        <select id="don-member-select" class="form-control" onchange="onSelectMemberInDonationModal(this.value)">
          <option value="">-- নতুন দাতা / অথবা তালিকা থেকে সদস্য নির্বাচন করুন --</option>
          ${membersOptionsHtml}
        </select>
        <div id="member-match-status" style="font-size:0.8rem; color:#047857; margin-top:0.35rem; font-weight:600; display:none;"></div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:0.85rem;">
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label" style="font-weight:600;"><i class="fas fa-calendar-alt" style="color:var(--primary-mid);"></i> অনুদানের তারিখ (Date)</label>
          <input type="date" id="don-date-input" class="form-control" required value="${new Date().toISOString().split('T')[0]}">
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label" style="font-weight:600;">সদস্য / দাতা ক্যাটাগরি</label>
          <select id="don-category-select" class="form-control">
            <option value="সাধারণ দাতা (General Donor)">সাধারণ দাতা (General Donor)</option>
            <option value="মাসিক সাধারণ সদস্য (Monthly Member)">মাসিক সাধারণ সদস্য (Monthly Member)</option>
            <option value="৩/৬/১২ মাসের দাতা (3-Month Donor)">৩/৬/১২ মাসের দাতা (3-Month Donor)</option>
            <option value="আজীবন সদস্য (Life Member)">আজীবন সদস্য (Life Member)</option>
            <option value="স্থায়ী দাতা সদস্য (Permanent Donor)">স্থায়ী দাতা সদস্য (Permanent Donor Member)</option>
            <option value="উপদেষ্টা সদস্য (Advisor Member)">উপদেষ্টা সদস্য (Advisor Member)</option>
            <option value="পৃষ্ঠপোষক সদস্য (Patron Member)">পৃষ্ঠপোষক সদস্য (Patron Member)</option>
            <option value="স্বেচ্ছাসেবক (Volunteer)">স্বেচ্ছাসেবক (Volunteer)</option>
          </select>
        </div>
      </div>

      <div class="form-group" style="background:rgba(15,90,62,0.05); padding:1rem; border-radius:var(--radius-md); border:1px solid rgba(15,90,62,0.15); margin-bottom:1.25rem;">
        <label class="form-label" style="font-weight:700; color:var(--primary-deep); margin-bottom:0.5rem;"><i class="fas fa-university" style="color:var(--accent-gold);"></i> অফিশিয়াল লেনদেন ও অনুদান অ্যাকাউন্ট</label>
        <div style="font-size:0.86rem; color:var(--text-dark); line-height:1.6;">
          <div style="margin-bottom:0.3rem;"><strong style="color:#e2136e;">বিকাশ পার্সোনাল:</strong> 01306406917, 01936758675</div>
          <div style="margin-bottom:0.3rem;"><strong style="color:#f7941d;">নগদ পার্সোনাল:</strong> 01306406917, 01832630299</div>
          <div style="margin-bottom:0.3rem;"><strong style="color:#f7941d;">নগদ এজেন্ট (ক্যাশ আউট):</strong> 01718706270</div>
          <div style="margin-bottom:0.3rem;"><strong style="color:var(--primary-deep);">ইসলামী ব্যাংক হিসাব:</strong> 20503620201021104 (রৌমারী শাখা)</div>
          <div style="font-size:0.8rem; color:var(--text-muted);"><i class="fas fa-headset"></i> জরুরী সেবায় হটলাইন: 01832630299, 01400844602</div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">${getTranslation('payment_lbl')}</label>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
          <label style="border:1px solid var(--border-color); padding:0.6rem; border-radius:var(--radius-md); display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
            <input type="radio" name="pay_method" value="bKash Personal" checked onchange="toggleCashCollectorInput(this.value)"> <span>bKash (বিকাশ)</span>
          </label>
          <label style="border:1px solid var(--border-color); padding:0.6rem; border-radius:var(--radius-md); display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
            <input type="radio" name="pay_method" value="Nagad Personal" onchange="toggleCashCollectorInput(this.value)"> <span>Nagad (নগদ)</span>
          </label>
          <label style="border:1px solid var(--border-color); padding:0.6rem; border-radius:var(--radius-md); display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
            <input type="radio" name="pay_method" value="Nagad Agent" onchange="toggleCashCollectorInput(this.value)"> <span>Nagad Agent (এজেন্ট)</span>
          </label>
          <label style="border:1px solid var(--border-color); padding:0.6rem; border-radius:var(--radius-md); display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
            <input type="radio" name="pay_method" value="Islami Bank" onchange="toggleCashCollectorInput(this.value)"> <span>Islami Bank (ব্যাংক)</span>
          </label>
          <label style="border:1px solid var(--border-color); padding:0.6rem; border-radius:var(--radius-md); display:flex; align-items:center; gap:0.5rem; cursor:pointer; grid-column: span 2; background:rgba(245, 158, 11, 0.06); border-color:rgba(245, 158, 11, 0.4);">
            <input type="radio" name="pay_method" value="Cash (নগদ ক্যাশ)" onchange="toggleCashCollectorInput(this.value)"> <span style="font-weight:700; color:#b45309;"><i class="fas fa-hand-holding-usd"></i> Cash (নগদ ক্যাশ প্রদান)</span>
          </label>
        </div>

        <div id="cash-collector-group" style="display:none; margin-top:0.75rem; background:rgba(245, 158, 11, 0.08); padding:0.75rem; border-radius:var(--radius-md); border:1px solid rgba(245, 158, 11, 0.3);">
          <label class="form-label" style="font-weight:700; color:#b45309; margin-bottom:0.35rem;"><i class="fas fa-user-check"></i> কার কাছে নগদ টাকা প্রদান করেছেন? (সংগ্রহকারীর নাম/সদস্য) *</label>
          <input type="text" id="don-collector-input" class="form-control" placeholder="যেমন: আব্দুর রহিম (কোষাধ্যক্ষ / সেচ্ছাসেবক)">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">${getTranslation('donor_name_lbl')}</label>
        <input type="text" id="don-name-input" class="form-control" placeholder="আপনার পূর্ণ নাম" required value="${auth.currentUser ? auth.currentUser.name : ''}">
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
        <div class="form-group">
          <label class="form-label">${getTranslation('donor_phone_lbl')}</label>
          <input type="tel" id="don-phone-input" class="form-control" placeholder="017XXXXXXXX" required value="${auth.currentUser ? auth.currentUser.phone : ''}" oninput="onPhoneInputMatchMember(this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">ট্রানজেকশন রেফ / Txn ID</label>
          <input type="text" id="don-txn-input" class="form-control" placeholder="যেমন: BK99214X">
        </div>
      </div>

      <div class="form-group">
        <label class="checkbox-group">
          <input type="checkbox" id="don-anon-check">
          <span>${getTranslation('privacy_anon_lbl')}</span>
        </label>
      </div>

      <button type="submit" class="btn btn-primary" style="width:100%; margin-top:1rem;">
        <i class="fas fa-heart"></i> ${getTranslation('btn_submit_donation')}
      </button>
    </form>
  `;

  document.getElementById('global-modal').classList.add('active');
}

function onSelectMemberInDonationModal(memberId) {
  const statusDiv = document.getElementById('member-match-status');
  if (!memberId) {
    if (statusDiv) statusDiv.style.display = 'none';
    return;
  }
  const allMembers = db.getMembers() || [];
  const member = allMembers.find(m => m.id === memberId);
  if (!member) return;

  const nameInput = document.getElementById('don-name-input');
  const phoneInput = document.getElementById('don-phone-input');
  const catSelect = document.getElementById('don-category-select');

  if (nameInput) nameInput.value = member.name;
  if (phoneInput && member.phone) phoneInput.value = member.phone;

  if (catSelect) {
    if (member.type === 'Monthly' || (member.typeLabelBn && member.typeLabelBn.includes('মাসিক'))) {
      catSelect.value = 'মাসিক সাধারণ সদস্য (Monthly Member)';
    } else if (member.type === '3-Month' || (member.typeLabelBn && member.typeLabelBn.includes('৩/৬/১২'))) {
      catSelect.value = '৩/৬/১২ মাসের দাতা (3-Month Donor)';
    } else if (member.type === 'Volunteer') {
      catSelect.value = 'স্বেচ্ছাসেবক (Volunteer)';
    }
  }

  if (statusDiv) {
    statusDiv.style.display = 'block';
    statusDiv.innerHTML = `<i class="fas fa-check-circle"></i> সদস্য নির্বাচন করা হয়েছে: <strong>${member.name}</strong> (${member.id})`;
  }
}

function onPhoneInputMatchMember(phoneVal) {
  const clean = db.cleanPhone(phoneVal);
  const statusDiv = document.getElementById('member-match-status');
  if (clean.length >= 8) {
    const allMembers = db.getMembers() || [];
    const found = allMembers.find(m => db.cleanPhone(m.phone) === clean);
    if (found) {
      const nameInput = document.getElementById('don-name-input');
      const memberSelect = document.getElementById('don-member-select');
      const catSelect = document.getElementById('don-category-select');
      if (nameInput && (!nameInput.value || nameInput.value !== found.name)) {
        nameInput.value = found.name;
      }
      if (memberSelect) {
        memberSelect.value = found.id;
      }
      if (catSelect) {
        if (found.type === 'Monthly' || (found.typeLabelBn && found.typeLabelBn.includes('মাসিক'))) {
          catSelect.value = 'মাসিক সাধারণ সদস্য (Monthly Member)';
        } else if (found.type === '3-Month' || (found.typeLabelBn && found.typeLabelBn.includes('৩/৬/১২'))) {
          catSelect.value = '৩/৬/১২ মাসের দাতা (3-Month Donor)';
        }
      }
      if (statusDiv) {
        statusDiv.style.display = 'block';
        statusDiv.innerHTML = `<i class="fas fa-check-circle"></i> নিবন্ধিত সদস্য সনাক্ত করা হয়েছে: <strong>${found.name}</strong> (${found.id})`;
      }
    }
  }
}

function setDonationAmount(amt) {
  document.getElementById('don-amount-input').value = amt;
}

function toggleCashCollectorInput(val) {
  const group = document.getElementById('cash-collector-group');
  const input = document.getElementById('don-collector-input');
  if (group) {
    if (val && val.includes('Cash')) {
      group.style.display = 'block';
      if (input) input.required = true;
    } else {
      group.style.display = 'none';
      if (input) {
        input.required = false;
        input.value = '';
      }
    }
  }
}

function handleDonationFormSubmit(e) {
  e.preventDefault();
  const amt = document.getElementById('don-amount-input').value;
  const fund = document.getElementById('don-fund-select').value;
  const category = document.getElementById('don-category-select') ? document.getElementById('don-category-select').value : 'সাধারণ দাতা (General Donor)';
  const name = document.getElementById('don-name-input').value;
  const phone = document.getElementById('don-phone-input').value;
  const txn = document.getElementById('don-txn-input').value;
  const isAnon = document.getElementById('don-anon-check').checked;
  const donDate = document.getElementById('don-date-input') ? document.getElementById('don-date-input').value : null;
  const payMethod = document.querySelector('input[name="pay_method"]:checked').value;
  const collector = document.getElementById('don-collector-input') ? document.getElementById('don-collector-input').value.trim() : '';

  const newDonation = db.addDonation({
    amount: amt,
    fund: fund,
    date: donDate,
    memberCategory: category,
    donorName: name,
    donorPhone: phone,
    txnRef: collector ? `Cash: ${collector}` : (txn || `CASH-${Math.floor(Math.random()*900000 + 100000)}`),
    receivedBy: collector,
    isAnonymous: isAnon,
    paymentMethod: payMethod
  });

  closeModal();
  showToast('আপনার অনুদান সফলভাবে নিবন্ধিত ও যাচাই করা হয়েছে! ধন্যবাদ।', 'success');

  // Show generated receipt automatically
  setTimeout(() => {
    receiptGen.renderReceiptModal(newDonation.id);
  }, 400);
}

// ==========================================
// MEAL SPONSORS BANNER & CALENDAR
// ==========================================

function renderMealSponsorsBanner() {
  const elToday = document.getElementById('sponsor-today');
  const elTomorrow = document.getElementById('sponsor-tomorrow');
  if (!elToday || !elTomorrow) return;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const todayStr = today.toISOString().split('T')[0];
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const sponsorToday = db.getMealSponsor(todayStr);
  const sponsorTomorrow = db.getMealSponsor(tomorrowStr);

  elToday.innerText = sponsorToday ? sponsorToday : 'ফান্ড প্রয়োজন (Available)';
  elTomorrow.innerText = sponsorTomorrow ? sponsorTomorrow : 'ফান্ড প্রয়োজন (Available)';
}

let publicCalMonth = new Date().getMonth();
let publicCalYear = new Date().getFullYear();

function openMealCalendarModal() {
  // Generate Month Options
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthOpts = '';
  months.forEach((m, i) => {
     monthOpts += `<option value="${i}" ${publicCalMonth === i ? 'selected' : ''}>${m}</option>`;
  });

  // Generate Year Options (2026 to +20 years)
  let yearOpts = '';
  for (let y = 2026; y <= 2046; y++) {
     yearOpts += `<option value="${y}" ${publicCalYear === y ? 'selected' : ''}>${y}</option>`;
  }

  let html = `
    <div style="text-align:center; margin-bottom:1.5rem;">
      <h2 style="color:var(--primary-deep); font-size:1.6rem;"><i class="fas fa-calendar-alt"></i> মাসিক খাবার স্পন্সর ক্যালেন্ডার</h2>
      <p style="color:var(--text-muted); font-size:1rem;">পুরো মাসের স্পন্সর তালিকা দেখুন। যে দিনগুলোতে স্পন্সর নেই, সেদিনের জন্য আপনি স্পন্সর হতে পারেন।</p>
    </div>
    
    <div style="display:flex; justify-content:center; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
      <select id="public-cal-month" class="form-control" style="width:auto; display:inline-block;" onchange="updatePublicCalFilter()">
        ${monthOpts}
      </select>
      <select id="public-cal-year" class="form-control" style="width:auto; display:inline-block;" onchange="updatePublicCalFilter()">
        ${yearOpts}
      </select>
    </div>

    <div class="table-responsive" style="max-height:50vh; overflow-y:auto; border-radius:var(--radius-md); box-shadow:inset 0 2px 4px rgba(0,0,0,0.05);">
      <table class="custom-table" style="width:100%;">
        <thead style="position:sticky; top:0; z-index:10; background:#f4f6f9;">
          <tr>
            <th>তারিখ (Date)</th>
            <th>অবস্থা (Status)</th>
            <th>স্পন্সরের নাম (Sponsor Name)</th>
          </tr>
        </thead>
        <tbody id="public-meal-cal-tbody">
          <!-- Rendered by JS -->
        </tbody>
      </table>
    </div>
  `;

  openModal('মাসিক খাবার স্পন্সর', html);
  renderPublicMonthCalendar();
}

function updatePublicCalFilter() {
  publicCalMonth = parseInt(document.getElementById('public-cal-month').value);
  publicCalYear = parseInt(document.getElementById('public-cal-year').value);
  renderPublicMonthCalendar();
}

function renderPublicMonthCalendar() {
  const tbody = document.getElementById('public-meal-cal-tbody');
  if (!tbody) return;

  let html = '';
  const daysInMonth = new Date(publicCalYear, publicCalMonth + 1, 0).getDate();
  const minDateStr = "2026-08-11";
  
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(Date.UTC(publicCalYear, publicCalMonth, i));
    const dateStr = d.toISOString().split('T')[0];

    // Ignore dates before foundation start date (11 Aug 2026)
    if (dateStr < minDateStr) continue;

    // Formatting date nicely (e.g. 16 Sep 2026)
    const options = { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' };
    const niceDate = d.toLocaleDateString('en-GB', options);

    const sponsor = db.getMealSponsor(dateStr);
    
    if (sponsor) {
      html += `
        <tr>
          <td><strong>${niceDate}</strong></td>
          <td><span class="badge badge-verified"><i class="fas fa-check-circle"></i> বুকড (Booked)</span></td>
          <td style="color:var(--primary-deep); font-weight:600;">${sponsor}</td>
        </tr>
      `;
    } else {
      html += `
        <tr style="background-color:rgba(212, 175, 55, 0.05);">
          <td><strong>${niceDate}</strong></td>
          <td><span class="badge" style="background:#e0e0e0; color:#333;">ফাঁকা (Available)</span></td>
          <td>
            <button class="btn btn-sm btn-gold" onclick="closeModal(); showDonationModal('food')">স্পন্সর হোন</button>
          </td>
        </tr>
      `;
    }
  }

  tbody.innerHTML = html;
}

// ==========================================
// MEMBER REGISTRATION & PROFILES
// ==========================================

let tempMemberBase64 = null;

function previewMemberImage(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      tempMemberBase64 = e.target.result;
      document.getElementById('member-img-preview').src = tempMemberBase64;
      document.getElementById('member-img-preview').style.display = 'block';
      document.getElementById('member-img-icon').style.display = 'none';
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function submitMemberRegistration(e) {
  e.preventDefault();
  
  const name = document.getElementById('mem-reg-name').value;
  const phone = document.getElementById('mem-reg-phone').value;
  const whatsapp = document.getElementById('mem-reg-whatsapp').value;
  const email = document.getElementById('mem-reg-email').value;
  
  const catSelect = document.getElementById('mem-reg-cat');
  const type = catSelect.value;
  const typeLabelBn = catSelect.options[catSelect.selectedIndex].text;
  
  const amount = document.getElementById('mem-reg-amount').value || 0;
  const address = document.getElementById('mem-reg-address').value;

  const occTypeEl = document.getElementById('mem-reg-occupation-type');
  const workplaceEl = document.getElementById('mem-reg-workplace');
  const occType = occTypeEl ? occTypeEl.value : 'ব্যবসা';
  const workplace = workplaceEl ? workplaceEl.value.trim() : '';

  let occupation = occType;
  if (workplace) {
    if (occType === 'ব্যবসা') {
      occupation = `স্বত্বাধিকারী: ${workplace}`;
    } else if (occType === 'চাকুরী') {
      occupation = `চাকুরীজীবী (${workplace})`;
    } else if (occType === 'প্রবাসী' || occType === 'শিক্ষার্থী') {
      occupation = `${occType} - ${workplace}`;
    } else {
      occupation = workplace;
    }
  }

  db.addMember({
    name,
    phone,
    whatsapp,
    email,
    type,
    typeLabelBn,
    amount,
    district: address,
    occupation,
    profileImage: tempMemberBase64
  });

  document.getElementById('member-reg-form').reset();
  tempMemberBase64 = null;
  document.getElementById('member-img-preview').style.display = 'none';
  document.getElementById('member-img-icon').style.display = 'block';

  showToast('আপনার সদস্যপদ আবেদন সফলভাবে জমা হয়েছে!', 'success');
  showMembershipTab('directory');
}

function showMemberProfile(memberId) {
  const members = db.getMembers();
  const member = members.find(m => m.id === memberId);
  if (!member) return;

  const stats = db.getMemberDonationStats(member.phone) || { count: 0, totalAmount: 0 };
  
  const avatarHtml = member.profileImage 
    ? `<img src="${member.profileImage}" style="width:110px; height:110px; border-radius:50%; object-fit:cover; border:4px solid ${member.avatarBg || 'var(--primary-mid)'}; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">`
    : `<div style="width:110px; height:110px; border-radius:50%; background:${member.avatarBg || 'var(--primary-mid)'}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:2.8rem; font-weight:700; margin:0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">${member.name.charAt(0)}</div>`;

  const cleanPhone = db.cleanPhone(member.phone);
  const formattedAmount = Number(member.amount || 0).toLocaleString();

  const html = `
    <div style="text-align:center; margin-bottom:1.5rem;">
      ${avatarHtml}
      <h3 style="font-size:1.4rem; font-weight:700; color:var(--primary-deep); margin-top:1rem; margin-bottom:0.25rem;">${member.name}</h3>
      <span class="badge badge-verified" style="font-size:0.85rem; padding: 4px 12px;">${member.typeLabelBn || member.type || 'মাসিক সদস্য'}</span>
    </div>
    
    <div style="background:var(--bg-light); border-radius:var(--radius-md); padding:1.25rem; margin-bottom:1.5rem; border:1px solid var(--border-color);">
      <p style="margin-bottom:0.6rem;"><i class="fas fa-id-badge" style="width:22px; color:var(--primary-mid);"></i> <strong>আইডি:</strong> ${member.id}</p>
      <p style="margin-bottom:0.6rem;"><i class="fas fa-map-marker-alt" style="width:22px; color:var(--accent-gold);"></i> <strong>এলাকা/ঠিকানা:</strong> ${member.district || 'দেওয়া হয়নি'}</p>
      <p style="margin-bottom:0.6rem;"><i class="fas fa-briefcase" style="width:22px; color:var(--accent-blue);"></i> <strong>পেশা/পদবী:</strong> ${member.occupation || 'দেওয়া হয়নি'}</p>
      <p style="margin-bottom:0.6rem;"><i class="fas fa-phone-alt" style="width:22px; color:var(--primary-accent);"></i> <strong>মোবাইল নম্বর:</strong> <a href="tel:${member.phone}" style="color:var(--primary-deep); font-weight:600;">${member.phone}</a></p>
      <p style="margin-bottom:0.6rem;"><i class="fab fa-whatsapp" style="width:22px; color:#25D366;"></i> <strong>হোয়াটসঅ্যাপ:</strong> ${member.whatsapp || member.phone || 'দেওয়া হয়নি'}</p>
      <p style="margin-bottom:0;"><i class="fas fa-calendar-alt" style="width:22px; color:var(--text-light);"></i> <strong>যোগদানের তারিখ:</strong> ${member.joiningDate || '২০২৬-০৯-১৭'}</p>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.75rem; text-align:center; margin-bottom:1.5rem;">
      <div style="background:#fff; border:1px solid var(--border-color); padding:0.85rem; border-radius:var(--radius-sm); box-shadow:0 2px 5px rgba(0,0,0,0.03);">
        <p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.35rem;">মাসিক অঙ্গীকার</p>
        <strong style="font-size:1.1rem; color:var(--primary-accent);">৳ ${formattedAmount}</strong>
      </div>
      <div style="background:#fff; border:1px solid var(--border-color); padding:0.85rem; border-radius:var(--radius-sm); box-shadow:0 2px 5px rgba(0,0,0,0.03);">
        <p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.35rem;">মোট অনুদান</p>
        <strong style="font-size:1.1rem; color:var(--primary-deep);">${stats.count || 0} বার</strong>
      </div>
      <div style="background:#fff; border:1px solid var(--border-color); padding:0.85rem; border-radius:var(--radius-sm); box-shadow:0 2px 5px rgba(0,0,0,0.03);">
        <p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.35rem;">সর্বমোট প্রদান</p>
        <strong style="font-size:1.1rem; color:var(--accent-gold);">৳ ${(stats.totalAmount || 0).toLocaleString()}</strong>
      </div>
    </div>
    
    <div style="display:flex; gap:0.75rem;">
      <button class="btn btn-secondary" style="flex:1;" onclick="closeModal()">বন্ধ করুন</button>
      <button class="btn btn-primary" style="flex:1; background:#25D366; border:none; color:#fff;" onclick="closeModal(); sendWhatsAppReminder('${cleanPhone}', '${encodeURIComponent(member.name)}', ${member.amount || 0}, '${encodeURIComponent(member.typeLabelBn || member.type || 'মাসিক সদস্য')}')">
        <i class="fab fa-whatsapp"></i> WhatsApp তাগিদ
      </button>
    </div>
  `;

  openModal('সদস্য প্রোফাইল', html);
}

// ==========================================
// PWA (Progressive Web App) Support & Install Handler
// ==========================================
let deferredPwaPrompt = null;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('PWA Service Worker registered:', reg.scope))
      .catch((err) => console.log('PWA Service Worker registration failed:', err));
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPwaPrompt = e;

  // Show PWA install button in drawer & floating banner
  const drawerBtn = document.getElementById('drawer-install-pwa-btn');
  if (drawerBtn) drawerBtn.style.display = 'flex';

  const banner = document.getElementById('pwa-install-banner');
  if (banner && !sessionStorage.getItem('pwa_banner_dismissed')) {
    banner.style.display = 'flex';
  }
});

function triggerPwaInstall() {
  if (deferredPwaPrompt) {
    deferredPwaPrompt.prompt();
    deferredPwaPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        showToast('ধন্যবাদ! অ্যাপটি আপনার ফোনে সফলভাবে ইনস্টল হচ্ছে।', 'success');
      }
      deferredPwaPrompt = null;
      dismissPwaBanner();
    });
  } else {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
      alert('iPhone/iPad এ ইনস্টল করতে:\n১. Safari ব্রাউজারের নিচে "Share" (শেয়ার) আইকনে ট্যাপ করুন।\n২. নিচে স্ক্রোল করে "Add to Home Screen" বেছে নিন।');
    } else {
      showToast('অ্যাপটি ইতোমধ্যেই ইনস্টল করা হয়েছে অথবা আপনার ব্রাউজার অটো-ইনস্টল সাপোর্ট করছে না।', 'warning');
    }
  }
}

function dismissPwaBanner() {
  const banner = document.getElementById('pwa-install-banner');
  if (banner) banner.style.display = 'none';
  sessionStorage.setItem('pwa_banner_dismissed', 'true');
}

window.addEventListener('appinstalled', () => {
  showToast('এক মুঠো খাবার অ্যাপ সফলভাবে আপনার ডিভাইসে ইনস্টল হয়েছে!', 'success');
  dismissPwaBanner();
});


