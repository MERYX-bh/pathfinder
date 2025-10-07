export default function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-gray-300 px-3 py-2
                 focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
  );
}
