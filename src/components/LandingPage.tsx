import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Building2, 
  Calculator, 
  FileText, 
  Users, 
  ShieldCheck, 
  LayoutDashboard,
  ArrowRight,
  Mail,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ onLogin }: { onLogin: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between h-16 items-center">
        <div className="flex items-center gap-2">
          <Building2 className="text-sky-600 w-8 h-8" />
          <span className="text-xl font-black tracking-tighter text-slate-900">iKoinoxrista<span className="text-slate-400">.gr</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-sky-600 transition-colors">Λειτουργίες</a>
          <a href="#how-it-works" className="hover:text-sky-600 transition-colors">Πώς Λειτουργεί</a>
          <a href="#pricing" className="hover:text-sky-600 transition-colors">Πακέτα</a>
          <button 
            onClick={onLogin}
            className="px-4 py-2 text-slate-600 hover:text-sky-600 transition-colors cursor-pointer"
          >
            Σύνδεση
          </button>
          <button 
            onClick={onLogin}
            className="bg-sky-600 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-sky-100 hover:bg-sky-700 transition-all cursor-pointer"
          >
            Ξεκινήστε Δωρεάν
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-slate-100 px-4 py-6 space-y-4"
        >
          <a href="#features" className="block text-slate-600 font-semibold" onClick={() => setIsOpen(false)}>Λειτουργίες</a>
          <a href="#how-it-works" className="block text-slate-600 font-semibold" onClick={() => setIsOpen(false)}>Πώς Λειτουργεί</a>
          <a href="#pricing" className="block text-slate-600 font-semibold" onClick={() => setIsOpen(false)}>Πακέτα</a>
          <button 
            onClick={() => { onLogin(); setIsOpen(false); }}
            className="w-full py-3 bg-sky-600 text-white rounded-full font-bold"
          >
            Ξεκινήστε Δωρεάν
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all"
  >
    <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-6 text-sky-600">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm font-medium">{description}</p>
  </motion.div>
);

const PricingCard = ({ title, price, features, highlighted, ctaText, onStart }: any) => (
  <div className={`p-8 rounded-[2.5rem] border ${highlighted ? 'border-sky-600 bg-sky-600 text-white shadow-2xl scale-105 z-10' : 'border-slate-200 bg-white text-slate-900'} flex flex-col`}>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="flex items-baseline gap-1 mb-6">
      <span className="text-4xl font-black">{price}</span>
      <span className={highlighted ? 'text-sky-100 opacity-80' : 'text-slate-400 font-bold'}>/μήνα</span>
    </div>
    <ul className="space-y-4 mb-8 flex-grow">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex items-center gap-3">
          <CheckCircle2 className={`w-5 h-5 ${highlighted ? 'text-sky-200' : 'text-sky-600'}`} />
          <span className="text-sm font-semibold">{f}</span>
        </li>
      ))}
    </ul>
    <button 
      onClick={onStart}
      className={`w-full py-4 rounded-full font-bold shadow-md transition-all cursor-pointer ${highlighted ? 'bg-white text-sky-600 hover:bg-sky-50 shadow-sky-900/20' : 'bg-sky-600 text-white hover:bg-sky-700 shadow-sky-100'}`}
    >
      {ctaText}
    </button>
  </div>
);

export default function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar onLogin={onStart} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mb-8 border border-emerald-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ΔΩΡΕΑΝ ΓΙΑ ΠΕΡΙΟΡΙΣΜΕΝΟ ΧΡΟΝΟ
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-8">
              Κατανομή κοινοχρήστων <br />
              <span className="text-sky-600 underline decoration-sky-200 underline-offset-[12px]">απλά</span> και έξυπνα.
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
              Αυτόματος υπολογισμός, αποστολή και παρακολούθηση δαπανών – όλα σε ένα σημείο για διαχειριστές και επαγγελματίες.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onStart}
                className="px-10 py-5 bg-sky-600 text-white rounded-full font-bold text-lg hover:bg-sky-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-sky-100 cursor-pointer"
              >
                Ξεκινήστε Δωρεάν <ArrowRight className="w-5 h-5" />
              </button>
              <a 
                href="#pricing"
                className="px-10 py-5 border border-slate-200 text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition-all text-center"
              >
                Δες τα Πακέτα
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-emerald-400/20 blur-3xl rounded-full translate-x-12" />
            <div className="relative bg-white/80 backdrop-blur rounded-[2.5rem] shadow-2xl shadow-slate-300 border border-white p-2 overflow-hidden">
               <div className="bg-slate-50/50 rounded-[2rem] w-full h-full overflow-hidden p-6 flex flex-col border border-slate-100">
                  {/* Mock Dashboard UI */}
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-600 shadow-lg shadow-sky-200" />
                        <div className="h-4 w-32 bg-slate-200 rounded-full" />
                     </div>
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/50" />
                        <div className="w-3 h-3 rounded-full bg-amber-400/50" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400/50" />
                     </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                     <div className="h-24 bg-white rounded-2xl border border-slate-100 p-4 flex flex-col justify-between shadow-sm">
                        <div className="h-2.5 w-12 bg-slate-100 rounded-full" />
                        <div className="h-5 w-16 bg-sky-100 rounded-full animate-pulse" />
                     </div>
                     <div className="h-24 bg-white rounded-2xl border border-slate-100 p-4 flex flex-col justify-between shadow-sm">
                        <div className="h-2.5 w-12 bg-slate-100 rounded-full" />
                        <div className="h-5 w-16 bg-slate-100 rounded-full" />
                     </div>
                     <div className="h-24 bg-emerald-50 rounded-2xl border border-emerald-100 p-4 flex flex-col justify-between">
                        <div className="h-2.5 w-12 bg-emerald-100 rounded-full" />
                        <div className="h-5 w-16 bg-emerald-600/30 rounded-full" />
                     </div>
                  </div>
                  <div className="flex-grow space-y-4">
                     {[1,2,3].map(i => (
                        <div key={i} className="h-12 bg-white rounded-xl border border-slate-50 flex items-center px-4 gap-4 shadow-sm">
                           <div className="w-8 h-8 bg-slate-100 rounded-lg" />
                           <div className="h-2 w-full bg-slate-50 rounded-full" />
                           <div className="w-12 h-6 bg-sky-100 rounded-full" />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 flex items-center gap-5">
              <div className="bg-sky-100 p-3 rounded-2xl text-sky-600">
                <LayoutDashboard className="w-7 h-7" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-0.5">PLATFORM READY</div>
                <div className="text-xl font-black text-slate-900 leading-tight">3.500+ Πολυκατοικίες</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section id="how-it-works" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Πώς Λειτουργεί</h2>
              <div className="w-12 h-1.5 bg-sky-600 mx-auto rounded-full" />
           </div>
           <div className="grid md:grid-cols-3 gap-12">
              {[
                { n: "1", t: "Εισαγωγή Δεδομένων", d: "Καταχωρήστε διαμερίσματα και χιλιοστά της πολυκατοικίας σας." },
                { n: "2", t: "Υπολογισμός", d: "Αυτόματος υπολογισμός κοινοχρήστων με βάση τις δαπάνες του μήνα." },
                { n: "3", t: "Εκτύπωση PDF", d: "Δημιουργία και αποστολή ειδοποιητηρίων στους ενοίκους άμεσα." }
              ].map((step, i) => (
                <div key={i} className="text-center group">
                   <div className="w-20 h-20 bg-white text-sky-600 rounded-[2rem] flex items-center justify-center text-3xl font-black mx-auto mb-8 shadow-xl shadow-slate-100 group-hover:bg-sky-600 group-hover:text-white transition-all border border-slate-100">
                      {step.n}
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{step.t}</h3>
                   <p className="text-slate-500 leading-relaxed font-medium text-sm px-6">{step.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Τι Λένε οι Χρήστες μας</h2>
            <p className="text-slate-500 font-medium tracking-tight">Δείτε τι λένε οι διαχειριστές που μας εμπιστεύονται καθημερινά</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { q: "Το iKoinoxrista.gr μου εξοικονόμησε ώρες εργασίας κάθε μήνα. Πλέον η έκδοση κοινοχρήστων είναι παιχνιδάκι!", a: "Μαρία Παπαδοπούλου", r: "Διαχειρίστρια" },
              { q: "Η καλύτερη επένδυση που έκανα. Διαχειρίζομαι όλες τις πολυκατοικίες μου από ένα σημείο.", a: "Γιώργος Κωνσταντίνου", r: "Διαχειριστής 3 πολυκατοικιών" },
              { q: "Επιτέλους μια σύγχρονη λύση! Οι κάτοικοι βλέπουν τα κοινόχρηστα τους online και δεν υπάρχουν παράπονα.", a: "Ελένη Δημητρίου", r: "Πρόεδρος Πολυκατοικίας" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm italic text-lg leading-relaxed text-slate-700 relative border border-slate-100">
                <div className="text-sky-200 text-6xl absolute -top-4 left-4 font-serif">"</div>
                <p className="mb-6 z-10 relative">{t.q}</p>
                <div className="not-italic">
                  <div className="font-bold text-slate-900">{t.a}</div>
                  <div className="text-xs text-slate-400 font-black uppercase tracking-widest mt-1">{t.r}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 px-4">
            <div className="text-sky-600 font-black mb-4 uppercase tracking-[0.2em] text-xs">Full Suite</div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Όλα όσα χρειάζεστε</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">Πλήρης λύση διαχείρισης κοινοχρήστων με όλα τα επαγγελματικά εργαλεία για οργάνωση χωρίς άγχος.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Calculator} 
              title="Αυτόματος Υπολογισμός" 
              description="Κατανομή δαπανών με βάση χιλιοστά και εξειδικευμένους συντελεστές ανελκυστήρα."
            />
            <FeatureCard 
              icon={FileText} 
              title="Έκδοση PDF" 
              description="Ειδοποιητήρια και αποδείξεις σε επαγγελματική μορφή έτοιμα για εκτύπωση."
            />
            <FeatureCard 
              icon={Mail} 
              title="Ειδοποιήσεις" 
              description="Αυτόματη αποστολή ειδοποιητηρίων μέσω email σε όλους τους ενοίκους με ένα κλικ."
            />
            <FeatureCard 
              icon={LayoutDashboard} 
              title="Στατιστικά" 
              description="Γραφήματα και αναλυτικά στοιχεία εξόδων για πλήρη οικονομική εικόνα."
            />
            <FeatureCard 
              icon={Users} 
              title="Διαχείριση Κατοίκων" 
              description="Πρόσκληση και διαχείριση πρόσβασης ενοίκων στην πλατφόρμα."
            />
            <FeatureCard 
              icon={Building2} 
              title="Πολλές Πολυκατοικίες" 
              description="Διαχειριστείτε απεριόριστες πολυκατοικίες από έναν κεντρικό λογαριασμό."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 px-4">
             <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-wide">
                TIERING SYSTEM
             </div>
             <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Επιλέξτε το Πακέτο σας</h2>
             <p className="text-slate-500 font-medium">Ξεκινήστε δωρεάν και αναβάθμίστε όποτε οι ανάγκες σας μεγαλώσουν</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto items-stretch px-4">
            <PricingCard 
                title="Free"
                price="0€"
                features={["Έως 10 διαμερίσματα", "Βασικός υπολογισμός", "Εξαγωγή PDF", "Email ειδοποιήσεις", "Στατιστικά"]}
                ctaText="Ξεκινήστε Δωρεάν"
                onStart={onStart}
            />
            <PricingCard 
                title="Smart"
                price="9,99€"
                highlighted
                features={["Απεριόριστα διαμερίσματα", "Πλήρης υπολογισμός", "Εξαγωγή PDF", "Email ειδοποιήσεις", "Αναλυτικά στατιστικά", "Προτεραιότητα υποστήριξης"]}
                ctaText="Ξεκινήστε Δωρεάν"
                onStart={onStart}
            />
             <PricingCard 
                title="Pro"
                price="Custom"
                features={["Πλήρης οικονομική διαχείριση", "SMS/Viber alerts", "Προσωπική υποστήριξη", "API πρόσβαση", "Custom Branding", "Ειδικές Αναφορές"]}
                ctaText="Επικοινωνήστε"
                onStart={onStart}
            />
          </div>
          <p className="text-center mt-12 text-slate-400 font-bold text-sm tracking-wide italic">
            30 ΗΜΕΡΕΣ ΔΩΡΕΑΝ ΔΟΚΙΜΗ ΣΕ ΟΛΑ ΤΑ ΠΑΚΕΤΑ
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
         <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-600/20 blur-[100px] rounded-full -mr-48 -mt-48" />
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 relative z-10 leading-tight">
               Έτοιμοι να απλοποιήσετε <br className="hidden md:block" /> τη διαχείριση κοινοχρήστων;
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto relative z-10 font-medium italic">
               Ξεκινήστε δωρεάν και δημιουργήστε τον πρώτο σας λογαριασμό κοινοχρήστων μέσα σε 2 λεπτά.
            </p>
            <button 
              onClick={onStart}
              className="px-10 py-5 bg-sky-600 text-white rounded-full font-black text-xl hover:scale-105 hover:bg-sky-500 transition-all shadow-xl relative z-10 cursor-pointer"
            >
               Ξεκινήστε Τώρα - Δωρεάν
            </button>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-slate-900 text-xl font-black mb-6">
              <Building2 className="text-sky-600 w-8 h-8" />
              <span>iKoinoxrista<span className="text-slate-400">.gr</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-slate-500 font-medium">
              Η ολοκληρωμένη λύση για τη διαχείριση κοινοχρήστων πολυκατοικιών στην Ελλάδα.
            </p>
          </div>
          <div>
            <h4 className="text-slate-900 font-black mb-6 text-xs uppercase tracking-widest">Προϊόν</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li><a href="#features" className="hover:text-sky-600 transition-colors">Λειτουργίες</a></li>
              <li><a href="#pricing" className="hover:text-sky-600 transition-colors">Πακέτα</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Demo</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 font-black mb-6 text-xs uppercase tracking-widest">Υποστήριξη</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li><a href="#" className="hover:text-sky-600 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Επικοινωνία</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Οδηγίες</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 font-black mb-6 text-xs uppercase tracking-widest">Νομικά</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li><a href="#" className="hover:text-sky-600 transition-colors">Όροι Χρήσης</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Πολιτική Απορρήτου</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <div>© 2025 iKoinoxrista.gr. Όλα τα δικαιώματα κατοχυρωμένα.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-sky-600 transition-colors">Facebook</a>
            <a href="#" className="hover:text-sky-600 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
