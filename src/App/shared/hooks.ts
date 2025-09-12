import { useState } from "react";

/** Обработка подсветки элемента */
export function useHighlight() {
    const [highlightedId, setHighlightedId] = useState<string>();

    const updateHighlightedId = (id: string) => {
        setHighlightedId(id);
        setTimeout(() => setHighlightedId(undefined), 500);
    }

    return {highlightedId, updateHighlightedId}
}