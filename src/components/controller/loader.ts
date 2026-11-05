import type { CallbackType, NewsResponse, SourcesResponse } from "../../types.js";

type UrlOptionsType = Record<string, string>;

interface GetRespArgsInterface {
    endpoint: string,
    options?: UrlOptionsType,
}

enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
};

class Loader {
    private baseLink: string | undefined;
    private options: UrlOptionsType;

    constructor(baseLink: string, options: UrlOptionsType) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<T>(
        { endpoint, options = {} }: GetRespArgsInterface,
        callback: CallbackType<T> = (_data: T) => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(HttpMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: UrlOptionsType, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: HttpMethod, endpoint: string, callback: CallbackType<T>, options: UrlOptionsType = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
