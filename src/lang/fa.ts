export const fa = {
  // Validation messages
  validation: {
    firstNameRequired: "نام الزامی است",
    firstNameInvalidType: "نام باید از نوع رشته باشد",
    firstNameMinLength: "نام باید حداقل ۳ کاراکتر باشد",
    firstNameMaxLength: "نام نمی‌تواند بیش از ۲۰ کاراکتر باشد",
    firstNameInvalidFormat: "نام فقط می‌تواند شامل حروف باشد",

    lastNameRequired: "نام خانوادگی الزامی است",
    lastNameInvalidType: "نام خانوادگی باید از نوع رشته باشد",
    lastNameMinLength: "نام خانوادگی باید حداقل ۳ کاراکتر باشد",
    lastNameMaxLength: "نام خانوادگی نمی‌تواند بیش از ۲۰ کاراکتر باشد",
    lastNameInvalidFormat: "نام خانوادگی فقط می‌تواند شامل حروف باشد",

    emailRequired: "ایمیل الزامی است",
    emailInvalid: "ایمیل معتبر نیست",

    passwordRequired: "لطفا رمز عبور خودرا انتخاب کنید",
    passwordInvalidFormat:
      "رمز عبور باید حداقل ۸ کاراکتر شامل حداقل یک حرف و یک عدد باشد",

    newPasswordRequired: "لطفا رمز عبور جدید را انتخاب کنید",
    newPasswordInvalidFormat:
      "رمز عبور باید حداقل ۸ کاراکتر شامل حداقل یک حرف و یک عدد باشد",

    repeatPasswordRequired: "لطفا تکرار رمز عبور را وارد کنید",
    repeatPasswordMismatch: "تکرار رمز عبور همخوانی ندارد",

    otpRequired: "کد یکبار مصرف را وارد کنید",
    otpMinLength: "کد باید ۴ رقم باشد",
    otpMaxLength: "کد باید ۴ رقم باشد",

    courseIdsMinLength: "حداقل یک دوره باید در لیست خرید باشد",

    newsletterEmailRequired: "لطفا ایمیل را وارد کنید",
  },

  // UI and other text (empty for now, will be filled later)
  ui: {
    // Common actions
    save: "ذخیره",
    edit: "اصلاح",
    delete: "حذف",
    cancel: "انصراف",
    confirm: "تایید",
    login: "ورود",
    register: "ثبت نام",
    logout: "خروج",
    search: "جستجو",
    download: "دانلود",
    payment: "پرداخت",
    addToCart: "افزودن به سبد خرید",
    viewCourse: "مشاهده دوره",
    createCourse: "ایجاد دوره جدید",
    goBack: "بازگشت به صفحه اصلی",
    send: "ارسال",
    clear: "حذف همه",
    courses: "دوره ها",
    home: "خانه",
    cart: "سبد خرید",

    // Landing Page
    landing: {
      badge: "آکادمی بین‌المللی کاتا و کاراته",
      aboutBadge: "درباره استاد امیر یاری",
      methodologyBadge: "متدولوژی و اصول تمرین",
      legacyBadge: "افتخارات و تاریخچه قهرمانی",
      heroTitle: "با سنسی یاری کاراته را حرفه‌ای بیاموزید",
      heroDesc:
        "به جامع ترین پلتفرم آموزش کاتا و هنرهای رزمی بپیوندید. آموزش تخصصی، دوره های جامع و میراثی از برتری.",
      ctaButton: "مشاهده دوره ها",
      aboutTitle: "آشنایی با سنسی امیر یاری",
      aboutDesc:
        "استادی دلسوز با دهه ها تجربه در پرورش قهرمانان. سنسی یاری تکنیک های سنتی را با روش های آموزشی مدرن ترکیب می کند تا بهترین عملکرد را از هر هنرجو به ارمغان بیاورد.",
      methodologyTitle: "روش آموزشی ما",
      methodologyDesc:
        "تمرکز ما بر دقت، انضباط و درک عمیق کاتا است. رویکرد ساختارمند ما پیشرفت مداوم و تسلط بر تکنیک های پایه تا پیشرفته را تضمین می کند.",
      legacyTitle: "میراثی از افتخار",
      legacyDesc:
        "از سال ۲۰۱۲، ما متعهد به هنر کاراته بوده ایم. به جامعه ای بپیوندید که بر پایه احترام، قدرت و پیشرفت مداوم بنا شده است.",
      experience: "۲۰+ سال تجربه",
      experienceDesc: "آموزش تخصصی",
      training: "آموزش شخصی سازی شده",
      trainingDesc: "برنامه های سفارشی برای تمام سطوح مهارت",
      environment: "محیط امن",
      environmentDesc: "مربیان حرفه ای تضمین کننده ایمنی",
      learnMore: "بیشتر بدانید",
      meetSensei: "دیدار با سنسی",
      structuredApproach: "رویکرد یادگیری ساختارمند",
      progressiveSkill: "رشد مهارت تدریجی",
      traditionalModern: "تکنیک های سنتی با روش های مدرن",
      exploreHistory: "کاوش در تاریخچه",
      viewAchievements: "مشاهده افتخارات",
      readyToBegin: "آیا میخواهید کاتا و کومیته را حرفه‌ای بیاموزید؟",
      joinCommunity: "به هنرجویان ما بپیوندید و تحول خود را آغاز کنید",
    },

    // Form labels
    firstName: "نام",
    lastName: "نام خانوادگی",
    email: "ایمیل",
    password: "رمز عبور",
    newPassword: "رمز عبور جدید",
    repeatPassword: "تکرار رمز عبور جدید",
    otp: "کد یکبار مصرف",
    title: "عنوان",
    description: "توضیحات",
    price: "قیمت",
    image: "تصویر (base64)",
    courseLink: "لینک دوره",

    // Form placeholders
    emailPlaceholder: "Email@example.com",
    passwordPlaceholder: "Password",
    otpPlaceholder: "کد یکبار مصرف",

    // Page titles & Common Labels
    account: "حساب کاربری",
    openProfile: "پروفایل",
    logoutTitle: "خروج از حساب",
    loginRegister: "ورود / ثبت‌نام",
    langCode: "فا",
    switchLang: "English",
    checkingStatus: "در حال بررسی وضعیت...",
    alreadyPurchasedNotice: "شما این دوره را قبلا خریداری نموده‌اید.",
    viewInProfile: "مشاهده دوره در پروفایل",
    viewAllCourses: "مشاهده همه دوره‌ها",
    quickAccessToCourses: "دسترسی سریع به محتوای آموزشی شما",
    noLinkAvailable: "لینک موجود نیست",
    cartYourCart: "سبد خرید شما",
    removeFromCart: "حذف از سبد",
    checkoutOnline: "پرداخت آنلاین و نهایی کردن سفارش",
    totalPayable: "مجموع قابل پرداخت:",
    courseTitle: "عنوان دوره",
    coursePrice: "قیمت (تومان)",
    noCoursesInCart: "شما هیچ موردی در سبد خرید برای پرداخت ندارید.",
    trainingPackage: "پکیج آموزشی",
    profile: "پروفایل",
    adminPanel: "پنل ادمین",
    changePassword: "تغییر رمز عبور",
    userLogin: "ورود به پنل کاربری",
    purchasedCourses: "دوره های خریداری شده",
    checkout: "سفارش خود را نهایی کنید",
    newsletter: "اطلاع از بروزرسانی ها",

    // Messages
    emptyCart: "سبد خرید خالی میباشد",
    noItemsToPay: "شما هیچ موردی برای پرداخت ندارید",
    noPurchasedCourses: "دوره ای خریداری نشده است",
    alreadyInCart: "قبلا در سبد خرید اضافه شده است",
    addedToCart: "با موفقیت به سبد خرید اضافه شد",
    removedFromCart: "با موفقیت از سبد خرید حذف شد",
    cartCleared: "سبد خرید با موفقیت خالی شد",
    alreadyPurchased: "شما این دوره را خریداری نموده اید",
    confirmDelete: "آیا از حذف این مورد اطمینان دارید؟",

    // Footer
    footer: {
      brandTitle: "سنسی امیر یاری",
      brandSubtitle: "آکادمی تخصصی کاراته و کاتا",
      address: "تهران، منطقه 22، شهرک راه آهن، خیابان قائم، باشگاه صدرا",
      phone: "شماره تماس: 09191257020",
      designer: "طراحی:",
      designerName: "علی احمدی",
      contactUs: "ارتباط با ما",
      socialMedias: "شبکه‌های اجتماعی",
      socialDesc: "ارتباط مستقیم و مشاهده ویدیوهای روزانه:",
      instagramLabel: "صفحه اینستاگرام",
      telegramLabel: "کانال تلگرام",
      whatsappLabel: "پشتیبانی واتساپ",
      newsletterTitle: "عضویت در خبرنامه آکادمی",
      newsletterDesc: "با عضویت در خبرنامه، از تخفیف‌های ویژه دوره‌ها، رویدادها و آپدیت‌های تکنیک‌ها مطلع شوید.",
      newsletterButton: "عضویت در خبرنامه",
      newsletterEmailPlaceholder: "ایمیل خود را وارد کنید (مثال: sensei@karate.ir)",
      instagram: "اینستاگرام",
      telegram: "تلگرام",
      whatsapp: "واتساپ",
      rights: "تمامی حقوق محفوظ است",
    },

    // Courses Page
    coursesPage: {
      badge: "دوجو آنلاین کاراته",
      instructorTitle: "سنسی امیر یاری",
      subtitle: "پکیج‌های آموزش تخصصی کاتا و تکنیک‌های کاراته",
      newsletterDesc: "برای اطلاع از انتشار دوره‌های جدید و تخفیف‌های ویژه، ایمیل خود را در کادر زیر ثبت کنید.",
      newsletterBtn: "عضویت در خبرنامه",
      emptyBadge: "در حال آماده‌سازی",
      emptyTitle: "در حال حاضر دوره‌ای منتشر نشده است",
      emptyDesc: "پکیج‌های ویدیویی جدید آموزش تکنیک‌ها و کاتاهای کاراته به زودی در این بخش قرار خواهند گرفت.",
      trainingPackage: "پکیج آموزشی",
      viewCourse: "مشاهده دوره",
    },

    // Status
    success: "موفق",
    failed: "ناموفق",
    total: "مجموع",
    paymentStatus: "وضعیت پرداخت",

    // Links
    forgotPassword: "رمز خود را فراموش کرده اید؟",
    resetPassword: "ریست رمز",
    notRegistered: "ثبت نام نکرده اید؟",
    alreadyRegistered: "ثبت نام کرده اید؟",
    redirectToAdmin: "هدایت به پنل ادمین",
    instagram: "اینستاگرام",

    // Newsletter
    newsletterDescription:
      "برای اطلاع از آخرین بروزرسانی پکیج ها ایمیل خود را وارد کنید.",

    // Currency
    currency: " تومان",
  },

  // Metadata
  metadata: {
    title: "آکادمی کاراته سنسی یاری",
    description: "جامع ترین پلتفرم آموزش کاراته در کشور",
    keywords: [
      "آموزش کاراته",
      "آموزش کاتا",
      "آموزش کومیته",
      "شیتوریو ",
      "شوتوکان",
      "گوجوریو",
      "وادوریو",
      "آموزش کیوکوشین",
      "کیوکوشین کاراته",
      "کیوکوشین",
    ],
  },
};
