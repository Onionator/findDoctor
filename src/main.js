import { DoctorFinder } from './findDoctor';
import $ from 'jquery';

$(document).ready(function () {
  $('.define').click(function () {
    let word = $('#word').val();
    $('#word').val('');
    let findADoctor = new DoctorFinder();
    let promise = findADoctor.goAway(word);





    
    promise.then(function (response) {
      let body = JSON.parse(response);
      console.log(body);
      $('.showInsult').html(body.message);
    });
  });

});
