$(function () {
    // Image Upload
    let url = ""

    function previewFile() {

        var url = window.location.pathname;
        var idProfile = url.substring(url.lastIndexOf('/') + 1);
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
            url = document.getElementById("pre").src
            console.log(url)

            // var idProfile = url.substring(url.lastIndexOf('/') + 1);
            if (url === `http://localhost:3000/survey/${idProfile}`){
                console.log("Reselect picture")
                //  let imgNew = $('#pre').attr('src') + date.getTime();
                // previewFile();
                reader.addEventListener("reload", function () {
                    preview.src = reader.result;
                }, false);
                reader.readAsDataURL(file);
                
                imgNew = document.getElementById("pre").src
                console.log(`The correct image is: ${imgNew}`);
                // location.reload();
                // url = document.getElementById("pre").src
                // console.log(`The correct image is: ${url}`)
            }

            // attr.src
        }
    }

    $('#pic').on("change", previewFile);

    // End Image Uplaod

    // var id = url.substring(url.lastIndexOf('/') + 1);


    $('#submit-survey').on('click', function (event) {
        var url = window.location.pathname;
        var idProfile = url.substring(url.lastIndexOf('/') + 1);

        event.preventDefault();
        console.log('******Test survey.js*****');
        console.log(idProfile);

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

            photo: url,
            cred_id: idProfile

        };
        console.log(userProfile)


        // console.log('userProfile', userProfile)

        $.post(`/survey/${idProfile}`, userProfile)
            .then(function (data) {
                // console.log(data)
                console.log('create profile for', idProfile)
            });

    })
})

