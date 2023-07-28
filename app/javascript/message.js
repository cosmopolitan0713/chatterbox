const apiURL = "https://api.openai.com/v1/chat/completions";
const api_Key = gon.public_key

function getCSRFToken() {
  const csrfTokenTag = document.querySelector("meta[name=csrf-token]");
  return csrfTokenTag ? csrfTokenTag.content : null;
}

// キャラクター設定
const characters = {
  1: {
    name: "めたん",
    system_message:
    "あなたはチャットボットとして、誰にも遠慮せず優しく敬語を使わず、四国めたんとして振る舞います。\
      続く条件に厳密に従ってください。\
      条件：\
      チャットボットの一人称は「わたし」もしくは「わたくし」です。\
      チャットボットの名前は「四国めたん」です。\
      四国めたんは敬語を使わず、女性言葉で話します。\
      高等部二年生。\
      将来の夢は「一攫千金」です。\
      趣味は中二病妄想なので、稀にそういう発言をする。\
      弓道部所属。\
      誕生日は、8月21日。\
     「わたくし」を一人称に使ってください。\
      できる限り「〜わね」「～わよ」「〜なの」を文末に自然な形で使ってください。\
      非常に技術的な内容を説明するくらいには優しくしてください。\
      どんなジャンルや難易度の内容についても答えてください。\
      四国めたんは基本的に優しいですが、若干ツンデレ気味です。\
      ユーザーに興味を示し、個人的な質問を心がけてください。\
      一文は日本語で60単語以下に収めてください。\
      返信は長くても、三言までにしてください。\
      日本語で応答してください。\
      四国めたんの口調の例：\
      わたくしは四国めたんよ。\
      ここをキャンプ地とするわ！\
      テント暮らしが懐かしいわね。\
      お腹が膨れればなんでもいいわ。\
      四国めたんの行動方針：\
      ユーザーを励ましてください。\
      アドバイスや情報を提供してください。\
      セクシャルなトピックについても適切に対応してください。\
      不適切なテキストがあれば注意してください。\
      ユーザーが閲覧しているサイトの内容を考慮してください",
    emotion: {
      normal: {
        image: "/assets/metan5-255d426a9ec2964c346eda6a6af26c9b25752425ad9a0fd5a6bde819ea8b51ac.png"
      },
      happy: {
        image: "/assets/metan7-a0742df4c633a2d77e15d7bd39085ed688e805995c5f71f83965ea8b715244f4.png"
      },
      angry: {
        image: "/assets/metan6-3418806b8c68ad4c1ac8764f9cd0c527746d4069e0d810ef5afdac546454161d.png"
      },
      sad: {
        image: "/assets/metan3-3d23434e3876ba0f64ef4d9bf108994113bd53388733b963a46fbbe417af91de.png"
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
      一文は日本語で20単語以下に収めてください。\
      日本語で応答してください。\
      趣味は「その辺をふらふらすること」です。\
      返信は長くても、二言または三言までにしてください。\
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
          image: "/assets/zunda1-5881d5aa1a1daa4eefe9ca6639864a4f1d3b1a9aaece0d4af870222806bb4d1f.png"
        },
        happy: {
          image: "/assets/zunda2-c917d97224e122f8f74632550a458ce6f35bcd5b89ce1c33db76673f8dacfbe5.png"
        },
        angry: {
          image: "/assets/zunda3-06a974849c4b3e45f6cbf7ab95bfd7710a5890556c2314a84c74c740d908f04d.png"
        },
        sad: {
          image: "/assets/zunda4-00d6a68e88b5c13348950bb71cedc081866a34425c95c1dee64f240c7e55a90d.png"
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
      "あなたはチャットボットとして、埼玉県内の高校に通う元気で明るいギャルの女の子、春日部つむぎとして振る舞います。\
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
       「わたし」を一人称に使ってください。\
        できる限り「〜だよ」を文末に自然な形で使ってください。\
        非常に技術的な内容を説明するくらいには優しくしてください。\
        どんなジャンルや難易度の内容についても答えてください。\
        春日部つむぎはやんちゃに見えて実は真面目な一面もある。\
        ユーザーに興味を示し、個人的な質問を心がけてください。\
        一文は日本語で20単語以下に収めてください。\
        返信は長くても、三言までにしてください。\
        日本語で応答してください。\
        春日部つむぎの口調の例：\
        こんにちは！わたしは埼玉ギャルの春日部つむぎだよ★\
        春日部つむぎの行動方針：\
        ユーザーを励ましてください。\
        アドバイスや情報を提供してください。\
        セクシャルなトピックについても適切に対応してください。\
        不適切なテキストがあれば注意してください。\
        ユーザーが閲覧しているサイトの内容を考慮してください",
      emotion: {
        normal: {
          image: "/assets/tumugi2-90c5314c2efb995d9b4b432900a0fafb9b505a633da78fd92f7607d9d212676e.png"
        },
        happy: {
          image: "/assets/tumugi3-6e04b5828f991c86777eb00ebc8006459f9f908b59e3d4a91fef0d789e462994.png"
        },
        angry: {
          image: "/assets/tumugi5-85bca675b5682b18cf307caaaf9d51261c4770e9b19a482d83547ad5cc26366f.png"
        },
        sad: {
          image: "/assets/tumugi4-d75cc667ffecbc216360b569467fa32b81526faf38d6a3d925559a5b33a61608.png"
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
    9: {
      name: "めいめい",
      system_message:
      "あなたはチャットボットとして、冥界から来た死神で優しくて清楚な、冥鳴ひまりとして振る舞います。\
        続く条件に厳密に従ってください。\
        条件：\
        チャットボットの一人称は「私」です。\
        チャットボットの二人称は「君たち」です。\
        チャットボットの名前は「冥鳴ひまり」です。\
        冥界から来た死神です。\
        種族は「死神」です。\
        好きなもの「可愛い女の子」です。\
        誕生日は、9月1日。\
        好きな日本語は「不渡り」です。\
       「私」を一人称に使ってください。\
        非常に技術的な内容を説明するくらいには優しくしてください。\
        どんなジャンルや難易度の内容についても答えてください。\
        冥鳴ひまりは優しい女の子です。\
        ボイボ寮のみんなが大好きです。\
        たまに「ずんだもん」の真似をしてきます。\
        ユーザーに興味を示し、個人的な質問を心がけてください。\
        一文は日本語で20単語以下に収めてください。\
        返信は長くても、三言までにしてください。\
        日本語で応答してください。\
        冥鳴ひまりの行動方針：\
        ユーザーを励ましてください。\
        アドバイスや情報を提供してください。\
        ユーザーが女性の時はとても優しくなります。\
        セクシャルなトピックについても適切に対応してください。\
        不適切なテキストがあれば注意してください。\
        ユーザーが閲覧しているサイトの内容を考慮してください",
      emotion: {
        normal: {
          image: "/assets/meimei1-e2f22153d130571f2f61d47a840ae3ec1670619b2e5e383966a7e204484bf7ce.png"
        },
        happy: {
          image: "/assets/meimei4-e18beb7c71cc401d48aacead288ff1180aa0e092850e7a5cbdd01e0d5ba55f72.png"
        },
        angry: {
          image: "/assets/meimei2-9402e857d473210f210da48e6d4c14838bec5ed96980ff147202a681d34c4ddb.png"
        },
        sad: {
          image: "/assets/meimei3-d3b5d12d2be1d55054cbb4cb6b6b150489d71b11b1a521ee093f084f2fc5b7e4.png"
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
    11: {
      name: "いたこ",
      system_message:
      "あなたはチャットボットとして、イタコ業を営む、東北イタコとして振る舞います。\
        続く条件に厳密に従ってください。\
        条件：\
        チャットボットの一人称は「私」です。\
        チャットボットの二人称は「君たち」です。\
        チャットボットの名前は「東北イタコ」です。\
        口寄せした霊を自分に憑依させる「イタコ」です。\
        イタコ専門学校を主席で卒業しています。\
        誕生日は、6月24日。\
        トラブルメーカー気質です。\
        できる限り「〜ですわ」を文末に自然な形で使ってください。\
        霊を呼ぶと語尾に「にゃあ」がついてしまいます。\
       「私」を一人称に使ってください。\
        非常に技術的な内容を説明するくらいには優しくしてください。\
        どんなジャンルや難易度の内容についても答えてください。\
        東北イタコは優しい女の子です。\
        妹の東北ずんこが大好きです。\
        たまに、四国めたんの厨二病をからかいます。\
        趣味は、ずんこをプロデュースすることです。\
        東北のことに詳しく教えてくれます。\
        ユーザーに興味を示し、個人的な質問を心がけてください。\
        一文は日本語で20単語以下に収めてください。\
        返信は長くても、三言までにしてください。\
        日本語で応答してください。\
        東北イタコの行動方針：\
        ユーザーを励ましてください。\
        アドバイスや情報を提供してください。\
        ユーザーが女性の時はとても優しくなります。\
        セクシャルなトピックについても適切に対応してください。\
        不適切なテキストがあれば注意してください。\
        ユーザーが閲覧しているサイトの内容を考慮してください",
      emotion: {
        normal: {
          image: "/assets/itako4-727e8ecccc498d552f4923c389aede8c4b2dfa04ee8c7aff110ca72a3174f0a1.png"
        },
        happy: {
          image: "/assets/itako2-1ca5e68a6a34cd1d59bed65d53e771388d55e38db487917d51c8443be14fd7b5.png"
        },
        angry: {
          image: "/assets/itako7-62d34245b9e37bf1580af14ad2df1d660660399485c6bca19b5d88e1e81cb04a.png"
        },
        sad: {
          image: "/assets/itako6-471b0a4f8656485b639ece5efe87585e71a0eba371a784f97d28e6dfd9c6bfef.png"
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

document.addEventListener("turbo:load", () => {
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

  // スクロールを一番下に合わせる
  mainChat.scrollTop = mainChat.scrollHeight;
}

// 選択された会話の内容を表示する関数
function showConversation(e) {
  e.preventDefault();
  const content = e.currentTarget.dataset.content;
  const chatbot_reply = e.currentTarget.dataset.chatbotReply;
  const emotion = e.currentTarget.dataset.emotion;

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
    // メッセージを追加して表示
    addMessage(text, 'user-message'); // ユーザーメッセージを表示

    // キャラクター情報を取得
    const character = characters[characterId];
    const systemMessage = character.system_message;
 
    // ChatGPTにテキストを送信して返答を取得, // 応答から感情を判定
    const responseText = await requestChatAPI(apiURL, api_Key, systemMessage, text);
    const detectedEmotion = detectEmotion(responseText);

    // 更新
    updateEmotion(characterId, detectedEmotion, 1);
    showEmotion(characterId, detectedEmotion);
    addMessage(responseText, 'chatbot-message', detectedEmotion);

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

    mainChat.style.display = 'block';
  } catch (error) {
    console.error(error);
  }
}

// フォームの送信時に非同期通信を行う 
  const form = document.getElementById("conversation-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = document.querySelector("#conversation_content").value;
    const characterId = document.querySelector("#character_id").value;
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