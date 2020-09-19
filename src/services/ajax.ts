class Ajax {
  get(url):Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(url).then(response => response.json()).then(data => {
        resolve(data);
      })
    });
  }
}

export const ajax = new Ajax();