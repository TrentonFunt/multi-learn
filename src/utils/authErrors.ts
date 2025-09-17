// Helper function to get user-friendly error messages
export const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'Invalid email or password.';
    case 'auth/wrong-password':
      return 'Invalid email or password.';
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/invalid-login-credentials':
      return 'Invalid email or password.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled.';
    case 'auth/requires-recent-login':
      return 'Please sign in again to complete this action.';
    case 'auth/email-already-exists':
      return 'An account with this email already exists.';
    case 'auth/phone-number-already-exists':
      return 'An account with this phone number already exists.';
    case 'auth/credential-already-in-use':
      return 'This credential is already associated with another account.';
    case 'auth/invalid-verification-code':
      return 'Invalid verification code.';
    case 'auth/invalid-verification-id':
      return 'Invalid verification ID.';
    case 'auth/missing-email':
      return 'Email address is required.';
    case 'auth/missing-password':
      return 'Password is required.';
    case 'auth/quota-exceeded':
      return 'Service temporarily unavailable. Please try again later.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};
