import { useState } from 'react';
import { Search, MapPin, Phone, Mail, Star, Users, Menu, X, DollarSign, ChevronDown, ChevronUp, MessageCircle, Shield, Eye } from 'lucide-react';
import { categories } from './data/categories';
import { featuredServices } from './data/services';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const filteredServices = featuredServices.filter(service => 
    (service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.provider.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.provider.lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === '' || service.categoryId === selectedCategory)
  );

  const toggleServiceExpansion = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const formatPrice = (min?: number, max?: number) => {
    if (!min && !max) return 'Consultar precio';
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `Desde $${min.toLocaleString()}`;
    return `Hasta $${max?.toLocaleString()}`;
  };

  const openWhatsApp = (phone: string, serviceName: string) => {
    const message = `Hola! Vi tu servicio "${serviceName}" en Nos Ayudamos San Juan y me interesa contactarte.`;
    const whatsappUrl = `https://wa.me/54${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const callPhone = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-yellow-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-xl flex items-center justify-center shadow-sm">
                <Users className="h-6 w-6 text-yellow-700" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Nos Ayudamos</h1>
                <p className="text-sm text-yellow-600 -mt-1">San Juan</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#servicios" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">Servicios</a>
              <a href="#categorias" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">Categorías</a>
              <a href="#como-funciona" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">Cómo Funciona</a>
              <button className="bg-gradient-to-r from-yellow-300 to-amber-300 text-yellow-800 px-6 py-2 rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all duration-200 font-medium shadow-sm">
                Publicar Servicio
              </button>
            </nav>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-yellow-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-yellow-200">
              <nav className="flex flex-col space-y-4">
                <a href="#servicios" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-2">Servicios</a>
                <a href="#categorias" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-2">Categorías</a>
                <a href="#como-funciona" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-2">Cómo Funciona</a>
                <button className="bg-gradient-to-r from-yellow-300 to-amber-300 text-yellow-800 px-6 py-2 rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all duration-200 font-medium mx-2 w-fit shadow-sm">
                  Publicar Servicio
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Encuentra los Mejores
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600">Profesionales de San Juan</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Conectamos sanjuaninos con profesionales locales confiables. 
            Contacto directo, precios justos y servicios verificados.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 mb-8 border border-yellow-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-5 w-5" />
                <input
                  type="text"
                  placeholder="¿Qué servicio necesitas?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-300 focus:border-transparent bg-white/90 backdrop-blur-sm"
                />
              </div>
              <button className="bg-gradient-to-r from-yellow-400 to-amber-400 text-yellow-800 px-8 py-3 rounded-xl hover:from-yellow-500 hover:to-amber-500 transition-all duration-200 font-medium shadow-sm">
                Buscar
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-full border border-yellow-200">
              <MapPin className="h-4 w-4 text-yellow-600" />
              <span>Toda la provincia de San Juan</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-full border border-yellow-200">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Profesionales verificados</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-full border border-yellow-200">
              <Phone className="h-4 w-4 text-green-500" />
              <span>Contacto directo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categorias" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Categorías de Servicios</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explora profesionales por categoría
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg bg-white/70 backdrop-blur-sm ${
                    selectedCategory === category.id 
                      ? 'border-yellow-400 bg-yellow-50/90 shadow-md transform scale-105' 
                      : 'border-yellow-200 hover:border-yellow-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mb-4 mx-auto shadow-sm`}>
                    <IconComponent className="h-6 w-6 text-yellow-700" />
                  </div>
                  <h3 className="text-center font-semibold text-gray-800">{category.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Profesionales Destacados</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Servicios disponibles ahora mismo en San Juan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-yellow-200 hover:border-yellow-300">
                <div className="relative">
                  <img 
                    src={service.images?.[0] || '/placeholder-service.jpg'} 
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium border border-yellow-200">
                      {service.category.name}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    {service.provider.isVerified && (
                      <div className="bg-green-100 p-1 rounded-full">
                        <Shield className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-gray-600 flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{service.views}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 leading-tight">{service.title}</h3>
                    <div className="flex items-center space-x-2 mb-3">
                      {service.provider.profileImage && (
                        <img 
                          src={service.provider.profileImage} 
                          alt={`${service.provider.firstName} ${service.provider.lastName}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {service.provider.firstName} {service.provider.lastName}
                        </p>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs text-gray-600">
                            {service.provider.rating?.toFixed(1)} ({service.provider.totalReviews} reseñas)
                    </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-yellow-500" />
                      <span className="text-sm">{service.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm font-medium text-green-700">
                        {formatPrice(service.minPrice, service.maxPrice)}
                      </span>
                    </div>
                    
                    {/* Expanded Details */}
                    {expandedService === service.id && (
                      <div className="mt-4 pt-4 border-t border-yellow-200 space-y-3">
                        <div className="flex items-start text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                          <div>
                            <span className="text-sm font-medium">Zonas de servicio:</span>
                            <p className="text-sm">{service.serviceAreas?.join(', ')}</p>
                        </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2 text-indigo-500" />
                          <span className="text-sm">{service.provider.email}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => toggleServiceExpansion(service.id)}
                      className="w-full border border-yellow-300 text-yellow-700 py-2 px-4 rounded-xl hover:bg-yellow-50 transition-colors flex items-center justify-center space-x-2 font-medium"
                    >
                      {expandedService === service.id ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          <span>Ver Menos</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          <span>Ver Más Detalles</span>
                        </>
                      )}
                    </button>
                    
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => callPhone(service.provider.phone)}
                        className="flex-1 bg-gradient-to-r from-yellow-300 to-amber-300 text-yellow-800 py-3 px-4 rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all duration-200 flex items-center justify-center space-x-2 font-medium shadow-sm"
                      >
                        <Phone className="h-4 w-4" />
                        <span>Llamar</span>
                      </button>
                      <button 
                        onClick={() => openWhatsApp(service.provider.phone, service.title)}
                        className="flex-1 bg-green-500 text-white py-3 px-4 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 font-medium"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white/80 backdrop-blur-sm text-yellow-600 border-2 border-yellow-300 px-8 py-3 rounded-xl hover:bg-yellow-600 hover:text-white transition-all duration-200 font-medium shadow-sm">
              Ver Más Servicios
            </button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Cómo Funciona?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conectarse es muy simple, tanto para buscar como para ofrecer servicios
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Search className="h-10 w-10 text-yellow-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">1. Busca o Publica</h3>
              <p className="text-gray-600 leading-relaxed">
                Busca servicios disponibles o publica tu profesión. Es gratis y muy fácil.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Phone className="h-10 w-10 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">2. Contacta Directamente</h3>
              <p className="text-gray-600 leading-relaxed">
                Llama o envía un WhatsApp directamente al profesional. Sin intermediarios ni comisiones.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Star className="h-10 w-10 text-orange-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">3. Califica el Servicio</h3>
              <p className="text-gray-600 leading-relaxed">
                Después del trabajo, deja tu reseña para ayudar a otros sanjuaninos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-yellow-200">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              ¿Tenés un Oficio o Servicio?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Únete a nuestra comunidad y conecta directamente con clientes en toda San Juan. 
              Es gratis, simple y sin comisiones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-400 to-amber-400 text-yellow-800 px-8 py-4 rounded-xl font-bold hover:from-yellow-500 hover:to-amber-500 transition-all duration-200 shadow-sm">
                Publicar mi Servicio
              </button>
              <button className="border-2 border-yellow-400 text-yellow-700 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 hover:text-yellow-800 transition-all duration-200">
                Más Información
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800/95 backdrop-blur-sm text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-300 to-amber-300 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-yellow-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Nos Ayudamos San Juan</h3>
                </div>
              </div>
              <p className="text-gray-300 mb-4 max-w-md leading-relaxed">
                La plataforma que conecta sanjuaninos con profesionales locales. Encuentra servicios o promociona tu trabajo de manera directa y confiable.
              </p>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>San Juan, Argentina</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#servicios" className="hover:text-yellow-300 transition-colors">Servicios</a></li>
                <li><a href="#categorias" className="hover:text-yellow-300 transition-colors">Categorías</a></li>
                <li><a href="#como-funciona" className="hover:text-yellow-300 transition-colors">Cómo Funciona</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Términos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@nosayudamossj.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>264-XXX-XXXX</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Nos Ayudamos San Juan. Conectando nuestra provincia con confianza.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;