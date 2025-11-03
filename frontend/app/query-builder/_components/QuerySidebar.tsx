"use client";

import QueryColumn from "./QueryColumn";
import { cn } from "@/lib/utils";

interface Schema {
    [table: string]: {
        label: string;
        metrics: string[];
        dimensions: string[];
    };
}

interface Block {
    type: "table" | "metric" | "dimension" | "filter";
    label: string;
    value: string;
}

interface Props {
    schema?: Schema;
    selectedTable?: string;
    selected?: Block[];
    onDrop: (block: Block) => void;
}

export default function QuerySidebar({ schema, selectedTable, selected = [], onDrop }: Props) {
    if (!schema || Object.keys(schema).length === 0) {
        return (
            <aside className="w-64 shrink-0 bg-accent border-r border-border p-4">
                <p className="text-sm text-muted-foreground">Carregando esquema...</p>
            </aside>
        );
    }

    const tables = Object.entries(schema)
        .filter(([_, value]) => value && typeof value === "object" && "metrics" in value)
        .map(([key, value]) => ({
            type: "table" as const,
            label: value.label || formatLabel(key),
            value: key,
        }));

    const selectedSchema = selectedTable && schema[selectedTable] ? schema[selectedTable] : null;

    const metrics = selectedSchema
        ? (selectedSchema.metrics || []).map((m) => ({
            type: "metric" as const,
            label: formatLabel(m),
            value: m,
        }))
        : [];

    const dimensions = selectedSchema
        ? (selectedSchema.dimensions || []).map((d) => ({
            type: "dimension" as const,
            label: formatLabel(d),
            value: d,
        }))
        : [];

    const filters = dimensions.map((d) => ({
        type: "filter" as const,
        label: d.label,
        value: d.value,
    }));

    const hasMetricSelected = selected?.some((b) => b.type === "metric");

    return (
        <aside className="w-64 shrink-0 bg-accent border-r border-border p-4 overflow-y-auto">
            <div className="space-y-6">
                <QueryColumn title="Tabelas" items={tables} />

                <div
                    className={cn(
                        "transition-all",
                        !selectedTable || hasMetricSelected
                            ? "opacity-40 pointer-events-none select-none"
                            : "opacity-100"
                    )}
                >
                    <QueryColumn title="Métricas" items={metrics} />
                </div>

                <div
                    className={cn(
                        "transition-all",
                        !selectedTable ? "opacity-40 pointer-events-none select-none" : "opacity-100"
                    )}
                >
                    <QueryColumn title="Dimensões" items={dimensions} />
                </div>

                <div
                    className={cn(
                        "transition-all",
                        !selectedTable ? "opacity-40 pointer-events-none select-none" : "opacity-100"
                    )}
                >
                    <QueryColumn title="Filtros" items={filters} />
                </div>
            </div>
        </aside>
    );
}

function formatLabel(key: string): string {
    return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
}
