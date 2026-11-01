import type { NewsResponse, SourcesResponse } from '../../types.ts';
import AppController from '../controller/controller.ts';
import { AppView } from '../view/appView.ts';



class App {

    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document?.querySelector('.sources')?.addEventListener('click', (e) => this.controller.getNews(e, (data: NewsResponse) => this.view.drawNews(data)));
        this.controller.getSources((data: SourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
