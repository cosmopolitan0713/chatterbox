// charactersの定義
const characters = [
  { id: 1, name: 'めたん', image: 'metan1.png', profile1: '何も考えていない' },
  { id: 2, name: 'ずんだもん', image: 'zunda1.png', profile1: '何も考えていない' },
  { id: 3, name: 'つむぎ', image: 'tumugi1.png', profile1: '何も考えていない' },
  { id: 9, name: '冥鳴', image: 'meimei1.png', profile1: '何も考えていない' },
  { id: 11, name: 'いたこ', image: 'itako1.png', profile1: '何も考えていない' }
];

// イベントリスナー内のコードを関数に分割
function handleCharacterSelectChange(event) {
  const selectedCharacterId = event.target.value;
  const previewContainer = document.getElementById('previews');
  previewContainer.innerHTML = '';
  
  if (selectedCharacterId) {
    const selectedCharacter = characters.find(character => character.id === Number(selectedCharacterId));
    createPreview(selectedCharacter, previewContainer);
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
  const characterSelect = document.getElementById('user_character_id');
  const previewContainer = document.getElementById('previews');

  if (!characterSelect) return null;

  const defaultCharacterId = 1;
  createPreview(characters.find(character => character.id === defaultCharacterId), previewContainer);

  characterSelect.addEventListener('change', handleCharacterSelectChange);
});