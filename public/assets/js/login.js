//Modal functionality for Login Page 
$(document).ready(function(){
    $('.modal').modal();
});


$(function(){
    $('#submitData').on('click', function(event){
        let userMail = $('#userEmail').val().trim();
        let userPass = $('#userPass').val().trim();
        let fName = $('#firstName').val().trim()
        let lName = $('#lastName').val().trim()
        console.log(userMail);
        console.log(userPass);
        let userCreds = {
            email: userMail,
            password: userPass,
            firstname: fName,
            lastname: lName
        }
        $.ajax('/create',{
            type: 'POST',
            data: updateData,
            dataType: 'json' 
        }).done(function(response){
            window.location.assign('/profile/' + response.profile)
        })
    })
})
