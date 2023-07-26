console.log('deletetest')
document.addEventListener('DOMContentLoaded', function() {
  const deleteContainer = document.querySelector('.show-delete');
 
  if (deleteContainer) {
    const deleteButton = document.getElementById('delete-button');
    
    if (deleteButton) {
    deleteButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      const confirmation = confirm('アカウントを削除しますか？');
      if (confirmation) {
        const deleteForm = document.createElement('form');
        deleteForm.method = 'POST';
        deleteForm.action = deleteButton.getAttribute('formaction');
        deleteForm.insertAdjacentHTML('beforeend', '<input type="hidden" name="_method" value="DELETE">');
        deleteForm.insertAdjacentHTML('beforeend', '<input type="hidden" name="authenticity_token" value="' + getCSRFToken() + '">');
        document.body.appendChild(deleteForm);
        deleteForm.submit();
      }
    });
  }
}
  // CSRFトークンを取得するヘルパー関数
  function getCSRFToken() {
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    return tokenElement ? tokenElement.getAttribute('content') : '';
  }
});

