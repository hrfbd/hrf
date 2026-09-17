/* ==========================================================================
   Ek Mutho Khabar Manobik Foundation - Transparency Engine & Visualizer
   ========================================================================== */

class TransparencyCenter {
  constructor() {
    this.chartInstance = null;
  }

  renderTransparencyDashboard() {
    const summary = db.getAccountingSummary();

    // Stat Values Update
    const openElem = document.getElementById('trans-opening-bal');
    if (openElem) openElem.innerText = `৳ ${summary.openingBalance.toLocaleString()}`;

    const incElem = document.getElementById('trans-total-income');
    if (incElem) incElem.innerText = `৳ ${summary.totalIncome.toLocaleString()}`;

    const expElem = document.getElementById('trans-total-expense');
    if (expElem) expElem.innerText = `৳ ${summary.totalExpense.toLocaleString()}`;

    const balElem = document.getElementById('trans-available-bal');
    if (balElem) balElem.innerText = `৳ ${summary.availableBalance.toLocaleString()}`;

    // Render Fund Cards
    const fundContainer = document.getElementById('fund-cards-container');
    if (fundContainer) {
      fundContainer.innerHTML = summary.fundSummaries.map(f => {
        const name = currentLang === 'bn' ? f.nameBn : f.nameEn;
        return `
          <div class="fund-card">
            <div class="fund-card-title">
              <span>${name}</span>
              <i class="fas fa-wallet" style="color:var(--primary-mid);"></i>
            </div>
            <div class="fund-row">
              <span>প্রারম্ভিক / Opening:</span>
              <strong>৳ ${f.opening.toLocaleString()}</strong>
            </div>
            <div class="fund-row">
              <span>মোট আয় / Received:</span>
              <strong style="color:var(--primary-accent);">+ ৳ ${f.income.toLocaleString()}</strong>
            </div>
            <div class="fund-row">
              <span>মোট ব্যয় / Spent:</span>
              <strong style="color:var(--accent-red);">- ৳ ${f.expense.toLocaleString()}</strong>
            </div>
            <div class="fund-balance">
              অবশিষ্ট / Balance: ৳ ${f.balance.toLocaleString()}
            </div>
          </div>
        `;
      }).join('');
    }

    // Render Recent Income & Expense Tables
    this.renderIncomeTable();
    this.renderExpenseTable();
    this.renderChart(summary.fundSummaries);
  }

  renderIncomeTable() {
    const tbody = document.getElementById('trans-income-tbody');
    if (!tbody) return;

    const list = db.data.donations.filter(d => d.status === 'Verified').slice(0, 10);
    tbody.innerHTML = list.map(d => {
      const fundObj = db.data.funds.find(f => f.id === d.fund);
      const fundName = currentLang === 'bn' ? (fundObj ? fundObj.nameBn : d.fund) : (fundObj ? fundObj.nameEn : d.fund);
      const donorName = d.isAnonymous ? 'Anonymous Donor' : d.donorName;

      return `
        <tr>
          <td><strong>${d.id}</strong></td>
          <td>${d.date}</td>
          <td>${donorName}</td>
          <td><span class="badge badge-verified">${fundName}</span></td>
          <td><strong>৳ ${Number(d.amount).toLocaleString()}</strong></td>
          <td>${d.paymentMethod}</td>
          <td>
            <button class="btn btn-sm btn-secondary" onclick="receiptGen.renderReceiptModal('${d.id}')">
              <i class="fas fa-receipt"></i> রসিদ
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  renderExpenseTable() {
    const tbody = document.getElementById('trans-expense-tbody');
    if (!tbody) return;

    const list = db.data.expenses.slice(0, 10);
    tbody.innerHTML = list.map(e => {
      const fundObj = db.data.funds.find(f => f.id === e.fund);
      const fundName = currentLang === 'bn' ? (fundObj ? fundObj.nameBn : e.fund) : (fundObj ? fundObj.nameEn : e.fund);
      const memoHtml = e.cashMemo ? `<br><a href="#" onclick="openModal('ক্যাশ মেমো', '<img src=\\'${e.cashMemo}\\' style=\\'width:100%; border-radius:var(--radius-md);\\'>'); return false;" style="font-size:0.8rem; color:var(--primary-accent);"><i class="fas fa-file-invoice"></i> মেমো দেখুন</a>` : '';

      return `
        <tr>
          <td><strong>${e.id}</strong></td>
          <td>${e.date}</td>
          <td>${e.category} ${memoHtml}</td>
          <td><span class="badge badge-pending">${fundName}</span></td>
          <td style="color:var(--accent-red);"><strong>- ৳ ${Number(e.amount).toLocaleString()}</strong></td>
          <td>${e.receiptNo}</td>
          <td>
            <span class="badge badge-verified"><i class="fas fa-check-double"></i> Verified</span>
          </td>
        </tr>
      `;
    }).join('');
  }

  renderChart(fundSummaries) {
    const ctx = document.getElementById('fundChart');
    if (!ctx || !window.Chart) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const labels = fundSummaries.map(f => currentLang === 'bn' ? f.nameBn.split(' ')[0] : f.nameEn);
    const incomeData = fundSummaries.map(f => f.income + f.opening);
    const expenseData = fundSummaries.map(f => f.expense);

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: currentLang === 'bn' ? 'মোট তহবিল' : 'Total Allocation',
            data: incomeData,
            backgroundColor: '#0F5A3E'
          },
          {
            label: currentLang === 'bn' ? 'ব্যয়িত পরিমাণ' : 'Spent Amount',
            data: expenseData,
            backgroundColor: '#DC2626'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}

const transparency = new TransparencyCenter();
