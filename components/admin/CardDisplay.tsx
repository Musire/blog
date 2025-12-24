import { ContainerMode } from "@/app/hooks/useAdmin";
import SelectableCard from "./SelectableCard";

interface CardDisplayProps<T> {
  items: T[];
  mode: ContainerMode;
  selected: string[];
  getId: (item: T) => string;
  onSelect: (id: string) => void;
  renderItem?: (item: T) => React.ReactNode;
  emptyText?: string;
}

export default function CardDisplay<T>({
  items,
  mode,
  selected,
  getId,
  onSelect,
  renderItem,
  emptyText = "No items found",
}: CardDisplayProps<T>) {
  if (items.length === 0) {
    return (
      <ul className="w-full flex-1 grid place-items-center">
        <li>
          <p className="opacity-60">{emptyText}</p>
        </li>
      </ul>
    );
  }

  return (
    <ul className="w-full flex-1 grid xs:grid-cols-1 md:grid-cols-3 gap-4 overflow-y-scroll scrollbar-none max-h-[65dvh] p-3">
      {items.map(item => {
        const id = getId(item);

        return (
          <SelectableCard
            key={id}
            id={id}
            mode={mode}
            isSelected={selected.includes(id)}
            onSelect={onSelect}
          >
            {renderItem ? renderItem(item) : <p>{String(item)}</p>}
          </SelectableCard>
        );
      })}
    </ul>
  );
}
