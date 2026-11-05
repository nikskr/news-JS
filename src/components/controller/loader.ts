import type { LoadCallbackType, NewsCallback, SourcesCallback } from "../../types.js";

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
    baseLink: string | undefined;
    options: UrlOptionsType;

    constructor(baseLink: string, options: UrlOptionsType) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: GetRespArgsInterface,
        callback: LoadCallbackType<T> = (_data: T) => {
            console.error('No callback for GET response');
        }
    ) {
        this.load(HttpMethod.GET, endpoint, callback as NewsCallback | SourcesCallback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: UrlOptionsType, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: HttpMethod, endpoint: string, callback: NewsCallback | SourcesCallback, options: UrlOptionsType = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
