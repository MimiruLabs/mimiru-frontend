import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, icon, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-1 text-sm font-medium text-zinc-200" htmlFor={props.id || props.name}>
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder:text-zinc-400 placeholder:italic placeholder:tracking-wide focus:outline-none focus:border-blue-500 w-full ${error ? 'border-red-500' : ''}`}
            {...props}
          />
        </div>
        {error && <div className="mt-1 text-xs text-red-400">{error}</div>}
      </div>
    );
  }
);
TextInput.displayName = 'TextInput'; 