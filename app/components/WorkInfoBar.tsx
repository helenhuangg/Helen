interface WorkInfoBarItem {
  label: string;
  value: string;
}

interface WorkInfoBarProps {
  items: WorkInfoBarItem[];
}

export default function WorkInfoBar({ items }: WorkInfoBarProps) {
  return (
    <div className="flex items-start w-full p-[10px]">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex-1 flex flex-col gap-1 items-start"
        >
          <span
            className="text-[10px] tracking-[-0.5px] uppercase px-[10px] py-[2px]"
            style={{
              fontFamily: "var(--font-dm-mono)",
              backgroundColor: "var(--color-highlight)",
              color: "var(--color-primary)",
            }}
          >
            {item.label}
          </span>
          <p
            className="text-[14px] tracking-[-0.7px] whitespace-pre-line"
            style={{
              fontFamily: "var(--font-Alte-Haas-Grotesk)",
              color: "var(--color-primary)",
            }}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
