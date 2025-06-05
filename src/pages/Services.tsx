
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const { t, language } = useLanguage();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const serviceDetails = {
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
  };

  const serviceKeys = ['consultation', 'design', 'furniture'] as const;

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-navy-800">
            {t.services.title}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t.services.intro}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {serviceKeys.map((serviceKey) => {
              const service = t.services[serviceKey];
              return (
                <div key={serviceKey} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
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
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
