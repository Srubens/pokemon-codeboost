let slide_hero = new Swiper(".slide-hero",{
    effect:'fade',
    pagination:{
        el:".slide-hero .main-area .area-explore .swiper-pagination",
    },
})

const cardPokemon = document.querySelectorAll('.js-open-details-pokemon')
const btnCloseModal = document.querySelector('.js-close-modal-details')
const btnDropdownSelect = document.querySelector('.js-open-select-custom')
let dropdownSelect = document.querySelector('.dropdown-select')

btnDropdownSelect.addEventListener("click", () =>{
    btnDropdownSelect.parentElement.classList.toggle('active')
})

const areaTypesModal = document.getElementById('js-types-pokemon')
const heightPokemonModal = document.getElementById('js-height-pokemon')
const weightPokemonModal = document.getElementById('js-weight-pokemon')
const mainAbilitiesPokemonModal = document.getElementById('js-main-abilities')


function openDetailsPokemon(){
    document.documentElement.classList.add('open-modal')
    let codePokemon = this.getAttribute('code-pokemon')
    let imagePokemon = this.querySelector('.thumb-img')
    let iconPokemon = this.querySelector('.img-icon')
    let namePokemon = this.querySelector('.text h3')
    let idPokemon = this.querySelector('.text span')
    console.log(namePokemon)

    const modalDetails = document.getElementById('js-modal-details')
    modalDetails.setAttribute('type-pokemon-modal', this.classList[2])
    let imagePokemonModal = document.getElementById('js-image-pokemon-modal')
    imagePokemonModal.setAttribute('src', imagePokemon.getAttribute('src'))
    let modalIconPokemon = document.querySelector('.icon-img') 
    modalIconPokemon.setAttribute('src',iconPokemon.getAttribute('src'))
    let nameModal = document.querySelector('.name h2')
    nameModal.textContent = namePokemon.textContent
    let codeModal = document.querySelector('.name>span')
    codeModal.textContent = idPokemon.textContent


    axios({
        method:'GET',
        url:`https://pokeapi.co/api/v2/pokemon/${codePokemon}`
    })
    .then((response) =>{
        let data = response.data
        console.log(data)
        let infoPokemon = {
            mainAbilities:primeraLetraMaiuscula(data.abilities[0].ability.name),
            types:data.types,
            weight:data.weight,
            height:data.height,
            abilities:data.abilities,
            stats:data.stats,
            urlType:data.types[0].type.url
        }
        console.log(infoPokemon)
        function listingTypesPokemon(){
            
            areaTypesModal.innerHTML = ""
            let arrayTypes = infoPokemon.types 

            arrayTypes.forEach((itemType) =>{
                let itemList = document.createElement('li')
                areaTypesModal.appendChild(itemList)
                let spanList = document.createElement('span')
                spanList.classList = `tag-type ${itemType.type.name}`
                spanList.textContent = primeraLetraMaiuscula(itemType.type.name)
                
                itemList.appendChild(spanList)
                

            })
        }

        function listingWeaknesses(){
            const areaWeak = document.getElementById('js-area-weak')
            areaWeak.innerHTML = ""
            axios({
                method:'GET',
                url:`${infoPokemon.urlType}`
            })
            .then((response) =>{
                console.log(response.data)
                let weaknesses = response.data.damage_relations.double_damage_from
                weaknesses.forEach((itemType) =>{
                    console.log('itemType', itemType)
                    let itemListWeak = document.createElement('li')
                    areaWeak.appendChild(itemListWeak)
                    let spanList = document.createElement('span')
                    spanList.classList = `tag-type ${itemType.name}`
                    spanList.textContent = primeraLetraMaiuscula(itemType.name)
                    
                    itemListWeak.appendChild(spanList)
                    
    
                })
            })
        }

        heightPokemonModal.textContent = `${infoPokemon.height / 10}m`
        weightPokemonModal.textContent = `${infoPokemon.weight / 10}kg`
        mainAbilitiesPokemonModal.textContent = infoPokemon.mainAbilities

        const statsHP = document.getElementById('js-stats-hp')
        const statsAttack = document.getElementById('js-stats-attack')
        const statsDefense = document.getElementById('js-stats-defense')
        const statsSpattack = document.getElementById('js-stats-spattack')
        const statsSpdefense = document.getElementById('js-stats-spdefense')
        const statsSpeed = document.getElementById('js-stats-speed')
        statsHP.style.width = `${infoPokemon.stats[0].base_stat}%`
        statsAttack.style.width = `${infoPokemon.stats[1].base_stat}%`  
        statsDefense.style.width = `${infoPokemon.stats[2].base_stat}%`
        statsSpattack.style.width = `${infoPokemon.stats[3].base_stat}%`
        statsSpdefense.style.width = `${infoPokemon.stats[4].base_stat}%`
        statsSpeed.style.width = `${infoPokemon.stats[5].base_stat}%`
        // console.log(statsHP)
        
        listingTypesPokemon()
        listingWeaknesses()
    })
}

function closeDetailsPokemon(){
    document.documentElement.classList.remove('open-modal')
}

cardPokemon.forEach((card) => {
    card.addEventListener("click", openDetailsPokemon)
})

btnCloseModal.addEventListener("click", closeDetailsPokemon)

function primeraLetraMaiuscula(name){
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

const areaPokemons = document.getElementById('js-list-pokemon')
const countPokemos = document.querySelector('.js-count-pokemons')

function createCardPokemon(code, type, name, imagePok){
    const card = document.createElement('button')
    card.classList = `card-pokemon js-open-details-pokemon ${type}`
    card.setAttribute('code-pokemon',code)
    areaPokemons.appendChild(card)

    let divImage = document.createElement('div')
    divImage.classList = `image`
    card.appendChild(divImage)

    let image = document.createElement('img')
    image.classList = `thumb-img`
    image.src = imagePok
    divImage.appendChild(image)

    let divInfo = document.createElement('div')
    divInfo.classList = `info`
    card.appendChild(divInfo)

    let divText = document.createElement('div')
    divText.classList = `text`
    divInfo.appendChild(divText)
    
    let divIcon = document.createElement('div')
    divIcon.classList = `icon`
    divInfo.appendChild(divIcon)

    let spanCode = document.createElement('span')
    spanCode.innerHTML = (code < 10) ? `#00${code}` : (code >= 10 && code <= 99) ? `#0${code}` :`#${code}`
      
    divText.appendChild(spanCode)
    
    let h3Name = document.createElement('h3')
    let upperCase = primeraLetraMaiuscula(name)
    h3Name.innerHTML = `${upperCase}`
    divText.appendChild(h3Name)

    let imageIcon = document.createElement('img')
    imageIcon.classList.add('img-icon')
    imageIcon.setAttribute('src',`img/icon-types/${type}.svg`)
    divIcon.appendChild(imageIcon)

}

function listingPokemon(urlAPI){
    axios({
        method:'GET',
        url:urlAPI
    })
    .then((res) =>{
        
        const {results, next, count} = res.data
        countPokemos.innerText = count
        // console.log(results)

        results.forEach((pokemon) =>{
            let urlAPIDetails = pokemon.url
            // console.log(urlAPIDetails)
            axios({
                method:'GET',
                url:`${urlAPIDetails}`
            })
            .then((response) =>{
                getAPIResponsePokemon (response)
            })
        })
    })
}

listingPokemon('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0')

const areaTypes = document.getElementById('js-type-area')
const areaTypesMobile = document.querySelector('.js-dropdown-select')

axios({
    method:'GET',
    url:`https://pokeapi.co/api/v2/type`
})
.then((response) =>{
    const {results} = response.data
    results.forEach((type, index) =>{
        if( index < 18 ){
            let itemType = document.createElement('li')
            areaTypes.appendChild(itemType)
            let buttonType = document.createElement('button')
            buttonType.setAttribute('code-type',index+1)
            buttonType.classList = `type-filter ${type.name}`
            itemType.appendChild(buttonType)
            let divIcon = document.createElement('div')
            divIcon.classList = `icon`
            buttonType.appendChild(divIcon)
            let image = document.createElement('img')
            image.setAttribute('src',`img/icon-types/${type.name}.svg`)
            divIcon.appendChild(image)
            let spanName = document.createElement('span')
            let primeiraLetra = primeraLetraMaiuscula(type.name)
            spanName.innerText = primeiraLetra
            buttonType.appendChild(spanName)
            //area types mobile
            let itemTypeMobile = document.createElement('li')
            areaTypesMobile.appendChild(itemTypeMobile)
            let buttonTypeMobile = document.createElement('button')
            buttonTypeMobile.setAttribute('code-type',index+1)
            buttonTypeMobile.classList = `type-filter ${type.name}`
            itemTypeMobile.appendChild(buttonTypeMobile)
            let divIconMobile = document.createElement('div')
            divIconMobile.classList = `icon`
            buttonTypeMobile.appendChild(divIconMobile)
            let imageMobile = document.createElement('img')
            imageMobile.setAttribute('src',`img/icon-types/${type.name}.svg`)
            divIconMobile.appendChild(imageMobile)
            let spanNameMobile = document.createElement('span')
            let primeiraLetraMobile = primeraLetraMaiuscula(type.name)
            spanNameMobile.innerText = primeiraLetraMobile
            buttonTypeMobile.appendChild(spanNameMobile)

            const allTypes = document.querySelectorAll('.type-filter')

            allTypes.forEach((btn) =>{
                btn.addEventListener('click', filterByTypes)
            })

        }
    })
})

const btnLoadMore = document.querySelector('.js-btn-load-more')
btnLoadMore.addEventListener('click',showMorePokemon)

let countPaginator = 10

function showMorePokemon(){
    listingPokemon(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPaginator}`)
    countPaginator = countPaginator + 9
}

function getAPIResponsePokemon (response) {
    const { name, id, sprites, types } = response.data
    // console.log(response.data)
    const infoCard = {
        name:name,
        code:id,
        image:sprites.other.dream_world.front_default,
        type:types[0].type.name
    }

    if(infoCard.image){
        createCardPokemon(infoCard.code,infoCard.type,infoCard.name,infoCard.image)
    }

    const cardPokemon = document.querySelectorAll('.js-open-details-pokemon')
    cardPokemon.forEach((card) =>{
        card.addEventListener('click',openDetailsPokemon)
    })
}

function filterByTypes(){
    let idPokemon = this.getAttribute('code-type')
    const allType = document.querySelectorAll('.type-filter')
    const areaTypes = document.getElementById('js-list-pokemon')
    const btnLoadMore = document.querySelector('.js-btn-load-more')

    btnLoadMore.style.display = "none"
    areaTypes.innerHTML = ""

    const sectionPokemons = document.querySelector('.s-all-info-pokemons')
    const topSection = sectionPokemons.offsetTop

    // console.log(topSection)

    window.scrollTo({
        top:topSection +288,
        behavior:'smooth'
    })


    allType.forEach((type) =>{
        type.classList.remove('active')
    })

    this.classList.add('active')

    if( idPokemon ){
        axios({
            method:'GET',
            url:`https://pokeapi.co/api/v2/type/${idPokemon}`
        })
        .then((response) =>{
            // console.log(response.data.pokemon)
            const {pokemon} = response.data
            countPokemos.textContent = pokemon.length 
            pokemon.forEach((pok) =>{
                const {url} = pok.pokemon
                axios({
                    method:'GET',
                    url:`${url}`
                })
                .then((response) =>{
                    getAPIResponsePokemon (response)
                })
            })
        })

    }else{
        areaTypes.innerHTML = ""
        listingPokemon('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0')
        btnLoadMore.style.display = "block"
    }

}

const btnSearch = document.getElementById('js-btn-search')
const inputSearch = document.getElementById('js-input-search')
btnSearch.addEventListener('click',searchPokemon)

inputSearch.addEventListener('keyup', (event) =>{
    if(event.code === "Enter"){
        searchPokemon()
    }
})

function searchPokemon(){
    const typeFilter = document.querySelectorAll('.type-filter')
    let valueIpunt = inputSearch.value.toLowerCase() 

    typeFilter.forEach((filter) =>{
        filter.classList.remove('active')
    })
    // console.log(valueIpunt)
    axios({
        method:'GET',
        url:`https://pokeapi.co/api/v2/pokemon/${valueIpunt}`
    })
    .then((response) =>{
        // console.log(response)
        areaPokemons.innerHTML = ""
        btnLoadMore.style.display = "none"
        countPokemos.innerText = 1
        getAPIResponsePokemon(response)
    })
    .catch((erro) =>{
        if(erro.response){
            areaPokemons.innerHTML = ""
            btnLoadMore.style.display = "none"
            countPokemos.innerText = 0
            // console.log(`Erro no: ${erro.mesage}`)
            alert(`Não foi encontrado nenhum pokemon`)
        }
    })
}
