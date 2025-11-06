import { ArrowRight } from '../../utils/icons';

export function HeroCTA() {
  return (
    <div className="flex justify-center lg:justify-start">
      <a 
        href="/cere-oferta"
        className="px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center group shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
      >
        Cere Oferte Gratuite
        <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
      </a>
    </div>
  );
}
 