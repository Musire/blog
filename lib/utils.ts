import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMonthYear(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(d);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function unslugify(value: string) {
  return value
    .replace(/-/g, " ")
}

export function createExcerpt(content: string, max = 299) {
  if (!content) return "";
  return content.length > max
    ? content.slice(0, max) + "…"
    : content;
}

export function serializeValue(value: any): any {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  // Date → ISO string
  if (value instanceof Date) {
    return value.toISOString();
  }

  // Mongo ObjectId
  if (typeof value === "object" && value?._bsontype === "ObjectId") {
    return value.toString();
  }

  // Array → recurse
  if (Array.isArray(value)) {
    return value.map(serializeValue);
  }

  // Plain object → recurse
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, serializeValue(v)])
    );
  }

  // Fallback (functions, symbols, etc.)
  return String(value);
}


