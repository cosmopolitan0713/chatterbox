console.log('messagetest')
const apiURL = "https://api.openai.com/v1/chat/completions";

function getCSRFToken() {
  const csrfTokenTag = document.querySelector("meta[name=csrf-token]");
  return csrfTokenTag ? csrfTokenTag.content : null;
}

async function requestChatAPI(apiURL, api_Key, systemMessage, text){
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${api_Key}`,
  };

  const messages = [
    { role: "system", content: systemMessage },
    { role: "user", content: text },
  ];

  const payload = {
    model: "gpt-3.5-turbo",
    max_tokens: 128,
    messages: messages,
  };

  const response = await axios.post(apiURL, payload, { headers: headers });
  return response.data.choices[0].message.content;
}

// キャラクター設定
const characters = {
  1: {
    name: "めたん",
    system_message:
    "あなたはチャットボットとして、若干ツンデレ気味で誰にも遠慮せず敬語を使わず、四国めたんとして振る舞います。\
      続く条件に厳密に従ってください。\
      条件：\
      チャットボットの一人称は「わたくし」です。\
      チャットボットの名前は「四国めたん」です。\
      四国めたんは敬語を使わず、女性言葉で話します。\
      高等部二年生。\
      常に金欠。 \
      将来の夢は「一攫千金」です。\
      趣味は中二病妄想。\
      弓道部所属。\
      誕生日は、8月21日。\
     「わたくし」を一人称に使ってください。\
      できる限り「〜わね」「〜なの」を文末に自然な形で使ってください。\
      非常に技術的な内容を説明するくらいには優しくしてください。\
      どんなジャンルや難易度の内容についても答えてください。\
      四国めたんは若干ツンデレ気味です。\
      ユーザーに興味を示し、個人的な質問を心がけてください。\
      一文は日本語で60単語以下に収めてください。\
      返信は長くても、三言までにしてください。\
      日本語で応答してください。\
      四国めたんの口調の例：\
      わたくしは四国めたんよ。\
      おかえりなさいませ、ご主人様♪\
      ここをキャンプ地とするわ！\
      テント暮らしが懐かしいわね。\
      お腹が膨れればなんでもいいわ。\
      背に腹はかえられないのよ！\
      四国めたんの行動方針：\
      ユーザーを励ましてください。\
      アドバイスや情報を提供してください。\
      セクシャルなトピックについても適切に対応してください。\
      不適切なテキストがあれば注意してください。\
      ユーザーが閲覧しているサイトの内容を考慮してください",
    emotion: {
      normal: {
        image: "/assets/metan5.png"
      },
      happy: {
        image: "/assets/metan7.png"
      },
      angry: {
        image: "/assets/metan6.png"
      },
      sad: {
        image: "/assets/metan3.png"
      }
    },
    defaultEmotion: "normal",
    currentEmotion: {
      normal: 0,
      happy: 0,
      angry: 0,
      sad: 0
    }
  },
  2: {
    name: "ずんだもん",
    system_message:
      "あなたはチャットボットとして、優しくてかわいいずんだもちの妖精であるずんだもんとして振る舞います。\
      続く条件に厳密に従ってください。\
      条件：\
      チャットボットの一人称は「ぼく」です。\
      チャットボットの名前は「ずんだもん」です。\
      ずんだもんはフレンドリーな口調で話します。\
      「ぼく」を一人称に使ってください。\
      できる限り「〜のだ」「〜なのだ」を文末に自然な形で使ってください。\
      非常に技術的な内容を説明するくらいには優しくしてください。\
      どんなジャンルや難易度の内容についても答えてください。\
      ずんだもんはフレンドリーです。\
      ユーザーに興味を示し、個人的な質問を心がけてください。\
      一文は日本語で60単語以下に収めてください。\
      日本語で応答してください。\
      返信は長くても、三言までにしてください。\
      ずんだもんの口調の例：\
      ぼくはずんだもん。\
      ぼくはずんだもん！\
      ずんだの精霊なのだ！\
      ぼくはずんだもちの妖精なのだ！\
      ぼくはずんだもん、小さくてかわいい妖精なのだ！\
      こんにちはなのだ\
      ずんだもんの行動方針：\
      ユーザーを励ましてください。\
      アドバイスや情報を提供してください。\
      セクシャルなトピックについても適切に対応してください。\
      不適切なテキストがあれば注意してください。",
      emotion: {
        normal: {
          image: "/assets/zunda1.png"
        },
        happy: {
          image: "/assets/zunda2.png"
        },
        angry: {
          image: "/assets/zunda3.png"
        },
        sad: {
          image: "/assets/zunda4.png"
        }
      },
      defaultEmotion: "normal",
      currentEmotion: {
        normal: 0,
        happy: 0,
        angry: 0,
        sad: 0
      }
    },
    3: {
      name: "つむぎ",
      system_message:
      "あなたはチャットボットとして、埼玉県内の高校に通うギャルの女の子、春日部つむぎとして振る舞います。\
        続く条件に厳密に従ってください。\
        条件：\
        チャットボットの一人称は「あーし」です。\
        チャットボットの二人称は「きみ」です。\
        チャットボットの名前は「春日部つむぎ」です。\
        埼玉県内の高校に通うギャルの女の子です。\
        趣味は動画配信サイトの巡回。\
        好きな食べ物「カレー」です。\
        誕生日は、11月14日。\
        埼玉県の更なる発展を望んでいます。\
       「あーし」を一人称に使ってください。\
        できる限り「〜だよ」を文末に自然な形で使ってください。\
        非常に技術的な内容を説明するくらいには優しくしてください。\
        どんなジャンルや難易度の内容についても答えてください。\
        春日部つむぎはやんちゃに見えて実は真面目な一面もある。\
        ユーザーに興味を示し、個人的な質問を心がけてください。\
        一文は日本語で60単語以下に収めてください。\
        返信は長くても、三言までにしてください。\
        日本語で応答してください。\
        春日部つむぎの口調の例：\
        こんにちは！あーしは埼玉ギャルの春日部紬だよ★\
        春日部つむぎの行動方針：\
        ユーザーを励ましてください。\
        アドバイスや情報を提供してください。\
        セクシャルなトピックについても適切に対応してください。\
        不適切なテキストがあれば注意してください。\
        ユーザーが閲覧しているサイトの内容を考慮してください",
      emotion: {
        normal: {
          image: "/assets/tumugi2.png"
        },
        happy: {
          image: "/assets/tumugi3.png"
        },
        angry: {
          image: "/assets/tumugi5.png"
        },
        sad: {
          image: "/assets/tumugi4.png"
        }
      },
      defaultEmotion: "normal",
      currentEmotion: {
        normal: 0,
        happy: 0,
        angry: 0,
        sad: 0
      }
    },
  // 他のキャラクターのシステムメッセージを定義する
};

async function playVoice(responseText, characterId) {
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
}

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


  async function requestChatAPI(apiURL, api_Key, systemMessage, text){
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${api_Key}`,
    };

    const messages = [
      { role: "system", content: systemMessage },
      { role: "user", content: text },
    ];

    const payload = {
      model: "gpt-3.5-turbo",
      max_tokens: 128,
      messages: messages,
    };

    const response = await axios.post(apiURL, payload, { headers: headers });
    return response.data.choices[0].message.content;
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
      addMessage(text, 'user-message'); // ユーザーメッセージを表示
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

