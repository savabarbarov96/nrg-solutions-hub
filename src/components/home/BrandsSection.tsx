const brands = [
  { name: 'Dyness', logo: null },
  { name: 'Diae', logo: null },
  { name: 'Jinko', logo: null },
  { name: 'JA Solar', logo: null },
  { name: 'Canadian Solar', logo: null },
  { name: 'Longi', logo: null },
];

export function BrandsSection() {
  return (
    <section className="py-12 bg-muted/30 border-y border-border">
      <div className="container-section">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          Работим с утвърдени марки в индустрията
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {brands.map((brand) => (
            <div 
              key={brand.name} 
              className="flex items-center justify-center h-12 px-6 rounded-lg bg-background border border-border"
            >
              <span className="text-lg font-display font-semibold text-muted-foreground">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
