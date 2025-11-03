"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import type { Block } from "./QueryBuilder";

export default function QueryPreview({
    blocks,
    filtersObject,
}: {
    blocks: Block[];
    filtersObject: Record<string, Record<string, string>>;
}) {
    const table = blocks.find((b) => b.type === "table")?.value || "";
    const metric = blocks.find((b) => b.type === "metric")?.value || "";
    const dimension = blocks.find((b) => b.type === "dimension")?.value || "";

    const query = {
        table,
        metric,
        dimension: dimension || null,
        filters: filtersObject,
    };

    return (
        <Card className="p-4 bg-slate-50 border border-border rounded-lg shadow-sm">
            <CardHeader className="p-0 mb-3">
                <CardTitle className="text-sm font-semibold text-slate-700">
                    Query Gerada
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <pre className="text-xs bg-white border border-border p-3 rounded-lg overflow-auto max-h-[300px]">
                    {JSON.stringify(query, null, 2)}
                </pre>
            </CardContent>
        </Card>
    );
}
