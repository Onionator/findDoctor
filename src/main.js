import { DoctorFinder } from './findDoctor';
import $ from 'jquery';

$(document).ready(function () {
  $('.btnSymptoms').click(function () {
    $(`#doctorsList`).html('');
    let word = $('#symptoms').val();
    $('#symptoms').val('');
    let findDoctor = new DoctorFinder();
    let promise = findDoctor.findADoctor(word);
    promise.then(function (response) {
      let body = JSON.parse(response);
      console.log(body);
      if (body.data.length > 0) {
        for (let i = 0; i < body.data.length; i++) {
          $(`#doctorsList`).append(
            `<div class="doctorsInfo">
            <h2>${body.data[i].practices[0].name}</h2>
            <li>${body.data[i].practices[0].visit_address.street} ${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state} ${body.data[i].practices[0].visit_address.zip}</li>
            <li>${parseInt(body.data[i].practices[0].distance)} miles away.</li>
            <li>Taking new patients: ${body.data[i].practices[0].accepts_new_patients}</li>
            <li>website: ${body.data[i].practices[0].website}</li>
            </div>`
          );
        }
      } else {
        $(`#doctorsList`).html(`<h1>Sorry, but we can't help you with your ${word}. Now go away.</h1>`);
      }
    });
  });
  $('.btnDoctor').click(function () {
    $(`#doctorsList`).text('');
    let word = $('#doctor').val();
    $('#doctor').val('');
    let findDoctor = new DoctorFinder();
    let promise = findDoctor.findADoctor(word);
    promise.then(function (response) {
      let body = JSON.parse(response);
      if (body.data.length > 0) {
        console.log(body);
        for (let i = 0; i < body.data.length; i++) {
          $(`#doctorsList`).append(
            `<div class="doctorsInfo">
            <img src="${body.data[i].profile.image_url}" alt="picture of ${body.data[i].profile.first_name} ${body.data[i].profile.last_name}, ${body.data[i].profile.title}">
            <h2>${body.data[i].profile.first_name} ${body.data[i].profile.last_name}, ${body.data[i].profile.title}</h2>
            <li>${body.data[i].practices[0].visit_address.street} ${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state} ${body.data[i].practices[0].visit_address.zip}</li>
            <li>${parseInt(body.data[i].practices[0].distance)} miles away.</li>
            <li>Taking new patients: ${body.data[i].practices[0].accepts_new_patients}</li>
            <li>website: ${body.data[i].practices[0].website}</li>
            </div>`
          );
        }
      } else {
        let timer = 10;
         countDown =>  {
          if (timer > 0) {
            $(`#doctorsList`).html(`<h1>Sorry, but ${word} is in witness protection and no longer goes by that name. If you would like to contact ${word} you will need to get <em>Top Secret</em> level security clearance. This page will self destruct in ${timer} seconds.</h1>`);
            timer--;
          } else {
            clearInterval(selfDestruct);
            $(`#doctorsList`).text('');
            $('body').style.backgroundColor = '#000';
          }
          const selfDestruct = setInterval(countDown, 1000);
        }
      }
    });
  });
});
