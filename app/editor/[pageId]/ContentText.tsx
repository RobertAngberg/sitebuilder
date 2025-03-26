import { useState } from "react";

function ContentText({ handleAddContent }: ContentTextProps) {

  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter your text"
        className="mr-2 p-2 border border-gray-300 rounded flex-grow"
      />
      <button className="bg-slate-700 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-slate-500" onClick={() => handleAddContent("text", inputValue)}>Lägg till text</button>
    </div>
  );
}

export default ContentText;
