async function getJoke() {
  const jokeElement = document.getElementById('joke');
  const btn = document.getElementById('jokeBtn');
  if (!jokeElement || !btn) return;
  jokeElement.textContent = 'Carregando...';
  btn.disabled = true;

  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    jokeElement.textContent = data.value || 'Sem piada disponível.';
  } catch (err) {
    console.error(err);
    jokeElement.textContent = 'Erro ao carregar a piada. Tente novamente.';
  } finally {
    btn.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('jokeBtn');
  if (btn) btn.addEventListener('click', getJoke);
  getJoke();
});
