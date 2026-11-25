import React, { useState } from 'react';
import { LogOut, X } from 'lucide-react';
import { validateAuthForm } from '../data/moharData';

export interface UserSession {
  name: string;
  email: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: UserSession | null;
  onLoginSuccess: (session: UserSession) => void;
  onLogout: () => void;
}

export function AuthModal({
  isOpen,
  onClose,
  session,
  onLoginSuccess,
  onLogout,
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Partial<Record<'name' | 'email' | 'password', string>>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateAuthForm({ mode, name, email, password });
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    const derivedName =
      mode === 'signup'
        ? name.trim()
        : email.trim().split('@')[0].replace(/[._-]/g, ' ');

    onLoginSuccess({
      name: derivedName || 'Studio Member',
      email: email.trim(),
    });
    setPassword('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-[#F7F3EB] text-stone-900 shadow-2xl border border-stone-300/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-stone-300/70">
          <div>
            <p className="text-xs font-medium text-stone-500">MoHaR Studio Account</p>
            <h2
              id="auth-modal-title"
              className="mt-1 text-2xl font-semibold text-stone-900"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {session ? 'Welcome back' : mode === 'login' ? 'Log in to MoHaR' : 'Create an account'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Login or Signup"
            className="p-2 rounded-lg text-stone-600 hover:text-stone-950 hover:bg-stone-200/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {session ? (
          <div className="p-6 space-y-5">
            <div className="p-4 rounded-xl bg-white border border-stone-200">
              <p className="text-sm font-bold text-stone-900">{session.name}</p>
              <p className="text-xs text-stone-500 mt-0.5">{session.email}</p>
              <p className="text-xs text-stone-600 mt-3">
                Your notes, favorites, and messages stay synced across the dock during this session.
              </p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-stone-700 hover:text-stone-950 cursor-pointer"
              >
                Return to Canvas
              </button>
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  setEmail('');
                  setName('');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-stone-900 text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
            {/* Mode switch */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-stone-200/75">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrors({});
                }}
                className={`py-2 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white text-[#1700D1] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrors({});
                }}
                className={`py-2 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-white text-[#1700D1] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            {mode === 'signup' && (
              <div>
                <label htmlFor="auth-name" className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name
                </label>
                <input
                  id="auth-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Maya Lin"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#1700D1]"
                />
                {errors.name && (
                  <p role="alert" className="mt-1 text-xs text-red-700">
                    {errors.name}
                  </p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="auth-email" className="block text-xs font-semibold text-stone-700 mb-1">
                Email Address
              </label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@studio.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#1700D1]"
              />
              {errors.email && (
                <p role="alert" className="mt-1 text-xs text-red-700">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="auth-password" className="block text-xs font-semibold text-stone-700 mb-1">
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#1700D1]"
              />
              {errors.password && (
                <p role="alert" className="mt-1 text-xs text-red-700">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg text-sm font-extrabold uppercase tracking-wider bg-[#FDFF00] text-[#1700D1] border-2 border-[#1700D1] hover:brightness-95 transition-all cursor-pointer"
            >
              {mode === 'login' ? 'Log In' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
