let MAPWIDTH = 20
let MAPHEIGHT = 40
let parameters_form = document.getElementById("parameters");
let save_form = document.getElementById("save");
let load_room = document.getElementById("load");
let room_names = []
let room_data = []
let rooms_LIST = document.getElementById("rooms_list")

document.getElementById("map_height").value = MAPHEIGHT;
document.getElementById("map_width").value = MAPWIDTH;
createGrid(MAPHEIGHT, MAPWIDTH)
onLoad()

parameters_form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    MAPHEIGHT = document.getElementById("map_height").value;
    MAPWIDTH = document.getElementById("map_width").value;

    createGrid(MAPHEIGHT, MAPWIDTH);
});

save_form.addEventListener("submit", (e) => {
    e.preventDefault();
    saveGrid();
    var ListItem = document.createElement("li")
    ListItem.innerText = room_names[room_names.length - 1]
    rooms_LIST.appendChild(ListItem)

});

load_room.addEventListener("submit", (e) => {
    e.preventDefault()
    let roomnumber = Number(document.getElementById("loadroom").value)
    loadRoom(roomnumber-1);
})


function onLoad(){
    room_data_unsplit = localStorage.getItem("Room Data")
    room_names_unsplit = localStorage.getItem("Room Names")
    
    if (room_names_unsplit != null){
        room_names = room_names_unsplit.split(",")
    }
    if(room_data_unsplit != null){
        room_data_splitonce = room_data_unsplit.split(":")

        for (let i = 0; i < room_data_splitonce.length; i++){
            room_data.push(room_data_splitonce[i].split(","))
        }
    }
    
    for (let i = 0; i < room_names.length; i++){
        var ListItem = document.createElement("li")
        ListItem.innerText = room_names[i]
        rooms_LIST.appendChild(ListItem)
    }
    
}

function loadRoom(roomnumber){
    console.log(roomnumber)
    console.log(room_data)
    console.log(room_data[roomnumber])
    let container = document.getElementById("grid_container")
    height = room_data[roomnumber].length
    width = room_data[roomnumber][0].length

    container.innerHTML = "";

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++){
            let box = document.createElement("div")

            box.classList.add("box")

            box.addEventListener("click", () => {
                box.classList.toggle("active");
            });

            if (room_data[roomnumber][i][j] == "1"){
                box.classList.toggle("active");
            }

            container.appendChild(box)
            
        }
        container.appendChild(document.createElement("br"));
    }
}

function createGrid(height, width) {
    let container = document.getElementById("grid_container");

    container.innerHTML = "";

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++){
            let box = document.createElement("div")

            box.classList.add("box")

            box.addEventListener("click", () => {
                box.classList.toggle("active");
            });

            container.appendChild(box)
            
        }
        container.appendChild(document.createElement("br"));
    }

}

function saveGrid(){
    let roomname = document.getElementById("savename").value
    let totalBoxes = document.getElementsByClassName("box");
    let map_height = Number(MAPHEIGHT)
    let map_width = Number(MAPWIDTH)
    let map_array = []

    for (let row = 0; row < map_height; row++) {
        let thisRow = ""
        for (let box = 0; box < map_width; box++){
            let current_box = totalBoxes[(row * map_width) + box]
            if (current_box.classList.contains("active")){
                thisRow += 1
            }
            else{
                thisRow += 0
            }
        }
        map_array.push(thisRow)
    }
    room_names.push(roomname)
    room_data.push(map_array)
    console.log(roomname + map_array)
    
    let roomDataString = room_data.join(":");
    localStorage.setItem("Room Data", roomDataString);
    localStorage.setItem("Room Names", room_names);

    console.log(localStorage)
    console.log(localStorage.getItem("Room Data"))
    console.log(room_data)

    console.log(room_data[0].length)
    console.log(room_data[0][0].length)
}