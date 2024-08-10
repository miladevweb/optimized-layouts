function createImage(blobUrl) {
  const pictureContainer = document.querySelector('#picture-container')
  const fragment = document.createDocumentFragment()
  const picture = document.createElement('picture')

  picture.innerHTML = `
        <source
          type="image/webp"
          srcset="${blobUrl}"
        />
        <img
          alt="#"
          loading="lazy"
          src="${blobUrl}"
        />
`

  const img = picture.querySelector('img')

  function loaded() {
    pictureContainer.classList.add('loaded')
    URL.revokeObjectURL(blobUrl)
  }

  if (img.complete) loaded()
  else img.addEventListener('load', loaded)

  fragment.append(picture)
  pictureContainer.append(fragment)
}

const url =
  'https://scontent.flim30-1.fna.fbcdn.net/v/t1.6435-9/92097597_2700743383480247_2977929687944134656_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=1iz1-xzZxtAQ7kNvgHYRIKl&_nc_ht=scontent.flim30-1.fna&oh=00_AYAh1vOtIRQQ1b_OxEALRWcj33BWcjQQ1s-9aFnPIRZsSA&oe=66DE42D3'

fetch(url)
  .then((res) => res.blob())
  .then((blob) => {
    const blobUrl = URL.createObjectURL(blob)
    createImage(blobUrl)
  })

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
