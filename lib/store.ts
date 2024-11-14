import { create } from 'zustand';

interface CityState {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export const useCityStore = create<CityState>((set) => ({
  selectedCity: 'Select Location',
  setSelectedCity: (city) => set({ selectedCity: city }),
}));

interface AuthState {
  loginIdentifier: string;
  isValidEmail: boolean;
  isValidPhone: boolean;
  otpTimer: number;
  setLoginIdentifier: (identifier: string) => void;
  setIsValidEmail: (isValid: boolean) => void;
  setIsValidPhone: (isValid: boolean) => void;
  setOtpTimer: (timer: number) => void;
}


export const useAuthStore = create<AuthState>((set) => ({
  loginIdentifier: '',
  isValidEmail: false,
  isValidPhone: false,
  otpTimer: 45,
  setLoginIdentifier: (identifier) => set({ loginIdentifier: identifier }),
  setIsValidEmail: (isValid) => set({ isValidEmail: isValid }),
  setIsValidPhone: (isValid) => set({ isValidPhone: isValid }),
  setOtpTimer: (timer) => set({ otpTimer: timer }),
}));

interface SignupStore {
  userId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobile: string;
  userType: string;
  industry: string;
  purpose: string;
  setUserId: (userId: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setMobile: (mobile: string) => void;
  setUserType: (userType: string) => void;
  setIndustry: (industry: string) => void;
  setPurpose: (purpose: string) => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  userId: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  mobile: '',
  userType: '',
  industry: '',
  purpose: '',
  setUserId: (userId) => set({ userId }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setMobile: (mobile) => set({ mobile }),
  setUserType: (userType) => set({ userType }),
  setIndustry: (industry) => set({ industry }),
  setPurpose: (purpose) => set({ purpose }),
}));
