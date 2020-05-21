//jshint esversion:6

var filters = [];

$.getJSON("data.json", (json) => {
    json.forEach(data => {
        template(data);
    });

    $(".main button").on('click', (event) => {
        
        $(".filter").removeClass("hidden");
        //Make the filter array and create filter buttons
        var filter = event.target.innerHTML;
        if(!filters.includes(filter)){
            filters.push(filter);
            createButton(filter, "filter");
            console.log(filters);
            
        }
        
        //Close button functionality   
        $(".remove").on('click', (event) => {
                var prnt = event.currentTarget.parentNode;
                // console.log(k);
                if(filters.includes(prnt.textContent)){
                   filters.splice(filters.indexOf(prnt.textContent), 1); 
                 prnt.remove();
                applyFilter(filters);
                }
                
                console.log(filters);
                console.log(prnt);
                
                       
                if(filters.length === 0){
                    $(".filter").addClass("hidden");
                    applyFilter(filters);
                }
                
        });

        $(".clear").click(() => {
           filters = [];
           console.log(filters);
            $(".filter").addClass("hidden");
            $(".filter button").remove();
            applyFilter(filters);
        });

        //Remove the non required classes
        applyFilter(filters);

    });

});



function applyFilter(filters) {
    $(".main").removeClass("hidden");
    if (filters.length > 0) {
        document.querySelectorAll(".main").forEach((div) => {
            var a = div.classList.value.split(" ");
            var b = filters.every(val => a.includes(val));
            // console.log(b);
            if (!b) {
                div.classList.add("hidden");
            }

        });
    }
}

function template(data)
{
    var div = `<div class = "main ${data.company} ${data.featured ?"featured" : ""} ${data.level} ${data.role} ${data.languages.join(" ")} ${data.tools.join(" ")}">
    <img src="${data.logo}" alt="logo">
    <div>
    <p>${data.company}  ${data.new ? "<span class= new > NEW! </span>" :""}  ${data.featured ? " <span class= featured >FEATURED</span>": ""} </p>
    <h2>${data.position}</h2>
    <p class = "list">${data.postedAt}
        <span class = list-item >${data.contract}</span>
        <span class = list-item >${data.location}</span>
        </p>
    </div>
    <div class="buttons id${data.id}">
    </div>
  </div>`;

  $(".attribution").before(div);
    createButton(data.role,`id${data.id}`);
    createButton(data.level, `id${data.id}`);
    data.languages.forEach(language => {
        createButton(language, `id${data.id}`);
    });

    data.tools.forEach(tool =>{
        createButton(tool, `id${data.id}`);
    });
    

}

function createButton(name, place){
    if(place === "filter")
    {
        var btn = `<button>${name}<span class = remove ><img src = images/icon-remove.svg ></span></button>`;
        $(`.clear`).before(btn);

    }
    else{
        var btn = `<button>${name}</button>`;
        $(`.${place}`).append(btn);
    }
}
