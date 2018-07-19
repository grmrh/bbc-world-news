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
  })





























})