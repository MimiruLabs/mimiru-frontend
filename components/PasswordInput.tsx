import React, { useState } from 'react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, ...props }, ref) => {
    const [show, setShow] = useState(false);
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-1 text-sm font-medium text-zinc-200" htmlFor={props.id || props.name}>
            {label}
          </label>
        )}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 11V8a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.5"/></svg>
          </span>
          <input
            ref={ref}
            type={show ? 'text' : 'password'}
            className={`pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder:text-zinc-400 placeholder:italic placeholder:tracking-wide focus:outline-none focus:border-blue-500 w-full pr-10 ${error ? 'border-red-500' : ''}`}
            autoComplete="current-password"
            {...props}
          />
          <button
            type="button"
            tabIndex={-1}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 focus:outline-none"
            onClick={() => setShow((s) => !s)}
          >
            {show ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.221 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.364-2.364A9.956 9.956 0 0021.9 7.5M9.88 9.88l4.24 4.24" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.21 2.21a9.956 9.956 0 002.79-2.21c-1.73-2.61-5.1-6-9-6s-7.27 3.39-9 6c1.73 2.61 5.1 6 9 6 1.13 0 2.22-.15 3.25-.43" /></svg>
            )}
          </button>
        </div>
        {error && <div className="mt-1 text-xs text-red-400">{error}</div>}
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput'; 