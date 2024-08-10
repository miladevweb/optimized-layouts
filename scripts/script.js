const theme = localStorage.getItem('theme')
const doc = document.documentElement

if (theme === 'dark') {
  doc.classList.remove('light')
  doc.classList.add('dark')
} else if (theme === 'light') {
  doc.classList.remove('dark')
  doc.classList.add('light')
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  doc.classList.add('dark')
  localStorage.setItem('theme', 'dark')
} else {
  doc.classList.add('light')
  localStorage.setItem('theme', 'light')
}
