import { forwardRef } from 'react';

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  name?: string;
  value?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, defaultChecked, onChange, className = '', id, name, value, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        id={id}
        name={name}
        value={value}
        className={`checkbox-custom ${className}`}
        style={{
          width: '16px',
          height: '16px',
          appearance: 'none',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          border: '1.5px solid #DCDCDC',
          borderRadius: '4px',
          backgroundColor: '#FFFFFF',
          cursor: 'pointer',
          position: 'relative',
          flexShrink: 0,
        }}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';
