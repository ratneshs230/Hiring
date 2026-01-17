
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Info, 
  Users, 
  Clock, 
  MapPin, 
  Sparkles,
  Loader2,
  Code2,
  Trophy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SKILLS, BENEFITS, PERKS, getIcon } from './constants.tsx';
import { FormData } from './types.ts';
import { getAiAnalysis } from './services/geminiService.ts';

interface CollapsibleProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleProps> = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-indigo-600">{icon}</div>
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>
      {isOpen && (
        <div className="px-8 pb-8 animate-in slide-in-from-top-2 duration-300">
          <div className="pt-4 border-t border-slate-50">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    course: '',
    college: '',
    contact: '',
    interests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Process with Gemini for personal touch
    const feedback = await getAiAnalysis(formData);
    setAiMessage(feedback);
    
    // Simulate network delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Application Received!</h2>
          <p className="text-slate-600 mb-6">Thank you, {formData.name}. We've received your application for the GramTech Labs Skill Development Program.</p>
          
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-8 text-left">
            <div className="flex items-center gap-2 mb-2 text-emerald-700 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Personal Note from GramTech</span>
            </div>
            <p className="text-emerald-800 italic text-sm leading-relaxed">
              "{aiMessage}"
            </p>
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900 pb-20">
      {/* Header / Hero Section */}
      <header className="bg-indigo-700 text-white pt-12 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-indigo-700 font-black text-xl italic">GT</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">GramTech Labs</h1>
          </div>
          
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-600/50 backdrop-blur-sm border border-indigo-500 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Now Hiring: 5 Positions Available
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Learn Skills. Work on Projects. <span className="text-emerald-400">Earn Stipend.</span>
            </h2>
            <p className="text-indigo-100 text-lg mb-8 leading-relaxed opacity-90 max-w-2xl mx-auto">
              Join our technical skill development program in Lucknow (Rural). Freshers & beginners encouraged!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2 bg-indigo-800/50 px-4 py-2 rounded-lg border border-indigo-600/50 backdrop-blur-sm">
                <Clock className="w-4 h-4 text-emerald-400" /> Part-Time
              </div>
              <div className="flex items-center gap-2 bg-indigo-800/50 px-4 py-2 rounded-lg border border-indigo-600/50 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-emerald-400" /> Remote - Lucknow
              </div>
              <div className="flex items-center gap-2 bg-indigo-800/50 px-4 py-2 rounded-lg border border-indigo-600/50 backdrop-blur-sm">
                <Users className="w-4 h-4 text-emerald-400" /> 5 Openings
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 -mt-20 relative z-20 space-y-8">
        
        {/* Primary Form Section */}
        <section className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-12 ring-8 ring-slate-50/50">
          <div className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">Apply Now</h3>
              <p className="text-slate-500">Kickstart your career with GramTech Labs today.</p>
            </div>
            <div className="hidden md:block">
               <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400">
                      U{i}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-600">
                    +1
                  </div>
               </div>
               <p className="text-[10px] text-center mt-1 text-slate-400 font-semibold uppercase tracking-widest">Applying now</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 md:col-span-1">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Verma"
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Course & College</label>
                <input 
                  required
                  type="text" 
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="e.g. BCA, Lucknow University"
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">WhatsApp / Contact Number</label>
                <input 
                  required
                  type="tel" 
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-4 md:col-span-1 flex flex-col">
              <div className="flex-grow">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tell us why you're interested</label>
                <textarea 
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="I want to learn app development and work on real-world projects in my city..."
                  className="w-full h-[calc(100%-1.75rem)] px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none resize-none"
                ></textarea>
              </div>
            </div>

            <div className="md:col-span-2 pt-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-5 rounded-2xl transition-all shadow-xl hover:shadow-indigo-200 flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processing Application...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <div className="mt-6 flex items-start gap-3 bg-slate-50 p-4 rounded-2xl justify-center">
                <Info className="w-4 h-4 text-slate-400 mt-0.5" />
                <p className="text-[11px] text-slate-500 text-center">
                  By applying, you agree to join the skill development program. Selected students will receive an official stipend and certificate.
                </p>
              </div>
            </div>
          </form>
        </section>

        {/* Collapsible Info Sections */}
        <div className="space-y-4">
          <CollapsibleSection title="Skills You Will Master" icon={<Code2 className="w-6 h-6" />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SKILLS.map((skill, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                  <div className="w-10 h-10 bg-white shadow-sm text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    {getIcon(skill.icon)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{skill.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Program Perks & Benefits" icon={<Trophy className="w-6 h-6" />}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {BENEFITS.map((benefit, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 text-center sm:text-left">
                    <div className="text-indigo-600 mb-3 flex justify-center sm:justify-start">
                      {getIcon(benefit.icon)}
                    </div>
                    <h4 className="font-bold text-slate-800 mb-1 text-sm">{benefit.title}</h4>
                    <p className="text-xs text-slate-600 leading-tight">{benefit.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider text-center sm:text-left">What we provide</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {PERKS.map((perk, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-xl text-slate-700">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        {perk.icon}
                      </div>
                      <span className="text-xs font-semibold">{perk.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleSection>
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs italic">GT</span>
            </div>
            <span className="text-lg font-bold text-slate-800 tracking-tight">GramTech Labs</span>
          </div>
          <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">Empowering rural youth with modern technological skills and real-world opportunities.</p>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            <span className="hover:text-indigo-500 cursor-pointer transition-colors">Skill Development</span>
            <span className="hover:text-indigo-500 cursor-pointer transition-colors">Paid Internships</span>
            <span className="hover:text-indigo-500 cursor-pointer transition-colors">Rural Lucknow</span>
          </div>
          <p className="mt-12 text-[10px] text-slate-300">© 2024 GramTech Labs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
