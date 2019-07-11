$(function(){
    $('#logData').on('click', function(event){
        let logMail = $('#logEmail').val().trim();
        let logPass = $('#pass').val().trim();
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

            if (response.status == true){
                window.location.assign('/survey/' + response.profile)
            }else if (response.status == false){
                window.location.assign('/profile/' + response.profile)
            }
        })
    })
})
