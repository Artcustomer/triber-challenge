/**
 * InstagramAPI
 * 
 * David Massenot 
 */
function InstagramAPI() {
	const ACCESS_TOKEN = '1557175206.9e9226e.883169eedc484085b14071233631c45b';
	const BASE_URL = 'https://api.instagram.com/v1/';
	var errorCallback;
	var progressCallback;
 	var successCallback;
 	
 	/**
 	 * Constructor 
 	 */
 	this.construct = function() {
 		
 	}
 	
 	/**
 	 * Get user data from user id
 	 * 
 	 * @param pUserId 		User ID
 	 * @param pOnSuccess 	Success Callback, with data parameter
 	 * @param pOnFail 		Fail callback, with error status paramater
 	 */
 	this.getUserData = function(pUserId, pOnSuccess, pOnFail) {
		var url = BASE_URL + "users/" + pUserId + "/?access_token=" + ACCESS_TOKEN;
 		
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			url: url,
			success: function(data) {
				pOnSuccess(data);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				pOnFail(xhr.status);
			}
		});
	}
 	
 	/**
 	 * Get user popular feed from user id
 	 * 
 	 * @param pUserId 		User ID
 	 * @param pOnSuccess 	Success Callback, with data parameter
 	 * @param pOnFail 		Fail callback, with error status paramater
 	 */
 	this.getUserRecentFeed = function(pUserId, pOnSuccess, pOnFail) {
		var url = BASE_URL + "users/" + pUserId + "/media/recent?access_token=" + ACCESS_TOKEN;
		
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			url: url,
			success: function(data) {
				pOnSuccess(data);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				pOnFail(xhr.status);
			}
		});
 	}
}