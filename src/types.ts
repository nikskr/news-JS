export interface ArticleSource {
    id: string;
    name: string;
}


interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type OptionalArticle = MakeOptional<Article, 'author' | 'description' | 'urlToImage' | 'content'>

export type ReadonlyArticle = Readonly<OptionalArticle>;

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
    articles: ReadonlyArticle[];
}

export type CallbackType<T> = (_data: T) => void;