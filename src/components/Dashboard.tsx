import { useState, useEffect } from 'react';
import { User as FirebaseUser, signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Building, Apartment, Expense, Calculation, ExpenseCategory } from '../types';
import { 
  Building2, 
  User as UserIcon,
  Plus, 
  Home, 
  LogOut, 
  Trash2, 
  Settings, 
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  Users,
  Calculator,
  History,
  FileText,
  AlertCircle,
  Save,
  Download,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { el } from 'date-fns/locale';
import { generateBillPDF } from '../lib/pdfGenerator';


export default function Dashboard({ user }: { user: FirebaseUser }) {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [activeTab, setActiveTab] = useState<'apartments' | 'expenses' | 'calculate' | 'history'>('apartments');
  const [loading, setLoading] = useState(true);

  // Fetch buildings
  useEffect(() => {
    const q = query(collection(db, 'buildings'), where('ownerId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Building));
      setBuildings(bList);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'buildings');
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user.uid]);

  const handleAddBuilding = async () => {
    const name = prompt('Όνομα Πολυκατοικίας:');
    const address = prompt('Διεύθυνση:');
    if (!name || !address) return;

    try {
      await addDoc(collection(db, 'buildings'), {
        name,
        address,
        ownerId: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignOut = () => signOut(auth);

  if (!selectedBuilding) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
        <aside className="w-full md:w-72 bg-white border-r border-slate-100 flex flex-col p-8 lg:fixed h-full z-20">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-100">
              <Building2 className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">iKoinoxrista<span className="text-slate-300">.gr</span></span>
          </div>
          
          <nav className="flex-grow space-y-3">
            <button className="w-full flex items-center gap-3 px-6 py-4 bg-sky-50 text-sky-600 rounded-2xl font-bold shadow-sm shadow-sky-50 transition-all">
              <LayoutDashboard size={20} />
              Πολυκατοικίες
            </button>
          </nav>

          <div className="pt-8 border-t border-slate-100 mt-auto">
             <div className="flex items-center gap-4 mb-8 px-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                   <UserIcon size={24} />
                </div>
                <div className="flex-grow overflow-hidden">
                   <div className="text-sm font-black text-slate-900 truncate tracking-tight">{user.displayName || 'Διαχειριστής'}</div>
                   <div className="text-[10px] text-slate-400 truncate uppercase font-bold tracking-widest">{user.email}</div>
                </div>
             </div>
             <button 
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-6 py-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl font-bold transition-all group cursor-pointer"
            >
               <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
               Αποσύνδεση
             </button>
          </div>
        </aside>

        <main className="flex-grow md:ml-72 p-8 lg:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Οι Πολυκατοικίες μου</h1>
                <p className="text-slate-400 font-medium tracking-tight">Διαχειριστείτε όλες τις οικοδομές σας από ένα κεντρικό σημείο.</p>
              </div>
              <button 
                onClick={handleAddBuilding}
                className="flex items-center gap-3 bg-sky-600 text-white px-8 py-4 rounded-full font-bold hover:bg-sky-700 transition-all shadow-xl shadow-sky-100 cursor-pointer"
              >
                <Plus size={22} strokeWidth={3} />
                Νέα Πολυκατοικία
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                {[1,2,3].map(i => <div key={i} className="h-64 bg-slate-200 rounded-[2.5rem]" />)}
              </div>
            ) : buildings.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3.5rem] p-24 text-center shadow-sm">
                <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-slate-300 border border-slate-100">
                  <Building2 size={48} />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">Δεν βρέθηκαν πολυκατοικίες</h3>
                <p className="text-slate-400 mb-12 max-w-sm mx-auto font-medium leading-relaxed italic">
                  Ξεκινήστε προσθέτοντας την πρώτη σας πολυκατοικία για να οργανώσετε τα διαμερίσματα και τις δαπάνες σας.
                </p>
                <button 
                  onClick={handleAddBuilding}
                  className="bg-sky-600 text-white px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl shadow-sky-100 cursor-pointer"
                >
                  Δημιουργία Πρώτης Πολυκατοικίας
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {buildings.map((b) => (
                  <motion.div 
                    layoutId={b.id}
                    key={b.id}
                    onClick={() => setSelectedBuilding(b)}
                    className="group bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 hover:border-sky-100 transition-all cursor-pointer relative overflow-hidden flex flex-col h-full"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-sky-100 transition-colors duration-500" />
                    
                    <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mb-8 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Building2 className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-2xl font-black text-slate-900 mb-3 truncate tracking-tight">{b.name}</h3>
                    <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed line-clamp-2 italic">{b.address}</p>
                    
                    <div className="mt-auto flex items-center justify-between pt-8 border-t border-slate-50 gap-4">
                      <div className="flex items-center gap-2 text-sky-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                        Select Building <ChevronRight size={16} />
                      </div>
                      <div className="p-3 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer" onClick={(e) => {
                        e.stopPropagation();
                        if(confirm('Σίγουρα θέλετε να διαγράψετε αυτή την πολυκατοικία;')) {
                          deleteDoc(doc(db, 'buildings', b.id));
                        }
                      }}>
                        <Trash2 size={20} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <BuildingDetail 
      building={selectedBuilding} 
      onBack={() => setSelectedBuilding(null)} 
      user={user}
    />
  );
}

function BuildingDetail({ building, onBack, user }: { building: Building, onBack: () => void, user: FirebaseUser }) {
  const [activeTab, setActiveTab] = useState<'apartments' | 'expenses' | 'calculate' | 'history'>('apartments');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-80 bg-white border-r border-slate-100 flex flex-col p-10 lg:fixed h-full z-20 shadow-sm shadow-slate-200/50">
        <button onClick={onBack} className="flex items-center gap-3 text-slate-400 hover:text-slate-900 mb-12 font-black uppercase tracking-[0.2em] text-[10px] transition-all group cursor-pointer w-fit">
          <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={14} strokeWidth={3} />
          Πίσω στις Πολυκατοικίες
        </button>

        <div className="mb-14">
           <div className="w-16 h-16 bg-sky-600 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-xl shadow-sky-100">
              <Building2 className="text-white w-8 h-8" />
           </div>
           <h2 className="text-3xl font-black text-slate-900 truncate leading-tight tracking-tight">{building.name}</h2>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 truncate flex items-center gap-2">
             <Home size={12} className="text-slate-300" />
             {building.address}
           </p>
        </div>

        <nav className="space-y-4 flex-grow">
          <NavBtn active={activeTab === 'apartments'} onClick={() => setActiveTab('apartments')} icon={Users} label="Διαμερίσματα" />
          <NavBtn active={activeTab === 'expenses'} onClick={() => setActiveTab('expenses')} icon={TrendingUp} label="Δαπάνες" />
          <NavBtn active={activeTab === 'calculate'} onClick={() => setActiveTab('calculate')} icon={Calculator} label="Υπολογισμός" />
          <NavBtn active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon={History} label="Ιστορικό" />
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-100">
           <div className="flex items-center gap-4 px-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black border border-slate-200">
                 {user.displayName?.[0] || 'U'}
              </div>
              <div className="flex-grow overflow-hidden">
                 <div className="text-xs font-black text-slate-900 truncate tracking-tight">{user.displayName || 'Account'}</div>
                 <div className="text-[10px] text-slate-400 font-bold truncate">{user.email}</div>
              </div>
           </div>
        </div>
      </aside>

      <main className="flex-grow md:ml-80 p-8 lg:p-14">
         <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'apartments' && <ApartmentManager buildingId={building.id} />}
              {activeTab === 'expenses' && <ExpenseManager buildingId={building.id} />}
              {activeTab === 'calculate' && <CalculationEngine buildingId={building.id} building={building} />}
              {activeTab === 'history' && <HistoryViewer buildingId={building.id} />}
            </AnimatePresence>
         </div>
      </main>
    </div>
  );
}

const NavBtn = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-5 px-8 py-5 rounded-[2rem] font-black text-sm tracking-tight transition-all cursor-pointer ${
      active 
        ? 'bg-sky-600 text-white shadow-2xl shadow-sky-200 scale-[1.03] ring-4 ring-sky-50' 
        : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
    }`}
  >
    <Icon size={22} strokeWidth={active ? 3 : 2} />
    {label}
  </button>
);

// --- Apartment Manager ---
function ApartmentManager({ buildingId }: { buildingId: string }) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'buildings', buildingId, 'apartments'));
    return onSnapshot(q, (s) => {
      setApartments(s.docs.map(doc => ({ id: doc.id, ...doc.data() } as Apartment)).sort((a,b) => a.number.localeCompare(b.number)));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `buildings/${buildingId}/apartments`);
    });
  }, [buildingId]);

  const addApartment = async () => {
    const number = prompt('Αριθμός/Όνομα Διαμερίσματος (π.χ. Α1):');
    if (!number) return;
    try {
      await addDoc(collection(db, 'buildings', buildingId, 'apartments'), {
        buildingId,
        number,
        ownerName: '',
        tenantName: '',
        sharesCommon: 0,
        sharesHeating: 0,
        sharesElevator: 0,
        sharesSpecial: 0
      });
    } catch(e) { console.error(e); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
         <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Διαμερίσματα</h2>
            <p className="text-slate-400 font-medium tracking-tight">Ορίστε τα χιλιοστά συμμετοχής για κάθε διαμέρισμα.</p>
         </div>
         <button onClick={addApartment} className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-slate-200 cursor-pointer">
            <Plus size={20} strokeWidth={3} /> Προσθήκη
         </button>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm overflow-hidden border border-slate-100 shadow-slate-200/50">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 uppercase text-[10px] font-black tracking-[0.2em] text-slate-400">
                     <th className="px-10 py-6">Αρ.</th>
                     <th className="px-10 py-6">Ιδιοκτήτης/Ένοικος</th>
                     <th className="px-10 py-6">Κοινόχρ.</th>
                     <th className="px-10 py-6">Θέρμανσ.</th>
                     <th className="px-10 py-6">Ανελκ.</th>
                     <th className="px-10 py-6">Ειδικά</th>
                     <th className="px-10 py-6 text-right">Ενέργειες</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {apartments.map((apt: Apartment) => (
                    <AptRow key={apt.id} apt={apt} buildingId={buildingId} />
                  ))}
               </tbody>
            </table>
         </div>
         {apartments.length === 0 && !loading && (
           <div className="p-24 text-center text-slate-300 font-bold italic tracking-tight">Κανένα διαμέρισμα ακόμα.</div>
         )}
      </div>
    </motion.div>
  );
}

const AptRow = ({ apt, buildingId }: any) => {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(apt);

  const save = async () => {
    try {
      await updateDoc(doc(db, 'buildings', buildingId, 'apartments', apt.id), {
        ownerName: data.ownerName,
        tenantName: data.tenantName,
        sharesCommon: Number(data.sharesCommon),
        sharesHeating: Number(data.sharesHeating),
        sharesElevator: Number(data.sharesElevator),
        sharesSpecial: Number(data.sharesSpecial)
      });
      setEditing(false);
    } catch(e) { console.error(e); }
  };

  if (editing) {
    return (
       <tr className="bg-sky-50/30">
          <td className="px-10 py-6 font-black text-sky-600">{apt.number}</td>
          <td className="px-10 py-6">
             <input value={data.ownerName} onChange={e => setData({...data, ownerName: e.target.value})} className="w-full border-b-2 border-sky-100 bg-transparent focus:outline-none focus:border-sky-500 font-bold text-sm transition-all mb-2" placeholder="Ιδιοκτήτης" />
             <input value={data.tenantName} onChange={e => setData({...data, tenantName: e.target.value})} className="w-full border-b-2 border-sky-100 bg-transparent focus:outline-none focus:border-sky-500 font-bold text-sm transition-all" placeholder="Ένοικος" />
          </td>
          <td className="px-10 py-6">
             <input type="number" value={data.sharesCommon} onChange={e => setData({...data, sharesCommon: Number(e.target.value)})} className="w-16 border-b-2 border-sky-100 bg-transparent focus:outline-none focus:border-sky-500 font-mono font-bold text-sm transition-all" />
          </td>
          <td className="px-10 py-6">
             <input type="number" value={data.sharesHeating} onChange={e => setData({...data, sharesHeating: Number(e.target.value)})} className="w-16 border-b-2 border-sky-100 bg-transparent focus:outline-none focus:border-sky-500 font-mono font-bold text-sm transition-all" />
          </td>
          <td className="px-10 py-6">
             <input type="number" value={data.sharesElevator} onChange={e => setData({...data, sharesElevator: Number(e.target.value)})} className="w-16 border-b-2 border-sky-100 bg-transparent focus:outline-none focus:border-sky-500 font-mono font-bold text-sm transition-all" />
          </td>
          <td className="px-10 py-6">
             <input type="number" value={data.sharesSpecial} onChange={e => setData({...data, sharesSpecial: Number(e.target.value)})} className="w-16 border-b-2 border-sky-100 bg-transparent focus:outline-none focus:border-sky-500 font-mono font-bold text-sm transition-all" />
          </td>
          <td className="px-10 py-6 text-right space-x-2">
             <button onClick={save} className="text-emerald-600 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors cursor-pointer">Save</button>
             <button onClick={() => { setEditing(false); setData(apt); }} className="text-slate-400 font-black text-[10px] uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">Cancel</button>
          </td>
       </tr>
    );
  }

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
       <td className="px-10 py-8 font-black text-slate-900">{apt.number}</td>
       <td className="px-10 py-8">
          <div className="font-bold text-sm text-slate-600">{apt.ownerName || <span className="text-slate-300 italic font-medium opacity-50">Χωρίς Όνομα</span>}</div>
          {apt.tenantName && <div className="text-xs text-slate-400 mt-1">{apt.tenantName}</div>}
       </td>
       <td className="px-10 py-8 font-mono text-sm font-bold text-slate-500">{apt.sharesCommon}‰</td>
       <td className="px-10 py-8 font-mono text-sm font-bold text-slate-500">{apt.sharesHeating}‰</td>
       <td className="px-10 py-8 font-mono text-sm font-bold text-slate-500">{apt.sharesElevator}‰</td>
       <td className="px-10 py-8 font-mono text-sm font-bold text-slate-500">{apt.sharesSpecial}‰</td>
       <td className="px-10 py-8 text-right opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex justify-end gap-2 text-slate-300">
            <button onClick={() => setEditing(true)} className="p-3 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all cursor-pointer"><Settings size={18} /></button>
            <button onClick={() => deleteDoc(doc(db, 'buildings', buildingId, 'apartments', apt.id))} className="p-3 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"><Trash2 size={18} /></button>
          </div>
       </td>
    </tr>
  );
};

// --- Expense Manager ---
function ExpenseManager({ buildingId }: { buildingId: string }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const q = query(
      collection(db, 'buildings', buildingId, 'expenses'), 
      where('month', '==', currentMonth), 
      where('year', '==', currentYear)
    );
    return onSnapshot(q, (s) => {
      setExpenses(s.docs.map(doc => ({ id: doc.id, ...doc.data() } as Expense)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `buildings/${buildingId}/expenses`);
    });
  }, [buildingId, currentMonth, currentYear]);

  const addExpense = async () => {
    const desc = prompt('Περιγραφή Εξόδου:');
    const amountStr = prompt('Ποσό (€):');
    if (!desc || !amountStr) return;
    const cat = prompt('Κατηγορία (common, heating, elevator):', 'common') as ExpenseCategory;

    try {
      await addDoc(collection(db, 'buildings', buildingId, 'expenses'), {
        buildingId,
        month: currentMonth,
        year: currentYear,
        category: cat,
        description: desc,
        amount: Number(amountStr),
        date: new Date().toISOString().split('T')[0]
      });
    } catch(e) { console.error(e); }
  };

  return (
     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
           <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Δαπάνες Μήνα</h2>
              <div className="flex items-center gap-6 mt-3 bg-white px-4 py-2 rounded-2xl border border-slate-100 w-fit shadow-sm">
                 <select 
                    value={currentMonth} 
                    onChange={e => setCurrentMonth(Number(e.target.value))}
                    className="bg-transparent border-0 font-black text-sky-600 focus:ring-0 cursor-pointer text-sm uppercase tracking-widest"
                  >
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => <option key={m} value={m}>{format(new Date(2025, m-1), 'MMMM', { locale: el })}</option>)}
                 </select>
                 <div className="w-1 h-1 bg-slate-200 rounded-full" />
                 <select 
                    value={currentYear} 
                    onChange={e => setCurrentYear(Number(e.target.value))}
                    className="bg-transparent border-0 font-black text-sky-600 focus:ring-0 cursor-pointer text-sm tracking-widest"
                  >
                    {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
                 </select>
              </div>
           </div>
           <button onClick={addExpense} className="flex items-center gap-3 bg-sky-600 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-sky-100 cursor-pointer">
              <Plus size={20} strokeWidth={3} /> Προσθήκη Εξόδου
           </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {expenses.map(exp => (
             <motion.div 
               layout 
               key={exp.id} 
               className="group bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-2xl hover:shadow-slate-200 hover:border-sky-100 transition-all relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 group-hover:bg-sky-50 rounded-bl-full -mr-12 -mt-12 transition-colors" />
                
                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-8">
                      <div className="px-4 py-1.5 bg-slate-50 group-hover:bg-sky-100 group-hover:text-sky-700 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border border-slate-100 transition-all">{exp.category}</div>
                      <button onClick={() => deleteDoc(doc(db, 'buildings', buildingId, 'expenses', exp.id))} className="text-slate-200 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all cursor-pointer"><Trash2 size={18} /></button>
                   </div>
                   <h4 className="text-xl font-black text-slate-900 mb-2 leading-tight">{exp.description}</h4>
                   <p className="text-xs text-slate-400 italic mb-10 font-medium flex items-center gap-2">
                     <Clock size={12} />
                     {format(new Date(exp.date), 'dd MMM yyyy', { locale: el })}
                   </p>
                </div>
                <div className="text-4xl font-black text-sky-600 tracking-tighter relative z-10">{exp.amount.toFixed(2)} <span className="text-lg text-slate-300">€</span></div>
             </motion.div>
           ))}
           {expenses.length === 0 && (
              <div className="col-span-full py-32 bg-white border-2 border-dashed border-slate-100 text-center text-slate-300 font-bold rounded-[3.5rem] italic tracking-tight shadow-sm">
                 <AlertCircle size={48} className="mx-auto mb-6 opacity-20" />
                 Δεν υπάρχουν έξοδα για αυτόν τον μήνα.
              </div>
           )}
        </div>
     </motion.div>
  );
}

// --- Calculation Engine ---
function CalculationEngine({ buildingId, building }: { buildingId: string, building: Building }) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    // Basic fetch for preview
    getDocs(collection(db, 'buildings', buildingId, 'apartments')).then(s => setApartments(s.docs.map(d => ({id: d.id, ...d.data()}) as Apartment)));
    getDocs(query(collection(db, 'buildings', buildingId, 'expenses'), where('month', '==', currentMonth), where('year', '==', currentYear)))
      .then(s => setExpenses(s.docs.map(d => ({id: d.id, ...d.data()}) as Expense)));
  }, [buildingId, currentMonth, currentYear]);

  const calculate = () => {
    if (apartments.length === 0) return alert('Προσθέστε διαμερίσματα πρώτα!');
    
    // Simple math: Total Exp / 1000 * shares
    const totals = { common: 0, heating: 0, elevator: 0, special: 0, total: 0 };
    expenses.forEach(e => {
        if (e.category === 'common') totals.common += e.amount;
        if (e.category === 'heating') totals.heating += e.amount;
        if (e.category === 'elevator') totals.elevator += e.amount;
        if (e.category === 'special') totals.special += e.amount;
        if (e.category === 'other') totals.common += e.amount;
        totals.total += e.amount;
    });

    const res: any = {};
    apartments.forEach(apt => {
        const aptRes = {
            common: (totals.common / 1000) * apt.sharesCommon,
            heating: (totals.heating / 1000) * apt.sharesHeating,
            elevator: (totals.elevator / 1000) * apt.sharesElevator,
            special: (totals.special / 1000) * apt.sharesSpecial,
            total: 0
        };
        aptRes.total = aptRes.common + aptRes.heating + aptRes.elevator + aptRes.special;
        res[apt.id] = aptRes;
    });

    setResults({ apartments: res, totals });
  };

  const saveCalculation = async () => {
    if (!results) return;
    try {
      await addDoc(collection(db, 'buildings', buildingId, 'calculations'), {
        buildingId,
        month: currentMonth,
        year: currentYear,
        results: results.apartments,
        totals: results.totals,
        createdAt: new Date().toISOString()
      });
      alert('Η κατανομή αποθηκεύτηκε!');
    } catch(e) { console.error(e); }
  };

  const handleDownloadPDF = (aptId: string) => {
    const apt = apartments.find(a => a.id === aptId);
    if (!apt || !results) return;
    generateBillPDF(building, apt, results.apartments[aptId], currentMonth, currentYear);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Υπολογισμός Κατανομής</h2>
            <div className="flex gap-4 mt-2 font-bold text-sky-600 bg-sky-50 px-4 py-2 rounded-xl w-fit border border-sky-100 uppercase text-xs tracking-widest">
               {format(new Date(currentYear, currentMonth-1), 'MMMM yyyy', { locale: el })}
            </div>
          </div>
          <button 
            onClick={calculate}
            className="bg-slate-900 text-white px-10 py-5 rounded-full font-black shadow-xl shadow-slate-200 hover:scale-105 transition-all cursor-pointer flex items-center gap-3"
          >
            <Calculator size={22} strokeWidth={3} />
            Εκτέλεση Υπολογισμού
          </button>
       </div>

       {results ? (
         <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               <StatBox label="Σύνολο Δαπανών" val={results.totals.total} variant="sky" />
               <StatBox label="Κοινόχρηστα" val={results.totals.common} variant="slate" />
               <StatBox label="Θέρμανση" val={results.totals.heating} variant="emerald" />
               <StatBox label="Ανελκυστήρας" val={results.totals.elevator} variant="slate" />
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm shadow-slate-200/50 overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <h3 className="font-black text-xl tracking-tight text-slate-900">Ανάλυση ανά Διαμέρισμα</h3>
                    <button onClick={saveCalculation} className="flex items-center gap-3 bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-100 transition-all cursor-pointer border border-emerald-100">
                      <Save size={18} /> Αποθήκευση στο Ιστορικό
                    </button>
                </div>
                <div className="overflow-x-auto text-sm">
                   <table className="w-full border-collapse">
                      <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
                         <tr>
                            <th className="px-10 py-6 text-left">Διαμέρισμα</th>
                            <th className="px-10 py-6">Κοινόχρ.</th>
                            <th className="px-10 py-6">Θέρμανσ.</th>
                            <th className="px-10 py-6">Ανελκ.</th>
                            <th className="px-10 py-6">Ειδικά</th>
                            <th className="px-10 py-6 text-right">Σύνολο</th>
                            <th className="px-10 py-6 text-right">Bill</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 font-bold text-slate-700">
                         {apartments.map(apt => (
                            <tr key={apt.id} className="hover:bg-sky-50/30 transition-colors group">
                               <td className="px-10 py-6 flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-2xl bg-slate-50 group-hover:bg-sky-100 flex items-center justify-center text-xs font-black text-slate-400 group-hover:text-sky-600 transition-colors border border-slate-100 group-hover:border-sky-200">{apt.number}</div>
                                  <div className="truncate max-w-[150px]">{apt.ownerName || 'Unknown Owner'}</div>
                               </td>
                               <td className="px-10 py-6 font-mono text-slate-500">{results.apartments[apt.id].common.toFixed(2)} €</td>
                               <td className="px-10 py-6 font-mono text-slate-500">{results.apartments[apt.id].heating.toFixed(2)} €</td>
                               <td className="px-10 py-6 font-mono text-slate-500">{results.apartments[apt.id].elevator.toFixed(2)} €</td>
                               <td className="px-10 py-6 font-mono text-slate-500">{results.apartments[apt.id].special.toFixed(2)} €</td>
                               <td className="px-10 py-6 text-right font-black text-slate-900 tracking-tighter text-lg">{results.apartments[apt.id].total.toFixed(2)} <span className="text-xs text-slate-300">€</span></td>
                               <td className="px-10 py-6 text-right">
                                  <button 
                                    onClick={() => handleDownloadPDF(apt.id)}
                                    className="p-3 text-sky-600 hover:bg-sky-100 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-sky-200"
                                  >
                                    <Download size={20} />
                                  </button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
            </div>
         </div>
       ) : (
         <div className="p-32 bg-white rounded-[4rem] border-2 border-dashed border-slate-100 text-center shadow-sm shadow-slate-100/50">
            <div className="w-24 h-24 bg-sky-50 text-sky-200 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-sky-100 shadow-inner">
               <Calculator size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Έτοιμοι για υπολογισμό;</h3>
            <p className="text-slate-400 font-medium max-w-sm mx-auto leading-relaxed italic">
               Ελέγξτε αν έχετε καταχωρήσει όλα τα έξοδα και τα διαμερίσματα για τον τρέχοντα μήνα πριν την εκτέλεση.
            </p>
         </div>
       )}
    </motion.div>
  );
}

const StatBox = ({ label, val, variant = 'slate' }: any) => {
    const variants: any = {
        sky: 'text-sky-600 bg-white border-slate-100 ring-4 ring-sky-50',
        slate: 'text-slate-900 bg-white border-slate-100',
        emerald: 'text-emerald-700 bg-emerald-50 border-emerald-100',
        amber: 'text-amber-700 bg-amber-50 border-amber-100'
    };
    return (
        <div className={`p-10 rounded-[3rem] border ${variants[variant]} flex flex-col justify-between shadow-sm transition-all hover:shadow-lg h-full`}>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10">{label}</div>
            <div className="text-4xl font-black leading-none tracking-tighter">{val.toFixed(2)} <span className="text-base font-bold opacity-30 italic">€</span></div>
        </div>
    );
};

// --- History Viewer ---
function HistoryViewer({ buildingId }: { buildingId: string }) {
  const [history, setHistory] = useState<Calculation[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'buildings', buildingId, 'calculations'));
    return onSnapshot(q, (s) => {
        setHistory(s.docs.map(d => ({id: d.id, ...d.data()}) as Calculation).sort((a,b) => b.createdAt.localeCompare(a.createdAt)));
    }, (error) => {
        handleFirestoreError(error, OperationType.LIST, `buildings/${buildingId}/calculations`);
    });
  }, [buildingId]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
       <h2 className="text-4xl font-black text-slate-900 mb-12 tracking-tight">Ιστορικό Κατανομών</h2>
       {history.length === 0 ? (
         <div className="p-32 bg-white border-2 border-dashed border-slate-100 rounded-[4rem] text-center text-slate-300 font-bold italic tracking-tight shadow-sm">
            Δεν υπάρχουν αποθηκευμένες κατανομές ακόμα.
         </div>
       ) : (
         <div className="grid gap-8">
            {history.map(h => (
               <div key={h.id} className="group bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:shadow-2xl hover:shadow-slate-200 hover:border-sky-100 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 group-hover:bg-sky-50 rounded-bl-full -mr-16 -mt-16 transition-colors" />
                  
                  <div className="flex items-center gap-8 relative z-10">
                     <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm">
                        <FileText size={32} />
                     </div>
                     <div>
                        <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
                          {format(new Date(h.year, h.month-1), 'MMMM yyyy', { locale: el })}
                        </h4>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2 italic">
                          <History size={12} />
                          {format(new Date(h.createdAt), 'dd MMM yyyy, HH:mm', { locale: el })}
                        </p>
                     </div>
                  </div>
                  <div className="text-left md:text-right relative z-10 w-full md:w-auto mt-4 md:mt-0 border-t md:border-t-0 border-slate-50 pt-8 md:pt-0">
                     <div className="text-3xl font-black text-slate-900 mb-2 tracking-tighter">{h.totals.total.toFixed(2)} <span className="text-sm text-slate-300">€</span></div>
                     <button className="text-sky-600 font-black text-[10px] uppercase tracking-[0.2em] hover:text-sky-700 transition-colors cursor-pointer flex items-center gap-2 md:justify-end">
                       View Details <ArrowRight size={14} />
                     </button>
                  </div>
               </div>
            ))}
         </div>
       )}
    </motion.div>
  );
}
