  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
  document.getElementById('year').textContent = new Date().getFullYear();
  let selectedRating = 5;
  const ratingButtons = [...document.querySelectorAll('#ratingPicker button')];
  function paintRating() {
    ratingButtons.forEach(button => button.classList.toggle('active', Number(button.dataset.rating) <= selectedRating));
  }
  ratingButtons.forEach(button => button.addEventListener('click', () => {
    selectedRating = Number(button.dataset.rating);
    paintRating();
  }));
  paintRating();
  const toast = document.getElementById('toast');
  function showToast(message) {
    toast.textContent = message;
    toast.style.display = 'block';
    window.setTimeout(() => { toast.style.display = 'none'; }, 2800);
  }
  document.getElementById('feedbackForm').addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('reviewName').value.trim();
    const topic = document.getElementById('reviewTopic').value;
    const comment = document.getElementById('reviewText').value.trim();
    if (!name || !comment) return;
    const card = document.createElement('article');
    card.className = 'review-card';
    const top = document.createElement('div'); top.className = 'review-top';
    const person = document.createElement('strong'); person.textContent = name;
    const stars = document.createElement('span'); stars.className = 'stars'; stars.textContent = '★'.repeat(selectedRating) + '☆'.repeat(5 - selectedRating);
    top.append(person, stars);
    const meta = document.createElement('span'); meta.className = 'small'; meta.textContent = 'Demo feedback · ' + topic;
    const paragraph = document.createElement('p'); paragraph.textContent = '“' + comment + '”';
    card.append(top, meta, paragraph);
    document.getElementById('reviewList').prepend(card);
    event.target.reset(); selectedRating = 5; paintRating();
    showToast('Your sample feedback has been added to this page.');
  });
