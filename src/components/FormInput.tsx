import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  autoComplete?: string;
}

const FormInput = ({
  id,
  label,
  type,
  register,
  error,
  placeholder,
  autoComplete,
}: FormInputProps) => (
  <div className="form-floating mb-3">
    <input
      {...register}
      id={id}
      type={type}
      className="form-control"
      autoComplete={autoComplete}
      placeholder={placeholder || label}
    />
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    {error && <span className="text-danger">{error.message}</span>}
  </div>
);

export default FormInput;
