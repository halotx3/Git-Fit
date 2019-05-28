$(function(){
    $('#submitData').on('click', function(event){
        let fName = $('#idFirstName').val().trim()
        let lName = $('#idLastName').val().trim()
        let genderM = $('#idgenderMale').val().trim();
        let genderF = $('#idgenderFemale').val().trim();
        let homeStreet = $('#idHomeStr').val().trim();
        let homeCity = $('#idHomeCity').val().trim();
        let homeState = $('#idHomeState').val().trim();
        let homeZip = $('#idHomeZip').val().trim();
        let mPhone = $('#idMobilePh').val().trim()
        
        let gymStreet = $('#idGymStreet').val().trim()
        let gymCity = $('#idGymCity').val().trim()
        let gymState = $('#idGymState').val().trim()

        let primaryEx = $('#idPrExcer').val().trim()
        let secondaryEx = $('idScExcer').val().trim()

        let primaryLvl = $('idprlevel').val().trim()
        let secondaryLvl = $('idsclevel').val().trim()


        
        let userProfile = {
            firstname: fName,
            lastname: lName,
            gendermale: genderM,
            genderfemale: genderF,
            homestreet: homeStreet,
            homecity: homeCity,
            homestate: homeState,
            homezip: homeZip,
            mobile: mPhone,

            gymstreet: gymStreet,
            gymcity: gymCity,
            gymstate: gymState,

            primaryexcer: primaryEx,
            secondaryexer: secondaryEx,
            primarylevel: primaryLvl,
            secondarylevel: secondaryLvl
        };
        
        //If checkbox is ticked, sends the results to the server to be added to the database
        $.ajax('/create',{
            type: 'POST',
            data: profile
        }).then(function(){
            
            console.log(data)
        });

    })
})

