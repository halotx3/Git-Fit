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
        
        //If checkbox is ticked, sends the results to the server to be added to the database
        if($('#exampleCheck1').is(':checked')){
        $.ajax('/create',{
            type: 'POST',
            data: userCreds
        }).then(
            function(){
                console.log('Account has been created');
                location.reload();
            }
        )}else {
            alert('Before proceeding you need to accept the TOS.')
        }
    })
})