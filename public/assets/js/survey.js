$(function(){
    $('#submit-survey').on('click', function(event){
        event.preventDefault();
        console.log ('  Test survey.js');
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
            secondarylevel: secondaryLvl
        };
        
        console.log ('userProfile', userProfile )
        
        $.post('/survey', userProfile)
            .then(function(data) {
            console.log(data)
        });

     })
})

