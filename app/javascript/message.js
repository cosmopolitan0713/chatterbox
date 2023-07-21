const apiURL = "https://api.openai.com/v1/chat/completions";
import characters from './characters.js';

// CSRFトークンを取得する関数の定義
function getCSRFToken() {
  const csrfTokenTag = document.querySelector("meta[name=csrf-token]");
  return csrfTokenTag ? csrfTokenTag.content : null;
}

// フォームの送信時に非同期通信を行う
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("conversation-form");
  const mainChat = document.querySelector(".main-chat");
  const userMessage = document.querySelector(".user-message");
  const chatbotMessage = document.querySelector(".chatbot-message");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
   

    // 入力されたテキストを取得
    const text = document.querySelector("#conversation_content").value; // フォームの入力値を取得
    console.log("text:", text);

    // キャラクターIDを取得
    const characterId = document.querySelector("#character_id").value;
    console.log(characterId);

    // キャラクター情報を取得
    const character = characters[characterId];
    const systemMessage = character.system_message;
    
    try {
      // ChatGPTにテキストを送信して返答を取得
      const responseText = await requestChatAPI(systemMessage, text);

      // 返信がある場合のみメッセージを表示する
      if (responseText.trim() !== '') {
        mainChat.style.display = 'block';
        userMessage.textContent = text;
        chatbotMessage.textContent = responseText;
      } else {
        mainChat.style.display = 'none';
      }
      
      const formData = new FormData(form);
      formData.append("conversation[response_text]", responseText);
      console.log(formData)
  
      try {
        const response = await fetch("/conversations", {
          method: "POST",
          body: formData,
          headers: {
            "X-CSRF-Token": getCSRFToken(), // CSRFトークンを取得する関数を使用する
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

      // Voicevox APIにテキストを送信して音声を取得し、再生する
      const voicevoxApiURL =
        "https://deprecatedapis.tts.quest/v2/voicevox/audio/?text=" +
        encodeURIComponent(responseText) +
        "&speaker=" +
        (characterId - 1) +
        "&key=y1q30912c5n9C-F&pitch=0&intonationScale=1&speed=1";
      const voicevoxResponse = await fetch(voicevoxApiURL);
      const voicevoxBlob = await voicevoxResponse.blob();
      const voicevoxAudio = new Audio(URL.createObjectURL(voicevoxBlob));
      voicevoxAudio.play();

      // フォームをクリア
      form.reset();
    } catch (error) {
      console.error(error);
    }
  });
});


async function requestChatAPI(systemMessage,text) {
  // ChatGPTのAPIキー
  const apiKey = "<%= ENV['CHAT_GPT_KEY'] %>";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${api_Key}`,
  };

  const messages = [
    {
      role: "system",
      content: systemMessage, 
    },
    {
      role: "user",
      content: text,
    },
  ];

  const payload = {
    model: "gpt-3.5-turbo",
    max_tokens: 128,
    messages: messages,
  };
  // ChatGPTにAPIリクエストを送信して返答を取得
  const response = await axios.post(apiURL, payload, { headers: headers });
  return response.data.choices[0].message.content;

}
