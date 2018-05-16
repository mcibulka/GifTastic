$( document ).ready( function() {
    /* Constants */
    var GIPHY_API_URL = "http://api.giphy.com/v1/gifs/search";
    var API_KEY = "api_key=pPsvHWkzBPkDPeTb5e0JIZdBoPBGEikZ";
    var LIMIT = "limit=10";
    var ANIMATED = "animated";
    var STILL = "still";
    

    /* Variables */
    var topics = [ "dog", "panda", "confused", "the office", "smiling" ];


    buildTopicsBar();

    function buildTopicsBar () {
        var $topicBtns = $( "#topic-btns");
        $topicBtns.empty();

        for( var i = 0 ; i < topics.length ; i++ ){
            var $b = $( "<button type='button' class='btn btn-info topic-btn'>" );
            $b.attr( "data-topic", topics[i] );
            $b.text( topics[i] );
            $topicBtns.append( $b );
        }
    }


    $( "#topic-btns" ).on( "click", ".topic-btn", function() {
        var q = "q=";           // search query term / phrase
        var queryString = "?";
        var queryURL = "";

        q += $( this ).attr( "data-topic" );

        queryString += API_KEY;
        queryString += "&" + q;
        queryString += "&" + LIMIT;

        queryURL = GIPHY_API_URL + queryString;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then( function( response ){
            var data = response.data;   // array of GIFs matching search criteria 
            console.log(data[0]);

            $( "#gifs-row" ).empty();

            for( var i = 0 ; i < data.length ; i++ ){
                var $gifCol = $( "<div class='d-flex p-2 justify-content-center col'>");
                var $gifDiv = $( "<div class='d-flex flex-column'>");

                var stillURL = data[i].images.fixed_height_still.url;
                var animatedURL = data[i].images.fixed_height.url;
                var title = data[i].title;

                $gifDiv.append( $( "<h5 class='gif-rating'>" ).text( "Rating: " + data[i].rating.toUpperCase() ) );
                $gifDiv.append( $( "<img class='gif-img'>" ).attr({ 
                    "src": stillURL,
                    "alt": title,
                    "data-fixed-h-still": stillURL,
                    "data-fixed-h": animatedURL,
                    "data-gif-status": STILL
                }));

                $gifCol.append( $gifDiv );
                $( "#gifs-row").append( $gifCol ); 
            }
        });
    });


    $( "#gifs-row" ).on( "click", ".gif-img", function() {
        var $gifStatus = $( this ).attr( "data-gif-status" );
        
        if( $gifStatus === STILL ){
            $( this ).attr( "src", $( this ).attr( "data-fixed-h" ) );
            $( this ).attr( "data-gif-status", ANIMATED );
        }
        else{   // must be ANIMATED
            $( this ).attr( "src", $( this ).attr( "data-fixed-h-still" ) );
            $( this ).attr( "data-gif-status", STILL );
        }
    });


    $( "#add-btn" ).on( "click", function(event) {
        event.preventDefault();
        topics.push( $( "#add-topic" ).val().trim() );
        buildTopicsBar();
    });
});