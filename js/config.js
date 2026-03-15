const APP_CONFIG = {
  APP_NAME: 'منصة أ/ أمين خليل التعليمية',
  TEACHER_NAME: 'أ/ أمين خليل',
  TEACHER_SLOGAN: 'أنت معنا في أيادي أمينة',
  STORAGE_PREFIX: 'ek_',
  YOUTUBE_VIDEO: 'https://www.youtube.com/embed/JjPkTOabsX8',

  GRADES: [
    { value: '1st_prep', label: 'الصف الأول الإعدادي الأزهري' },
    { value: '2nd_prep', label: 'الصف الثاني الإعدادي الأزهري' },
    { value: '3rd_prep', label: 'الصف الثالث الإعدادي الأزهري' },
    { value: '1st_secondary', label: 'الصف الأول الثانوي الأزهري' },
    { value: '2nd_secondary', label: 'الصف الثاني الثانوي الأزهري' },
    { value: '3rd_secondary', label: 'الصف الثالث الثانوي الأزهري' }
  ],

  GRADE_GROUPS: [
    { label: 'المرحلة الإعدادية', grades: ['1st_prep', '2nd_prep', '3rd_prep'] },
    { label: 'المرحلة الثانوية', grades: ['1st_secondary', '2nd_secondary', '3rd_secondary'] }
  ],

  SUBJECTS: [
    { value: 'fiqh', label: 'الفقه' },
    { value: 'tawheed', label: 'التوحيد' },
    { value: 'tafseer', label: 'التفسير' },
    { value: 'hadith', label: 'الحديث' }
  ],

  GOVERNORATES: [
    'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'البحر الأحمر',
    'البحيرة', 'الفيوم', 'الغربية', 'الإسماعيلية', 'المنوفية',
    'المنيا', 'القليوبية', 'الوادي الجديد', 'السويس', 'أسوان',
    'أسيوط', 'بني سويف', 'بورسعيد', 'دمياط', 'الشرقية',
    'جنوب سيناء', 'كفر الشيخ', 'مطروح', 'الأقصر', 'قنا',
    'شمال سيناء', 'سوهاج'
  ],

  PAYMENT_METHODS: [
    { value: 'vodafone_cash', label: 'فودافون كاش' },
    { value: 'instapay', label: 'إنستاباي' }
  ],

  CONTACT: {
    telegram: 'https://t.me/teacher_amin',
    whatsapp: 'https://wa.me/201234567890'
  },

  ADMIN_DEFAULT: {
    username: 'admin',
    password: 'admin123'
  }
};
