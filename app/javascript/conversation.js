function getCSRFToken() {
  const csrfTokenTag = document.querySelector("meta[name=csrf-token]");
  return csrfTokenTag ? csrfTokenTag.content : null;
}

document.addEventListener("DOMContentLoaded", () => {
  const deleteLinks = document.querySelectorAll(".delete-conversation");

  deleteLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const url = link.getAttribute("href");
      
      if (confirm("この履歴を削除しますか？")) {
        fetch(url, {
          method: "DELETE",
          headers: {
            "X-CSRF-Token": getCSRFToken(), // CSRFトークンを取得する関数が必要です
          },
        })
        .then(response => {
          if (response.ok) {
            // 削除に成功した場合、会話を表示している要素を削除する
            const conversationElement = link.closest(".conversation");
            conversationElement.remove();
          } else {
            // 削除に失敗した場合のエラーハンドリングを行うことができます
            console.error("削除に失敗しました");
          }
        })
        .catch(error => {
          console.error("エラーが発生しました", error);
        });
      }
    });
  });
});