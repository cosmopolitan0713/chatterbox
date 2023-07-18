console.log('test')
document.addEventListener("DOMContentLoaded", () => {
  // apiURLの代入
  const apiURL = "https://api.openai.com/v1/chat/completions";
  // フォームの取得
  const form = document.getElementById("conversation-form");
  console.log(form)

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = document.querySelector("#conversation_content");
    console.log("text")
    const responseText = await requestChatAPI(text.value);
    console.log("responseText:", responseText); // responseTextをコンソールに出力する
    const output = document.querySelector(".output");
    output.textContent = responseText;
  });

  async function requestChatAPI(text) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${api_Key}`,
    };

    // 以前のメッセージと同様にメッセージオブジェクトを作成
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
    const response = await axios.post(apiURL, payload, { headers: headers });
    return response.data.choices[0].message.content;
  }
});
