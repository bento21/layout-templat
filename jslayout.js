window.vigih = window.vigih || {};
(function( exports,$ ){
var e = {};
exports.custom = e; 

e.init = {
	load : function(e){
		console.log(e)
		console.log(e.target.readyState)
	},
};
e.page = {
	id : '',
	url : '',
	label : '',
	type : '', 
};	
$.fn.el = {
	id : {
		page : $('#page'),
		masthead : $('#masthead'),
		navigation : $('#site-navigation'),
		main : $('#main'),
		post : $('#post'),
		primary : $('#primary'),
		secondary : $('#secondary'),
		comments : $('#comments'),
		colophon : $('#colophon'),
	},

	message : {
		empty : 'Sorry Broo Tidak Ada Data ',
		error : 'Sorry Broo Error ',
		powered : ' Powered By vigihsentosa@gmail.com',
		succes : 'Ok Boss',
	},
	bloginfo : {},
	config : {
		domian : 'http://www.rentalmobildisurabaya.info',
		api_key : '',
		blog_id : '8097587306334701423',
		post_id : '',
		pageId : '',
		api_url : 'https://www.googleapis.com/blogger/v3/blogs/',
		api_url_byurl : 'https://www.googleapis.com/blogger/v3/blogs/byurl?url=',
		_ajax : function(){
			$.ajax({
				url : this.api_url_byurl + this.domian + this.api_key,
				dataType : 'json',
				success: function (data,status){
					if(status === 'success'){
						$.fn.el.bloginfo = data
						$.fn.el.config.blog_id = data.id
					}
				}
			})
		},
	},


};$.fn.el.config._ajax()
})(vigih,jQuery);
