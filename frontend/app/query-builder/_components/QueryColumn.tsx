"use client";

import { useDraggable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";

interface Item {
    type: "table" | "metric" | "dimension" | "filter";
    label: string;
    value: string;
}

interface Props {
    title: string;
    items: Item[];
}

export default function QueryColumn({ title, items }: Props) {
    return (
        <div>
            <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
                {title}
            </h2>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <DraggableItem
                        key={`${title}-${item?.value ?? item?.label ?? index}`}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
}

function DraggableItem({ item }: { item: Item }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: `${item.type}-${item.value}`,
            data: item,
        });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        opacity: isDragging ? 0.5 : 1,
    } as const;

    return (
        <Card
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="p-2 text-sm cursor-grab bg-white hover:bg-slate-50 border border-border rounded-md shadow-sm hover:shadow transition-all"
        >
            <span className="font-medium text-slate-700">{item.label}</span>
            <span className="ml-2 text-xs text-slate-400">({item.type})</span>
        </Card>
    );
}
