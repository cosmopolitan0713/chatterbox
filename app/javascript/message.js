import { playVoice } from './voice.js'; // 追加
import { getCSRFToken } from './form.js'; // 追加
import { requestChatAPI } from './api.js'; // 追加
import characters from './characters.js';

const apiURL = "https://api.openai.com/v1/chat/completions";

// 要素を取得
const mainChat = document.querySelector(".main-chat");
const userMessage = document.querySelector(".user-message");
const chatbotMessage = document.querySelector(".chatbot-message");

// 初期化処理としてメッセージ表示エリアを空にする
userMessage.innerHTML = '';
chatbotMessage.innerHTML = '';

// メッセージを追加する関数
function addMessage(message, messageType) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(messageType);
  messageElement.textContent = message;
  mainChat.appendChild(messageElement);

  // ボイス再生
  if (messageType === "chatbot-message") {
    const characterId = document.querySelector("#character_id").value;
    playVoice(message, characterId);
  }
}

// 選択された会話の内容を表示する関数
function showConversation(event) {
  event.preventDefault();
  const content = event.target.dataset.content;

  // メッセージを追加して表示
  addMessage(content, 'chatbot-message');
  mainChat.style.display = 'block';
}

// フォームの送信時に非同期通信を行う
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("conversation-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
   
    // 入力されたテキストを取得
    const text = document.querySelector("#conversation_content").value;
    console.log("text:", text);

    // キャラクターIDを取得
    const characterId = document.querySelector("#character_id").value;
    console.log(characterId);

    // キャラクター情報を取得
    const character = characters[characterId];
    const systemMessage = character.system_message;
 
    try {
      // ChatGPTにテキストを送信して返答を取得
      const responseText = await requestChatAPI(apiURL, api_Key, systemMessage, text);

      // メッセージを追加して表示
      addMessage(text, 'user-message'); // ユーザーメッセージを表示
      addMessage(responseText, 'chatbot-message'); // チャットボットの返答を表示

      // 返信がある場合のみメッセージを表示する
      if (responseText.trim() !== '') {
        mainChat.style.display = 'block';
      } else {
        mainChat.style.display = 'none';
      }
      
      // データベースに送信テキストと返信テキストを保存
      const formData = new FormData(form);
      formData.append("conversation[response_text]", responseText);
  
      try {
        const response = await fetch("/conversations", {
          method: "POST",
          body: formData,
          headers: {
            "X-CSRF-Token": getCSRFToken(),
          },
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData); // 保存が成功した場合のレスポンス
          // 成功した後の処理を記述する（例: メッセージの表示など）
        } else {
          console.error("保存に失敗しました");
          // 失敗した後の処理を記述する（例: エラーメッセージの表示など）
        }
      } catch (error) {
        console.error("エラーが発生しました", error);
        // エラー処理を記述する
      }

      // フォームをクリア
      form.reset();
    } catch (error) {
      console.error(error);
    }
  });

  // 選択された会話のリンクのクリックイベントリスナーを登録
  const conversationLinks = document.querySelectorAll(".conversation-link");
  conversationLinks.forEach(link => {
    link.addEventListener("click", showConversation);
  });
});
