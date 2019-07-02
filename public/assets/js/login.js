$(function(){
    $('#logData').on('click', function(event){
        let logMail = $('#logEmail').val().trim();
        let logPass = $('#logPass').val().trim();
        updateData = {
            email: logMail,
            password: logPass
        };
        console.log(updateData)
        $.ajax('/api/verify', {
            type: 'POST',
            data: updateData,
            dataType: 'json' 
        }).done(function(response){
            window.location.assign('/profile/' + response.profile)
        })
    })
});