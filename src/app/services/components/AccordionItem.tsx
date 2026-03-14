// src/components/AccordionItem.tsx
import React from "react";

interface AccordionItemProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

export default function AccordionItem({ id, title, isOpen, onToggle, children }: AccordionItemProps) {
  return (
    <div className="border border-gray-200 bg-white shadow-sm">
      <button 
        id={`accordion-${id}`}
        onClick={() => onToggle(id)}
        className="w-full flex justify-between items-center p-8 hover:bg-gray-50 cursor-pointer transition-colors group"
      >
        <h2 className="font-serif text-2xl text-secondary">{title}</h2>
        <span className={`text-secondary transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : "rotate-0"}`}>
          ▼
        </span>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isOpen ? "max-h-[4000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-8 pt-0 border-t border-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
}