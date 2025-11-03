"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export type InputType = "text" | "date";

export interface FilterBlock {
    type: "filter";
    label: string;
    value: string;
    operator: "=" | ">=" | "<=" | "!=" | "LIKE";
    inputType: InputType;
    userValue: string;
}

export default function QueryFilterEditor({
    filters,
    setFilters,
}: {
    filters: FilterBlock[];
    setFilters: (updater: (prev: FilterBlock[]) => FilterBlock[]) => void;
}) {
    if (filters.length === 0) return null;

    function updateFilter(idx: number, patch: Partial<FilterBlock>) {
        setFilters((prev) => {
            const next = [...prev];
            next[idx] = { ...next[idx], ...patch } as FilterBlock;
            return next;
        });
    }

    function removeFilter(idx: number) {
        setFilters((prev) => prev.filter((_, i) => i !== idx));
    }

    return (
        <Card className="p-4">
            <CardHeader className="p-0 mb-3">
                <CardTitle className="text-sm font-semibold text-slate-700">
                    Editar Filtros
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
                {filters.map((f, idx) => (
                    <div
                        key={`editor-${f.value}`}
                        className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2 rounded-lg border border-border"
                    >
                        <div className="col-span-3 text-sm text-slate-700">{f.label}</div>

                        <div className="col-span-3">
                            <Select
                                value={f.operator}
                                onValueChange={(v) =>
                                    updateFilter(idx, {
                                        operator: v as FilterBlock["operator"],
                                    })
                                }
                            >
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Operador" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="=">=</SelectItem>
                                    <SelectItem value=">=">{">="}</SelectItem>
                                    <SelectItem value="<=">{"<="}</SelectItem>
                                    <SelectItem value="!=">!=</SelectItem>
                                    <SelectItem value="LIKE">LIKE</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="col-span-4">
                            <Input
                                type={f.inputType === "date" ? "date" : "text"}
                                placeholder={f.inputType === "date" ? "aaaa-mm-dd" : "valor"}
                                value={f.userValue}
                                onChange={(e) => updateFilter(idx, { userValue: e.target.value })}
                                className="h-9"
                            />
                        </div>

                        <div className="col-span-2 flex justify-end">
                            <Button
                                variant="outline"
                                onClick={() => removeFilter(idx)}
                                className="h-9"
                            >
                                Remover
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
