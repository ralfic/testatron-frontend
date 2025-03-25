'use client';

import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage';
import { RequiredSymbol } from '../RequiredSymbol';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  Icon?: LucideIcon;
  disabled?: boolean;
}

export function InputForm({
  placeholder,
  Icon,
  name,
  label,
  required,
  className,
  disabled = false,
  ...props
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string;

  return (
    <div className={className}>
      {label && (
        <p className="mb-1 font-roboto">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute top-3 left-3 translate-y-0.5">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <Input
          disabled={disabled}
          className={cn('h-12 text-md ', {
            'pl-10': Icon,
          })}
          {...register(name)}
          {...props}
          placeholder={placeholder}
        ></Input>
      </div>

      {errorText && <ErrorMessage text={errorText} className="mt-2" />}
    </div>
  );
}
