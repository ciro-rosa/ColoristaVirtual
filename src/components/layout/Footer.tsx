import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M10 16.5v-9l6 4.5-6 4.5z"></path>
                <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"></rect>
              </svg>
              <span className="font-bold text-xl">De Sírius</span>
            </div>
            <p className="text-primary-200 mb-4">
              Produtos naturais de alta qualidade para transformar cabelos e vidas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary-200 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-200 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-200 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-200 transition">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Linhas de Produtos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-200 hover:text-white transition">Coloração</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">Tratamento</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">Descoloração</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">Matização</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">Finalizadores</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Área do Profissional</h3>
            <ul className="space-y-2">
              <li><Link to="/colorista" className="text-primary-200 hover:text-white transition">Colorista Virtual</Link></li>
              <li><Link to="/diagnostico" className="text-primary-200 hover:text-white transition">Diagnóstico Capilar</Link></li>
              <li><Link to="/galeria" className="text-primary-200 hover:text-white transition">Galeria de Transformações</Link></li>
              <li><Link to="/ranking" className="text-primary-200 hover:text-white transition">Ranking de Profissionais</Link></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">Treinamentos</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-primary-200">Av. Brasil, 1500, São Paulo - SP, 01310-200</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span className="text-primary-200">(11) 3456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span className="text-primary-200">contato@desirius.com.br</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-800 text-center">
          <p className="text-primary-300 text-sm">
            &copy; {new Date().getFullYear()} De Sírius Cosméticos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;