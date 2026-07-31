"use client";

import * as React from "react";

interface DropdownMenuContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextType | undefined>(undefined);

function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
  const context = React.useContext(DropdownMenuContext);
  if (!context) throw new Error("DropdownMenuTrigger must be used within DropdownMenu");

  const { open, setOpen } = context;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: React.MouseEventHandler<HTMLElement> }>, {
      onClick: () => setOpen(!open)
    });
  }

  return <button onClick={() => setOpen(!open)}>{children}</button>;
}

function DropdownMenuContent({
  align = "start",
  className = "",
  children
}: {
  align?: "start" | "end";
  className?: string;
  children: React.ReactNode;
}) {
  const context = React.useContext(DropdownMenuContext);
  if (!context) throw new Error("DropdownMenuContent must be used within DropdownMenu");

  const { open, setOpen } = context;
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open, setOpen]);

  if (!open) return null;

  const alignmentClass = align === "end" ? "right-0" : "left-0";

  return (
    <div
      ref={contentRef}
      className={`absolute ${alignmentClass} mt-2 w-48 rounded-md shadow-lg bg-white border border-gray-200 z-50 ${className}`}>
      <div className="py-1">{children}</div>
    </div>
  );
}

function DropdownMenuItem({
  className = "",
  onClick,
  children
}: {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const context = React.useContext(DropdownMenuContext);
  if (!context) throw new Error("DropdownMenuItem must be used within DropdownMenu");

  const { setOpen } = context;

  const handleClick = () => {
    onClick?.();
    setOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${className}`}>
      {children}
    </button>
  );
}

export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger };
