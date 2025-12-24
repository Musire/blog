'use client';

type ContainerMode = "view" | "edit" | "delete";

type CardContent = {
  id: string;
  mode: ContainerMode;
  isSelected: boolean;
  onSelect: (id: string) => void;
  children?: React.ReactNode;
};

export default function SelectableCard({
  id,
  mode,
  isSelected,
  onSelect,
  children,
}: CardContent) {
  const ringColor: Record<ContainerMode, string> = {
    view: "ring-transparent",
    edit: "ring-sky-300",
    delete: "ring-error-dark",
  };

  const color =
    mode === "view"
      ? ringColor[mode]
      : isSelected
      ? ringColor[mode]
      : "ring-whitesmoke/30";

  return (
    <li
      onClick={() => onSelect(id)}
      className={`w-full h-48 rounded-xl ring-2 bg-darkest p-4 relative  ${color}`}
    >
      {children}

      <div
        className={`${color} absolute right-4 top-4 ring-3 size-3 rounded-full`}
      />
    </li>
  );
}
