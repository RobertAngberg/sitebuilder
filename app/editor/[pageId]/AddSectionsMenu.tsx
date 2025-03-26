function AddSectionsMenu({ addMenuClick }: AddSectionsMenuProps) {
  return (
    <div className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2">
      <div className="flex space-x-2 bg-gray-600 p-2 rounded-lg mt-3">
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-500"
          onClick={() => addMenuClick("header")}
        >
          Rubrik
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-500"
          onClick={() => addMenuClick("text")}
        >
          Text
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-500"
          onClick={() => addMenuClick("image")}
        >
          Bild
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-500"
          onClick={() => addMenuClick("twoColumns")}
        >
          Två kolumner
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-500"
          onClick={() => addMenuClick("threeColumns")}
        >
          Tre kolumner
        </button>
      </div>
    </div>
  );
}

export default AddSectionsMenu;
