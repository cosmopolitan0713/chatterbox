import { playVoice } from './voice.js';
import { getCSRFToken } from './form.js';
import { requestChatAPI } from './api.js';
import characters from './characters.js';

const apiURL = "https://api.openai.com/v1/chat/completions";

document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.querySelector(".user-form");
  if (userForm) {
// 要素を取得
const mainChat = document.querySelector(".main-chat");
const userMessage = document.querySelector(".user-message");
const chatbotMessage = document.querySelector(".chatbot-message");

// 初期化処理としてメッセージ表示エリアを空にする
function clearMessages() {
  if (userMessage) userMessage.innerHTML = '';
  if (chatbotMessage) chatbotMessage.innerHTML = '';
}

// 関数: 感情に応じて立ち絵を切り替える
function showEmotion(characterId, emotion) {
  const character = characters[characterId];
  const characterImageElement = document.getElementById("character-image"); // 立ち絵要素を取得

  if (!characterImageElement) {
    console.error("立ち絵要素が見つかりません");
    return;
  }

  if (!character) {
    console.error("キャラクター情報が見つかりません");
    return;
  }

  if (emotion in character.emotion) {
    const imageSrc = character.emotion[emotion].image;
    characterImageElement.src = imageSrc; // 立ち絵を切り替える
    console.log("imageSrc:", character.emotion[emotion].image);
  } else {
    console.error("指定された感情が見つかりません");
  }
}

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
function showConversation(e) {
  e.preventDefault();
  const content = e.currentTarget.dataset.content;
  const chatbot_reply = e.currentTarget.dataset.chatbotReply;
  const emotion = e.currentTarget.dataset.emotion; // リンクのdata-emotion属性から感情情報を取得
  console.log(chatbot_reply)

  // メッセージを追加して表示
  addMessage(content, 'user-message');
  addMessage(chatbot_reply, 'chatbot-message', emotion); // 返信テキストを表示

  mainChat.style.display = 'block';
}

// 関数: 応答テキストから感情を判定する
function detectEmotion(responseText) {
  const keywords = {
    happy: ["嬉し", "楽し", "喜び"],
    angry: ["怒", "腹立"],
    sad: ["悲", "辛"],
  };

  const text = responseText.toLowerCase();
  let emotion = "normal"; // デフォルトは通常の感情

  Object.keys(keywords).forEach(emotionKey => {
    const emotionKeywords = keywords[emotionKey];
    for (const keyword of emotionKeywords) {
      if (text.includes(keyword)) {
        emotion = emotionKey;
        break;
      }
    }
  });

  return emotion;
}

// 関数: 感情を更新する
function updateEmotion(characterId, emotion, amount) {
  const character = characters[characterId];
  if (!character) {
    console.error("キャラクター情報が見つかりません");
    return;
  }

  character.currentEmotion[emotion] += amount;

  // 感情値が0未満の場合は0に修正
  character.currentEmotion[emotion] = Math.max(0, character.currentEmotion[emotion]);

  // 感情値が5を超える場合は5に修正
  character.currentEmotion[emotion] = Math.min(5, character.currentEmotion[emotion]);
}

  // Chat処理を実行する関数
  async function chat(characterId, text, form) {
    try {
      // キャラクター情報を取得
      const character = characters[characterId];
      const systemMessage = character.system_message;
 
      // ChatGPTにテキストを送信して返答を取得, // 応答から感情を判定
      const responseText = await requestChatAPI(apiURL, api_Key, systemMessage, text);
      const detectedEmotion = detectEmotion(responseText);

      // 感情を更新
      updateEmotion(characterId, detectedEmotion, 1);
      console.log(updateEmotion)

      // 判定された感情に応じて立ち絵を切り替え
      showEmotion(characterId, detectedEmotion);

      // メッセージを追加して表示
      addMessage(text, 'user-message', null); // ユーザーメッセージを表示
      addMessage(responseText, 'chatbot-message', detectedEmotion); // チャットボットの返答を表示

      // 返信がある場合のみメッセージを表示する
      mainChat.style.display = responseText.trim() !== '' ? 'block' : 'none';
            
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
        } else {
          console.error("保存に失敗しました");
        }
      } catch (error) {
        console.error("エラーが発生しました", error);
      }

      form.reset();
    } catch (error) {
      console.error(error);
    }
  }

// フォームの送信時に非同期通信を行う
  const form = document.getElementById("conversation-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
   
    // 入力されたテキストを取得
    const text = document.querySelector("#conversation_content").value;
    console.log("text:", text);

    // キャラクターIDを取得
    const characterId = document.querySelector("#character_id").value;
    console.log(characterId);

    // Chat処理を呼び出し、チャットの処理を実行
    await chat(characterId, text, form);
  });

  // 選択された会話のリンクのクリックイベントリスナーを登録
  const conversationLinks = document.querySelectorAll(".conversation-link");
  conversationLinks.forEach(link => {
    link.addEventListener("click", showConversation);
  });

  // ページロード時に実行する初期化処理
  clearMessages();
  
  }
});

