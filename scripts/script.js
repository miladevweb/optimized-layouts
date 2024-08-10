const theme = localStorage.getItem('theme')
const doc = document.documentElement

// Set up theme on load
if (theme === 'dark') {
  doc.classList.remove('light')
  doc.classList.add('dark')
} else if (theme === 'light') {
  doc.classList.remove('dark')
  doc.classList.add('light')
} else if (matchMedia('(prefers-color-scheme: dark)').matches) {
  doc.classList.add('dark')
  localStorage.setItem('theme', 'dark')
} else {
  doc.classList.add('light')
  localStorage.setItem('theme', 'light')
}
