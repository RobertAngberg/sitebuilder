import React, { useState } from "react";

const ContentTwoColumns: React.FC<ContentTwoColumnsProps> = ({ handleAddContent }) => {
  const [columns, setColumns] = useState<{ text: string; isEditing: boolean }[]>([
    { text: "", isEditing: false },
    { text: "", isEditing: false },
  ]);

  const handleColumnClick = (index: number) => {
    const newColumns = [...columns];
    newColumns[index].isEditing = true;
    setColumns(newColumns);
  };

  const handleTextChange = (index: number, value: string) => {
    const newColumns = [...columns];
    newColumns[index].text = value;
    setColumns(newColumns);
  };

  const handleSave = () => {
    const columnsData = columns.map((column) => column.text);
    handleAddContent("twoColumns", undefined, undefined, columnsData);

    const newColumns = columns.map((column) => ({
      ...column,
      isEditing: false,
    }));
    setColumns(newColumns);
  };

  return (
    <div className="flex flex-col">
      <div className="flex space-x-4">
        {columns.map((column, index) => (
          <div
            key={index}
            className="w-1/2 p-4 cursor-pointer"
            onClick={() => handleColumnClick(index)}
          >
            {column.isEditing ? (
              <div>
                <textarea
                  className="w-full h-32 p-2"
                  placeholder=""
                  value={column.text}
                  onChange={(e) => handleTextChange(index, e.target.value)}
                  autoFocus
                />
              </div>
            ) : (
              <div>
                {column.text ? (
                  <p>{column.text}</p>
                ) : (
                  <div className="text-gray-400 italic">Klicka för att lägga till text...</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center mt-4">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          onClick={handleSave}
        >
          Spara
        </button>
      </div>
    </div>
  );
};

export default ContentTwoColumns;
