const apiURL = "https://api.openai.com/v1/chat/completions";

// フォームの送信時に非同期通信を行う
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("conversation-form");
  const mainChat = document.querySelector(".main-chat");
  const userMessage = document.querySelector(".user-message");
  const chatbotMessage = document.querySelector(".chatbot-message");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // 入力されたテキストを取得
    const text = document.querySelector("#conversation_content").value;
    console.log("text:", text);

    // キャラクターIDを取得
    const characterId = document.querySelector("#character_id").value;
    console.log(characterId);

    try {
      // ChatGPTにテキストを送信して返答を取得
      const responseText = await requestChatAPI(text);
      console.log("responseText:", responseText);

      // 返信がある場合のみメッセージを表示する
      if (responseText.trim() !== '') {
        mainChat.style.display = 'block';
        userMessage.textContent = text;
        chatbotMessage.textContent = responseText;
      } else {
        mainChat.style.display = 'none';
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


async function requestChatAPI(text) {
  // ChatGPTのAPIキー
  const apiKey = "<%= ENV['CHAT_GPT_KEY'] %>";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${api_Key}`,
  };

  const messages = [
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
