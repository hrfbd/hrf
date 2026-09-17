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
        <div style="max-width:460px; margin:3rem auto; background:#fff; padding:2.5rem; border-radius:var(--radius-lg); box-shadow:var(--shadow-xl); border-top:5px solid var(--primary-mid);">
          <div style="text-align:center; margin-bottom:1.5rem;">
            <div style="width:64px; height:64px; background:rgba(15, 90, 62, 0.1); color:var(--primary-deep); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1rem auto; font-size:1.8rem;">
              <i class="fas fa-lock"></i>
            </div>
            <h3 style="font-size:1.4rem; font-weight:700; color:var(--primary-deep);">এডমিন প্যানেল প্রবেশ (Admin Portal)</h3>
            <p style="font-size:0.88rem; color:var(--text-muted);">নিরাপদ ভূমিকা-ভিত্তিক এডমিন প্যানেল</p>
          </div>

          <form id="admin-login-form" onsubmit="adminPanel.handleAdminLogin(event)">
            <div class="form-group">
              <label class="form-label">ইউজারনেম (Username)</label>
              <select id="admin-user-select" class="form-control">
                <option value="superadmin">superadmin (Super Admin - পূর্ণ ক্ষমতা)</option>
                <option value="finance">finance (Finance Admin - অর্থ ও ভাউচার)</option>
                <option value="donor">donor (Donor Manager - দাতা ও সদস্য)</option>
                <option value="content">content (Content Admin - পোস্ট ও ছবি)</option>
                <option value="auditor">auditor (Auditor - নিরীক্ষক / রিড ওনলি)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">পাসওয়ার্ড (Password)</label>
              <input type="password" id="admin-pass-input" class="form-control" value="admin123" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;">
              <i class="fas fa-shield-alt"></i> সুরক্ষিত প্রবেশ করুন
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
    }
  }

  // ==========================================
  // 1. MEMBER APPROVAL, EDIT & DELETE MANAGER
  // ==========================================
  renderMembersManager(container, filterStatus = 'all') {
    let members = db.data.members;
    if (filterStatus !== 'all') {
      members = members.filter(m => m.status.toLowerCase() === filterStatus.toLowerCase());
    }

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
        <div>
          <h3 style="font-size:1.3rem; font-weight:700; color:var(--primary-deep);">সদস্য অনুমোদন ও পরিচিতি রেজিস্টার</h3>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:2px;">আবেদনকৃত সদস্যদের অনুমোদন, সংশোধন ও ডিলিট করুন</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="adminPanel.promptAddMember()"><i class="fas fa-user-plus"></i> নতুন সদস্য যোগ করুন</button>
      </div>

      <div style="display:flex; gap:0.5rem; margin-bottom:1.25rem;">
        <button class="btn btn-sm ${filterStatus === 'all' ? 'btn-primary' : 'btn-secondary'}" onclick="adminPanel.renderMembersManager(document.getElementById('admin-tab-content'), 'all')">সকল (${db.data.members.length})</button>
        <button class="btn btn-sm ${filterStatus === 'pending' ? 'btn-primary' : 'btn-secondary'}" onclick="adminPanel.renderMembersManager(document.getElementById('admin-tab-content'), 'pending')">অপেক্ষমাণ (${db.data.members.filter(m => m.status==='Pending').length})</button>
        <button class="btn btn-sm ${filterStatus === 'approved' ? 'btn-primary' : 'btn-secondary'}" onclick="adminPanel.renderMembersManager(document.getElementById('admin-tab-content'), 'approved')">অনুমোদিত (${db.data.members.filter(m => m.status==='Approved').length})</button>
        <button class="btn btn-sm ${filterStatus === 'rejected' ? 'btn-primary' : 'btn-secondary'}" onclick="adminPanel.renderMembersManager(document.getElementById('admin-tab-content'), 'rejected')">বাতিলকৃত (${db.data.members.filter(m => m.status==='Rejected').length})</button>
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
                  <strong>${m.name}</strong><br>
                  <small style="color:var(--text-muted);">${m.occupation || ''}</small>
                </td>
                <td>
                  ${m.phone}<br>
                  <small style="color:var(--text-muted);">${m.district}</small>
                </td>
                <td><span class="badge badge-pending">${m.typeLabelBn || m.type}</span></td>
                <td><strong style="color:var(--primary-mid);">৳ ${Number(m.amount).toLocaleString()}</strong></td>
                <td>
                  <span class="badge ${m.status === 'Approved' ? 'badge-verified' : m.status === 'Pending' ? 'badge-pending' : 'badge-rejected'}">
                    ${m.status === 'Approved' ? 'অনুমোদিত' : m.status === 'Pending' ? 'অপেক্ষমাণ' : 'বাতিল'}
                  </span>
                </td>
                <td>
                  <div style="display:flex; gap:0.35rem; flex-wrap:nowrap;">
                    ${m.status !== 'Approved' ? `
                      <button class="btn btn-sm btn-primary" style="padding:0.25rem 0.5rem; font-size:0.75rem; background:var(--primary-mid);" onclick="adminPanel.changeMemberStatus('${m.id}', 'Approved')" title="অনুমোদন করুন">
                        <i class="fas fa-check"></i>
                      </button>
                    ` : ''}
                    ${m.status !== 'Rejected' ? `
                      <button class="btn btn-sm btn-secondary" style="padding:0.25rem 0.5rem; font-size:0.75rem; background:var(--accent-red); color:#fff; border:none;" onclick="adminPanel.changeMemberStatus('${m.id}', 'Rejected')" title="বাতিল করুন">
                        <i class="fas fa-times"></i>
                      </button>
                    ` : ''}
                    <button class="btn btn-sm btn-secondary" style="padding:0.25rem 0.5rem; font-size:0.75rem;" onclick="adminPanel.promptEditMember('${m.id}')" title="সম্পাদনা">
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

  promptEditMember(memberId) {
    const m = db.data.members.find(x => x.id === memberId);
    if (!m) return;

    const newName = prompt('সদস্যের সঠিক নাম লিখুন:', m.name);
    if (!newName) return;

    const newPhone = prompt('মোবাইল নম্বর:', m.phone) || m.phone;
    const newDistrict = prompt('জেলা:', m.district) || m.district;
    const newAmount = prompt('প্রতিশ্রুত টাকার পরিমাণ:', m.amount) || m.amount;

    m.name = newName;
    m.phone = newPhone;
    m.district = newDistrict;
    m.amount = Number(newAmount);

    db.save();
    showToast('সদস্যের তথ্য আপডেট করা হয়েছে!', 'success');
    this.showTab('members-manage');
  }

  confirmDeleteMember(memberId) {
    if (confirm(`আপনি কি সত্যিই সদস্য '${memberId}' স্থায়ীভাবে ডিলিট করতে চান?`)) {
      if (db.deleteMember(memberId)) {
        showToast('সদস্য রেকর্ড ডিলিট করা হয়েছে!', 'success');
        this.showTab('members-manage');
      }
    }
  }

  promptAddMember() {
    const name = prompt('নতুন সদস্যের নাম লিখুন:');
    if (!name) return;
    const phone = prompt('মোবাইল নম্বর (WhatsApp সহ):', '8801700000000') || '';
    const district = prompt('জেলা:', 'ঢাকা') || 'ঢাকা';
    const occupation = prompt('পেশা:', 'ব্যবসা') || 'ব্যবসা';
    const amount = prompt('মাসিক/বার্ষিক অনুদান পরিমাণ (টাকা):', '1000') || 1000;

    const count = db.data.members.length + 1;
    const newMem = {
      id: `MEM-${String(count).padStart(3, '0')}`,
      name: name,
      phone: phone,
      district: district,
      occupation: occupation,
      type: 'Monthly',
      typeLabelBn: 'মাসিক দায়িত্বশীল সদস্য',
      frequency: 'Monthly',
      amount: Number(amount),
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'Approved',
      avatarBg: '#0F5A3E'
    };

    db.data.members.unshift(newMem);
    db.save();
    showToast('নতুন সদস্য সফলভাবে রেজিস্টার্ড ও অনুমোদিত হয়েছে!', 'success');
    this.showTab('members-manage');
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
  renderLeadershipManager(container, subTab = 'committee') {
    const committee = db.data.executiveCommittee;
    const advisors = db.data.advisors;

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
        <div>
          <h3 style="font-size:1.3rem; font-weight:700; color:var(--primary-deep);">পরিচালনা পর্ষদ ও উপদেষ্টা পরিষদ সম্পাদক</h3>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:2px;">২১ সদস্যের পরিচালনা পর্ষদ ও ১০ সদস্যের উপদেষ্টা পরিষদের নাম ও পদবী সম্পাদনা</p>
        </div>
      </div>

      <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem;">
        <button class="btn btn-sm ${subTab === 'committee' ? 'btn-primary' : 'btn-secondary'}" onclick="adminPanel.renderLeadershipManager(document.getElementById('admin-tab-content'), 'committee')">
          <i class="fas fa-users-cog"></i> পরিচালনা পর্ষদ (২১ সদস্য)
        </button>
        <button class="btn btn-sm ${subTab === 'advisors' ? 'btn-primary' : 'btn-secondary'}" onclick="adminPanel.renderLeadershipManager(document.getElementById('admin-tab-content'), 'advisors')">
          <i class="fas fa-user-tie"></i> উপদেষ্টা পরিষদ (১০ সদস্য)
        </button>
      </div>

      ${subTab === 'committee' ? `
        <div style="display:flex; justify-content:flex-end; margin-bottom:1rem;">
          <button class="btn btn-primary btn-sm" onclick="adminPanel.promptAddCommitteeMember()"><i class="fas fa-plus"></i> নতুন পর্ষদ সদস্য যোগ করুন</button>
        </div>
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>ক্রম</th>
                <th>পদবী / দায়িত্ব</th>
                <th>সদস্যের নাম (বাংলা)</th>
                <th>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              ${committee.map((item, index) => `
                <tr>
                  <td><strong>${item.pos || index + 1}</strong></td>
                  <td><span class="badge badge-verified">${item.titleBn}</span></td>
                  <td><strong>${item.nameBn}</strong></td>
                  <td>
                    <div style="display:flex; gap:0.35rem;">
                      <button class="btn btn-sm btn-secondary" onclick="adminPanel.promptEditCommitteeMember(${index})" title="সম্পাদনা">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn btn-sm btn-secondary" style="background:#dc2626; color:#fff; border:none;" onclick="adminPanel.confirmDeleteCommitteeMember(${index})" title="ডিলিট">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : `
        <div style="display:flex; justify-content:flex-end; margin-bottom:1rem;">
          <button class="btn btn-primary btn-sm" onclick="adminPanel.promptAddAdvisor()"><i class="fas fa-plus"></i> নতুন উপদেষ্টা যোগ করুন</button>
        </div>
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>আইডি</th>
                <th>উপদেষ্টার ভূমিকা / খাত</th>
                <th>উপদেষ্টার নাম (বাংলা)</th>
                <th>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              ${advisors.map(adv => `
                <tr>
                  <td><strong>${adv.id}</strong></td>
                  <td><span class="badge badge-pending">${adv.roleBn}</span></td>
                  <td><strong>${adv.nameBn}</strong></td>
                  <td>
                    <div style="display:flex; gap:0.35rem;">
                      <button class="btn btn-sm btn-secondary" onclick="adminPanel.promptEditAdvisor(${adv.id})" title="সম্পাদনা">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn btn-sm btn-secondary" style="background:#dc2626; color:#fff; border:none;" onclick="adminPanel.confirmDeleteAdvisor(${adv.id})" title="ডিলিট">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    `;
  }

  promptEditCommitteeMember(index) {
    const item = db.data.executiveCommittee[index];
    if (!item) return;

    const newTitle = prompt('পদবী পরিবর্তন করুন:', item.titleBn);
    if (!newTitle) return;
    const newName = prompt('সদস্যের নাম পরিবর্তন করুন:', item.nameBn);
    if (!newName) return;

    db.updateCommitteeMember(index, newName, newTitle);
    showToast('পরিচালনা পর্ষদের তথ্য আপডেট করা হয়েছে!', 'success');
    this.renderLeadershipManager(document.getElementById('admin-tab-content'), 'committee');
  }

  promptAddCommitteeMember() {
    const title = prompt('নতুন পর্ষদ পদের নাম লিখুন (যেমন: প্রচার সম্পাদক):');
    if (!title) return;
    const name = prompt('পর্ষদ সদস্যের নাম লিখুন:');
    if (!name) return;

    db.addCommitteeMember(title, name);
    showToast('নতুন পর্ষদ সদস্য যোগ করা হয়েছে!', 'success');
    this.renderLeadershipManager(document.getElementById('admin-tab-content'), 'committee');
  }

  confirmDeleteCommitteeMember(index) {
    if (confirm('আপনি কি সত্যিই এই পর্ষদ সদস্য অপসারণ করতে চান?')) {
      db.deleteCommitteeMember(index);
      showToast('পর্ষদ সদস্য অপসারণ করা হয়েছে!', 'success');
      this.renderLeadershipManager(document.getElementById('admin-tab-content'), 'committee');
    }
  }

  promptEditAdvisor(advId) {
    const adv = db.data.advisors.find(a => a.id === advId);
    if (!adv) return;

    const newRole = prompt('উপদেষ্টার পদবী/ভূমিকা লিখুন:', adv.roleBn);
    if (!newRole) return;
    const newName = prompt('উপদেষ্টার নাম লিখুন:', adv.nameBn);
    if (!newName) return;

    db.updateAdvisor(advId, newName, newRole);
    showToast('উপদেষ্টার তথ্য সফলভাবে আপডেট করা হয়েছে!', 'success');
    this.renderLeadershipManager(document.getElementById('admin-tab-content'), 'advisors');
  }

  promptAddAdvisor() {
    const role = prompt('নতুন উপদেষ্টার ক্ষেত্র/ভূমিকা লিখুন (যেমন: পরিবেশ উপদেষ্টা):');
    if (!role) return;
    const name = prompt('উপদেষ্টার নাম লিখুন:');
    if (!name) return;

    db.addAdvisor(name, role);
    showToast('নতুন উপদেষ্টা যোগ করা হয়েছে!', 'success');
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
      <h3 style="font-size:1.35rem; font-weight:700; color:var(--primary-deep); margin-bottom:0.5rem;">মাসিক খাবার স্পন্সর ক্যালেন্ডার</h3>
      <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:1.5rem;">১ তারিখ থেকে শুরু করে পুরো মাসের স্পন্সর তালিকা পরিচালনা করুন।</p>
      
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
      memberOptionsHTML += `<option value="${m.nameBn}">${m.nameBn} (${m.phone})</option>`;
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
        if (!members.find(m => m.nameBn === sponsor)) {
           rowOptions += `<option value="${sponsor}">${sponsor} (বহিরাগত)</option>`;
        }
        rowOptions = rowOptions.replace(`value="${sponsor}"`, `value="${sponsor}" selected`);
      }

      html += `
        <tr>
          <td><strong>${dateStr}</strong></td>
          <td>
            <select id="sponsor-input-${dateStr}" class="form-control" style="min-width: 200px;">
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
        ${this.createMediaUploadCard('siteLogo', 'ওয়েবসাইট লোগো (Header Logo)', 'img/fb-logo.jpg')}
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


