let letter = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];

let language = "english";
const body = document.querySelector("body");
const title = document.createElement("h1");
title.classList.add("title");
title.textContent = "Virtual Keyboard";
body.append(title);
const descriptinon = document.createElement("p");
descriptinon.classList.add("description");
descriptinon.textContent =
  "Клавиатура создана в операционной системе Windows. Переключение языка -клавиша WIN";
body.append(descriptinon);
const textarea = document.createElement("textarea");
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
    onclose: null,
  },

  properties: {
    value: "",
    capsLock: false,
    language: "",
  },

  init() {
    // Create main elements

    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements

    document.querySelectorAll(".keybord_text").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    let keyLayout;

    const fragment = document.createDocumentFragment();
    const keyLayoutEn = [
      "`",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "Backspace",

      "Tab",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "[",
      "]",
      "|",
      "Delete",

      "CapsLock",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      ";",
      "'",
      "Enter",

      "Shift",
      "''",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "ArrowUp",
      "Shift ",

      "Control",
      "Meta",
      "Alt",
      " ",
      "Alt",
      "ArrowLeft",
      "ArrowDown",
      "ArrowRight",
      "Control",
    ];

    const keyLayoutRu = [
      "`",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "Backspace",

      "Tab",
      "й",
      "ц",
      "у",
      "к",
      "е",
      "н",
      "г",
      "ш",
      "щ",
      "з",
      "х",
      "ъ",
      "|",
      "Delete",

      "CapsLock",
      "ф",
      "ы",
      "в",
      "а",
      "п",
      "р",
      "о",
      "л",
      "д",
      "ж",
      "э",
      "Enter",

      "Shift",
      "я",
      "ч",
      "с",
      "м",
      "и",
      "т",
      "ь",
      "б",
      "ю",
      ".",
      "ArrowUp",
      "Shift ",

      "Control",
      "Meta",
      "Alt",
      " ",
      "Alt",
      "ArrowLeft",
      "ArrowDown",
      "ArrowRight",
      "Control",
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

   

    if (this.properties.language == "english") {
      keyLayout = keyLayoutEn;
    }
    if (this.properties.language == "rus") {
      keyLayout = keyLayoutRu;
    }

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["Backspace", "Del", "Enter", "Shift "].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");
      keyElement.setAttribute("data", key);

      switch (key) {
        case "Backspace":
          keyElement.classList.add("keyboard__key_backspace");
          keyElement.textContent = "Backspace";
          keyElement.addEventListener("click", () => {
            let text = textarea.value;
            let position = textarea.selectionStart;
            text = this.properties.value;
            textarea.focus();
            this.properties.value =
              this.properties.value.slice(0, position - 1) +
              this.properties.value.slice(position);
            textarea.selectionStart = position -1;
            textarea.selectionEnd = textarea.selectionStart;

            this._triggerEvent("oninput");
          });

          break;

        case "Tab":
          keyElement.classList.add("keyboard__key_tab");
          keyElement.innerHTML = "Tab";
          
          keyElement.addEventListener("click", () => {
            let position = textarea.selectionStart;
            let front = textarea.value.substring(0,position);
            let back = textarea.value.substring(position,textarea.value.length);
            textarea.value = front + "    "+back;
            textarea.selectionStart = position + 4;
            textarea.selectionEnd = textarea.selectionStart;
            textarea.focus();
            this._triggerEvent("oninput");
          });

          break;

        case "Delete":
          keyElement.classList.add("keyboard__key_delete");
          keyElement.innerHTML ="Delete";
          
          keyElement.addEventListener("click", () => {
         
          let text = textarea.value;
          let position = textarea.selectionStart;
          console.log("positionST", position)
          
          text = this.properties.value;
           this.properties.value =
          this.properties.value.slice(0, position) + this.properties.value.slice(position+1);
          console.log("position after", position)
         
          textarea.selectionStart = position;
          textarea.selectionEnd = textarea.selectionStart;

           this._triggerEvent("oninput");})
           

          break;

        case "CapsLock":
          keyElement.classList.add(
            "keyboard__key_capslock",
            "keyboard__key--activatable"
          );
          keyElement.innerHTML = "Caps Lock";

          keyElement.addEventListener("click", () => {
            console.log("нажали кнопку", this.properties.capsLock);
            this._toggleCapsLock();
            // keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
            keyElement.classList.toggle("keyboard__key--active");
          });

          break;

        case "Enter":
          keyElement.classList.add("keyboard__key_enter");
          keyElement.innerHTML = "Enter";

          keyElement.addEventListener("click", () => {
            let text = textarea.value;
            let position = textarea.selectionStart;
            text = this.properties.value;
            textarea.focus();
            this.properties.value =this.properties.value.slice(0,position) + "\n"+this.properties.value.slice(position);
            this._triggerEvent("oninput");
          });

          break;

        case "Shift":
          keyElement.classList.add("keyboard__key_shift");
          keyElement.innerHTML = "Shift";
          break;
        case "Shift ":
          keyElement.classList.add("keyboard__key_shift");
          keyElement.innerHTML = "Shift";
          break;
        case "Control":
          keyElement.classList.add("keyboard__key_ctrl");
          keyElement.innerHTML = "Ctrl";
          break;

        case "Alt":
          keyElement.classList.add("keyboard__key_alt");
          keyElement.innerHTML = "Alt";

          break;
       
          case "Control" + "Atl":
            keyElement.classList.add("keyboard__key_win");
            keyElement.innerHTML = "Win";
            keyElement.setAttribute("id", "meta");
            keyElement.addEventListener("click", () => {
              console.log("meta==", this.properties.language);
              if (this.properties.language == "english") {
                this.properties.language = "rus";
                language == "rus";
  
                this.elements.main.remove(this.elements.keysContainer);
                this.init();
              } else if (this.properties.language == "rus") {
                this.properties.language = "english";
                language == "english";
                this.elements.main.remove(this.elements.keysContainer);
                this.init();
              }
            });
  
            break;

        


        case "Meta":
          keyElement.classList.add("keyboard__key_win");
          keyElement.innerHTML = "Win";
          keyElement.setAttribute("id", "meta");
          keyElement.addEventListener("click", () => {
            console.log("meta==", this.properties.language);
            if (this.properties.language == "english") {
              language = "rus";
              setLocalStorage();
              this.properties.language="rus"
              this.elements.main.remove(this.elements.keysContainer);
              this.init();
            } else if (this.properties.language == "rus") {
              language = "english";
              setLocalStorage();
              this.properties.language = "english";
              
              this.properties.language==language
              this.elements.main.remove(this.elements.keysContainer);
              this.init();
            }
          });

          break;

        case "ArrowUp":
          keyElement.classList.add("keyboard__key_up");
          keyElement.innerHTML = "Up";
          keyElement.addEventListener("click", () => {
          
          start = textarea.selectionStart;
          lineindex = textarea.value.substring(0,start).split("\n").length-1;
          charsTotal = textarea.value.split("\n")[lineindex-1].length;
  
          textarea.selectionStart -= charsTotal+1;
          textarea.selectionEnd = textarea.selectionStart;
          textarea.focus();
          this._triggerEvent("oninput");
              
              
            });
          break;

        case "ArrowDown":
          keyElement.classList.add("keyboard__key_down");
          keyElement.innerHTML = "Down";
          keyElement.addEventListener("click", () => {
          
          start = textarea.selectionStart;
          lineindex = textarea.value.substring(0,start).split("\n").length-1;
          charsTotal = textarea.value.split("\n")[lineindex].length;

          textarea.selectionStart += charsTotal+1;
          textarea.selectionEnd = textarea.selectionStart;
              textarea.focus();
              this._triggerEvent("oninput");
            
            
          });
          break;

        case "ArrowLeft":
          keyElement.classList.add("keyboard__key_left");
           keyElement.innerHTML = "Left";
          keyElement.addEventListener("click", () => {
            let text = textarea.value;
            if (textarea.selectionEnd) {
              console.log("textarea.selectionEnd", textarea.selectionEnd);
              textarea.setSelectionRange(
                textarea.selectionEnd-1,
                textarea.selectionEnd
              );
              textarea.focus();
              textarea.selectionEnd = textarea.selectionEnd - 1;
            }
            this._triggerEvent("oninput");
          });

          break;

        case "ArrowRight":
          keyElement.classList.add("keyboard__key_right");
          // keyElement.innerHTML = createIconHTML("arrow-down-drop-circle");
          keyElement.innerHTML = "Right";
          keyElement.addEventListener("click", () => {
           textarea.focus();
            if (textarea.selectionEnd) {
              console.log("textarea.selectionEnd", textarea.selectionEnd);
             
              textarea.setSelectionRange(
                textarea.selectionEnd+1,
                textarea.selectionEnd+1,
                "forward"
              );
              textarea.focus();        
            }
            this._triggerEvent("oninput");
          });
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
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--dark"
          );
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();
           keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
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
            console.log("key===", key.textContent)
            if (key.textContent=="Shift" || key.textContent=="Alt" || key.textContent=="Tab" || key.textContent=="Backspace"|| key.textContent=="Delete" || key.textContent=="Enter" || key.textContent=="Caps Lock" || key.textContent=="Up" || key.textContent=="Left" || key.textContent=="Right" || key.textContent=="Down" || key.textContent=="Win" ||key.textContent=="Ctrl"){
              key.textContent.toLowerCase()
            } else
        
            key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
           
    //  }  }  
           
          }
    }
    
},


  open(initialValue, oninput, onclose) {
   // console.log("this.properties.value=" + this.properties.value);
  //  console.log("initialValue" + initialValue);
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    /* this.eventHandlers.onclose = onclose;*/
  },
};
function setLocalStorage() {
  localStorage.setItem("language", language);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem(language)) {
    language = localStorage.getItem("language");
  }
}
window.addEventListener("load", getLocalStorage);


window.addEventListener("DOMContentLoaded", function () {
  getLocalStorage()
  Keyboard.properties.language=language;
  textarea.focus();
  Keyboard.init();
});

function setLocalStorage() {
  localStorage.setItem("language", language);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("language")) {
    language = localStorage.getItem("language");
  }
}
window.addEventListener("load", getLocalStorage);

document.onkeydown = function (event) {
 // console.log("event-key===" + event.key);
  document.querySelectorAll(".keyboard__key").forEach(function (elem) {
    elem.classList.remove("keyboard__key--active-color");
  });
  Keyboard.properties.value += event.key;
  document
    .querySelector('.keyboard__key[data="' + event.key + '"]')
    .classList.add("keyboard__key--active-color");
};



/*document.querySelectorAll(".keyboard__key").forEach(function(elem){
    elem.oninput=function(event){
        document.querySelectorAll(".keyboard__key").forEach(function(elem){
    elem.classList.remove("keyboard__key--active-color")});
    let code=this.getAttribute("data");
    this.classList.add("keyboard__key--active-color")
        }
    });*/
