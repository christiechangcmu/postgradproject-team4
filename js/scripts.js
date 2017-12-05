
$(document).ready(function() {
	///////SMOOTH SCROLL//////////
	// Cache selectors
	var lastId,
	 topMenu = $("#sidebar"),
	 topMenuHeight = topMenu.outerHeight()+1,
	 // All list items
	 menuItems = topMenu.find("a"),
	 // Anchors corresponding to menu items
	 scrollItems = menuItems.map(function(){
		 var item = $($(this).attr("href"));
		 if (item.length) { return item; }
	 });

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e){
	  var href = $(this).attr("href"),
		  offsetTop = href === "#" ? 0 : $(href).offset().top-25;
		console.log("offsetTop: " + offsetTop);
		$('html, body').stop().animate({
		  scrollTop: offsetTop
	  }, 850);
	  e.preventDefault();
	});

	$(window).scroll(function(){
	   // Get container scroll position
		 var fromTop = $(this).scrollTop();
	   // Get id of current scroll item
	   var cur = scrollItems.map(function(){
			 if ($(this).offset().top < fromTop) {
			   return this;
			 }
	   });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";

	   if (lastId !== id) {
		   lastId = id;
	   }
	});

		$("#sidebar").mCustomScrollbar({
			theme: "minimal"
		});

		$('#sidebarCollapse').on('click', function () {
			$('#sidebar, #content').toggleClass('active');
			$('.collapse.in').toggleClass('in');
		});

		$("#sidebar").on('click', function() {
			console.log("clicked");
			$('a[aria-expanded=true]').attr('aria-expanded', false);
			$('a[aria-expanded=false]').attr('aria-expanded', false);
		});

		Highcharts.setOptions({
		 colors: [ '#4774CE', '#6C90D8', '#91ACE2', '#B5C7EB', '#DAE3F5',]
		});

		Highcharts.chart('students-chart', {
			chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: 'pie'
			},
			title: {
					text: '2016 CMU Destination Outcomes \n (68 Total Graduates)'
			},
			tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
					pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
									enabled: true,
									format: '<b>{point.name}</b>: {point.percentage:.1f} %',
									style: {
											color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
									}
							}
					}
			},
			series: [{
					name: 'Percentage',
					colorByPoint: true,
					data: [{
							name: 'Employed (56 Students)',
							y: 82.35
					}, {
							name: 'Continuing Education (5 Students)',
							y: 7.35,
							sliced: true,
							selected: true
					}, {
							name: 'No Information Available (4 Students)',
							y: 5.88
					}, {
							name: 'Seeking Employment (3 Students)',
							y: 4.41
					},]
			}]
	});

	//GEOGRAPHIC MAP
	var data = [
    ['us-ma', 2],
    ['us-wa', 1],
    ['us-ca', 15],
    ['us-or', 0],
    ['us-wi', 2],
    ['us-me', 0],
    ['us-mi', 0],
    ['us-nv', 0],
    ['us-nm', 0],
    ['us-co', 0],
    ['us-wy', 0],
    ['us-ks', 0],
    ['us-ne', 0],
    ['us-ok', 0],
    ['us-mo', 0],
    ['us-il', 6],
    ['us-in', 0],
    ['us-vt', 0],
    ['us-ar', 0],
    ['us-tx', 0],
    ['us-ri', 0],
    ['us-al', 0],
    ['us-ms', 0],
    ['us-nc', 0],
    ['us-va', 6],
    ['us-ia', 0],
    ['us-md', 0],
    ['us-de', 0],
    ['us-pa', 3],
    ['us-nj', 3],
    ['us-ny', 11],
    ['us-id', 0],
    ['us-sd', 0],
    ['us-ct', 1],
    ['us-nh', 0],
    ['us-ky', 0],
    ['us-oh', 0],
    ['us-tn', 0],
    ['us-wv', 0],
    ['us-dc', 0],
    ['us-la', 0],
    ['us-fl', 0],
    ['us-ga', 0],
    ['us-sc', 0],
    ['us-mn', 0],
    ['us-mt', 0],
    ['us-nd', 0],
    ['us-az', 0],
    ['us-ut', 0],
    ['us-hi', 1],
    ['us-ak', 0],
    ['undefined', 51]
];

// Create the chart
Highcharts.mapChart('map-container', {
    chart: {
        map: 'countries/us/us-all'
    },

    title: {
        text: 'Student Employment (Class of 2016) Distribution Map'
    },

    subtitle: {
        text: 'Hover over the map to see where Information Systems students ended up!'
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        min: 0,
				max:20
    },

    series: [{
        data: data,
        name: 'Random data',
        states: {
            hover: {
                color: '#F0A78A'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }, {
            name: 'Separators',
            type: 'mapline',
            data: Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
            color: 'silver',
            showInLegend: false,
            enableMouseTracking: false
        }]
});
// 	var mapData = [
//     {
//         "value": 438,
//         "code": "NJ"
//     },
//     {
//         "value": 387.35,
//         "code": "RI"
//     },
//     {
//         "value": 312.68,
//         "code": "MA"
//     },
//     {
//         "value": 271.4,
//         "code": "CT"
//     },
//     {
//         "value": 209.23,
//         "code": "MD"
//     },
//     {
//         "value": 195.18,
//         "code": "NY"
//     },
//     {
//         "value": 154.87,
//         "code": "DE"
//     },
//     {
//         "value": 114.43,
//         "code": "FL"
//     },
//     {
//         "value": 107.05,
//         "code": "OH"
//     },
//     {
//         "value": 105.8,
//         "code": "PA"
//     },
//     {
//         "value": 86.27,
//         "code": "IL"
//     },
//     {
//         "value": 83.85,
//         "code": "CA"
//     },
//     {
//         "value": 72.83,
//         "code": "HI"
//     },
//     {
//         "value": 69.03,
//         "code": "VA"
//     },
//     {
//         "value": 67.55,
//         "code": "MI"
//     },
//     {
//         "value": 65.46,
//         "code": "IN"
//     },
//     {
//         "value": 63.8,
//         "code": "NC"
//     },
//     {
//         "value": 54.59,
//         "code": "GA"
//     },
//     {
//         "value": 53.29,
//         "code": "TN"
//     },
//     {
//         "value": 53.2,
//         "code": "NH"
//     },
//     {
//         "value": 51.45,
//         "code": "SC"
//     },
//     {
//         "value": 39.61,
//         "code": "LA"
//     },
//     {
//         "value": 39.28,
//         "code": "KY"
//     },
//     {
//         "value": 38.13,
//         "code": "WI"
//     },
//     {
//         "value": 34.2,
//         "code": "WA"
//     },
//     {
//         "value": 33.84,
//         "code": "AL"
//     },
//     {
//         "value": 31.36,
//         "code": "MO"
//     },
//     {
//         "value": 30.75,
//         "code": "TX"
//     },
//     {
//         "value": 29,
//         "code": "WV"
//     },
//     {
//         "value": 25.41,
//         "code": "VT"
//     },
//     {
//         "value": 23.86,
//         "code": "MN"
//     },
//     {
//         "value": 23.42,
//         "code": "MS"
//     },
//     {
//         "value": 20.22,
//         "code": "IA"
//     },
//     {
//         "value": 19.82,
//         "code": "AR"
//     },
//     {
//         "value": 19.4,
//         "code": "OK"
//     },
//     {
//         "value": 17.43,
//         "code": "AZ"
//     },
//     {
//         "value": 16.01,
//         "code": "CO"
//     },
//     {
//         "value": 15.95,
//         "code": "ME"
//     },
//     {
//         "value": 13.76,
//         "code": "OR"
//     },
//     {
//         "value": 12.69,
//         "code": "KS"
//     },
//     {
//         "value": 10.5,
//         "code": "UT"
//     },
//     {
//         "value": 8.6,
//         "code": "NE"
//     },
//     {
//         "value": 7.03,
//         "code": "NV"
//     },
//     {
//         "value": 6.04,
//         "code": "ID"
//     },
//     {
//         "value": 5.79,
//         "code": "NM"
//     },
//     {
//         "value": 3.84,
//         "code": "SD"
//     },
//     {
//         "value": 3.59,
//         "code": "ND"
//     },
//     {
//         "value": 2.39,
//         "code": "MT"
//     },
//     {
//         "value": 1.96,
//         "code": "WY"
//     },
//     {
//         "value": 0.42,
//         "code": "AK"
//     }
// ];
// 	Highcharts.mapChart('map-container', {
//
// 	        chart: {
// 	            borderWidth: 1
// 	        },
//
// 	        title: {
// 	            text: 'Employment Distribution'
// 	        },
//
// 	        legend: {
// 	            layout: 'horizontal',
// 	            borderWidth: 0,
// 	            backgroundColor: 'rgba(255,255,255,0.85)',
// 	            floating: true,
// 	            verticalAlign: 'top',
// 	            y: 25
// 	        },
//
// 	        mapNavigation: {
// 	            enabled: true
// 	        },
//
// 	        colorAxis: {
// 	            min: 1,
// 	            type: 'logarithmic',
// 	            minColor: '#EEEEFF',
// 	            maxColor: '#000022',
// 	            stops: [
// 	                [0, '#EFEFFF'],
// 	                [0.67, '#4444FF'],
// 	                [1, '#000022']
// 	            ]
// 	        },
//
// 	        series: [{
// 	            animation: {
// 	                duration: 1000
// 	            },
// 	            data: mapData,
// 	            mapData: Highcharts.maps['countries/us/us-all'],
// 	            joinBy: ['postal-code', 'code'],
// 	            dataLabels: {
// 	                enabled: true,
// 	                color: '#FFFFFF',
// 	                format: '{point.code}'
// 	            },
// 	            name: 'Employment Density',
// 	            tooltip: {
// 	                pointFormat: '{point.code}: {point.value}'
// 	            }
// 	        }]
// 	    });

			var textArray=[];
		$('#directory-table tr').each(function(row, tr){
		    textArray.push($(tr).find('td:eq(1)').text());  // Date;
		});
		var textArray= textArray.filter(function(a){return a !== '&'});
		var text=textArray.join(" ");


		// var text = 'Software Developer Business Analyst Software Engineer UX Desginer Software Desginer';
var lines = text.split(/[,\. ]+/g),
    lines= lines.filter(function(a){return a !== '&'});
    lines= lines.filter(function(a){return a !== '-'});
    lines= lines.filter(function(a){return a !== 'of'});
    lines= lines.filter(function(a){return a !== 'job'});
    lines= lines.filter(function(a){return a !== 'in'});
    lines= lines.filter(function(a){return a !== 'TBD'});
    lines= lines.filter(function(a){return a !== 'LDP'});
    lines= lines.filter(function(a){return a !== 'Title'});
    lines= lines.filter(function(a){return a !== 'GTO'});
    lines= lines.filter(function(a){return a !== 'Job'});
    lines= lines.filter(function(a){return a !== 'II'});
    lines= lines.filter(function(a){return a !== 'Position'});
    lines= lines.filter(function(a){return a !== 'Unknown'});
    lines= lines.filter(function(a){return a !== 'Untitled'});
    data = Highcharts.reduce(lines, function (arr, word) {
        var obj = Highcharts.find(arr, function (obj) {
            return obj.name === word;
        });
        if (obj) {
            obj.weight += 1;
        } else {
            obj = {
                name: word,
                weight: 1
            };
            arr.push(obj);
        }
        return arr;
    }, []);


//WORD CLOUD
Highcharts.seriesTypes.wordcloud.prototype.deriveFontSize = function (relativeWeight) {
   var maxFontSize = 25;
  // Will return a fontSize between 0px and 25px.
  return Math.floor(7+maxFontSize * relativeWeight);
};

Highcharts.chart('cloud-container', {
		    credits: {
		        enabled: false
		    },
		    series: [{
		        type: 'wordcloud',
		        data: data,
		        name: 'Occurrences'
		    }],
		    title: {
		        text: 'Wordcloud of Job Keywords'
		    }
		});


//SALARY STAT
	Highcharts.chart('salary-container', {
		chart: {
        type: 'column'
    },
    title: {
        text: 'Salary Statistics'
    },
    subtitle: {
        text: 'Salaries that post-graduate Information Systems received from 2012 to 2016'
    },
    xAxis: {
        categories: [
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Dollars ($)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} USD</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Average',
        data: [67000, 71500, 106400, 67000, 82000,]

    }, {
        name: 'Median',
        data: [83600, 78800, 82500, 56000, 75000, ]

    }, {
        name: 'Lowest',
        data: [50000, 56000, 49000, 56000, 60000,]

    }, {
        name: 'Highest',
        data: [100000, 120000, 97000, 92000,115000]

    }]
	});


});
