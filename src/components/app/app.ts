import type { NewsResponse, SourcesResponse } from '../../types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';



class App {

    public controller: AppController;
    public view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        document?.querySelector('.sources')?.addEventListener('click', (e) => this.controller.getNews(e, (data: NewsResponse) => this.view.drawNews(data)));
        this.controller.getSources((data: SourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
