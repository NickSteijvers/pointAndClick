document.getElementById("mainTitle").innerText = "Point and Click adventure game"; 

//Game window refrence
const gameWindow = document.getElementById("gameWindow");

//inventory
let inventory = [];
const inventorylist = document.getElementById("inventorylist")

//Main Character
const mainCharacter = document.getElementById("hero");
const offsetcharacter = 16;

const door1 = document.getElementById("rustyKeyDoor");
const key1 = document.getElementById("key");


gameWindow.onclick = function (e) 
{
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //TODO: calc offset based on character size

    if(e.target.id !== "heroImage")
    {
     mainCharacter.style.left = x - offsetcharacter + "px";
     mainCharacter.style.top = y - offsetcharacter + "px";   
    }
    
    switch (e.target.id)
    {
        case "key" :
           getItem("Rusty key", "rustyKey");
            break;
        case "rustyKeyDoor" :
            if(checkItem("Rusty key"))
            {
                door1.style.opacity = 0.5; 
                console.log("I opened the door. Yeah!");
            }
            else if (checkItem("Coin"))
            {
                console.log("O no I lost my coin and it didnt open the door... I feel kinda stupid");
                removeItem("Coin", "coin");
            }

            else 
            {
                console.log("Fuck the door is locked and i dont have the rusty key")
            }
            break;

        case "well" :
            getItem("Coin", "coin");
             break;

        default:
            door1.style.opacity = 1;
        break;
    }

    /**
     * Checks if the value exists within the array
     * If not then it adds value to the array and use showItem function
     * @param {string} itemName 
     * @param {string} itemId 
     */
    //GetItem
    function getItem(itemName, itemId)
    {
        if (!checkItem(itemName))
        {
            inventory.push(itemName);
            showItem(itemName, itemId);
        }
        console.log (inventory);

        //Removing visible items:
        //document.getElementById("key").remove();
    }

    //UseItem
    function useItem (itemName, itemId)
    {

    }


    //CheckItem
    /**
     * This returns string value if it exists in the array
     * @param {string} itemName 
     * @returns 
     */
    function checkItem(itemName)
    {
        return inventory.includes(itemName);

    }

    //ShowItem
    /**
     * Needs a name for displaying item and a html id name
     * @param {string} itemName 
     * @param {string} itemId 
     */
    function showItem (itemName, itemId)
    {
        console.log('You\'ve found a ' + itemName + '!')
        const keyelement = document.createElement("li");
        keyelement.id = itemId;
        keyelement.innerText = itemName;
        inventorylist.appendChild(keyelement)
    }

      //RemoveItem
    /**
     * Removes item from array and the element within the HTML
     * @param {string} itemName 
     * @param {string} itemId 
     */
    function removeItem (itemName, itemId)
    {
        //remove item in array
       inventory = inventory.filter(function(newInventory){
        return newInventory !== itemName;
       });
       document.getElementById(itemId).remove();

    }
}