import { BaseProps } from '../../types';

export default function Container({ children, className = '', id }: BaseProps) {
  return (
    <div
      id={id}
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
