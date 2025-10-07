export default function Button({ className = "", ...props }) {
  return (
    <button
      className={`rounded-xl px-4 py-2 font-medium shadow-sm
                  bg-orange-500 text-white hover:bg-orange-600 active:scale-[.99]
                  disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
