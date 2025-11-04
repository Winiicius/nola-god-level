"use client";

export const dynamic = "force-dynamic";

import { DndContext } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { api } from "@/lib/api";

import QuerySidebar from "./QuerySidebar";
import QueryCanvas from "./QueryCanvas";
import QueryPreview from "./QueryPreview";
import QueryResult from "./QueryResult";
import QueryFilterEditor, { FilterBlock } from "./QueryFilterEditor";

export type BlockType = "table" | "metric" | "dimension" | "filter";

export interface Block {
    type: BlockType;
    label: string;
    value: string;
}

interface SemanticSchema {
    [table: string]: {
        label: string;
        metrics: string[];
        dimensions: string[];
    };
}

export default function QueryBuilder() {
    const [selected, setSelected] = useState<Block[]>([]);
    const [filters, setFilters] = useState<FilterBlock[]>([]);
    const [result, setResult] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const { data: schema, isLoading: loadingSchema, error: schemaError } = useQuery<SemanticSchema>({
        queryKey: ["semantic-schema"],
        queryFn: async () => {
            const res = await api.get("/schema");
            return res.data.schema;
        },
        staleTime: 1000 * 60 * 5,
    });

    const table = useMemo(() => selected.find((b) => b.type === "table")?.value, [selected]);
    const metric = useMemo(() => selected.find((b) => b.type === "metric")?.value, [selected]);
    const dimension = useMemo(() => selected.find((b) => b.type === "dimension")?.value, [selected]);

    function handleDrop(block: Block) {
        if (block.type === "filter") {
            setFilters((prev) => {
                const exists = prev.some((f) => f.value === block.value);
                if (exists) return prev;

                const newFilter: FilterBlock = {
                    type: "filter",
                    label: block.label,
                    value: block.value,
                    operator: "=",
                    inputType: guessInputType(block.value),
                    userValue: "",
                };

                return [...prev, newFilter];
            });
            return;
        }

        if (block.type === "metric") {
            const alreadyHasMetric = selected.some((b) => b.type === "metric");
            if (alreadyHasMetric) {
                alert("Você só pode selecionar uma métrica por vez.");
                return;
            }
        }

        if (block.type === "table") {
            setSelected([block]);
            setFilters([]);
            return;
        }

        if (!table && (block.type as BlockType) !== "table") {
            alert("Escolha uma TABELA primeiro.");
            return;
        }

        const currentSchema = table ? schema?.[table] : undefined;
        if (
            (block.type as BlockType) !== "table" &&
            currentSchema &&
            ![...(currentSchema.metrics || []), ...(currentSchema.dimensions || [])].includes(block.value)
        ) {
            alert("Essa métrica/dimensão não pertence à tabela selecionada.");
            return;
        }


        setSelected((prev) => {
            if (prev.some((b) => b.value === block.value)) return prev;
            return [...prev, block];
        });
    }


    async function handleRunQuery() {
        if (!table || !metric) {
            alert("Selecione pelo menos uma tabela e uma métrica!");
            return;
        }

        const query = {
            table,
            metric,
            dimension,
            filters: buildFiltersObject(),
        };

        try {
            setLoading(true);
            const res = await api.post("/query", query);
            setResult(res.data.data || []);
        } catch (err) {
            console.error(err);
            alert("Erro ao executar a consulta");
        } finally {
            setLoading(false);
        }
    }

    function buildFiltersObject() {
        const obj: Record<string, Record<string, string>> = {};
        for (const f of filters) {
            if (!f.userValue) continue;
            obj[f.value] = { [f.operator]: f.userValue };
        }
        return obj;
    }

    function clearAll() {
        setSelected([]);
        setFilters([]);
        setResult([]);
    }

    if (loadingSchema) {
        return <div className="p-6 text-sm text-muted-foreground">Carregando schema...</div>;
    }

    if (schemaError) {
        return <div className="p-6 text-sm text-destructive">Erro ao carregar schema.</div>;
    }

    return (
        <DndContext>
            <div className="flex h-[calc(100vh-64px)] overflow-hidden">
                <QuerySidebar
                    schema={schema}
                    selectedTable={table}
                    selected={selected}
                    onDrop={handleDrop}
                />

                <section className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto bg-muted/30">
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                        <QueryCanvas onDrop={handleDrop} selected={selected} filters={filters} />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                        <QueryFilterEditor filters={filters} setFilters={setFilters} />
                    </motion.div>

                    <div className="flex items-center justify-end gap-3 sticky bottom-0 bg-background/80 backdrop-blur border-t border-border py-3">
                        <Button
                            onClick={handleRunQuery}
                            disabled={loading}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            {loading ? "Executando..." : "Executar Consulta"}
                        </Button>
                        <Button onClick={clearAll} variant="outline">
                            Limpar
                        </Button>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                        <QueryResult data={result} selected={selected} />
                    </motion.div>
                </section>

                <aside className="w-80 shrink-0 border-l border-border bg-accent/50 backdrop-blur p-4 overflow-y-auto">
                    <QueryPreview blocks={selected} filtersObject={buildFiltersObject()} />
                </aside>
            </div>

            {typeof window !== "undefined" &&
                createPortal(
                    <Card className="p-2 text-sm shadow-lg border bg-white">Arrastando...</Card>,
                    document.body
                )}
        </DndContext>
    );
}

function guessInputType(filterKey: string): FilterBlock["inputType"] {
    if (filterKey.includes("data")) return "date";
    return "text";
}
