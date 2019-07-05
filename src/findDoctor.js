export class DoctorFinder {
  goAway(word) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://www.foaas.com/${word}/Sam`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }

      };
      request.open('GET', url, true);
      request.setRequestHeader('Accept', 'application/json');
      request.send();
    });

  }
}
