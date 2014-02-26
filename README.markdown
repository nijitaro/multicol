MULTICOL
====================

[![Gitter chat](https://badges.gitter.im/nijitaro/multicol.png)](https://gitter.im/nijitaro/multicol)

Example & Documents : [http://code.hokypoky.info/multicol/](http://code.hokypoky.info/multicol/)


ダウンロード/設置方法：
---------------------

jQueryをDL : jquery.js
muticol.jsをDL : multicol.min.js

    <script type="text/javascript" src="path/to/jquery.js"></script>
    <script type="text/javascript" src="path/to/multicol.min.js"></script>

EXAMPLE：
---------------------

jQuery Pluginなので、jQuery Selectorsで指定した要素を段組みにすることができます。

    $(document).ready(function(){
    	$("selector").multicol({colNum: 3, colMargin: 20});
    });

PROPERTY：
---------------------

colNum (必須)
分割するカラム数を指定します
colMargin
分割したカラムとカラムのマージンをピクセル数で指定します (default: 10)

NOTICE：
---------------------

文字が途中で切れてしまっている場合は、line-heightと段落や見出しのmarginの関係が等倍でないことが原因です。
これはレイアウトの性質上こうなってしまいます。

またelasticレイアウトではうまく動かない可能性があります。フォントはピクセル指定で制御してください。

    selector { line-height: 18px; }
    selector p, selector h2, selector h3, selector h4, selector h5, selector h6 {
    	margin-bottom: 18px;
    }

DEVELOPERS：
---------------------

GNU General Public Licenseに基づき改変、再配布などは自由に行ってくだささい。

* 開発者用ソース
* 旧JsDoc (最新版は保留しています)

HISTORY：
---------------------

* v1.2 / IE8でのレンダリングを修正, Prototype Javascript Frameworkとのコンフリクト回避
* v1.1 / Firefox2でのレンダリングを修正
* v1.0 / 公開

(want) TODO：
---------------------

やりたいこと、やろうとしていることのリストです。

* 文字サイズの可変対応 (itsuo様より)
* CSS3対応ブラウザには、なるべくネイティブの処理を使用
* CSS3からの指定方法も追加
* 基準高さの指定を可能にする
* リポジトリ作成、公開作りました。
