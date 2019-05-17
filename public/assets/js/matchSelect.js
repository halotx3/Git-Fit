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
        // const user_id1 = req.params.id
        // const id = $(this).data('burgerid');
        console.log("hello");
      const matchid = this.dataset.profilematchid;
      
      console.log(matchid);

    // let pick = false
  
      const selected = {
        // approved: pick,
        profilematchid: matchid
      };
      console.log(selected);
  
      // Send the PUT request.
      $.ajax('/profile/' + "6", {
        type: 'PUT',
        data: selected
      }).then(
        function() {
          console.log('changed accept', pick);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $('.gitfit-block').on('click', function(event) {
        // const user_id1 = req.params.id

      const matchid = $(this).data('profilematchid');
      console.log(matchid);

    let pick = false
  
      const selected = {
        block: pick
      };
      console.log(selected);
  
      // Send the PUT request.
      $.ajax('/profile/block' + id, {
        type: 'PUT',
        data: selected
      }).then(
        function() {
          console.log('changed block', pick);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

  

  });