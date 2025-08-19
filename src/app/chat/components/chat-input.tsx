interface Props {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  messageSending: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  messageSending,
}: Props) {
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t border-gray-200 bg-gray-50">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 p-2 rounded-lg text-sm bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={handleKeyUp}
        disabled={messageSending}
      />
      <button
        onClick={onSend}
        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm shadow-sm"
      >
        Send
      </button>
    </div>
  );
}
