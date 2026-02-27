interface PageHeroProps {
  title: string;
  description: string;
}

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <div className="w-screen flex justify-center">
      <div className="max-w-3xl py-8 h-fit w-full px-4 flex flex-col ">
        <h1 className="font-bold text-3xl mb-2">{title}</h1>
        <p className="text-black/70">{description}</p>
      </div>
    </div>
  );
}
