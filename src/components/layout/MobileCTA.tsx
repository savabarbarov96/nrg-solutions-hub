import { Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background border-t border-border p-3 shadow-elevated">
      <div className="flex gap-3">
        <Button 
          variant="accent" 
          size="lg" 
          className="flex-1 gap-2"
          asChild
        >
          <a href="tel:+359888123456">
            <Phone className="w-5 h-5" />
            Обади се
          </a>
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="flex-1 gap-2"
          asChild
        >
          <a href="/контакти#оглед">
            <Calendar className="w-5 h-5" />
            Безплатен оглед
          </a>
        </Button>
      </div>
    </div>
  );
}
