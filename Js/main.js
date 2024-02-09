document.getElementById("mainTitle").innerText = "Point and Click adventure game"; 

//Game window refrence
const gameWindow = document.getElementById("gameWindow");

//inventory
const inventorylist = document.getElementById("inventorylist")

//Main Character
const mainCharacter = document.getElementById("hero");
const offsetcharacter = 16;

const tree1 = document.getElementById("squareTree");
const door1 = document.getElementById("door");
const key1 = document.getElementById("key");

gameWindow.onclick = function (e) 
{
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //FIX: character doen't animate on first click
    //FIX: Character can go out of bounds when clicking on itself
    //TODO: calc offset based on character size
    mainCharacter.style.left = x - offsetcharacter + "px";
    mainCharacter.style.top = y - offsetcharacter + "px";
    switch (e.target.id)
    {
        case "squareTree" :
            tree1.style.opacity = 0.5;
        break;

        case "key" :
            console.log("You have found the key!!!")
            document.getElementById("key").remove();
            const keyelement = document.createElement("li");
            keyelement.id = "inv-key";
            keyelement.innerText = "key";
            inventorylist.appendChild(keyelement)
            break;
        case "door" :
            door1.style.opacity = 0.5;
            break;

        default:
            tree1.style.opacity = 1;
            door1.style.opacity = 1;
    }
}