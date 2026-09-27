import { Badge } from "@/components/ui/badge";

export default function BenefitsSection() {
  const benefits = [
    {
      title: "Usa las gafas que quieras",
      description:
        "Esas Ray-Ban que te encantan. Tus gafas de esquí. Las de sol vintage que encontraste. Ahora todas pueden ser tuyas.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Deja de pagar de más",
      description:
        "¿$300 por unas gafas graduadas? Con WeLens, cualquier gafa de $50 se convierte en tu visión perfecta.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Listo en segundos",
      description:
        "Presiona, alinea, listo. No necesitas herramientas ni ir a la óptica. Y cuando quieras quitarlas, se despegan sin dejar marca.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
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
