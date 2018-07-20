// var router = require('../../routes');

$(function() {

  // scrape artices
  $(document).on('click', '.grab-articles', function(event) {
    event.preventDefault();

    // $.ajax({
    //   method: "GET",
    //   url: "/scrape"
    // }).then(aText => {
    //   console.log(aText);

    //   $.ajax({
    //     method: "GET",
    //     url: "/api/articles"
    //   }).then(articles => {
    //     console.log(articles);
    //     location.reload();
    //   })
    // })

    $.ajax({
      method: "GET",
      url: "/api/articles"
    }).then(articles => {
      console.log('it is about to log artices returned \n');
      console.log('after ajax call \n', articles);
      location.reload();
      // let hostname = window.location.hostname;
      // let host = window.location.host;
      // let redirectUrl = location.protocol + "//" +  host + "/articles";
      // //location.replace(redirectUrl);
      // location.replace("http://localhost:8080/articles");
      // //location.replace("/articles", articles);
    });

    // $.ajax({
    //   method: "GET",
    //   url: "/"
    // }).then(articles => {
    //   // console.log('it is about to log artices returned \n');
    //   // console.log('after ajax call \n', articles);
    // });

  })








})
