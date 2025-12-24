'use client';

import Link from "next/link";

type ContainerMode = "view" | "edit" | "delete";

interface ContinueProps {
    mode: ContainerMode;
    hasSelection: boolean;
    onDelete: () => void;
    selected: string[],
    base: string
}

export default function ContinueButton ({ mode, hasSelection, onDelete, selected, base }: ContinueProps) {
    if (!hasSelection || mode === 'view') return null;

    if (mode === 'delete') {
        return (
            <button
                onClick={onDelete}
                type="button" 
                className="absolute bottom-6 bg-whitesmoke text-deep normal-space rounded-lg hover:cursor-pointer right-6 animate-fadeIn">
                Continue
            </button>
        )
    }

    if (mode === 'edit') {
        const uri = `${base}/edit/` + selected[0]
        return (
            <Link
                href={uri}
                className="absolute bottom-6 bg-whitesmoke text-deep normal-space rounded-lg hover:cursor-pointer right-6 animate-fadeIn"
            >
                Continue
            </Link>
        )
    }

}