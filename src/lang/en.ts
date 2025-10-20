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

    // Page titles
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

    // Currency
    currency: " Toman",
  },

  // Metadata
  metadata: {
    title: "Sensei Yari Karate Academy",
    description:
      "The most comprehensive karate training platform in the country",
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
