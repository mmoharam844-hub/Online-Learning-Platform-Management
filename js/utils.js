const Utils = {
  $(selector) {
    return document.querySelector(selector);
  },

  $$(selector) {
    return document.querySelectorAll(selector);
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
      success: 'fas fa-check-circle',
      error: 'fas fa-times-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="${icons[type] || icons.info}"></i><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  },

  getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value.trim();
    }
    return data;
  },

  validatePhone(phone) {
    const cleaned = phone.replace(/\s|-/g, '');
    return /^01[0125]\d{8}$/.test(cleaned);
  },

  validateRequired(fields) {
    const errors = [];
    fields.forEach(({ value, name }) => {
      if (!value || !value.trim()) {
        errors.push(`${name} مطلوب`);
      }
    });
    return errors;
  },

  formatDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  formatDateTime(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  timeAgo(isoString) {
    const now = new Date();
    const date = new Date(isoString);
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return 'منذ لحظات';
    if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
    if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
    if (diff < 2592000) return `منذ ${Math.floor(diff / 86400)} يوم`;
    return this.formatDate(isoString);
  },

  getParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  },

  getGradeLabel(gradeValue) {
    const grade = APP_CONFIG.GRADES.find(g => g.value === gradeValue);
    return grade ? grade.label : gradeValue;
  },

  getPaymentLabel(method) {
    const pm = APP_CONFIG.PAYMENT_METHODS.find(p => p.value === method);
    return pm ? pm.label : method;
  },

  async fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  async compressImage(file, maxSize = 200) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          if (width > height) {
            if (width > maxSize) { height = (height * maxSize) / width; width = maxSize; }
          } else {
            if (height > maxSize) { width = (width * maxSize) / height; height = maxSize; }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  downloadCSV(headers, rows, filename) {
    const BOM = '\uFEFF';
    const escapeCSV = (val) => {
      const str = String(val || '');
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };
    const csv = BOM + [
      headers.map(escapeCSV).join(','),
      ...rows.map(r => r.map(escapeCSV).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  },

  showModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
  },

  hideModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
  },

  confirm(message) {
    return window.confirm(message);
  },

  renderHeader(currentPage) {
    const user = Auth.getCurrentUser();
    const isLoggedIn = Auth.isLoggedIn();

    let navHtml = '';
    let actionsHtml = '';

    if (isLoggedIn && user) {
      navHtml = `
        <a href="dashboard.html" class="${currentPage === 'dashboard' ? 'active' : ''}">الرئيسية</a>
        <a href="my-courses.html" class="${currentPage === 'my-courses' ? 'active' : ''}">كورساتي</a>
        <a href="notes.html" class="${currentPage === 'notes' ? 'active' : ''}">الملازم</a>
      `;
      actionsHtml = `
        <div class="header-user">
          <img src="${user.avatarDataUrl || 'assets/images/default-avatar.svg'}" alt="" class="avatar avatar-sm">
          <span>${user.fullName}</span>
        </div>
        <button onclick="Auth.logout()" class="btn btn-sm btn-outline">تسجيل خروج</button>
      `;
    } else {
      navHtml = `
        <a href="index.html" class="${currentPage === 'home' ? 'active' : ''}">الرئيسية</a>
      `;
      actionsHtml = `
        <a href="login.html" class="btn btn-sm btn-outline">تسجيل دخول</a>
        <a href="register.html" class="btn btn-sm btn-primary">إنشاء حساب</a>
      `;
    }

    return `
      <div class="container">
        <a href="index.html" class="header-logo">
          <img src="assets/images/logo.svg" alt="${APP_CONFIG.TEACHER_NAME}">
          <span>${APP_CONFIG.TEACHER_NAME}</span>
        </a>
        <button class="mobile-toggle" onclick="document.querySelector('.header-nav').classList.toggle('open')">
          <i class="fas fa-bars"></i>
        </button>
        <nav class="header-nav">
          ${navHtml}
          <div class="header-actions">
            ${actionsHtml}
          </div>
        </nav>
      </div>
    `;
  },

  renderAdminSidebar(currentPage) {
    const links = [
      { page: 'dashboard', icon: 'fas fa-chart-line', label: 'لوحة التحكم', href: 'dashboard.html' },
      { page: 'courses', icon: 'fas fa-book', label: 'إدارة الكورسات', href: 'courses.html' },
      { page: 'lessons', icon: 'fas fa-video', label: 'إدارة الدروس', href: 'lessons.html' },
      { page: 'notes', icon: 'fas fa-file-pdf', label: 'إدارة الملازم', href: 'notes.html' },
      { page: 'students', icon: 'fas fa-users', label: 'قاعدة بيانات الطلاب', href: 'students.html' },
      { page: 'payments', icon: 'fas fa-credit-card', label: 'نظام الدفع', href: 'payments.html' }
    ];

    return `
      <div class="sidebar-logo">
        <img src="../assets/images/logo.svg" alt="${APP_CONFIG.TEACHER_NAME}">
        <span>لوحة التحكم</span>
      </div>
      <nav class="sidebar-nav">
        ${links.map(l => `
          <a href="${l.href}" class="sidebar-link ${currentPage === l.page ? 'active' : ''}">
            <i class="${l.icon}"></i>
            <span>${l.label}</span>
          </a>
        `).join('')}
        <div class="sidebar-divider"></div>
        <a href="../index.html" class="sidebar-link">
          <i class="fas fa-home"></i>
          <span>الموقع الرئيسي</span>
        </a>
        <a href="#" class="sidebar-link" onclick="Auth.logout(); return false;">
          <i class="fas fa-sign-out-alt"></i>
          <span>تسجيل خروج</span>
        </a>
      </nav>
    `;
  },

  populateSelect(selectEl, options, valueKey, labelKey, placeholder) {
    selectEl.innerHTML = `<option value="">${placeholder || 'اختر...'}</option>`;
    options.forEach(opt => {
      const value = typeof opt === 'string' ? opt : opt[valueKey];
      const label = typeof opt === 'string' ? opt : opt[labelKey];
      selectEl.innerHTML += `<option value="${value}">${label}</option>`;
    });
  }
};
