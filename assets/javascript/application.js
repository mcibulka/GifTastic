$( document ).ready( function() {
    var topics = [ "dog", "panda", "confused", "the office", "smiling" ];

    var GIPHY_API_URL = "http://api.giphy.com/v1/gifs/search";
    var API_KEY = "api_key=pPsvHWkzBPkDPeTb5e0JIZdBoPBGEikZ";
    var LIMIT = "limit=10";
    var queryString = "?";

    var q = "q=";       // search query term / phrase
    var queryURL = "";


    for( var i = 0 ; i < topics.length ; i++ ){
        var b = $( "<button type='button' class='btn btn-info topic-btn'>" );
        b.attr( "data-topic", topics[i] );
        b.text( topics[i] );
        $( "#btns-col" ).append( b );
    }


    $( ".topic-btn" ).on( "click", function () {
        q += $(this).attr( "data-topic" );

        queryString += API_KEY;
        queryString += "&" + q;
        queryString += "&" + LIMIT;

        queryURL = GIPHY_API_URL + queryString;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then( function( response ) {
            console.log(response);
        });
    });
});