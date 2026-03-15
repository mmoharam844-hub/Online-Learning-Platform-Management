const Auth = {
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  async register(studentData) {
    const existing = Storage.query('students', s => s.phone === studentData.phone);
    if (existing.length > 0) {
      return { success: false, message: 'رقم الهاتف مسجل بالفعل' };
    }

    const hashedPassword = await this.hashPassword(studentData.password);
    const student = {
      fullName: studentData.fullName,
      gender: studentData.gender,
      governorate: studentData.governorate,
      grade: studentData.grade,
      phone: studentData.phone,
      passwordHash: hashedPassword,
      avatarDataUrl: null,
      isActive: true
    };

    Storage.add('students', student);
    return { success: true, message: 'تم إنشاء الحساب بنجاح', student };
  },

  async login(phone, password) {
    const students = Storage.query('students', s => s.phone === phone);
    if (students.length === 0) {
      return { success: false, message: 'يجب إنشاء حساب أولاً' };
    }

    const student = students[0];
    const hashedPassword = await this.hashPassword(password);

    if (student.passwordHash !== hashedPassword) {
      return { success: false, message: 'كلمة المرور غير صحيحة' };
    }

    if (!student.isActive) {
      return { success: false, message: 'الحساب غير مفعل. تواصل مع المعلم' };
    }

    this.setSession({ userId: student.id, role: 'student', loginAt: new Date().toISOString() });
    return { success: true, message: 'تم تسجيل الدخول بنجاح', student };
  },

  async adminLogin(username, password) {
    const admin = Storage.get('admin');
    if (!admin) return { success: false, message: 'خطأ في البيانات' };

    const hashedPassword = await this.hashPassword(password);
    if (admin.username !== username || admin.passwordHash !== hashedPassword) {
      return { success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' };
    }

    this.setSession({ userId: 'admin', role: 'admin', loginAt: new Date().toISOString() });
    return { success: true, message: 'تم تسجيل الدخول بنجاح' };
  },

  setSession(session) {
    Storage.set('session', session);
  },

  getSession() {
    return Storage.get('session');
  },

  logout() {
    localStorage.removeItem(APP_CONFIG.STORAGE_PREFIX + 'session');
    window.location.href = window.location.pathname.includes('/admin/') ? 'index.html' : 'login.html';
  },

  getCurrentUser() {
    const session = this.getSession();
    if (!session) return null;
    if (session.role === 'admin') return { ...session, fullName: 'المدير' };
    return Storage.getById('students', session.userId);
  },

  isLoggedIn() {
    return this.getSession() !== null;
  },

  isAdmin() {
    const session = this.getSession();
    return session && session.role === 'admin';
  },

  requireAuth(redirectUrl) {
    if (!this.isLoggedIn()) {
      window.location.href = redirectUrl || 'login.html';
      return false;
    }
    return true;
  },

  requireAdmin(redirectUrl) {
    if (!this.isAdmin()) {
      window.location.href = redirectUrl || 'index.html';
      return false;
    }
    return true;
  },

  requireGuest(redirectUrl) {
    if (this.isLoggedIn()) {
      const session = this.getSession();
      if (session.role === 'admin') {
        window.location.href = redirectUrl || 'admin/dashboard.html';
      } else {
        window.location.href = redirectUrl || 'dashboard.html';
      }
      return false;
    }
    return true;
  }
};
