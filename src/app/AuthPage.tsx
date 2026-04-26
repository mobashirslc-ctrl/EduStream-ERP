import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false);
  const selectedPackage = searchParams.get('package');

  // Form states
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
    if (selectedPackage) {
      setIsSignUp(true);
    }
  }, [selectedPackage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp && !formData.agreedToPolicy) {
      alert("Please agree to our Privacy Policy");
      return;
    }
    console.log("Form Submitted:", formData);
    // এখানে ফায়ারবেস বা এপিআই কল হবে
  };

  return (
    <div className="auth-container" style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>
        {isSignUp ? `Register for ${selectedPackage} Plan` : 'Login to Account'}
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {isSignUp && (
          <>
            <input type="text" placeholder="Company Name" required 
              onChange={(e) => setFormData({...formData, companyName: e.target.value})} />
            
            <input type="text" placeholder="Authorized Person Name" required 
              onChange={(e) => setFormData({...formData, authPersonName: e.target.value})} />
            
            <input type="tel" placeholder="Contact Number" required 
              onChange={(e) => setFormData({...formData, contactNo: e.target.value})} />
            
            <div style={{ fontSize: '12px' }}>
              <label>Upload NID (Image/PDF):</label>
              <input type="file" accept="image/*,application/pdf" required 
                onChange={(e) => setFormData({...formData, nidFile: e.target.files ? e.target.files[0] : null})} />
            </div>
          </>
        )}
        
        <input type="email" placeholder="Email Address" required 
          onChange={(e) => setFormData({...formData, email: e.target.value})} />
        
        <input type="password" placeholder="Create Password" required 
          onChange={(e) => setFormData({...formData, password: e.target.value})} />

        {isSignUp && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '12px' }}>
            <input type="checkbox" required 
              onChange={(e) => setFormData({...formData, agreedToPolicy: e.target.checked})} />
            <span>
              I agree to the <a href="#privacy" onClick={(e) => {e.preventDefault(); alert("Privacy Policy Details shown below");}}>Privacy & Policy</a>. 
              I understand that my account status depends on admin approval and subscription payment.
            </span>
          </div>
        )}

        <button type="submit" style={{ padding: '10px', backgroundColor: '#e11d48', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {isSignUp ? 'Apply for Registration' : 'Login Now'}
        </button>
      </form>

      <p onClick={() => setIsSignUp(!isSignUp)} style={{ textAlign: 'center', cursor: 'pointer', marginTop: '15px', color: '#666' }}>
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Register"}
      </p>

      {/* Privacy Policy Section */}
      {isSignUp && (
        <div id="privacy" style={{ marginTop: '30px', fontSize: '11px', color: '#777', borderTop: '1px solid #eee', paddingTop: '10px' }}>
          <h3>Privacy & Terms of Service</h3>
          <p>1. <strong>Service:</strong> We provide a B2B SaaS platform for study abroad processing. As a partner, you will receive service based on your selected package.</p>
          <p>2. <strong>Account Approval:</strong> Registration does not guarantee access. Every account must be manually verified and approved by our admin team.</p>
          <p>3. <strong>Subscription & Payment:</strong> Services are subscription-based. Failure to complete recurring payments will result in automatic account deactivation and loss of portal access.</p>
          <p>4. <strong>Data Privacy:</strong> Your company and student data are securely stored and will only be used for academic processing purposes.</p>
        </div>
      )}
    </div>
  );
};

export default AuthPage;