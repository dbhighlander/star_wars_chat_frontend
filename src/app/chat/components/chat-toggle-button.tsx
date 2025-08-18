interface Props {
  onClick: () => void;
}

export default function ChatToggleButton({ onClick }: Props) {
  return (
    <button
      className="absolute bottom-0 right-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.97 9.97 0 01-4.318-1.003L3 20l1.003-4.318A9.97 9.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    </button>
  );
}