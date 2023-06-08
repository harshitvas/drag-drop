var dragSrcEl = null; // Variable to store the dragged element
var messageArea = document.getElementById("message-area"); // Reference to the message area element

function allowDrop(event) {
  event.preventDefault(); // Allowing the drop event
}

function drag(event) {
  dragSrcEl = event.target; // Store the dragged element
  event.dataTransfer.setData("text/html", dragSrcEl.innerHTML); // Set the data being dragged
}

function drop(event) {
  event.preventDefault(); // Prevent default drop behavior
  var target = event.target;

  // Find the parent container of the dropped item
  while (!target.classList.contains("container")) {
    target = target.parentNode;
  }

  // Check if the dropped item overlaps with any existing items
  var items = target.getElementsByClassName("item");
  for (var i = 0; i < items.length; i++) {
    var rect1 = items[i].getBoundingClientRect(); // Get the bounding rectangle of an existing item
    var rect2 = dragSrcEl.getBoundingClientRect(); // Get the bounding rectangle of the dragged item

    if (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    ) {
      showMessage(
        "Item moved to container: " + target.querySelector("h2").textContent
      );
      return;
    }
  }

  target.appendChild(dragSrcEl); // Append the dragged item to the target container
  showMessage(
    "Item moved to container: " + target.querySelector("h2").textContent
  );
}

function showMessage(message) {
  messageArea.textContent = message; // Set the message text
  messageArea.style.display = "block"; // Display the message area
  setTimeout(function () {
    messageArea.style.display = "none"; // Hide the message area after 3 seconds
  }, 3000);
}

var items = document.getElementsByClassName("item");
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("dragstart", drag); // Add drag event listener to each item
}

var containers = document.getElementsByClassName("container");
for (var i = 0; i < containers.length; i++) {
  containers[i].addEventListener("drop", drop); // Add drop event listener to each container
  containers[i].addEventListener("dragover", allowDrop); // Add dragover event listener to each container
}
