$(function () {
    // Image Upload
    let dataurl = ""

    function previewFile() {

        // var url = window.location.pathname;
        // var idProfile = url.substring(url.lastIndexOf('/') + 1);

        var preview = document.getElementById('pre');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();
        

        reader.addEventListener("load", function () {
            preview.src = reader.result;
            console.log(preview.src)
            dataurl = preview.src

            if (!dataurl.match(/data:image.*/) ){
                console.log("Reselect picture")
                dataurl = "https://dummyimage.com/197x217/87BED8/white.jpg&text=no+profile+picture"
            }

        }, false);

            console.log(file)
        if (file) {
            reader.readAsDataURL(file);
            let dataurl2 = document.getElementById("pre").src

        }
 
    }

$('#pic').on("change", previewFile);

    // End Image Uplaod



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
                console.log('create profile for', idProfile);
                window.location.assign('/profile/' + data.data)
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
