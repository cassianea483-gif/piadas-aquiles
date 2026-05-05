async function getJoke() {
  const jokeElement = document.getElementById('joke');
  const btn = document.getElementById('jokeBtn');
  if (!jokeElement || !btn) return;
  jokeElement.textContent = 'Carregando...';
  btn.disabled = true;

  try {
    const select = document.getElementById('categorySelect');
    const category = select && select.value ? `?category=${encodeURIComponent(select.value)}` : '';
    const response = await fetch(`https://api.chucknorris.io/jokes/random${category}`);
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
  const select = document.getElementById('categorySelect');
  if (btn) btn.addEventListener('click', getJoke);
  // Load categories into the select
  (async function loadCategories(){
    if (!select) return;
    try{
      const res = await fetch('https://api.chucknorris.io/jokes/categories');
      if (!res.ok) throw new Error('Network response was not ok');
      const cats = await res.json();
      // reset keeping first option
      select.innerHTML = '<option value="">Aleatória</option>';
      cats.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c.charAt(0).toUpperCase() + c.slice(1);
        select.appendChild(opt);
      });
    }catch(e){
      console.error('Erro ao carregar categorias', e);
    }
  })();

  getJoke();
});
