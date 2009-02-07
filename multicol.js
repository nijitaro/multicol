/**
 * @name multicol.js
 * @fileOverview
 * @version 1.1
 * @author <a href="mailto:imai@4digit.jp">Kotaro Imai</a> @ <a href="http://hokypoky.info">HOKYPOKY.</a>
 * @description
 * <p>WEBサイトで段組み行うことができるjQuery Plugin</p>
 * <p>(c) HOKYPOKY.info Licensed <a href="http://ja.wikipedia.org/wiki/GNU_General_Public_License">GNU General Public License</a>.</p>
 */
if (typeof info == "undefined") {
	/**
	 * @namespace
	 * @description
	 * <p>namespace : info</p>
	 */
	var info = {};
}
if (typeof info.hokypoky == "undefined") {
	/**
	 * @namespace
	 * @description
	 * <p>namespace : info.hokypoky</p>
	 */
	info.hokypoky = {};
}
/**
 * @class Mutlicol
 */
info.hokypoky.Multicol = new function () {
	jQuery.fn.extend({
		/**
		 * @function
		 * @param {Number} colNum カラム数
		 * @param {Number} colMargin カラムの隙間
		 * @return {jQuery}
		 * @example
		 * jQuery("div.multicol").multicol({
		 *	colNum: 3,
		 *	colMargin: 10
		 * })
		 */
		multicol: function (arg) {
			this.each(function(){
				//初期値セット
				var grid = parseInt($(this).css("line-height"));
				var colNum = (arg.colNum ? arg.colNum : 2);
				var colMargin = (arg.colMargin ? arg.colMargin : 10);
				var width = parseInt($(this).width());
				var colWidth = ($(this).width() - colMargin*(colNum-1)) / colNum -0.1;
				//要素が段組みにFITするよう整頓
				$(this)
					//最後の要素のマージンを0にする。
					.find("> *:last")
						.css({marginBottom: 0})
					.end()
					//imgの高さを揃える。
					.find("img")
						.each(function(){
							var remainder = this.height % grid;
							if(remainder!=0){
								remainder = (remainder < grid/2 ? -remainder : grid - remainder);
							}
							$(this).css({ marginBottom: remainder })
						})
					.end()
					//全体の幅を1カラム分に変更
					.css({width: colWidth})
				.end();
				//幅を1カラム分に細くしたときの全体の長さを取得
				var height = parseInt($(this).height());
				//行数整理(カラム数で丁度割り切れるようにする)
				var remainder = (parseInt(height) / parseInt(grid)) % parseInt(colNum);
				if(remainder!=0) height = height + grid*(colNum-remainder);
				//行数整理された後の高さをセット
				$(this)
					.css({
						height: height + "px",
						overflow: "hidden"
					})
					//内容をmulticolInnerで包む
					.wrapInner("<div class='multicolInner'></div>")
				.end();
				//multicolInnerをコピー
				var contentClone =  $(this).html();
				$(this)
					.css({
						//全体の高さをカラム数で分割
						height: height / colNum  + "px",
						//全体の幅を元の幅に戻す
						width: width
					})
					//内容を空にする
					.html("")
				.end();
				//カラムの数だけコピーした内容を詰め込む
				for(var i = 0; i < colNum; i++) {
					var obj = $(contentClone).css({
						//floatで配置
						"float": i != (colNum-1) ? "left": "right",
						//"float": i != (colNum-1) ? "left": "right",
						//幅を1カラムの幅にセット
						width: colWidth,
						//margin-topを1カラム分ずつ引く
						marginTop: -($(this).height()*i)+"px",
						//最後のカラム以外colMarginで隙間を定義する
						marginRight: i != (colNum-1) ? colMargin+"px": 0 + "px",
						//はみ出る分を隠す
						overflow: "hidden"
					})
					//元の要素に詰める
					$(this).append(obj);
				}
			});
			return this;
		}
	});
}