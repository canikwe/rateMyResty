document.addEventListener('DOMContentLoaded', () => {
    console.log('locked and loaded')

    const main = document.querySelector('#card-container')
    const inputDiv = document.querySelector('#input-container')
    
    renderNav()
    renderHomepage()
})

function renderHomepage() {
    const main = document.querySelector('#main')
    main.innerText = ''

    const title = document.createElement('h2')
    title.innerText = 'Welcome to Rate My Resty 🍽'

    const form = document.createElement('form')
    form.classList.add('ui', 'form')

    const inputDiv = document.createElement('div')
    inputDiv.className = 'field'

    const input = document.createElement('input')
    input.placeholder = 'Search For Resties'
    inputDiv.append(input)

    const submitDiv = document.createElement('div')
    submitDiv.className = 'field'

    const submit = document.createElement('input')
    submit.type = 'submit'
    submit.value = 'Search Restaurants'
    submit.classList.add('ui', 'button')
    submitDiv.append(submit)

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        searchResties(input)
    })

    form.append(inputDiv, submitDiv)
    main.append(title, form)
}

function searchResties(input){

    const main = document.querySelector('#main')
    main.innerHTML= '<h2>Loading...</h2>'

    fetchRestaurants(main, input)
}

function fetchRestaurants(main, input){
    fetch(`http://localhost:3000/yelp/restaurant/${input.value}`)
    .then(res => res.json())
    .then(businesses => {
        main.innerText = ''
        console.log(businesses)
        
        renderSearchResultsPage()
        renderForm(businesses)
        businesses.forEach(b => renderRestaurant(b, main))
    })
    .catch(err => {
        console.log(err.message)
        main.innerHTML = `<h2>Sinatra doesn't know this ditty...</h2>`
    })
}

function renderRestaurant(rest, mainEl){
    const cardContainer = document.querySelector('#card-container')
    const divContainer = document.createElement('div')
    divContainer.classList.add('ui', 'card')

    const imgDiv = document.createElement('div')
    imgDiv.className = 'image'

    const img = document.createElement('img')
    img.src = rest.image_url || 'https://www.stlmag.com/downloads/291284/download/0219_Elmwood_0016.jpg?cb=05f56521ae049e15a8f3d244cafb3822&w=640'

    const name = document.createElement('h2')
    name.innerText = rest.name

    const desc = document.createElement('p')
    desc.innerText = rest.location.display_address

    const ratings = document.createElement('ul')
    ratings.id = `ratings-${rest.id}`

    imgDiv.append(img)
    divContainer.append(imgDiv, name, desc, ratings)
    cardContainer.append(divContainer)
}

function renderSearchResultsPage(){
    const main = document.querySelector('#main')

    const container = document.createElement('div')
    container.id = 'container'
    container.classList.add('ui', 'grid')

    const columnDiv = document.createElement('div')
    columnDiv.classList.add('ten', 'wide', 'column')

    const cardContainer = document.createElement('div')
    cardContainer.id = 'card-container'
    cardContainer.classList.add('ui', 'cards')

    const inputContainer = document.createElement('div')
    inputContainer.id = 'input-container'
    inputContainer.classList.add('six', 'wide', 'column')

    columnDiv.append(cardContainer)
    container.append(columnDiv, inputContainer)

    main.append(container)
}

function renderForm(restaurants){
    const inputDiv = document.querySelector('#input-container')

    const form = document.createElement('form')
    form.classList.add('ui', 'form')

    const restGroup = document.createElement('div')
    restGroup.classList.add('field')

    const select = document.createElement('select')
    select.classList.add('ui', 'fluid', 'search', 'dropdown')
    select.name = 'restaurant'

    const defaultOption = document.createElement('option')
    defaultOption.value = ''
    defaultOption.innerText = 'Choose a Resty'
    select.append(defaultOption)

    restaurants.forEach(rest => {
        const option = document.createElement('option')
        option.value = rest.id
        option.innerText = rest.name

        select.append(option)
    })


    const inputFieldDiv = document.createElement('div')
    inputFieldDiv.classList.add('field')

    const inputLabel = document.createElement('label')
    inputLabel.innerText = 'Title'

    const input = document.createElement('input')
    input.placeholder = 'Title'
    input.name = 'title'

    
    const contentFieldDiv = document.createElement('div')
    contentFieldDiv.classList.add('field')

    const contentLabel = document.createElement('label')
    contentLabel.innerText = 'Content'

    const content = document.createElement('textarea')
    content.name = 'content'

    const submit = document.createElement('div')
    submit.classList.add('ui', 'button')
    submit.innerText = 'Submit'

    restGroup.append(select)
    inputFieldDiv.append(inputLabel, input)
    contentFieldDiv.append(contentLabel, content)
    form.append(restGroup, inputFieldDiv, contentFieldDiv, submit)
    inputDiv.append(form)

    //add event listeners
    submit.addEventListener('click', addRating)

}

function addRating(e){
    console.log('adding a rating!')

    const form = e.target.parentElement
    const data = {
        restaurant: form.restaurant.value,
        title: form.title.value,
        content: form.content.value
    }

    if (data.restaurant === ''){
        alert('Please choose a real resty!')
    } else {
        const ratingUl = document.querySelector(`#ratings-${form.restaurant.value}`)
        const ratingTitle = document.createElement('li')
        const ratingContentContainer = document.createElement('ul')
        const ratingContent = document.createElement('li')
        
        ratingTitle.innerText = data.title
        ratingContent.innerHTML = data.content
    
        ratingContentContainer.append(ratingContent)
        ratingTitle.append(ratingContentContainer)
        ratingUl.append(ratingTitle)
    
        form.reset()
    }
}

function renderNav(){
    const nav = document.querySelector('#nav')

    const mainDiv = document.createElement('div')
    mainDiv.classList.add('ui', 'secondary', 'menu')

    const header = document.createElement('div')
    header.classList.add('header', 'item')
    header.innerText = 'Rate My Resty'

    const home = document.createElement('a')
    home.classList.add('active', 'item')
    home.innerText = 'Home'
    home.addEventListener('click', renderHomepage)

    const rightMenu = document.createElement('div')
    rightMenu.classList.add('right', 'menu')

    const item1 = document.createElement('div')
    item1.className = 'item'

    const iconInput = document.createElement('div')
    iconInput.classList.add('ui', 'icon', 'input')

    const search = document.createElement('input')
    search.placeholder = 'Search by Resty Name...'

    const icon = document.createElement('i')
    icon.id = 'search'
    icon.classList.add('search', 'link', 'icon')

    const logout = document.createElement('a')
    logout.classList.add('ui', 'item')
    logout.innerText = 'Logout'

    iconInput.append(search, icon)

    item1.append(iconInput)
    rightMenu.append(item1, logout)

    mainDiv.append(header, home, rightMenu)

    nav.append(mainDiv)
    const searchBtn = document.querySelector('#search')
    searchBtn.addEventListener('click', searchRestaurants)

}

function searchRestaurants(e){
    const input = e.target.parentElement.firstElementChild.value
    const restaurants = document.querySelectorAll('.card')

    restaurants.forEach(rest => {
        const name = rest.querySelector('h2')
        name.innerText.includes(input) ? rest.style.display = '' : rest.style.display = 'none'
    })
}