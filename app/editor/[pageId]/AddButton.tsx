function AddButton ({ onClick }: AddButtonProps) {
  return (
    <div className="absolute inset-0 flex justify-center items-center py-12">
      <div className="bg-gray-300 text-white w-16 h-16 rounded-full flex justify-center items-center cursor-pointer text-3xl leading-none transition-all duration-500 transform hover:bg-gray-600 hover:opacity-100 hover:scale-110 hover:shadow-2xl opacity-50" onClick={onClick}>+</div>
    </div>
  );
};

export default AddButton;
