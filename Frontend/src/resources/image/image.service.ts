import type { Image } from '@/resources/image/image.resource';
class ImageService {
    baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/v1/images';
    async buscar(query = '', extension = ''): Promise<Image[]> {
        const params = new URLSearchParams({ query, extension });
        const response = await fetch(`${this.baseURL}?${params}`);
        if (!response.ok) throw new Error('Erro ao buscar imagens.');
        return response.json();
    }
    async salvar(name: string, tags: string[], file: File): Promise<void> {
        const data = new FormData();
        data.append('name', name);
        data.append('tags', tags.join(','));
        data.append('file', file);
        const response = await fetch(this.baseURL, { method: 'POST', body: data });
        if (!response.ok) throw new Error('Não foi possível salvar a imagem. Verifique o arquivo e tente novamente.');
    }
}
const service = new ImageService();
export const useImageService = () => service;
