
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
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
          <Link
            to="/portfolio"
            className="inline-block bg-navy-800 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-navy-800 hover:border-terracotta-600 border-2 border-transparent transition-all duration-300"
          >
            {t.hero.cta}
          </Link>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6 text-navy-800">
                {t.about.intro.split('.')[0]}.
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {t.services.intro}
              </p>
              <Link
                to="/about"
                className="inline-block bg-terracotta-600 text-white px-6 py-3 rounded-lg hover:bg-terracotta-700 transition-colors"
              >
                {t.about.title}
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=2070&auto=format&fit=crop"
                alt="Mediterranean interior design example"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-navy-800">
              {t.portfolio.title}
            </h2>
            <p className="text-lg text-gray-700">
              {t.portfolio.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(t.portfolio.projects).slice(0, 3).map(([key, title]) => (
              <div key={key} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={`https://images.unsplash.com/photo-149339721212${key === 'pearl' ? '2' : key === 'villa' ? '3' : '4'}-2b85dda8106b?q=80&w=800&auto=format&fit=crop`}
                    alt={title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                    <div className="p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-xl font-semibold">{title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-block bg-navy-800 text-white px-8 py-3 rounded-lg hover:bg-navy-700 transition-colors"
            >
              {t.portfolio.title}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
