console.log("previewtest")
// charactersの定義
const previewcharacters = [
  { id: 1, name: 'めたん', image: 'metan1-5fce643c5d71b7c566acf697b27f4bd0da82db5e2a7302626564b888f43e4cf9.png', profile1: '何も考えていない' },
  { id: 2, name: 'ずんだもん', image: 'zunda1-5881d5aa1a1daa4eefe9ca6639864a4f1d3b1a9aaece0d4af870222806bb4d1f.png', profile1: '何も考えていない' },
  { id: 3, name: 'つむぎ', image: 'tumugi1-c48380e6d2ade86055b1e9c8a2bce83ccc90eca97b58ef97fe7066268a094915.png', profile1: '何も考えていない' },
  { id: 9, name: '冥鳴', image: 'meimei1-e2f22153d130571f2f61d47a840ae3ec1670619b2e5e383966a7e204484bf7ce.png', profile1: '何も考えていない' },
  { id: 11, name: 'いたこ', image: 'itako1-ac62b67ce1c312e86b0b5e7f50a616c212362305468b1ebd3b85677e394819e3.png', profile1: '何も考えていない' }
];

// イベントリスナー内のコードを関数に分割
function handleCharacterSelectChange(event) {
  const selectedCharacterId = event.target.value;
  const previewContainer = document.getElementById('previews');
  console.log('selectedCharacterId')
  console.log('previewContainer')

  if (previewContainer) {
    previewContainer.innerHTML = '';
  
    if (selectedCharacterId) {
      const selectedCharacter = previewcharacters.find(character => character.id === Number(selectedCharacterId));
      createPreview(selectedCharacter, previewContainer);
    }
  }
}

// プレビューの作成
function createPreview(character, container) {
  const characterPreview = document.createElement('img');
  characterPreview.src = '/assets/' + character.image;
  characterPreview.alt = 'Character Preview';
  characterPreview.classList.add('preview-image');
  container.appendChild(characterPreview);
}

// DOM要素のキャッシュ
document.addEventListener('turbo:load', function() {
  const previewsItem = document.querySelector('.previews-item');
  if (!previewsItem) return;

  const characterSelect = document.getElementById('user_character_id');
  const previewContainer = document.getElementById('previews');

  if (!characterSelect) return null;

  const defaultCharacterId = 1;
  createPreview(previewcharacters.find(character => character.id === defaultCharacterId), previewContainer);

  characterSelect.addEventListener('change', handleCharacterSelectChange);
});