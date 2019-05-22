// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

    var url = window.location.pathname;
    console.log(url)
    var id = url.substring(url.lastIndexOf('/') + 1);
    console.log(id)

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

    $('#gitfit-accept').on('click', function(event) {

  
      // Send the PUT request.
      $.ajax('/profile/' + id, {
        type: 'PUT',
        data: id
      }).then(
        function() {
          console.log('changed accept', id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $('.gitfit-block').on('click', function(event) {
  
      // Send the PUT request.
      $.ajax('/profile/block' + id, {
        type: 'PUT',
        data: id
      }).then(
        function() {
          console.log('changed block', id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

  

  });