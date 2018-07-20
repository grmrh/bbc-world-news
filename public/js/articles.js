<<<<<<< HEAD
$(function(){
  $('.grab-articles').on('click', function(event) {
    event.preventDefault();

    

=======
$(function() {

  // scrape artices
  $(document).on('click', '.grab-articles', function(event) {
    event.preventDefault();

    $.ajax({
      method: "GET",
      url: "/scrape"
    }).then(articles => {
      console.log(articles);
    })
>>>>>>> afae8cc376d72666ff93814d884151e16a2a228b
  })









<<<<<<< HEAD
});
=======




















})
>>>>>>> afae8cc376d72666ff93814d884151e16a2a228b
