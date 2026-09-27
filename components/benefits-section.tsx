import { Badge } from "@/components/ui/badge";

export default function BenefitsSection() {
  const benefits = [
    {
      title: "Usa las gafas que quieras",
      description:
        "Esas Ray-Ban que te encantan. Tus gafas de esquí. Las de sol vintage que encontraste. Ahora todas pueden ser tuyas.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h10a4 4 0 004-4M3 15a4 4 0 014-4h.5M3 15c0-.93.32-1.79.86-2.47M21 15a4 4 0 01-4-4h-.5M21 15c0-.93-.32-1.79-.86-2.47M7.5 11h.01M16.5 11h.01M7 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
      ),
    },
    {
      title: "Deja de pagar de más",
      description:
        "¿$300 por unas gafas graduadas? Con WeLens, cualquier gafa de $50 se convierte en tu visión perfecta.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
    },
    {
      title: "Listo en segundos",
      description:
        "Presiona, alinea, listo. No necesitas herramientas ni ir a la óptica. Y cuando quieras quitarlas, se despegan sin dejar marca.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Material que funciona",
      description:
        "Silicona médica transparente. La misma que se usa en lentes de contacto. Resistente al agua, al sol, y al uso diario.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full py-20 lg:py-40 bg-studio-mist">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 mb-12">
          <Badge variant="secondary">Por qué WeLens</Badge>
          <h2 className="text-3xl sm:text-5xl tracking-tight font-semibold text-ink">
            La forma inteligente de ver mejor
          </h2>
          <p className="text-body max-w-2xl text-slate">
            No más compromisos entre estilo y visión. Tus gafas favoritas, ahora con tu graduación exacta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gallery-white rounded-3xl p-8 hover:scale-102 transition-all duration-300 flex flex-col min-h-[280px] group border border-transparent hover:border-steel/20 hover:shadow-lg"
            >
              <div className="text-ink mb-6 opacity-70 group-hover:opacity-100 transition-opacity">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-ink mb-3 tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-body-small text-slate leading-relaxed flex-grow">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
