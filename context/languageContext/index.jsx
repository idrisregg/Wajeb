import React, {useState, useEffect } from 'react';
import { LanguageContext } from "./languageContext";

// Translation files
const translations = {
    ar: {
        // Navigation
        dashboard: 'الرئيسية ',
        upload: 'رفع الواجب',
        received: 'الواجبات المستلمة',
        account: 'الحساب',
        about: 'من نحن',
        privacy: 'سياسة الخصوصية',
        logout: 'تسجيل الخروج',

        // Auth
        login: 'تسجيل الدخول',
        signup: 'إنشاء حساب',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        username: 'اسم المستخدم',
        confirmPassword: 'تأكيد كلمة المرور',
        loginButton: 'تسجيل',
        signupButton: 'سجل الآن',
        loginLoading: 'جاري تسجيل الدخول...',
        signupLoading: 'جاري إنشاء الحساب...',
        noAccount: 'ليس عندك حساب؟ سجل الأن',
        haveAccount: 'عندك حساب؟ سجل الدخول',

        // File Upload
        recipient:'اسم المعلم',
        uploadFile: 'رفع واجبك',
        selectFile: 'اختر ملف',
        senderName: 'اسم التلميذ',
        description: 'الوصف (اختياري)',
        tags: 'العلامات (اختياري)',
        makePublic: 'جعل الملف عام',
        uploadButton: 'رفع الواجب',
        uploading: 'جاري الرفع...',

        // File Table
        myFiles: 'ملفاتي',
        fileName: 'اسم الملف',
        sender: 'التلميذ',
        size: 'الحجم',
        type: 'النوع',
        uploadDate: 'تاريخ الرفع',
        downloads: 'التحميلات',
        status: 'الحالة',
        actions: 'الإجراءات',
        public: 'عام',
        private: 'خاص',
        download: 'تحميل',
        delete: 'حذف',

        // Account
        file: 'ملف',
        accountManagement: 'إدارة الحساب',
        personalInfo: 'المعلومات الشخصية',
        accountActions: 'إجراءات الحساب',
        accountStats: 'إحصائيات الحساب',
        edit: 'تعديل',
        cancel: 'إلغاء',
        save: 'حفظ',
        saveChanges: 'حفظ التغييرات',
        saving: 'جاري الحفظ...',
        deleteAccount: 'حذف الحساب',
        deleting: 'جاري الحذف...',
        uploadedFiles: 'الواجبات المرفوعة',
        receivedFiles: 'الواجبات المستلمة',
        totalDownloads: 'إجمالي التحميلات',

        // Messages
        deleteMessage:'هل أنت متأكد من حذف الحساب؟ لا يمكن التراجع عن هذا الإجراء.',
        createAccount:'أنشئ حسابك',
        userName:'اسم المستخدم',
        password:'كلمة المرور',
        signupNow: 'سجل الآن',
        youHaveAccount: 'هل لديك حساب؟',
        loginNow: 'سجل الدخول',
        warning:'  سيتم حذف الملف خلال سبعة ايام من تحميله',
        welcome: 'مرحباً',
        welcomeMessage: 'مرحباً بك في منصة واجب  ',
        uploadNewFile: 'رفع واجب جديد',
        uploadNewFileDesc: 'ارفع واجباتك مع اسم المعلم',
        viewReceivedFiles: 'الواجبات المستلمة',
        viewReceivedFilesDesc: 'عرض وإدارة الواجبات المستلمة',
        manageAccount: 'إدارة الحساب',
        manageAccountDesc: 'تعديل بياناتك أو حذف الحساب',
        fileUploadedSuccess: 'تم رفع الواجب بنجاح!',
        profileUpdatedSuccess: 'تم تحديث الملف الشخصي بنجاح',
        accountDeletedSuccess: 'تم حذف الحساب بنجاح',
        noFilesFound: 'لم يتم العثور على واجبات',
        loadingFiles: 'جاري تحميل الواجبات...',

        // Errors
        fillAllFields: 'يرجى ملء جميع الحقول',
        passwordTooShort: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
        userExists: 'المستخدم موجود بالفعل',
        invalidCredentials: 'بيانات الدخول غير صحيحة',
        networkError: 'خطأ في الشبكة. يرجى المحاولة مرة أخرى',
        uploadFailed: 'فشل في رفع الملف',
        deleteConfirm: 'هل أنت متأكد من حذف هذا الملف؟',
        deleteAccountConfirm: 'هل أنت متأكد من حذف الحساب؟ لا يمكن التراجع عن هذا الإجراء.',
        deleteAccountFinalConfirm: 'تأكيد نهائي: هل تريد حذف حسابك نهائياً؟',


        privacy_title: "سياسة الخصوصية",
        privacy_intro_title: "مقدمة",
        privacy_intro_text: "نحن في منصة واجب نلتزم بحماية خصوصيتك وبياناتك الشخصية. هذه السياسة توضح كيفية جمع واستخدام وحماية معلوماتك عند استخدام منصتنا.",

        privacy_collect_title: "المعلومات التي نجمعها",
        privacy_collect_personal: "المعلومات الشخصية:",
        privacy_collect_file: "معلومات الواجبات:",
        privacy_collect_personal_list: [
            "اسم المستخدم",
            "البريد الإلكتروني",
            "كلمة المرور (مشفرة)"
        ],
        privacy_collect_file_list: [
            "اسم الملف الأصلي",
            "حجم الملف",
            "نوع الملف",
            "اسم المرسل",
            "وصف الملف (اختياري)",
            "العلامات (اختياري)"
        ],

        privacy_use_title: "كيفية استخدام المعلومات",
        privacy_use_text: "نستخدم معلوماتك للأغراض التالية:",
        privacy_use_list: [
            "توفير خدمات المنصة",
            "إدارة حسابك",
            "حماية أمان المنصة",
            "تحسين الخدمات",
            "التواصل معك عند الحاجة"
        ],

        privacy_protect_title: "حماية البيانات",
        privacy_protect_text: "نستخدم تقنيات أمان متقدمة لحماية بياناتك:",
        privacy_protect_list: [
            "تشفير كلمات المرور",
            "اتصالات آمنة (HTTPS)",
            "حماية من الوصول غير المصرح به",
            "نسخ احتياطية منتظمة"
        ],

        privacy_share_title: "مشاركة المعلومات",
        privacy_share_text: "نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك فقط في الحالات التالية:",
        privacy_share_list: [
            "بموافقتك الصريحة",
            "للمتطلبات القانونية",
            "لحماية حقوقنا أو حقوق المستخدمين الآخرين"
        ],

        privacy_cookies_title: "ملفات تعريف الارتباط (Cookies)",
        privacy_cookies_text: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك في استخدام المنصة، مثل تذكر تفضيلاتك وتسهيل عملية تسجيل الدخول.",

        privacy_rights_title: "حقوقك",
        privacy_rights_text: "لديك الحق في:",
        privacy_rights_list: [
            "الوصول إلى بياناتك الشخصية",
            "تصحيح البيانات غير الصحيحة",
            "حذف حسابك وبياناتك",
            "سحب الموافقة على معالجة البيانات"
        ],

        privacy_update_title: "التحديثات على السياسة",
        privacy_update_text: "قد نقوم بتحديث هذه السياسة من وقت لآخر. سنقوم بإشعارك بأي تغييرات مهمة عبر البريد الإلكتروني أو عبر المنصة.",

        privacy_contact_title: "التواصل معنا",
        privacy_contact_text: "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا:",
        privacy_email_label: "البريد الإلكتروني:",
        privacy_last_updated: "آخر تحديث:"

    },

    en: {
        // Navigation
        dashboard: 'Main Page',
        upload: 'Upload Home-Work',
        received: 'Received Home Works',
        account: 'Account',
        about: 'About Us',
        privacy: 'Privacy Policy',
        logout: 'Logout',

        // Auth
        login: 'Login',
        signup: 'Sign Up',
        email: 'Email',
        password: 'Password',
        username: 'Username',
        confirmPassword: 'Confirm Password',
        loginButton: 'Login',
        signupButton: 'Sign Up Now',
        loginLoading: 'Logging in...',
        signupLoading: 'Creating account...',
        noAccount: "Don't have an account? Sign up now",
        haveAccount: 'Have an account? Login',

        // File Upload
        recipient:"Teacher's Name",
        uploadFile: 'Upload Home Work',
        selectFile: 'Select File',
        senderName: "Student's Name",
        description: 'Description (Optional)',
        tags: 'Tags (Optional)',
        makePublic: 'Make this file public',
        uploadButton: 'Upload Home Work',
        uploading: 'Uploading...',

        // File Table
        myFiles: 'My Files',
        fileName: 'File Name',
        sender: 'Student',
        size: 'Size',
        type: 'Type',
        uploadDate: 'Upload Date',
        downloads: 'Downloads',
        status: 'Status',
        actions: 'Actions',
        public: 'Public',
        private: 'Private',
        download: 'Download',
        delete: 'Delete',

        // Account
        file: 'files',
        accountManagement: 'Account Management',
        email: 'Email',
        personalInfo: 'Personal Information',
        accountActions: 'Account Actions',
        accountStats: 'Account Statistics',
        edit: 'Edit',
        cancel: 'Cancel',
        save: 'Save',
        saveChanges: 'Save Changes',
        saving: 'Saving...',
        deleteAccount: 'Delete Account',
        deleting: 'Deleting...',
        uploadedFiles: 'Uploaded Home Work',
        receivedFiles: 'Received Home Work',
        totalDownloads: 'Total Downloads',

        // Messages
        deleteMessage:'Are you sure you want to delete Account?',
        createAccount:'Create Account',
        userName:'Username',
        password:'Password',
        signupNow: 'Sign Up Now',
        youHaveAccount:  'Already have an account?',
        loginNow: 'Login Now',
        warning:'All files will be deleted after 7 days of its upload',
        welcome: 'Welcome',
        welcomeMessage: 'Welcome to Wajeb ',
        uploadNewFile: 'Upload New Home Work',
        uploadNewFileDesc: 'Upload your Home Work with Teacher name',
        viewReceivedFiles: 'Received Home Works',
        viewReceivedFilesDesc: 'View and manage received Home Works',
        manageAccount: 'Account Management',
        manageAccountDesc: 'Edit your data or delete account',
        fileUploadedSuccess: 'File uploaded successfully!',
        profileUpdatedSuccess: 'Profile updated successfully',
        accountDeletedSuccess: 'Account deleted successfully',
        noFilesFound: 'No files found',
        loadingFiles: 'Loading files...',

        // Errors
        fillAllFields: 'Please fill in all fields',
        passwordTooShort: 'Password must be at least 6 characters',
        userExists: 'User already exists',
        invalidCredentials: 'Invalid credentials',
        networkError: 'Network error. Please try again',
        uploadFailed: 'Upload failed',
        deleteConfirm: 'Are you sure you want to delete this file?',
        deleteAccountConfirm: 'Are you sure you want to delete your account? This action cannot be undone.',
        deleteAccountFinalConfirm: 'Final confirmation: Do you want to permanently delete your account?',

        privacy_title: "Privacy Policy",
        privacy_intro_title: "Introduction",
        privacy_intro_text: "At Wajeb Platform, we are committed to protecting your privacy and personal data. This policy explains how your information is collected, used, and protected when using our platform.",

        privacy_collect_title: "Information We Collect",
        privacy_collect_personal: "Personal Information:",
        privacy_collect_file: "File Information:",
        privacy_collect_personal_list: [
            "Username",
            "Email address",
            "Password (encrypted)"
        ],
        privacy_collect_file_list: [
            "Original file name",
            "File size",
            "File type",
            "Sender name",
            "File description (optional)",
            "Tags (optional)"
        ],

        privacy_use_title: "How We Use Information",
        privacy_use_text: "We use your information for the following purposes:",
        privacy_use_list: [
            "Providing platform services",
            "Managing your account",
            "Protecting platform security",
            "Improving our services",
            "Communicating with you when needed"
        ],

        privacy_protect_title: "Data Protection",
        privacy_protect_text: "We use advanced security technologies to protect your data:",
        privacy_protect_list: [
            "Password encryption",
            "Secure connections (HTTPS)",
            "Protection against unauthorized access",
            "Regular backups"
        ],

        privacy_share_title: "Information Sharing",
        privacy_share_text: "We do not sell or rent your personal information to third parties. We may share your information only in the following cases:",
        privacy_share_list: [
            "With your explicit consent",
            "For legal requirements",
            "To protect our rights or the rights of other users"
        ],

        privacy_cookies_title: "Cookies",
        privacy_cookies_text: "We use cookies to enhance your experience, such as remembering your preferences and making login easier.",

        privacy_rights_title: "Your Rights",
        privacy_rights_text: "You have the right to:",
        privacy_rights_list: [
            "Access your personal data",
            "Correct inaccurate data",
            "Delete your account and data",
            "Withdraw consent to data processing"
        ],

        privacy_update_title: "Policy Updates",
        privacy_update_text: "We may update this policy from time to time. We will notify you of any important changes via email or through the platform.",

        privacy_contact_title: "Contact Us",
        privacy_contact_text: "If you have any questions about this privacy policy, please contact us:",
        privacy_email_label: "Email:",
        privacy_last_updated: "Last Updated:"

    },

    fr: {
        // Navigation
        dashboard: 'Page principale',
        upload: 'Télécharger un fichier',
        received: 'Fichiers reçus',
        account: 'Compte',
        about: 'À propos',
        privacy: 'Politique de confidentialité',
        logout: 'Déconnexion',

        // Auth
        login: 'Connexion',
        signup: 'S\'inscrire',
        email: 'E-mail',
        password: 'Mot de passe',
        username: 'Nom d\'utilisateur',
        confirmPassword: 'Confirmer le mot de passe',
        loginButton: 'Connexion',
        signupButton: 'S\'inscrire maintenant',
        loginLoading: 'Connexion en cours...',
        signupLoading: 'Création du compte...',
        noAccount: 'Vous n\'avez pas de compte ? Inscrivez-vous maintenant',
        haveAccount: 'Vous avez un compte ? Connectez-vous',

        // File Upload
        recipient:'Professeur(e)',
        uploadFile: 'Télécharger un fichier',
        selectFile: 'Sélectionner un fichier',
        senderName: "Nom de l'élève",
        description: 'Description (optionnel)',
        tags: 'Étiquettes (optionnel)',
        makePublic: 'Rendre ce fichier public',
        uploadButton: 'Télécharger le fichier',
        uploading: 'Téléchargement en cours...',

        // File Table
        myFiles: 'Mes fichiers',
        fileName: 'Nom du fichier',
        sender: 'élève',
        size: 'Taille',
        type: 'Type',
        uploadDate: 'Date de téléchargement',
        downloads: 'Téléchargements',
        status: 'Statut',
        actions: 'Actions',
        public: 'Public',
        private: 'Privé',
        download: 'Télécharger',
        delete: 'Supprimer',

        // Account
        file: 'fichiers',
        accountManagement: 'Gestion du compte',
        email: 'Email',
        personalInfo: 'Informations personnelles',
        accountActions: 'Actions du compte',
        accountStats: 'Statistiques du compte',
        edit: 'Modifier',
        cancel: 'Annuler',
        save: 'Enregistrer',
        saveChanges: 'Enregistrer les modifications',
        saving: 'Enregistrement en cours...',
        deleteAccount: 'Supprimer le compte',
        deleting: 'Suppression en cours...',
        uploadedFiles: 'Fichiers téléchargés',
        receivedFiles: 'Fichiers reçus',
        totalDownloads: 'Total des téléchargements',

        // Messages
        deleteMessage:"Êtes-vous sûr de vouloir supprimer ce Compte ?",
        createAccount:'Créer un compte',
        userName:'Nom de utilisateur',
        signupNow: 'Inscrivez-vous maintenant',
        youHaveAccount:  'Vous avez déjà un compte ? Connectez-vous',
        loginNow: 'Connectez-vous maintenant',
        warning:'Tous les trois jours et le fichier sera supprimé dans les sept jours suivant le téléchargement',
        welcome: 'Bienvenue',
        welcomeMessage: 'Bienvenue sur  Wajeb',
        uploadNewFile: 'Télécharger un nouveau fichier',
        uploadNewFileDesc: 'Téléchargez vos fichiers avec le nom de l\'expéditeur',
        viewReceivedFiles: 'Fichiers reçus',
        viewReceivedFilesDesc: 'Voir et gérer les fichiers reçus',
        manageAccount: 'Gestion du compte',
        manageAccountDesc: 'Modifiez vos données ou supprimez le compte',
        fileUploadedSuccess: 'Fichier téléchargé avec succès !',
        profileUpdatedSuccess: 'Profil mis à jour avec succès',
        accountDeletedSuccess: 'Compte supprimé avec succès',
        noFilesFound: 'Aucun fichier trouvé',
        loadingFiles: 'Chargement des fichiers...',

        // Errors
        fillAllFields: 'Veuillez remplir tous les champs',
        passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères',
        userExists: 'L\'utilisateur existe déjà',
        invalidCredentials: 'Identifiants invalides',
        networkError: 'Erreur réseau. Veuillez réessayer',
        uploadFailed: 'Échec du téléchargement',
        deleteConfirm: 'Êtes-vous sûr de vouloir supprimer ce fichier ?',
        deleteAccountConfirm: 'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action ne peut pas être annulée.',
        deleteAccountFinalConfirm: 'Confirmation finale : Voulez-vous supprimer définitivement votre compte ?',

        privacy_title: "Politique de Confidentialité",
        privacy_intro_title: "Introduction",
        privacy_intro_text: "Sur la plateforme Wajeb, nous nous engageons à protéger votre vie privée et vos données personnelles. Cette politique explique comment vos informations sont collectées, utilisées et protégées lorsque vous utilisez notre plateforme.",

        privacy_collect_title: "Informations que nous collectons",
        privacy_collect_personal: "Informations personnelles :",
        privacy_collect_file: "Informations sur les fichiers :",
        privacy_collect_personal_list: [
            "Nom d'utilisateur",
            "Adresse e-mail",
            "Mot de passe (crypté)"
        ],
        privacy_collect_file_list: [
            "Nom d'origine du fichier",
            "Taille du fichier",
            "Type du fichier",
            "Nom de l'expéditeur",
            "Description du fichier (optionnel)",
            "Étiquettes (optionnel)"
        ],

        privacy_use_title: "Utilisation des informations",
        privacy_use_text: "Nous utilisons vos informations pour les objectifs suivants :",
        privacy_use_list: [
            "Fournir les services de la plateforme",
            "Gérer votre compte",
            "Protéger la sécurité de la plateforme",
            "Améliorer nos services",
            "Communiquer avec vous si nécessaire"
        ],

        privacy_protect_title: "Protection des données",
        privacy_protect_text: "Nous utilisons des technologies de sécurité avancées pour protéger vos données :",
        privacy_protect_list: [
            "Cryptage des mots de passe",
            "Connexions sécurisées (HTTPS)",
            "Protection contre les accès non autorisés",
            "Sauvegardes régulières"
        ],

        privacy_share_title: "Partage des informations",
        privacy_share_text: "Nous ne vendons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager vos informations uniquement dans les cas suivants :",
        privacy_share_list: [
            "Avec votre consentement explicite",
            "Pour les obligations légales",
            "Pour protéger nos droits ou ceux des autres utilisateurs"
        ],

        privacy_cookies_title: "Cookies",
        privacy_cookies_text: "Nous utilisons des cookies pour améliorer votre expérience, comme mémoriser vos préférences et faciliter la connexion.",

        privacy_rights_title: "Vos droits",
        privacy_rights_text: "Vous avez le droit de :",
        privacy_rights_list: [
            "Accéder à vos données personnelles",
            "Corriger les données incorrectes",
            "Supprimer votre compte et vos données",
            "Retirer votre consentement au traitement de vos données"
        ],

        privacy_update_title: "Mises à jour de la politique",
        privacy_update_text: "Nous pouvons mettre à jour cette politique de temps en temps. Nous vous informerons des changements importants par e-mail ou via la plateforme.",

        privacy_contact_title: "Nous contacter",
        privacy_contact_text: "Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter :",
        privacy_email_label: "Email :",
        privacy_last_updated: "Dernière mise à jour :"

    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'ar';
    });

    const isRTL = language === 'ar';

    useEffect(() => {
        // Apply language to document
        document.documentElement.setAttribute('lang', language);
        document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        localStorage.setItem('language', language);
    }, [language, isRTL]);

    const t = (key) => {
        return translations[language]?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{
            language,
            setLanguage,
            t,
            isRTL
        }}>
            {children}
        </LanguageContext.Provider>
    );
};


