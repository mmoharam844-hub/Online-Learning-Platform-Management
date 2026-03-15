// Auto-seed demo data on first load
(async function seedData() {
  if (Storage.get('seeded')) return;

  // Seed admin account
  const adminHash = await Auth.hashPassword(APP_CONFIG.ADMIN_DEFAULT.password);
  Storage.set('admin', {
    username: APP_CONFIG.ADMIN_DEFAULT.username,
    passwordHash: adminHash
  });

  // Seed courses - كورسات أشعة تشخيصية
  const courses = [
    // كورسات لطلاب الطب
    {
      id: 'crs_001', name: 'أساسيات الأشعة العادية X-Ray',
      description: 'مقدمة شاملة في قراءة وتفسير الأشعة السينية العادية: الصدر والبطن والعظام والمفاصل',
      grade: 'med_student', price: 200, lessonsCount: 3, isPublished: true, createdAt: '2026-01-10T10:00:00Z'
    },
    {
      id: 'crs_002', name: 'تشريح الأشعة - Radiological Anatomy',
      description: 'التشريح الإشعاعي الأساسي لطلاب الطب: كيف تتعرف على التراكيب التشريحية في الصور الإشعاعية',
      grade: 'med_student', price: 250, lessonsCount: 3, isPublished: true, createdAt: '2026-01-15T10:00:00Z'
    },

    // كورسات لأطباء الامتياز
    {
      id: 'crs_003', name: 'الأشعة المقطعية CT Scan - المستوى الأول',
      description: 'أساسيات قراءة الأشعة المقطعية: المخ والصدر والبطن مع حالات عملية',
      grade: 'intern', price: 350, lessonsCount: 3, isPublished: true, createdAt: '2026-01-20T10:00:00Z'
    },
    {
      id: 'crs_004', name: 'حالات طوارئ في الأشعة - Emergency Radiology',
      description: 'قراءة أشعة حالات الطوارئ: الكسور والنزيف والانسداد المعوي والاسترواح الصدري',
      grade: 'intern', price: 300, lessonsCount: 2, isPublished: true, createdAt: '2026-02-01T10:00:00Z'
    },

    // كورسات لأخصائي الأشعة
    {
      id: 'crs_005', name: 'الرنين المغناطيسي MRI - شامل',
      description: 'كورس متقدم في الرنين المغناطيسي: الفيزياء والبروتوكولات وقراءة الصور مع حالات سريرية',
      grade: 'specialist', price: 500, lessonsCount: 3, isPublished: true, createdAt: '2026-02-05T10:00:00Z'
    },
    {
      id: 'crs_006', name: 'الأشعة التداخلية - Interventional Radiology',
      description: 'مقدمة في الأشعة التداخلية: القسطرة التشخيصية والعلاجية والخزعات الموجهة',
      grade: 'specialist', price: 450, lessonsCount: 2, isPublished: true, createdAt: '2026-02-10T10:00:00Z'
    },

    // كورسات لفنيين الأشعة
    {
      id: 'crs_007', name: 'بروتوكولات التصوير الإشعاعي',
      description: 'البروتوكولات المعتمدة في تصوير الأشعة العادية والمقطعية: الوضعيات والإعدادات الصحيحة',
      grade: 'technician', price: 200, lessonsCount: 3, isPublished: true, createdAt: '2026-02-15T10:00:00Z'
    },
    {
      id: 'crs_008', name: 'الوقاية من الإشعاع - Radiation Protection',
      description: 'أساسيات الوقاية من الإشعاع وقواعد السلامة للعاملين في أقسام الأشعة',
      grade: 'technician', price: 150, lessonsCount: 2, isPublished: true, createdAt: '2026-02-20T10:00:00Z'
    }
  ];
  Storage.save('courses', courses);

  // Seed lessons
  const lessons = [
    // أساسيات X-Ray
    { id: 'les_001', courseId: 'crs_001', title: 'قراءة أشعة الصدر - Chest X-Ray', description: 'المنهج المنظم لقراءة أشعة الصدر: ABCDE approach مع حالات طبيعية وغير طبيعية', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '45:00', order: 1, homework: 'حلل 5 صور أشعة صدر باستخدام ABCDE approach', createdAt: '2026-01-11T10:00:00Z' },
    { id: 'les_002', courseId: 'crs_001', title: 'أشعة البطن - Abdominal X-Ray', description: 'قراءة أشعة البطن: توزيع الغازات والسوائل وعلامات الانسداد المعوي', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '40:00', order: 2, homework: 'حدد الفرق بين الانسداد في الأمعاء الدقيقة والغليظة', createdAt: '2026-01-12T10:00:00Z' },
    { id: 'les_003', courseId: 'crs_001', title: 'أشعة العظام والمفاصل', description: 'قراءة أشعة العظام: أنواع الكسور والخلع والتغيرات التنكسية', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '50:00', order: 3, homework: 'صنّف أنواع الكسور في الصور المرفقة', createdAt: '2026-01-13T10:00:00Z' },

    // تشريح الأشعة
    { id: 'les_004', courseId: 'crs_002', title: 'التشريح الإشعاعي للصدر', description: 'التعرف على تراكيب الصدر في الأشعة: القلب والرئتين والمنصف والأوعية الدموية', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '55:00', order: 1, homework: 'ارسم وحدد التراكيب التشريحية على صورة أشعة صدر', createdAt: '2026-01-16T10:00:00Z' },
    { id: 'les_005', courseId: 'crs_002', title: 'التشريح الإشعاعي للبطن والحوض', description: 'التعرف على أعضاء البطن والحوض في الأشعة المقطعية والعادية', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '50:00', order: 2, homework: 'حدد الأعضاء في مقاطع CT البطن', createdAt: '2026-01-17T10:00:00Z' },
    { id: 'les_006', courseId: 'crs_002', title: 'التشريح الإشعاعي للجهاز العصبي', description: 'تراكيب المخ والحبل الشوكي في الأشعة المقطعية والرنين المغناطيسي', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '60:00', order: 3, homework: 'حدد الفصوص والبطينات في مقاطع CT المخ', createdAt: '2026-01-18T10:00:00Z' },

    // CT Scan
    { id: 'les_007', courseId: 'crs_003', title: 'أساسيات الأشعة المقطعية وفيزياء CT', description: 'كيف يعمل جهاز CT: الفيزياء والإعدادات وأنواع البروتوكولات', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '45:00', order: 1, homework: 'اشرح الفرق بين CT بالصبغة وبدون صبغة', createdAt: '2026-01-21T10:00:00Z' },
    { id: 'les_008', courseId: 'crs_003', title: 'CT المخ - حالات عملية', description: 'قراءة CT المخ: النزيف والجلطات والأورام مع حالات من الطوارئ', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '55:00', order: 2, homework: 'فرّق بين أنواع النزيف داخل الجمجمة في الصور', createdAt: '2026-01-22T10:00:00Z' },
    { id: 'les_009', courseId: 'crs_003', title: 'CT الصدر والبطن - حالات عملية', description: 'قراءة CT الصدر والبطن: الانصباب والأورام وتمدد الشريان الأورطي', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '60:00', order: 3, homework: 'حلل 3 حالات CT صدر وحدد التشخيص', createdAt: '2026-01-23T10:00:00Z' },

    // Emergency Radiology
    { id: 'les_010', courseId: 'crs_004', title: 'أشعة الطوارئ - الصدر الحاد', description: 'الاسترواح الصدري والانصباب الجنبي وذات الرئة الحادة في الأشعة', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '45:00', order: 1, homework: 'حدد علامات الاسترواح الصدري في الأشعة', createdAt: '2026-02-02T10:00:00Z' },
    { id: 'les_011', courseId: 'crs_004', title: 'أشعة الطوارئ - البطن الحاد', description: 'الانسداد المعوي وثقب الأمعاء والتهاب الزائدة الدودية والتواء الأمعاء', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '50:00', order: 2, homework: 'اشرح علامات الانسداد المعوي في الأشعة العادية وCT', createdAt: '2026-02-03T10:00:00Z' },

    // MRI
    { id: 'les_012', courseId: 'crs_005', title: 'فيزياء الرنين المغناطيسي MRI', description: 'أساسيات فيزياء MRI: T1 وT2 وFLAIR وDiffusion وكيفية اختيار البروتوكول المناسب', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '60:00', order: 1, homework: 'فرّق بين T1 وT2 في صور MRI المخ', createdAt: '2026-02-06T10:00:00Z' },
    { id: 'les_013', courseId: 'crs_005', title: 'MRI المخ والعمود الفقري', description: 'قراءة MRI الجهاز العصبي: الأورام والتصلب المتعدد والانزلاق الغضروفي', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '55:00', order: 2, homework: 'حلل 3 حالات MRI مخ وحدد التشخيص', createdAt: '2026-02-07T10:00:00Z' },
    { id: 'les_014', courseId: 'crs_005', title: 'MRI المفاصل والأنسجة الرخوة', description: 'قراءة MRI الركبة والكتف: تمزق الأربطة والغضاريف وإصابات الكفة المدورة', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '50:00', order: 3, homework: 'حدد إصابات الرباط الصليبي في صور MRI الركبة', createdAt: '2026-02-08T10:00:00Z' },

    // Interventional Radiology
    { id: 'les_015', courseId: 'crs_006', title: 'مقدمة في الأشعة التداخلية', description: 'مبادئ الأشعة التداخلية: أنواع الإجراءات والأدوات المستخدمة والمؤشرات السريرية', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '45:00', order: 1, homework: 'اذكر 5 إجراءات تداخلية شائعة مع مؤشراتها', createdAt: '2026-02-11T10:00:00Z' },
    { id: 'les_016', courseId: 'crs_006', title: 'الخزعات الموجهة بالأشعة', description: 'أنواع الخزعات الموجهة بالموجات فوق الصوتية وCT: التقنية والمضاعفات', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '50:00', order: 2, homework: 'قارن بين الخزعة الموجهة بـ US وCT', createdAt: '2026-02-12T10:00:00Z' },

    // بروتوكولات التصوير
    { id: 'les_017', courseId: 'crs_007', title: 'بروتوكولات الأشعة العادية', description: 'الوضعيات الصحيحة لتصوير الصدر والبطن والأطراف مع معايير الجودة', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '40:00', order: 1, homework: 'اكتب بروتوكول تصوير أشعة صدر PA و Lateral', createdAt: '2026-02-16T10:00:00Z' },
    { id: 'les_018', courseId: 'crs_007', title: 'بروتوكولات CT المتقدمة', description: 'إعدادات CT: kV وmA وسُمك المقاطع وبروتوكولات الصبغة الوريدية', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '50:00', order: 2, homework: 'صمم بروتوكول CT بطن بالصبغة', createdAt: '2026-02-17T10:00:00Z' },
    { id: 'les_019', courseId: 'crs_007', title: 'معايير جودة الصورة الإشعاعية', description: 'تقييم جودة الصورة: التباين والوضوح والضوضاء وكيفية تحسينها', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '35:00', order: 3, homework: 'حدد مشاكل الجودة في الصور المرفقة واقترح حلول', createdAt: '2026-02-18T10:00:00Z' },

    // الوقاية من الإشعاع
    { id: 'les_020', courseId: 'crs_008', title: 'أساسيات الفيزياء الإشعاعية والجرعات', description: 'أنواع الإشعاع ووحدات القياس وحدود الجرعات المسموحة للعاملين والمرضى', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '40:00', order: 1, homework: 'احسب الجرعة الفعالة لإجراءات أشعة مختلفة', createdAt: '2026-02-21T10:00:00Z' },
    { id: 'les_021', courseId: 'crs_008', title: 'وسائل الحماية من الإشعاع', description: 'أدوات الوقاية: المريلة الرصاصية وواقي الغدة الدرقية وقواعد الزمن والمسافة والحواجز', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '35:00', order: 2, homework: 'صمم خطة وقاية إشعاعية لغرفة أشعة مقطعية', createdAt: '2026-02-22T10:00:00Z' }
  ];
  Storage.save('lessons', lessons);

  // Seed notes
  const notes = [
    { id: 'note_001', title: 'أطلس أشعة الصدر - Chest X-Ray Atlas', type: 'note', grade: 'med_student', fileUrl: '#', createdAt: '2026-02-01T10:00:00Z' },
    { id: 'note_002', title: 'امتحان أساسيات الأشعة - طلاب طب', type: 'exam', grade: 'med_student', fileUrl: '#', createdAt: '2026-02-05T10:00:00Z' },
    { id: 'note_003', title: 'ملزمة CT المخ - حالات وتشخيصات', type: 'note', grade: 'intern', fileUrl: '#', createdAt: '2026-02-08T10:00:00Z' },
    { id: 'note_004', title: 'امتحان حالات طوارئ في الأشعة', type: 'exam', grade: 'intern', fileUrl: '#', createdAt: '2026-02-10T10:00:00Z' },
    { id: 'note_005', title: 'ملزمة فيزياء MRI الشاملة', type: 'note', grade: 'specialist', fileUrl: '#', createdAt: '2026-02-12T10:00:00Z' },
    { id: 'note_006', title: 'أطلس MRI المخ والعمود الفقري', type: 'note', grade: 'specialist', fileUrl: '#', createdAt: '2026-02-15T10:00:00Z' },
    { id: 'note_007', title: 'دليل بروتوكولات التصوير المعتمدة', type: 'note', grade: 'technician', fileUrl: '#', createdAt: '2026-02-18T10:00:00Z' },
    { id: 'note_008', title: 'امتحان الوقاية من الإشعاع', type: 'exam', grade: 'technician', fileUrl: '#', createdAt: '2026-02-20T10:00:00Z' }
  ];
  Storage.save('notes', notes);

  // Seed demo students
  const studentHash = await Auth.hashPassword('123456');
  const students = [
    {
      id: 'stu_001', fullName: 'أحمد محمد السيد', gender: 'male', governorate: 'القاهرة',
      grade: 'med_student', phone: '01012345678', passwordHash: studentHash,
      avatarDataUrl: null, isActive: true, createdAt: '2026-01-10T10:00:00Z'
    },
    {
      id: 'stu_002', fullName: 'سارة أحمد حسن', gender: 'female', governorate: 'الجيزة',
      grade: 'intern', phone: '01098765432', passwordHash: studentHash,
      avatarDataUrl: null, isActive: true, createdAt: '2026-01-12T10:00:00Z'
    },
    {
      id: 'stu_003', fullName: 'محمد إبراهيم عبدالله', gender: 'male', governorate: 'الإسكندرية',
      grade: 'specialist', phone: '01155544433', passwordHash: studentHash,
      avatarDataUrl: null, isActive: true, createdAt: '2026-01-15T10:00:00Z'
    },
    {
      id: 'stu_004', fullName: 'نورهان علي مصطفى', gender: 'female', governorate: 'المنيا',
      grade: 'technician', phone: '01277788899', passwordHash: studentHash,
      avatarDataUrl: null, isActive: true, createdAt: '2026-01-20T10:00:00Z'
    }
  ];
  Storage.save('students', students);

  // Seed subscriptions
  const subscriptions = [
    {
      id: 'sub_001', studentId: 'stu_001', courseId: 'crs_001', status: 'approved',
      paymentMethod: 'vodafone_cash', paymentReference: '01012345678', amount: 200,
      requestedAt: '2026-01-11T12:00:00Z', approvedAt: '2026-01-11T14:00:00Z', notes: ''
    },
    {
      id: 'sub_002', studentId: 'stu_002', courseId: 'crs_003', status: 'approved',
      paymentMethod: 'instapay', paymentReference: '01098765432', amount: 350,
      requestedAt: '2026-01-21T10:00:00Z', approvedAt: '2026-01-21T12:00:00Z', notes: ''
    },
    {
      id: 'sub_003', studentId: 'stu_003', courseId: 'crs_005', status: 'pending',
      paymentMethod: 'vodafone_cash', paymentReference: '01155544433', amount: 500,
      requestedAt: '2026-02-06T10:00:00Z', approvedAt: null, notes: ''
    },
    {
      id: 'sub_004', studentId: 'stu_004', courseId: 'crs_007', status: 'pending',
      paymentMethod: 'instapay', paymentReference: '01277788899', amount: 200,
      requestedAt: '2026-02-16T10:00:00Z', approvedAt: null, notes: ''
    }
  ];
  Storage.save('subscriptions', subscriptions);

  // Seed progress
  const progress = [
    { id: 'prog_001', studentId: 'stu_001', courseId: 'crs_001', lessonId: 'les_001', completed: true, completedAt: '2026-01-12T10:00:00Z' },
    { id: 'prog_002', studentId: 'stu_001', courseId: 'crs_001', lessonId: 'les_002', completed: true, completedAt: '2026-01-14T10:00:00Z' },
    { id: 'prog_003', studentId: 'stu_002', courseId: 'crs_003', lessonId: 'les_007', completed: true, completedAt: '2026-01-23T10:00:00Z' }
  ];
  Storage.save('progress', progress);

  Storage.set('seeded', true);
  console.log('تم تحميل البيانات التجريبية بنجاح!');
})();
