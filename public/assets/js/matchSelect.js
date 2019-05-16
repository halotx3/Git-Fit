// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {




    $('.gitfit-accept').on('click', function(event){
        console.log("Yellow");
    })

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
      $.ajax('/buddies/' + "6", {
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
      $.ajax('/buddies/block' + id, {
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