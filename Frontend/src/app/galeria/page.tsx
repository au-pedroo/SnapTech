'use client';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Template, ImageCard } from '@/components';
import { useImageService } from '@/resources/image/image.service';
import type { Image } from '@/resources/image/image.resource';

export default function GaleriaPage() {
    const service = useImageService();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState('');
    const [extension, setExtension] = useState('');
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState('');
    async function searchImages(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSearched(false);
        try {
            setImages(await service.buscar(query, extension));
            setSearched(true);
        } catch {
            setImages([]);
            setError('Não foi possível buscar as imagens. Verifique se o servidor está disponível e tente novamente.');
        } finally { setLoading(false); }
    }
    return <Template loading={loading}>
        <h2 className="mb-6 text-2xl font-semibold">Galeria de imagens</h2>
        <section className="my-3 flex flex-col items-center justify-center">
            <form onSubmit={searchImages} className="flex w-full flex-wrap justify-center gap-4">
                <input aria-label="Pesquisar por nome ou tag" placeholder="Pesquisar por nome ou tag" className="min-w-0 flex-1 rounded-lg border px-5 py-2 text-gray-900 sm:min-w-64" value={query} onChange={event => setQuery(event.target.value)} />
                <select aria-label="Formato da imagem" className="rounded-lg border px-4 py-2 text-gray-900" value={extension} onChange={event => setExtension(event.target.value)}>
                    <option value="">Todos os formatos</option><option value="PNG">PNG</option><option value="JPEG">JPEG</option><option value="GIF">GIF</option>
                </select>
                <button disabled={loading} type="submit" className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-500 disabled:cursor-wait disabled:opacity-60">{loading ? 'Buscando…' : 'Buscar'}</button>
                <Link href="/formulario" className="rounded-lg bg-yellow-400 px-4 py-2 text-gray-900 transition-colors hover:bg-yellow-300">Adicionar nova</Link>
            </form>
        </section>
        {error && <p role="alert" className="my-6 text-red-700">{error}</p>}
        <div aria-live="polite">
            {!searched && !loading && !error && <p className="my-8 text-center text-gray-600">Use a busca para encontrar suas imagens.</p>}
            {searched && images.length === 0 && <p className="my-8 text-center text-gray-600">Nenhuma imagem encontrada.</p>}
        </div>
        <section aria-label="Imagens encontradas" className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {images.map(image => <ImageCard key={image.url} nome={image.name} src={image.url} tamanho={image.size} dataUpload={image.uploadDate} extension={image.extension} />)}
        </section>
    </Template>;
}
