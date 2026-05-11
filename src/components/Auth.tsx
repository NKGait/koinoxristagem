import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, Building2, X } from 'lucide-react';

interface AuthProps {
  onClose: () => void;
}

export default function Auth({ onClose }: AuthProps) {
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-slate-100"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 lg:p-12">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm shadow-sky-100 italic">
              <Building2 className="text-sky-600 w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Καλώς Ήλθατε</h2>
            <p className="text-slate-500 font-medium leading-relaxed text-sm">
              Συνδεθείτε για να διαχειριστείτε την πολυκατοικία σας και να εκδώσετε τα κοινόχρηστα του μήνα.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-4 py-4 px-6 border border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-sky-200 transition-all group shadow-sm cursor-pointer"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Σύνδεση με Google
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em] text-slate-300 bg-white px-4">
                SECURE AUTH
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-widest leading-loose bg-emerald-50 py-2 rounded-xl text-emerald-600 px-4">
              ✨ Η υπηρεσία είναι ΔΩΡΕΑΝ για περιορισμένο χρόνο
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
          <p className="text-[10px] text-slate-400 leading-relaxed font-bold uppercase tracking-wider">
            Συμφωνείτε με τους <span className="text-sky-600 underline cursor-pointer">Όρους Χρήσης</span> και την <span className="text-sky-600 underline cursor-pointer">Πολιτική Απορρήτου</span>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
