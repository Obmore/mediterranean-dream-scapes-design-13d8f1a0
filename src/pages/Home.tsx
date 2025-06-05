
import React, { useState, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  // Memoize the scroll to section function
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Memoize the form submit handler
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) {
      alert(t.contact.form.privacyError);
      return;
    }
    console.log('Form submitted:', formData);
    alert(language === 'hu' ? 'Köszönjük! Hamarosan felvesszük Önnel a kapcsolatot.' : 'Thank you! We will contact you soon.');
  }, [privacyAccepted, t.contact.form.privacyError, formData, language]);

  // Memoize the form change handler
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  // Memoize project images to avoid recreating on every render
  const projectImages = useMemo(() => ({
    pearl: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=2070&auto=format&fit=crop'
    ],
    villa: [
      'https://images.unsplash.com/photo-1473177104440-ffee2f376098?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=2070&auto=format&fit=crop'
    ],
    olive: [
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473177104440-ffee2f376098?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2070&auto=format&fit=crop'
    ],
    seaside: [
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473177104440-ffee2f376098?q=80&w=2070&auto=format&fit=crop'
    ],
    coastal: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=2070&auto=format&fit=crop'
    ],
    azure: [
      'https://images.unsplash.com/photo-1473177104440-ffee2f376098?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=2070&auto=format&fit=crop'
    ],
    terrace: [
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473177104440-ffee2f376098?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2070&auto=format&fit=crop'
    ],
    garden: [
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473177104440-ffee2f376098?q=80&w=2070&auto=format&fit=crop'
    ]
  }), []);

  // Memoize service details to avoid recreating on every render
  const serviceDetails = useMemo(() => ({
    consultation: {
      hu: "Részletes felmérés és igényfeltárás, személyre szabott koncepcióterv készítése, anyag- és színválasztási tanácsadás, 3D vizualizációk készítése. Időtartam: 2-3 hét. Ár: 150.000-300.000 Ft projektmérettől függően.",
      en: "Detailed assessment and needs analysis, personalized concept plan creation, material and color selection consultation, 3D visualization creation. Duration: 2-3 weeks. Price: 150,000-300,000 HUF depending on project size."
    },
    design: {
      hu: "Teljes alaprajz tervezés, részletes kivitelezési tervek, anyag- és bútorlista, projekt koordináció és kivitelezés felügyelete. Időtartam: 4-8 hét. Ár: 500.000-1.500.000 Ft projektmérettől függően.",
      en: "Complete floor plan design, detailed construction plans, material and furniture lists, project coordination and construction supervision. Duration: 4-8 weeks. Price: 500,000-1,500,000 HUF depending on project size."
    },
    furniture: {
      hu: "Egyedi bútorok tervezése és gyártása, beépített szekrények, konyhai és fürdőszobai bútorok, luxus anyagok használata. Időtartam: 6-12 hét. Ár: 800.000-3.000.000 Ft projekttől függően.",
      en: "Custom furniture design and manufacturing, built-in wardrobes, kitchen and bathroom furniture, use of luxury materials. Duration: 6-12 weeks. Price: 800,000-3,000,000 HUF depending on the project."
    }
  }), []);

  // Memoize service keys to avoid recreating on every render
  const serviceKeys = useMemo(() => ['consultation', 'design', 'furniture'] as const, []);

  // Memoize privacy policy content to avoid recreating on every render
  const privacyPolicyContent = useMemo(() => ({
    hu: "Ez egy helyőrző adatvédelmi tájékoztató. Itt található a teljes adatvédelmi politika szövege, amely leírja, hogyan gyűjtjük, használjuk és védjük személyes adatait. A valós implementációban itt szerepelne a teljes jogi szöveg az adatkezelésről, sütihasználatról és a felhasználói jogokról.",
    en: "This is a placeholder privacy policy. Here you would find the complete privacy policy text that describes how we collect, use, and protect your personal data. In a real implementation, this would contain the full legal text about data processing, cookie usage, and user rights."
  }), []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2070&auto=format&fit=crop')`
          }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            {t.hero.headline}
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            {t.hero.subheading}
          </p>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="inline-block bg-navy-800 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-navy-800 hover:border-terracotta-600 border-2 border-transparent transition-all duration-300"
          >
            {t.hero.cta}
          </button>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 id="portfolio-heading" className="text-3xl md:text-4xl font-serif mb-4 text-navy-800">
              {t.portfolio.title}
            </h2>
            <p className="text-lg text-gray-700">
              {t.portfolio.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(t.portfolio.projects).map(([key, title]) => (
              <div 
                key={key} 
                className="group cursor-pointer"
                onClick={() => setSelectedProject(key)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={projectImages[key as keyof typeof projectImages][0]}
                    alt={title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-navy-900 bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <h3 className="text-xl font-semibold mb-2">{title}</h3>
                      <p className="text-sm">{language === 'hu' ? 'Kattintson a galériáért' : 'Click to view gallery'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23d4a574" fill-opacity="0.05"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 id="services-heading" className="text-3xl md:text-4xl font-serif mb-4 text-navy-800">
              {t.services.title}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {t.services.intro}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {serviceKeys.map((serviceKey) => {
              const service = t.services[serviceKey];
              return (
                <div key={serviceKey} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className={`h-48 bg-gradient-to-br ${
                    serviceKey === 'consultation' ? 'from-blue-100 to-blue-200' :
                    serviceKey === 'design' ? 'from-terracotta-100 to-terracotta-200' :
                    'from-green-100 to-green-200'
                  } flex items-center justify-center`}>
                    <div className={`w-16 h-16 ${
                      serviceKey === 'consultation' ? 'bg-blue-600' :
                      serviceKey === 'design' ? 'bg-terracotta-600' :
                      'bg-green-600'
                    } rounded-full flex items-center justify-center`}>
                      <span className="text-white text-2xl">
                        {serviceKey === 'consultation' ? '💡' : serviceKey === 'design' ? '📐' : '🪑'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-navy-800">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <button
                      onClick={() => setSelectedService(serviceKey)}
                      className="text-terracotta-600 hover:text-terracotta-700 font-medium transition-colors"
                    >
                      {service.learnMore} →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 id="about-heading" className="text-3xl md:text-4xl font-serif mb-4 text-navy-800">
              {t.about.title}
            </h2>
          </div>

          {/* Banner Image */}
          <div className="mb-12">
            <img
              src="https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=2070&auto=format&fit=crop"
              alt={language === 'hu' ? "olívaág és kézműves csempe" : "olive branch and artisanal tile"}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Text Column */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.about.intro}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {language === 'hu' 
                  ? "Cégünk küldetése, hogy minden otthonba elhozzuk a mediterrán életérzést: a napfényes teraszok hangulatát, a tengeri szellő frissességét, és a déli kultúrák vendégszeretetét. Projektjeink során mindig a részletekre figyelünk, és minden tervünkben megjelenik a természetes anyagok tisztelete és a hagyományos kézműves technikák modern interpretációja."
                  : "Our company's mission is to bring the Mediterranean lifestyle to every home: the atmosphere of sunny terraces, the freshness of sea breezes, and the hospitality of southern cultures. In our projects, we always pay attention to details, and all our designs reflect respect for natural materials and modern interpretation of traditional craft techniques."
                }
              </p>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { role: language === 'hu' ? 'Tervező' : 'Designer', name: '[Név]' },
                { role: language === 'hu' ? 'Projektmenedzser' : 'Project Manager', name: '[Név]' },
                { role: '3D Artist', name: '[Név]' },
                { role: language === 'hu' ? 'Ügyfélszolgálat' : 'Customer Support', name: '[Név]' }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h4 className="font-semibold text-navy-800">{member.role}: {member.name}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mt-16">
            <h3 className="text-2xl font-serif text-center mb-8 text-navy-800">
              {t.about.whyChoose}
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(t.about.reasons).map(([key, reason]) => (
                <div key={key} className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-terracotta-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl">
                      {key === 'experience' ? '🌟' : key === 'craftsmanship' ? '🎨' : '🔧'}
                    </span>
                  </div>
                  <h4 className="font-semibold text-navy-800 mb-2">{reason}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 id="contact-heading" className="text-3xl md:text-4xl font-serif mb-4 text-navy-800">
              {t.contact.title}
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg">
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
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-terracotta-500 focus:border-terracotta-500"
                  />
                </div>

                {/* Privacy Policy Section */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">
                    {t.contact.form.privacyNotice}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-terracotta-600 hover:text-terracotta-700 underline text-sm"
                  >
                    {t.contact.privacy}
                  </button>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="privacy-accept"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="h-4 w-4 text-terracotta-600 focus:ring-terracotta-500 border-gray-300 rounded"
                    />
                    <label htmlFor="privacy-accept" className="text-sm text-gray-700">
                      {t.contact.form.privacyAccept}
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!privacyAccepted}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    privacyAccepted
                      ? 'bg-terracotta-600 text-white hover:bg-white hover:text-terracotta-600 hover:border-navy-800 border-2 border-transparent'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-transparent'
                  }`}
                >
                  {t.contact.form.submit}
                </button>
              </form>

              {/* Contact Details */}
              <div className="mt-8 text-center space-y-2">
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-terracotta-600">📞</span>
                  <span className="text-sm">{t.contact.details.phone}</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-terracotta-600">✉️</span>
                  <span className="text-sm">{t.contact.details.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-terracotta-600">📍</span>
                  <span className="text-sm">{t.contact.details.office}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-2xl font-semibold">
                {t.portfolio.projects[selectedProject as keyof typeof t.portfolio.projects]}
              </h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label={language === 'hu' ? 'Bezárás' : 'Close'}
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="grid gap-4 mb-6">
              {projectImages[selectedProject as keyof typeof projectImages].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${t.portfolio.projects[selectedProject as keyof typeof t.portfolio.projects]} - Image ${index + 1}`}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              ))}
            </div>

            {selectedProject === 'pearl' && (
              <div className="text-white bg-navy-900 p-6 rounded-lg">
                <p className="leading-relaxed">
                  {t.portfolio.descriptions.pearl}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-navy-800">
                {t.services[selectedService as keyof typeof t.services].title}
              </h3>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label={language === 'hu' ? 'Bezárás' : 'Close'}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {serviceDetails[selectedService as keyof typeof serviceDetails][language]}
              </p>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedService(null)}
                className="bg-terracotta-600 text-white px-6 py-2 rounded-lg hover:bg-terracotta-700 transition-colors"
              >
                {language === 'hu' ? 'Bezárás' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-semibold text-navy-800">
                {t.contact.privacy}
              </h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label={language === 'hu' ? 'Bezárás' : 'Close'}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <p className="text-gray-700 leading-relaxed">
                {privacyPolicyContent[language]}
              </p>
            </div>

            <div className="p-6 border-t flex justify-end">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="bg-terracotta-600 text-white px-6 py-2 rounded-lg hover:bg-terracotta-700 transition-colors"
              >
                {language === 'hu' ? 'Bezárás' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
