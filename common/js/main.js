/**
 * main.js
 *
 * @copyright	FOURDIGIT Inc.
 * @url		http://www.4digit.jp
 * @author		Kotaro Imai (FOURDIGIT.code)
 * @createAt	2008/11/3
 * @modified	2008/11/3
 */
//他ライブラリと共存可能。($無効化)
//jQuery.noConflict();
jQuery(function() {
	init();
	switch (jQuery("body").attr("id")) {
		case "pageID":
			//eachPageFunction
		break;
	}
});
function init() {
	//bodyのクラスにブラウザ情報を追加
	jQuery.addClassUA();
	
	//easyOverのターゲット設定
	jQuery("img.ahover, .ahoverArea img").easyOver();
	
	//IE5,6にてPNG有効化
	//jQuery("img[src$=png]").enablePNG();

	//Flash
	//jQuery("img[src$=png]").enableFlash();

	//ポップアップリンクに置換
	jQuery(".commonPop").easyPop();

	//他ドメインリンク時にpageTracker有効化
	//jQuery("a,area").blankLogToGoogle();

	//アンカーリンクをスムージング
	jQuery("a[href^=#]").smoothScroll();

	//対象の要素をスクロールに追従するようにする
	//jQuery(".fixBox").fixPosition();
}