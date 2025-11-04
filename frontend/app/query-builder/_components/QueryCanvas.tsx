"use client";

import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { Pill } from "./Pill";
import { motion } from "framer-motion";

interface Block {
    type: string;
    label: string;
    value: string;
    operator?: string;
    userValue?: string;
}

interface Props {
    onDrop: (block: any) => void;
    selected: any[];
    filters: any[];
}

export default function QueryCanvas({ onDrop, selected = [], filters = [] }: Props) {
    const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

    useDndMonitor({
        onDragEnd(event) {
            const { over, active } = event;
            if (over?.id === "canvas" && active?.data?.current) {
                onDrop(active.data.current as Block);
            }
        },
    });

    const isEmpty = selected.length === 0 && filters.length === 0;

    return (
        <Card
            ref={setNodeRef}
            className={`min-h-[220px] p-6 rounded-lg transition-all ${isOver ? "border-2 border-primary/70 bg-blue-50" : "border border-border bg-white"
                } ${isEmpty ? "border-dashed" : ""}`}
        >
            {isEmpty ? (
                <p className="text-sm text-muted-foreground text-center">
                    Arraste <span className="font-medium">Tabela</span>, <span className="font-medium">Métrica</span>,
                    <span className="font-medium"> Dimensão</span> e <span className="font-medium">Filtros</span> para cá
                </p>
            ) : (
                <div className="space-y-4">
                    {selected.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {selected.map((b) => (
                                <motion.div key={`${b.type}-${b.value}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                                    <Pill label={b.label} type={b.type} />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {filters.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {filters.map((f) => (
                                <motion.div key={`filter-${f.value ?? f.label}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                                    <Pill label={`${f.label} ${f.operator ?? ""} ${f.userValue ?? "…"}`} type="filter" />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
}