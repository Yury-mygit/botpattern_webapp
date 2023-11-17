import React, { useState } from 'react';

interface SmartSelectProps {
  options: string[]; // replace with your type
  value: string | number;
  label: string;
  onChange: (value: string | number) => void;
  onTextClick?: () => void;
}

const SmartSelect: React.FC<SmartSelectProps> = ({ options, value, label, onChange, onTextClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  console.log(options)
  const filteredOptions = options.filter(option => option.includes(search));

  return (
    <div className="flex flex-col w-1/2">
      <p>{label}</p>
      <div className="relative">
        <div onClick={onTextClick} className="w-full cursor-pointer">{value}</div>
        <div onClick={() => setIsOpen(!isOpen)} className="absolute right-0 top-0 cursor-pointer">▼</div>
        {isOpen && (
          <>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full" />
            <select className="w-full" value={value} onChange={(e) => onChange(e.target.value)}>
              {filteredOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </>
        )}
      </div>
    </div>
  );
};

export default SmartSelect;
