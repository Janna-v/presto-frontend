function generateAnnouncementColumn(annuncement) {

    // TODO: Data

    // let clazz = 'bg-primary';
    // if(annuncement.type == 'sell') {
    //     clazz = 'bg-danger';
    // }

    const col = document.createElement('div');
    col.classList.add('col-12', 'col-md-6', 'col-xl-4');
    col.innerHTML = `
        <article class="card shadow border-0 ">
            <div class="position-relative">
                <img src="https://picsum.photos/seed/237/640/480" class="card-img-top" alt="...">
                <span class="badge position-absolute top-0 end-0 py-2 px-3 ${annuncement.type == 'sell' ? 'bg-danger' : 'bg-primary'} text-uppercase">${annuncement.type}</span>
            </div>
            <div class="card-body p-4">
                <h3 class="card-subtitle mb-2 h5 fw-semibold text-primary">€${annuncement.price}</h3>
                <h2 class="card-title mb-2 display-5">${annuncement.name}</h2>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
            </div>
            <div class="card-footer d-flex justify-content-around p-4 bg-white text-primary">
                <p class="mb-0"><i class="bi bi-heart-fill me-2"></i><span>Like</span></p>
                <p class="mb-0"><i class="bi bi-tag-fill me-2"></i><span>${annuncement.category}</span></p>
                <p class="mb-0"><i class="bi bi-calendar-fill me-2"></i><span>27/03/2023</span></p>
            </div>
        </article>`;

    return col;
}

function showAnnouncements(annuncements, parentElement) {

    // clear
    // parentElement.innerHTML = '';
    while(parentElement.hasChildNodes()) {
        parentElement.removeChild(parentElement.firstChild);
    }

    annuncements.forEach((annuncement) => {
        const col = generateAnnouncementColumn(annuncement);
        parentElement.appendChild(col);
    }); 
}

function filteringAndSorting(annuncements, options) {

    // refactoring
    let filteredAnnuncements = annuncements.filter((annuncement) => {

        let isAnnouncementGood = true;

        if(options.search) {
            isAnnouncementGood = annuncement.name.toLowerCase().includes(options.search.toLowerCase());
        }

        if(isAnnouncementGood && options.category) {
            isAnnouncementGood = annuncement.category == options.category;
        }

        if(isAnnouncementGood && options.minPrice) {
            isAnnouncementGood = Number(annuncement.price) >= Number(options.minPrice);
        }

        if(isAnnouncementGood && options.maxPrice) {
            isAnnouncementGood = Number(annuncement.price) <= Number(options.maxPrice);
        }
        
        return isAnnouncementGood;
    });

    switch(options.orderBy) {
        case 'ascByPrice':
            filteredAnnuncements.sort((left, right) => {
                return Number(left.price) - Number(right.price);
            });
            break;
        case 'descByPrice':
            filteredAnnuncements.sort((left, right) => {
                return Number(right.price) - Number(left.price);
            });
            break;
        case 'ascByAlpha':
            filteredAnnuncements.sort((left, right) => {
                return left.name.toLowerCase().localeCompare(right.name.toLowerCase());
            });
            break;
        case 'descByAlpha':
            filteredAnnuncements.sort((left, right) => {
                return right.name.toLowerCase().localeCompare(left.name.toLowerCase());
            });
            break;
    }

    return filteredAnnuncements;
}

function showCategoriesOptions(annuncements, parentElement) {
    const categories = new Set();

    annuncements.forEach((annuncement) => {
        categories.add(annuncement.category);
    });

    categories.forEach((category) => {
        const option = document.createElement('option');
        option.setAttribute('value', category);
        option.textContent = category;
        parentElement.appendChild(option);
    });
}

async function loadAnnoucements() {
    const response = await fetch('/server/api/annunci.json');
    console.log(response.status);   // 200
    return await response.json();
}

document.addEventListener('DOMContentLoaded', async () => {

    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const minPriceInput = document.getElementById('minPriceInput');
    const maxPriceInput = document.getElementById('maxPriceInput');
    const sortSelect = document.getElementById('sortSelect');

    const announcementsRow = document.getElementById('announcementsRow');

    try {
        const annuncements = await loadAnnoucements();
        showCategoriesOptions(annuncements, categorySelect);
        showAnnouncements(annuncements, announcementsRow);

        const filterAndSortForm = document.getElementById('filterAndSortForm');
        filterAndSortForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const options = {
                search: searchInput.value,
                category: categorySelect.value,
                minPrice: minPriceInput.value,
                maxPrice: maxPriceInput.value,
                orderBy: sortSelect.value
            };

            const filteredAnnuncements = filteringAndSorting(annuncements, options);
            showAnnouncements(filteredAnnuncements, announcementsRow);
        });
    } catch(error) {
        console.error(error);
    }
});