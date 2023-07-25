console.log('api-test')
export async function requestChatAPI(apiURL, api_Key, systemMessage, text){
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
