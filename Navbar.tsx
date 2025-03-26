"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [editableLink, setEditableLink] = useState<LinkKey | null>(null);
  const [linkTexts, setLinkTexts] = useState({
    home: "Hem",
    prices: "Priser",
    contact: "Kontakt",
  });
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null); // Ref to track long press

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLongPressStart = (linkKey: LinkKey) => {
    // Start long press timer
    longPressTimeout.current = setTimeout(() => {
      setEditableLink(linkKey);
      setInputValue(linkTexts[linkKey]);
    }, 500); // 500ms for long press
  };

  const handleLongPressEnd = () => {
    // Clear the timer if mouse is released before long press is complete
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, linkKey: LinkKey) => {
    if (event.key === "Enter") {
      saveInput(linkKey);
    }
  };

  const saveInput = (linkKey: LinkKey) => {
    if (inputValue.trim() === "") {
      setInputValue(linkTexts[linkKey]); // Restore the original text if empty
    } else {
      setLinkTexts((prev) => ({
        ...prev,
        [linkKey]: inputValue.trim(),
      }));
    }
    setEditableLink(null); // Exit edit mode
  };

  // Detect click outside the input to save changes
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && editableLink && !inputRef.current.contains(event.target as Node)) {
        saveInput(editableLink); // Save text if clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editableLink, inputValue]);

  const renderMenuLinks = () => (
    <>
      {/* Länk, Hem */}
      <li
        className="hover:text-slate-400 flex items-center space-x-2"
        onMouseDown={() => handleLongPressStart("home")}
        onMouseUp={handleLongPressEnd}
        // Touch = mobil
        onTouchStart={() => handleLongPressStart("home")}
        onTouchEnd={handleLongPressEnd}
      >
        {editableLink === "home" ? (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => handleInputKeyPress(e, "home")}
            className="bg-transparent border-b border-gray-300 px-2 w-36"
            autoFocus
          />
        ) : (
          <Link href="/sitebuilder/placeholder">{linkTexts.home}</Link>
        )}
      </li>

      {/* Länk, Priser */}
      <li
        className="hover:text-slate-400 flex items-center space-x-2"
        onMouseDown={() => handleLongPressStart("prices")}
        onMouseUp={handleLongPressEnd}
        // Touch = mobil
        onTouchStart={() => handleLongPressStart("prices")}
        onTouchEnd={handleLongPressEnd}
      >
        {editableLink === "prices" ? (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => handleInputKeyPress(e, "prices")}
            className="bg-transparent border-b border-gray-300 px-2 w-36"
            autoFocus
          />
        ) : (
          <Link href="/sitebuilder/placeholder">{linkTexts.prices}</Link>
        )}
      </li>

      {/* Länk, Kontakt */}
      <li
        className="hover:text-slate-400 flex items-center space-x-2"
        onMouseDown={() => handleLongPressStart("contact")}
        onMouseUp={handleLongPressEnd}
        // Touch = mobil
        onTouchStart={() => handleLongPressStart("contact")}
        onTouchEnd={handleLongPressEnd}
      >
        {editableLink === "contact" ? (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => handleInputKeyPress(e, "contact")}
            className="bg-transparent border-b border-gray-300 px-2 w-36"
            autoFocus
          />
        ) : (
          <Link href="/sitebuilder/placeholder">{linkTexts.contact}</Link>
        )}
      </li>
    </>
  );

  return (
    <div className="sticky top-0 flex items-center justify-end w-full h-20 bg-white md:justify-end md:pl-0">
      {/* Mobile */}
      {isOpen && (
        <ul className="text-4xl absolute p-8 pr-12 top-20 right-0 w-full h-screen bg-white text-slate-600 font-bold text-right transition-colors duration-300 space-y-8 tracking-wide leading-tight">
          {renderMenuLinks()}
        </ul>
      )}
      {/* Desktop */}
      <ul className="hidden md:flex md:static md:text-right md:justify-end md:w-auto md:h-auto md:mr-4 md:space-x-6 font-bold transition-colors duration-300 text-slate-600 md:text-xl tracking-wider md:leading-loose px-4">
        {renderMenuLinks()}
      </ul>
      {/* Hamburger */}
      <div onClick={() => setIsOpen(!isOpen)} className="z-50 md:hidden">
        <svg
          className="w-8 h-8 text-slate-600 cursor-pointer"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        >
          <path
            className={`transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : ""}`}
            d="M4 6h16"
          />
          <path
            className={`transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : ""}`}
            d="M4 12h16"
          />
          <path
            className={`transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : ""}`}
            d="M4 18h16"
          />
          {isOpen && (
            <path className="transition-all duration-300 ease-in-out" d="M6 18L18 6M6 6l12 12" />
          )}
        </svg>
      </div>
    </div>
  );
}

export { Navbar };
