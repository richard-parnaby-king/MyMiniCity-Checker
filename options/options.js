// Saves options to localStorage.
function save_options() {
  var city_name = document.getElementById("city_name").value;

	chrome.storage.local.set({'city_name': city_name}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById("status");
		status.innerHTML = "Options Saved.";
		setTimeout(function() {
			status.innerHTML = "";
		}, 750);
  });
}

// Restores select box state to saved value from localStorage.
function restore_options() {
	chrome.storage.local.get("city_name", function(value) {
		value = value.city_name;
		if (value === undefined || !value) {
			return;
		}
		
		var el = document.getElementById("city_name");
		el.value = value;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);