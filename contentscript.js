/*
 * AJAX fetch xml feed for chosen city. Calculate greatest need, and set location as appropriate
 * @copyright: Richard Parnaby-King
 * @url: http://richard.parnaby-king.co.uk
 */
//get city from settings
var city;
chrome.storage.local.get("city_name", function(value) {
	city = value.city_name;
	
	//check if city has been chosen
	if(city == undefined || city.length < 1) {
		alert('No city chosen. Please edit options and select a city');
		return false;
	}
	
	//perform ajax get on city
	var url = 'http://' + city + '.myminicity.com/';
	jQuery.get(
		url + 'xml',
		{},
		function(data){
			var city = jQuery(data).find('city'),
				urls = {
					'pollution':'env',
					'criminality':'sec',
					'transport':'tra',
					'unemployment':'com'
				},
				issue = {
					value: 0,
					name: ''
				};
			for (var prop in urls) {
				if(urls.hasOwnProperty(prop)){
					var value = city.find(prop).text();
					if(value > issue.value) {
						issue.value = value;
						issue.name = prop;
					}
				}
			}
			chrome.runtime.sendMessage({"message": "open_new_tab", "url": url + urls[issue.name]});
		},
		'xml'
	);
});
