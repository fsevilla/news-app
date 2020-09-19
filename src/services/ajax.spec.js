jest.mock('node-fetch');
import { ajax } from './ajax';
import fetch from 'node-fetch';
const {Response} = jest.requireActual('node-fetch');

function getJson() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  })
}

describe('Test ajax suite', function() {

  it('Get data from url', function() {
    global.fetch = fetch;
    const mockResponse = JSON.stringify([{title:'', url:'', urlToImage:''}]);
    const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey={news_api_key}';
    fetch.mockReturnValue(Promise.resolve(new Response(mockResponse)));

    return ajax.get(url).then(data => {
      expect(data.length).toBe(1);
    });
  })

  it('Get data from url 2', function() {
    return expect(getJson()).resolves.toBe(10);
  })

}); 