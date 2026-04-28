import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Building2, User, Mail, Phone, Lock, ArrowLeft, X, MapPin, Loader2, Upload } from 'lucide-react';

// Firebase imports
import { auth, db } from '../lib/firebase'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectedPackage = searchParams.get('package') || 'Professional';

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [authPerson, setAuthPerson] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [nidFile, setNidFile] = useState<File | null>(null);

  useEffect(() => {
    if (searchParams.get('package')) setIsSignUp(true);
  }, [searchParams]);

  // প্রফেশনাল গ্রিন ব্র্যান্ডিং
  const brandColor = "#10b981"; 

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // --- ১. ফাইল ভ্যালিডেশন ---
        if (nidFile && nidFile.size > 2 * 1024 * 1024) {
          throw new Error("File size too large! Please upload under 2MB.");
        }

        // --- ২. Cloudinary Upload ---
        let nidUrl = "";
        if (nidFile) {
          const formData = new FormData();
          formData.append("file", nidFile);
          formData.append("upload_preset", "gorun_ltd");

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/ddziennkh/image/upload`,
            { method: "POST", body: formData }
          );

          if (!response.ok) throw new Error("Document upload failed.");
          const data = await response.json();
          nidUrl = data.secure_url; 
        }

 // --- ৩. Firebase Registration ---
const userCredential = await createUserWithEmailAndPassword(auth, email, password);
const user = userCredential.user;

// URL থেকে প্যারামিটারগুলো ধরুন (একবার ডিক্লেয়ার করুন)
const packageParam = searchParams.get('package') || 'Starter';
const typeFromUrl = searchParams.get('type'); // নাম বদলে দিলাম কনফিউশন এড়াতে

// ২. টাইপ নির্ধারণ লজিক
let planType = 'monthly'; // Default

if (typeFromUrl) {
  planType = typeFromUrl.toLowerCase();
} else if (packageParam.toLowerCase() === 'starter') {
  planType = 'trial'; 
}

// ৩. Firestore-এ ডেটা সেভ করা
await setDoc(doc(db, "users", user.uid), {
  uid: user.uid,
  companyName,
  authPersonName: authPerson,
  contactNo,
  address,
  email,
  package: packageParam.toLowerCase(), 
  planType: planType, 
  status: "pending", 
  role: "partner",
  createdAt: serverTimestamp(), // এটি ব্যবহার করায় টাইমার এখন ১০০% নির্ভুল হবে
  nidUrl: nidUrl,
});
  // এটি সরাসরি Firestore-এর সার্ভার টাইম ব্যবহার করবে (ইমপোর্ট করা থাকলে)
  // যদি serverTimestamp ইমপোর্ট করা না থাকে তবে new Date() ই রাখুন
  createdAt: new Date(), 
  
  nidUrl: nidUrl,
});
        alert("Registration Successful! Admin will review your application soon.");
        await signOut(auth); 
        setIsSignUp(false);
        resetForm();
      } else {
        // --- ৪. Login Logic ---
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.status === "approved") {
            navigate('/dashboard');
          } else {
            alert("Your account is pending approval. Please contact support.");
            await signOut(auth);
          }
        } else {
          throw new Error("No partner record found.");
        }
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail(''); setPassword(''); setCompanyName(''); setAuthPerson('');
    setContactNo(''); setAddress(''); setNidFile(null);
  };

  const inputStyle = `w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none transition-all text-sm focus:border-[#10b981]`;
  const iconStyle = "absolute left-3 top-3.5 h-4 w-4 text-gray-400";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-6 font-sans">
      
      <button onClick={() => navigate('/')} className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-[#10b981] transition-colors font-medium text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </button>

      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        <div style={{ backgroundColor: brandColor }} className="p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {isSignUp ? `Register for ${selectedPackage}` : 'Partner Login'}
          </h2>
          <p className="text-emerald-50 text-sm mt-2 opacity-90">Secure B2B Processing Portal</p>
        </div>

        <div className="p-8 md:p-10">
          <form onSubmit={handleAuth} className="space-y-4">
            
            {isSignUp && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Building2 className={iconStyle} />
                  <input type="text" placeholder="Agency Name" className={inputStyle} value={companyName} onChange={(e)=>setCompanyName(e.target.value)} required />
                </div>
                <div className="relative">
                  <User className={iconStyle} />
                  <input type="text" placeholder="CEO / Authorized Person" className={inputStyle} value={authPerson} onChange={(e)=>setAuthPerson(e.target.value)} required />
                </div>
                <div className="relative">
                  <Phone className={iconStyle} />
                  <input type="tel" placeholder="Official Contact No" className={inputStyle} value={contactNo} onChange={(e)=>setContactNo(e.target.value)} required />
                </div>
                <div className="relative">
                  <MapPin className={iconStyle} />
                  <input type="text" placeholder="Office Location" className={inputStyle} value={address} onChange={(e)=>setAddress(e.target.value)} required />
                </div>
                <div className="relative md:col-span-2">
                  <div className="w-full px-4 py-3 bg-emerald-50/50 border-2 border-dashed border-emerald-200 rounded-xl text-center">
                    <label className="cursor-pointer flex flex-col items-center gap-1">
                      <Upload className="h-5 w-5 text-emerald-500" />
                      <span className="text-xs font-semibold text-emerald-700">
                        {nidFile ? nidFile.name : "Upload Agency Trade License / NID"}
                      </span>
                      <input type="file" onChange={(e) => setNidFile(e.target.files ? e.target.files[0] : null)} className="hidden" required={isSignUp} />
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="relative">
              <Mail className={iconStyle} />
              <input type="email" placeholder="Business Email" className={inputStyle} value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>

            <div className="relative">
              <Lock className={iconStyle} />
              <input type="password" placeholder="Secure Password" className={inputStyle} value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>

            {isSignUp && (
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex items-start gap-3">
                <input type="checkbox" className="mt-1 accent-[#10b981]" required id="policy" />
                <label htmlFor="policy" className="text-[12px] text-gray-700 leading-snug">
                  I agree to the <button type="button" onClick={() => setShowPolicy(true)} className="text-emerald-600 font-bold hover:underline">Partner Terms & Data Policy</button>.
                </label>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              style={{ backgroundColor: brandColor }}
              className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition-all text-sm uppercase tracking-wider flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (isSignUp ? 'Submit Partnership Request' : 'Login to Dashboard')}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-sm font-semibold text-gray-500 hover:text-emerald-600 transition-colors">
              {isSignUp ? "Already a partner? Sign In" : "New agency? Become a processing partner"}
            </button>
          </div>
        </div>
      </div>

      {/* --- মিসিং পলিসি মোডাল (Missing Policy Modal) --- */}
      {showPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800">Privacy & Service Policy</h3>
              <button onClick={() => setShowPolicy(false)} className="p-2 hover:bg-gray-200 rounded-full">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 text-sm text-gray-600 space-y-3">
              <p>• Admin approval is required for all partner accounts.</p>
              <p>• Document authenticity is the responsibility of the partner agency.</p>
              <p>• All data is securely handled for academic processing purposes only.</p>
            </div>
            <div className="p-4 border-t border-gray-100 text-center">
              <button 
                onClick={() => setShowPolicy(false)} 
                style={{ backgroundColor: brandColor }}
                className="text-white px-8 py-2 rounded-lg font-bold text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;