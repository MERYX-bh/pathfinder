export default function Select(props) {
  return (
    <select
      {...props}
      className="w-full rounded-xl border border-gray-300 px-3 py-2
                 focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
  );
}
