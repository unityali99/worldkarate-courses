export const en = {
  // Validation messages
  validation: {
    firstNameRequired: "First name is required",
    firstNameInvalidType: "First name should be of type string",
    firstNameMinLength: "First name should be at least 3 characters",
    firstNameMaxLength: "First name cannot be more than 20 characters",
    firstNameInvalidFormat: "First name can only contain letters",

    lastNameRequired: "Last name is required",
    lastNameInvalidType: "Last name should be of type string",
    lastNameMinLength: "Last name should be at least 3 characters",
    lastNameMaxLength: "Last name cannot be more than 20 characters",
    lastNameInvalidFormat: "Last name can only contain letters",

    emailRequired: "Email is required",
    emailInvalid: "Email is not valid",

    passwordRequired: "Please choose your password",
    passwordInvalidFormat:
      "Password must be at least 8 characters including at least one letter and one number",

    newPasswordRequired: "Please choose a new password",
    newPasswordInvalidFormat:
      "Password must be at least 8 characters including at least one letter and one number",

    repeatPasswordRequired: "Please enter password confirmation",
    repeatPasswordMismatch: "Password confirmation does not match",

    otpRequired: "Please enter OTP code",
    otpMinLength: "Code must be 4 digits",
    otpMaxLength: "Code must be 4 digits",

    courseIdsMinLength: "At least one course must be in the purchase list",

    newsletterEmailRequired: "Please enter your email",
  },

  // UI and other text (empty for now, will be filled later)
  ui: {
    // Common actions
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    cancel: "Cancel",
    confirm: "Confirm",
    login: "Login",
    register: "Register",
    logout: "Logout",
    search: "Search",
    download: "Download",
    payment: "Payment",
    addToCart: "Add to Cart",
    viewCourse: "View Course",
    createCourse: "Create New Course",
    goBack: "Go Back to Home",
    send: "Send",
    clear: "Clear All",
    courses: "Courses",
    home: "Home",
    cart: "Cart",

    // Landing Page
    landing: {
      badge: "International Kata & Karate Academy",
      aboutBadge: "About Sensei Amir Yari",
      methodologyBadge: "Methodology & Training Principles",
      legacyBadge: "Championship History & Legacy",
      heroTitle: "Master Karate with Sensei Amir Yari",
      heroDesc:
        "Join the ultimate platform for learning Kata and advancing your martial arts journey. Expert guidance, comprehensive courses, and a legacy of excellence.",
      ctaButton: "Explore Courses",
      aboutTitle: "Meet Sensei Amir Yari",
      aboutDesc:
        "A dedicated master with decades of experience in shaping champions. Sensei Yari combines traditional techniques with modern teaching methodologies to bring out the best in every student.",
      methodologyTitle: "Our Methodology",
      methodologyDesc:
        "We focus on precision, discipline, and the deeper understanding of Kata. Our structured approach ensures steady progress and mastery of fundamental to advanced techniques.",
      legacyTitle: "A Legacy of Excellence",
      legacyDesc:
        "Since 2012, we have been committed to the art of Karate. Join a community built on respect, strength, and continuous improvement.",
      experience: "10+ Years Experience",
      experienceDesc: "Expert instruction and proven methodology",
      training: "Personalized Training",
      trainingDesc: "Customized programs for all skill levels",
      environment: "Safe Environment",
      environmentDesc: "Trained professionals ensuring safety",
      learnMore: "Learn More",
      meetSensei: "Meet Sensei",
      structuredApproach: "Structured learning approach",
      progressiveSkill: "Progressive skill building",
      traditionalModern: "Traditional techniques with modern methods",
      exploreHistory: "Explore History",
      viewAchievements: "View Achievements",
      credentialsBadge: "Official Credentials",
      credentialsTitle: "Certified by the I.R. Iran Karate Federation",
      credentialsDesc:
        "Sensei Amir Yari's national team coaching record, as certified by the I.R. Iran Karate Federation (Certificate No. 1-11-560).",
      credentialsItems: [
        {
          year: "2006",
          role: "Coach — Cadet National Team",
          result:
            "Silver medal, student's individual Kata — Asian Championship, Singapore",
        },
        {
          year: "2007",
          role: "Coach — Junior & Cadet National Teams",
          result:
            "Silver medal, student's individual Kata — World Championship, Turkey (a first for Iran)",
        },
        {
          year: "2008",
          role: "Coach — Under-21 National Team",
          result:
            "Bronze medal, student's individual Kata — Asian Championship, Malaysia",
        },
        {
          year: "2012",
          role: "Coach — Senior National Team",
          result:
            "5th place, student's individual Kata — World Championship, France (a first for Iran)",
        },
        {
          year: "2014",
          role: "Coach — Senior National Team",
          result:
            "7th place, student's individual Kata — World Championship, Germany",
        },
        {
          year: "2016",
          role: "Coach — Senior National Team",
          result: "World Championship — Austria",
        },
        {
          year: "2012",
          role: "Athlete — National Team Member",
          result:
            "Gold medal, senior team Kata — West Asian Championship, Saudi Arabia",
        },
        {
          year: "2013",
          role: "Coach — National Team",
          result:
            "Silver medal, student's individual Kata — World League, Turkey",
        },
        {
          year: "2013",
          role: "Coach — National Team",
          result: "Bronze medal, team Kata — World League, Turkey",
        },
      ],
      certificateAlt:
        "Official I.R. Iran Karate Federation certificate listing Sensei Amir Yari's national team coaching positions",
      certificateCaption:
        "Official I.R. Iran Karate Federation certificate — No. 1-11-560, issued 7 May 2017",
      certificateOpen: "View certificate",
      certificateDownload: "Download certificate (PDF)",
      certificateClose: "Close",
      certificatePrev: "Previous page",
      certificateNext: "Next page",
      // 2012 World Championship photo
      lineageCaption: "World Karate Championship 2012",
      lineageAlt:
        "Sensei Amir Yari with Sensei Inoue at the World Karate Championship 2012",
      readyToBegin: "Ready to Begin Your Journey?",
      joinCommunity:
        "Join our community of martial artists and start your transformation today",
    },

    // Form labels
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    password: "Password",
    newPassword: "New Password",
    repeatPassword: "Repeat New Password",
    otp: "OTP Code",
    title: "Title",
    description: "Description",
    price: "Price",
    image: "Image (base64)",
    courseLink: "Course Link",

    // Form placeholders
    emailPlaceholder: "Email@example.com",
    passwordPlaceholder: "Password",
    otpPlaceholder: "OTP Code",

    // Page titles & Common Labels
    account: "Account",
    openProfile: "Profile",
    logoutTitle: "Logout",
    loginRegister: "Login / Register",
    langCode: "En",
    switchLang: "فارسی",
    checkingStatus: "Checking status...",
    alreadyPurchasedNotice: "You have already purchased this course.",
    viewInProfile: "View in Profile",
    viewAllCourses: "View All Courses",
    quickAccessToCourses: "Quick access to your learning content",
    noLinkAvailable: "No link available",
    cartYourCart: "Your Shopping Cart",
    removeFromCart: "Remove from Cart",
    checkoutOnline: "Complete Order & Pay Online",
    totalPayable: "Total Payable:",
    courseTitle: "Course Title",
    coursePrice: "Price (Toman)",
    noCoursesInCart: "You have no items in the cart to checkout.",
    trainingPackage: "Training Package",
    profile: "Profile",
    adminPanel: "Admin Panel",
    changePassword: "Change Password",
    userLogin: "User Login",
    purchasedCourses: "Purchased Courses",
    checkout: "Complete Your Order",
    newsletter: "Newsletter Updates",

    // Messages
    emptyCart: "Shopping cart is empty",
    noItemsToPay: "You have no items to pay for",
    noPurchasedCourses: "No courses purchased",
    alreadyInCart: "Already added to cart",
    addedToCart: "Successfully added to cart",
    removedFromCart: "Successfully removed from cart",
    cartCleared: "Cart successfully cleared",
    alreadyPurchased: "You have already purchased this course",
    confirmDelete: "Are you sure you want to delete this item?",

    // Footer
    footer: {
      brandTitle: "Sensei Amir Yari",
      brandSubtitle: "Specialized Kata & Karate Academy",
      address:
        "Tehran, District 22, Rah Ahan settlement , Qaem St, Sadra academy",
      phone: "Phone: 09191257020",
      designer: "Designed by:",
      designerName: "Ali Ahmadi",
      contactUs: "Contact Us",
      socialMedias: "Social Medias",
      socialDesc: "Direct contact & daily video updates:",
      instagramLabel: "Instagram Page",
      telegramLabel: "Telegram Channel",
      whatsappLabel: "WhatsApp Support",
      newsletterTitle: "Subscribe to Academy Newsletter",
      newsletterDesc:
        "Subscribe to receive special course discounts, event notices, and technique updates.",
      newsletterButton: "Subscribe to Newsletter",
      newsletterEmailPlaceholder:
        "Enter your email address (e.g. sensei@karate.ir)",
      instagram: "Instagram",
      telegram: "Telegram",
      whatsapp: "WhatsApp",
      rights: "All rights reserved.",
    },

    // Courses Page
    coursesPage: {
      badge: "Online Karate Dojo",
      instructorTitle: "Sensei Amir Yari",
      subtitle: "Specialized Kata & Martial Arts Video Training Packages",
      newsletterDesc:
        "Enter your email below to receive updates on new course releases and upcoming workshops.",
      newsletterBtn: "Subscribe to Newsletter",
      emptyBadge: "In Preparation",
      emptyTitle: "No courses currently published",
      emptyDesc:
        "New masterclass video packages breaking down Kata and Kumite techniques will be available here soon.",
      trainingPackage: "Training Package",
      viewCourse: "View Course",
    },

    // Course Detail Page
    courseDetail: {
      backToCourses: "Back to Courses",
      categoryBadge: "Kata Training Course",
      priceLabel: "Course price:",
    },

    // Forget Password Form
    forgetPasswordForm: {
      title: "Password Recovery",
      emailLabel: "Your Email:",
      submit: "Send Verification Code",
      footerText: "Don't have an account?",
      footerLink: "Sign Up",
      otpDevToast: "Verification code (dev)",
      sendError: "Failed to send the code",
    },

    // Status
    success: "Success",
    failed: "Failed",
    total: "Total",
    paymentStatus: "Payment Status",

    // Links
    forgotPassword: "Forgot your password?",
    resetPassword: "Reset Password",
    notRegistered: "Not registered?",
    alreadyRegistered: "Already registered?",
    redirectToAdmin: "Go to Admin Panel",
    instagram: "Instagram",

    // Newsletter
    newsletterDescription:
      "Enter your email to stay updated with the latest package updates.",

    // Common loading / wait
    loading: "Loading...",
    pleaseWait: "Please wait...",

    // Error & Not-Found boundaries
    errors: {
      errorCode: "404",
      notFoundTitle: "Page Not Found",
      notFoundDesc:
        "The page address may have changed, or this course is temporarily unavailable.",
      viewCourses: "View Courses",
      errorTitle: "Something Went Wrong",
      systemErrorTitle: "A System Error Occurred",
      errorDesc:
        "Your request failed. You can try again or return to the home page.",
      retry: "Try Again",
      courseLoadTitle: "Course Failed to Load",
      courseLoadDesc:
        "The connection to the server may be temporarily down. Please try again in a moment.",
    },

    // Payment verification
    verify: {
      missingParams: "Required payment verification parameters were not found",
      cancelledOrFailed: "Payment was cancelled by the user or failed.",
      successMsg: "Payment completed successfully",
      verifyError: "Error verifying payment",
      verifying: "Verifying payment and provisioning course access...",
      paymentError: "Payment Error",
      goToPurchased: "Go to Purchased Courses",
    },

    // Checkout / payment
    checkoutFlow: {
      startPayError: "Failed to start payment",
    },

    // Course management (delete / actions)
    manage: {
      deleteCourse: "Delete Course",
      deletedSuccess: "Course deleted successfully",
      deleteError: "Error deleting course",
      permanentDeleteConfirm:
        "Are you sure you want to permanently delete this item? This action cannot be undone.",
      permanentDelete: "Delete Permanently",
      fetchCoursesError: "Error fetching courses",
    },

    // Auth & profile messages
    authMsg: {
      loginError: "Login failed",
      registerSuccess: "Registration completed successfully",
      registerError: "Registration failed",
      registerTitle: "Sign Up for the Academy",
      otpValidateError: "Code validation failed",
      passwordChangeError: "Password change failed",
      profileSaveSuccess: "Information saved successfully",
      profileEditError: "Updating information failed",
      exampleFirstName: "e.g. Ali",
      exampleLastName: "e.g. Ahmadi",
      passwordHint: "At least 8 characters (letters and numbers)",
      securityHint: "For better security, choose a strong password",
      roleSystemAdmin: "System Admin",
    },

    // OTP form
    otpForm: {
      title: "One-Time Verification Code",
      descBefore: "Enter the code sent to",
      descAfter: ".",
      submit: "Confirm Code",
    },

    // Reset password form
    resetForm: {
      title: "Choose a New Password",
      repeatPlaceholder: "Repeat password",
    },

    // Profile view
    profileInfo: {
      editTitle: "Edit Personal Information",
      editHint: "Enter your new information",
      viewHint: "Your registered account details",
      emailLabel: "Email Address",
      roleLabel: "Account Type:",
      roleAdmin: "Academy Senior Admin",
      roleInstructor: "Instructor & Kata Master",
      roleStudent: "Academy Student",
    },

    // Admin course creation form
    adminCourse: {
      titleLabel: "Course Title:",
      titlePlaceholder: "e.g. Kata Kankevoid Training",
      descLabel: "Course Description:",
      descPlaceholder: "Comprehensive description and syllabus...",
      imgLabel: "Image (base64 or URL):",
      linkLabel: "Course Video Download Link:",
      submit: "Save & Publish Course",
      createSuccess: "Course created successfully",
      createError: "Error creating course",
    },

    // User search form
    searchUser: {
      title: "Search User Courses",
      emailLabel: "User Email:",
    },

    // Paid order view
    order: {
      orderNumber: "Order Number:",
      paidSuccess: "Paid",
      paidFailed: "Payment Failed",
      accessLink: "Access Link",
      downloadVideo: "Download Video",
      totalPaid: "Total Paid:",
    },

    // Currency
    currency: " Toman",
  },

  // Person entity (structured data / E-E-A-T)
  person: {
    name: "Amir Yari",
    alternateName: "امیر یاری",
    jobTitle: "Head Kata Coach & Academy Founder",
    description:
      "Former coach of Iran's national karate teams (cadet, junior and U21, and senior) and founder of the Sensei Amir Yari Karate Academy.",
    affiliation: "I.R. Iran Karate Federation",
    knowsAbout: [
      "Kata",
      "Kumite",
      "Shito-ryu Shitokai",
      "Karate coaching",
      "Karate instruction",
    ],
  },

  // Metadata
  metadata: {
    title: "Sensei Yari Karate Academy",
    description:
      "The most comprehensive karate training platform in the country",
    home: {
      title: "Kata & Karate Training",
      description:
        "Step-by-step Kata and Kumite training with Sensei Amir Yari, former coach of Iran's national karate teams. Video courses for every level, beginner to advanced.",
    },
    courses: {
      title: "Karate & Kata Video Courses",
      description:
        "Browse the Kata and Kumite video courses of Sensei Amir Yari's academy: structured training packages for beginner, intermediate and advanced students.",
    },
    keywords: [
      "karate training",
      "kata training",
      "kumite training",
      "shitō-ryū",
      "shotokan",
      "gōjū-ryū",
      "wadō-ryū",
      "kyokushin training",
      "kyokushin karate",
      "kyokushin",
    ],
  },
};
