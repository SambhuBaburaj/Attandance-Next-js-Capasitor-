import React, { useState } from 'react';
import * as yup from 'yup';
import {
  IonContent,
  IonIcon,
  IonText,
  IonToast,
  useIonRouter,
} from '@ionic/react';
import {
  mailOutline,
  lockClosedOutline,
  schoolOutline,
  logInOutline,
  personAddOutline,
  personOutline,
} from 'ionicons/icons';
import { LoginApi, SignUpApi } from '../../app/API/Auth';

// Validation schemas
const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});
interface LoginResponse {
  data: {
    message: string;
    user: {
      id: number;
      email: string;
      role_id: number;
    };
    token: string;
  };
}
const LoginPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');
  const router = useIonRouter();
  const handleLoginSuccess = (response: LoginResponse) => {
    // Store the token in localStorage
    console.log(response, 'res');
    localStorage.setItem('token', response.data.token);

    // Store user data if needed
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } else {
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
    }

    // Show success message
    setToastMessage('Login successful');
    setToastColor('success');
    setShowToast(true);

    // Navigate to home page after a short delay
    console.log('its here');
    setTimeout(() => {
      router.push('/home', 'forward', 'replace');
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const schema = authMode === 'signin' ? signInSchema : signUpSchema;
      const validationData =
        authMode === 'signin'
          ? { email, password }
          : { username, email, password };

      await schema.validate(validationData, { abortEarly: false });

      if (authMode === 'signup') {
        SignUpApi({ email, password, username })
          .then(res => {
            setAuthMode('signin');
            setToastMessage('Account created successfully! Please sign in.');
            setToastColor('success');
            setShowToast(true);
          })
          .catch(err => {
            setToastMessage(err.message);
            setToastColor('danger');
            setShowToast(true);
          });
      } else {
        LoginApi({ email, password })
          .then((res: LoginResponse) => {
            handleLoginSuccess(res);
          })
          .catch(err => {
            setToastMessage(err?.response?.data?.message || 'Login failed');
            setToastColor('danger');
            setShowToast(true);
          });
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.errors[0]);
        setToastMessage(err.errors[0]);
        setToastColor('danger');
        setShowToast(true);
      }
    }
  };

  return (
    <>
      <IonContent className="">
        <div>
          <div className="h-full ion-justify-content-center ion-align-items-center">
            <div>
              <div className="bg-white shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-900 p-6 text-white shadow-md">
                  <div className="flex justify-center mb-4">
                    <IonIcon icon={schoolOutline} className="text-6xl" />
                  </div>
                  <h1 className="text-3xl font-extrabold text-center mb-2">
                    Wisdom Portal
                  </h1>
                  <p className="text-center opacity-90 text-lg">
                    Access your academic resources seamlessly
                  </p>
                </div>

                {/* Auth Mode Selector */}
                <div className="bg-[#222428]">
                  <div className="flex">
                    <button
                      onClick={() => setAuthMode('signin')}
                      className={`flex-1 py-3 px-4 flex items-center justify-center space-x-2 ${
                        authMode === 'signin'
                          ? 'text-blue-400 border-b-2 border-blue-400'
                          : 'text-gray-400'
                      }`}
                    >
                      <IonIcon icon={logInOutline} />
                      <span>Sign In</span>
                    </button>
                    <button
                      onClick={() => setAuthMode('signup')}
                      className={`flex-1 py-3 px-4 flex items-center justify-center space-x-2 ${
                        authMode === 'signup'
                          ? 'text-blue-400 border-b-2 border-blue-400'
                          : 'text-gray-400'
                      }`}
                    >
                      <IonIcon icon={personAddOutline} />
                      <span>Sign Up</span>
                    </button>
                  </div>
                </div>

                {/* Form Section */}
                <form
                  onSubmit={handleSubmit}
                  className="p-6 bg-[#222428] shadow-md space-y-6"
                >
                  {error && (
                    <div className="text-red-400 bg-red-800/40 p-3 rounded-md text-center">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Username Input - Only show for signup */}
                    {authMode === 'signup' && (
                      <div className="relative">
                        <IonIcon
                          icon={personOutline}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-[#1c1c1e] text-gray-300 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    )}

                    {/* Academic Email Input */}
                    <div className="relative">
                      <IonIcon
                        icon={mailOutline}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="email"
                        placeholder="Academic Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#1c1c1e] text-gray-300 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                      <IonIcon
                        icon={lockClosedOutline}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#1c1c1e] text-gray-300 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Remember Me and Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={e => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-500 rounded bg-[#1c1c1e]"
                      />
                      <span className="text-gray-300">Remember me</span>
                    </label>
                    <a
                      href="#"
                      className="text-blue-400 text-sm hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-cyan-500 text-white py-2 rounded-lg shadow-md hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                  >
                    {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                  </button>
                </form>

                {/* Footer Section */}
                <div className="p-6 bg-gray-600 text-center">
                  <IonText color="medium">
                    <p className="text-sm">
                      By continuing, you agree to our{' '}
                      <a href="#" className="text-primary">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-primary">
                        Privacy Policy
                      </a>
                    </p>
                  </IonText>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast notification */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color={toastColor}
        />
      </IonContent>
    </>
  );
};

export default LoginPage;
