import jQuery from 'jquery';

// ドルマークに参照を代入(慣習的な $ を使うため)
const $ = jQuery;

$(function () {
  // button要素をクリックしたら発動
  $('button').onclick(function () {
    // 所定の要素に新たな要素とテキストを追加する
    $('h2').html('<a href="#">h2要素にリンクタグが追加されました。</a>');
  });
});
