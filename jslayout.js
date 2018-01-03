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
	related_Html : {
		page : '<div id="related-post" class="related-post">',
		widget_title : '<p class="rp_widget_title">',
		label_rp : '<span class="label_rp"> Artikel Terkait </span>',
		box : '<ul class="box_rp">',
		img : function(url,title,img){
			return '<li class="box_img"><a href="'+url+'"><img alt="'+title+'" src="'+img+'"></a></li>';
		},
		title : function(url,title){
			return '<li class="rp_title"><a href="'+url+'"> '+ title +' </a></li>';
		},
		snipet : function(content){
			return '<li class="rp_snipet">' + content.replace(/<[^>]+>/g,'').substring(0, 160) + '[...]' + '</li>';
		},
		urls : function(link){
			for (var i = 0; i < link.length; i++) {
				if(link[i].rel == 'alternate' && link[i].type == 'text/html'){
					return link[i].href;
				}		
			}
		},
	},
	config : {
		text_domian : 'http://www.rentalmobildisurabaya.info',
		domian : 'http://www.rentalmobildisurabaya.info&key=AIzaSyCYr5iqw8P3EQh1HbDhkYmdi-m3PbUL6do',
		api_key : '?key=AIzaSyCYr5iqw8P3EQh1HbDhkYmdi-m3PbUL6do',
		blog_id : '8097587306334701423',
		post_id : '1182361318161600876',
		pageId : '',
		api_url : 'https://www.googleapis.com/blogger/v3/blogs/',
		api_url_byurl : 'https://www.googleapis.com/blogger/v3/blogs/byurl?url=',
		url_label : '/feeds/posts/default/-/',
		label_max : '?alt=json-in-script&max-results=5',
		_ajax : function(){
			$.ajax({ 
				url : this.api_url_byurl + this.domian,
				dataType : 'json',
				success: function (data,status){
					if(status === 'success'){
						$.fn.el.bloginfo = data
						$.fn.el.config.blog_id = data.id
					}
				}
			}) // By Url

			$.ajax({ 
				url : this.api_url + this.blog_id + '/posts/' + this.post_id + this.api_key,
				dataType : 'json',
				success: function (data,status){
					if(status === 'success'){
						$.fn.el.config.relatedPost(data.labels[0])
					}
				}
			}) // By Post Id
		},

		relatedPost : function(label){
			$.ajax({ 
				method : 'GET',
				url : this.text_domian + this.url_label + label + this.label_max,
				dataType : 'jsonp',
				jsonpCallback : 'callback',
				success: function (data,xhr){
					if (xhr == 'success') {
						$.fn.related = '';
						$.fn.related += $.fn.el.related_Html.page;

						$.fn.related += $.fn.el.related_Html.widget_title;
						$.fn.related += $.fn.el.related_Html.label_rp;
						$.fn.related += '</p>';

						for (var i = 0; i < data.feed.entry.length; i++) {
						$.fn.related += $.fn.el.related_Html.box;
							$.fn.related += $.fn.el.related_Html.img(
								$.fn.el.related_Html.urls(data.feed.entry[i].link),
								data.feed.entry[i].title.$t,
								data.feed.entry[i].media$thumbnail.url
								);
							$.fn.related += $.fn.el.related_Html.title(
								$.fn.el.related_Html.urls(data.feed.entry[i].link),data.feed.entry[i].title.$t
								);
							$.fn.related += $.fn.el.related_Html.snipet(data.feed.entry[i].content.$t);							
						$.fn.related += '</ul>';
						}
						$.fn.related += '</div>';
						return $.fn.el.id.post.append($.fn.related);
						//return $.fn.related;
					}// if success	

				}

			}) // relatedPost			
		}
	},


};$.fn.el.config._ajax()
})(vigih,jQuery);
