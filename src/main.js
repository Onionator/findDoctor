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
      $('.doctorName').html(body.data[0].practices[0].accepts_new_patients);
    });

    promiseTwo.then(function (response) {
      let body = JSON.parse(response);
      console.log(body);
      $('.showInsult').html(body.message);
    });
  });
});
