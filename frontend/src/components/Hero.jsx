import { Apple, BookOpen, Play, Smartphone } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#f8f8f8] py-10 md:py-16">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-orange shadow-sm">Sardor-Ekitob.uz digital marketplace</p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight text-brand-ink md:text-6xl">
            <span className="text-brand-orange">Sardor-Ekitob.uz</span> - eng sara elektron va audio kitoblar!
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-brand-muted">
            O'zbek tilidagi eng qulay internet kitob do'koniga xush kelibsiz.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn-primary"><Apple className="h-5 w-5" /> App Store</button>
            <button className="btn-outline"><Smartphone className="h-5 w-5" /> Google Play</button>
            <button className="btn-outline"><BookOpen className="h-5 w-5" /> Web orqali o'qish</button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[28px] bg-white p-6 shadow-soft">
          <div className="absolute right-5 top-5 z-10 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-brand-orange shadow-sm">
            Kitoblar olamiga sayohat
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80"
            ].map((src, index) => (
              <img
                key={src}
                src={src}
                alt="Kitob cover"
                className={`h-72 w-full rounded-2xl object-cover shadow-sm ${index === 1 ? "mt-10" : ""}`}
              />
            ))}
          </div>
          <button className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-orange text-white shadow-soft">
            <Play className="ml-1 h-8 w-8 fill-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
