/**
 * @name util.js
 * @fileOverview
 * @version 1.0
 * @author <a href="mailto:imai@4digit.jp">Kotaro Imai</a> @ <a href="http://hokypoky.info">HOKYPOKY.</a>
 * @description
 * <p>JavaScript Utility Library</p>
 * <p>(c) FOURDIGIT Inc. Licensed <a href="http://ja.wikipedia.org/wiki/GNU_General_Public_License">GNU General Public License</a>.</p>
 */
if (typeof jp == "undefined") {
	/**
	 * @namespace
	 * @description
	 * <p>namespace : jp</p>
	 */
	var jp = {};
}
if (typeof jp.fourdigit == "undefined") {
	/**
	 * @namespace
	 * @description
	 * <p>namespace : foudigit.jp</p>
	 */
	jp.fourdigit = {};
}

/**
 * @class Utility Core Class
 * @description
 * <p>FOURDIGIT Inc jQuery Plugins Core Class</p>
 */
jp.fourdigit.core = new function () {
	jQuery.extend({
		/**
		 * 基準JS(id)のbasePathを返す
		 * @function
		 * @param {String}	id 基準となるJSファイルのid名
		 * @param {String}	delimiter セパレートする文字列
		 * @return {String}
		 * @example
		 * basePath("jqueryJS","common/js"); -> return path to jqueryJS(default)
		 */
		basePath : (function (id,delimiter) {
			var _id = (id ? id : "jqueryJS");
			var _delimiter = (delimiter ? delimiter : "common/js");
			return document.getElementById(_id).src.split(_delimiter)[0];
		})(),
		/**
		 * userAgentをbodyのクラスとして追加する
		 * @function
		 */
		addClassUA : function() {
			var ua = navigator.userAgent.toLowerCase();
			var _os = (
				/(x11|linux)/.test(ua)?	"linux":
				/mac/.test(ua)?			"mac":
				/win/.test(ua)?			"win":
				""
			)
			if(_os != "") jQuery("body").addClass(_os);
			var _browser = (
				jQuery.browser.safari?	"safari":
				jQuery.browser.msie?	"msie":
				jQuery.browser.opera?	"opera":
				jQuery.browser.mozilla?	"mozilla":
				""
			)
			if(_browser != "") jQuery("body").addClass(_browser);
			if(_browser == "msie") {
				var _version = (
					jQuery.browser.version == "5.0"? "ie50":
					jQuery.browser.version == "5.5"? "ie55":
					jQuery.browser.version == "6.0"? "ie6":
					jQuery.browser.version == "7.0"? "ie7":
					jQuery.browser.version == "8.0"? "ie8":
					""
				)
				if(_version != "") jQuery("body").addClass(_version);
			}
		},
		/**
		 * 対象のリンクをポップアップする
		 * @function
		 * @param {String}	src ポップアップ先のURL
		 * @param {String}	windowName ウィンドウ名
		 * @param {Boolean}	status メニューバーの有無
		 */
		popWindow: function(src,windowName,status) {
			var _href		= (src ? src : "");
			var _isPop		= (status != null);
			var _windowName = (windowName ? windowName : "");
			if(_isPop){
				var _features = "";
				if(status.width != null)      _features += ",width="+Math.min(status.width, screen.availWidth);
				if(status.height != null)     _features += ",height="+Math.min(status.height, screen.availHeight-50);
				if(status.left != null)       _features += ",left="+status.left;
				if(status.top != null)        _features += ",top="+status.height;
				if(status.menubar != null)    _features += ",menubar="+status.menubar;
				if(status.toolbar != null)    _features += ",toolbar="+status.toolbar;
				if(status.location != null)   _features += ",location="+status.location;
				if(status.status != null)     _features += ",status="+status.status;
				if(status.resizable != null)  _features += ",resizable="+status.resizable;
				if(status.scrollbars != null) _features += ",scrollbars="+status.scrollbars;
				_features = _features.replace(/^,/,"");
				void(window.open(_href, _windowName, _features));
			} else {
				void(window.open(_href, _windowName, null));
			}
		},
		/**
		 * ExternalInterface用
		 * @return {DOMObject}
		 */
		AS: function(str) { return (jQuery.browser.msie? window[str]: document[str]); },
		/**
		 * 対象の要素を含んでいるかどうかを判別
		 * @function
		 * @param {String}	expr CSS形式での対象要素
		 * @return {Boolean}
		 * @example
		 * if(jQuery.hasElem("#index")){
		 *	alert("#indexがあります。");
		 * }else{
		 *	alert("#indexがありません。");
		 * }
		 */
		hasElem: function (expr) { return jQuery(expr)[0]; }
	})
};
/**
 * @class Utility Element Class
 * @description
 * <p>FOURDIGIT Inc. jQuery Plugins Element Class</p>
 */
jp.fourdigit.fn = new function () {
	jQuery.fn.extend({
		/**
		 * IE5/6でもPNGを利用可能にする
		 * @function
		 * @return {jQuery}
		 * @example
		 * jQuery("img.png").enablePNG();
		 * jQuery("img['src'$='png']").enablePNG();
		 */
		enablePNG: function(){
			if(jQuery.browser.msie && /\.png/.test(this.src)){
				var defSrc = this.src;
				this.src = jQuery.basePath+'common/js/space.gif';
				this.style.filter =　'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+defSrc+'",sizingMethod="scale")';
			}
			return this;
		},
		/**
		 * IE6/5+ winXP SP2 KB912945の修正による白枠対策
		 * @function
		 * @return {jQuery}
		 * @example	
		 * jQuery("object, embed").enableFlash();
		 */
		enableFlash: function(){
			if(jQuery.browser.msie){
				this.each(function () {
					this.removeAttribute('data');
					this.outerHTML += "";
				});
			}
			return this;
		},
		/**
		 * 対象要素のイメージをオーバーした際に画像のパスをfname.extからfname_ov.extにする
		 * @function
		 * @return {jQuery}
		 * @example
		 * jQuery("img.ahover, .ahoverArea img").easyOver();
		 */
		easyOver: function(){
			var preImgArr = new Array();
			this.each(function(){
				var src = this.src;
				var isov = src.substring(0,src.lastIndexOf('.'));
				if( !/_(ov|on|off)$/.test(isov) ) {
					var ftype = src.substring(src.lastIndexOf('.'), src.length);
					var hsrc = src.replace(ftype, '_ov'+ftype);
					var dsrc = src;
					preImgArr.push(new Image());
					preImgArr[preImgArr.length-1].src = hsrc;
					jQuery(this)
						.attr('hsrc', hsrc)
						.attr('dsrc', dsrc)
						.mouseover(function(e){this.src = jQuery(this).attr('hsrc');jQuery(this).enablePNG()})
						.mouseout(function(e){this.src = jQuery(this).attr('dsrc')})
						//.click(function(e){if(jQuery.browser.safari) jQuery(this).mouseout();})
					.end();
				}
			});
			return this;
		},
		/**
		 * 対象要素のリンクをポップアップにする
		 * @function
		 * @return {jQuery}
		 * @example
		 * jQuery("a.commonPop").easyPop();
		 */
		easyPop: function(){
			this.each(function(){
				var relArr = this.rel.split(",");
				var rel = {};
				for (var i = 0; i < relArr.length; i++) {
					var _key = relArr[i].split(":")[0];
					var _val = relArr[i].split(":")[1];
					rel[_key] = _val;
				}
				this.target = "_self";
				jQuery(this).click(function(){
					jQuery.popWindow(this.src,"",rel);
				});
			})
			return this;
		},
		/**
		 * 対象要素のリンクもGoogleAnalyticsに情報を送る
		 * @function
		 * @return {jQuery}
		 * @example
		 * jQuery("a").blankLogToGoogle();
		 * jQuery("a['target'='_blank']").blankLogToGoogle();
		 */
		blankLogToGoogle: function() {
			this.each(function(){
				var expr = new RegExp("(.*)://(/?)(.*?)/");
				var h = this.href;
				var hArr = h.match(expr);
				var l = location.href;
				var lArr = l.match(expr);
				if(hArr[0] != lArr[0]) {
					var str = h.replace(/\?/g, "%3F");
					jQuery(this).click(
						function(){
							pageTracker._trackPageview('/blank/?'+str);
						}
					);
				}
			});
			return this;
		},
		/**
		 * 対象要素がページないリンクだった場合、イージングでスクロールするようにする
		 * @function
		 * @return {jQuery}
		 * @example
		 * jQuery("a[href*=#]").smoothScroll();
		 */
		smoothScroll: function (speed) {
			var pagePath = (/#/.test(location.href) ? location.href.split('#')[0] : location.href);
			this.each(function(){
				var actX, actY, tarY = 0, tarX = 0, scrollInt;
				speed = (!speed? 6: speed == "fast"? 3:	speed == "normal"? 6: speed == "slow"? 12: speed);
				var setScroll = function (tarX,tarY) {
					actX += (tarX - actX) / parseInt(speed);
					actY += (tarY - actY) / parseInt(speed);
					if(Math.abs(tarX - actX) < 1 && Math.abs(tarY - actY) < 1){
						clearInterval(scrollInt);
						scrollTo(Math.round(tarX),Math.round(tarY));
					}else {
						scrollTo( Math.round(actX), Math.round(actY));
					}
				}
				var anc = this.href.split('#')[1];
				if( /#/.test(this.href)  && this.href.match(pagePath) && jQuery('#'+anc)[0] ){
					this.href="javascript:void(0);";
					jQuery(this).click(function (){
						var tarObj = jQuery('#'+anc);
						tarX = (jQuery(document).width() > tarObj.position().left + jQuery(window).width())
							? tarObj.position().left
							: jQuery(document).width() - jQuery(window).width();
						tarY = (jQuery(document).height() > tarObj.position().top + jQuery(window).height())
							? tarObj.position().top
							: jQuery(document).height() - jQuery(window).height();
						actX = jQuery(document).scrollLeft();
					 	actY = jQuery(document).scrollTop();
						clearInterval(scrollInt);
						scrollInt = setInterval(function(){setScroll(tarX,tarY)}, 20);
					});
				}
				//stop when mousewheel
				var wheel = function () {clearInterval(scrollInt);}
				if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
				window.onmousewheel = document.onmousewheel = wheel;
			});
			return this;
		},
		/**
		 * 対象要素をスクロールに追従するようにする(CSSでabsoluteにしている必要あり)
		 * @function
		 * @param {String}	stopper	スクロールを止める要素のid名
		 * @param {Number|String}	speed	スクロールのスピード。
		 * @return {jQuery}
		 * @example
		 * jQuery("#fix").fixPosition();	// normalと同じ
		 * jQuery("#fix").fixPosition("slow");
		 * jQuery("#fix").fixPosition("normal");
		 * jQuery("#fix").fixPosition("fast");
		 * jQuery("#fix").fixPosition(12);	// slowと同じ
		 * jQuery("#fix").fixPosition(6);	// normalと同じ
		 * jQuery("#fix").fixPosition(3);	// fastと同じ
		 * jQuery("#fix").fixPosition(100);	// すごく遅いのでオススメしない
		 */
		fixPosition: function (stopper,speed) {
			speed = (!speed? 6: speed == "fast"? 3:	speed == "normal"? 6: speed == "slow"? 12: speed);
			var fixScrollTop     = function () { return jQuery(document).scrollTop()};
			var fixScrollBottom  = function () { return jQuery(document).scrollTop()+jQuery(document).height()};
			this.each(function(){
				var obj = this;
				var offsetY		= function(){ return jQuery(obj).offset().top };
				var posY		= function(){ return jQuery(obj).position().top };
				var boxHeight	= jQuery(obj).height();
				var topLimit	= posY();
				var bottomLimit;
				var fix_idle	= 10;
				var intervalID;
				var easeScroll = function (stopper) {
					if (fix_idle <= 0) {
						var bottom = offsetY() + boxHeight;
						var tar = Math.max(fixScrollTop(), topLimit);
						if ( stopper && ( tar + boxHeight ) > bottomLimit ) {
							tar =  bottomLimit -　boxHeight;
						}
						var nPos = (tar - offsetY()) / speed + posY();
						obj.style.top = nPos + 'px';
					} else {fix_idle--; }
				};
				if(document.getElementById(stopper)){
					var stopObj = document.getElementById(stopper);
					bottomLimit = jQuery(stopObj).position().top;
					intervalID = setInterval(function(){easeScroll("stopper")}, 20);
				}else {
					intervalID = setInterval(function(){easeScroll()}, 20);
				}
				document.onscroll = function() { fix_idle = 10; }
			});
			return this;
		},
		/**
		 * openerが存在したらopenerのURLを、存在しなかったら自身のURLを対象要素のhref変える。
		 * @function
		 * @return {jQuery}
		 * @example
		 * jQuery("a.moveOpener").moveOpener();
		 */
		moveOpener: function(pFile){
			this.each(function(){
				jQuery.moveOpener(this.href);
			});
			return this;
		}
	});
}