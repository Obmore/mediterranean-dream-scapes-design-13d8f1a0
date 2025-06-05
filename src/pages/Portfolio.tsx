
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ImageZoom from '../components/ImageZoom';

const Portfolio = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const projectImages = {
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
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-navy-800">
            {t.portfolio.title}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t.portfolio.subtitle}
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
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
                  />
                  <div className="absolute inset-0 bg-navy-900 bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <h3 className="text-xl font-semibold mb-2">{title}</h3>
                      <p className="text-sm">Click to view gallery</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
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
                  className="w-full h-64 md:h-96 object-cover rounded-lg cursor-zoom-in hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage({
                    src: image,
                    alt: `${t.portfolio.projects[selectedProject as keyof typeof t.portfolio.projects]} - Image ${index + 1}`
                  })}
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

      {/* Image Zoom Modal */}
      <ImageZoom
        src={selectedImage?.src || ''}
        alt={selectedImage?.alt || ''}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Portfolio;
