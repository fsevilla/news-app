import { setPageTitle } from './app';
import handlebars from 'handlebars';

const mockHTML = `<h1 id="heading">{{title}}</h1>`;

describe('test application', function() {

  it('should load the app', function() {
    document.body.innerHTML = mockHTML;
    global.Handlebars = handlebars;
    setPageTitle();
    expect(document.getElementById('heading').innerHTML).toBe('News Application');
  }) 

})
