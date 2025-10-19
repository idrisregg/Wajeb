import React from 'react';
import './infoPages.scss';

const PrivacyPolicy = () => {
    return (
        <div className="info-page">
            <div className="info-container">
                <h1>سياسة الخصوصية</h1>
                
                <div className="info-content">
                    <section className="info-section">
                        <h2>مقدمة</h2>
                        <p>
                            نحن في منصة واجب نلتزم بحماية خصوصيتك وبياناتك الشخصية. 
                            هذه السياسة توضح كيفية جمع واستخدام وحماية معلوماتك عند استخدام منصتنا.
                        </p>
                    </section>

                    <section className="info-section">
                        <h2>المعلومات التي نجمعها</h2>
                        <h3>المعلومات الشخصية:</h3>
                        <ul>
                            <li>اسم المستخدم</li>
                            <li>البريد الإلكتروني</li>
                            <li>كلمة المرور (مشفرة)</li>
                        </ul>
                        
                        <h3>معلومات الملفات:</h3>
                        <ul>
                            <li>اسم الملف الأصلي</li>
                            <li>حجم الملف</li>
                            <li>نوع الملف</li>
                            <li>اسم المرسل</li>
                            <li>وصف الملف (اختياري)</li>
                            <li>العلامات (اختياري)</li>
                        </ul>
                    </section>

                    <section className="info-section">
                        <h2>كيفية استخدام المعلومات</h2>
                        <p>نستخدم معلوماتك للأغراض التالية:</p>
                        <ul>
                            <li>توفير خدمات المنصة</li>
                            <li>إدارة حسابك</li>
                            <li>حماية أمان المنصة</li>
                            <li>تحسين الخدمات</li>
                            <li>التواصل معك عند الحاجة</li>
                        </ul>
                    </section>

                    <section className="info-section">
                        <h2>حماية البيانات</h2>
                        <p>
                            نستخدم تقنيات أمان متقدمة لحماية بياناتك:
                        </p>
                        <ul>
                            <li>تشفير كلمات المرور</li>
                            <li>اتصالات آمنة (HTTPS)</li>
                            <li>حماية من الوصول غير المصرح به</li>
                            <li>نسخ احتياطية منتظمة</li>
                        </ul>
                    </section>

                    <section className="info-section">
                        <h2>مشاركة المعلومات</h2>
                        <p>
                            نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. 
                            قد نشارك معلوماتك فقط في الحالات التالية:
                        </p>
                        <ul>
                            <li>بموافقتك الصريحة</li>
                            <li>للمتطلبات القانونية</li>
                            <li>لحماية حقوقنا أو حقوق المستخدمين الآخرين</li>
                        </ul>
                    </section>

                    <section className="info-section">
                        <h2>ملفات تعريف الارتباط (Cookies)</h2>
                        <p>
                            نستخدم ملفات تعريف الارتباط لتحسين تجربتك في استخدام المنصة، 
                            مثل تذكر تفضيلاتك وتسهيل عملية تسجيل الدخول.
                        </p>
                    </section>

                    <section className="info-section">
                        <h2>حقوقك</h2>
                        <p>لديك الحق في:</p>
                        <ul>
                            <li>الوصول إلى بياناتك الشخصية</li>
                            <li>تصحيح البيانات غير الصحيحة</li>
                            <li>حذف حسابك وبياناتك</li>
                            <li>سحب الموافقة على معالجة البيانات</li>
                        </ul>
                    </section>

                    <section className="info-section">
                        <h2>التحديثات على السياسة</h2>
                        <p>
                            قد نقوم بتحديث هذه السياسة من وقت لآخر. سنقوم بإشعارك بأي تغييرات مهمة 
                            عبر البريد الإلكتروني أو عبر المنصة.
                        </p>
                    </section>

                    <section className="info-section">
                        <h2>التواصل معنا</h2>
                        <p>
                            إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، 
                            يرجى التواصل معنا:
                        </p>
                        <div className="contact-info">
                            <p><strong>البريد الإلكتروني:</strong> privacy@wajeb.com</p>
                            <p><strong>الهاتف:</strong> +966 50 123 4567</p>
                        </div>
                    </section>

                    <div className="last-updated">
                        <p><strong>آخر تحديث:</strong> {new Date().toLocaleDateString('ar-SA')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;

