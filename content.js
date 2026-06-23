// content.js
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
const bookmarkIMG = chrome.runtime.getURL("assets/bookmark.png");
const AZ_PROBLEM_KEY="AZ_PROBLEM_KEY";

const observer = new MutationObserver(()=>{
    addBookmarkButton();
})

observer.observe(document.body,{childList:true, subtree: true});

addBookmarkButton();

function onProblemsPage(){
    return window.location.pathname.startsWith('/problems/');
}
function addBookmarkButton(){
    
    if(!onProblemsPage() ||  document.getElementById("add-bookmark-button"))return;
    const bookmarkbutton=document.createElement('img');
    bookmarkbutton.id="add-bookmark-button";
    bookmarkbutton.src = bookmarkIMG;
    bookmarkbutton.style.height="30px";
    bookmarkbutton.style.width="30px";

    const description=document.getElementsByClassName("font-open-sans text-[16px] leading-[130%] font-bold text-fg-grey-primary")[0];

    description.insertAdjacentElement("beforebegin",bookmarkbutton);

    bookmarkbutton.addEventListener("click",addNewBookmarkHandler);
}

async function addNewBookmarkHandler(){
    const currentBookmarks=await getCurrentBookmarks();
    const azProblemUrl=window.location.href;
    const uniqueId=extractUniqueId(azProblemUrl);
    const problemName=document.getElementsByClassName("font-rubik text-fg-grey-primary text-xl leading-[130%] font-bold")[0].innerText;

    if(currentBookmarks.some((bookmark)=>bookmark.id==uniqueId))return;
    const bookmarkObj={
        id:uniqueId,
        name:problemName,
        url:azProblemUrl
    }

    const updatedBookmarks = [...currentBookmarks,bookmarkObj];

    chrome.storage.sync.set({AZ_PROBLEM_KEY:updatedBookmarks},()=>{
        console.log("Updated the bookmarks correctly to ",updatedBookmarks);
    })
}

function extractUniqueId(url) {
    const start = url.indexOf("problems/") + "problems/".length;
    const end = url.indexOf("?", start);
    return end === -1 ? url.substring(start) : url.substring(start, end);
}

function getCurrentBookmarks(){
    return new Promise((resolve,reject)=>{
            chrome.storage.sync.get([AZ_PROBLEM_KEY],(results)=>{
                resolve(results[AZ_PROBLEM_KEY]||[]);
            });
    })
    
}
