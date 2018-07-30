import axios from 'axios';

$('#closeHourLogForm').on('submit', ajaxCloseHourLogForm);
$('#openHourLogForm').on('submit', ajaxOpenHourLogForm);

function ajaxCloseHourLogForm(e) {
  e.preventDefault();
  axios
    // .get() //TODO confirm no open submissions, flashes
    // .then(res => {
    //
    // })
    .post(this.action)
    .then(res => {
      $('#openHourLogButton').removeClass('d-none');
      $('#closeHourLogButton').addClass('d-none');
    })
    .catch(console.error);
}

function ajaxOpenHourLogForm(e) {
  e.preventDefault();
  axios
    .post(this.action)
    .then(res => {
      $('#openHourLogButton').addClass('d-none');
      $('#closeHourLogButton').removeClass('d-none');
    })
    .catch(console.error);
}