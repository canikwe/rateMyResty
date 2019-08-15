document.addEventListener('DOMContentLoaded', () => {
    console.log('locked and loaded')
    //declare nedded variables
    const main = document.querySelector('#card-container')
    const inputDiv = document.querySelector('#input-container')

    //render the DOM
    renderNav()
    renderForm(db, inputDiv)
    db.forEach(rest => renderRestaurant(rest, main))
})


function fetchRestaurants(){
    //some fetch logic here
}

function renderRestaurant(rest, mainEl){
    const divContainer = document.createElement('div')
    divContainer.classList.add('ui', 'card')

    const imgDiv = document.createElement('div')
    imgDiv.className = 'image'

    const img = document.createElement('img')
    img.src = 'https://www.stlmag.com/downloads/291284/download/0219_Elmwood_0016.jpg?cb=05f56521ae049e15a8f3d244cafb3822&w=640'

    const name = document.createElement('h2')
    name.innerText = rest.name

    const desc = document.createElement('p')
    desc.innerText = rest.description

    const ratings = document.createElement('ul')
    ratings.id = `ratings-${rest.id}`

    imgDiv.append(img)
    divContainer.append(imgDiv, name, desc, ratings)
    mainEl.append(divContainer)
}

function renderForm(restaurants, inputDiv){
    const form = document.createElement('form')
    form.classList.add('ui', 'form')

    const restGroup = document.createElement('div')
    restGroup.classList.add('field')

    const select = document.createElement('select')
    select.classList.add('ui', 'fluid', 'search', 'dropdown')
    select.name = 'restaurant'

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

function renderNav(){
    const nav = document.querySelector('#nav')
    nav.innerHTML = `
        <div class="ui secondary  menu">
            <a class="active item">
                Home
            </a>
            <a class="item">
                Messages
            </a>
            <a class="item">
                Friends
            </a>
            <div class="right menu">
                <div class="item">
                <div class="ui icon input">
                    <input type="text" placeholder="Search...">
                    <i class="search link icon"></i>
                </div>
                </div>
                <a class="ui item">
                Logout
                </a>
            </div>
        </div>
    `
}