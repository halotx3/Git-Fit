
$(function(){


$('.btn').on('click', function (e){
  console.log('Mapping..............');


  const id = this.id;


  console.log(id);

  $.get(`/profile/${id}`, function (response){

    // JSON.stringify(response)
    let matchedUserLat = response[0].hlatitude
    let matchedUserLong = response[0].hlongitude
    console.log(matchedUserLat)
    console.log(matchedUserLong)

  })



})
})
