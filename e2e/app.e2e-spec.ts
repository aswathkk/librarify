import { LibrarifyPage } from './app.po';

describe('librarify App', () => {
  let page: LibrarifyPage;

  beforeEach(() => {
    page = new LibrarifyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
