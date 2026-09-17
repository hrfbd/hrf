/* ==========================================================================
   Ek Mutho Khabar Manobik Foundation - Donation Receipt & PDF Generator
   ========================================================================== */

class ReceiptGenerator {
  renderReceiptModal(donationId) {
    const donation = db.data.donations.find(d => d.id === donationId);
    if (!donation) {
      alert('রসিদ খুঁজে পাওয়া যায়নি!');
      return;
    }

    const fundObj = db.data.funds.find(f => f.id === donation.fund);
    const fundName = currentLang === 'bn' ? (fundObj ? fundObj.nameBn : donation.fund) : (fundObj ? fundObj.nameEn : donation.fund);
    const donorDisplay = donation.isAnonymous ? 'Anonymous Donor (পরিচয় গোপন দাতা)' : donation.donorName;
    const cleanPhone = donation.donorPhone ? donation.donorPhone.replace(/[^0-9]/g, '') : '';
    const formattedPhone = cleanPhone.startsWith('88') ? cleanPhone : (cleanPhone ? '88' + cleanPhone : '');

    const modalBody = document.getElementById('modal-body-content');
    modalBody.innerHTML = `
      <div id="printable-receipt" class="receipt-card">
        <div class="receipt-watermark">EMKF VERIFIED</div>
        
        <div class="receipt-header">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <img src="img/logo.jpg" alt="Foundation Logo" style="width:48px; height:48px; border-radius:50%; border:2px solid var(--primary-mid); object-fit:cover; flex-shrink:0;">
            <div>
              <h3 style="font-size:1.15rem; font-weight:700; color:var(--primary-deep); margin:0;">এক মুঠো খাবার ও পুনর্বাসন ফাউন্ডেশন</h3>
              <p style="font-size:0.78rem; color:var(--accent-gold); font-weight:600; margin:0;">A Handful of Food and Rehabilitation Foundation (HRF)</p>
            </div>
          </div>
          <div style="text-align:right;">
            <span style="background:var(--accent-gold-light); color:var(--accent-gold); font-size:0.78rem; font-weight:700; padding:3px 10px; border-radius:12px;">OFFICIAL RECEIPT</span>
            <p style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">ID: ${donation.id}</p>
          </div>
        </div>

        <div style="margin-bottom:1.5rem;">
          <div class="receipt-row">
            <span>তারিখ / Date:</span>
            <strong>${donation.date}</strong>
          </div>
          <div class="receipt-row">
            <span>দাতা / Donor Name:</span>
            <strong>${donorDisplay}</strong>
          </div>
          <div class="receipt-row">
            <span>মোবাইল / Phone:</span>
            <strong>${donation.donorPhone || 'N/A'}</strong>
          </div>
          <div class="receipt-row">
            <span>ক্যাটাগরি / Category:</span>
            <strong>${donation.memberCategory || 'সাধারণ দাতা (General Donor)'}</strong>
          </div>
          <div class="receipt-row">
            <span>ফান্ড / Target Fund:</span>
            <strong>${fundName}</strong>
          </div>
          <div class="receipt-row">
            <span>অনুদানের পরিমাণ / Amount:</span>
            <strong style="font-size:1.2rem; color:var(--primary-mid);">৳ ${Number(donation.amount).toLocaleString()} BDT</strong>
          </div>
          <div class="receipt-row">
            <span>পেমেন্ট মাধ্যম / Payment Method:</span>
            <strong>${donation.paymentMethod}${donation.receivedBy ? ` (সংগ্রহকারী: ${donation.receivedBy})` : (donation.txnRef ? ` (Ref: ${donation.txnRef})` : '')}</strong>
          </div>
          <div class="receipt-row">
            <span>স্ট্যাটাস / Status:</span>
            <span class="badge badge-verified"><i class="fas fa-check-circle"></i> ${donation.status}</span>
          </div>
        </div>

        <div class="receipt-footer">
          <div>
            <div id="receipt-qr-code" style="margin-bottom:4px;"></div>
            <span style="font-size:0.72rem; color:var(--text-light);">Scan to Verify Authenticity</span>
          </div>
          <div style="text-align:center;">
            <div style="width:140px; border-bottom:1.5px solid var(--text-main); margin-bottom:4px;"></div>
            <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">অনুমোদিত স্বাক্ষর</span><br>
            <span style="font-size:0.72rem; color:var(--text-light);">Authorized Signatory</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons including Direct WhatsApp Receipt Sender -->
      <div style="display:flex; flex-wrap:wrap; justify-content:flex-end; gap:0.75rem; margin-top:1.5rem;" class="no-print">
        <button class="btn btn-secondary" onclick="window.print()"><i class="fas fa-print"></i> প্রিন্ট (Print)</button>
        <button class="btn btn-primary" onclick="receiptGen.downloadPDF('${donation.id}')"><i class="fas fa-file-pdf"></i> PDF ডাউনলোড</button>
        
        <button class="btn btn-primary" style="background:#25D366; border:none; color:#fff; box-shadow:0 4px 12px rgba(37,211,102,0.3);" onclick="receiptGen.sendReceiptWhatsApp('${donation.id}')">
          <i class="fab fa-whatsapp" style="font-size:1.15rem;"></i> WhatsApp-এ রসিদ পাঠান
        </button>
      </div>
    `;

    document.getElementById('modal-title').innerText = 'অফিশিয়াল অনুদান রসিদ (Official Receipt)';
    document.getElementById('global-modal').classList.add('active');

    // Generate QR Code
    setTimeout(() => {
      const qrElem = document.getElementById('receipt-qr-code');
      if (qrElem && window.QRCode) {
        qrElem.innerHTML = '';
        new QRCode(qrElem, {
          text: `EMKF-VERIFY:${donation.id}:${donation.amount}`,
          width: 64,
          height: 64
        });
      }
    }, 100);
  }

  // Direct 1-Click WhatsApp Receipt Sender
  sendReceiptWhatsApp(donationId) {
    const donation = db.data.donations.find(d => d.id === donationId);
    if (!donation) return;

    const fundObj = db.data.funds.find(f => f.id === donation.fund);
    const fundName = fundObj ? fundObj.nameBn : donation.fund;
    const donorName = donation.isAnonymous ? 'সম্মানিত দাতা' : donation.donorName;
    
    let rawPhone = donation.donorPhone ? donation.donorPhone.replace(/[^0-9]/g, '') : '';
    if (!rawPhone) {
      const inputPhone = prompt('দাতার হোয়াটসঅ্যাপ নম্বর লিখুন (যেমন: 017XXXXXXXX):');
      if (!inputPhone) return;
      rawPhone = inputPhone.replace(/[^0-9]/g, '');
    }

    const targetPhone = rawPhone.startsWith('88') ? rawPhone : '88' + rawPhone;
    const formattedAmt = Number(donation.amount).toLocaleString();

    const msg = `সম্মানিত ${donorName},\n\nআসসালামু আলাইকুম। এক মুঠো খাবার ও পুনর্বাসন ফাউন্ডেশনের পক্ষ থেকে আপনাকে আন্তরিক শুভেচ্ছা ও ধন্যবাদ!\n\nআপনার অনুদানের অফিশিয়াল রসিদের বিবরণ:\n- রসিদ নম্বর: ${donation.id}\n- তারিখ: ${donation.date}\n- অনুদানের পরিমাণ: ৳ ${formattedAmt} BDT\n- ফান্ড: ${fundName}\n- পেমেন্ট মাধ্যম: ${donation.paymentMethod} (Ref: ${donation.txnRef})\n- স্ট্যাটাস: Verified (যাচাইকৃত)\n\nঅনুদানের রসিদ অনলাইনে দেখতে ভিজিট করুন: https://ekmuthokhabar.org\n\nমানুষের পাশে থাকার জন্য ফাউন্ডেশনের পক্ষ থেকে চিরকৃতজ্ঞতা।`;

    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    showToast(`${donorName}-এর হোয়াটসঅ্যাপে রসিদের বিবরণ পাঠানো হচ্ছে...`, 'success');
  }

  downloadPDF(donationId) {
    const element = document.getElementById('printable-receipt');
    if (!element) return;
    
    if (window.html2pdf) {
      const opt = {
        margin:       0.5,
        filename:     `Receipt-${donationId}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    } else {
      window.print();
    }
  }
}

const receiptGen = new ReceiptGenerator();
