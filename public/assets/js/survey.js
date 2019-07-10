$(function () {
    // Image Upload
    let dataurl = ""



    function previewFile() {

        // var url = window.location.pathname;
        // var idProfile = url.substring(url.lastIndexOf('/') + 1);

        var preview = document.querySelector('img');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        // reader.addEventListener("load", function () {
        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        // reader.onload = function(event){
        // }

        if (file) {
            reader.readAsDataURL(file);
            dataurl = document.getElementById("pre").src
            console.log(dataurl)

            // var idProfile = url.substring(url.lastIndexOf('/') + 1);
            if (!dataurl.match(/data:image.*/) ){
                console.log("***Reselect picture***")
                // let dataReview = reader.readAsBinaryString(file)
                // console.log(dataReview);
                dataurl = "https://dummyimage.com/197x217/87BED8/white.jpg&text=no+profile+picture"
            }

            // attr.src
        }
        else{
            console.log("no picture uploaded")
            dataurl = "https://dummyimage.com/197x217/87BED8/white.jpg&text=no+profile+picture"
        }
    }

    // function handleFiles() {
    //     const fileList = this.files; /* now you can work with the file list */
    //   }

$('#pic').on("change", previewFile);

    // End Image Uplaod



// $('#pic').on("change", info)


// let info = function(){
//     var reader = new FileReader();
//     var dataOutput = reader.result;
//     console.log(dataOutput)
//     // let info = reader.readAsDataURL(file);
//     // console.log(info)
// }



    // var id = url.substring(url.lastIndexOf('/') + 1);


    $('#submit-survey').on('click', function (event) {
        var url2 = window.location.pathname;
        var idProfile = url2.substring(url2.lastIndexOf('/') + 1);

        event.preventDefault();
        console.log('******Test survey.js*****');
        console.log(idProfile);

        let fName = $('#FirstName').val().trim();
        let lName = $('#LastName').val().trim();
        let gendermf = $('idgender').val();
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

        let primaryEx = $('#PrExcer').val();
        let secondaryEx = $('#idScExcer').val();

        let primaryLvl = $('#idprlevel').val();
        let secondaryLvl = $('#idsclevel').val();

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

            photo: dataurl,
            cred_id: idProfile

        };
        console.log(userProfile)


        // console.log('userProfile', userProfile)

        $.post(`/survey/${idProfile}`, userProfile)
            .then(function (data) {
                // console.log(data)
                console.log('create profile for', idProfile)
            }).then(function(userProfile) {
              // console.log(userProfile);
            //   console.log("HELJADLFKJALKAJLKJL")
            })
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


})
