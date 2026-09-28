function PrimaryButton({ text }) {
  return (
    <button
      className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-3 rounded-xl font-semibold shadow-lg"
    >
      {text}
    </button>
  );
}

export default PrimaryButton;