$(function(){
    event.preventDefault()
      });
    $('#submitData').on('click', function(event){
        let userMail = $('#userEmail').val().trim();
        let userPass = $('#userPass').val().trim();
        let userName = $('#userName').val().trim();
        let passVer = $('#userPassVer').val().trim();

        if(userPass === passVer){
            let userCreds = {
                email: userMail,
                password: userPass,
                username: userName,
                hostname: window.location.host
            }
            $.ajax('/create',{
                type: 'POST',
                data: userCreds
            }).then(
                function(){
                    console.log('Account has been created');
                    location.reload();
                })
        }else {
            alert('Passwords do not match')
        }
        
        
        // //If checkbox is ticked, sends the results to the server to be added to the database
        // if($('#exampleCheck1').is(':checked')){
        // $.ajax('/create',{
        //     type: 'POST',
        //     data: userCreds
        // }).then(
        //     function(){
        //         console.log('Account has been created');
        //         location.reload();
        //     }
        // )}else {
        //     alert('Before proceeding you need to accept the TOS.')
        // }
    })