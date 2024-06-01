/* selecting elements :
. getElementById()
. getElementsByClassName()
.getElementByTagName()
.querySelector()
.querySelectorAll()
*/

const heading = document.getElementById("heading");
console.log(heading);

const wrapperEle = document.getElementById("wrapper");
console.log(wrapperEle);

const para = document.getElementsByClassName("para");
console.log(para);

const paraWithTag = document.getElementsByTagName("p");
console.log(paraWithTag);

// querySelector() returns the first element that matches a specified CSS selector(s) in the document.
const paraWithQuery = document.querySelector(".para");
console.log(paraWithQuery);

// querySelectorAll() returns all elements in the document that matches a specified CSS selector(s), as a static NodeList object.
const paraWithQueryAll = document.querySelectorAll(".para");
console.log(paraWithQueryAll);

const button = document.getElementById("btn");
console.log("button", button);

// changing the content of the element
// innerHTML : returns the HTML content of an element
// textContent: returns the text node of an element, if you add tag inside this it will assume tag to be a string only and not an HTML tag
heading.textContent = "This is a updated heading";
// heading.innerHTML = "<em>This is a updated heading</em>";

// adding styles to the element
// targettedElement.style.propertyName = value;
heading.style.color = "red";

// traversing a document
// parentNode: returns the parent node of the specified node
console.log(heading.parentNode);

// childNodes : return all the child nodes of the specified node

console.log("childNodes ", wrapperEle.childNodes); // returns NodeList (including text nodes)
console.log("children ", wrapperEle.children); // returns HTML Collection (excluding text nodes)

// firstElementChild: returns the first child element of the specified node

console.log("firstElementChild ", wrapperEle.firstElementChild);
const firstCildOfWrapper = wrapperEle.firstElementChild;
firstCildOfWrapper.style.color = "green";
// lastElementChild: returns the last child element of the specified node

console.log("lastElementChild ", wrapperEle.lastElementChild);
const lastChildOfWrapper = wrapperEle.lastElementChild;
lastChildOfWrapper.style.color = "blue";
// nextElementSibling: returns the next element of the specified node
console.log("nextElementSibling ", heading.nextElementSibling);
// previousElementSibling: returns the previous element of the specified node
console.log("previousElementSibling ", wrapperEle.previousElementSibling);

// creating elements
const newPara = document.createElement("p");

wrapperEle.appendChild(newPara);
newPara.textContent = "This is a new para";
// adding attributes to the element
newPara.setAttribute("class", "para");

// adding event listner to the element

// addEventListener("eventName", functionName, useCapture)

button.addEventListener("click", () => {
  console.log("Button clicked");
});
