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
        data: id
      }).then(
        function() {
          console.log('create the match', id);
          // Reload the page to get the updated list
          location.reload();
 
        }
      );

      $('#gitfitAccept').on('click', function() {
        console.log("clicked on accept button")
        console.log(url)
        console.log(id)
        $.ajax('/profile/' + id, {
          type:'PUT',
          data: id
        }).then(
          function(){
            console.log('Accepted match', id);
            location.reload();
          }        
        )    
    
      });
    
  
    $('#gitfitBlock').on('click', function(event) {
      console.log("clicked on block button")
      // Send the PUT request.
      $.ajax('/profile/block/' + id, {
        type: 'PUT',
        data: id
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


