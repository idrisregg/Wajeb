import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
    language: 'ar',
    setLanguage: () => {},
    t: () => '',
    isRTL: true
});

// Translation files
const translations = {
    ar: {
        // Navigation
        dashboard: 'لوحة التحكم',
        upload: 'رفع ملف',
        received: 'الملفات المستلمة',
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
        uploadFile: 'رفع ملف',
        selectFile: 'اختر ملف',
        senderName: 'اسم المرسل',
        description: 'الوصف (اختياري)',
        tags: 'العلامات (اختياري)',
        makePublic: 'جعل الملف عام',
        uploadButton: 'رفع الملف',
        uploading: 'جاري الرفع...',
        
        // File Table
        fileName: 'اسم الملف',
        sender: 'المرسل',
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
        uploadedFiles: 'الملفات المرفوعة',
        receivedFiles: 'الملفات المستلمة',
        totalDownloads: 'إجمالي التحميلات',
        
        // Messages
        welcome: 'مرحباً',
        welcomeMessage: 'مرحباً بك في منصة واجب لإدارة الملفات',
        uploadNewFile: 'رفع ملف جديد',
        uploadNewFileDesc: 'ارفع ملفاتك مع اسم المرسل',
        viewReceivedFiles: 'الملفات المستلمة',
        viewReceivedFilesDesc: 'عرض وإدارة الملفات المستلمة',
        manageAccount: 'إدارة الحساب',
        manageAccountDesc: 'تعديل بياناتك أو حذف الحساب',
        fileUploadedSuccess: 'تم رفع الملف بنجاح!',
        profileUpdatedSuccess: 'تم تحديث الملف الشخصي بنجاح',
        accountDeletedSuccess: 'تم حذف الحساب بنجاح',
        noFilesFound: 'لم يتم العثور على ملفات',
        loadingFiles: 'جاري تحميل الملفات...',
        
        // Errors
        fillAllFields: 'يرجى ملء جميع الحقول',
        passwordTooShort: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
        userExists: 'المستخدم موجود بالفعل',
        invalidCredentials: 'بيانات الدخول غير صحيحة',
        networkError: 'خطأ في الشبكة. يرجى المحاولة مرة أخرى',
        uploadFailed: 'فشل في رفع الملف',
        deleteConfirm: 'هل أنت متأكد من حذف هذا الملف؟',
        deleteAccountConfirm: 'هل أنت متأكد من حذف الحساب؟ لا يمكن التراجع عن هذا الإجراء.',
        deleteAccountFinalConfirm: 'تأكيد نهائي: هل تريد حذف حسابك نهائياً؟'
    },
    
    en: {
        // Navigation
        dashboard: 'Dashboard',
        upload: 'Upload File',
        received: 'Received Files',
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
        uploadFile: 'Upload File',
        selectFile: 'Select File',
        senderName: 'Sender Name',
        description: 'Description (Optional)',
        tags: 'Tags (Optional)',
        makePublic: 'Make this file public',
        uploadButton: 'Upload File',
        uploading: 'Uploading...',
        
        // File Table
        fileName: 'File Name',
        sender: 'Sender',
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
        accountManagement: 'Account Management',
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
        uploadedFiles: 'Uploaded Files',
        receivedFiles: 'Received Files',
        totalDownloads: 'Total Downloads',
        
        // Messages
        welcome: 'Welcome',
        welcomeMessage: 'Welcome to Wajeb file management platform',
        uploadNewFile: 'Upload New File',
        uploadNewFileDesc: 'Upload your files with sender name',
        viewReceivedFiles: 'Received Files',
        viewReceivedFilesDesc: 'View and manage received files',
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
        deleteAccountFinalConfirm: 'Final confirmation: Do you want to permanently delete your account?'
    },
    
    fr: {
        // Navigation
        dashboard: 'Tableau de bord',
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
        uploadFile: 'Télécharger un fichier',
        selectFile: 'Sélectionner un fichier',
        senderName: 'Nom de l\'expéditeur',
        description: 'Description (optionnel)',
        tags: 'Étiquettes (optionnel)',
        makePublic: 'Rendre ce fichier public',
        uploadButton: 'Télécharger le fichier',
        uploading: 'Téléchargement en cours...',
        
        // File Table
        fileName: 'Nom du fichier',
        sender: 'Expéditeur',
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
        accountManagement: 'Gestion du compte',
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
        welcome: 'Bienvenue',
        welcomeMessage: 'Bienvenue sur la plateforme de gestion de fichiers Wajeb',
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
        deleteAccountFinalConfirm: 'Confirmation finale : Voulez-vous supprimer définitivement votre compte ?'
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

export const useLanguage = () => useContext(LanguageContext);


