import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Building2, User, Mail, Phone, Lock, FileText, CheckCircle2 } from 'lucide-react';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false);
  const selectedPackage = searchParams.get('package') || 'Professional';

  const [formData, setFormData] = useState({
    companyName: '',
    authPersonName: '',
    email: '',
    contactNo: '',
    password: '',
    nidFile: null as File | null,
    agreedToPolicy: false
  });

  useEffect(() => {
    if (searchParams.get('package')) setIsSignUp(true);
  }, [searchParams]);

  const inputStyle = "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-sm";
  const iconStyle = "absolute left-3 top-3.5 h-4 w-4 text-gray-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-rose-600 p-8 text-center text-white">
          <h2 className="text-2xl font-bold tracking-tight">
            {isSignUp ? `Register for ${selectedPackage} Plan` : 'Welcome Back'}
          </h2>
          <p className="text-rose-100 text-sm mt-2">
            {isSignUp ? 'Empower your agency with our B2B processing hub' : 'Login to manage your agency operations'}
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            
            {isSignUp && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Building2 className={iconStyle} />
                  <input type="text" placeholder="Company Name" className={inputStyle} required />
                </div>
                <div className="relative">
                  <User className={iconStyle} />
                  <input type="text" placeholder="Authorized Person" className={inputStyle} required />
                </div>
                <div className="relative">
                  <Phone className={iconStyle} />
                  <input type="tel" placeholder="Contact Number" className={inputStyle} required />
                </div>
                <div className="relative">
                  <div className="w-full px-4 py-2 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-xs text-gray-500">
                    <label className="block mb-1 font-semibold text-gray-700">Upload NID (PDF/IMG)</label>
                    <input type="file" className="w-full file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer" />
                  </div>
                </div>
              </div>
            )}

            <div className="relative">
              <Mail className={iconStyle} />
              <input type="email" placeholder="Business Email Address" className={inputStyle} required />
            </div>

            <div className="relative">
              <Lock className={iconStyle} />
              <input type="password" placeholder="Create Secure Password" className={inputStyle} required />
            </div>

            {isSignUp && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 rounded text-rose-600 focus:ring-rose-500" required id="policy" />
                  <label htmlFor="policy" className="text-[11px] text-gray-600 leading-relaxed">
                    I agree to the <span className="text-rose-600 font-semibold cursor-pointer underline">Privacy & Service Policy</span>. I understand that account status depends on <strong>Admin Approval</strong> and <strong>Subscription Payment</strong>.
                  </label>
                </div>
              </div>
            )}

            <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-rose-200 transition-all transform active:scale-[0.98]">
              {isSignUp ? 'Apply for Partnership' : 'Sign In'}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-gray-500 hover:text-rose-600 transition-colors"
            >
              {isSignUp ? "Already a partner? Login" : "New agency? Start your application"}
            </button>
          </div>

          {/* Mini Policy Doc for Professional Look */}
          {isSignUp && (
            <div className="mt-8 pt-6 border-t border-gray-100 text-[10px] text-gray-400 grid grid-cols-2 gap-4">
              <div className="flex gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                <p>Manual Admin Verification for security.</p>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                <p>Auto-deactivation on payment failure.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;