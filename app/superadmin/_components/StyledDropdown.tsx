"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

type DropdownOption = {
  label: string;
  value: string;
};

type StyledDropdownProps = {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  ariaLabel?: string;
  className?: string;
  menuClassName?: string;
  optionClassName?: string;
};

export function StyledDropdown({
  value,
  options,
  onChange,
  ariaLabel,
  className = "",
  menuClassName = "",
  optionClassName = "",
}: StyledDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? options[0],
    [options, value],
  );

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 rounded-[18px] border border-[#dfcfbf] bg-[linear-gradient(180deg,#f6f3ef,#ece7e0)] px-4 py-3 text-left text-[15px] font-medium text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_8px_20px_rgba(175,146,114,0.14)] transition hover:border-[#d6b899] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_12px_24px_rgba(175,146,114,0.18)]"
      >
        <span className="truncate">{selectedOption?.label ?? value}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          className={`absolute left-0 top-[calc(100%+0.75rem)] z-50 w-full overflow-hidden rounded-[18px] border border-[#e2d4c7] bg-[linear-gradient(180deg,#fbf8f4,#f0ece7)] p-2 shadow-[0_22px_50px_rgba(92,66,39,0.18)] ${menuClassName}`}
        >
          <div className="max-h-72 overflow-y-auto pr-1">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`mb-1.5 flex w-full items-center justify-between rounded-[14px] px-4 py-3 text-left text-[15px] transition last:mb-0 ${
                    isSelected
                      ? "bg-[linear-gradient(135deg,#df9b35,#e57a61)] font-semibold text-white shadow-[0_12px_28px_rgba(229,122,97,0.28)]"
                      : "text-slate-600 hover:bg-white/80 hover:text-slate-800"
                  } ${optionClassName}`}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && <CheckIcon />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
    >
      <path
        d="m7 14 5-5 5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m6 12 4 4 8-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
