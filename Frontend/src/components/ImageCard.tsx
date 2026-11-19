'use client';
interface ImageCardProps {
    nome?: string;
    tamanho?: number;
    dataUpload?: string;
    src?: string;
    extension?: string;
}
export function ImageCard({ nome, tamanho = 0, dataUpload, src, extension }: ImageCardProps) {
    function download() {
        if (src) window.open(`${src}?download=true`, '_blank', 'noopener,noreferrer');
    }
    return <article className="relative overflow-hidden rounded-md bg-white shadow-md transition-transform duration-300 ease-in hover:-translate-y-2 hover:shadow-lg">
        <button type="button" onClick={download} disabled={!src} aria-label={`Baixar ${nome ?? 'imagem'}`} className="block w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-red-600">
            {/* A API serve o arquivo original, inclusive GIFs animados. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} className="h-56 w-full object-cover" alt={nome ?? 'Imagem da galeria'} loading="lazy" />
        </button>
        <div className="break-words p-4 text-gray-600">
            <h3 className="mb-2 text-lg font-semibold">{nome}</h3>
            <p>{extension === 'JPG' ? 'JPEG' : extension}</p><p>{formatBytes(tamanho)}</p><p>{dataUpload}</p>
        </div>
    </article>;
}
export function formatBytes(bytes: number, decimals = 2): string {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), sizes.length - 1);
    return `${Number((bytes / 1024 ** index).toFixed(Math.max(0, Math.min(20, decimals))))} ${sizes[index]}`;
}
