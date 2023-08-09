console.log("test")
// ページが読み込まれたら実行
document.addEventListener("turbo:load",function() {
  // メニュー要素を取得
  const menu = $("#ft-menus");

  // メニューをクリックしたときの処理
  menu.click(function() {
    // サブメニューを表示/非表示切り替え
    menu.find(".ft-submenu").toggleClass("show");
  });

  // メニュー以外をクリックしたときにサブメニューを非表示にする
  $(document).click(function(event) {
    if (!menu.is(event.target) && menu.has(event.target).length === 0) {
      menu.find(".ft-submenu").removeClass("show");
    }
  });
});

document.addEventListener('turbo:load', function() {
  const conversationHistoryLink = document.getElementById('conversation-history');
  const sideBar = document.querySelector('.side_bar');

  conversationHistoryLink.addEventListener('click', function(event) {
    event.preventDefault(); // リンクのデフォルト動作をキャンセル

    // .side_bar の表示を解除
    sideBar.style.display = 'block';

    // サイドバー外をクリックしたときの処理
    const handleOutsideClick = function(event) {
      if (!sideBar.contains(event.target) && !conversationHistoryLink.contains(event.target)) {
        sideBar.style.display = 'none';
        document.removeEventListener('click', handleOutsideClick); // イベントリスナーを解除
      }
    };
    
    // サイドバー外のクリックを監視
    document.addEventListener('click', handleOutsideClick);
  });
});
