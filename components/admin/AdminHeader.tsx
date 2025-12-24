"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { ContainerMode } from "@/app/hooks/useAdmin";

interface AdminHeaderProps {
  resourceBasePath: "/admin/post" | "/admin/category" | string;
  mode: ContainerMode;
  onModeChange: (mode: ContainerMode) => void;
}

export function AdminHeader({
  resourceBasePath,
  mode,
  onModeChange,
}: AdminHeaderProps) {
  const pathname = usePathname();

  const tabs = [
    { label: "Post", href: "/admin/post" },
    { label: "Category", href: "/admin/category" },
  ];

  const actions = [
    {
      key: "create",
      label: "creation",
      href: `${resourceBasePath}/new`,
      icon: <Plus size={20} />,
    },
    {
      key: "edit",
      label: "edit",
      mode: "edit" as const,
      icon: <Pencil size={20} />,
    },
    {
      key: "delete",
      label: "delete",
      mode: "delete" as const,
      icon: <Trash2 size={20} />,
    },
  ];

  return (
    <div className="spaced">
      {/* Tabs */}
      <span className="flex items-center space-x-4 capitalize h-14">
        {tabs.map(tab => {
          const isActive =
            pathname === tab.href ||
            pathname.startsWith(`${tab.href}/`);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`h-full centered w-fit px-3 border-b ${
                isActive
                  ? "text-whitesmoke border-whitesmoke"
                  : "text-whitesmoke/60 border-transparent hover:text-whitesmoke"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </span>

      {/* Actions */}
      <span className="flex space-x-2 justify-end items-center">
        {actions.map(action => {
          const isActive =
            action.mode && mode === action.mode;

          const baseClass =
            "hover:cursor-pointer capitalize shrink sm:w-20 xs:max-sm:p-3 sm:normal-space border-2 centered rounded-full border-whitesmoke/60 text-sm";

          if (action.href) {
            return (
              <Link
                key={action.key}
                href={action.href}
                className={baseClass}
              >
                <p className="xs:hidden sm:block">
                  {action.label}
                </p>
                <span className="sm:hidden">
                  {action.icon}
                </span>
              </Link>
            );
          }

          return (
            <button
              key={action.key}
              type="button"
              className={`${baseClass} ${
                isActive
                  ? "bg-whitesmoke text-deeper"
                  : ""
              }`}
              onClick={() =>
                action.mode &&
                onModeChange(action.mode)
              }
            >
              <p className="xs:hidden sm:block">
                {action.label}
              </p>
              <span className="sm:hidden">
                {action.icon}
              </span>
            </button>
          );
        })}
      </span>
    </div>
  );
}
