
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert(language === 'hu' ? 'Köszönjük! Hamarosan felvesszük Önnel a kapcsolatot.' : 'Thank you! We will contact you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-navy-800">
            {t.contact.title}
          </h1>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <div>
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.5234567890123!2d19.0522!3d47.4979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDI5JzUyLjQiTiAxOcKwMDMnMDcuOSJF!5e0!3m2!1sen!2shu!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                  title={language === 'hu' ? "Budapest térképe" : "Map of Budapest"}
                />
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-terracotta-600">📞</span>
                  <span>{t.contact.details.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-terracotta-600">✉️</span>
                  <span>{t.contact.details.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-terracotta-600">📍</span>
                  <span>{t.contact.details.office}</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-terracotta-500 focus:border-terracotta-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-terracotta-500 focus:border-terracotta-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.form.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-terracotta-500 focus:border-terracotta-500"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.form.service}
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-terracotta-500 focus:border-terracotta-500"
                  >
                    <option value="">{language === 'hu' ? 'Válasszon...' : 'Select...'}</option>
                    <option value="consultation">{t.contact.form.serviceOptions.consultation}</option>
                    <option value="design">{t.contact.form.serviceOptions.design}</option>
                    <option value="furniture">{t.contact.form.serviceOptions.furniture}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-terracotta-500 focus:border-terracotta-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-terracotta-600 text-white py-3 px-6 rounded-lg hover:bg-terracotta-700 transition-colors font-medium"
                >
                  {t.contact.form.submit}
                </button>
              </form>

              <div className="mt-6 text-center">
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-terracotta-600 transition-colors"
                >
                  {t.contact.privacy}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
