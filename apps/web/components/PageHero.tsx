interface PageHeroProps {
  title: string;
  description: string;
}

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <div className="border-b border-gray-200 w-screen flex justify-center">
      <div className="max-w-3xl px-4 py-8 h-fit w-full flex flex-col border-x border-gray-200">
        <h1 className="font-bold text-3xl mb-2">{title}</h1>
        <p className="text-black/70">{description}</p>
      </div>
    </div>
  );
}
