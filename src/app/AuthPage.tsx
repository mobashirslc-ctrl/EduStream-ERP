import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Building2, User, Mail, Phone, Lock, CheckCircle2, ArrowLeft, X, MapPin } from 'lucide-react';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const selectedPackage = searchParams.get('package') || 'Professional';

  useEffect(() => {
    if (searchParams.get('package')) setIsSignUp(true);
  }, [searchParams]);

  // আপনার ল্যান্ডিং পেজের মেইন রেড কালার
  const brandColor = "#e11d48"; 

  const inputStyle = "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none transition-all text-sm focus:border-[#e11d48]";
  const iconStyle = "absolute left-3 top-3.5 h-4 w-4 text-gray-400";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-6 font-sans">
      
      {/* Home Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-[#e11d48] transition-colors font-medium text-sm"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </button>

      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header - সরাসরি কালার কোড বসিয়ে দেওয়া হয়েছে */}
        <div style={{ backgroundColor: brandColor }} className="p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {isSignUp ? `Register for ${selectedPackage} Plan` : 'Partner Login'}
          </h2>
          <p className="text-rose-100 text-sm mt-2 opacity-90">
            Professional B2B Study Abroad Processing Hub
          </p>
        </div>

        <div className="p-8 md:p-10">
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
                  <MapPin className={iconStyle} />
                  <input type="text" placeholder="Office Address" className={inputStyle} required />
                </div>
                <div className="relative md:col-span-2">
                  <div className="w-full px-3 py-2 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-[11px]">
                    <label className="block mb-1 font-semibold text-gray-700">Upload NID (PDF/IMG)</label>
                    <input type="file" className="w-full cursor-pointer file:bg-rose-50 file:text-[#e11d48] file:border-0 file:rounded-md file:text-[10px] file:font-bold" />
                  </div>
                </div>
              </div>
            )}

            <div className="relative">
              <Mail className={iconStyle} />
              <input type="email" placeholder="Business Email" className={inputStyle} required />
            </div>

            <div className="relative">
              <Lock className={iconStyle} />
              <input type="password" placeholder="Password" className={inputStyle} required />
            </div>

            {isSignUp && (
              <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 flex items-start gap-3">
                <input type="checkbox" className="mt-1 accent-[#e11d48]" required id="policy" />
                <label htmlFor="policy" className="text-[12px] text-gray-700 leading-snug">
                  I agree to the <button onClick={() => setShowPolicy(true)} style={{ color: brandColor }} className="font-bold hover:underline">Privacy & Service Policy</button>.
                </label>
              </div>
            )}

            {/* Button - সরাসরি ব্র্যান্ড কালার */}
            <button 
              style={{ backgroundColor: brandColor }}
              className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition-all text-sm uppercase tracking-wider"
            >
              {isSignUp ? 'Apply for Partnership' : 'Login to Portal'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              style={{ color: '#666' }}
              className="text-sm font-semibold hover:text-[#e11d48] transition-colors"
            >
              {isSignUp ? "Already a partner? Login here" : "New agency? Become a partner"}
            </button>
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      {showPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800">Privacy & Service Policy</h3>
              <button onClick={() => setShowPolicy(false)} className="p-2 hover:bg-gray-200 rounded-full"><X className="h-5 w-5 text-gray-500" /></button>
            </div>
            <div className="p-6 overflow-y-auto text-sm text-gray-600 space-y-4">
              <p><strong>1. Admin Approval:</strong> All accounts undergo manual verification. Fake profiles will be rejected.</p>
              <p><strong>2. Subscription:</strong> Access is based on recurring payment. Failure results in deactivation within 48 hours.</p>
              <p><strong>3. Data Privacy:</strong> Student data is stored securely and only used for processing purposes.</p>
            </div>
            <div className="p-4 border-t border-gray-100 text-center">
              <button style={{ backgroundColor: brandColor }} onClick={() => setShowPolicy(false)} className="text-white px-8 py-2 rounded-lg font-bold text-sm">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;