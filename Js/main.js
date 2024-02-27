document.getElementById("mainTitle").innerText = "Point and Click adventure game";

//Game State
let gameState =
{
    "inventory": [],
    "coinPickedUp": false
}

//load data from save file
/*fetch('data/save.json').then((response) => {
    if (response.status == 404) {
        alert('file not found!');
    } else {
        return response.json();
    }
}).then((resJson) => {
    gameState = resJson;
    runGame();
}).catch((error) => {
    console.error(error)
})*/

//Comment out runGame(); if you want to use the save file function
runGame();
function runGame() {


    //Game window refrence
    const gameWindow = document.getElementById("gameWindow");
    const sec = 1000;

    //inventory
    const inventorylist = document.getElementById("inventorylist")

    //Main Character
    const mainCharacter = document.getElementById("hero");
    const offsetcharacter = 16;
    //speech bubbles
    const heroSpeech = document.getElementById("heroSpeech");
    const counterSpeech = document.getElementById("counterSpeech");

    //audio for dialogue
    const heroAudio = document.getElementById("heroAudio");
    const counterAudio = document.getElementById("counterAudio");

    //avatar
    const counterAvatar = document.getElementById("counterAvatar");

    const door1 = document.getElementById("rustyKeyDoor");
    const key1 = document.getElementById("key");

    gameWindow.onclick = function (e) {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        //TODO: calc offset based on character size
        //TODO: add dialogue

        if(counterSpeech.style.opacity == 0 && heroSpeech.style.opacity == 0)
        {
            if (e.target.id !== "heroImage" ) {
                mainCharacter.style.left = x - offsetcharacter + "px";
                mainCharacter.style.top = y - offsetcharacter + "px";
            }
        switch (e.target.id) {
            case "key":
                console.log("pickup key");
                document.getElementById("key").remove();
                changeInventory('key', "add");
                break;
            case "rustyKeyDoor":
                if (checkItem("key")) {
                    door1.style.opacity = 0.5;
                    showMessage(heroSpeech, "I opened the door. Yeah!", heroAudio)
                }
                else if (checkItem("coin")) {
                    changeInventory("coin", "remove")
                    showMessage(heroSpeech, "O no I lost my coin and it didnt open the door... I feel kinda stupid", heroAudio)
                }

                else {
                    showMessage(heroSpeech, "Fuck the door is locked and i dont have the key", heroAudio);
                }
                break;

            case "well":
                if (gameState.coinPickedUp == false) {
                    showMessage(heroSpeech, "I found a coin :)", heroAudio)
                    console.log("pickup coin");
                    changeInventory('coin', "add");
                    gameState.coinPickedUp = true;
                }
                else {
                    showMessage(heroSpeech, "There are no more coins in this well!", heroAudio)
                }
                break;

            case "statue":
                showMessage(heroSpeech, "Hey a statue... Looks nice", heroAudio);
                setTimeout(function(){counterAvatar.style.opacity = 1;}, 4 * sec);
                setTimeout(showMessage, 4 * sec, counterSpeech, "I can talk you know...", counterAudio);
                setTimeout(showMessage, 8 * sec, heroSpeech, "HOLY SHIT!!! That scared the shit out of me",heroAudio);
                setTimeout(showMessage, 12 * sec, counterSpeech, "Yeah Yeah i get it, I scared you",counterAudio);
                setTimeout(showMessage, 16 * sec, heroSpeech, "Okay so i have a question for you",heroAudio)
                setTimeout(showMessage, 20 * sec, counterSpeech, "Yeah Yeah I know I heard you want the key for the door",counterAudio);
                setTimeout(showMessage, 24 * sec, heroSpeech, "How did you........",heroAudio);
                showMessage(showMessage, 28 * sec, counterSpeech, "The key is on the platform on the roof of the building",counterAudio);
                showMessage(showMessage, 32 * sec, heroSpeech, "Thanks!!!", heroAudio)
                setTimeout(function(){counterAvatar.style.opacity = 0;} , 36 * sec);
                

            default:
                door1.style.opacity = 1;
                break;
        }
        }
    }

    /**
     * Add or remove item in inventory
     * @param {string} itemName 
     * @param {string} action 
     */
    function changeInventory(itemName, action) {
        if (itemName == null || action == null) {
            console.error("Wrong parameters given to changeInventory");
            return;
        }

        switch (action) {
            case 'add':
                gameState.inventory.push(itemName);
                break;
            case 'remove':
                gameState.inventory = gameState.inventory.filter(function (newInventory) {
                    return newInventory !== itemName;
                });
                document.getElementById("inv-" + itemName).remove();
                break;
        }
        updateInventory(gameState.inventory, inventorylist)
    }
    //Removing visible items:
    //document.getElementById("key").remove();

    //CheckItem
    /**
     * This returns string value if it exists in the array
     * @param {string} itemName 
     * @returns 
     */
    function checkItem(itemName) {
        return gameState.inventory.includes(itemName);

    }

    function updateInventory(inventory, inventorylist) {
        inventorylist.innerHTML = '';
        inventory.forEach(function (item) {
            const inventoryItem = document.createElement("li");
            inventoryItem.id = 'inv-' + item;
            inventoryItem.innerText = item;
            inventorylist.appendChild(inventoryItem)
        });
    }

    /**
     * It will show dialogue and trigger sound
     * @param {getElementById} targetBubble 
     * @param {string} message 
     * @param {getElementById} targetSound
     */
    function showMessage(targetBubble, message, targetSound)
    {
        targetSound.currentTime = 0;
        targetSound.play();
        targetBubble.innerText = message;
        targetBubble.style.opacity = 1;

        setTimeout(hideMessage, 4 * sec, targetBubble, targetSound);
    }

    /**
     * hides message and pauses the audio
     * @param {getElementById} targetBubble 
     * @param {getElementById} targetSound 
     */
    function hideMessage(targetBubble, targetSound)
    {
        targetSound.pause();
        targetBubble.innerText = "...";
        targetBubble.style.opacity = 0;
        checkDialog = false;
    }

}