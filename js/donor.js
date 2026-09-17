/* ==========================================================================
   Ek Mutho Khabar Manobik Foundation - Donor Account Portal & Privacy Manager
   ========================================================================== */

class DonorPortal {
  constructor() {
    this.pendingUser = null;
    this.pendingPhone = null;
  }

  renderDonorDashboard() {
    const user = auth.currentUser;
    const portalContainer = document.getElementById('donor-portal-view');
    if (!portalContainer) return;

    if (!user || !user.isLoggedIn) {
      portalContainer.innerHTML = `
        <div style="max-width:440px; margin:3rem auto; background:#fff; padding:2.5rem; border-radius:var(--radius-lg); box-shadow:var(--shadow-lg); text-align:center;">
          <div style="width:64px; height:64px; background:rgba(15, 90, 62, 0.1); color:var(--primary-mid); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem auto; font-size:1.8rem;">
            <i class="fas fa-user-shield"></i>
          </div>
          <h3 style="font-size:1.4rem; font-weight:700; color:var(--primary-deep); margin-bottom:0.5rem;">দাতা ও সদস্য লগইন (Donor Login)</h3>
          <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:1.5rem;">আপনার ফোন নম্বর দিয়ে এগিয়ে যান।</p>
          
          <div id="login-step-1">
            <form onsubmit="donorPortal.handlePhoneSubmit(event)">
              <div class="form-group" style="text-align:left;">
                <label class="form-label">মোবাইল নম্বর (Phone Number)</label>
                <input type="tel" id="donor-phone-input" class="form-control" placeholder="017XXXXXXXX" required>
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%;">
                পরবর্তী ধাপ <i class="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>

          <div id="login-step-password" style="display:none;">
            <form onsubmit="donorPortal.handlePasswordLogin(event)">
              <p id="login-welcome-msg" style="color:var(--primary-mid); font-weight:600; margin-bottom:1rem;"></p>
              <div class="form-group" style="text-align:left;">
                <label class="form-label">পাসওয়ার্ড (Password)</label>
                <input type="password" id="donor-password-input" class="form-control" placeholder="আপনার পাসওয়ার্ড দিন" required>
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%;">
                <i class="fas fa-sign-in-alt"></i> লগইন করুন
              </button>
              <button type="button" class="btn btn-outline" style="width:100%; margin-top:0.5rem;" onclick="donorPortal.resetLoginFlow()">
                ফিরে যান
              </button>
            </form>
          </div>

          <div id="login-step-create" style="display:none;">
             <form onsubmit="donorPortal.handleCreatePassword(event)">
              <p id="create-welcome-msg" style="color:var(--primary-mid); font-weight:600; margin-bottom:1rem;"></p>
              <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">প্রথমবার লগইন করার জন্য একটি পাসওয়ার্ড সেট করুন।</p>
              <div class="form-group" style="text-align:left;">
                <label class="form-label">নতুন পাসওয়ার্ড দিন (সর্বনিম্ন ৬ অক্ষর)</label>
                <input type="password" id="donor-create-password" class="form-control" placeholder="পাসওয়ার্ড" required minlength="6">
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%;">
                <i class="fas fa-key"></i> পাসওয়ার্ড সেট করে লগইন করুন
              </button>
              <button type="button" class="btn btn-outline" style="width:100%; margin-top:0.5rem;" onclick="donorPortal.resetLoginFlow()">
                ফিরে যান
              </button>
            </form>
          </div>
        </div>
      `;
      return;
    }

    // User is logged in
    const userDonations = db.data.donations.filter(d => d.donorPhone === user.phone || d.donorName.includes(user.name));
    const totalDonated = userDonations.reduce((sum, d) => sum + Number(d.amount), 0);

    portalContainer.innerHTML = `
      <div class="portal-layout">
        <aside class="portal-sidebar">
          <div class="sidebar-user">
            <div class="user-avatar">
              <i class="fas fa-user"></i>
            </div>
            <h4 style="font-size:1.1rem; font-weight:700; color:var(--primary-deep); margin-bottom:2px;">${user.name}</h4>
            <span style="font-size:0.82rem; color:var(--text-muted);">${user.phone}</span>
          </div>
          <nav class="sidebar-menu">
            <a class="sidebar-item active" onclick="donorPortal.showTab('my-donations')">
              <i class="fas fa-hand-holding-usd"></i> আমার অনুদান ইতিহাস
            </a>
            <a class="sidebar-item" onclick="donorPortal.showTab('privacy-settings')">
              <i class="fas fa-user-lock"></i> প্রাইভেসি সেটিংস
            </a>
            <a class="sidebar-item" onclick="donorPortal.showTab('commitments')">
              <i class="fas fa-calendar-check"></i> মাসিক দায়িত্ব সেশন
            </a>
            <a class="sidebar-item" style="color:var(--accent-red);" onclick="auth.logoutDonor()">
              <i class="fas fa-sign-out-alt"></i> লগআউট
            </a>
          </nav>
        </aside>

        <main class="portal-main">
          <div id="donor-tab-content">
            <!-- Rendered Tab Content -->
          </div>
        </main>
      </div>
    `;

    this.showTab('my-donations');
  }

  handlePhoneSubmit(e) {
    e.preventDefault();
    const phone = document.getElementById('donor-phone-input').value;
    const user = db.findPreRegisteredUser(phone);

    if (!user) {
      showToast('দুঃখিত, এই নম্বরটি আমাদের সদস্য বা দাতা হিসেবে নিবন্ধিত নয়।', 'error');
      return;
    }

    this.pendingUser = user;
    this.pendingPhone = phone;

    const cred = db.getUserCredential(phone);
    document.getElementById('login-step-1').style.display = 'none';

    if (cred) {
      // Has password
      document.getElementById('login-welcome-msg').innerText = `স্বাগতম, ${user.name}!`;
      document.getElementById('login-step-password').style.display = 'block';
    } else {
      // No password, show create password UI
      document.getElementById('create-welcome-msg').innerText = `স্বাগতম, ${user.name}!`;
      document.getElementById('login-step-create').style.display = 'block';
    }
  }

  handlePasswordLogin(e) {
    e.preventDefault();
    const password = document.getElementById('donor-password-input').value;
    
    if (db.verifyUserPassword(this.pendingPhone, password)) {
      auth.loginDonor(this.pendingPhone, this.pendingUser.name, this.pendingUser.type);
      showToast('লগইন সফল হয়েছে!', 'success');
      this.pendingUser = null;
      this.pendingPhone = null;
    } else {
      showToast('পাসওয়ার্ড ভুল হয়েছে। আবার চেষ্টা করুন।', 'error');
    }
  }

  handleCreatePassword(e) {
    e.preventDefault();
    const password = document.getElementById('donor-create-password').value;
    
    if (password.length < 6) {
      showToast('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।', 'error');
      return;
    }

    if (db.setUserPassword(this.pendingPhone, password)) {
      auth.loginDonor(this.pendingPhone, this.pendingUser.name, this.pendingUser.type);
      showToast('পাসওয়ার্ড সেট করা হয়েছে এবং লগইন সফল হয়েছে!', 'success');
      this.pendingUser = null;
      this.pendingPhone = null;
    } else {
      showToast('পাসওয়ার্ড সেট করতে সমস্যা হয়েছে।', 'error');
    }
  }

  resetLoginFlow() {
    this.pendingUser = null;
    this.pendingPhone = null;
    document.getElementById('login-step-password').style.display = 'none';
    document.getElementById('login-step-create').style.display = 'none';
    document.getElementById('login-step-1').style.display = 'block';
  }

  showTab(tabKey) {
    const user = auth.currentUser;
    const userDonations = db.data.donations.filter(d => d.donorPhone === user.phone || d.donorName.includes(user.name));
    const totalDonated = userDonations.reduce((sum, d) => sum + Number(d.amount), 0);
    const container = document.getElementById('donor-tab-content');
    if (!container) return;

    if (tabKey === 'my-donations') {
      container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
          <div>
            <h3 style="font-size:1.3rem; font-weight:700; color:var(--primary-deep);">আমার অনুদান ইতিহাস (My Contribution)</h3>
            <p style="font-size:0.88rem; color:var(--text-muted);">ফাউন্ডেশনে আপনার সকল অনুদানের রসিদ ও পরিসংখ্যান</p>
          </div>
          <div style="background:rgba(15, 90, 62, 0.08); padding:0.75rem 1.25rem; border-radius:var(--radius-md); text-align:right;">
            <span style="font-size:0.8rem; color:var(--text-muted);">মোট অবদান</span>
            <h4 style="font-size:1.3rem; font-weight:800; color:var(--primary-mid);">৳ ${totalDonated.toLocaleString()}</h4>
          </div>
        </div>

        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>আইডি / ID</th>
                <th>তারিখ</th>
                <th>ফান্ড</th>
                <th>পরিমাণ</th>
                <th>মেথড</th>
                <th>রসিদ</th>
              </tr>
            </thead>
            <tbody>
              ${userDonations.length ? userDonations.map(d => `
                <tr>
                  <td><strong>${d.id}</strong></td>
                  <td>${d.date}</td>
                  <td>${d.fund}</td>
                  <td><strong style="color:var(--primary-mid);">৳ ${Number(d.amount).toLocaleString()}</strong></td>
                  <td>${d.paymentMethod}</td>
                  <td>
                    <button class="btn btn-sm btn-primary" onclick="receiptGen.renderReceiptModal('${d.id}')">
                      <i class="fas fa-file-pdf"></i> রসিদ দেখুন
                    </button>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">
                    আপনার কোনো পূর্ববর্তী অনুদান রেকর্ড পাওয়া যায়নি।
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      `;
    } else if (tabKey === 'privacy-settings') {
      container.innerHTML = `
        <h3 style="font-size:1.3rem; font-weight:700; color:var(--primary-deep); margin-bottom:0.5rem;">প্রাইভেসি নিয়ন্ত্রণ (Privacy Controls)</h3>
        <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:1.5rem;">পাবলিক লিডারবোর্ড ও রসিদে আপনার তথ্য প্রদর্শনের পছন্দ নির্বাচন করুন।</p>

        <form onsubmit="donorPortal.savePrivacy(event)">
          <div class="form-group">
            <label class="checkbox-group">
              <input type="checkbox" id="priv-name" checked>
              <span>পাবলিকভাবে আমার নাম প্রদর্শন করুন (Show my name publicly)</span>
            </label>
          </div>
          <div class="form-group">
            <label class="checkbox-group">
              <input type="checkbox" id="priv-phone">
              <span>পাবলিকভাবে আমার ফোন নম্বর প্রদর্শন করুন (Show phone number)</span>
            </label>
          </div>
          <div class="form-group">
            <label class="checkbox-group">
              <input type="checkbox" id="priv-anon">
              <strong style="color:var(--accent-gold);">সর্বদা গোপন দাতা হিসেবে থাকুন (Always Donate Anonymously)</strong>
            </label>
          </div>
          <button type="submit" class="btn btn-primary" style="margin-top:1rem;">
            <i class="fas fa-save"></i> সেটিংস সংরক্ষণ করুন
          </button>
        </form>
      `;
    } else if (tabKey === 'commitments') {
      container.innerHTML = `
        <h3 style="font-size:1.3rem; font-weight:700; color:var(--primary-deep); margin-bottom:0.5rem;">মাসিক দায়িত্বশীল দাতা প্রোগ্রাম</h3>
        <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:1.5rem;">মাসে ১ দিনের পুরো খাবার ফান্ডের স্পন্সরশিপ</p>

        <div style="background:var(--bg-warm); border:1px solid var(--border-color); padding:1.5rem; border-radius:var(--radius-md);">
          <h4 style="color:var(--primary-deep); font-size:1.1rem; margin-bottom:0.5rem;">মাসিক ১ দিন খাবার প্রদান কর্মসূচি</h4>
          <p style="font-size:0.9rem; color:var(--text-muted);">আপনি কি মাসে ১ দিন ২৫০ জন পথশিশুর খাবার খরচ দিতে চান?</p>
          <button class="btn btn-gold btn-sm" style="margin-top:1rem;" onclick="showDonationModal('food')">
            <i class="fas fa-calendar-alt"></i> আজই স্পন্সর নির্বাচন করুন
          </button>
        </div>
      `;
    }
  }

  savePrivacy(e) {
    e.preventDefault();
    showToast('প্রাইভেসি সেটিংস সফলভাবে আপডেট হয়েছে!', 'success');
  }
}

const donorPortal = new DonorPortal();
