import { apiKey } from './../.env';
export class DoctorFinder {
  findADoctor(word) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${word}&location=45.515%2C-122.679%2C100&user_location=45.515%2C-122.679&skip=0&limit=10&user_key=${apiKey}`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }

      };
      request.open('GET', url, true);
      // request.setRequestHeader('Accept', 'application/json');
      request.send();
    });
  }
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
