"use client";

import { Badge } from "@/components/ui/badge";
import { Database, BarChart3, Tag, Filter } from "lucide-react";

interface PillProps {
    label: string;
    type: "table" | "metric" | "dimension" | "filter";
}

export function Pill({ label, type }: PillProps) {
    const icons = {
        table: <Database size={12} className="inline mr-1" />,
        metric: <BarChart3 size={12} className="inline mr-1" />,
        dimension: <Tag size={12} className="inline mr-1" />,
        filter: <Filter size={12} className="inline mr-1" />,
    };

    const colors: Record<PillProps["type"], string> = {
        table: "bg-blue-100 text-blue-700 border-blue-300",
        metric: "bg-green-100 text-green-700 border-green-300",
        dimension: "bg-purple-100 text-purple-700 border-purple-300",
        filter: "bg-yellow-100 text-yellow-700 border-yellow-300",
    };

    return (
        <Badge
            variant="outline"
            className={`px-2 py-1 text-xs font-medium rounded-full flex items-center border ${colors[type]}`}
        >
            {icons[type]}
            {label}
        </Badge>
    );
}
