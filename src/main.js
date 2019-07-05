import { DoctorFinder } from './findDoctor';
import $ from 'jquery';

$(document).ready(function () {
  $('.define').click(function () {
    $(`#doctorsList`).text('');
    let word = $('#word').val();
    $('#word').val('');
    let findDoctor = new DoctorFinder();
    let promise = findDoctor.findADoctor(word);

    promise.then(function (response) {
      let body = JSON.parse(response);
      console.log(body);
      for (let i = 0; i < body.data.length; i++) {
        $(`#doctorsList`).append(
          `<h2>${body.data[i].practices[0].name}</h2>
          <li>${body.data[i].practices[0].visit_address.street} ${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state} ${body.data[i].practices[0].visit_address.zip}</li>
          <li>${parseInt(body.data[i].practices[0].distance)} miles away.</li>
          <li>Taking new patients: ${body.data[i].practices[0].accepts_new_patients}</li>
          <li>website: ${body.data[i].practices[0].website}`
        );
      }
    });
  });
});
