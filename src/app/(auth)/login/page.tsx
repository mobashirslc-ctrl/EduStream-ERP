import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false); // Default লগইন
  const selectedPackage = searchParams.get('package');

  useEffect(() => {
    // যদি URL-এ প্যাকেজ থাকে (যেমন ?package=Free), তবে অটোমেটিক রেজিস্ট্রেশন মোড অন হবে
    if (selectedPackage) {
      setIsSignUp(true);
    }
  }, [selectedPackage]);

  return (
    <div className="auth-container">
      <h2>{isSignUp ? `Register for ${selectedPackage} Plan` : 'Login to Account'}</h2>
      
      <form>
        {/* যদি ইজ সাইন আপ ট্রু হয়, তবে নাম বা অতিরিক্ত ইনপুট দেখাবে */}
        {isSignUp && (
          <input type="text" placeholder="Full Name" className="input-field" />
        )}
        
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />

        <button type="submit">
          {isSignUp ? 'Start My Free Trial' : 'Login Now'}
        </button>
      </form>

      <p onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Register"}
      </p>
    </div>
  );
};