import Link from 'next/link';
import type { ReactNode } from 'react';
interface TemplateProps { children: ReactNode; loading?: boolean; }
export function RenderIf({ condition = true, children }: { condition?: boolean; children: ReactNode }) {
    return condition ? children : null;
}
function Loading() {
    return <div role="status" className="my-4 flex items-center justify-center gap-3 text-gray-600">
        <span aria-hidden="true" className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-red-600 motion-reduce:animate-none" />
        <span>Carregando…</span>
    </div>;
}
export function Template({ children, loading = false }: TemplateProps) {
    return <>
        <header className="bg-red-600 py-3 text-white"><div className="container mx-auto flex items-center justify-between px-4">
            <Link href="/" className="text-3xl font-bold">SnapTech</Link><Link href="/galeria" className="rounded px-3 py-2 hover:bg-red-500">Galeria</Link>
        </div></header>
        <main aria-busy={loading} className={`container mx-auto mt-8 flex-1 px-4 text-gray-900 ${loading ? 'animate-pulse motion-reduce:animate-none' : ''}`}>
            <RenderIf condition={loading}><Loading /></RenderIf>{children}
        </main>
        <footer className="mt-8 bg-red-600 py-4 text-center text-white">SnapTech · Galeria de imagens</footer>
    </>;
}
