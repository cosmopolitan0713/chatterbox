console.log('voice-test')
export async function playVoice(responseText, characterId) {
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