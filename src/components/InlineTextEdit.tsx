import { useState, useRef, useEffect } from 'react';
import { Edit } from 'lucide-react';

interface InlineTextEditProps {
  value: string;
  onChange: (value: string) => void;
  onSave?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function InlineTextEdit({
  value,
  onChange,
  onSave,
  placeholder = 'Enter text...',
  className = '',
}: InlineTextEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
    setEditValue(value);
  };

  const handleSave = () => {
    onChange(editValue);
    if (onSave) {
      onSave(editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`text-neutral-text tracking-aplos border border-neutral-border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-800 ${className}`}
        style={{
          fontSize: 'inherit',
          lineHeight: 'inherit',
        }}
      />
    );
  }

  return (
    <div
      className="flex items-center gap-2 cursor-pointer group"
      onClick={handleClick}
    >
      <span className={`text-neutral-text tracking-aplos ${className}`}>
        {value || placeholder}
      </span>
      <Edit
        className="w-4 h-4 text-neutral-text-weak opacity-0 group-hover:opacity-100 transition-opacity"
        strokeWidth={2}
        style={{ width: '16px', height: '16px' }}
      />
    </div>
  );
}
