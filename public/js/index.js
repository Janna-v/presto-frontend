function generateCategoryColumn(category) {

    const col = document.createElement('div');
    col.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3');

    const card = document.createElement('div');
    card.classList.add('card-category', 'p-3');
    col.appendChild(card);

    const cardBodyCategory = document.createElement('div');
    cardBodyCategory.classList.add('card-body-category', 'p-3');
    card.appendChild(cardBodyCategory);

    const cardIconCategory = document.createElement('div');
    cardIconCategory.classList.add('card-icon-category', 'mb-3');
    cardBodyCategory.appendChild(cardIconCategory);



    const icon = document.createElement('i');
    // icon.classList.add('bi', 'bi-car-front-fill');
    const classes = category.icon.split(' ');
    classes.forEach((clazz) => {
        icon.classList.add(clazz);
    });
    // icon.classList.add(...classes); // spread operator
    cardIconCategory.appendChild(icon);



    const title = document.createElement('h3');
    title.textContent = category.name;
    cardBodyCategory.appendChild(title);

    const announcementsDescription = document.createElement('p');
    announcementsDescription.classList.add('mb-0');
    announcementsDescription.textContent = `${category.announcementsCount} Annunci`;
    cardBodyCategory.appendChild(announcementsDescription);

    return col;
}

function showCategories(categories, parentElement) {
    categories.forEach((category) => {
        const col = generateCategoryColumn(category);
        parentElement.appendChild(col);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/server/api/categorie.json');
        console.log(response.status);   // 200
        const categories = await response.json();
        // console.log(categories);

        const categoriesRow = document.getElementById('categoriesRow');
        showCategories(categories, categoriesRow);
    } catch(error) {
        console.error(error);
    }
});



// fetch('/server/api/categorie.json')
//     .then((response) => {
//         console.log(response.status);   // 200
//         return response.json();
//     })
//     .then((categories) => {
//         console.log(categories);
        
//         showCategories(categories);
//     })
//     .catch((error) => {
//         // errore lato client
//         console.log(error);
//     });