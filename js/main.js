/**
 * Main Class
 * 
 * David Massenot 
 */

$( document ).ready(function() {
	//const ID = '1557175206';	// David
	const ID = '4191795';		// François
	
	var _api = new InstagramAPI();
	
	construct();
	
	
	/**
	 * Constructor
	 */
	function construct() {
		_api.getUserData(ID, onGetUserSuccess, onGetUserFail);
	}
	
	
	/**
	 * Callback when user data is loaded
	 * 
	 * @param {Object} pData
	 */
	function onGetUserSuccess(pData) {
		$('.profile-logo').prepend('<img id="theImg" src="' + pData.data.profile_picture + '" />');
		$('.profile-name').append(jQuery('<a>').attr('href', getInstagramUserUrl(pData.data.username)).text(pData.data.full_name));
		$('.profile-id').text('ID : ' + pData.data.id);
		
		_api.getUserRecentFeed(ID, onGetFeedsSuccess, onGetFeedsFail);
	}
	
	/**
	 * Callback when loading user failed
	 * 
	 * @param {String} pStatus
	 */
	function onGetUserFail(pStatus) {
		alert('Error while loading user data ! ' + pStatus);
	}
	
	/**
	 * Callback when feeds are loaded
	 * 
	 * @param {Object} pData
	 */
	function onGetFeedsSuccess(pData) {
		var i = 0;
		var length = pData.data.length;
		var vo;
		
		for (i ; i < length ; ++i) {
			vo = pData.data[i];
			trace(vo);
			$('.items-list').append(htmlCellFactory(i, vo));
		}
	}
	
	/**
	 * Callback when loading feeds failed
	 * 
	 * @param {String} pStatus
	 */
	function onGetFeedsFail(pStatus) {
		alert('Error while loading feeds ! ' + pStatus);
	}
	
	/**
	 * Get user url by username.
	 * 
	 * @param {String} pUserName
	 */
	function getInstagramUserUrl(pUserName) {
		return 'http://instagram.com/' + pUserName;
	}
	
	/**
	 * Create html element for displaying list item
	 * 
	 * @param {Integer} pIndex
	 * @param {Object} pVo
	 * @return
	 */
	function htmlCellFactory(pIndex, pVo) {
		var caption;
		
		if (pVo.caption != null) {
			caption = pVo.caption.text;
		} else {
			caption = 'Untitled';
		}
		
		var html = '<div class="col-sm-4 col-xs-6">';
		html += '<div class="panel panel-default">';
		html += '<div class="panel-thumbnail"><img src="' + pVo.images.standard_resolution.url + '" class="img-responsive"></div>';
		html += '<div class="panel-body">';
		html += '<a href="' + pVo.link + '" target="_blank"><p class="lead">' + truncText(caption, 30) + '</p></a>';
		html += '<p>';
		html += pVo.comments.count + ' Comment(s), ' + pVo.likes.count + ' Like(s)';
		html += '</p>';
		html += '<p><span class="glyphicon glyphicon-time"></span> ' + getDate(pVo.created_time) + '</p>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		return html;
	}
	
	/**
	 * Truncate text
	 * 
	 * @param {String} pText
	 */
	function truncText(pText, pMaxChars) {
		var lText = pText;
		
		if (lText.length >= pMaxChars) {
			lText = lText.substring(0, pMaxChars - 3);
			lText += '...';
		}
		
		return lText;
	}
	
	/**
	 * Get Date from time.
	 * 
	 *  @param {Integer} pTime
	 */
	function getDate(pTime) {
		var date = new Date();
		date.setTime(pTime);
		return date.toString();
	}
	
	
	/**
	 * Trace value in console .
	 * 
	 * @param {Object} pRest
	 */
	function trace(pRest) {
		console.log(pRest);
	}
});