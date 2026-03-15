// Auto-seed demo data on first load (version-based re-seeding)
const SEED_VERSION = 3; // Increment this to force re-seed with new data

window.seedReady = (async function seedData() {
  const currentVersion = Storage.get('seed_version');
  if (currentVersion === SEED_VERSION) return;

  // Clear old data if re-seeding
  if (Storage.get('seeded')) {
    Storage.save('courses', []);
    Storage.save('lessons', []);
    Storage.save('notes', []);
    Storage.save('students', []);
    Storage.save('subscriptions', []);
    Storage.save('progress', []);
    Storage.save('quizzes', []);
    Storage.save('quiz_results', []);
    console.log('إعادة تحميل البيانات التجريبية (إصدار جديد)...');
  }

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

  // Seed lessons - فيديوهات حقيقية من محاضرات أ.د/ ممدوح محفوظ
  const lessons = [
    // أساسيات X-Ray
    { id: 'les_001', courseId: 'crs_001', title: 'Chest X-Ray - قراءة أشعة الصدر', description: 'المنهج المنظم لقراءة أشعة الصدر مع حالات طبيعية وغير طبيعية - محاضرة أ.د/ ممدوح محفوظ', videoUrl: 'https://www.youtube.com/embed/BpXfToKwsFo', duration: '45:00', order: 1, homework: 'حلل 5 صور أشعة صدر باستخدام المنهج المنظم', createdAt: '2026-01-11T10:00:00Z' },
    { id: 'les_002', courseId: 'crs_001', title: 'Chest X-Ray Interpretation - تفسير أشعة الصدر', description: 'تفسير أشعة الصدر للمبتدئين مع شرح المصطلحات والتقنيات', videoUrl: 'https://www.youtube.com/embed/48Ldslp7hq4', duration: '40:00', order: 2, homework: 'اكتب تقرير أشعة صدر لـ 3 حالات مختلفة', createdAt: '2026-01-12T10:00:00Z' },
    { id: 'les_003', courseId: 'crs_001', title: 'Chest X-Ray Cases - حالات أشعة صدر عملية', description: 'جلسة قراءة حالات أشعة صدر عملية مع التشخيص', videoUrl: 'https://www.youtube.com/embed/QE366zmy-VA', duration: '50:00', order: 3, homework: 'حدد التشخيص في الحالات المرفقة', createdAt: '2026-01-13T10:00:00Z' },

    // تشريح الأشعة
    { id: 'les_004', courseId: 'crs_002', title: 'Normal Brain Anatomy - CT & MRI', description: 'التشريح الطبيعي للمخ في الأشعة المقطعية والرنين المغناطيسي - أ.د/ ممدوح محفوظ', videoUrl: 'https://www.youtube.com/embed/pC8CYFOSeDw', duration: '55:00', order: 1, homework: 'حدد التراكيب التشريحية للمخ في صور CT', createdAt: '2026-01-16T10:00:00Z' },
    { id: 'les_005', courseId: 'crs_002', title: 'Urinary System Radiology - أشعة الجهاز البولي', description: 'التشريح الإشعاعي للجهاز البولي وطرق التصوير المختلفة', videoUrl: 'https://www.youtube.com/embed/AG8vTgT5wCU', duration: '50:00', order: 2, homework: 'ارسم وحدد تراكيب الجهاز البولي في الأشعة', createdAt: '2026-01-17T10:00:00Z' },
    { id: 'les_006', courseId: 'crs_002', title: 'Conventional Radiology - الأشعة التقليدية', description: 'أساسيات الأشعة التقليدية وتطبيقاتها السريرية', videoUrl: 'https://www.youtube.com/embed/CuJsDI9IqW0', duration: '60:00', order: 3, homework: 'قارن بين تقنيات التصوير التقليدية المختلفة', createdAt: '2026-01-18T10:00:00Z' },

    // CT Scan
    { id: 'les_007', courseId: 'crs_003', title: 'How to Interpret CT Chest', description: 'كيف تقرأ الأشعة المقطعية للصدر: المنهج المنظم مع حالات عملية - أ.د/ ممدوح محفوظ', videoUrl: 'https://www.youtube.com/embed/EPqP1Z8MmvY', duration: '45:00', order: 1, homework: 'اشرح الفرق بين CT بالصبغة وبدون صبغة', createdAt: '2026-01-21T10:00:00Z' },
    { id: 'les_008', courseId: 'crs_003', title: 'Imaging of Traumatic Brain Injury', description: 'تصوير إصابات المخ: النزيف والكسور والإصابات المحورية - أ.د/ ممدوح محفوظ', videoUrl: 'https://www.youtube.com/embed/1K9x15bGxVI', duration: '55:00', order: 2, homework: 'فرّق بين أنواع النزيف داخل الجمجمة في الصور', createdAt: '2026-01-22T10:00:00Z' },
    { id: 'les_009', courseId: 'crs_003', title: 'CT Liver - الأشعة المقطعية للكبد', description: 'قراءة CT الكبد: التشريح والأورام والأمراض المنتشرة', videoUrl: 'https://www.youtube.com/embed/KTzAtarFX0Y', duration: '60:00', order: 3, homework: 'حلل 3 حالات CT كبد وحدد التشخيص', createdAt: '2026-01-23T10:00:00Z' },

    // Emergency Radiology
    { id: 'les_010', courseId: 'crs_004', title: 'Imaging of Pleural Lesions', description: 'تصوير أمراض غشاء الجنب: الانصباب والاسترواح الصدري والأورام', videoUrl: 'https://www.youtube.com/embed/IeIUWP5THAQ', duration: '45:00', order: 1, homework: 'حدد علامات الاسترواح الصدري في الأشعة', createdAt: '2026-02-02T10:00:00Z' },
    { id: 'les_011', courseId: 'crs_004', title: 'Imaging of Focal Lung Lesions', description: 'تصوير الآفات الرئوية البؤرية في أشعة الصدر - أ.د/ ممدوح محفوظ', videoUrl: 'https://www.youtube.com/embed/IjE5U0zUD6Y', duration: '50:00', order: 2, homework: 'صنّف أنواع الآفات الرئوية البؤرية', createdAt: '2026-02-03T10:00:00Z' },

    // MRI
    { id: 'les_012', courseId: 'crs_005', title: 'Basics of MRI - أساسيات الرنين المغناطيسي', description: 'أساسيات فيزياء MRI: T1 وT2 وFLAIR وDiffusion - أ.د/ ممدوح محفوظ', videoUrl: 'https://www.youtube.com/embed/hsUh3j1gr74', duration: '60:00', order: 1, homework: 'فرّق بين T1 وT2 في صور MRI المخ', createdAt: '2026-02-06T10:00:00Z' },
    { id: 'les_013', courseId: 'crs_005', title: 'Cardiac Imaging - تصوير القلب', description: 'أساسيات تصوير القلب بالأشعة المقطعية والرنين المغناطيسي', videoUrl: 'https://www.youtube.com/embed/SxMp5_ISQCA', duration: '55:00', order: 2, homework: 'حدد التراكيب القلبية في صور MRI', createdAt: '2026-02-07T10:00:00Z' },
    { id: 'les_014', courseId: 'crs_005', title: 'Imaging of Knee Joint - تصوير مفصل الركبة', description: 'قراءة MRI الركبة: الأربطة والغضاريف والإصابات - أ.د/ ممدوح محفوظ', videoUrl: 'https://www.youtube.com/embed/I7u2hmvxY68', duration: '50:00', order: 3, homework: 'حدد إصابات الرباط الصليبي في صور MRI الركبة', createdAt: '2026-02-08T10:00:00Z' },

    // Interventional Radiology
    { id: 'les_015', courseId: 'crs_006', title: 'Shoulder Joint Imaging - تصوير مفصل الكتف', description: 'تصوير مفصل الكتف: التقنيات والإصابات الشائعة - أ.د/ ممدوح محفوظ', videoUrl: 'https://www.youtube.com/embed/Au9YsrHqHwI', duration: '45:00', order: 1, homework: 'حدد إصابات الكفة المدورة في صور MRI', createdAt: '2026-02-11T10:00:00Z' },
    { id: 'les_016', courseId: 'crs_006', title: 'MSK Imaging - Bone Infections', description: 'تصوير التهابات العظام: التشخيص والمتابعة بالأشعة - أ.د/ ممدوح محفوظ', videoUrl: 'https://www.youtube.com/embed/1vj8iQVOeKE', duration: '50:00', order: 2, homework: 'فرّق بين التهاب العظام الحاد والمزمن في الأشعة', createdAt: '2026-02-12T10:00:00Z' },

    // بروتوكولات التصوير
    { id: 'les_017', courseId: 'crs_007', title: 'Chest X-Ray Techniques & Terminology', description: 'تقنيات ومصطلحات تصوير أشعة الصدر - أ.د/ ممدوح محفوظ', videoUrl: 'https://www.youtube.com/embed/LjSp_t1OlDY', duration: '40:00', order: 1, homework: 'اكتب بروتوكول تصوير أشعة صدر PA و Lateral', createdAt: '2026-02-16T10:00:00Z' },
    { id: 'les_018', courseId: 'crs_007', title: 'Chest III - أشعة الصدر المتقدمة', description: 'موضوعات متقدمة في أشعة الصدر - أ.د/ ممدوح محفوظ', videoUrl: 'https://www.youtube.com/embed/PHddB8ixLFI', duration: '50:00', order: 2, homework: 'حلل حالات أشعة صدر متقدمة', createdAt: '2026-02-17T10:00:00Z' },
    { id: 'les_019', courseId: 'crs_007', title: 'Petrous Bone Imaging - تصوير العظم الصخري', description: 'تصوير العظم الصخري والأذن الداخلية بالأشعة المقطعية', videoUrl: 'https://www.youtube.com/embed/7XHSbaq0Pzw', duration: '35:00', order: 3, homework: 'حدد التراكيب التشريحية للعظم الصخري في CT', createdAt: '2026-02-18T10:00:00Z' },

    // الوقاية من الإشعاع
    { id: 'les_020', courseId: 'crs_008', title: 'Orthopedic Hardware Imaging', description: 'تصوير المعدات الجراحية العظمية في الأشعة: المسامير والشرائح والمفاصل الصناعية', videoUrl: 'https://www.youtube.com/embed/RKKcI1QH9M0', duration: '40:00', order: 1, homework: 'حدد أنواع التثبيت الجراحي في الأشعة المرفقة', createdAt: '2026-02-21T10:00:00Z' },
    { id: 'les_021', courseId: 'crs_008', title: 'Chest X-Rays BRC - حالات عملية متقدمة', description: 'حالات أشعة صدر عملية من المؤتمرات الطبية - أ.د/ ممدوح محفوظ', videoUrl: 'https://www.youtube.com/embed/2AbiTRpGwJc', duration: '35:00', order: 2, homework: 'حلل الحالات واكتب تقارير مفصلة', createdAt: '2026-02-22T10:00:00Z' }
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
    { id: 'stu_001', fullName: 'أحمد محمد السيد', gender: 'male', governorate: 'القاهرة', grade: 'med_student', phone: '01012345678', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-01-10T10:00:00Z' },
    { id: 'stu_002', fullName: 'سارة أحمد حسن', gender: 'female', governorate: 'الجيزة', grade: 'intern', phone: '01098765432', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-01-12T10:00:00Z' },
    { id: 'stu_003', fullName: 'محمد إبراهيم عبدالله', gender: 'male', governorate: 'الإسكندرية', grade: 'specialist', phone: '01155544433', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-01-15T10:00:00Z' },
    { id: 'stu_004', fullName: 'نورهان علي مصطفى', gender: 'female', governorate: 'المنيا', grade: 'technician', phone: '01277788899', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-01-20T10:00:00Z' },
    { id: 'stu_005', fullName: 'عبدالرحمن خالد يوسف', gender: 'male', governorate: 'الدقهلية', grade: 'med_student', phone: '01011122233', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-01-22T10:00:00Z' },
    { id: 'stu_006', fullName: 'فاطمة حسين عمر', gender: 'female', governorate: 'الشرقية', grade: 'med_student', phone: '01244455566', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-01-23T10:00:00Z' },
    { id: 'stu_007', fullName: 'كريم وليد سامي', gender: 'male', governorate: 'البحيرة', grade: 'intern', phone: '01099988877', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-01-25T10:00:00Z' },
    { id: 'stu_008', fullName: 'مريم طارق عبدالحميد', gender: 'female', governorate: 'الغربية', grade: 'intern', phone: '01566677788', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-01-26T10:00:00Z' },
    { id: 'stu_009', fullName: 'يوسف عادل محمود', gender: 'male', governorate: 'أسيوط', grade: 'specialist', phone: '01122233344', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-01-28T10:00:00Z' },
    { id: 'stu_010', fullName: 'هدى مصطفى إبراهيم', gender: 'female', governorate: 'سوهاج', grade: 'technician', phone: '01088899900', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-01-29T10:00:00Z' },
    { id: 'stu_011', fullName: 'عمرو جمال الدين', gender: 'male', governorate: 'المنوفية', grade: 'med_student', phone: '01533344455', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-02-01T10:00:00Z' },
    { id: 'stu_012', fullName: 'ياسمين محمد عبدالله', gender: 'female', governorate: 'القليوبية', grade: 'intern', phone: '01211122233', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-02-02T10:00:00Z' },
    { id: 'stu_013', fullName: 'حسام الدين أشرف', gender: 'male', governorate: 'بورسعيد', grade: 'specialist', phone: '01066677788', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-02-03T10:00:00Z' },
    { id: 'stu_014', fullName: 'رنا سمير حسن', gender: 'female', governorate: 'دمياط', grade: 'technician', phone: '01544455566', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-02-04T10:00:00Z' },
    { id: 'stu_015', fullName: 'مصطفى هشام علي', gender: 'male', governorate: 'الفيوم', grade: 'med_student', phone: '01177788899', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-02-05T10:00:00Z' },
    { id: 'stu_016', fullName: 'آية عبدالعزيز محمود', gender: 'female', governorate: 'بني سويف', grade: 'intern', phone: '01055566677', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-02-06T10:00:00Z' },
    { id: 'stu_017', fullName: 'تامر عصام فاروق', gender: 'male', governorate: 'الأقصر', grade: 'specialist', phone: '01288899900', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-02-07T10:00:00Z' },
    { id: 'stu_018', fullName: 'نادين حازم شريف', gender: 'female', governorate: 'أسوان', grade: 'technician', phone: '01577788899', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-02-08T10:00:00Z' },
    { id: 'stu_019', fullName: 'إسلام رضا عبدالحكيم', gender: 'male', governorate: 'كفر الشيخ', grade: 'med_student', phone: '01133344455', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-02-09T10:00:00Z' },
    { id: 'stu_020', fullName: 'شيماء عبدالرحمن فتحي', gender: 'female', governorate: 'الإسماعيلية', grade: 'intern', phone: '01066655544', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-02-10T10:00:00Z' },
    { id: 'stu_021', fullName: 'عمر حسن عبدالنبي', gender: 'male', governorate: 'السويس', grade: 'specialist', phone: '01200011122', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-02-11T10:00:00Z' },
    { id: 'stu_022', fullName: 'دينا ماهر صلاح', gender: 'female', governorate: 'قنا', grade: 'technician', phone: '01555566677', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-02-12T10:00:00Z' },
    { id: 'stu_023', fullName: 'خالد نبيل عبدالفتاح', gender: 'male', governorate: 'البحر الأحمر', grade: 'med_student', phone: '01144455566', passwordHash: studentHash, avatarDataUrl: null, isActive: true, createdAt: '2026-02-13T10:00:00Z' },
    { id: 'stu_024', fullName: 'لمياء فؤاد رشدي', gender: 'female', governorate: 'مطروح', grade: 'intern', phone: '01077788899', passwordHash: studentHash, avatarDataUrl: null, isActive: false, createdAt: '2026-02-14T10:00:00Z' }
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

  // Seed quizzes - اختبارات سريعة بعد كل درس
  const quizzes = [
    {
      id: 'quiz_001', lessonId: 'les_001',
      questions: [
        { text: 'ما هو أول شيء يجب التحقق منه عند قراءة أشعة الصدر؟', options: ['حجم القلب', 'بيانات المريض والجودة التقنية', 'الرئتين', 'العظام'], correct: 1 },
        { text: 'ما هو الحجم الطبيعي لنسبة القلب إلى الصدر (CTR)؟', options: ['أقل من 30%', 'أقل من 40%', 'أقل من 50%', 'أقل من 60%'], correct: 2 },
        { text: 'في أشعة الصدر PA، أين يكون المريض بالنسبة للفيلم؟', options: ['ظهره للفيلم', 'صدره للفيلم', 'جانبه للفيلم', 'لا فرق'], correct: 1 },
        { text: 'ما هي علامة الانصباب الجنبي في أشعة الصدر؟', options: ['زيادة شفافية الرئة', 'انحناء خط الحجاب الحاجز', 'طمس الزاوية الضلعية الحجابية', 'تضخم القلب'], correct: 2 }
      ]
    },
    {
      id: 'quiz_002', lessonId: 'les_002',
      questions: [
        { text: 'ما هو الفرق بين أشعة PA و AP للصدر؟', options: ['لا فرق', 'في PA الأشعة تدخل من الخلف وتخرج من الأمام', 'في AP الصورة أوضح', 'PA تستخدم فقط للأطفال'], correct: 1 },
        { text: 'ما سبب ظهور القلب أكبر من حجمه الحقيقي في أشعة AP؟', options: ['خطأ في الجهاز', 'القلب أقرب من مصدر الأشعة فيتضخم ظله', 'المريض يتنفس بعمق', 'الفيلم صغير'], correct: 1 },
        { text: 'ما هي علامة الاسترواح الصدري (Pneumothorax) في الأشعة؟', options: ['عتامة في الرئة', 'خط رفيع يفصل الرئة عن جدار الصدر مع غياب العلامات الرئوية', 'تضخم في القلب', 'ارتفاع الحجاب الحاجز'], correct: 1 }
      ]
    },
    {
      id: 'quiz_003', lessonId: 'les_004',
      questions: [
        { text: 'ما هو أفضل فحص لتصوير أنسجة المخ الرخوة؟', options: ['الأشعة العادية', 'الأشعة المقطعية CT', 'الرنين المغناطيسي MRI', 'الموجات فوق الصوتية'], correct: 2 },
        { text: 'في CT المخ الطبيعي، ما لون المادة الرمادية مقارنة بالبيضاء؟', options: ['أفتح (أعلى كثافة)', 'أغمق (أقل كثافة)', 'نفس اللون', 'لا تظهر في CT'], correct: 0 },
        { text: 'أين تقع البطينات الجانبية في المخ؟', options: ['في جذع المخ', 'في نصفي الكرة المخية', 'في المخيخ', 'خارج المخ'], correct: 1 },
        { text: 'ما هو النزيف الذي يظهر كهلال بين الجمجمة والمخ؟', options: ['Epidural hematoma', 'Subdural hematoma', 'Subarachnoid hemorrhage', 'Intracerebral hemorrhage'], correct: 1 }
      ]
    },
    {
      id: 'quiz_004', lessonId: 'les_005',
      questions: [
        { text: 'ما هو أفضل فحص مبدئي لتقييم الكلى؟', options: ['CT بالصبغة', 'MRI', 'الموجات فوق الصوتية', 'الأشعة العادية'], correct: 2 },
        { text: 'ما هو الحجم الطبيعي للكلية عند البالغين؟', options: ['5-7 سم', '9-12 سم', '15-18 سم', '3-5 سم'], correct: 1 },
        { text: 'ما هي العلامة المميزة لحصوات الكلى في CT بدون صبغة؟', options: ['عتامة منخفضة', 'بؤرة عالية الكثافة (hyperdense)', 'تغير في حجم الكلى', 'لا تظهر في CT'], correct: 1 }
      ]
    },
    {
      id: 'quiz_005', lessonId: 'les_007',
      questions: [
        { text: 'ما هي نافذة العرض المستخدمة لرؤية الرئتين في CT الصدر؟', options: ['Soft tissue window', 'Lung window', 'Bone window', 'Brain window'], correct: 1 },
        { text: 'ما هي وحدة قياس الكثافة في الأشعة المقطعية؟', options: ['ديسيبل', 'هاونسفيلد (HU)', 'تسلا', 'بكسل'], correct: 1 },
        { text: 'كم تبلغ كثافة الماء بوحدة هاونسفيلد؟', options: ['-1000 HU', '-100 HU', '0 HU', '+100 HU'], correct: 2 },
        { text: 'متى نستخدم الصبغة الوريدية في CT الصدر؟', options: ['دائماً', 'عند الشك في مشاكل الأوعية أو الأورام', 'فقط للأطفال', 'لا تستخدم أبداً'], correct: 1 }
      ]
    },
    {
      id: 'quiz_006', lessonId: 'les_008',
      questions: [
        { text: 'ما هو أول فحص يُطلب في إصابات الرأس الحادة؟', options: ['MRI المخ', 'CT المخ بدون صبغة', 'أشعة عادية على الجمجمة', 'دوبلر على الشرايين'], correct: 1 },
        { text: 'كيف يظهر النزيف الحاد في CT المخ؟', options: ['أسود (منخفض الكثافة)', 'أبيض (عالي الكثافة)', 'رمادي (متساوي الكثافة)', 'لا يظهر في CT'], correct: 1 },
        { text: 'ما شكل النزيف فوق الجافية (Epidural) في CT؟', options: ['هلالي الشكل', 'عدسي الشكل (biconvex)', 'منتشر', 'نقطي'], correct: 1 }
      ]
    },
    {
      id: 'quiz_007', lessonId: 'les_012',
      questions: [
        { text: 'ما هو المبدأ الفيزيائي الذي يعمل به جهاز MRI؟', options: ['الأشعة السينية', 'الموجات فوق الصوتية', 'الرنين المغناطيسي النووي', 'أشعة جاما'], correct: 2 },
        { text: 'في صور T1، كيف يظهر السائل النخاعي (CSF)؟', options: ['أبيض ساطع', 'أسود (منخفض الإشارة)', 'رمادي', 'لا يظهر'], correct: 1 },
        { text: 'في صور T2، كيف يظهر السائل النخاعي (CSF)؟', options: ['أسود', 'أبيض ساطع (عالي الإشارة)', 'رمادي', 'أحمر'], correct: 1 },
        { text: 'ما هي تقنية FLAIR المستخدمة في MRI؟', options: ['تقنية لإظهار العظام', 'T2 مع إلغاء إشارة السائل النخاعي', 'تقنية لتصوير الأوعية', 'تقنية لقياس الانتشار'], correct: 1 }
      ]
    },
    {
      id: 'quiz_008', lessonId: 'les_014',
      questions: [
        { text: 'ما هو أفضل فحص لتقييم الرباط الصليبي الأمامي (ACL)؟', options: ['الأشعة العادية', 'CT الركبة', 'MRI الركبة', 'الموجات فوق الصوتية'], correct: 2 },
        { text: 'في أي مستوى (plane) يُرى الرباط الصليبي الأمامي بوضوح في MRI؟', options: ['Axial', 'Sagittal', 'Coronal', 'لا يظهر في MRI'], correct: 1 },
        { text: 'ما هي علامة قطع الغضروف الهلالي في MRI؟', options: ['زيادة حجم الغضروف', 'إشارة عالية تصل لسطح الغضروف', 'اختفاء الغضروف تماماً', 'تكلس الغضروف'], correct: 1 }
      ]
    }
  ];
  Storage.save('quizzes', quizzes);

  // Initialize empty quiz results
  Storage.save('quiz_results', []);

  Storage.set('seeded', true);
  Storage.set('seed_version', SEED_VERSION);
  console.log('تم تحميل البيانات التجريبية بنجاح! (الإصدار ' + SEED_VERSION + ')');
})();
