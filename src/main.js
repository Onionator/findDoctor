import { DoctorFinder } from './findDoctor';
import './css/styles.css'
import $ from 'jquery';
// Protect innocent people by taking away all functionality of the program after 10 seconds
function witnessProtectionProtocol(word) {
  let timer = 10;
  const selfDestruct = setInterval(countDown, 1000);
  function countDown() {
    if (timer > 0) {
      $(`#doctorsList`).html(`<h2>Sorry, but ${word} is in witness protection and no longer goes by that name. If you would like to contact ${word} you will need to get <em>Top Secret</em> level security clearance. This page will self destruct in ${timer} seconds.</h2>`);
      timer--;
    } else {
      clearInterval(selfDestruct);
      $(`body`).text('');
      document.body.style.background = '#000';
      document.body.style.background = 'url(\'https://i1.wp.com/bloody-disgusting.com/wp-content/uploads/2018/12/killer-klowns-makeup.png?w=1272&ssl=1\')';
       document.body.style.backgroundSize = 'cover';
    }
  }
}
// find and display the related results about symptoms when the "Get Help!" button is clicked
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
            <li>phone number: ${body.data[i].practices[0].phones[0].number}</li>
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
  // find and display the related results about doctors when the "Get Info!" button is clicked
  $('.btnDoctor').click(function () {
    $(`#doctorsList`).text('');
    let word = $('#doctor').val();
    $('#doctor').val('');
    let findDoctor = new DoctorFinder();
    let promise = findDoctor.findADoctor(word);
    promise.then(function (response) {
      let body = JSON.parse(response);
      if (body.data.length > 0) {
        for (let i = 0; i < body.data.length; i++) {
          $(`#doctorsList`).append(
            `<div class="doctorsInfo">
            <img src="${body.data[i].profile.image_url}" alt="picture of ${body.data[i].profile.first_name} ${body.data[i].profile.last_name}, ${body.data[i].profile.title}">
            <h2>${body.data[i].profile.first_name} ${body.data[i].profile.last_name}, ${body.data[i].profile.title}</h2>
            <li>${body.data[i].practices[0].visit_address.street} ${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state} ${body.data[i].practices[0].visit_address.zip}</li>
            <li>phone number: ${body.data[i].practices[0].phones[0].number}</li>
            <li>${parseInt(body.data[i].practices[0].distance)} miles away.</li>
            <li>Taking new patients: ${body.data[i].practices[0].accepts_new_patients}</li>
            <li>website: ${body.data[i].practices[0].website}</li>
            </div>`
          );
        }
      } else {
        witnessProtectionProtocol(word);
      }
    });
  });
});
