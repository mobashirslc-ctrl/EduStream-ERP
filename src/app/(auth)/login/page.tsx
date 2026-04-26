import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false);
  const selectedPackage = searchParams.get('package');

  useEffect(() => {
    if (selectedPackage) {
      setIsSignUp(true);
    }
  }, [selectedPackage]);

  return (
    <div className="auth-container">
      <h2>{isSignUp ? `Register for ${selectedPackage} Plan` : 'Login to Account'}</h2>
      
      <form>
        {isSignUp && (
          <input type="text" placeholder="Full Name" className="input-field" />
        )}
        
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />

        <button type="submit">
          {isSignUp ? 'Start My Free Trial' : 'Login Now'}
        </button>
      </form>

      <p onClick={() => setIsSignUp(!isSignUp)} style={{cursor: 'pointer'}}>
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Register"}
      </p>
    </div>
  );
};

// এই লাইনটি না দিলে এরর আসবেই
export default AuthPage;