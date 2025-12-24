"use client";

import { twMerge } from "tailwind-merge";
import { useDrawer } from "@/hooks";
import clsx from "clsx";
import { Check } from "lucide-react";
import { ElementType, useState } from "react";

interface DropdownButtonProps<T> {
  Icon?: ElementType;
  buttonStyle?: string;
  drawerStyle?: string;
  options: T[];
  value?: T | T[] | null;
  onChange?: (value: T | T[]) => void;
  multiple?: boolean;
}

export default function DropdownButton<T extends string | number>({
  Icon,
  buttonStyle,
  drawerStyle,
  options = [],
  value,
  onChange,
  multiple = false,
}: DropdownButtonProps<T>) {
  const { isMounted, animation, closeDrawer, toggleDrawer } = useDrawer();

  const [internalState, setInternalState] = useState<T | T[] | null>(
    multiple ? [] : null
  );
  const selected = value !== undefined ? value : internalState;
  const updateSelected = onChange !== undefined ? onChange : setInternalState;

  const handleSelect = (option: T) => {
    if (multiple) {
      const currentArray = Array.isArray(value) ? [...value] as T[] : [];
      const alreadySelected = currentArray.includes(option);

      const updated = alreadySelected
        ? currentArray.filter((v) => v !== option)
        : [...currentArray, option];

      updateSelected(updated);
    } else {
      updateSelected(option);
      closeDrawer();
    }
  };

  const getDisplayText = () => {
    if (multiple) {
      const arr = Array.isArray(selected) ? selected : [];
      return arr.length > 0 ? arr.join(", ") : "Select Option";
    }

    // SINGLE SELECT
    if (selected === "" || selected == null) {
      return "Select Option";
    }

    return String(selected);
  };
  

  return (
    <div className="relative text-else">
      <button
        type="button"
        onClick={toggleDrawer}
        className={twMerge(
          "snappy spaced gap-x-2 text-sm capitalize w-full border border-whitesmoke/40 rounded-lg normal-space",
          buttonStyle
        )}
      >
        {getDisplayText()}
        {Icon && <Icon size={25} />}
      </button>

      {isMounted && (
        <>
          <div className="fixed inset-0 z-10" onClick={closeDrawer} />

          <aside
            className={twMerge(
              clsx(
                "absolute bg-darkest min-w-40 w-full border border-adjust z-20 max-h-40 overflow-y-auto scrollbar-none top-12 rounded-xl",
                animation ? "animate-ghostIn" : "animate-ghostOut"
              ),
              drawerStyle
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col w-full">
              {options.map((option) => {
                const isSelected = multiple
                  ? Array.isArray(value) && value.includes(option)
                  : value === option;

                return (
                  <li key={String(option)}>
                    <button
                      type="button"
                      onClick={() => handleSelect(option)}
                      className="flex items-center w-full text-sm text-left capitalize px-3 py-1 hover:surface-2 easy-transition gap-x-2"
                    >
                      {multiple && (
                        <span className="w-4">
                          {isSelected && (
                            <Check className="w-4 h-4 text-primary" />
                          )}
                        </span>
                      )}
                      <span>{String(option)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
        </>
      )}
    </div>
  );
}
