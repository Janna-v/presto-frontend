
function generateAnnouncementsColum(annuncement){
    
    let colorbadgeclass = "bg-primary"
    
    if(annuncement.type == "sell"){
        colorbadgeclass = "bg-danger"
    };
    
    
    
    const col = document.createElement("div");
    col.classList.add("col-12", "col-md-6" ,  "col-xl-4")
    col.innerHTML = 
    `  <article class="card shadow border-0">
             <div class="position-relative">
                <img src="https://picsum.photos/200" class="card-img-top" alt="...">
                <span class="badge ${colorbadgeclass} position-absolute top-0 end-0 py-2 px-3  text-uppercase">${annuncement.type}</span>
              </div>
               <div class="card-body p-4">
                <h3 class="card-subtitle text-primary h5 mb-2 fw-semibold "> € ${annuncement.price}</h3>
                <h2 class="card-title mb-2 display-5">${annuncement.name}</h2>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
              </div>
              <div class="card-footer d-flex justify-content-around  p-3 bg-white text-primary">
                <p class="mb-0  "><i class="bi bi-heart-fill me-2"></i><span>Like</span></p>
                <p class="mb-0"><i class="bi bi-tag-fill me-2"></i><span>${annuncement.category}</span></p>
                <p class="mb-0"><i class="bi bi-calendar-fill me-2"></i><span>27/03/2023</span></p>
              </div>
            </article>`
    
    
    
    return col
};

function showAnnouncements(annuncements, announcementsRow){
    
    while(announcementsRow.hasChildNodes()){
        announcementsRow.removeChild(announcementsRow.firstChild)
    }
    
    
    
    
    annuncements.forEach( annuncement=> {
        const col = generateAnnouncementsColum(annuncement)
        announcementsRow.appendChild(col);
        
    });
    
};

function filteringAndSorting(annuncements, options){
    let filterAnnouncements = annuncements.filter((annuncement) =>{
        let isGoodAnnouncement = true;
        
        if(options.search){
            isGoodAnnouncement = annuncement.name.toLowerCase().includes(options.search.toLowerCase())
        }
        
        if(isGoodAnnouncement && options.category){
            isGoodAnnouncement = annuncement.category == options.category
        }
        
        if(isGoodAnnouncement && options.minPrice){
            isGoodAnnouncement = Number(annuncement.price) >= Number(options.minPrice)
        }
        
        if(isGoodAnnouncement && options.maxPrice){
            isGoodAnnouncement = Number(annuncement.price) <= Number(options.maxPrice)
        }
        
        
        return  isGoodAnnouncement
    });
    
    
    switch (options.order) {
        case "ascByPrice":
        filterAnnouncements.sort((left , right) =>{
            return Number(left.price) -  Number(right.price);
        });
        break;
        
        case "descByPrice":
        filterAnnouncements.sort((left , right) =>{
            return Number(right.price) - Number(left.price);  
        });
        break;
        
        case "ascByAlpha":
        filterAnnouncements.sort((left , right) =>{
            return left.name.toLowerCase().localeCompare(right.name.toLowerCase());
        });
        break;
        
        case "desckByAlpha":
        filterAnnouncements.sort((left , right) =>{
            return right.name.toLowerCase().localeCompare(left.name.toLowerCase());
        });
        break;
        
        
        
    }
    return filterAnnouncements
};

function  generateCategoriesOptions(annuncements, categorySelect){
    const categories = new Set();
    
    annuncements.forEach((annuncement)=>{
        categories.add(annuncement.category)
    })
    
    categories.forEach((category)=>{
        const option = document.createElement("option")
        option.setAttribute("value", category);
        option.textContent = category;
        categorySelect.appendChild(option)
        
    })
    
}

async function loadingAnnouncements(){
    const response =  await fetch("/server/api/annunci.json");
    return await response.json();
    
};

document.addEventListener("DOMContentLoaded", async () => {
    
    
    const searchInput = document.getElementById("searchInput")
    const categorySelect = document.getElementById("categorySelect")
    const minPriceInput = document.getElementById("minPriceInput")
    const maxPriceInput = document.getElementById("maxPriceInput")
    const sortSelect = document.getElementById("sortSelect")
    
    const announcementsRow = document.getElementById("announcementsRow");
    
    try{
        const annuncements= await loadingAnnouncements();
        
        generateCategoriesOptions(annuncements, categorySelect)
        showAnnouncements(annuncements, announcementsRow);
        
        
        
        
        const filterAndSortForm = document.getElementById("filterAndSortForm")
        filterAndSortForm.addEventListener("submit", (event)=>{
        event.preventDefault()
              
            const options = {
                search : searchInput.value,
                category : categorySelect.value,
                minPrice : minPriceInput.value,
                maxPrice : maxPriceInput.value, 
                order : sortSelect.value
            }
            
            const filteredAnnouncements = filteringAndSorting(annuncements, options)
            showAnnouncements(filteredAnnouncements, announcementsRow);
            
        })
        
        
        
    }catch(error){
        console.log(error);   
    }  
});



