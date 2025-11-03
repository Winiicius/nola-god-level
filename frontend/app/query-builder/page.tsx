"use client";


import QueryBuilder from "./_components/QueryBuilder";


export default function QueryBuilderPage() {
    return (
        <main className="flex flex-col h-screen bg-background text-foreground">
            <header className="flex items-center justify-between px-6 h-16 border-b border-border bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm bg-primary" />
                    <h1 className="text-lg font-semibold tracking-tight">Nola Analytics</h1>
                </div>
                <div className="text-xs text-muted-foreground">Light · Modern UI</div>
            </header>


            <QueryBuilder />
        </main>
    );
}