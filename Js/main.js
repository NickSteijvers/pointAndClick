document.getElementById("mainTitle").innerText = "Point and Click adventure game";

//Game State
let gameState =
{
    "inventory": [],
    "coinPickedUp": false,
    "notePickedUp" : false
}

localStorage.removeItem("gameState");
if(Storage)
{
    if(localStorage.gameState)
    {
        // uses localStorage gameState string and convert it to an object. then store it into gameState.
        gameState = JSON.parse(localStorage.gameState);
    }
    else 
    {
        // convert local object variable to string. then store it into localStorage
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }
}



//Game window refrence
const gameWindow = document.getElementById("gameWindow");
const sec = 1000;

//inventory
const inventorylist = document.getElementById("inventorylist")

//Main Character
const mainCharacter = document.getElementById("hero");
const offsetcharacter = 25;
//speech bubbles
const heroSpeech = document.getElementById("heroSpeech");
const counterSpeech = document.getElementById("counterSpeech");

//audio for dialogue
const heroAudio = document.getElementById("heroAudio");
const counterAudio = document.getElementById("counterAudio");

//avatar
const counterAvatar = document.getElementById("counterAvatar");

const phone1 = document.getElementById("phone");
const note1 = document.getElementById("note");

if(gameState.keyPickedUp)
{
    document.getElementById("note").remove();
}

updateInventory(gameState.inventory, inventorylist);

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //TODO: calc offset based on character size
    //TODO: add dialogue

    if (counterSpeech.style.opacity == 0 && heroSpeech.style.opacity == 0) {
        if (e.target.id !== "heroImage") {
            mainCharacter.style.left = x - offsetcharacter + "px";
            mainCharacter.style.top = y - offsetcharacter + "px";
        }
        switch (e.target.id) {
            case "note":
                console.log("pickup note");
                document.getElementById("note").remove();
                changeInventory('note', "add");
                gameState.notePickedUp = true;
                saveGamestate(gameState);
                showMessage(heroSpeech, "There is a note here. *Your phone is in the closet in the teachers room. the key is on the back of this note*", heroAudio);
                break;
            case "phone":
                if (checkItem("note")) {
                    phone1.style.opacity = 0.5;
                    showMessage(heroSpeech, "I got my phone. Yeah!", heroAudio)
                }
                else if (checkItem("coin")) {
                    changeInventory("coin", "remove")
                    showMessage(heroSpeech, "O no I lost my coin and the closet didnt open... I feel kinda stupid", heroAudio)
                }

                else {
                    showMessage(heroSpeech, "Fuck the closet is locked", heroAudio);
                }
                break;

            case "coin":
                if (gameState.coinPickedUp == false) {
                    showMessage(heroSpeech, "I found a coin. I hope the teacher wont get mad :)", heroAudio)
                    console.log("pickup coin");
                    changeInventory('coin', "add");
                    gameState.coinPickedUp = true;
                }
                else {
                    showMessage(heroSpeech, "There are no more coins. (you greedy bastard!!!)", heroAudio)
                }
                break;
            
            case "globe":
                showMessage(heroSpeech, "This is a globe of planet earth. Interresting!!!", heroAudio);
            break;

            case "fruit":
                showMessage(heroSpeech, "There is a basket of fruit here. Yummy!!!", heroAudio);
            break;

            case "painting":
                showMessage(heroSpeech, "This is a nice painting.", heroAudio);
            break;

            case "locker":
                showMessage(heroSpeech, "This is the teachers locker. Maybe I shouldnt search in here.", heroAudio);
            break;

            case "table1":
                showMessage(heroSpeech, "This table is from my friend Gerard.", heroAudio);
            break;

            case "table2":
                showMessage(heroSpeech, "This table is from sophie. She is kinda hot.", heroAudio);
            break;

            case "table3":
                showMessage(heroSpeech, "This table is from peter. he is very messy.", heroAudio);
            break;

            case "bob":
                showMessage(heroSpeech, "Hey Bob", heroAudio);
                setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                setTimeout(showMessage, 4 * sec, counterSpeech, "Hey whats the problem?", counterAudio);
                setTimeout(showMessage, 8 * sec, heroSpeech, "I left my phone here after yesterdays lesson", heroAudio);
                setTimeout(showMessage, 12 * sec, counterSpeech, "Then you should look at your table if it is still there", counterAudio);
                setTimeout(showMessage, 16 * sec, heroSpeech, "I forgot which table was mine", heroAudio)
                setTimeout(showMessage, 20 * sec, counterSpeech, "Then you search every table till you find it", counterAudio);
                setTimeout(showMessage, 24 * sec, heroSpeech, "Thanks Bob!!!", heroAudio)
                setTimeout(function () { counterAvatar.style.opacity = 0; }, 36 * sec);
            break;


            default:
                phone1.style.opacity = 1;
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
function showMessage(targetBubble, message, targetSound) {
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
function hideMessage(targetBubble, targetSound) {
    targetSound.pause();
    targetBubble.innerText = "...";
    targetBubble.style.opacity = 0;
    checkDialog = false;
}

/**
 * saves gameState into localStorage
 * @param {object} gameState 
 */
function saveGamestate(gameState)
{
    localStorage.gameState = JSON.stringify(gameState);
}
