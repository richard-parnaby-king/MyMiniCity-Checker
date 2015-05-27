/*
 * @copyright: Richard Parnaby-King
 * @url: http://richard.parnaby-king.co.uk
 */

//When user clicks on button, run script
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, { file: "jquery-1.11.3.min.js" }, function() {
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
							//All other values need to be as close to 0 as possible. Transport needs to be as close to 100 as possible.
							if(prop == 'transport') {
								value = 100 - value;
							}
							if(value > issue.value) {
								issue.value = value;
								issue.name = prop;
							}
						}
					}
					chrome.tabs.create({"url": url + urls[issue.name]});
				},
				'xml'
			);
		});
	});
});

