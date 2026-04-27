// EduStream Package Based Permissions Configuration

export type PackageTier = 'starter' | 'pro' | 'enterprise';

export const PACKAGE_PERMISSIONS: Record<PackageTier, string[]> = {
  starter: [
    'AI Assessment Hub',
    'Application Tracker',
    'Cloud Manager',
    'Mail Alerts'
  ],
  
  pro: [
    // Starter-এর সবকিছু + Pro-এর ফিচার
    'AI Assessment Hub',
    'Application Tracker',
    'Cloud Manager',
    'Mail Alerts',
    'Agent Network Hub',
    'Team Hub',
    'Compliance Hub',
    'Marketing Studio',
    'QR Tracking',
    'Smart Invoice'
  ],
  
  enterprise: [
    // Pro-এর সবকিছু + Enterprise-এর এক্সক্লুসিভ ফিচার
    'AI Assessment Hub',
    'Application Tracker',
    'Cloud Manager',
    'Mail Alerts',
    'Agent Network Hub',
    'Team Hub',
    'Compliance Hub',
    'Marketing Studio',
    'QR Tracking',
    'Smart Invoice',
    'Full White-label Branding',
    'Multi-branch System',
    'Custom Domain',
    'Dedicated Account Manager',
    'API Access'
  ]
};

// এই ফাংশনটি দিয়ে আমরা চেক করবো ইউজারের অ্যাক্সেস আছে কি না
export const hasAccess = (userPackage: PackageTier, featureName: string): boolean => {
  const allowedFeatures = PACKAGE_PERMISSIONS[userPackage];
  return allowedFeatures ? allowedFeatures.includes(featureName) : false;
};