document.addEventListener('DOMContentLoaded', function() {
  const characterSelect = document.getElementById('character-select');
  const characterPreview = document.getElementById('character-preview');

  characterSelect.addEventListener('change', function() {
    const characterId = this.value;
    const request = new XMLHttpRequest();

    request.addEventListener('load', function() {
      if (request.status === 200) {
        const response = JSON.parse(request.responseText);
        const imageUrl = response.image;
        characterPreview.innerHTML = `<img src="${imageUrl}" class="character-preview-image">`;
      } else {
        console.error('エラー:', request.status);
      }
    });

    request.addEventListener('error', function() {
      console.error('リクエストエラー');
    });

    request.open('GET', `/characters/${characterId}`);
    request.send();
  });
});

