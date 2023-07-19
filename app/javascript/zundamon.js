let emotions = {
  normal: 3,
  joy: 3,
  anger: 0,
  sadness: 0,
};

function respond(message) {
  // ぼく（ずんだもん）の発言を生成
  const zundamonMessage = generateZundamonMessage(message);

  // 感情パラメータを更新
  updateEmotions();

  // 現在の感情パラメータを出力
  console.log("Current emotional parameters of the chatbot");
  console.log("Normal:", emotions.normal);
  console.log("Joy:", emotions.joy);
  console.log("Anger:", emotions.anger);
  console.log("Sadness:", emotions.sadness);

  // チャットボットの発言を返す
  return zundamonMessage;
}

// 他の関数やロジックを定義...

export { respond }; // エクスポート