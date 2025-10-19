import React from 'react';
import './infoPages.scss';

const AboutUs = () => {
    return (
        <div className="info-page">
            <div className="info-container">
                <h1>من نحن</h1>
                
                <div className="info-content">
                    <section className="info-section">
                        <h2>مرحباً بك في منصة واجب</h2>
                        <p>
                            منصة واجب هي منصة متطورة لإدارة وتبادل الملفات بطريقة آمنة وسهلة. 
                            نحن نهدف إلى تسهيل عملية مشاركة الملفات بين المستخدمين مع الحفاظ على الخصوصية والأمان.
                        </p>
                    </section>

                    <section className="info-section">
                        <h2>رؤيتنا</h2>
                        <p>
                            أن نكون المنصة الرائدة في مجال إدارة الملفات في المنطقة، 
                            ونوفر حلولاً مبتكرة وآمنة لاحتياجات المستخدمين في مشاركة الملفات.
                        </p>
                    </section>

                    <section className="info-section">
                        <h2>مهمتنا</h2>
                        <p>
                            تقديم خدمة موثوقة وآمنة لإدارة الملفات، مع التركيز على سهولة الاستخدام 
                            والخصوصية، لتمكين المستخدمين من مشاركة ملفاتهم بكفاءة وأمان.
                        </p>
                    </section>

                    <section className="info-section">
                        <h2>المميزات الرئيسية</h2>
                        <ul className="features-list">
                            <li>رفع وإدارة الملفات بسهولة</li>
                            <li>نظام أمان متقدم لحماية البيانات</li>
                            <li>واجهة مستخدم سهلة ومتجاوبة</li>
                            <li>إمكانية مشاركة الملفات مع تحديد المرسل</li>
                            <li>نظام تصنيف وتنظيم الملفات</li>
                            <li>دعم أنواع ملفات متعددة</li>
                        </ul>
                    </section>

                    <section className="info-section">
                        <h2>فريق العمل</h2>
                        <p>
                            نحن فريق من المطورين والمصممين المختصين الذين يعملون بجد لتطوير 
                            وتحسين منصة واجب باستمرار، مع التركيز على تلبية احتياجات المستخدمين.
                        </p>
                    </section>

                    <section className="info-section">
                        <h2>التواصل معنا</h2>
                        <p>
                            نحن دائماً متاحون لمساعدتك. إذا كان لديك أي استفسارات أو اقتراحات، 
                            لا تتردد في التواصل معنا.
                        </p>
                        <div className="contact-info">
                            <p><strong>البريد الإلكتروني:</strong> support@wajeb.com</p>
                            <p><strong>الهاتف:</strong> +966 50 123 4567</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;

