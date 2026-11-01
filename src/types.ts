export interface ArticleSource {
    id: string;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourceItem {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface SourcesResponse {
    status: string;
    sources: SourceItem[];
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export type SourcesCallback = (data: SourcesResponse) => void;
export type NewsCallback = (data: NewsResponse) => void;
export type LoadCallbackType<T> = (data: T) => void;