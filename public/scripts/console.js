var closeModal = document.querySelector(".modal-close");
var overlay = document.querySelector("#modal-overlay");

closeModal.addEventListener("click", function () {
    var modal = document.querySelector("#modal");
    overlay.classList.remove("active");
    modal.classList.remove("active");
});

var CLI = {

	list: {
		cur: document.querySelector("#commandList"),

        line: {
            cur: getObj(".commandLine", 0),

            dup: document.querySelector(".commandLine").cloneNode(true),

            count: 0,

            cursor: {
                cur: getObj(".cursor", 0),

                off: function () {
                    this.cur.classList.remove("cursorOn");
                },

                on: function () {
                    this.cur.classList.add("cursorOn");
                },

                toggle: function () {
                    CLI.list.line.cursor.cur.classList.toggle("cursorOn");
                }
            },

            string: {
                cur: getObj(".commandString", 0),

                off: function () {
                    this.cur.setAttribute("contenteditable", "false");
                }
            },

            refresh: function () {
                this.cur = getObj(".commandLine", this.count);
                this.cursor.cur = getObj(".cursor", CLI.list.line.count);
                this.string.cur = getObj(".commandString", CLI.list.line.count);
                this.string.cur.focus();
            },

            new: function () {
                this.cursor.off();
                this.string.off();
                this.count++;
                return this.dup.cloneNode(true);
            },

            pop: function () {
                this.cur.parentNode.removeChild(this.cur);
                this.count--;
                if(this.count > -1) {
                    this.refresh();
                }
            }
        },

		addLine: function () {
			this.cur.appendChild(this.line.new());
			this.line.refresh();
		}
	},

    exe: function() {
        var text = CLI.list.line.string.cur.innerHTML;
        if(text == "help") {
            var newMsg = msg.cloneNode(true);
            newMsg.innerHTML = CLI.messages.help;
            CLI.list.cur.appendChild(newMsg);
        }
        else if(text == "./skills") {
            window.location.href="./skills"
        }
        else if(text == "./contact") {
            window.location.href="./contact"
        }
        else if(text == "./hello") {
            var newMsg = msg.cloneNode(true);
            curMsg = CLI.list.cur.appendChild(newMsg);
        }
        else if(text == "wget resume") {
            window.location.href="/resume"
        }
        else if(text == "wget github") {
            window.location.href="https://github.com/hbdermott"
        }	
        else if(text == "wget facebook") {
            window.location.href="https://www.facebook.com/hunter.dermott"
        }
        else if(text == "clear") {
            CLI.list.line.cursor.off();
            while (CLI.list.line.count > -1) {
                CLI.list.line.pop();
            }
            var messages = document.querySelectorAll(".message");
            for (var i = 0; i < messages.length; i++) {
                messages[i].parentNode.removeChild(messages[i]);
            }
        }
        else {
            var newMsg = msg.cloneNode(true);
            newMsg.innerHTML = CLI.messages.invalid;
            CLI.list.cur.appendChild(newMsg);
        }
        CLI.list.addLine();
    },
    messages: {
        invalid: "<p class='halftab red'>Invalid Command!</p> <p class='tab'> <span class='green'>help</span>: For valid commands<p>",
        help: "<p class='halftab'>Valid Commands: </p> \
        <p class='tab'><span class='green'>help</span>: For valid commands<p> \
        <p class='tab'><span class='green'>clear</span>: Clears the terminal<p> \
        <p class='tab'><span class='green'>wget</span>: Access files and urls<p> \
        <p></p> \
        <p class='halftab'>Executable Files: </p> \
        <p class='tab yellow'>skills<p> \
        <p class='tab yellow'>contact<p> \
        <p class='tab yellow'>hello<p> ",
        hello: "Hello World! My name is Hunter Dermott, and this is my portfolio website. I'm currently studying Computer Science at UCLA"
    }
}


var msg = document.createElement("div"); 
msg.classList.add("message");



function getObj(type, line) {
	return document.querySelectorAll(type)[line];
}

window.onresize = function(event) {
	document.querySelector("body").style.height = "100vh";
}

window.setInterval(CLI.list.line.cursor.toggle, 750);

document.onkeydown = function(event) {
	event = event || window.event;
    var charCode = event.keyCode || event.which;
    var charStr = String.fromCharCode(charCode);
    CLI.list.line.cursor.on();
    if(charCode == 13) {
    	event.preventDefault();
    	CLI.exe();
    }
}

document.querySelector("#commandList").addEventListener("click", function () {
	placeCaretAtEnd(CLI.list.line.string.cur);
})

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

// function type() {
//     if(i < CLI.messages.hello.length) {
//         curMsg.innerHTML += CLI.messages.hello.charAt(i);
//         i++;
//         setTimeout(type(str, location), 50);
//     }
// }