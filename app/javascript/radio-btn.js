document.addEventListener('DOMContentLoaded', function() {
  applyRadioStyle('background-radio');
  applyRadioStyle('character-radio');
});

function applyRadioStyle(radioGroupName) {
  const radioButtons = document.querySelectorAll(`.${radioGroupName} input[type="radio"]`);
  radioButtons.forEach(button => {
    button.addEventListener('change', function() {
      radioButtons.forEach(btn => {
        const label = btn.nextElementSibling;
        label.classList.remove('selected');
      });

      const label = this.nextElementSibling;
      label.classList.add('selected');
    });
  });
}

