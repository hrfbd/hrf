// ==========================================
// QUICK PLEDGE SYSTEM
// ==========================================

let quickPledgeData = {
  amount: 100,
  duration: 'একবার'
};

function setPledgeAmount(btn, amount) {
  document.querySelectorAll('#pledge-amount-group .amount-chip').forEach(el => el.classList.remove('active'));
  btn.classList.add('active');
  const input = document.getElementById('pledge-amount-input');
  
  if (amount === 'other') {
    input.style.display = 'block';
    quickPledgeData.amount = '';
    input.required = true;
  } else {
    input.style.display = 'none';
    quickPledgeData.amount = amount;
    input.required = false;
  }
}

function setPledgeDuration(btn, duration) {
  document.querySelectorAll('#pledge-duration-group .duration-chip').forEach(el => el.classList.remove('active'));
  btn.classList.add('active');
  quickPledgeData.duration = duration;
}

function handleQuickPledgeSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('pledge-name').value;
  const phone = document.getElementById('pledge-phone').value;
  let amount = quickPledgeData.amount;
  
  if (amount === '') {
    amount = document.getElementById('pledge-amount-input').value;
  }
  
  const pledge = {
    id: Date.now(),
    name,
    phone,
    amount: Number(amount),
    duration: quickPledgeData.duration,
    date: new Date().toISOString()
  };
  
  if(typeof db !== 'undefined') {
    db.addQuickPledge(pledge);
  }
  
  if(typeof showToast !== 'undefined') {
    showToast('ধন্যবাদ! আপনার সম্মতি গ্রহণ করা হয়েছে। খুব শীঘ্রই আমরা যোগাযোগ করব।', 'success');
  }
  e.target.reset();
  if(typeof showView !== 'undefined') {
    showView('view-home');
  }
}

function shareCampaign(platform) {
  let origin = window.location.origin;
  let pathname = window.location.pathname;
  
  // If running offline locally (file://), use a placeholder domain to avoid generating C:/ paths
  if (origin === 'null' || window.location.protocol === 'file:') {
    origin = 'https://[আপনার-ওয়েবসাইট-ডোমেইন.com]';
    pathname = '';
  }
  
  const link = origin + pathname + "#quick-pledge";
  const text = "আসসালামু আলাইকুম 🌻\n*এক মুঠো খাবার ও পুনর্বাসন ফাউন্ডেশন*-এর কার্যক্রমে শরিক হতে আপনাকে সাদর আমন্ত্রণ জানাচ্ছি! 🌻\n\nআপনার সামান্য অনুদান হাসি ফোটাতে পারে একটি সুবিধাবঞ্চিত শিশুর মুখে। \n\nনিচের লিঙ্কে ক্লিক করে খুব সহজেই আপনার অনুদানের পরিমাণ ও সময়কাল সিলেক্ট করে আমাদের সাথে যুক্ত হোন:\n👉 " + link;
  if (platform === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`, '_blank');
  } else if (platform === 'messenger') {
    window.open(`fb-messenger://share/?link=${encodeURIComponent(link)}`, '_blank');
  } else if (platform === 'whatsapp') {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  } else {
    navigator.clipboard.writeText(text);
    if(typeof showToast !== 'undefined') {
      showToast('লিঙ্ক কপি করা হয়েছে!', 'success');
    }
  }
}

// Check URL Hash for routing
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#quick-pledge') {
    setTimeout(() => {
      if(typeof showView !== 'undefined') {
         showView('view-quick-pledge');
      }
    }, 100);
  }
});
