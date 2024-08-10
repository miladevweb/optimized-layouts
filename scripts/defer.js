const pictureContainers = document.querySelectorAll('[data-picture-container]')

const urls = [
  'https://scontent.flim30-1.fna.fbcdn.net/v/t1.6435-9/92097597_2700743383480247_2977929687944134656_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=1iz1-xzZxtAQ7kNvgHYRIKl&_nc_ht=scontent.flim30-1.fna&oh=00_AYAh1vOtIRQQ1b_OxEALRWcj33BWcjQQ1s-9aFnPIRZsSA&oe=66DE42D3',

  'https://imgix.bustle.com/uploads/getty/2024/6/14/97963092/incheon-south-korea-march.jpg?w=414&h=259&fit=crop&crop=faces&q=50&dpr=2',
]

function loaded(container, url) {
  container.classList.add('loaded')
  URL.revokeObjectURL(url)
}

function createImage(url, i) {
  const fragment = document.createDocumentFragment()
  const picture = document.createElement('picture')

  const pictureContainer = pictureContainers[i]

  picture.innerHTML = `
        <source
          srcset="${url}"
          type="image/webp"
        />
        <img
          alt="#"
          src="${url}"
          loading="lazy"
        />
    `
  const img = picture.querySelector('img')

  if (img.complete) loaded(pictureContainer, url)
  else img.addEventListener('load', () => loaded(pictureContainer, url))

  fragment.append(picture)
  pictureContainer.append(fragment)
}

// Fetching image
function fetchImage() {
  urls.forEach(async (url, i) => {
    const res = await fetch(url)
    const blob = await res.blob()
    const blobUrl = URL.createObjectURL(blob)
    createImage(blobUrl, i)
  })
}
fetchImage()

// Theme Switcher
document.querySelector('button').addEventListener('click', () => {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')

    localStorage.setItem('theme', 'light')
  } else {
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')

    localStorage.setItem('theme', 'dark')
  }
})
