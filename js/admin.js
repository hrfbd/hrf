/* ==========================================================================
   Ek Mutho Khabar Manobik Foundation - Secure Admin Panel Controller & Audit System
   ========================================================================== */

class AdminPanel {
  renderAdminDashboard() {
    const admin = auth.currentAdmin;
    const adminContainer = document.getElementById('admin-portal-view');
    if (!adminContainer) return;

    if (!admin) {
      adminContainer.innerHTML = `
        <div style="max-width:480px; margin:3rem auto; background:#fff; padding:2.5rem; border-radius:var(--radius-lg); box-shadow: 0 15px 35px rgba(0,0,0,0.12); border-top:5px solid var(--primary-mid); position:relative;">
          <div style="text-align:center; margin-bottom:1.8rem;">
            <div style="width:70px; height:70px; background:linear-gradient(135deg, var(--primary-deep), var(--primary-mid)); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.2rem auto; font-size:2rem; box-shadow:0 8px 20px rgba(15,90,62,0.3);">
              <i class="fas fa-user-lock"></i>
            </div>
            <h3 style="font-size:1.5rem; font-weight:800; color:var(--primary-deep); margin-bottom:0.35rem;">এডমিন প্যানেল প্রবেশ</h3>
            <p style="font-size:0.88rem; color:var(--text-muted);">এক মুঠো খাবার ও পুনর্বাসন ফাউন্ডেশন — সুরক্ষিত সিস্টেম</p>
          </div>

          <form id="admin-login-form" onsubmit="adminPanel.handleAdminLogin(event)">
            <div class="form-group" style="margin-bottom:1.2rem;">
              <label class="form-label" style="font-weight:600;"><i class="fas fa-user-shield" style="color:var(--primary-mid);"></i> এডমিন ইউজার অ্যাকাউন্ট (Username)</label>
              <select id="admin-user-select" class="form-control" style="font-weight:600; padding:0.75rem 1rem;">
                <option value="superadmin">superadmin — সুপার এডমিন (পূর্ণ নিয়ন্ত্রণ)</option>
                <option value="finance">finance — অর্থ ও হিসাব এডমিন</option>
                <option value="donor">donor — দাতা ও সদস্য ম্যানেজার</option>
                <option value="content">content — কন্টেন্ট ও পোস্ট এডমিন</option>
                <option value="auditor">auditor — নিরীক্ষক (Auditor)</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom:1.5rem;">
              <label class="form-label" style="font-weight:600;"><i class="fas fa-key" style="color:var(--accent-gold);"></i> পাসওয়ার্ড (Password)</label>
              <div style="position:relative;">
                <input type="password" id="admin-pass-input" class="form-control" value="admin123" placeholder="পাসওয়ার্ড দিন" required style="padding-right:45px; font-weight:600; padding-top:0.75rem; padding-bottom:0.75rem;">
                <button type="button" onclick="adminPanel.togglePasswordVisibility()" style="position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:1.1rem; outline:none;" title="পাসওয়ার্ড দেখুন/লুকান">
                  <i id="pass-toggle-icon" class="fas fa-eye"></i>
                </button>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.6rem;">
                <small style="color:var(--text-muted);"><i class="fas fa-info-circle"></i> ডিফল্ট পাসওয়ার্ড: <code style="background:#f1f5f9; padding:2px 6px; border-radius:4px; font-weight:700; color:var(--primary-deep);">admin123</code></small>
                <a href="javascript:void(0)" onclick="adminPanel.openChangePasswordModal()" style="font-size:0.82rem; color:var(--primary-accent); font-weight:600; text-decoration:none;"><i class="fas fa-key"></i> পাসওয়ার্ড পরিবর্তন?</a>
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-lg" style="width:100%; border-radius:var(--radius-md); box-shadow:0 6px 18px rgba(15,90,62,0.25); display:flex; align-items:center; justify-content:center; gap:0.5rem;">
              <i class="fas fa-shield-alt" style="font-size:1.2rem;"></i> সুরক্ষিত প্রবেশ করুন (Login)
            </button>
          </form>
        </div>
      `;
      return;
    }

    adminContainer.innerHTML = `
      <div class="portal-layout">
        <aside class="portal-sidebar">
          <div class="sidebar-user">
            <div class="user-avatar" style="background:var(--primary-deep);">
              <i class="fas fa-user-shield"></i>
            </div>
            <h4 style="font-size:1.05rem; font-weight:700; color:var(--primary-deep);">${admin.name}</h4>
            <span class="badge badge-verified" style="margin-top:4px;">${admin.role}</span>
          </div>

          <nav class="sidebar-menu">
            <a class="sidebar-item active" id="tab-btn-overview" onclick="adminPanel.showTab('overview')">
              <i class="fas fa-chart-line"></i> ড্যাশবোর্ড ওভারভিউ
            </a>
            <a class="sidebar-item" id="tab-btn-members-manage" onclick="adminPanel.showTab('members-manage')">
              <i class="fas fa-id-card"></i> সদস্য অনুমোদন ও তথ্য
            </a>
            <a class="sidebar-item" id="tab-btn-donors-manage" onclick="adminPanel.showTab('donors-manage')">
              <i class="fas fa-users"></i> অনুদান ও দাতা ব্যবস্থাপনা
            </a>
            <a class="sidebar-item" id="tab-btn-leadership-manage" onclick="adminPanel.showTab('leadership-manage')">
              <i class="fas fa-sitemap"></i> পরিচালনা পর্ষদ ও উপদেষ্টা
            </a>
            <a class="sidebar-item" id="tab-btn-notices-manage" onclick="adminPanel.showTab('notices-manage')">
              <i class="fas fa-bullhorn"></i> নোটিশ বোর্ড ব্যবস্থাপনা
            </a>
            <a class="sidebar-item" id="tab-btn-expense-manage" onclick="adminPanel.showTab('expense-manage')">
              <i class="fas fa-file-invoice-dollar"></i> ব্যয় ও ভাউচার এন্ট্রি
            </a>
            <a class="sidebar-item" id="tab-btn-audit-logs" onclick="adminPanel.showTab('audit-logs')">
              <i class="fas fa-history"></i> অডিট লগ (Audit Trail)
            </a>
            <a class="sidebar-item" id="tab-btn-meal-cal" onclick="adminPanel.showTab('meal-cal')">
              <i class="fas fa-calendar-alt"></i> খাবার স্পন্সর ক্যালেন্ডার
            </a>
            <a class="sidebar-item" id="tab-btn-reports-export" onclick="adminPanel.showTab('reports-export')">
              <i class="fas fa-download"></i> রিপোর্ট জেনারেটর
            </a>
            <a class="sidebar-item" id="tab-btn-news-manage" onclick="adminPanel.showTab('news-manage')">
              <i class="fas fa-newspaper"></i> নিউজ ও কার্যক্রম পোস্ট
            </a>
            <a class="sidebar-item" id="tab-btn-blood-manage" onclick="adminPanel.showTab('blood-manage')">
              <i class="fas fa-tint" style="color:#e74c3c;"></i> রক্তদাতা ব্যবস্থাপনা
            </a>
            <a class="sidebar-item" id="tab-btn-media-manage" onclick="adminPanel.showTab('media-manage')">
              <i class="fas fa-images"></i> মিডিয়া ও ছবি পরিবর্তন
            </a>
            <a class="sidebar-item" id="tab-btn-pages-manage" onclick="adminPanel.showTab('pages-manage')">
              <i class="fas fa-edit" style="color:var(--accent-gold);"></i> আমাদের কথা ও কার্যক্রম কন্টেন্ট এডিটর
            </a>
            <a class="sidebar-item" onclick="adminPanel.openChangePasswordModal()" style="color:var(--primary-accent); border-top:1px solid var(--border-color); margin-top:0.5rem; padding-top:0.75rem;">
              <i class="fas fa-key"></i> পাসওয়ার্ড পরিবর্তন করুন
            </a>
            <a class="sidebar-item" style="color:var(--accent-red);" onclick="auth.logoutAdmin()">
              <i class="fas fa-sign-out-alt"></i> এডমিন লগআউট
            </a>
          </nav>
        </aside>

        <main class="portal-main">
          <div id="admin-tab-content">
            <!-- Admin View Content -->
          </div>
        </main>
      </div>
    `;

    this.showTab('overview');
  }

  handleAdminLogin(e) {
    e.preventDefault();
    const user = document.getElementById('admin-user-select').value;
    const pass = document.getElementById('admin-pass-input').value;
    const res = auth.loginAdmin(user, pass);

    if (res.success) {
      showToast('এডমিন লগইন সফল হয়েছে!', 'success');
      this.renderAdminDashboard();
    } else {
      showToast(res.message, 'error');
    }
  }

  togglePasswordVisibility() {
    const input = document.getElementById('admin-pass-input');
    const icon = document.getElementById('pass-toggle-icon');
    if (!input || !icon) return;
    if (input.type === 'password') {
      input.type = 'text';
      icon.className = 'fas fa-eye-slash';
    } else {
      input.type = 'password';
      icon.className = 'fas fa-eye';
    }
  }

  openChangePasswordModal() {
    const userSelect = document.getElementById('admin-user-select');
    const defaultUser = userSelect ? userSelect.value : 'superadmin';
    const username = prompt('পাসওয়ার্ড পরিবর্তনের জন্য ইউজারনেম লিখুন:', defaultUser);
    if (!username) return;
    const oldPass = prompt(`'${username}' অ্যাকাউন্টের বর্তমান পাসওয়ার্ড লিখুন:`, 'admin123');
    if (!oldPass) return;
    const newPass = prompt(`'${username}' অ্যাকাউন্টের জন্য নতুন পাসওয়ার্ড লিখুন (কমপক্ষে ৪ অক্ষর):`);
    if (!newPass) return;

    const res = auth.changeAdminPassword(username, oldPass, newPass);
    if (res.success) {
      showToast(res.message, 'success');
      const passInput = document.getElementById('admin-pass-input');
      if (passInput) passInput.value = newPass;
    } else {
      showToast(res.message, 'error');
    }
  }

  showTab(tabKey) {
    const container = document.getElementById('admin-tab-content');
    if (!container) return;
    
    // Highlight sidebar active item
    document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
    const activeItem = document.getElementById(`tab-btn-${tabKey}`);
    if (activeItem) activeItem.classList.add('active');

    const summary = db.getAccountingSummary();

    if (tabKey === 'overview') {
      container.innerHTML = `
        <h3 style="font-size:1.35rem; font-weight:700; color:var(--primary-deep); margin-bottom:1.25rem;">এডমিন ওভারভিউ (System Statistics)</h3>

        <div class="stats-grid" style="margin-bottom:2rem;">
          <div class="stat-card">
            <div class="stat-icon green"><i class="fas fa-wallet"></i></div>
            <div class="stat-value">৳ ${summary.availableBalance.toLocaleString()}</div>
            <div class="stat-label">বর্তমান মোট ফান্ড balance</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon gold"><i class="fas fa-hand-holding-usd"></i></div>
            <div class="stat-value">৳ ${summary.totalIncome.toLocaleString()}</div>
            <div class="stat-label">সর্বমোট অনুদান সংগ্রহ</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon red"><i class="fas fa-receipt"></i></div>
            <div class="stat-value">৳ ${summary.totalExpense.toLocaleString()}</div>
            <div class="stat-label">সর্বমোট ব্যয়িত পরিমাণ</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon blue"><i class="fas fa-user-check"></i></div>
            <div class="stat-value">${summary.totalDonorsCount}</div>
            <div class="stat-label">অনুমোদিত দাতা সংখ্যা</div>
          </div>
        </div>

        <div style="background:var(--bg-warm); border:1px solid var(--border-color); padding:1.5rem; border-radius:var(--radius-md);">
          <h4 style="font-size:1.1rem; font-weight:700; color:var(--primary-deep); margin-bottom:0.75rem;">দ্রুত অ্যাকশন (Quick Management)</h4>
          <div style="display:flex; flex-wrap:wrap; gap:0.75rem;">
            <button class="btn btn-primary btn-sm" onclick="showDonationModal('general')"><i class="fas fa-plus"></i> নতুন অনুদান যোগ করুন</button>
            <button class="btn btn-secondary btn-sm" onclick="adminPanel.showTab('members-manage')"><i class="fas fa-user-check"></i> সদস্য অনুমোদন দেখুন</button>
            <button class="btn btn-gold btn-sm" onclick="adminPanel.showTab('notices-manage')"><i class="fas fa-bullhorn"></i> নোটিশ পোস্ট করুন</button>
            <button class="btn btn-secondary btn-sm" onclick="adminPanel.showTab('audit-logs')"><i class="fas fa-shield-alt"></i> অডিট ট্রেইল দেখুন</button>
          </div>
        </div>

        <div style="background:var(--bg-warm); border:1px solid var(--border-color); padding:1.5rem; border-radius:var(--radius-md); margin-top:1.5rem;">
          <h4 style="font-size:1.1rem; font-weight:700; color:var(--primary-deep); margin-bottom:0.75rem;">হোম পেজ ইমেজ পরিবর্তন</h4>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:1rem;">প্রতিদিনের কার্যক্রমের ছবি হোম পেজের ব্যানারে দেখানোর জন্য এখানে আপলোড করুন।</p>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <input type="file" id="hero-img-upload" accept="image/*" class="form-control" style="max-width:300px;">
            <button class="btn btn-primary" onclick="adminPanel.handleHeroImageUpload()"><i class="fas fa-upload"></i> ছবি পরিবর্তন করুন</button>
          </div>
        </div>
      `;
    } else if (tabKey === 'members-manage') {
      this.renderMembersManager(container);
    } else if (tabKey === 'donors-manage') {
      this.renderDonorsManager(container);
    } else if (tabKey === 'leadership-manage') {
      this.renderLeadershipManager(container);
    } else if (tabKey === 'notices-manage') {
      this.renderNoticesManager(container);
    } else if (tabKey === 'expense-manage') {
      this.renderExpenseManager(container);
    } else if (tabKey === 'audit-logs') {
      this.renderAuditLogs(container);
    } else if (tabKey === 'meal-cal') {
      this.renderMealCalendar(container);
    } else if (tabKey === 'reports-export') {
      this.renderReportExporter(container);
    } else if (tabKey === 'news-manage') {
      this.renderNewsManager(container);
    } else if (tabKey === 'blood-manage') {
      this.renderBloodManager(container);
    } else if (tabKey === 'media-manage') {
      this.renderMediaManager(container);
    } else if (tabKey === 'pages-manage') {
      this.renderPagesManager(container);
    }
  }

  // ==========================================
  // SUBMENU & ARTICLE PAGE CONTENT EDITOR
  // ==========================================
  renderPagesManager(container, selectedKey = 'food') {
    const submenus = [
      { cat: 'আমাদের কথা (About Us)', key: 'about_story', label: 'আমাদের গল্প ও ইতিহাস', icon: 'fas fa-book-open' },
      { cat: 'আমাদের কথা (About Us)', key: 'about_mission', label: 'মিশন ও ভিশন', icon: 'fas fa-bullseye' },
      { cat: 'আমাদের কথা (About Us)', key: 'about_constitution', label: 'গঠনতন্ত্র ভূমিকা ও পরিচিতি', icon: 'fas fa-file-contract' },
      
      { cat: 'কার্যক্রম (Activities)', key: 'food', label: 'এক মুঠো খাবার কর্মসূচি', icon: 'fas fa-utensils' },
      { cat: 'কার্যক্রম (Activities)', key: 'housing', label: 'আশ্রয় ও গৃহ নির্মাণ প্রকল্প', icon: 'fas fa-house-user' },
      { cat: 'কার্যক্রম (Activities)', key: 'education', label: 'শিক্ষা সহায়তা ফান্ড', icon: 'fas fa-book-reader' },
      { cat: 'কার্যক্রম (Activities)', key: 'medical', label: 'চিকিৎসা সহায়তা ফান্ড', icon: 'fas fa-stethoscope' },
      { cat: 'কার্যক্রম (Activities)', key: 'self_emp', label: 'আত্মকর্মসংস্থান প্রকল্প', icon: 'fas fa-tools' },
      { cat: 'কার্যক্রম (Activities)', key: 'elderly', label: 'প্রবীণ সেবা ফান্ড', icon: 'fas fa-hands-helping' },
      { cat: 'কার্যক্রম (Activities)', key: 'religious', label: 'ধর্মীয় ও সামাজিক উন্নয়ন', icon: 'fas fa-mosque' },
      { cat: 'কার্যক্রম (Activities)', key: 'general', label: 'সাধারণ মানবিক কার্যক্রম', icon: 'fas fa-globe' },
      { cat: 'কার্যক্রম (Activities)', key: 'old_age', label: 'বৃদ্ধাশ্রম ড্রিম প্রজেক্ট', icon: 'fas fa-home' }
    ];

    const currentItem = submenus.find(s => s.key === selectedKey) || submenus[0];
    const savedData = db.getSubmenuContent(selectedKey) || {};

    let initialContent = savedData.content || '';
    if (!initialContent && typeof activityArticles !== 'undefined' && activityArticles[selectedKey]) {
      initialContent = activityArticles[selectedKey];
    }

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
        <div>
          <h3 style="font-size:1.35rem; font-weight:700; color:var(--primary-deep);">আমাদের কথা ও কার্যক্রম সাবমেনু কন্টেন্ট এডিটর</h3>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:2px;">ওয়েবসাইটের সকল সাবমেনুর শিরোনাম ও বিস্তারিত নিবন্ধ সম্পাদন ও আপডেট করুন</p>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 280px 1fr; gap:1.5rem; align-items:start;">
        <!-- Submenu List Sidebar -->
        <div style="background:#fff; border-radius:var(--radius-md); border:1px solid var(--border-color); padding:1rem; box-shadow:var(--shadow-sm);">
          <h4 style="font-size:0.95rem; font-weight:700; color:var(--primary-deep); margin-bottom:0.75rem; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem;">
            <i class="fas fa-list"></i> সাবমেনু নির্বাচন করুন
          </h4>
          <div style="display:flex; flex-direction:column; gap:0.4rem; max-height:550px; overflow-y:auto;">
            <div style="font-size:0.78rem; font-weight:700; color:var(--primary-mid); text-transform:uppercase; margin-top:0.3rem;">আমাদের কথা (About Us)</div>
            ${submenus.filter(s => s.cat.includes('আমাদের কথা')).map(s => `
              <button class="btn btn-sm ${s.key === selectedKey ? 'btn-primary' : 'btn-secondary'}" style="text-align:left; justify-content:flex-start; width:100%; padding:0.5rem 0.75rem; font-size:0.85rem;" onclick="adminPanel.renderPagesManager(document.getElementById('admin-tab-content'), '${s.key}')">
                <i class="${s.icon}" style="width:20px;"></i> ${s.label}
              </button>
            `).join('')}

            <div style="font-size:0.78rem; font-weight:700; color:var(--primary-mid); text-transform:uppercase; margin-top:0.8rem;">কার্যক্রম (Activities)</div>
            ${submenus.filter(s => s.cat.includes('কার্যক্রম')).map(s => `
              <button class="btn btn-sm ${s.key === selectedKey ? 'btn-primary' : 'btn-secondary'}" style="text-align:left; justify-content:flex-start; width:100%; padding:0.5rem 0.75rem; font-size:0.85rem;" onclick="adminPanel.renderPagesManager(document.getElementById('admin-tab-content'), '${s.key}')">
                <i class="${s.icon}" style="width:20px;"></i> ${s.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Content Editor Body -->
        <div style="background:#fff; border-radius:var(--radius-md); border:1px solid var(--border-color); padding:1.75rem; box-shadow:var(--shadow-sm);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem; border-bottom:2px solid var(--bg-light); padding-bottom:0.75rem;">
            <h4 style="font-size:1.15rem; font-weight:700; color:var(--primary-deep); display:flex; align-items:center; gap:0.5rem;">
              <i class="${currentItem.icon}" style="color:var(--primary-accent);"></i> ${currentItem.label}
            </h4>
            <span class="badge badge-verified">${currentItem.cat}</span>
          </div>

          <form id="submenu-edit-form" onsubmit="adminPanel.handleSaveSubmenuContent(event, '${selectedKey}')">
            <div class="form-group" style="margin-bottom:1rem;">
              <label class="form-label" style="font-weight:600;">সাবমেনু শিরোনাম (Page Title)</label>
              <input type="text" id="page-title-input" class="form-control" value="${savedData.title || currentItem.label}" required style="font-weight:600;">
            </div>

            <div class="form-group" style="margin-bottom:1.25rem;">
              <label class="form-label" style="font-weight:600; display:flex; justify-content:space-between;">
                <span>বিস্তারিত লেখা/প্রবন্ধ (HTML Content & Full Article)</span>
                <small style="color:var(--text-muted);">সরাসরি টেক্সট বা HTML ট্যাগ ব্যবহারযোগ্য</small>
              </label>
              <textarea id="page-content-input" class="form-control" rows="16" style="font-family:inherit; font-size:0.92rem; line-height:1.7; padding:1rem;" required>${initialContent}</textarea>
            </div>

            <div style="display:flex; gap:0.75rem; justify-content:flex-end;">
              <button type="button" class="btn btn-secondary" onclick="adminPanel.handleResetSubmenuContent('${selectedKey}')" style="background:#ef4444; color:#fff; border:none;">
                <i class="fas fa-undo"></i> ডিফল্টে রিসেট করুন
              </button>
              <button type="submit" class="btn btn-primary btn-lg" style="padding:0.6rem 2rem;">
                <i class="fas fa-save"></i> পরিবর্তন সংরক্ষণ করুন (Save)
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  handleSaveSubmenuContent(e, key) {
    e.preventDefault();
    const title = document.getElementById('page-title-input').value;
    const content = document.getElementById('page-content-input').value;

    db.saveSubmenuContent(key, title, content);
    showToast(`'${title}' সাবমেনুর তথ্য সফলভাবে আপডেট করা হয়েছে!`, 'success');
    this.renderPagesManager(document.getElementById('admin-tab-content'), key);
  }

  handleResetSubmenuContent(key) {
    if (confirm('আপনি কি এই সাবমেনুর কন্টেন্ট ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?')) {
      db.deleteSubmenuContent(key);
      showToast('সাবমেনু ডিফল্ট কন্টেন্টে রিসেট করা হয়েছে।', 'success');
      this.renderPagesManager(document.getElementById('admin-tab-content'), key);
    }
  }

  // ==========================================
  // 1. MEMBER APPROVAL, EDIT & DELETE MANAGER
  // ==========================================
  renderMembersManager(container, filterStatus = 'all') {
    const isApproved = m => m.status === 'Approved' || m.status === 'Verified' || m.status === 'অনুমোদিত';
    const isPending = m => m.status === 'Pending' || m.status === 'অপেক্ষমাণ';
    const isRejected = m => m.status === 'Rejected' || m.status === 'বাতিল';

    const allList = db.data.members || [];
    let members = allList;
    if (filterStatus === 'pending') members = allList.filter(isPending);
    else if (filterStatus === 'approved') members = allList.filter(isApproved);
    else if (filterStatus === 'rejected') members = allList.filter(isRejected);

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
        <div>
          <h3 style="font-size:1.3rem; font-weight:700; color:var(--primary-deep);">সদস্য অনুমোদন ও পরিচিতি রেজিস্টার</h3>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:2px;">আবেদনকৃত সদস্যদের অনুমোদন, সংশোধন ও ডিলিট করুন</p>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <button class="btn btn-primary btn-sm" onclick="adminPanel.showAddMemberModal()"><i class="fas fa-user-plus"></i> নতুন সদস্য যোগ করুন</button>
        </div>
      </div>

      <div style="display:flex; gap:0.5rem; margin-bottom:1.25rem; flex-wrap:wrap;">
        <button class="btn btn-sm ${filterStatus === 'all' ? 'btn-primary' : 'btn-secondary'}" onclick="adminPanel.renderMembersManager(document.getElementById('admin-tab-content'), 'all')">সকল (${allList.length})</button>
        <button class="btn btn-sm ${filterStatus === 'pending' ? 'btn-primary' : 'btn-secondary'}" onclick="adminPanel.renderMembersManager(document.getElementById('admin-tab-content'), 'pending')">অপেক্ষমাণ (${allList.filter(isPending).length})</button>
        <button class="btn btn-sm ${filterStatus === 'approved' ? 'btn-primary' : 'btn-secondary'}" onclick="adminPanel.renderMembersManager(document.getElementById('admin-tab-content'), 'approved')">অনুমোদিত (${allList.filter(isApproved).length})</button>
        <button class="btn btn-sm ${filterStatus === 'rejected' ? 'btn-primary' : 'btn-secondary'}" onclick="adminPanel.renderMembersManager(document.getElementById('admin-tab-content'), 'rejected')">বাতিলকৃত (${allList.filter(isRejected).length})</button>
      </div>

      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>আইডি</th>
              <th>সদস্যের নাম</th>
              <th>ফোন / জেলা</th>
              <th>ক্যাটাগরি</th>
              <th>প্রতিশ্রুত টাকা</th>
              <th>স্ট্যাটাস</th>
              <th>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            ${members.map(m => `
              <tr>
                <td><strong>${m.id}</strong></td>
                <td>
                  <div style="display:flex; align-items:center; gap:0.5rem;">
                    ${m.profileImage ? `<img src="${m.profileImage}" style="width:32px; height:32px; border-radius:50%; object-fit:cover;">` : ''}
                    <div>
                      <strong>${m.name}</strong> ${m.isProbashi ? '<span class="badge" style="background:#0284c7; color:#fff; font-size:0.65rem;">প্রবাসী</span>' : ''}<br>
                      <small style="color:var(--text-muted);">${m.occupation || ''}</small>
                    </div>
                  </div>
                </td>
                <td>
                  ${m.phone}<br>
                  <small style="color:var(--text-muted);">${m.district}</small>
                </td>
                <td><span class="badge badge-pending">${m.typeLabelBn || m.type}</span></td>
                <td><strong style="color:var(--primary-mid);">৳ ${Number(m.amount).toLocaleString()}</strong></td>
                <td>
                  <span class="badge ${isApproved(m) ? 'badge-verified' : isPending(m) ? 'badge-pending' : 'badge-rejected'}">
                    ${isApproved(m) ? 'অনুমোদিত' : isPending(m) ? 'অপেক্ষমাণ' : 'বাতিল'}
                  </span>
                </td>
                <td>
                  <div style="display:flex; gap:0.35rem; flex-wrap:nowrap;">
                    ${!isApproved(m) ? `
                      <button class="btn btn-sm btn-primary" style="padding:0.25rem 0.5rem; font-size:0.75rem; background:var(--primary-mid);" onclick="adminPanel.changeMemberStatus('${m.id}', 'Approved')" title="অনুমোদন করুন">
                        <i class="fas fa-check"></i>
                      </button>
                    ` : ''}
                    ${!isRejected(m) ? `
                      <button class="btn btn-sm btn-secondary" style="padding:0.25rem 0.5rem; font-size:0.75rem; background:var(--accent-red); color:#fff; border:none;" onclick="adminPanel.changeMemberStatus('${m.id}', 'Rejected')" title="বাতিল করুন">
                        <i class="fas fa-times"></i>
                      </button>
                    ` : ''}
                    <button class="btn btn-sm btn-secondary" style="padding:0.25rem 0.5rem; font-size:0.75rem;" onclick="adminPanel.showAddMemberModal('${m.id}')" title="সম্পাদনা">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-secondary" style="padding:0.25rem 0.5rem; font-size:0.75rem; background:#dc2626; color:#fff; border:none;" onclick="adminPanel.confirmDeleteMember('${m.id}')" title="ডিলিট করুন">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  changeMemberStatus(memberId, status) {
    if (db.approveMember(memberId, status)) {
      showToast(`সদস্যের স্ট্যাটাস পরিবর্তন করে '${status === 'Approved' ? 'অনুমোদিত' : 'বাতিল'}' করা হয়েছে!`, 'success');
      this.showTab('members-manage');
    }
  }

  showAddMemberModal(memberId = null) {
    const isEdit = Boolean(memberId);
    const m = isEdit ? db.data.members.find(x => x.id === memberId) : null;
    const title = isEdit ? 'সদস্যের তথ্য সম্পাদনা করুন' : 'নতুন সদস্যের পূর্ণ তথ্য সংযোজন';

    const formHtml = `
      <form onsubmit="adminPanel.handleSaveMemberSubmit(event, '${memberId || ''}'); return false;" style="background:#ffffff; padding:0.5rem; border-radius:var(--radius-md);">
        <div class="form-group" style="margin-bottom:0.85rem;">
          <label class="form-label" style="font-weight:600; color:var(--text-dark);">সদস্যের পূর্ণ নাম <span style="color:red;">*</span></label>
          <input type="text" id="adm-mem-name" class="form-control" required placeholder="যেমন: মো: নাজমুল ইসলাম" value="${m ? m.name : ''}">
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:0.85rem;">
          <div class="form-group">
            <label class="form-label" style="font-weight:600; color:var(--text-dark);">মোবাইল নম্বর <span style="color:red;">*</span></label>
            <input type="tel" id="adm-mem-phone" class="form-control" required placeholder="017XXXXXXXX" value="${m ? m.phone : ''}">
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight:600; color:var(--text-dark);">হোয়াটসঅ্যাপ নম্বর</label>
            <input type="tel" id="adm-mem-whatsapp" class="form-control" placeholder="017XXXXXXXX" value="${m ? (m.whatsapp || m.phone) : ''}">
          </div>
        </div>

        <div class="form-group" style="margin-bottom:0.85rem;">
          <label class="form-label" style="font-weight:600; color:var(--text-dark);">পেশা, পদবী ও ব্যবসা/প্রতিষ্ঠানের নাম</label>
          <input type="text" id="adm-mem-occupation" class="form-control" placeholder="যেমন: রেমিটেন্স যোদ্ধা, কুয়েত প্রবাসী / স্বত্বাধিকারী: মেসার্স রিসান ট্রেড" value="${m ? (m.occupation || '') : ''}">
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:0.85rem;">
          <div class="form-group">
            <label class="form-label" style="font-weight:600; color:var(--text-dark);">জেলা / পূর্ণ ঠিকানা</label>
            <input type="text" id="adm-mem-district" class="form-control" placeholder="যেমন: রৌমারী, কুড়িগ্রাম" value="${m ? (m.district || '') : ''}">
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight:600; color:var(--text-dark);">সদস্য ক্যাটাগরি</label>
            <select id="adm-mem-type" class="form-control">
              <option value="Monthly" ${m && m.type === 'Monthly' ? 'selected' : ''}>মাসিক দায়িত্বশীল সদস্য (Monthly Member)</option>
              <option value="3-Month" ${m && m.type === '3-Month' ? 'selected' : ''}>৩/৬/১২ মাসের দাতা (3-Month Donor)</option>
              <option value="Life" ${m && m.type === 'Life' ? 'selected' : ''}>আজীবন সদস্য (Life Member)</option>
              <option value="Volunteer" ${m && m.type === 'Volunteer' ? 'selected' : ''}>স্বেচ্ছাসেবক (Volunteer)</option>
            </select>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:0.85rem;">
          <div class="form-group">
            <label class="form-label" style="font-weight:600; color:var(--text-dark);">অনুদান / প্রতিশ্রুত টাকা (৳)</label>
            <input type="number" id="adm-mem-amount" class="form-control" required value="${m ? m.amount : 1000}" min="0">
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight:600; color:var(--text-dark);">অনুমোদন স্ট্যাটাস</label>
            <select id="adm-mem-status" class="form-control">
              <option value="Approved" ${!m || m.status === 'Approved' || m.status === 'Verified' ? 'selected' : ''}>অনুমোদিত (Approved)</option>
              <option value="Pending" ${m && m.status === 'Pending' ? 'selected' : ''}>অপেক্ষমাণ (Pending)</option>
            </select>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:0.85rem; background:rgba(5,150,105,0.04); padding:0.85rem; border-radius:var(--radius-md); border:1px dashed rgba(5,150,105,0.3);">
          <label class="form-label" style="font-weight:600; color:var(--primary-deep); margin-bottom:0.35rem; display:flex; align-items:center; gap:0.4rem;">
            <i class="fas fa-camera" style="color:var(--primary-mid);"></i> সদস্যের ছবি (গ্যালারি/ক্যামেরা থেকে ফাইল অথবা অনলাইন লিংক)
          </label>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; margin-bottom:0.5rem;">
            <div>
              <label style="font-size:0.78rem; color:var(--text-muted); display:block; margin-bottom:3px;">📷 গ্যালারি / ফাইল থেকে বেছে নিন:</label>
              <input type="file" id="adm-mem-file" class="form-control" accept="image/*" style="font-size:0.8rem; padding:0.35rem;" onchange="adminPanel.handleMemberPhotoUpload(event)">
            </div>
            <div>
              <label style="font-size:0.78rem; color:var(--text-muted); display:block; margin-bottom:3px;">🔗 অথবা ছবির ওয়েব লিংক (PostIMG/URL):</label>
              <input type="text" id="adm-mem-image" class="form-control" placeholder="https://i.postimg.cc/..." value="${m ? (m.profileImage || '') : ''}" oninput="document.getElementById('adm-mem-preview').src=this.value; document.getElementById('adm-mem-preview').style.display=this.value?'block':'none';">
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:0.75rem; margin-top:0.35rem;">
            <img id="adm-mem-preview" src="${m && m.profileImage ? m.profileImage : ''}" style="width:50px; height:50px; border-radius:50%; object-fit:cover; border:2px solid var(--primary-mid); display:${m && m.profileImage ? 'block' : 'none'};">
            <span style="font-size:0.78rem; color:var(--text-muted);">ছবি সিলেক্ট বা লিংক দিলে এখানে লাইভ প্রিভিউ দেখতে পাবেন।</span>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:1.25rem;">
          <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer; font-weight:600; color:var(--primary-deep);">
            <input type="checkbox" id="adm-mem-probashi" ${m && m.isProbashi ? 'checked' : ''}>
            <span>প্রবাসী / রেমিটেন্স যোদ্ধা সদস্য (Probashi Member)</span>
          </label>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:1rem;">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">বাতিল</button>
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-save"></i> ${isEdit ? 'তথ্য আপডেট করুন' : 'সদস্য তথ্য জমা দিন'}
          </button>
        </div>
      </form>
    `;

    openModal(title, formHtml);
  }

  handleMemberPhotoUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast('ছবি সাইজ সর্বোচ্চ ৫ মেগাবাইট হতে হবে!', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = function(evt) {
      const dataUrl = evt.target.result;
      const urlInput = document.getElementById('adm-mem-image');
      if (urlInput) urlInput.value = dataUrl;
      const previewImg = document.getElementById('adm-mem-preview');
      if (previewImg) {
        previewImg.src = dataUrl;
        previewImg.style.display = 'block';
      }
    };
    reader.readAsDataURL(file);
  }

  handleSaveMemberSubmit(e, memberId) {
    if (e && e.preventDefault) e.preventDefault();
    const name = document.getElementById('adm-mem-name').value.trim();
    const phone = document.getElementById('adm-mem-phone').value.trim();
    const whatsapp = document.getElementById('adm-mem-whatsapp').value.trim() || phone;
    const occupation = document.getElementById('adm-mem-occupation').value.trim();
    const district = document.getElementById('adm-mem-district').value.trim();
    const type = document.getElementById('adm-mem-type').value;
    const amount = Number(document.getElementById('adm-mem-amount').value) || 0;
    const status = document.getElementById('adm-mem-status').value;
    const profileImage = document.getElementById('adm-mem-image').value.trim() || null;
    const isProbashi = document.getElementById('adm-mem-probashi').checked;

    let typeLabelBn = 'মাসিক দায়িত্বশীল সদস্য';
    if (type === '3-Month') typeLabelBn = '৩/৬/১২ মাসের দাতা';
    else if (type === 'Life') typeLabelBn = 'আজীবন সদস্য';
    else if (type === 'Volunteer') typeLabelBn = 'স্বেচ্ছাসেবক';

    if (memberId) {
      const m = db.data.members.find(x => x.id === memberId);
      if (m) {
        m.name = name;
        m.phone = phone;
        m.whatsapp = whatsapp;
        m.occupation = occupation;
        m.district = district;
        m.type = type;
        m.typeLabelBn = typeLabelBn;
        m.amount = amount;
        m.status = status;
        m.profileImage = profileImage;
        m.isProbashi = isProbashi;
      }
      showToast('সদস্যের পূর্ণ তথ্য সফলভাবে আপডেট করা হয়েছে!', 'success');
    } else {
      const count = db.data.members.length + 1;
      const newMem = {
        id: `HRF-${String(count).padStart(3, '0')}`,
        name: name,
        phone: phone,
        whatsapp: whatsapp,
        district: district,
        occupation: occupation,
        type: type,
        typeLabelBn: typeLabelBn,
        frequency: type === '3-Month' ? '3-Month' : 'Monthly',
        amount: amount,
        joiningDate: new Date().toISOString().split('T')[0],
        status: status,
        avatarBg: '#059669',
        profileImage: profileImage,
        isAnonymous: false,
        isProbashi: isProbashi
      };
      db.data.members.unshift(newMem);
      showToast('নতুন সদস্যের পূর্ণ তথ্য সফলভাবে জমা ও নিবন্ধিত হয়েছে!', 'success');
    }

    db.save();
    closeModal();
    this.showTab('members-manage');
  }

  promptAddMember() {
    this.showAddMemberModal();
  }

  promptEditMember(memberId) {
    this.showAddMemberModal(memberId);
  }

  confirmDeleteMember(memberId) {
    if (confirm(`আপনি কি সত্যিই সদস্য '${memberId}' স্থায়ীভাবে ডিলিট করতে চান?`)) {
      if (db.deleteMember(memberId)) {
        showToast('সদস্য রেকর্ড ডিলিট করা হয়েছে!', 'success');
        this.showTab('members-manage');
      }
    }
  }

  confirmClearAllMembers() {
    if (confirm('আপনি কি নিশ্চিত যে সকল সদস্যের তথ্য চিরতরে মুছে ফেলতে চান? এই কাজটি আর ফিরিয়ে নেওয়া যাবে না।')) {
      db.clearAllMembers();
      showToast('সকল সদস্যের তথ্য সফলভাবে বাতিল ও ডিলিট করা হয়েছে।', 'success');
      this.showTab('members-manage');
    }
  }

  // ==========================================
  // 2. DONORS & FINANCIAL DELETION MANAGER
  // ==========================================
  renderDonorsManager(container) {
    const data = db.getDonorsPaginated(1, 15);

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
        <div>
          <h3 style="font-size:1.3rem; font-weight:700; color:var(--primary-deep);">অনুরোধ ও দাতা রেজিস্টার (5,000+ Scalable)</h3>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:2px;">অনুদানের তথ্য সংশোধন, স্থায়ী ডিলিট (অডিট ট্রেইল সহ) ও WhatsApp রসিদ</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="showDonationModal('general')"><i class="fas fa-plus"></i> এন্ট্রি যোগ করুন</button>
      </div>

      <div style="display:flex; gap:1rem; margin-bottom:1.25rem;">
        <input type="text" id="admin-donor-search" class="form-control" placeholder="আইডি, দাতার নাম, ফোন বা পেমেন্ট রেফারেন্স খুঁজুন..." oninput="adminPanel.filterDonorsTable()">
      </div>

      <div class="table-responsive">
        <table class="custom-table" id="admin-donors-table">
          <thead>
            <tr>
              <th>আইডি</th>
              <th>তারিখ</th>
              <th>দাতার নাম</th>
              <th>ফোন</th>
              <th>ফান্ড</th>
              <th>পরিমাণ</th>
              <th>অ্যাকশন (সংশোধন / ডিলিট / WhatsApp)</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map(d => `
              <tr>
                <td><strong>${d.id}</strong></td>
                <td>${d.date}</td>
                <td>${d.isAnonymous ? 'Anonymous Donor' : d.donorName}</td>
                <td>${d.donorPhone || 'N/A'}</td>
                <td>${d.fund}</td>
                <td><strong style="color:var(--primary-mid);">৳ ${Number(d.amount).toLocaleString()}</strong></td>
                <td>
                  <div style="display:flex; gap:0.35rem;">
                    <button class="btn btn-sm btn-secondary" onclick="adminPanel.promptCorrection('${d.id}', ${d.amount})" title="পরিমাণ সংশোধন">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-secondary" style="background:#dc2626; color:#fff; border:none;" onclick="adminPanel.promptDeleteDonation('${d.id}')" title="স্থায়ী ডিলিট (অডিট অটোলগ)">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                    <button class="btn btn-sm btn-primary" style="background:#25D366; border:none;" onclick="receiptGen.sendReceiptWhatsApp('${d.id}')" title="WhatsApp-এ রসিদ পাঠান">
                      <i class="fab fa-whatsapp"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  filterDonorsTable() {
    const query = document.getElementById('admin-donor-search').value;
    const res = db.getDonorsPaginated(1, 20, query);
    const tbody = document.querySelector('#admin-donors-table tbody');
    if (!tbody) return;

    tbody.innerHTML = res.items.map(d => `
      <tr>
        <td><strong>${d.id}</strong></td>
        <td>${d.date}</td>
        <td>${d.isAnonymous ? 'Anonymous Donor' : d.donorName}</td>
        <td>${d.donorPhone || 'N/A'}</td>
        <td>${d.fund}</td>
        <td><strong style="color:var(--primary-mid);">৳ ${Number(d.amount).toLocaleString()}</strong></td>
        <td>
          <div style="display:flex; gap:0.35rem;">
            <button class="btn btn-sm btn-secondary" onclick="adminPanel.promptCorrection('${d.id}', ${d.amount})" title="পরিমাণ সংশোধন">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-secondary" style="background:#dc2626; color:#fff; border:none;" onclick="adminPanel.promptDeleteDonation('${d.id}')" title="স্থায়ী ডিলিট (অডিট অটোলগ)">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button class="btn btn-sm btn-primary" style="background:#25D366; border:none;" onclick="receiptGen.sendReceiptWhatsApp('${d.id}')" title="WhatsApp-এ রসিদ পাঠান">
              <i class="fab fa-whatsapp"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  promptCorrection(donationId, currentAmount) {
    if (!auth.hasPermission('correct_finance')) {
      showToast('আপনার অর্থ সংশোধনের অনুমতি নেই! (Permission Denied)', 'error');
      return;
    }

    const newAmt = prompt(`নতুন সঠিক অনুদানের পরিমাণ লিখুন (বর্তমান: ৳${currentAmount}):`, currentAmount);
    if (newAmt === null || newAmt === '' || isNaN(newAmt)) return;

    const reason = prompt('সংশোধনের সুস্পষ্ট কারণ লিখুন (অডিট ট্রেইলের জন্য আবশ্যক):', 'ভাউচার পেপারস যাচাইজনিত ভুল সংশোধন');
    if (!reason) {
      alert('সংশোধনের কারণ লেখা বাধ্যতামূলক!');
      return;
    }

    const admin = auth.currentAdmin.name;
    db.correctDonation(donationId, newAmt, admin, reason);
    showToast('অনুদানের তথ্য সফলভাবে আপডেট ও অডিট লগে সংরক্ষিত হয়েছে!', 'success');
    this.showTab('donors-manage');
    transparency.renderTransparencyDashboard();
  }

  promptDeleteDonation(donationId) {
    if (!auth.hasPermission('correct_finance')) {
      showToast('আপনার আর্থিক রেকর্ড ডিলিট করার অনুমতি নেই! (Permission Denied)', 'error');
      return;
    }

    if (!confirm(`আপনি কি সত্যিই অনুদান রেকর্ড '${donationId}' স্থায়ীভাবে অপসারণ করতে চান?`)) {
      return;
    }

    const reason = prompt('রেকর্ড অপসারণের বাধ্যতামূলক কারণ লিখুন (অডিট ট্রেইলের জন্য):', 'ভুল বা ডুপ্লিকেট ভাউচার এন্ট্রি বাতিলকরণ');
    if (!reason) {
      alert('ডিলিটের কারণ লেখা বাধ্যতামূলক!');
      return;
    }

    const admin = auth.currentAdmin.name;
    if (db.deleteDonation(donationId, admin, reason)) {
      showToast('অনুদান রেকর্ড ডিলিট করা হয়েছে এবং অডিট ট্রেইলে সংরক্ষিত হয়েছে!', 'success');
      this.showTab('donors-manage');
      transparency.renderTransparencyDashboard();
    }
  }

  // ==========================================
  // 3. EXECUTIVE COMMITTEE & ADVISORY EDITOR
  // ==========================================
  // 3. EXECUTIVE COMMITTEE & ADVISORS MANAGER
  // ==========================================
  renderLeadershipManager(container, subTab = 'committee') {
    const committee = db.data.executiveCommittee || [];
    const advisors = db.data.advisors || [];

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
        <div>
          <h3 style="font-size:1.3rem; font-weight:700; color:var(--primary-deep);">পরিচালনা পর্ষদ ও উপদেষ্টা পরিষদ সম্পাদক</h3>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:2px;">${committee.length} সদস্যের পরিচালনা পর্ষদ ও ${advisors.length} সদস্যের উপদেষ্টা পরিষদের ছবিসহ বিস্তারিত তথ্য ব্যবস্থাপনা</p>
        </div>
      </div>

      <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem;">
        <button class="btn btn-sm ${subTab === 'committee' ? 'btn-primary' : 'btn-secondary'}" onclick="adminPanel.renderLeadershipManager(document.getElementById('admin-tab-content'), 'committee')">
          <i class="fas fa-users-cog"></i> পরিচালনা পর্ষদ (${committee.length} সদস্য)
        </button>
        <button class="btn btn-sm ${subTab === 'advisors' ? 'btn-primary' : 'btn-secondary'}" onclick="adminPanel.renderLeadershipManager(document.getElementById('admin-tab-content'), 'advisors')">
          <i class="fas fa-user-tie"></i> উপদেষ্টা পরিষদ (${advisors.length} সদস্য)
        </button>
      </div>

      ${subTab === 'committee' ? `
        <div style="display:flex; justify-content:flex-end; margin-bottom:1rem;">
          <button class="btn btn-primary btn-sm" onclick="adminPanel.openCommitteeMemberModal()"><i class="fas fa-user-plus"></i> + নতুন পর্ষদ সদস্য যোগ করুন</button>
        </div>
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>ছবি</th>
                <th>ক্রম</th>
                <th>পদবী / দায়িত্ব</th>
                <th>সদস্যের নাম (বাংলা ও ইংরেজি)</th>
                <th>যোগাযোগ ও এলাকা</th>
                <th>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              ${committee.map((item, index) => {
                const imgHtml = item.image 
                  ? `<img src="${item.image}" style="width:42px; height:42px; border-radius:50%; object-fit:cover; border:2px solid var(--primary-mid);">`
                  : `<div style="width:42px; height:42px; border-radius:50%; background:var(--primary-mid); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700;">${(item.nameBn || item.titleBn || 'P').charAt(0)}</div>`;
                return `
                <tr>
                  <td>${imgHtml}</td>
                  <td><strong>${item.pos || index + 1}</strong></td>
                  <td><span class="badge badge-verified">${item.titleBn}</span>${item.titleEn ? `<div style="font-size:0.75rem; color:var(--text-muted);">${item.titleEn}</div>` : ''}</td>
                  <td>
                    <strong>${item.nameBn}</strong>
                    ${item.nameEn ? `<div style="font-size:0.78rem; color:var(--text-muted);">${item.nameEn}</div>` : ''}
                  </td>
                  <td style="font-size:0.85rem;">
                    ${item.phone ? `<div><i class="fas fa-phone-alt" style="color:var(--primary-accent);"></i> ${item.phone}</div>` : ''}
                    ${item.district ? `<div><i class="fas fa-map-marker-alt" style="color:var(--accent-gold);"></i> ${item.district}</div>` : ''}
                    ${!item.phone && !item.district ? `<span style="color:var(--text-light);">-</span>` : ''}
                  </td>
                  <td>
                    <div style="display:flex; gap:0.35rem;">
                      <button class="btn btn-sm btn-secondary" onclick="adminPanel.openCommitteeMemberModal(${index})" title="সম্পাদনা">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn btn-sm btn-secondary" style="background:#dc2626; color:#fff; border:none;" onclick="adminPanel.confirmDeleteCommitteeMember(${index})" title="ডিলিট">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `;}).join('')}
            </tbody>
          </table>
        </div>
      ` : `
        <div style="display:flex; justify-content:flex-end; margin-bottom:1rem;">
          <button class="btn btn-primary btn-sm" onclick="adminPanel.openAdvisorModal()"><i class="fas fa-user-plus"></i> + নতুন উপদেষ্টা যোগ করুন</button>
        </div>
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>ছবি</th>
                <th>আইডি</th>
                <th>উপদেষ্টার ভূমিকা / খাত</th>
                <th>উপদেষ্টার নাম (বাংলা ও ইংরেজি)</th>
                <th>যোগাযোগ ও এলাকা</th>
                <th>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              ${advisors.map(adv => {
                const imgHtml = adv.image 
                  ? `<img src="${adv.image}" style="width:42px; height:42px; border-radius:50%; object-fit:cover; border:2px solid var(--accent-gold);">`
                  : `<div style="width:42px; height:42px; border-radius:50%; background:var(--accent-gold); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700;">${(adv.nameBn || adv.roleBn || 'A').charAt(0)}</div>`;
                return `
                <tr>
                  <td>${imgHtml}</td>
                  <td><strong>${adv.id}</strong></td>
                  <td><span class="badge badge-pending">${adv.roleBn}</span>${adv.roleEn ? `<div style="font-size:0.75rem; color:var(--text-muted);">${adv.roleEn}</div>` : ''}</td>
                  <td>
                    <strong>${adv.nameBn}</strong>
                    ${adv.nameEn ? `<div style="font-size:0.78rem; color:var(--text-muted);">${adv.nameEn}</div>` : ''}
                  </td>
                  <td style="font-size:0.85rem;">
                    ${adv.phone ? `<div><i class="fas fa-phone-alt" style="color:var(--primary-accent);"></i> ${adv.phone}</div>` : ''}
                    ${adv.district ? `<div><i class="fas fa-map-marker-alt" style="color:var(--accent-gold);"></i> ${adv.district}</div>` : ''}
                    ${!adv.phone && !adv.district ? `<span style="color:var(--text-light);">-</span>` : ''}
                  </td>
                  <td>
                    <div style="display:flex; gap:0.35rem;">
                      <button class="btn btn-sm btn-secondary" onclick="adminPanel.openAdvisorModal(${adv.id})" title="সম্পাদনা">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn btn-sm btn-secondary" style="background:#dc2626; color:#fff; border:none;" onclick="adminPanel.confirmDeleteAdvisor(${adv.id})" title="ডিলিট">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `;}).join('')}
            </tbody>
          </table>
        </div>
      `}
    `;
  }

  openCommitteeMemberModal(index = null) {
    const isEdit = index !== null && index !== undefined;
    const member = isEdit ? db.data.executiveCommittee[index] : null;

    const modalTitle = isEdit ? 'পর্ষদ সদস্যের তথ্য সম্পাদনা করুন' : 'নতুন পরিচালনা পর্ষদ সদস্য যোগ করুন';

    const currentImg = member && member.image ? member.image : '';

    const html = `
      <form id="committee-member-form" onsubmit="adminPanel.handleCommitteeMemberSubmit(event, ${isEdit ? index : 'null'})">
        <div style="text-align:center; margin-bottom:1.5rem;">
          <div style="position:relative; display:inline-block; cursor:pointer;" onclick="document.getElementById('member-img-file').click()" title="ছবি পরিবর্তন করতে ক্লিক করুন">
            <img id="member-img-preview" src="${currentImg || 'https://i.postimg.cc/mZMqHhZV/ahsan-kajol.jpg'}" style="width:100px; height:100px; border-radius:50%; object-fit:cover; border:3px solid var(--primary-mid); box-shadow:0 4px 12px rgba(0,0,0,0.15);" onerror="this.src='https://via.placeholder.com/100?text=Profile'">
            <div style="position:absolute; bottom:2px; right:2px; background:var(--primary-deep); color:#fff; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.2);">
              <i class="fas fa-camera" style="font-size:0.9rem;"></i>
            </div>
          </div>
          <input type="file" id="member-img-file" accept="image/*" style="display:none;" onchange="adminPanel.previewMemberImage(this)">
          <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.4rem;">সদস্যের ছবি আপলোড/পরিবর্তন করতে ক্লিক করুন</p>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="form-group">
            <label class="form-label">পদবী / দায়িত্ব (বাংলা) *</label>
            <input type="text" id="com-title-bn" class="form-control" required placeholder="যেমন: সভাপতি / সাধারণ সম্পাদক" value="${member ? (member.titleBn || '') : ''}">
          </div>
          <div class="form-group">
            <label class="form-label">পদবী (ইংরেজি)</label>
            <input type="text" id="com-title-en" class="form-control" placeholder="e.g. President / General Secretary" value="${member ? (member.titleEn || '') : ''}">
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="form-group">
            <label class="form-label">সদস্যের নাম (বাংলা) *</label>
            <input type="text" id="com-name-bn" class="form-control" required placeholder="যেমন: মো: ইকবাল হোসেন" value="${member ? (member.nameBn || '') : ''}">
          </div>
          <div class="form-group">
            <label class="form-label">সদস্যের নাম (ইংরেজি)</label>
            <input type="text" id="com-name-en" class="form-control" placeholder="e.g. Md. Iqbal Hossain" value="${member ? (member.nameEn || '') : ''}">
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="form-group">
            <label class="form-label">মোবাইল নম্বর</label>
            <input type="tel" id="com-phone" class="form-control" placeholder="01XXXXXXXXX" value="${member ? (member.phone || '') : ''}">
          </div>
          <div class="form-group">
            <label class="form-label">জেলা / এলাকা</label>
            <input type="text" id="com-district" class="form-control" placeholder="যেমন: রৌমারী, কুড়িগ্রাম" value="${member ? (member.district || member.address || '') : ''}">
          </div>
        </div>

        <input type="hidden" id="com-img-base64" value="${currentImg}">

        <div style="display:flex; gap:0.75rem; margin-top:1.5rem;">
          <button type="button" class="btn btn-secondary" style="flex:1;" onclick="closeModal()">বাতিল</button>
          <button type="submit" class="btn btn-primary" style="flex:1;"><i class="fas fa-save"></i> ${isEdit ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}</button>
        </div>
      </form>
    `;

    openModal(modalTitle, html);
  }

  previewMemberImage(input) {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 300;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);

          const previewEl = document.getElementById('member-img-preview');
          const inputEl = document.getElementById('com-img-base64');
          if (previewEl) previewEl.src = compressedBase64;
          if (inputEl) inputEl.value = compressedBase64;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  handleCommitteeMemberSubmit(e, index) {
    e.preventDefault();
    const titleBn = document.getElementById('com-title-bn').value;
    const titleEn = document.getElementById('com-title-en').value;
    const nameBn = document.getElementById('com-name-bn').value;
    const nameEn = document.getElementById('com-name-en').value;
    const phone = document.getElementById('com-phone').value;
    const district = document.getElementById('com-district').value;
    const image = document.getElementById('com-img-base64').value;

    const dataObj = { titleBn, titleEn, nameBn, nameEn, phone, district, image };

    if (index !== null && index !== undefined && index !== 'null') {
      db.updateCommitteeMember(Number(index), dataObj);
      showToast('পর্ষদ সদস্যের তথ্য সফলভাবে আপডেট করা হয়েছে!', 'success');
    } else {
      db.addCommitteeMember(dataObj);
      showToast('নতুন পর্ষদ সদস্য সফলভাবে যোগ করা হয়েছে!', 'success');
    }

    closeModal();
    this.renderLeadershipManager(document.getElementById('admin-tab-content'), 'committee');
  }

  confirmDeleteCommitteeMember(index) {
    if (confirm('আপনি কি সত্যিই এই পর্ষদ সদস্য অপসারণ করতে চান?')) {
      db.deleteCommitteeMember(index);
      showToast('পর্ষদ সদস্য অপসারণ করা হয়েছে!', 'success');
      this.renderLeadershipManager(document.getElementById('admin-tab-content'), 'committee');
    }
  }

  openAdvisorModal(advisorId = null) {
    const isEdit = advisorId !== null && advisorId !== undefined;
    const adv = isEdit ? db.data.advisors.find(a => Number(a.id) === Number(advisorId)) : null;

    const modalTitle = isEdit ? 'উপদেষ্টার তথ্য সম্পাদনা করুন' : 'নতুন উপদেষ্টা যোগ করুন';

    const currentImg = adv && adv.image ? adv.image : '';

    const html = `
      <form id="advisor-form" onsubmit="adminPanel.handleAdvisorSubmit(event, ${isEdit ? advisorId : 'null'})">
        <div style="text-align:center; margin-bottom:1.5rem;">
          <div style="position:relative; display:inline-block; cursor:pointer;" onclick="document.getElementById('adv-img-file').click()" title="ছবি পরিবর্তন করতে ক্লিক করুন">
            <img id="adv-img-preview" src="${currentImg || 'https://i.postimg.cc/mZMqHhZV/ahsan-kajol.jpg'}" style="width:100px; height:100px; border-radius:50%; object-fit:cover; border:3px solid var(--accent-gold); box-shadow:0 4px 12px rgba(0,0,0,0.15);" onerror="this.src='https://via.placeholder.com/100?text=Profile'">
            <div style="position:absolute; bottom:2px; right:2px; background:var(--accent-gold); color:#fff; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.2);">
              <i class="fas fa-camera" style="font-size:0.9rem;"></i>
            </div>
          </div>
          <input type="file" id="adv-img-file" accept="image/*" style="display:none;" onchange="adminPanel.previewAdvisorImage(this)">
          <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.4rem;">উপদেষ্টার ছবি আপলোড/পরিবর্তন করতে ক্লিক করুন</p>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="form-group">
            <label class="form-label">উপদেষ্টার ভূমিকা / খাত (বাংলা) *</label>
            <input type="text" id="adv-role-bn" class="form-control" required placeholder="যেমন: প্রধান উপদেষ্টা / আইন উপদেষ্টা" value="${adv ? (adv.roleBn || '') : ''}">
          </div>
          <div class="form-group">
            <label class="form-label">ভূমিকা / খাত (ইংরেজি)</label>
            <input type="text" id="adv-role-en" class="form-control" placeholder="e.g. Chief Advisor / Legal Advisor" value="${adv ? (adv.roleEn || '') : ''}">
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="form-group">
            <label class="form-label">উপদেষ্টার নাম (বাংলা) *</label>
            <input type="text" id="adv-name-bn" class="form-control" required placeholder="যেমন: প্রফেসর ড. আনিসুর রহমান" value="${adv ? (adv.nameBn || '') : ''}">
          </div>
          <div class="form-group">
            <label class="form-label">উপদেষ্টার নাম (ইংরেজি)</label>
            <input type="text" id="adv-name-en" class="form-control" placeholder="e.g. Prof. Dr. Anisur Rahman" value="${adv ? (adv.nameEn || '') : ''}">
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="form-group">
            <label class="form-label">মোবাইল নম্বর</label>
            <input type="tel" id="adv-phone" class="form-control" placeholder="01XXXXXXXXX" value="${adv ? (adv.phone || '') : ''}">
          </div>
          <div class="form-group">
            <label class="form-label">জেলা / এলাকা</label>
            <input type="text" id="adv-district" class="form-control" placeholder="যেমন: ঢাকা" value="${adv ? (adv.district || adv.address || '') : ''}">
          </div>
        </div>

        <input type="hidden" id="adv-img-base64" value="${currentImg}">

        <div style="display:flex; gap:0.75rem; margin-top:1.5rem;">
          <button type="button" class="btn btn-secondary" style="flex:1;" onclick="closeModal()">বাতিল</button>
          <button type="submit" class="btn btn-primary" style="flex:1;"><i class="fas fa-save"></i> ${isEdit ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}</button>
        </div>
      </form>
    `;

    openModal(modalTitle, html);
  }

  previewAdvisorImage(input) {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 300;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);

          const previewEl = document.getElementById('adv-img-preview');
          const inputEl = document.getElementById('adv-img-base64');
          if (previewEl) previewEl.src = compressedBase64;
          if (inputEl) inputEl.value = compressedBase64;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  handleAdvisorSubmit(e, advisorId) {
    e.preventDefault();
    const roleBn = document.getElementById('adv-role-bn').value;
    const roleEn = document.getElementById('adv-role-en').value;
    const nameBn = document.getElementById('adv-name-bn').value;
    const nameEn = document.getElementById('adv-name-en').value;
    const phone = document.getElementById('adv-phone').value;
    const district = document.getElementById('adv-district').value;
    const image = document.getElementById('adv-img-base64').value;

    const dataObj = { roleBn, roleEn, nameBn, nameEn, phone, district, image };

    if (advisorId !== null && advisorId !== undefined && advisorId !== 'null') {
      db.updateAdvisor(Number(advisorId), dataObj);
      showToast('উপদেষ্টার তথ্য সফলভাবে আপডেট করা হয়েছে!', 'success');
    } else {
      db.addAdvisor(dataObj);
      showToast('নতুন উপদেষ্টা সফলভাবে যোগ করা হয়েছে!', 'success');
    }

    closeModal();
    this.renderLeadershipManager(document.getElementById('admin-tab-content'), 'advisors');
  }

  confirmDeleteAdvisor(advId) {
    if (confirm('আপনি কি সত্যিই এই উপদেষ্টাকে তালিকা থেকে সরাতে চান?')) {
      db.deleteAdvisor(advId);
      showToast('উপদেষ্টা সরাতে সফল হয়েছে!', 'success');
      this.renderLeadershipManager(document.getElementById('admin-tab-content'), 'advisors');
    }
  }

  // ==========================================
  // 4. NOTICE BOARD MANAGER
  // ==========================================
  renderNoticesManager(container) {
    const notices = db.data.notices || [];

    container.innerHTML = `
      <h3 style="font-size:1.3rem; font-weight:700; color:var(--primary-deep); margin-bottom:0.5rem;">নোটিশ বোর্ড ব্যবস্থাপনা (Official Notices)</h3>
      <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:1.5rem;">ওয়েবসাইটে অফিশিয়াল ঘোষণা, সভা ও সাধারণ নোটিশ প্রকাশ এবং ব্যবস্থাপনা করুন</p>

      <form onsubmit="adminPanel.handleNoticeSubmit(event)" style="background:var(--bg-warm); padding:1.5rem; border-radius:var(--radius-md); border:1px solid var(--border-color); margin-bottom:2rem;">
        <h4 style="font-size:1.05rem; font-weight:700; color:var(--primary-deep); margin-bottom:1rem;"><i class="fas fa-bullhorn"></i> নতুন অফিশিয়াল নোটিশ প্রকাশ করুন</h4>
        
        <div style="display:grid; grid-template-columns:2fr 1fr; gap:1rem; margin-bottom:1rem;">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">নোটিশের শিরোনাম</label>
            <input type="text" id="notice-title" class="form-control" placeholder="যেমন: বার্ষিক সাধারণ সভা ২০২৬ আহ্বান" required>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">ক্যাটাগরি</label>
            <select id="notice-category" class="form-control">
              <option value="সাধারণ নোটিশ">সাধারণ নোটিশ</option>
              <option value="জরুরি সভা">জরুরি সভা</option>
              <option value="ইভেন্ট ঘোষণা">ইভেন্ট ঘোষণা</option>
              <option value="আর্থিক রিপোর্ট">আর্থিক রিপোর্ট</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">নোটিশের বিবরণ / পূর্ণাঙ্গ বক্তব্য</label>
          <textarea id="notice-content" class="form-control" rows="3" placeholder="নোটিশের বিস্তারিত বার্তা লিখুন..." required></textarea>
        </div>

        <button type="submit" class="btn btn-primary"><i class="fas fa-paper-plane"></i> নোটিশ ওয়েবসাইটে প্রকাশ করুন</button>
      </form>

      <h4 style="font-size:1.1rem; font-weight:700; color:var(--primary-deep); margin-bottom:1rem;">প্রকাশিত নোটিশসমূহ (${notices.length})</h4>
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>আইডি</th>
              <th>তারিখ</th>
              <th>শিরোনাম</th>
              <th>ক্যাটাগরি</th>
              <th>বার্তা বিবরণ</th>
              <th>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            ${notices.map(n => `
              <tr>
                <td><strong>${n.id}</strong></td>
                <td>${n.date}</td>
                <td><strong>${n.title}</strong></td>
                <td><span class="badge badge-verified">${n.category}</span></td>
                <td><small style="color:var(--text-muted); display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${n.content}</small></td>
                <td>
                  <button class="btn btn-sm btn-secondary" style="background:#dc2626; color:#fff; border:none;" onclick="adminPanel.confirmDeleteNotice('${n.id}')" title="নোটিশ রিমুভ করুন">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  handleNoticeSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('notice-title').value;
    const category = document.getElementById('notice-category').value;
    const content = document.getElementById('notice-content').value;

    db.addNotice(title, category, content);
    showToast('নতুন নোটিশ সফলভাবে ওয়েবসাইটে প্রকাশিত হয়েছে!', 'success');
    this.renderNoticesManager(document.getElementById('admin-tab-content'));
  }

  confirmDeleteNotice(noticeId) {
    if (confirm('আপনি কি সত্যিই এই নোটিশটি অপসারণ করতে চান?')) {
      if (db.deleteNotice(noticeId)) {
        showToast('নোটিশ অপসারণ করা হয়েছে!', 'success');
        this.renderNoticesManager(document.getElementById('admin-tab-content'));
      }
    }
  }

  // ==========================================
  // 5. EXPENSE ENTRY MANAGER
  // ==========================================
  renderExpenseManager(container) {
    this.tempCashMemoBase64 = null; // Reset temp variable when rendering

    container.innerHTML = `
      <h3 style="font-size:1.3rem; font-weight:700; color:var(--primary-deep); margin-bottom:1rem;">নতুন ব্যয়ের ভাউচার এন্ট্রি (Expense Entry)</h3>

      <form onsubmit="adminPanel.handleExpenseSubmit(event)" style="background:var(--bg-warm); padding:1.5rem; border-radius:var(--radius-md); border:1px solid var(--border-color); margin-bottom:2rem;">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="form-group" style="grid-column: 1 / -1;">
            <label class="form-label">ক্যাশ মেমো / রশিদ আপলোড (Cash Memo Upload)</label>
            <input type="file" id="exp-cash-memo" accept="image/*" class="form-control" onchange="adminPanel.handleCashMemoUpload(this)">
            <img id="exp-cash-memo-preview" src="" style="max-height: 150px; margin-top: 10px; display: none; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          </div>
          <div class="form-group">
            <label class="form-label">ব্যয়ের ক্যাটাগরি / খাত</label>
            <input type="text" id="exp-cat" class="form-control" placeholder="যেমন: খাদ্য বিতরণ / স্টেশনারি" required>
          </div>
          <div class="form-group">
            <label class="form-label">ফান্ড নির্বাচন</label>
            <select id="exp-fund" class="form-control">
              <option value="food">খাদ্য ফান্ড (Food Fund)</option>
              <option value="housing">আশ্রয় ও গৃহ নির্মাণ ফান্ড (Shelter & Housing Fund)</option>
              <option value="education">শিক্ষা সহায়তা ফান্ড</option>
              <option value="medical">চিকিৎসা সহায়তা ফান্ড</option>
              <option value="self_reliance">আত্মকর্মসংস্থান ফান্ড</option>
              <option value="elderly">প্রবীণ সেবা ফান্ড</option>
              <option value="old_age_home">বৃদ্ধাশ্রম প্রকল্প ফান্ড</option>
              <option value="religious">ধর্মীয় ও সামাজিক উন্নয়ন ফান্ড</option>
              <option value="general">সাধারণ মানবিক ফান্ড</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">টাকার পরিমাণ (BDT)</label>
            <input type="number" id="exp-amount" class="form-control" placeholder="1000" required min="1">
          </div>
          <div class="form-group">
            <label class="form-label">প্রাপক / সরবরাহকারী (Receiver)</label>
            <input type="text" id="exp-receiver" class="form-control" placeholder="সাপ্লায়ারের নাম">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">বিবরণ / শোরগোল</label>
          <textarea id="exp-desc" class="form-control" rows="2" placeholder="খরচের বিস্তারিত তথ্য লিখুন..."></textarea>
        </div>

        <button type="submit" class="btn btn-primary"><i class="fas fa-check-circle"></i> ব্যয় অনুমোদন ও ফান্ড থেকে বিয়োগ করুন</button>
      </form>
    `;
  }

  handleCashMemoUpload(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.tempCashMemoBase64 = e.target.result;
        const preview = document.getElementById('exp-cash-memo-preview');
        if (preview) {
          preview.src = this.tempCashMemoBase64;
          preview.style.display = 'block';
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  handleExpenseSubmit(e) {
    e.preventDefault();
    const data = {
      category: document.getElementById('exp-cat').value,
      fund: document.getElementById('exp-fund').value,
      amount: document.getElementById('exp-amount').value,
      receiver: document.getElementById('exp-receiver').value,
      description: document.getElementById('exp-desc').value,
      paidBy: auth.currentAdmin.name,
      cashMemo: this.tempCashMemoBase64 || null
    };

    db.addExpense(data);
    this.tempCashMemoBase64 = null; // Reset
    showToast('ব্যয়ের ভাউচার সফলভাবে যোগ করা হয়েছে এবং ফান্ড ব্যালেন্স আপডেট হয়েছে!', 'success');
    transparency.renderTransparencyDashboard();
    this.showTab('overview');
  }

  // ==========================================
  // 6. AUDIT LOGS VIEW
  // ==========================================
  renderAuditLogs(container) {
    container.innerHTML = `
      <h3 style="font-size:1.3rem; font-weight:700; color:var(--primary-deep); margin-bottom:0.5rem;">অপিবর্তনীয় অডিট ট্রেইল (Immutable Audit Logs)</h3>
      <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:1.5rem;">আর্থিক পরিবর্তনের সময়, পরিবর্তনকারী ও সুনির্দিষ্ট কারণ রেকর্ড।</p>

      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>অডিট আইডি</th>
              <th>রেফ আইডি</th>
              <th>টাইপ</th>
              <th>পূর্বের মান</th>
              <th>নতুন মান</th>
              <th>পরিবর্তনকারী</th>
              <th>কারণ</th>
              <th>সময়</th>
            </tr>
          </thead>
          <tbody>
            ${db.data.auditLogs.map(log => `
              <tr>
                <td><strong>${log.id}</strong></td>
                <td>${log.recordId}</td>
                <td><span class="badge badge-pending">${log.type}</span></td>
                <td style="color:var(--accent-red);">${log.oldValue}</td>
                <td style="color:var(--primary-accent);">${log.newValue}</td>
                <td>${log.changedBy}</td>
                <td>${log.reason}</td>
                <td>${log.timestamp}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // ==========================================
  // 7. REPORT EXPORTER
  // ==========================================
  renderReportExporter(container) {
    container.innerHTML = `
      <h3 style="font-size:1.3rem; font-weight:700; color:var(--primary-deep); margin-bottom:0.5rem;">আর্থিক প্রতিবেদন রপ্তানি (Financial Export)</h3>
      <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:1.5rem;">CSV / Excel সামঞ্জস্যপূর্ণ ফরম্যাটে হিসাবের বিবরণ ডাউনলোড করুন।</p>

      <div style="display:flex; gap:1rem;">
        <button class="btn btn-primary" onclick="adminPanel.exportCSV('donations')">
          <i class="fas fa-file-csv"></i> সকল অনুদান রেকর্ড (CSV)
        </button>
        <button class="btn btn-secondary" onclick="adminPanel.exportCSV('expenses')">
          <i class="fas fa-file-csv"></i> সকল ব্যয় ভাউচার (CSV)
        </button>
      </div>
    `;
  }

  exportCSV(type) {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (type === 'donations') {
      csvContent += "ID,Date,DonorName,Fund,Amount,PaymentMethod,Status\n";
      db.data.donations.forEach(d => {
        csvContent += `"${d.id}","${d.date}","${d.donorName}","${d.fund}",${d.amount},"${d.paymentMethod}","${d.status}"\n`;
      });
    } else {
      csvContent += "ID,Date,Category,Fund,Amount,PaidBy,Receiver\n";
      db.data.expenses.forEach(e => {
        csvContent += `"${e.id}","${e.date}","${e.category}","${e.fund}",${e.amount},"${e.paidBy}","${e.receiver}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `EMKF_${type}_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // ==========================================
  // 9. MEAL SPONSOR CALENDAR MANAGER
  // ==========================================
  renderMealCalendar(container) {
    if (this.currentCalMonth === undefined) {
       this.currentCalMonth = new Date().getMonth();
       this.currentCalYear = new Date().getFullYear();
    }

    // Generate Month Options
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthOpts = '';
    months.forEach((m, i) => {
       monthOpts += `<option value="${i}" ${this.currentCalMonth === i ? 'selected' : ''}>${m}</option>`;
    });

    // Generate Year Options (2026 to +20 years)
    let yearOpts = '';
    for (let y = 2026; y <= 2046; y++) {
       yearOpts += `<option value="${y}" ${this.currentCalYear === y ? 'selected' : ''}>${y}</option>`;
    }

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.25rem;">
        <div>
          <h3 style="font-size:1.35rem; font-weight:700; color:var(--primary-deep);">মাসিক খাবার স্পন্সর ক্যালেন্ডার</h3>
          <p style="color:var(--text-muted); font-size:0.92rem; margin-top:2px;">১ তারিখ থেকে শুরু করে পুরো মাসের স্পন্সর তালিকা পরিচালনা করুন।</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="adminPanel.promptAddMealSponsorMember()">
          <i class="fas fa-user-plus"></i> নতুন সদস্য/স্পন্সর যোগ করুন
        </button>
      </div>

      <div style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
        <select id="admin-cal-month" class="form-control" style="width:auto;" onchange="adminPanel.updateCalFilter()">
          ${monthOpts}
        </select>
        <select id="admin-cal-year" class="form-control" style="width:auto;" onchange="adminPanel.updateCalFilter()">
          ${yearOpts}
        </select>
      </div>

      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>তারিখ (Date)</th>
              <th>স্পন্সরের নাম (Sponsor Name)</th>
              <th>অ্যাকশন (Action)</th>
            </tr>
          </thead>
          <tbody id="admin-meal-cal-tbody">
            <!-- Rendered by JS -->
          </tbody>
        </table>
      </div>
    `;

    this.populateMealCalendar();
  }

  promptAddMealSponsorMember() {
    this.promptAddMember();
    this.populateMealCalendar();
  }

  updateCalFilter() {
    this.currentCalMonth = parseInt(document.getElementById('admin-cal-month').value);
    this.currentCalYear = parseInt(document.getElementById('admin-cal-year').value);
    this.populateMealCalendar();
  }

  populateMealCalendar() {
    const tbody = document.getElementById('admin-meal-cal-tbody');
    if (!tbody) return;

    const members = db.data.members || [];
    let memberOptionsHTML = '<option value="">-- স্পন্সর নির্বাচন করুন (ফাঁকা রাখুন) --</option>';
    members.forEach(m => {
      const name = m.name || m.nameBn || 'সদস্য';
      const phone = m.phone ? ` (${m.phone})` : '';
      memberOptionsHTML += `<option value="${name}">${name}${phone}</option>`;
    });

    let html = '';
    const daysInMonth = new Date(this.currentCalYear, this.currentCalMonth + 1, 0).getDate();
    const minDateStr = "2026-08-11";
    
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(Date.UTC(this.currentCalYear, this.currentCalMonth, i));
      const dateStr = d.toISOString().split('T')[0];

      // Ignore dates before foundation start date (11 Aug 2026)
      if (dateStr < minDateStr) continue;

      const sponsor = db.getMealSponsor(dateStr) || '';
      
      let rowOptions = memberOptionsHTML;
      if (sponsor) {
        const found = members.find(m => (m.name || m.nameBn) === sponsor);
        if (!found) {
           rowOptions += `<option value="${sponsor}">${sponsor} (বহিরাগত)</option>`;
        }
        rowOptions = rowOptions.replace(`value="${sponsor}"`, `value="${sponsor}" selected`);
      }

      html += `
        <tr>
          <td><strong>${dateStr}</strong></td>
          <td>
            <select id="sponsor-input-${dateStr}" class="form-control" style="min-width: 220px;">
              ${rowOptions}
            </select>
          </td>
          <td>
            <button class="btn btn-sm btn-primary" onclick="adminPanel.saveMealSponsor('${dateStr}')">
              <i class="fas fa-save"></i> সেভ করুন
            </button>
          </td>
        </tr>
      `;
    }
    tbody.innerHTML = html;
  }

  saveMealSponsor(dateStr) {
    const name = document.getElementById(`sponsor-input-${dateStr}`).value;
    
    if (!name) {
      db.setMealSponsor(dateStr, '');
      showToast(`${dateStr} তারিখের স্পন্সর ফাঁকা করা হয়েছে!`, 'success');
      return;
    }

    let sponsorCount = 0;
    const sponsorsObj = db.data.mealSponsors || {};
    for (const [d, spName] of Object.entries(sponsorsObj)) {
       if (spName === name && d !== dateStr) {
          sponsorCount++;
       }
    }

    if (sponsorCount > 0) {
       if (!confirm(`${name} ইতিমধ্যে ${sponsorCount} দিন স্পন্সর করেছেন। আপনি কি তাকে আবার যুক্ত করতে চান?`)) {
          return; // Cancel saving
       }
    }

    db.setMealSponsor(dateStr, name);
    showToast(`${dateStr} তারিখের স্পন্সর আপডেট হয়েছে!`, 'success');
  }

  handleHeroImageUpload() {
    const fileInput = document.getElementById('hero-img-upload');
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      showToast('অনুগ্রহ করে একটি ছবি নির্বাচন করুন।', 'error');
      return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Str = e.target.result;
      db.setHeroImage(base64Str);
      showToast('হোম পেজের ছবি সফলভাবে পরিবর্তন করা হয়েছে!', 'success');
      fileInput.value = ''; // Reset
    };

    reader.readAsDataURL(file);
  }

  // ==========================================
  // 9. MEDIA & IMAGE MANAGER
  // ==========================================
  renderMediaManager(container) {
    container.innerHTML = `
      <h3 style="font-size:1.3rem; font-weight:700; color:var(--primary-deep); margin-bottom:0.5rem;">মিডিয়া ও ছবি পরিবর্তন (Media Manager)</h3>
      <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:1.5rem;">ওয়েবসাইটের মূল ছবিগুলো পরিবর্তন করুন। নতুন ছবি নির্বাচন করলে তা সরাসরি ওয়েবসাইটে প্রদর্শিত হবে।</p>

      <div class="stats-grid">
        ${this.createMediaUploadCard('siteLogo', 'ওয়েবসাইট লোগো (Header Logo)', 'img/logo.jpg')}
        ${this.createMediaUploadCard('heroImage', 'প্রধান কভার ছবি (Hero Image)', 'img/hero-cover.jpg')}
        ${this.createMediaUploadCard('foodActivityImage', 'খাদ্য বিতরণ ছবি', 'img/food-activity.jpg')}
        ${this.createMediaUploadCard('eduActivityImage', 'শিক্ষা সহায়তা ছবি', 'img/education-activity.jpg')}
        ${this.createMediaUploadCard('oldAgeHomeImage', 'বৃদ্ধাশ্রম প্রজেক্ট ছবি', 'img/old-age-home-render.jpg')}
      </div>
    `;
  }

  createMediaUploadCard(key, title, defaultSrc) {
    const currentSrc = db.getMedia(key, defaultSrc);
    return `
      <div class="stat-card" style="text-align:center; padding:1.5rem;">
        <h4 style="font-size:1rem; margin-bottom:1rem; color:var(--primary-deep);">${title}</h4>
        <img id="preview-${key}" src="${currentSrc}" style="width:100%; height:120px; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:1rem; border:1px solid var(--border-color);">
        <input type="file" id="upload-${key}" accept="image/*" style="display:none;" onchange="adminPanel.handleMediaUpload('${key}', this)">
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('upload-${key}').click()"><i class="fas fa-upload"></i> ছবি পরিবর্তন করুন</button>
      </div>
    `;
  }

  handleMediaUpload(key, input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Str = e.target.result;
        db.setMedia(key, base64Str);
        document.getElementById(`preview-${key}`).src = base64Str;
        showToast('ছবি সফলভাবে আপডেট করা হয়েছে! মূল ওয়েবসাইটে পরিবর্তন দেখতে রিলোড করুন।', 'success');
        
        // Dynamically update the DOM if elements exist
        if (key === 'siteLogo') {
          const logo = document.getElementById('dynamic-site-logo');
          if (logo) logo.src = base64Str;
        } else if (key === 'heroImage') {
          const hero = document.getElementById('dynamic-hero-img');
          if (hero) hero.src = base64Str;
        } else if (key === 'foodActivityImage') {
          document.querySelectorAll('.dynamic-food-img').forEach(img => img.src = base64Str);
        } else if (key === 'eduActivityImage') {
          document.querySelectorAll('.dynamic-edu-img').forEach(img => img.src = base64Str);
        } else if (key === 'oldAgeHomeImage') {
          document.querySelectorAll('.dynamic-oldage-img').forEach(img => img.src = base64Str);
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // ==========================================
  // 10. NEWS MANAGER
  // ==========================================
  renderNewsManager(container) {
    const newsList = db.getNews();

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <div>
          <h3 style="font-size:1.3rem; font-weight:700; color:var(--primary-deep);">নিউজ ও কার্যক্রম পোস্ট (News Portal)</h3>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:2px;">ফাউন্ডেশনের দৈনন্দিন কাজের আপডেট ও নিউজ পাবলিশ করুন</p>
        </div>
      </div>

      <div style="background:#fff; border-radius:var(--radius-lg); border:1px solid var(--border-color); padding:1.5rem; margin-bottom:2rem;">
        <h4 style="color:var(--primary-deep); margin-bottom:1rem; font-size:1.1rem;"><i class="fas fa-edit"></i> নতুন নিউজ তৈরি করুন</h4>
        <form onsubmit="adminPanel.handleNewsSubmit(event)">
          <div class="form-group">
            <label class="form-label">খবরের শিরোনাম (Title)</label>
            <input type="text" id="news-title-input" class="form-control" placeholder="যেমন: আজ ২৫০ জন এতিমকে খাবার প্রদান করা হলো" required>
          </div>
          <div class="form-group">
            <label class="form-label">বিস্তারিত বিবরণ (Details)</label>
            <textarea id="news-content-input" class="form-control" rows="4" placeholder="খবরের বিস্তারিত লিখুন..." required></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">ছবি যুক্ত করুন (Optional)</label>
            <input type="file" id="news-img-input" class="form-control" accept="image/*">
            <div id="news-img-preview-container" style="display:none; margin-top:1rem;">
              <img id="news-img-preview" src="" style="max-height:200px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            </div>
          </div>
          <button type="submit" class="btn btn-primary"><i class="fas fa-paper-plane"></i> নিউজ পাবলিশ করুন</button>
        </form>
      </div>

      <h4 style="color:var(--primary-deep); margin-bottom:1rem; font-size:1.1rem;"><i class="fas fa-list"></i> প্রকাশিত নিউজ তালিকা</h4>
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>তারিখ</th>
              <th>শিরোনাম</th>
              <th>ছবি</th>
              <th>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            ${newsList.length === 0 ? `<tr><td colspan="4" style="text-align:center;">কোনো নিউজ পাওয়া যায়নি।</td></tr>` : ''}
            ${newsList.map(n => `
              <tr>
                <td>${new Date(n.date).toLocaleDateString('en-GB')}</td>
                <td><strong>${n.title}</strong><br><small style="color:var(--text-muted);">${n.content.substring(0, 50)}...</small></td>
                <td>${n.image ? '<span class="badge badge-verified">Yes</span>' : '<span class="badge badge-pending">No</span>'}</td>
                <td>
                  <button class="btn btn-sm" style="background:var(--accent-red); color:#fff;" onclick="adminPanel.deleteNews('${n.id}')">
                    <i class="fas fa-trash"></i> মুছুন
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Preview image on select
    const imgInput = document.getElementById('news-img-input');
    if (imgInput) {
      imgInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
          const reader = new FileReader();
          reader.onload = (e) => {
            document.getElementById('news-img-preview').src = e.target.result;
            document.getElementById('news-img-preview-container').style.display = 'block';
          };
          reader.readAsDataURL(this.files[0]);
        }
      });
    }
  }

  handleNewsSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('news-title-input').value;
    const content = document.getElementById('news-content-input').value;
    const imgPreview = document.getElementById('news-img-preview');
    const image = imgPreview.src && imgPreview.src.startsWith('data:image') ? imgPreview.src : null;

    db.addNews({ title, content, image, author: auth.currentAdmin.name });
    
    showToast('নিউজ সফলভাবে পাবলিশ করা হয়েছে!', 'success');
    this.renderNewsManager(document.getElementById('admin-tab-content'));
  }

  deleteNews(newsId) {
    if (confirm('আপনি কি নিশ্চিত এই নিউজটি মুছে ফেলতে চান?')) {
      if (db.deleteNews(newsId)) {
        showToast('নিউজটি মুছে ফেলা হয়েছে।', 'success');
        this.renderNewsManager(document.getElementById('admin-tab-content'));
      }
    }
  }

  // ==========================================
  // 11. BLOOD DONOR MANAGER
  // ==========================================
  renderBloodManager(container) {
    const donors = db.getBloodDonors();

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <div>
          <h3 style="font-size:1.3rem; font-weight:700; color:var(--primary-deep);"><i class="fas fa-tint" style="color:#c0392b;"></i> রক্তদাতা ব্যবস্থাপনা</h3>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:2px;">সকল নিবন্ধিত রক্তদাতার তালিকা এবং তাদের স্ট্যাটাস</p>
        </div>
      </div>

      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>নাম ও যোগাযোগ</th>
              <th>রক্তের গ্রুপ</th>
              <th>লোকেশন</th>
              <th>স্ট্যাটাস</th>
              <th>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            ${donors.length === 0 ? `<tr><td colspan="5" style="text-align:center;">কোনো রক্তদাতার তথ্য নেই।</td></tr>` : ''}
            ${donors.map(d => `
              <tr>
                <td>
                  <strong>${d.name}</strong><br>
                  <small style="color:var(--text-muted);"><i class="fas fa-phone-alt"></i> ${d.phone}</small>
                </td>
                <td><span style="color:#c0392b; font-weight:bold; font-size:1.1rem;">${d.bloodGroup}</span></td>
                <td>${d.district}</td>
                <td>
                  <span class="badge ${d.status === 'Available' ? 'badge-verified' : 'badge-pending'}">${d.status}</span>
                </td>
                <td>
                  <button class="btn btn-sm" style="background:var(--accent-red); color:#fff;" onclick="adminPanel.deleteBloodDonor('${d.id}')">
                    <i class="fas fa-trash"></i> মুছুন
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  deleteBloodDonor(donorId) {
    if (confirm('আপনি কি নিশ্চিত এই রক্তদাতার তথ্য মুছে ফেলতে চান?')) {
      if (db.deleteBloodDonor(donorId)) {
        showToast('তথ্য সফলভাবে মুছে ফেলা হয়েছে।', 'success');
        this.renderBloodManager(document.getElementById('admin-tab-content'));
      }
    }
  }

}

const adminPanel = new AdminPanel();


