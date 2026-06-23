import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';

interface AuthFormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export function AuthFormField({ name, label, type = 'text', placeholder }: AuthFormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <Input id={name} type={type} placeholder={placeholder} {...register(name)} />
      {error && <p className="text-sm text-destructive">{error.message as string}</p>}
    </div>
  );
}
