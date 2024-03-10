import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

export interface TextInputFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: any;
}
