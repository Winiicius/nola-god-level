"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface Props {
    data: any[];
    selected: { type: string; value: string }[];
}

export default function QueryResult({ data, selected }: Props) {
    if (!data || data.length === 0) {
        return (
            <Card className="p-6 text-sm text-muted-foreground text-center border-dashed border-2">
                Nenhum dado a exibir. Monte uma consulta e clique em <span className="font-medium">Executar</span>.
            </Card>
        );
    }

    const dimension = selected.find((b) => b.type === "dimension")?.value;
    const isTemporal = dimension?.includes("data") || dimension?.includes("date");

    return (
        <Card className="p-4">
            <CardHeader>
                <CardTitle>Resultado</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {isTemporal ? (
                            <LineChart data={data}>
                                <XAxis dataKey={dimension} />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                            </LineChart>
                        ) : (
                            <BarChart data={data}>
                                <XAxis dataKey={dimension} />
                                <YAxis />
                                <Tooltip />
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.9} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.4} />
                                    </linearGradient>
                                </defs>
                                <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
