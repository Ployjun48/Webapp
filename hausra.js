//640510686 สิริกร ชัยพัฒนาวรรณ
//640510671 พลอยจันท์ ช่างเรือ 

var formDataObject = {};
var form = document.getElementById("f1");

document.addEventListener("DOMContentLoaded", function () {
    // Get the form and input elements
    var form = document.getElementById("f1");
    var inputElement = document.querySelector(".inp1");

    // Add a keydown event listener to the input field
    inputElement.addEventListener("keydown", function (event) {
        // Check if the pressed key is Enter (key code 13)
        if (event.key === "Enter") {
            // Prevent the default form submission
            event.preventDefault();

            // Get the form data using FormData
            var formData = new FormData(form);
            formData.forEach(function (value, key) {
                formDataObject[key] = value;
            });

            // Log the form data to the console
            console.log("Form Data:", formDataObject);
            inserttext();
            insert();

            // Clear the input field
            inputElement.value = "";
        }
    });

    console.log(formDataObject)
});

function inserttext() {
    let maxlen = 5;
    console.log(formDataObject);
    let content = document.querySelector("#box");
    console.log(content);
    let output = `
      <div class="c4">
        <div id="username">${formDataObject.userN}</div>
        <div id="message">${formDataObject.messageInp}</div>
      </div>
      `;
    content.insertAdjacentHTML("afterbegin", output);
    let len = document.getElementsByClassName("c4");
    console.log(len.length);
    if (len.length > maxlen) {
        console.log();
        for (let i = maxlen; i < len.length; i++) {
            len[i].style.display = "none";
        }
    }
}

function load() {
    let len = document.getElementsByClassName("c4");
    for (let i = 0; i < len.length; i++) {
        len[i].style.display = "flex";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("https://complete-boa-79.hasura.app/api/rest/get-all-user", {
        headers: {
            "Cache-Control": "public, max-age=3600" // 1 hour caching
        }
    })
        .then((response) => response.json())
        .then((data) => {
            const boxElement = document.getElementById("box");

            // Loop through the data and create elements for each entry
            data.User.forEach((entry) => {
                const containerElement = document.createElement("div");
                containerElement.className = "c4";

                const usernameElement = document.createElement("div");
                usernameElement.id = "username";
                usernameElement.textContent = `${entry.name}`;

                const messageElement = document.createElement("div");
                messageElement.id = "message";
                messageElement.textContent = entry.task;

                containerElement.appendChild(usernameElement);
                containerElement.appendChild(messageElement);


                boxElement.insertBefore(containerElement, boxElement.firstChild);
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});

const endpoint = "https://complete-boa-79.hasura.app/api/rest/User"
function insert() {
    console.log(formDataObject);
    var data = {
        uname: formDataObject.userN,
        message: formDataObject.messageInp,
    };
    console.log(data)
    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache" // Avoid caching for POST requests
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
