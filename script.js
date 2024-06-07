const apiKey = "acqS2LcWicy6HWPyhm2gZ4drBp9cJEKUll3yud7TXBI";
const url = "https://api.unsplash.com/search/photos?page=1";

const form = document.querySelector("form");
const searchInput = document.querySelector("#searchInput");
const row = document.querySelector(".row");
const toggleBtn = document.querySelector("#toggleBtn");
const body = document.querySelector("body");

const clearBtn = document.querySelector("#clearBtn");
const select = document.querySelector("select");
const bilgiMesaji = document.querySelector("#bilgiMesaji");






// ! Gece-Gündüz modu
toggleBtn.addEventListener("click", function(){
    if(body.classList.contains("dark-mode")){
        body.classList.remove("dark-mode");
        toggleBtn.innerHTML = "Light mode";
    }else{
        body.classList.add("dark-mode");
        toggleBtn.innerHTML = "Dark-mode";
    }
})


//! For Submit OLduğunda İstek Göndermek için

let resimler = [];

form.addEventListener("submit", function(e){
    e.preventDefault();
    // console.log("çalıştı")
    row.innerHTML = "";
    

    let searchTerm = searchInput.value;
    let request = `${url}&query=${searchTerm}&client_id=${apiKey}`
    // console.log(request)
    fetch(request)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // console.log(data.results)
        resimler = data.results;
        // console.log(resimler)

        önYüzeekle(resimler)

    })
})


function önYüzeekle(veriler){
    veriler.forEach((veri)=>{
        // console.log(veri.urls.small)
        const col = document.createElement("div");
        col.classList = "col-4 mb-3 border border-1 p-2"

        const img = document.createElement("img");
        img.style.width = "100%";
        img.style.height = "200px";
        img.src = veri.urls.small;
        img.style.marginBottom = "15px"



            const deleteBtn = document.createElement("button");
            deleteBtn.classList = "btn btn-danger float-end";
            deleteBtn.innerHTML = "sil";
            deleteBtn.id ="delete"


            const like = document.createElement("span")
            like.innerHTML = veri.likes





        row.append(col);
        col.append(img);
        col.append(deleteBtn);
        col.append(like)

    })
}





// ! Sil butonuna bastığımda ilgili elemanı sildirmek

row.addEventListener("click", function(e){
    // console.log(e.target);
    if(e.target.id.includes("delete")){
        let column = e.target.parentElement
        // console.log(column)
        column.remove();


        // ! Bilgi mesajı

        
        bilgiMesaji.innerHTML = "Fotoğraf Silindi"
        bilgiMesaji.classList.add("text-success", "text-center", "fw-bold", "mt-4", "bg-warning", "p-3")


        setTimeout(function(){
            bilgiMesaji.innerHTML = ""
            bilgiMesaji.classList.remove("text-success", "text-center", "fw-bold", "mt-4", "bg-warning", "p-3")
    

        },2000)
    }
})


// ! artan azalan butonu

select.addEventListener("change", function(){
    let seciliDurum = select.value;
    if(seciliDurum == "Artan"){
        resimler.sort((a,b) => a.likes - b.likes);
    }else{
        resimler.sort((a,b) =>b.likes - a.likes);
    }
    row.innerHTML = "";
    önYüzeekle(resimler)
})




// ! Temizle butonunu çalıştırmak

clearBtn.addEventListener("click", function(e){
    e.preventDefault();
    row.innerHTML = "";

            // ! Bilgi mesajı

        
            bilgiMesaji.innerHTML = "Tüm İçerik temizlendi"
            bilgiMesaji.classList.add("text-white", "text-center", "fw-bold", "mt-4", "bg-primary", "p-3")
    
    
            setTimeout(function(){
                bilgiMesaji.innerHTML = ""
                bilgiMesaji.classList.remove("text-white", "text-center", "fw-bold", "mt-4", "bg-primary", "p-3")
        
    
            },2000)
})



















