import { useState, useEffect, useRef } from "react";
import { Check, X, ChevronRight, Shield, Star, Phone, ArrowRight, ChevronDown, Zap, DollarSign, TrendingUp, BookOpen, Users, Building2, PiggyBank, Sparkles, Calculator, FileText, Bot, Clock, Award, Heart, Lock, HelpCircle, Menu, ChevronUp, ArrowDown, Play, Quote, ExternalLink } from "lucide-react";

const useInView = (th = 0.12) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: th });
    o.observe(el);
    return () => o.disconnect();
  }, [th]);
  return [ref, v];
};

const useCounter = (end, run, dur = 2000) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    const st = performance.now();
    const tick = (now) => { const t = Math.min((now - st) / dur, 1); setV(Math.round(end * (1 - Math.pow(1 - t, 3)))); if (t < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [run, end, dur]);
  return v;
};

const GradText = ({ children, className = "" }) => (
  <span className={`bg-clip-text text-transparent ${className}`} style={{ backgroundImage: "linear-gradient(135deg,#1a56db,#7c3aed)" }}>{children}</span>
);

const Section = ({ children, className = "", id, dark }) => (
  <section id={id} className={`px-4 sm:px-6 ${dark ? "bg-gray-950 text-white" : ""} ${className}`}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

const Btn = ({ children, href = "#get-started", size = "lg", variant = "primary", className = "", onClick }) => {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 cursor-pointer";
  const sz = size === "lg" ? "px-8 py-4 text-base" : size === "md" ? "px-6 py-3 text-sm" : "px-5 py-2.5 text-sm";
  const vr = variant === "primary"
    ? "text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
    : variant === "outline" ? "border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900" : "bg-white/10 text-white border border-white/20 hover:bg-white/20";
  const handleClick = onClick ? (e) => { e.preventDefault(); onClick(e); } : undefined;
  return <a href={href} onClick={handleClick} className={`${base} ${sz} ${vr} ${className}`} style={variant === "primary" ? { background: "linear-gradient(135deg,#1a56db,#6d28d9)" } : {}}>{children}</a>;
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, vis] = useInView();
  return <div ref={ref} className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

// ─── NAV ───
function Nav({ onStart }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="https://preview.1800accountant.com/img/1800Accountant-logo.svg" alt="1-800Accountant" className="h-8 sm:h-9" onError={(e) => { e.target.outerHTML='<span class="font-bold text-lg tracking-tight text-gray-700">1-800Accountant</span>'; }} />
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How It Works</a>
          <a href="#comparison" className="hover:text-gray-900 transition-colors">Why Us</a>
          <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
          <a href="tel:+18001234567" className="flex items-center gap-1.5 hover:text-gray-900"><Phone size={14} /> (800) 123-4567</a>
        </div>
        <div className="hidden md:block"><Btn size="sm" onClick={onStart}>Get Started Free <ArrowRight size={15} /></Btn></div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-700"><Menu size={22} /></button>
      </div>
      {open && <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 text-sm font-medium shadow-lg">
        <a href="#how-it-works" className="block py-2 text-gray-700" onClick={() => setOpen(false)}>How It Works</a>
        <a href="#comparison" className="block py-2 text-gray-700" onClick={() => setOpen(false)}>Why Us</a>
        <a href="#pricing" className="block py-2 text-gray-700" onClick={() => setOpen(false)}>Pricing</a>
        <Btn size="md" className="w-full mt-2" onClick={onStart}>Get Started <ArrowRight size={15} /></Btn>
      </div>}
    </nav>
  );
}

// ─── HERO ───
function Hero({ onStart }) {
  const roles = ["Rideshare Driver", "OnlyFans Creator", "Podcast Host", "DoorDash Driver", "Freelance Designer", "Etsy Seller", "Consultant", "Content Creator", "Dog Walker", "Tutor"];
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => { const i = setInterval(() => { setFade(false); setTimeout(() => { setIdx(p => (p + 1) % roles.length); setFade(true); }, 300); }, 2500); return () => clearInterval(i); }, []);

  return (
    <Section className="pt-28 sm:pt-36 pb-20 sm:pb-28 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle,#7c3aed,transparent 70%)" }} />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-15" style={{ background: "radial-gradient(circle,#1a56db,transparent 70%)" }} />
      </div>
      <div className="relative max-w-4xl mx-auto text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full text-sm font-semibold text-orange-700 mb-8">
            <Zap size={14} /> Tax savings exclusively for 1099 contractors
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-950 leading-tight tracking-tight mb-6">
            You're a{" "}
            <span className={`inline-block transition-all duration-300 ${fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
              <GradText>{roles[idx]}</GradText>
            </span>
            <br />
            <span className="text-gray-950">You're a business.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-4 leading-relaxed font-medium">
            You just might not know it yet.
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto mb-4 leading-relaxed">
            Let our accountants set up your business right so you <strong className="text-gray-600">actually save money on taxes</strong>. That's the whole point.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl mb-10 border border-gray-200 bg-white shadow-sm">
            <span className="text-base sm:text-lg font-bold text-gray-900">Smart setup. Bigger tax savings.</span>
            <span className="h-5 w-px bg-gray-300" />
            <span className="text-base sm:text-lg font-extrabold bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#1a56db,#7c3aed)" }}>We do your taxes & bookkeeping.</span>
          </div>
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Btn size="lg" onClick={onStart}>Get My Savings Started <ArrowRight size={18} /></Btn>
            <Btn variant="outline" size="lg" href="#how-it-works">See How It Works</Btn>
          </div>
        </FadeIn>
        <FadeIn delay={400}>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-400 flex-wrap">
            <span className="flex items-center gap-1.5"><Shield size={14} className="text-green-500" /> No surprise fees</span>
            <span className="flex items-center gap-1.5"><Star size={14} className="text-amber-400" /> 4.8/5 from 10,000+ clients</span>
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-blue-500" /> Setup in under 10 minutes</span>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

// ─── STAT BAR ───
function StatBar() {
  const [ref, vis] = useInView();
  const s1 = useCounter(7200, vis);
  const s2 = useCounter(10000, vis);
  const s3 = useCounter(30, vis);
  return (
    <div ref={ref} className="bg-gray-950 py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {[{ v: `${s1.toLocaleString()}`, l: "Average self-employment tax saved per year" }, { v: `${s2.toLocaleString()}+`, l: "1099 contractors trust 1-800Accountant" }, { v: `${s3}%+`, l: "Average effective tax rate reduction" }].map((s, i) => (
          <div key={i}><p className="text-3xl sm:text-4xl font-extrabold text-white mb-1 tabular-nums">{s.v}</p><p className="text-sm text-gray-400">{s.l}</p></div>
        ))}
      </div>
    </div>
  );
}

// ─── PROBLEM ───
function Problem() {
  return (
    <Section className="py-20 sm:py-28">
      <FadeIn>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-red-500 mb-4">The Problem</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-950 leading-tight mb-6">
            You're getting a 1099.<br />You're <em>overpaying</em> your taxes.
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            If you're a gig worker, freelancer, or have a side hustle, filing a 1099 without a business entity should be illegal. Why? Because you are giving up more than 15% of your earnings in self-employment tax that you don't have to. Every. Single. Year.
          </p>
        </div>
      </FadeIn>
      <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6">
        {[
          { emoji: "😰", title: "You're paying too much", desc: "Without the right entity structure, the IRS treats every dollar you earn as self-employment income. That's an extra 15.3% tax." },
          { emoji: "🤷", title: "Formation alone doesn't help", desc: "Other companies file your LLC and disappear. An LLC without the right tax election is just expensive paperwork." },
          { emoji: "💡", title: "The fix is simple", desc: "Talk to an accountant. Get the right entity. Elect the right tax treatment. Save thousands. That's what we do." },
        ].map((c, i) => (
          <FadeIn key={i} delay={i * 120}>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full hover:shadow-lg transition-shadow">
              <span className="text-3xl block mb-4">{c.emoji}</span>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{c.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ─── "YOU ARE A BUSINESS" ───
function YouAreBusiness({ onStart }) {
  const ppl = [
    { role: "Uber & Lyft Drivers", icon: "🚗", save: "$4,200" },
    { role: "OnlyFans Creators", icon: "📸", save: "$8,500" },
    { role: "DoorDash Drivers", icon: "🛵", save: "$3,800" },
    { role: "Podcast Hosts", icon: "🎙️", save: "$6,100" },
    { role: "Freelance Designers", icon: "🎨", save: "$7,400" },
    { role: "Etsy & Amazon Sellers", icon: "🛒", save: "$5,900" },
    { role: "Consultants", icon: "💼", save: "$9,200" },
    { role: "Content Creators", icon: "📱", save: "$7,800" },
    { role: "Personal Trainers", icon: "💪", save: "$4,600" },
    { role: "Real Estate Agents", icon: "🏠", save: "$8,100" },
    { role: "Tutors & Coaches", icon: "📚", save: "$5,500" },
    { role: "Construction Subs", icon: "🔨", save: "$6,800" },
  ];
  return (
    <Section className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white">
      <FadeIn>
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-violet-600 mb-4">If you get a 1099, read this</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-950 leading-tight mb-4">
            You <GradText>are</GradText> a business.
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">No matter what you do — if you earn 1099 income, the IRS sees you as a business. Time to start saving like one.</p>
        </div>
      </FadeIn>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-12">
        {ppl.map((p, i) => (
          <FadeIn key={i} delay={i * 60}>
            <div className="bg-white rounded-2xl border border-gray-200 p-4 text-center hover:border-blue-300 hover:shadow-md transition-all group cursor-default">
              <span className="text-2xl sm:text-3xl block mb-2">{p.icon}</span>
              <p className="font-semibold text-gray-900 text-sm mb-1">{p.role}</p>
              <p className="text-xs text-gray-400 group-hover:hidden transition-all">You're a business.</p>
              <p className="text-xs font-bold text-emerald-600 hidden group-hover:block transition-all">Save ~{p.save}/yr</p>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn>
        <div className="text-center">
          <Btn size="lg" onClick={onStart}>See What You Could Save <ArrowRight size={18} /></Btn>
        </div>
      </FadeIn>
    </Section>
  );
}

// ─── COMPARISON ───
function Comparison() {
  const rows = [
    { feature: "Business entity formation", us: true, them: true },
    { feature: "An accountant ensures the correct formation", us: true, them: false },
    { feature: "Entity type optimized for YOUR tax situation", us: true, them: false },
    { feature: "S-Corp election filing (Form 2553)", us: true, them: false },
    { feature: "AI-powered bookkeeping — every month", us: true, them: false },
    { feature: "Business tax preparation & filing", us: true, them: false },
    { feature: "Personal tax preparation", us: "premium", them: false },
    { feature: "Quarterly estimated tax compliance", us: true, them: false },
    { feature: "1099 issuing for your subcontractors", us: true, them: false },
    { feature: "Ongoing tax strategy & optimization", us: true, them: false },
    { feature: "CPA review of filings", us: "premium", them: false },
    { feature: "Payroll setup", us: "premium", them: false },
  ];
  return (
    <Section id="comparison" className="py-20 sm:py-28">
      <FadeIn>
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">The Difference</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-950 leading-tight mb-4">
            Formation companies form your business.<br /><GradText>We actually save you money.</GradText>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Other companies file your LLC and wave goodbye. We stick around to make sure you're paying the least amount of tax legally possible.</p>
        </div>
      </FadeIn>
      <FadeIn delay={150}>
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 gap-0 border-b border-gray-200 bg-gray-50">
            <div className="col-span-6 p-4 sm:p-5"><p className="text-xs font-bold uppercase tracking-wider text-gray-400">Feature</p></div>
            <div className="col-span-3 p-4 sm:p-5 text-center border-l border-gray-200" style={{ background: "linear-gradient(180deg,rgba(245,158,11,0.04),rgba(234,88,12,0.04))" }}>
              <div className="flex items-center justify-center gap-1.5"><p className="text-xs font-bold text-gray-900">1-800Accountant</p></div>
            </div>
            <div className="col-span-3 p-4 sm:p-5 text-center border-l border-gray-200"><p className="text-xs font-bold text-gray-400">Typical Formation Co.</p></div>
          </div>
          {rows.map((r, i) => (
            <div key={i} className={`grid grid-cols-12 gap-0 ${i < rows.length - 1 ? "border-b border-gray-100" : ""}`}>
              <div className="col-span-6 p-3 sm:p-4 flex items-center"><p className="text-sm text-gray-700">{r.feature}</p></div>
              <div className="col-span-3 p-3 sm:p-4 flex items-center justify-center border-l border-gray-100" style={{ background: "rgba(26,86,219,0.02)" }}>
                {r.us === true ? <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><Check size={14} className="text-emerald-600" /></div>
                  : r.us === "premium" ? <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">Premium</span>
                  : <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center"><X size={14} className="text-red-400" /></div>}
              </div>
              <div className="col-span-3 p-3 sm:p-4 flex items-center justify-center border-l border-gray-100">
                {r.them ? <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><Check size={14} className="text-emerald-600" /></div>
                  : <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center"><X size={14} className="text-red-400" /></div>}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={300}>
        <div className="max-w-3xl mx-auto mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-6 text-center">
          <p className="text-base sm:text-lg font-bold text-gray-900 mb-1">Forming an LLC without the right tax strategy is just expensive paperwork.</p>
          <p className="text-sm text-gray-500">The entity is the vehicle. The tax savings are the destination. We get you to both.</p>
        </div>
      </FadeIn>
    </Section>
  );
}

// ─── HOW IT WORKS ───
function HowItWorks() {
  const steps = [
    { n: "01", title: "We Make Your Business Happen", desc: "LLC, S-Corp election, EIN — we handle all the paperwork and state filings. But unlike other formation companies, your entity is set up specifically to minimize your tax bill.", icon: <FileText size={24} />, color: "#1a56db" },
    { n: "02", title: "We Get You Onboarded", desc: "A small business tax specialist makes sure you understand how the savings work and answers any of your pressing questions about your tax situation.", icon: <Users size={24} />, color: "#7c3aed" },
    { n: "03", title: "AI Bookkeeping Keeps You Clean", desc: "Our AI categorizes your expenses every month so you never miss a deduction. No more shoeboxes of receipts. No more tax-time scrambles.", icon: <Bot size={24} />, color: "#059669" },
    { n: "04", title: "We File Your Taxes & Maximize Savings", desc: "Quarterly estimates. Annual business return. S-Corp payroll. We handle it all — and we make sure you're capturing every single dollar of savings.", icon: <DollarSign size={24} />, color: "#dc2626" },
  ];
  return (
    <Section id="how-it-works" className="py-20 sm:py-28 bg-gray-50">
      <FadeIn>
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-4">How It Works</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-950 leading-tight mb-4">Accountant first. Entity second.<br />Savings always.</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">Four steps. That's it. You go from overpaying to optimized.</p>
        </div>
      </FadeIn>
      <div className="max-w-4xl mx-auto space-y-6">
        {steps.map((s, i) => (
          <FadeIn key={i} delay={i * 120}>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex gap-5 sm:gap-8 items-start hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${s.color}12`, color: s.color }}>{s.icon}</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: s.color }}>Step {s.n}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ─── CALLOUT ───
function Callout() {
  return (
    <div className="bg-gray-950 py-16 sm:py-20 px-4 sm:px-6">
      <FadeIn>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            "I wish someone told me to talk to an accountant <em className="text-blue-400">before</em> I formed my LLC."
          </h2>
          <p className="text-gray-400 text-base mb-2">— Every 1099 contractor who formed with another company</p>
          <p className="text-gray-500 text-sm max-w-xl mx-auto mt-6">
            Compliance is the bare minimum. Becoming a business is about one thing: <strong className="text-white">keeping more of the money you earn.</strong>
          </p>
        </div>
      </FadeIn>
    </div>
  );
}

// ─── PRICING ───
function Pricing({ onStart }) {
  const [annual, setAnnual] = useState(false);
  const plans = [
    {
      name: "Independent Operator", badge: "Best Value", price6: 199, priceYr: 398, tagline: "Everything a 1099 contractor needs",
      features: ["File Your Tax Returns", "Manage Your Accounting", "Achieve Tax Savings", "Register Your Business"],
      cta: "Get Started", highlight: false,
    },
    {
      name: "Premium Full Coverage", badge: "Full Coverage", price6: 299, priceYr: 598, tagline: "Complete peace of mind with live experts",
      features: ["Everything in the Independent Operator Plan", "Access to On-Demand Tax Expert", "CPA Review of Taxes"],
      cta: "Get Full Coverage", highlight: true,
    },
  ];
  return (
    <Section id="pricing" className="py-20 sm:py-28 bg-gray-50">
      <FadeIn>
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">Pricing</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-950 leading-tight mb-4">Simple, transparent pricing.</h2>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">No hidden fees. No surprise upsells. Just tax savings.</p>
          <div className="inline-flex items-center bg-white border border-gray-200 rounded-full p-1 mt-6">
            <button onClick={() => setAnnual(false)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!annual ? "bg-gray-900 text-white shadow" : "text-gray-500"}`}>Every 6 months</button>
            <button onClick={() => setAnnual(true)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${annual ? "bg-gray-900 text-white shadow" : "text-gray-500"}`}>Annual</button>
          </div>
        </div>
      </FadeIn>
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
        {plans.map((p, i) => (
          <FadeIn key={i} delay={i * 150}>
            <div className={`rounded-3xl p-7 sm:p-8 h-full flex flex-col ${p.highlight ? "bg-gray-950 text-white border-2 border-gray-800 shadow-2xl relative" : "bg-white border border-gray-200 shadow-sm"}`}>
              {p.highlight && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#1a56db,#7c3aed)" }}>Most Popular</div>}
              <div className="mb-6">
                <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${p.highlight ? "text-blue-400" : "text-blue-600"}`}>{p.badge}</p>
                <h3 className={`text-xl font-bold mb-1 ${p.highlight ? "text-white" : "text-gray-900"}`}>{p.name}</h3>
                <p className={`text-sm ${p.highlight ? "text-gray-400" : "text-gray-500"}`}>{p.tagline}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold ${p.highlight ? "text-white" : "text-gray-900"}`}>${annual ? p.priceYr : p.price6}</span>
                  <span className={`text-sm ${p.highlight ? "text-gray-400" : "text-gray-400"}`}>/{annual ? "yr" : "6mo"}</span>
                </div>
                {!annual && <p className={`text-xs mt-1 ${p.highlight ? "text-gray-500" : "text-gray-400"}`}>${p.priceYr}/yr billed annually</p>}
              </div>
              <div className="space-y-3 mb-8 flex-1">
                {p.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-2.5">
                    <Check size={16} className={`mt-0.5 flex-shrink-0 ${p.highlight ? "text-emerald-400" : "text-emerald-500"}`} />
                    <span className={`text-sm ${p.highlight ? "text-gray-300" : "text-gray-600"} ${j === 0 && i === 1 ? "font-semibold" : ""}`}>{f}</span>
                  </div>
                ))}
              </div>
              <Btn variant={p.highlight ? "primary" : "outline"} size="lg" className="w-full" onClick={onStart}>{p.cta} <ArrowRight size={16} /></Btn>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={350}>
        <p className="text-center text-sm text-gray-400 mt-8 max-w-lg mx-auto">State filing fees (varies by state) are collected separately during checkout. Plan billing begins after your entity is approved.</p>
      </FadeIn>
    </Section>
  );
}

// ─── TESTIMONIALS ───
function Testimonials() {
  const t = [
    { name: "Marcus T.", role: "Rideshare Driver", text: "I had no idea I was overpaying by $6,000 a year. FormRight's accountant set me up with an S-Corp and now I keep way more of what I earn.", save: "$6,200" },
    { name: "Jessica R.", role: "Freelance Designer", text: "Other companies just filed my LLC and left. FormRight actually does my taxes and bookkeeping. The AI bookkeeping alone saves me hours every month.", save: "$8,400" },
    { name: "David K.", role: "Consultant", text: "Talking to an accountant before forming was a game changer. I would have picked the wrong entity type without their guidance.", save: "$11,200" },
  ];
  return (
    <Section className="py-20 sm:py-28">
      <FadeIn>
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-600 mb-4">Real Results</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-950 leading-tight">They found out they were a business.<br />Then they started saving.</h2>
        </div>
      </FadeIn>
      <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
        {t.map((r, i) => (
          <FadeIn key={i} delay={i * 120}>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full flex flex-col hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-1 mb-4">{[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-amber-400 fill-amber-400" />)}</div>
              <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5">"{r.text}"</p>
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-extrabold text-emerald-600">{r.save}</p>
                  <p className="text-xs text-gray-400">saved/yr</p>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ─── FAQ ───
function FAQ() {
  const [open, setOpen] = useState(null);
  const qs = [
    { q: "Why should I talk to an accountant before forming my business?", a: "Because the entity type and tax election you choose determines how much you save. An LLC taxed as a sole proprietorship saves you nothing on self-employment tax. An LLC with an S-Corp election can save you thousands. The right answer depends on your income, expenses, and situation — and an accountant can figure that out in one conversation." },
    { q: "How is FormRight different from LegalZoom, ZenBusiness, etc.?", a: "They file your paperwork. That's it. We start with an accountant consultation, form your entity with the right tax strategy, then handle your bookkeeping, tax prep, quarterly estimates, and ongoing optimization. Formation is just the first step — the tax savings are the whole point." },
    { q: "I'm a gig worker making under $50K. Is this worth it?", a: "Yes. Even at $30-40K in 1099 income, the right entity structure can save you $3,000-5,000/year in self-employment tax alone. Our Independent plan pays for itself many times over." },
    { q: "What is an S-Corp election and why does it matter?", a: "An S-Corp election lets you split your income into salary and distributions. You only pay self-employment tax (15.3%) on the salary portion. On $100K in income, this can easily save you $7,000+ per year. We handle the Form 2553 filing with the IRS." },
    { q: "Do I need an EIN?", a: "Yes — it's your business's identity number with the IRS. You need it to open a business bank account, file taxes as a business, and make your S-Corp election. We can get one for you, typically within one business day." },
    { q: "What does the AI bookkeeping actually do?", a: "It automatically categorizes your income and expenses every month, tracks deductions you'd otherwise miss, and keeps your books clean so tax time is seamless. No more spreadsheets. No more guessing." },
  ];
  return (
    <Section className="py-20 sm:py-28 bg-gray-50">
      <FadeIn>
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950">Got questions? Good.</h2>
        </div>
      </FadeIn>
      <div className="max-w-3xl mx-auto space-y-3">
        {qs.map((q, i) => (
          <FadeIn key={i} delay={i * 60}>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">{q.q}</span>
                <ChevronDown size={18} className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <div className="px-5 pb-5 -mt-1"><p className="text-sm text-gray-500 leading-relaxed">{q.a}</p></div>}
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ─── FINAL CTA ───
function FinalCTA({ onStart }) {
  return (
    <div className="py-20 sm:py-28 px-4 sm:px-6" style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)" }}>
      <FadeIn>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            Stop overpaying.<br />Start saving like a business.
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-lg mx-auto">Talk to an accountant. Get the right entity. Keep more of your money. It takes less than 10 minutes to start.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Btn size="lg" onClick={onStart}>Get My Savings Started <ArrowRight size={18} /></Btn>
            <a href="tel:+18001234567" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors"><Phone size={16} /> Or call (800) 123-4567</a>
          </div>
          <div className="flex items-center justify-center gap-6 mt-10 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><Shield size={12} /> Bank-level security</span>
            <span className="flex items-center gap-1.5"><Star size={12} /> 4.8/5 rating</span>
            <span className="flex items-center gap-1.5"><Lock size={12} /> Not legal advice</span>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 px-4 sm:px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <img src="https://preview.1800accountant.com/img/1800Accountant-logo.svg" alt="1-800Accountant" className="h-6 brightness-0 invert opacity-70" onError={(e) => { e.target.outerHTML='<span class="font-bold text-sm text-white">1-800Accountant</span>'; }} />
        <p className="text-xs text-gray-500 text-center">1-800Accountant provides tax preparation and bookkeeping services. We are not a law firm and do not provide legal advice. Consult a licensed attorney for legal matters. Savings estimates are illustrative and vary by individual circumstances.</p>
        <p className="text-xs text-gray-600">© 2026 1-800Accountant</p>
      </div>
    </footer>
  );
}

// ─── LANDING PAGE ───
export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <Nav onStart={onStart} />
      <Hero onStart={onStart} />
      <StatBar />
      <Problem />
      <YouAreBusiness onStart={onStart} />
      <Comparison />
      <HowItWorks />
      <Callout />
      <Pricing onStart={onStart} />
      <Testimonials />
      <FAQ />
      <FinalCTA onStart={onStart} />
      <Footer />
    </div>
  );
}
