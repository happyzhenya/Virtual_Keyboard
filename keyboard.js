const body=document.querySelector("body")
const title=document.createElement("h1");
title.classList.add("title");
title.textContent="Virtual Keyboard";
body.append(title);
const descriptinon=document.createElement('p');
descriptinon.classList.add("description");
descriptinon.textContent="Клавиатура создана в операционной системе Windows"
body.append(descriptinon)
const textarea=document.createElement("textarea");
textarea.classList.add("keybord_text");
body.append(textarea);
textarea.focus();


const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
      
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        language: "english"
    },

init() {
    // Create main elements
    
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
   

    
    
    // Automatically use keyboard for elements 
    document.querySelectorAll(".keybord_text").forEach(element => {
       
         element.addEventListener("focus", () => {
            this.open(element.value, currentValue => {
           
                element.value = currentValue;
              
            });
        });
    });


    
},

_createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
        "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",     

        "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "|", "Delete",  

        "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",

        "Shift", "'\'","z", "x", "c", "v", "b", "n", "m", ",", ".", "ArrowUp", "Shift ",

        "Control", "Meta", "Alt", " ", "Alt", "ArrowLeft", "ArrowDown", "ArrowRight", "Control"
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
        return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach(key => {
        const keyElement = document.createElement("button");
        const insertLineBreak = ["Backspace", "Del", "Enter", "Shift "].indexOf(key) !== -1;

        // Add attributes/classes
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key");
        keyElement.setAttribute("data", key);
       

        switch (key) {
            case "Backspace":
                keyElement.classList.add("keyboard__key_backspace");
                keyElement.textContent= "Backspace";
                keyElement.addEventListener("click", () => {
                    this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                    this._triggerEvent("oninput");
                });

                break;

            case "Tab":
                keyElement.classList.add("keyboard__key_tab");
                keyElement.innerHTML= "Tab";
                break;
            case "Delete":
                keyElement.classList.add("keyboard__key_delete");
                keyElement.innerHTML= "Delete";
                keyElement.addEventListener("click", () => {
                  // this.properties.value = this.properties.value.substring( this.properties.value.length - 1, 0);
                    this._triggerEvent("oninput");})
                   break;
                

            case "CapsLock":
                keyElement.classList.add("keyboard__key_capslock", "keyboard__key--activatable");
                keyElement.innerHTML = " Caps Lock";

                keyElement.addEventListener("click", () => {
                    this._toggleCapsLock();
                    keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                });

                break;

               
            case "Enter":
                keyElement.classList.add("keyboard__key_enter");
                keyElement.innerHTML = "Enter";

                keyElement.addEventListener("click", () => {
                    this.properties.value += "\n";
                    this._triggerEvent("oninput");
                });

                break;

            case "Shift":
                keyElement.classList.add("keyboard__key_shift");
                keyElement.innerHTML= "Shift";
                  break;  
            case "Shift ":
                keyElement.classList.add("keyboard__key_shift");
                keyElement.innerHTML= "Shift";
                 break;      
            case "Control":
                keyElement.classList.add("keyboard__key_ctrl");
                keyElement.innerHTML= "Ctrl";
                 break;  
                 
            case "Alt":
                keyElement.classList.add("keyboard__key_alt");
                keyElement.innerHTML= "Alt";
                 break;   
                 
            case "Meta":
                keyElement.classList.add("keyboard__key_win");
                keyElement.innerHTML= "Win";
                     break;                  
                 
            case "ArrowUp":
                keyElement.classList.add("keyboard__key_up");
              // keyElement.innerHTML = createIconHTML("arrow-down-drop-circle");
              keyElement.innerHTML= "Up";
                 break;     
                 
                 
            case "ArrowDown":
                keyElement.classList.add("keyboard__key_down");
                  // keyElement.innerHTML = createIconHTML("arrow-down-drop-circle");
                 keyElement.innerHTML= "Down";
                     break;   

            case "ArrowLeft":
            keyElement.classList.add("keyboard__key_left");
          // keyElement.innerHTML = createIconHTML("arrow-down-drop-circle");
            keyElement.innerHTML= "Left";
             break; 
             
             case "ArrowRight":
                keyElement.classList.add("keyboard__key_left");
              // keyElement.innerHTML = createIconHTML("arrow-down-drop-circle");
                keyElement.innerHTML= "Right";
                 break;      

            case " ":
                keyElement.classList.add("keyboard__key_space");
                keyElement.innerHTML = createIconHTML("space_bar");

                keyElement.addEventListener("click", () => {
                    this.properties.value += " ";
                    this._triggerEvent("oninput");
                });

                break;

            case "done":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                keyElement.innerHTML = createIconHTML("check_circle");

                keyElement.addEventListener("click", () => {
                    this.close();
                    this._triggerEvent("onclose");
                });

                break;

            default:
                keyElement.textContent = key.toLowerCase();

                keyElement.addEventListener("click", () => {
                    this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                    this._triggerEvent("oninput");
                });

                break;
        }

        fragment.appendChild(keyElement);

        if (insertLineBreak) {
            fragment.appendChild(document.createElement("br"));
        }
    });

    return fragment;
},

_triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
        this.eventHandlers[handlerName](this.properties.value);
    }
},

_toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
            console.log("key==="+key.textContent)
            let letter=["q","w","e","r","t", "y", "u", "i"]
          /* for (let i=0; i<letter.length; i++) {
           if ( letter[i]==key.textContent ){*/
            key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
    //  }  }  
           
          }
    }
    
},





   open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    textarea.focus();
  
   
},

close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
   /* this.eventHandlers.onclose = onclose;*/
   
}
};

window.addEventListener("DOMContentLoaded", function () {
Keyboard.init();

});

document.onkeydown=function(event){
    console.log("event-key==="+event.key);
   document.querySelectorAll(".keyboard__key").forEach(function(elem){
       elem.classList.remove("keyboard__key--active-color")
   })
   
    document.querySelector('.keyboard__key[data="'+event.key+'"]').classList.add("keyboard__key--active-color") 
}

document.querySelectorAll(".keyboard__key").forEach(function(elem){
    elem.oninput=function(event){
        document.querySelectorAll(".keyboard__key").forEach(function(elem){
    elem.classList.remove("keyboard__key--active-color")});
    let code=this.getAttribute("data");
    this.classList.add("keyboard__key--active-color")
        }
    });

    