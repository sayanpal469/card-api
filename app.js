const inputField = document.getElementById('input-value')
const mainDiv = document.getElementById('main-div')
const error = document.getElementById('error')
const detailsDiv = document.getElementById('details-div')

const getInput = () => {
    const inputValue = inputField.value

    if(isNaN(inputValue) || inputValue == '') {
        error.innerText= 'Please give a number'
        inputField.value = ''
        mainDiv.innerHTML = ''
    } else if (inputValue <= 0) {
        error.innerText = 'Please give a positive number'
        inputField.value = ''
        mainDiv.innerHTML = ''
    } else {
        mainDiv.innerHTML = ''
        
        const url = `https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`
        fetch(url)
        .then(res => res.json())
        .then(data => {
          //detailsDiv.style.display = 'none'
          detailsDiv.classList.remove('displayBlock')
           detailsDiv.classList.add('d-none')
          loadCards(data.cards)
        })

        inputField.value = ''
        error.innerText = ''
    }

    inputField.value = ''
} 

const loadCards = cards => {
    cards.forEach(card => {
       // mainDiv.innerHTML = ''
        const div = document.createElement('div')
        div.classList.add('col-lg-3')
        div.innerHTML =  `
        
        <div class="card text-center border-0">
          <img class="card-img-top" src="${card.image}" alt="Card image cap">
          <div class="card-body">
           <button onclick="cardDetails('${card.code}')" class="btn btn-primary">Details</button>
          </div>
        </div>
        ` 
        mainDiv.appendChild(div)        
    })
}

const cardDetails = details => {
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
    .then(res => res.json())
    .then(data => {
       detailsDiv.innerHTML = ''

        const allCard = data.cards
        //console.log(allCard);
        const singelCard = allCard.find(x => x.code == details)
       // detailsDiv.style.display = 'block'
       detailsDiv.classList.remove('d-none')
       detailsDiv.classList.add('displayBlock')
       const div = document.createElement('div')
        div.innerHTML = `
        <div class="card mb-3 text-center" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${singelCard.image}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Card Code : ${singelCard.code}</h5>
              <p class="card-text">Suit: ${singelCard.suit}</small></p>
              <p class="card-text">Value: ${singelCard.value}</small></p>
            </div>
          </div>
        </div>
      </div>
        `
        detailsDiv.appendChild(div)
    })
}
