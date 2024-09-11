const zeldaDisplay = document.querySelector('.displayResults');
const searchBar = document.getElementById('searchbar');
let zeldaData = [];

const fetchData = async () => {
    await fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters')
    .then(res => res.json())
    .then((data) => {
        console.log(data); // Log the response to inspect its structure

        // Assuming the structure is { data: { category: [items] } }
        const fetches = data.data.map((item) => {
            return {
                id: item.id,
                name: item.name,
                img: item.image,
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
        </div>`;
    })
    .join('');
    zeldaDisplay.innerHTML = cards;
}


searchbar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    console.log(searchString);
   zeldaCards(searchString);

});


fetchData();