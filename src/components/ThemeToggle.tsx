import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', compact = false }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
        isDark
          ? 'bg-[#18181D] hover:bg-[#222129] border-[#2E2C37] hover:border-[#B76E79]/60 text-[#E8B4A8] shadow-inner shadow-black/50'
          : 'bg-[#F2ECE7] hover:bg-[#EAE2DC] border-[#E2D5CC] hover:border-[#B76E79]/60 text-[#8B4852] shadow-sm'
      } ${className}`}
      aria-label={isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
      title={isDark ? 'Включить светлую тему (День)' : 'Включить тёмную тему (Ночь)'}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 text-[#E8B4A8] transition-transform duration-300 rotate-0" />
        ) : (
          <Sun className="w-4 h-4 text-[#B76E79] transition-transform duration-300 rotate-90" />
        )}
      </div>

      {!compact && (
        <span className="text-[11px] font-semibold uppercase tracking-wider select-none">
          {isDark ? 'Ночь' : 'День'}
        </span>
      )}
    </button>
  );
};
