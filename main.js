const zeldaDisplay = document.querySelector('.displayResults');
const searchBar = document.getElementById('searchbar');
const infoButton = document.querySelectorAll('.btn');

let zeldaData = [];

let reqData = '';

const fetchData = async () => {
    await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/${reqData}`)	
    .then(res => res.json())
    .then((data) => {
        console.log(data); // Log the response to inspect its structure

        // Adjust the structure based on the actual response
        const fetches = data.data.map((item) => {
            return {
                id: item.id,
                name: item.name,
                img: item.image,
                description: item.description,
            };
        });

        zeldaData = fetches;
        zeldaCards('');
    })
    .catch(error => console.error('Error fetching data:', error));
};


const zeldaCards = (searchString) => {
    const cards = zeldaData
    .filter((monster) => {
        return monster.name.toLowerCase().includes(searchString);
    })
    .map((monster) => {
        return `<div class="card">
        <p
        >#${monster.id}</p>
        <h3 class="name_card">${monster.name.toUpperCase()}</h3>
        <div>
            <img src="${monster.img}" alt="${monster.name}"/>
        </div>
        <div>
        <p class="description"> ${monster.description} </p>
        </div>
        </div>`;
    })
    .join('');
    zeldaDisplay.innerHTML = cards;
}


searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    console.log(searchString);
   zeldaCards(searchString);

});

const infoBut = () => {
    infoButton.forEach((button) => 
    button.addEventListener('click', () => {
        let info = button.getAttribute('id');
        console.log('Button INFO is ', info);
        reqData = info;
        console.log('REQ DATA is ', reqData);
        fetchData(); 
    })
    );
}

fetchData();

infoBut();