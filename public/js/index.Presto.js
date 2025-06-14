

function generateCardCol(category){
    
    
    const col =document.createElement("div");
    col.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3");
    
    
    const card= document.createElement("div");
    card.classList.add("card-category", "p-3");
    col.appendChild(card);
    
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body-category", "p-3");
    card.appendChild(cardBody);
    
    const cardInconCategory = document.createElement("div");
    cardInconCategory.classList.add("card-icon-category", "mb-3");
    cardBody.appendChild(cardInconCategory);
    
    
    
    
    const icon = document.createElement("i");
    const iconClasses = category.icon.split(" ");
    iconClasses.forEach( (classs) =>{
        icon.classList.add(classs)
        
    })
    
    cardInconCategory.appendChild(icon);
    
    
    const title = document.createElement("h3");
    title.textContent = category.name
    cardBody.appendChild(title);
    
    const annuncementes = document.createElement("p");
    annuncementes.classList.add("mb-0");
    annuncementes.textContent = `${category.announcementsCount} Annunci`
    cardBody.appendChild(annuncementes);
    
    return col
};


function showCategories(categories, categoriesRow){
    categories.forEach((category) => {
        
        const col = generateCardCol(category)
        categoriesRow.appendChild(col);
        
    })
};


document.addEventListener("DOMContentLoaded", async () => {
    
    try{
        const response =  await fetch("/server/api/categorie.json");
        const categories = await response.json();
        const categoriesRow = document.getElementById("categoriesRow");
        showCategories(categories, categoriesRow);
    }catch(error){
        console.log(error);     
    };
    
    
});
