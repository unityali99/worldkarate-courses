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

    // Page titles
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
