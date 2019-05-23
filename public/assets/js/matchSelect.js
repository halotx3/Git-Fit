// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

  $('#messageArea').hide();

  // variables fro the URL with the ID
    var url = window.location.pathname;
    // console.log(url)
    var id = url.substring(url.lastIndexOf('/') + 1);
    // console.log(id)

    $.ajax('/profile/match/' + id, {
        type: 'PUT',
        // data: id
      }).then(
        function() {
          console.log('create the match', id);
          // Reload the page to get the updated list
          location.reload();
 
        }
      );

      $('.btn-success').on('click', function(event) {
        console.log("clicked on accept button")

        // console.log(url)
        // console.log(id)
        const profilematchid = $(event.target).data('profilematchid')
        // const profilematchid = $('.btn-success').data('profilematchid')
        console.log(profilematchid)
        $.ajax(`/profile/${id}`, {
          type:'PUT',
          data: {profilematchid: profilematchid}
        }).then(
          function(){
            console.log('Accepted match', id);
            location.reload();
          }        
        )    
    
      });
    
  
    $('.btn-dark').on('click', function(event) {
      console.log("clicked on block button")
      // Send the PUT request.
      const profilematchid = $(event.target).data('profilematchid')
      console.log(profilematchid)
      $.ajax(`/profile/block/${id}`, {
        type: 'PUT',
        data: {profilematchid: profilematchid}
      }).then(
        function() {
          console.log('Match block', id);
          // Reload the page to get the updated list
          location.reload();
        }

      );
    });

    $('#gitfitMessage').on('click', function(){
      $('#messageArea').show();
    })

  

  });


