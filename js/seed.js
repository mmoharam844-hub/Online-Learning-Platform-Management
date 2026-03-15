// Auto-seed demo data on first load
(async function seedData() {
  if (Storage.get('seeded')) return;

  // Seed admin account
  const adminHash = await Auth.hashPassword(APP_CONFIG.ADMIN_DEFAULT.password);
  Storage.set('admin', {
    username: APP_CONFIG.ADMIN_DEFAULT.username,
    passwordHash: adminHash
  });

  // Seed courses - مواد شرعية أزهرية حقيقية
  const courses = [
    // === المرحلة الإعدادية ===
    {
      id: 'crs_001', name: 'الفقه الشافعي - أولى إعدادي أزهري',
      description: 'شرح مبسط لمنهج الفقه الشافعي للصف الأول الإعدادي الأزهري: أحكام الطهارة والوضوء والصلاة',
      grade: '1st_prep', price: 80, lessonsCount: 3, isPublished: true, createdAt: '2026-01-10T10:00:00Z'
    },
    {
      id: 'crs_002', name: 'التوحيد - أولى إعدادي أزهري',
      description: 'شرح منهج التوحيد: معرفة الله تعالى وصفاته وأركان الإيمان',
      grade: '1st_prep', price: 80, lessonsCount: 2, isPublished: true, createdAt: '2026-01-12T10:00:00Z'
    },
    {
      id: 'crs_003', name: 'الفقه الشافعي - تانية إعدادي أزهري',
      description: 'شرح منهج الفقه للصف الثاني الإعدادي: أحكام الزكاة والصيام',
      grade: '2nd_prep', price: 100, lessonsCount: 2, isPublished: true, createdAt: '2026-01-15T10:00:00Z'
    },
    {
      id: 'crs_004', name: 'الحديث الشريف - تانية إعدادي أزهري',
      description: 'شرح أحاديث نبوية مختارة من منهج الصف الثاني الإعدادي مع الشرح والفوائد',
      grade: '2nd_prep', price: 100, lessonsCount: 2, isPublished: true, createdAt: '2026-01-18T10:00:00Z'
    },
    {
      id: 'crs_005', name: 'التفسير - تالتة إعدادي أزهري',
      description: 'تفسير سور مختارة من جزء عم مع بيان معاني الآيات والأحكام المستفادة',
      grade: '3rd_prep', price: 120, lessonsCount: 2, isPublished: true, createdAt: '2026-02-01T10:00:00Z'
    },
    // === المرحلة الثانوية ===
    {
      id: 'crs_006', name: 'الفقه الشافعي - أولى ثانوي أزهري',
      description: 'شرح منهج الفقه الشافعي للصف الأول الثانوي: أحكام البيوع والمعاملات',
      grade: '1st_secondary', price: 150, lessonsCount: 3, isPublished: true, createdAt: '2026-02-05T10:00:00Z'
    },
    {
      id: 'crs_007', name: 'التوحيد - أولى ثانوي أزهري',
      description: 'شرح منهج التوحيد: الأدلة العقلية والنقلية على وجود الله وصفاته',
      grade: '1st_secondary', price: 150, lessonsCount: 2, isPublished: true, createdAt: '2026-02-08T10:00:00Z'
    },
    {
      id: 'crs_008', name: 'الفقه الشافعي - تانية ثانوي أزهري',
      description: 'شرح منهج الفقه: أحكام النكاح والطلاق والميراث',
      grade: '2nd_secondary', price: 180, lessonsCount: 2, isPublished: true, createdAt: '2026-02-10T10:00:00Z'
    },
    {
      id: 'crs_009', name: 'الحديث وعلومه - تانية ثانوي أزهري',
      description: 'شرح أحاديث من صحيح البخاري ومسلم مع مصطلح الحديث وعلوم الرواية',
      grade: '2nd_secondary', price: 180, lessonsCount: 2, isPublished: true, createdAt: '2026-02-12T10:00:00Z'
    },
    {
      id: 'crs_010', name: 'الفقه الشافعي - تالتة ثانوي أزهري',
      description: 'مراجعة شاملة لمنهج الفقه الشافعي للصف الثالث الثانوي: الجنايات والحدود والقضاء',
      grade: '3rd_secondary', price: 200, lessonsCount: 3, isPublished: true, createdAt: '2026-02-15T10:00:00Z'
    },
    {
      id: 'crs_011', name: 'التفسير - تالتة ثانوي أزهري',
      description: 'تفسير آيات الأحكام من سورة البقرة وآل عمران مع استنباط الأحكام الفقهية',
      grade: '3rd_secondary', price: 200, lessonsCount: 2, isPublished: true, createdAt: '2026-02-18T10:00:00Z'
    }
  ];
  Storage.save('courses', courses);

  // Seed lessons - دروس شرعية حقيقية
  const lessons = [
    // فقه أولى إعدادي
    { id: 'les_001', courseId: 'crs_001', title: 'أحكام الطهارة - أنواع المياه', description: 'شرح أنواع المياه وأحكامها: الماء الطهور والطاهر والنجس وكيفية التفريق بينهم', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '40:00', order: 1, homework: 'حل أسئلة باب الطهارة من الكتاب المدرسي صفحة 12', createdAt: '2026-01-11T10:00:00Z' },
    { id: 'les_002', courseId: 'crs_001', title: 'أحكام الوضوء - الفروض والسنن', description: 'شرح فروض الوضوء وسننه ونواقضه مع التطبيق العملي', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '45:00', order: 2, homework: 'اكتب فروض الوضوء الستة مع الدليل من السنة', createdAt: '2026-01-12T10:00:00Z' },
    { id: 'les_003', courseId: 'crs_001', title: 'أحكام الصلاة - الأركان والواجبات', description: 'شرح أركان الصلاة وواجباتها وسننها ومبطلاتها', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '50:00', order: 3, homework: 'حل تدريبات باب الصلاة كاملة', createdAt: '2026-01-13T10:00:00Z' },

    // توحيد أولى إعدادي
    { id: 'les_004', courseId: 'crs_002', title: 'معرفة الله تعالى - الأدلة على وجوده', description: 'الأدلة العقلية والفطرية على وجود الله سبحانه وتعالى', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '35:00', order: 1, homework: 'اذكر ثلاثة أدلة عقلية على وجود الله مع الشرح', createdAt: '2026-01-13T10:00:00Z' },
    { id: 'les_005', courseId: 'crs_002', title: 'أركان الإيمان الستة', description: 'شرح أركان الإيمان بالتفصيل: الإيمان بالله وملائكته وكتبه ورسله واليوم الآخر والقدر', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '40:00', order: 2, homework: 'لخّص أركان الإيمان مع ذكر دليل لكل ركن', createdAt: '2026-01-14T10:00:00Z' },

    // فقه تانية إعدادي
    { id: 'les_006', courseId: 'crs_003', title: 'أحكام الزكاة - الأموال الزكوية', description: 'شرح الأموال التي تجب فيها الزكاة ونصابها ومقدارها', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '45:00', order: 1, homework: 'حل مسائل حساب الزكاة في الكتاب', createdAt: '2026-01-16T10:00:00Z' },
    { id: 'les_007', courseId: 'crs_003', title: 'أحكام الصيام - الفرائض والمفطرات', description: 'شرح فرائض الصيام وسننه ومبطلاته والأعذار المبيحة للفطر', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '50:00', order: 2, homework: 'اكتب مبطلات الصيام مع ذكر الدليل', createdAt: '2026-01-17T10:00:00Z' },

    // حديث تانية إعدادي
    { id: 'les_008', courseId: 'crs_004', title: 'حديث: إنما الأعمال بالنيات', description: 'شرح حديث عمر بن الخطاب رضي الله عنه في النية وأهميتها في العبادات', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '35:00', order: 1, homework: 'استخرج الفوائد المستنبطة من الحديث', createdAt: '2026-01-19T10:00:00Z' },
    { id: 'les_009', courseId: 'crs_004', title: 'حديث: بُني الإسلام على خمس', description: 'شرح حديث ابن عمر رضي الله عنهما في أركان الإسلام', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '40:00', order: 2, homework: 'اشرح كل ركن من أركان الإسلام مع الدليل', createdAt: '2026-01-20T10:00:00Z' },

    // تفسير تالتة إعدادي
    { id: 'les_010', courseId: 'crs_005', title: 'تفسير سورة الفاتحة', description: 'تفسير سورة الفاتحة كلمة كلمة مع بيان فضلها وأحكامها', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '45:00', order: 1, homework: 'اكتب معاني الكلمات الصعبة في السورة', createdAt: '2026-02-02T10:00:00Z' },
    { id: 'les_011', courseId: 'crs_005', title: 'تفسير سورة الناس والفلق', description: 'تفسير المعوذتين مع بيان أسباب النزول والفوائد المستنبطة', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '40:00', order: 2, homework: 'قارن بين سورة الناس وسورة الفلق', createdAt: '2026-02-03T10:00:00Z' },

    // فقه أولى ثانوي
    { id: 'les_012', courseId: 'crs_006', title: 'أحكام البيوع - الشروط والأركان', description: 'شرح أركان عقد البيع وشروطه والبيوع المنهي عنها في الشريعة', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '50:00', order: 1, homework: 'اذكر شروط البيع الصحيح مع التمثيل', createdAt: '2026-02-06T10:00:00Z' },
    { id: 'les_013', courseId: 'crs_006', title: 'البيوع المنهي عنها', description: 'شرح أنواع البيوع المحرمة: بيع الغرر وبيع النجش وبيع الحاضر للبادي', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '45:00', order: 2, homework: 'قارن بين البيوع المنهي عنها مع ذكر العلة', createdAt: '2026-02-07T10:00:00Z' },
    { id: 'les_014', courseId: 'crs_006', title: 'أحكام الربا وأنواعه', description: 'شرح تحريم الربا وأنواعه: ربا الفضل وربا النسيئة مع الأدلة', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '55:00', order: 3, homework: 'اكتب بحثاً مختصراً عن أضرار الربا', createdAt: '2026-02-08T10:00:00Z' },

    // توحيد أولى ثانوي
    { id: 'les_015', courseId: 'crs_007', title: 'الأدلة العقلية على وجود الله', description: 'دراسة الأدلة العقلية على وجود الله: دليل الحدوث ودليل النظام', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '50:00', order: 1, homework: 'اشرح دليل الحدوث بأسلوبك الخاص', createdAt: '2026-02-09T10:00:00Z' },
    { id: 'les_016', courseId: 'crs_007', title: 'صفات الله تعالى الواجبة والمستحيلة', description: 'شرح الصفات الواجبة لله تعالى والصفات المستحيلة عليه مع الأدلة', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '55:00', order: 2, homework: 'اذكر عشرين صفة واجبة لله مع معانيها', createdAt: '2026-02-10T10:00:00Z' },

    // فقه تانية ثانوي
    { id: 'les_017', courseId: 'crs_008', title: 'أحكام النكاح - الأركان والشروط', description: 'شرح أركان عقد النكاح وشروطه والموانع الشرعية', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '50:00', order: 1, homework: 'لخّص أركان النكاح وشروطه في جدول', createdAt: '2026-02-11T10:00:00Z' },
    { id: 'les_018', courseId: 'crs_008', title: 'أحكام الميراث - أصحاب الفروض', description: 'شرح أصحاب الفروض المقدرة في القرآن ونصيب كل منهم', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '60:00', order: 2, homework: 'حل مسائل المواريث في الكتاب صفحة 45', createdAt: '2026-02-12T10:00:00Z' },

    // حديث تانية ثانوي
    { id: 'les_019', courseId: 'crs_009', title: 'مصطلح الحديث - أنواع الحديث', description: 'تقسيمات الحديث: الصحيح والحسن والضعيف ومعايير القبول والرد', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '45:00', order: 1, homework: 'عرّف كل نوع من أنواع الحديث مع التمثيل', createdAt: '2026-02-13T10:00:00Z' },
    { id: 'les_020', courseId: 'crs_009', title: 'شرح أحاديث من صحيح البخاري', description: 'شرح أحاديث مختارة من كتاب الإيمان في صحيح البخاري', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '50:00', order: 2, homework: 'استخرج الأحكام الفقهية من الأحاديث المشروحة', createdAt: '2026-02-14T10:00:00Z' },

    // فقه تالتة ثانوي
    { id: 'les_021', courseId: 'crs_010', title: 'أحكام الجنايات في الإسلام', description: 'شرح أحكام القصاص والديات وأنواع الجنايات وعقوباتها', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '55:00', order: 1, homework: 'لخّص أنواع الجنايات وعقوبة كل نوع', createdAt: '2026-02-16T10:00:00Z' },
    { id: 'les_022', courseId: 'crs_010', title: 'أحكام الحدود الشرعية', description: 'شرح الحدود المقررة شرعاً وشروط إقامتها', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '50:00', order: 2, homework: 'اكتب شروط إقامة كل حد مع الأدلة', createdAt: '2026-02-17T10:00:00Z' },
    { id: 'les_023', courseId: 'crs_010', title: 'أحكام القضاء والشهادة', description: 'شرح آداب القضاء وشروط القاضي وأحكام الشهادة ونصابها', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '45:00', order: 3, homework: 'قارن بين شروط القاضي وشروط الشاهد', createdAt: '2026-02-18T10:00:00Z' },

    // تفسير تالتة ثانوي
    { id: 'les_024', courseId: 'crs_011', title: 'تفسير آيات الأحكام من سورة البقرة', description: 'تفسير آيات الصيام والحج من سورة البقرة مع استنباط الأحكام الفقهية', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '60:00', order: 1, homework: 'استخرج الأحكام الفقهية من آيات الصيام', createdAt: '2026-02-19T10:00:00Z' },
    { id: 'les_025', courseId: 'crs_011', title: 'تفسير آيات الأحكام من سورة آل عمران', description: 'تفسير آيات مختارة من سورة آل عمران مع التركيز على الأحكام الشرعية', videoUrl: 'https://www.youtube.com/embed/JjPkTOabsX8', duration: '55:00', order: 2, homework: 'اكتب الأحكام المستنبطة من الآيات المشروحة', createdAt: '2026-02-20T10:00:00Z' }
  ];
  Storage.save('lessons', lessons);

  // Seed notes - ملازم شرعية
  const notes = [
    { id: 'note_001', title: 'ملزمة الفقه الشافعي - أولى إعدادي أزهري', type: 'note', grade: '1st_prep', fileUrl: '#', createdAt: '2026-02-01T10:00:00Z' },
    { id: 'note_002', title: 'امتحان التوحيد - أولى إعدادي أزهري', type: 'exam', grade: '1st_prep', fileUrl: '#', createdAt: '2026-02-05T10:00:00Z' },
    { id: 'note_003', title: 'ملزمة الفقه - تانية إعدادي أزهري', type: 'note', grade: '2nd_prep', fileUrl: '#', createdAt: '2026-02-08T10:00:00Z' },
    { id: 'note_004', title: 'مراجعة نهائية حديث - تانية إعدادي', type: 'exam', grade: '2nd_prep', fileUrl: '#', createdAt: '2026-02-10T10:00:00Z' },
    { id: 'note_005', title: 'ملزمة التفسير - تالتة إعدادي أزهري', type: 'note', grade: '3rd_prep', fileUrl: '#', createdAt: '2026-02-12T10:00:00Z' },
    { id: 'note_006', title: 'ملزمة الفقه الشافعي - أولى ثانوي أزهري', type: 'note', grade: '1st_secondary', fileUrl: '#', createdAt: '2026-02-15T10:00:00Z' },
    { id: 'note_007', title: 'امتحان التوحيد - أولى ثانوي أزهري', type: 'exam', grade: '1st_secondary', fileUrl: '#', createdAt: '2026-02-18T10:00:00Z' },
    { id: 'note_008', title: 'ملزمة الحديث وعلومه - تانية ثانوي', type: 'note', grade: '2nd_secondary', fileUrl: '#', createdAt: '2026-02-20T10:00:00Z' },
    { id: 'note_009', title: 'مراجعة نهائية فقه - تالتة ثانوي أزهري', type: 'note', grade: '3rd_secondary', fileUrl: '#', createdAt: '2026-02-22T10:00:00Z' },
    { id: 'note_010', title: 'نموذج امتحان تفسير - تالتة ثانوي أزهري', type: 'exam', grade: '3rd_secondary', fileUrl: '#', createdAt: '2026-02-25T10:00:00Z' }
  ];
  Storage.save('notes', notes);

  // Seed demo students
  const studentHash = await Auth.hashPassword('123456');
  const students = [
    {
      id: 'stu_001', fullName: 'محمد أحمد عبدالرحمن', gender: 'male', governorate: 'القاهرة',
      grade: '1st_prep', phone: '01012345678', passwordHash: studentHash,
      avatarDataUrl: null, isActive: true, createdAt: '2026-01-10T10:00:00Z'
    },
    {
      id: 'stu_002', fullName: 'عبدالله محمود حسن', gender: 'male', governorate: 'الجيزة',
      grade: '2nd_secondary', phone: '01098765432', passwordHash: studentHash,
      avatarDataUrl: null, isActive: true, createdAt: '2026-01-12T10:00:00Z'
    },
    {
      id: 'stu_003', fullName: 'يوسف إبراهيم السيد', gender: 'male', governorate: 'الإسكندرية',
      grade: '3rd_secondary', phone: '01155544433', passwordHash: studentHash,
      avatarDataUrl: null, isActive: true, createdAt: '2026-01-15T10:00:00Z'
    },
    {
      id: 'stu_004', fullName: 'أحمد علي مصطفى', gender: 'male', governorate: 'الدقهلية',
      grade: '1st_secondary', phone: '01277788899', passwordHash: studentHash,
      avatarDataUrl: null, isActive: true, createdAt: '2026-01-20T10:00:00Z'
    }
  ];
  Storage.save('students', students);

  // Seed subscriptions
  const subscriptions = [
    {
      id: 'sub_001', studentId: 'stu_001', courseId: 'crs_001', status: 'approved',
      paymentMethod: 'vodafone_cash', paymentReference: '01012345678', amount: 80,
      requestedAt: '2026-01-11T12:00:00Z', approvedAt: '2026-01-11T14:00:00Z', notes: ''
    },
    {
      id: 'sub_002', studentId: 'stu_001', courseId: 'crs_002', status: 'approved',
      paymentMethod: 'vodafone_cash', paymentReference: '01012345678', amount: 80,
      requestedAt: '2026-01-13T12:00:00Z', approvedAt: '2026-01-13T14:00:00Z', notes: ''
    },
    {
      id: 'sub_003', studentId: 'stu_002', courseId: 'crs_008', status: 'approved',
      paymentMethod: 'instapay', paymentReference: '01098765432', amount: 180,
      requestedAt: '2026-02-11T10:00:00Z', approvedAt: '2026-02-11T12:00:00Z', notes: ''
    },
    {
      id: 'sub_004', studentId: 'stu_003', courseId: 'crs_010', status: 'pending',
      paymentMethod: 'vodafone_cash', paymentReference: '01155544433', amount: 200,
      requestedAt: '2026-02-16T10:00:00Z', approvedAt: null, notes: ''
    },
    {
      id: 'sub_005', studentId: 'stu_004', courseId: 'crs_006', status: 'pending',
      paymentMethod: 'instapay', paymentReference: '01277788899', amount: 150,
      requestedAt: '2026-02-20T10:00:00Z', approvedAt: null, notes: ''
    }
  ];
  Storage.save('subscriptions', subscriptions);

  // Seed progress
  const progress = [
    { id: 'prog_001', studentId: 'stu_001', courseId: 'crs_001', lessonId: 'les_001', completed: true, completedAt: '2026-01-12T10:00:00Z' },
    { id: 'prog_002', studentId: 'stu_001', courseId: 'crs_001', lessonId: 'les_002', completed: true, completedAt: '2026-01-14T10:00:00Z' },
    { id: 'prog_003', studentId: 'stu_002', courseId: 'crs_008', lessonId: 'les_017', completed: true, completedAt: '2026-02-13T10:00:00Z' }
  ];
  Storage.save('progress', progress);

  Storage.set('seeded', true);
  console.log('تم تحميل البيانات التجريبية بنجاح!');
})();
