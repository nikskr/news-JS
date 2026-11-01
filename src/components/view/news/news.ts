import type { Article } from '../../../types.ts';
import './news.css';

class News {
    draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        if (!newsItemTemp || !(newsItemTemp instanceof Element)) return;

        news.forEach((item: Article, idx: number) => {


            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (!(newsClone instanceof Element)) return;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const metaAuthor = newsClone.querySelector('.news__meta-author');
            if (metaAuthor) metaAuthor.textContent = item.author || item.source.name;

            const metaDate = newsClone.querySelector('.news__meta-date');
            if (metaDate && item.publishedAt) {
                metaDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }

            const title = newsClone.querySelector('.news__description-title');
            if (title) title.textContent = item.title;

            const source = newsClone.querySelector('.news__description-source');
            if (source) source.textContent = item.source.name;

            const description = newsClone.querySelector('.news__description-content');
            if (description) description.textContent = item.description || '';

            const readMoreLink = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement | null;
            if (readMoreLink) {
                readMoreLink.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
