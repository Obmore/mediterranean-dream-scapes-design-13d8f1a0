
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t, language } = useLanguage();

  const teamMembers = [
    { name: "[Designer Name]", role: language === 'hu' ? "Tervező" : "Designer" },
    { name: "[Project Manager Name]", role: language === 'hu' ? "Projektmenedzser" : "Project Manager" },
    { name: "[3D Artist Name]", role: "3D Artist" },
    { name: "[Support Name]", role: language === 'hu' ? "Ügyfélszolgálat" : "Customer Support" }
  ];

  const companyStory = {
    hu: "Cégünk 2025 tavaszán alakult, amikor felismertük, hogy Magyarországon hiányzik a mediterrán stílus autentikus képviselete a lakberendezésben. Alapító tervezőnk több mint egy évtizedet töltött a Földközi-tenger mentén, tanulmányozva a helyi építészetet és belsőépítészeti hagyományokat. Célunk, hogy ezt a légies, napfényes hangulatot átültetjük a magyar otthonokba, miközben tiszteletben tartjuk a helyi igényeket és hagyományokat.",
    en: "Our company was founded in Spring 2025 when we recognized that Hungary lacked authentic representation of Mediterranean style in interior design. Our founding designer spent over a decade along the Mediterranean coast, studying local architecture and interior design traditions. Our goal is to transplant this airy, sunny atmosphere into Hungarian homes while respecting local needs and traditions."
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-navy-800">
            {t.about.title}
          </h1>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <img
              src="https://images.unsplash.com/photo-1473177104440-ffee2f376098?q=80&w=2070&auto=format&fit=crop"
              alt={language === 'hu' ? "mediterrán stílusú belsőépítészeti objektumok" : "Mediterranean style interior design objects"}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-serif mb-6 text-navy-800">
                {t.about.intro.split('.')[0]}.
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {companyStory[language]}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif mb-6 text-navy-800">
                {t.about.whyChoose}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-terracotta-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t.about.reasons.experience}</h4>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-terracotta-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t.about.reasons.craftsmanship}</h4>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-terracotta-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t.about.reasons.service}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-serif text-center mb-12 text-navy-800">
            {language === 'hu' ? 'Csapatunk' : 'Our Team'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-terracotta-100 to-terracotta-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl text-terracotta-600">👤</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
