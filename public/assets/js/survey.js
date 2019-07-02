$(function() {
  // Image Upload
  let url = ""

  function previewFile() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    // reader.addEventListener("load", function () {
    reader.addEventListener("load", function() {
      preview.src = reader.result;
    }, false);

    // reader.onload = function(event){

    // }

    if (file) {
      reader.readAsDataURL(file);
      url = document.getElementById("pre").src
      console.log(url)

      // attr.src
    }
  }

  $('#pic').on("change", previewFile);




  // var reader = new FileReader();
  // console.log(reader.readAsDataURL());

  // var data = canvas.toDataURL('/assets/img/spin.jpg');
  // $('.pic').fileupload('option', 'formData').file = data;
  // $('.pic').fileupload('add', { files: [data] });
  // console.log()

  // End Image Uplaod


  $('#submit-survey').on('click', function(event) {
    event.preventDefault();
    console.log('  Test survey.js');
    let fName = $('#FirstName').val().trim();
    let lName = $('#LastName').val().trim();
    let gendermf = $('#idgender').val().trim();
    let homeStreet = $('#HomeStr').val().trim();
    let homeCity = $('#HomeCity').val().trim();
    let homeState = $('#HomeState').val().trim();
    let homeZip = $('#HomeZip').val().trim();
    let mPhone = $('#Mobile').val().trim();

    let gymName = $('#idGymName').val().trim();
    let gymStreet = $('#idGymStreet').val().trim();
    let gymCity = $('#idGymCity').val().trim();
    let gymState = $('#idGymState').val().trim();
    let gymZip = $('#idGymZip').val().trim();

    let primaryEx = $('#PrExcer').val().trim();
    let secondaryEx = $('#idScExcer').val().trim();

    let primaryLvl = $('#idprlevel').val().trim();
    let secondaryLvl = $('#idsclevel').val().trim();

    // if(!url){
    //     url = document.getElementById("pre").src
    // }


    let userProfile = {
      firstname: fName,
      lastname: lName,
      // gender: genderM ? genderM : genderF,
      gender: gendermf,
      homestreet: homeStreet,
      homecity: homeCity,
      homestate: homeState,
      homezip: homeZip,
      mobile: mPhone,
      gymname: gymName,
      gymstreet: gymStreet,
      gymcity: gymCity,
      gymstate: gymState,
      gymzip: gymZip,
      primaryexcer: primaryEx,
      secondaryexer: secondaryEx,
      primarylevel: primaryLvl,
      secondarylevel: secondaryLvl,
      photo: url

    };
    console.log(userProfile)


    console.log('userProfile', userProfile)

    // $.post('/survey', userProfile)
    //   .then(function(data) {
    //     // console.log(data)
    //   });




    // console.log("ghvjughguhigvjkhjgvj")
    //
    $.post('/api/survey', {
      data: userProfile
    }).then(function() {
      console.log("273gfbjda7u")
    

    });


    // console.log ('userProfile', userProfile )

    // $.post('/survey', userProfile)
    //     .then(function(data) {
    //     console.log(data)
    // });
    // $.get(`/survey/`, (response)=>{
    //
    //   console.log(response)
    // }).then(function(){
    //   console.log("Updatd")
    // })
    $.post('/survey', {
      data: userProfile
    }).then(function(userProfile) {
      // console.log(userProfile);
      console.log("HELJADLFKJALKAJLKJL")
    })
  })
})
