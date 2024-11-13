
export default function Button({
  // @ts-ignore
  name,
  // @ts-ignore
  customClass,
  // @ts-ignore
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-primary hover:bg-primary/80 text-[#1F2226] flex flex-row px-10 py-3 rounded-md justify-center items-center ${customClass}`}
    >
      {name}
    </button>
  );
}
