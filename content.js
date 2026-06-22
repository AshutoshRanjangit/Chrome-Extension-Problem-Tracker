// content.js
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
const bookmarkIMG = chrome.runtime.getURL("assets/bookmark.png");

window.addEventListener("load",addBookmarkButton);

function addBookmarkButton(){
    const bookmarkbutton=document.createElement('img');
    bookmarkbutton.id="add-bookmark-button";
    bookmarkbutton.src = bookmarkIMG;
    bookmarkbutton.style.height="30px";
    bookmarkbutton.style.width="30px";

    const description=document.getElementsByClassName("font-open-sans text-[16px] leading-[130%] font-bold text-fg-grey-primary")[0];

    description.insertAdjacentElement("beforebegin",bookmarkbutton);
}
