import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  variant?: 'default' | 'outline';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full   transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ',
          {
            'px-3 py-1  shadow-sm rounded-md  ': variant === 'default',
            'bg-transparent focus:ring-0 py-1 focus:border-primary focus:border-b-2 hover:border-b hover:border-gray-300 focus-visible:outline-none focus-visible:ring-0  border-b-2  transition-colors':
              variant === 'outline',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
