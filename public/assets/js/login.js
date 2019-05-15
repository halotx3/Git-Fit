$(function(){
    $('#logData').on('click', function(event){
        updateData = {
            email: $('#logEmail').val().trim(),
            password: $('#logPass').val().trim()
        }
        $.ajax('/verify', {
            type: 'PUT',
            data: updateData
        }).then(function(data){
            console.log(data)
        })
    })
});