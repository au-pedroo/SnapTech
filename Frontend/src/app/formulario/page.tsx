'use client';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Template } from '@/components';
import { useImageService } from '@/resources/image/image.service';
export default function FormularioPage() {
    const service = useImageService();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    async function save(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const file = data.get('file');
        const name = String(data.get('name') ?? '').trim();
        const tags = String(data.get('tags') ?? '').split(',').map(tag => tag.trim()).filter(Boolean);
        setSuccess(false); setError('');
        if (!name || !(file instanceof File) || !file.size) { setError('Informe o nome e selecione uma imagem.'); return; }
        if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type) || file.size > 30 * 1024 * 1024) { setError('Escolha uma imagem PNG, JPEG ou GIF com até 30 MB.'); return; }
        setLoading(true);
        try { await service.salvar(name, tags, file); form.reset(); setSuccess(true); }
        catch (cause) { setError(cause instanceof Error ? cause.message : 'Erro ao salvar imagem.'); }
        finally { setLoading(false); }
    }
    return <Template loading={loading}><form onSubmit={save} className="mx-auto max-w-xl space-y-6">
        <h2 className="text-2xl font-semibold">Adicionar imagem</h2>
        <p className="text-gray-600">Preencha os dados e escolha uma imagem para a galeria.</p>
        <div><label htmlFor="name" className="mb-2 block font-medium">Nome da imagem</label><input id="name" name="name" required maxLength={255} className="w-full rounded-lg border px-4 py-2" /></div>
        <div><label htmlFor="tags" className="mb-2 block font-medium">Tags</label><input id="tags" name="tags" maxLength={255} placeholder="computador, memória, peças" className="w-full rounded-lg border px-4 py-2" /><p className="mt-1 text-sm text-gray-600">Separe as tags por vírgulas.</p></div>
        <div><label htmlFor="file" className="mb-2 block font-medium">Arquivo da imagem</label><input id="file" name="file" type="file" required accept="image/png,image/jpeg,image/gif" className="w-full rounded-lg border border-dashed p-6 file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-3 file:py-2" /><p className="mt-1 text-sm text-gray-600">PNG, JPEG ou GIF. Até 30 MB.</p></div>
        {error && <p role="alert" className="text-red-700">{error}</p>}
        {success && <p role="status" className="text-green-700">Imagem salva com sucesso! <Link href="/galeria" className="underline">Ver galeria</Link></p>}
        <div className="flex gap-4"><button type="submit" disabled={loading} className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500 disabled:opacity-60">{loading ? 'Salvando…' : 'Salvar imagem'}</button><Link href="/galeria" className="rounded-lg border px-4 py-2 hover:bg-gray-100">Voltar</Link></div>
    </form></Template>;
}
