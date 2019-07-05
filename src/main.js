import { DoctorFinder } from './findDoctor';
import $ from 'jquery';

$(document).ready(function () {
  $('.define').click(function () {
    let word = $('#word').val();
    $('#word').val('');
    let findDoctor = new DoctorFinder();
    let promise = findDoctor.findADoctor(word);
    let promiseTwo = findDoctor.goAway(word);

    promise.then(function (response) {
      let body = JSON.parse(response);
      console.log(body);
      for (let i = 0; i < 3; i++) {
        $(`#doctorName${i}`).html(body.data[i].practices[0].name);
        $(`#doctorAddress${i}`).html(`${body.data[i].practices[0].visit_address.street} ${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state} ${body.data[i].practices[0].visit_address.zip}`);
        $(`#doctorDistance${i}`).html(`${parseInt(body.data[i].practices[0].distance)} miles away.`);
        $(`#takingNewPatients${i}`).html(` Taking new patients: ${body.data[i].practices[0].accepts_new_patients}`);
        $(`#doctorWebsite${i}`).html(body.data[i].practices[0].website);
      }
    });

    promiseTwo.then(function (response) {
      let body = JSON.parse(response);
      console.log(body);
      $('.showInsult').html(body.message);
    });
  });
});
