$(document).ready(function() {

    $( function() {
        $( '.campus-finder input.campus-name' ).autocomplete( {
                source: function( request, response ) {
                        $.ajax( {
                                url: cru_campus_finder_l10n.ministry_search,
                                dataType: 'jsonp',
            async: false,
                                data: {
                                        'name': request.term,
                                        'limit': 10
                                },
                                success: function( data ) {
                                        response( $.map( data, function( item ) {
                                                return {
                                                        label: item.name,
                                                        value: item.name,
                                                        id: item.id
                                                };
                                        } ) );
                                }
                        } );
                },
                minLength: 2,
                autoFocus: true,
                select: function( event, ui ) {
                        $( '.campus-finder input[name="campus-id"]' ).val( ui.item.id );
                        $( '.state-select-title' ).text("");
                        $( '.state-select-results' ).text("");
                        if( $( '.campus-finder form' ).attr( 'action' ) == '' ) {
                                display_campus_finder_results( ui.item.id );
                        }
                        else {
                                $( '.campus-finder input[name="campus-name"]' ).val( ui.item.label );
                                $( '.campus-finder form' ).get( 0 ).submit();
                        }
                }
        } );
    
        $( '.campus-finder input.button' ).click( function() {
                $( '.campus-finder input.campus-name' ).autocomplete( "search" );
        } );
    
        if( $( '.campus-finder input[name="campus-id"]' ).val() != '' ) {
                display_campus_finder_results( $( '.js-campus-finder input[name="campus-id"]' ).val() );
        }
        
    } );

	function display_campus_finder_results( campusid ) {
		$.ajax( {
			url: cru_campus_finder_l10n.ministry_details.replace( '%d', campusid ),
			dataType: 'jsonp',
            async: false,
			data: {
				'active': 1
			},
			success: function( data ) {

				var results = $( '.js-campus-finder-results' ).empty();
				if( data.strategies.length > 0 ) {
					var strategies = $.map( data.strategies, function( item ) {
							if( cru_campus_finder_l10n.ministries[ item.strategy ] ) {
								item.strategy = cru_campus_finder_l10n.ministries[ item.strategy ];
								return item;
							}
							return null;
						} ).sort( function( a, b ) {
							return a.strategy.localeCompare( b.strategy );
						} );
					
					$( '<h2 class="campus-title"></h2>' )
						.text( data.name )
						.appendTo( results );
					
                    var strategyList = $( '<ul class="block-list"></ul>' ).empty();
                    
					$.each( strategies, function( index, item ) {
						var strategy = $( '<details><div class="p-"></div></details>' );
                        
						$( '<summary class="strategy-title"></summary>' )
							.text( item.strategy )
							.appendTo( strategy );
						
						if( item.contacts.length > 0 ) {
							var contactTable = $( '<table class="contacts  table"><tr><td class="col-head" role=columnheader>Name</td><td class="col-head" role=columnheader>Email</td><td class="col-head" role=columnheader>Phone</td></tr></table>');
                            
                            var tableLayout  = $( '<tr></tr>'),
                                titleName    = $( '<td class="col-head row-head" role=columnheader>Name</td>').append( tableLayout ),
                                titleEmail   = $( '<td class="col-head row-head" role=columnheader>Email</td>').append( tableLayout ),
                                titlePhone   = $( '<td class="col-head row-head" role=columnheader>Phone</td>').append( tableLayout );
                                
                            
							$.each( item.contacts, function( index, contact ) {
								var contactRow = $( '<tr></tr>' ),
									name       = contact.preferred + ' ' + contact.last;
                                
                                contactRow.append($('<td class="contact__email">' + name + '</td>'));    
                                
                                
								if( contact.email )
									contactRow.append( 
                                        $( '<td class="contact__email"><a href="mailto:' + contact.email + '">' + contact.email + '<a></td>' ) 
                                    ) ;
                                else
    								contactRow.append( 
                                        $( '<td></td>')
                                    );
                                    
								if( contact.phone )
									contactRow.append( 
                                        $( '<td class="contact__phone">' + contact.phone + '</td>')
                                    );
                                else
    								contactRow.append( 
                                        $( '<td></td>')
                                    );
                                
								contactTable.append( contactRow );
								
							} );
                            
                            tableLayout.append( contactTable );
							strategy.append( contactTable );
						}
                        
						if( item.url )
						// Test for existance of url
						if(item.url != ''){
						// Test to see if fully qualified url, if not add http://
							if(item.url.substr(0,7) != 'http://'){
								item.url = 'http://' + item.url;
								}
							$( '<div class="url"><div>' )
								.append( $( '<a></a>' ).attr( 'href', item.url ).text( item.url.substr(7)) )
								.appendTo( strategy );
						}
						
						if( item.facebook )
							$( '<div class="facebook url"><div>' )
								.append( $( '<a class="social__item  icon-facebook"></a>' ).attr( 'href', item.facebook ) )
								.appendTo( strategy );
						
						//Only add strategy if some form of contact info exists
						if( item.contacts.length > 0 || item.url || item.facebook )
							strategy.appendTo( results );
					} );
                    
                    strategy.appendTo( strategyList );
				}
				// Remove the Campus name if no valid strategies were found
				if( $( '.strategy', results ).size() <= 0 )
					results.empty();

			}
		} );
		
	}


	// State Selection Box
	$('.state-select').change(function() {
		// assign the value to a variable, so you can test to see if it is working
    state = $('.state-select :selected').val();
    if (state != ""){
    	jsonLink = 'http://ml.uscm.org/ministries.json?state=' + state + '&active=true&callback=?';
		getStateResults();
		$(".state-select").prop('selectedIndex',0);
		return false;
		} else {
			// User selected "Select A State" so clear fields
			$(".js-state-select-results").text("");
			$(".js-state-select-title").text("");
        }
    });
	

    // State Select Results
   function getStateResults() {
   	   $(".js-campus-finder-results").text("");
	   var stateSelectTitle ="";
	   var states = {"AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut",
	                  "DE": "Delaware", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", 
	                  "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts",
	                  "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", 
	                  "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota",
	                  "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", 
	                  "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington",
	                  "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming", "DC": "Washington DC"};

    stateSelectTitle = states[state];

    $(".js-state-select-results").text("");
    $(".js-state-select-title").text("Campuses in " + stateSelectTitle).removeClass("mb0");

        $.getJSON(jsonLink,

        function (data) {
            $.each(data, function (key, value) {
                $(".js-state-select-results").append(
                    "<li><a class='ps--  block-link' href='" + value.id + "' name='select'>" + value.name +" <small>(" + value.city + ", " + value.state + ")</small></a></li>");
            });
        });
    }
    


	// State Select Detail Links
	$(document).on("click", "a[name=select]", function(e) {
	    e.preventDefault();
		
		var campusid = this.getAttribute("href");
		display_select_finder_results( campusid );
	});
	
	

	function display_select_finder_results( campusid ) {
		$.ajax( {
			url: cru_campus_finder_l10n.ministry_details.replace( '%d', campusid ),
			dataType: 'jsonp',
			data: {
				'active': 1
			},
			success: function( data ) {
				$(".js-state-select-results, .js-state-select-title").text('');
				var results = $( '.js-state-select-results' ).empty();
				if( data.strategies.length > 0 ) {
					var strategies = $.map( data.strategies, function( item ) {
							if( cru_campus_finder_l10n.ministries[ item.strategy ] ) {
								item.strategy = cru_campus_finder_l10n.ministries[ item.strategy ];
								return item;
							}
							return null;
						} ).sort( function( a, b ) {
							return a.strategy.localeCompare( b.strategy );
						} );
                          
					$( '<h2 class="campus-title"></h2>' )
						.text( data.name )
						.appendTo( results );
					
					$.each( strategies, function( index, item ) {
						var strategy = $( '<div class="strategy"></div>' );
						$( '<h3 class="h4  strategy-title  mb--"></h4>' )
							.text( item.strategy )
							.appendTo( strategy );
						
						if( item.contacts.length > 0 ) {
							var ul = $( '<ul class="contacts  mb-"></ul>');
							$.each( item.contacts, function( index, contact ) {
								var li = $( '<li></li>' ),
									name = contact.preferred + ' ' + contact.last;
								if( contact.email )
									li.append(
										$( '<a></a>' )
											.text( name )
											.attr( 'href', 'mailto:' + contact.email )
									);
								else
									li.text( name );
								if( contact.phone )
									li.append( $( '<span class="phone" style="padding-left:10px;"></span>').text( contact.phone ) );
								
								ul.append( li );
								
							} );
							strategy.append( ul );
						}
						if( item.url )
						// Test for existance of url
						if(item.url != ''){
						// Test to see if fully qualified url, if not add http://
							if(item.url.substr(0,7) != 'http://'){
								item.url = 'http://' + item.url;
								}
							$( '<div class="url"><div>' )
								.append( $( '<a></a>' ).attr( 'href', item.url ).text( item.url ) )
								.appendTo( strategy );
						}
						
						if( item.facebook )
							$( '<div class="facebook url"><div>' )
								.append( $( '<a></a>' ).attr( 'href', item.facebook ).text( item.facebook ) )
								.appendTo( strategy );
						
						//Only add strategy if some form of contact info exists
						if( item.contacts.length > 0 || item.url || item.facebook )
							strategy.appendTo( results );
					} );
				}
				// Remove the Campus name if no valid strategies were found
				if( $( '.strategy', results ).size() <= 0 )
					results.empty();

			}
		} );
		
        
        
	}
    
    
    // Remove jquery-ui helper span
    $(function() {
        $(".js-campus-finder").find("span").remove();
    });
	
});







