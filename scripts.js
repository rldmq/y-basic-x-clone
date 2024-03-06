// http://127.0.0.1:5500/y-basic-x-clone/index.html
// dark mode and light mode (save to local storage)
// unique twytter usernames (when they post), save to local storage
import { v4 as uuidv4 } from "https://jspm.dev/uuid"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
	databaseURL: "https://playground-411a9-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const twytterData2 = ref(database,"y/twyyts")

onValue(twytterData2, function(snapshot){
    const twyyts = Object.values(snapshot.val())

    let feedHtml = ""
   
    twyyts.forEach( e => {

        const liked = e.isLiked ? "liked" : ""
        const retwyyted = e.isRetwyyted ? "retwyyted" : ""
        const repliesHidden = e.repliesHidden ? "hidden" : ""

        feedHtml += `
            <div class="feed-twyyt border-bottom">
                ${e.isYourTwyyt ? `<i data-delete="${e.uuid}" id="delete-btn" class="delete-btn fa-regular fa-trash-can"></i>`: ""}
                <div class="user-twyyt ${!repliesHidden && e.replies.length ? "border-bottom" : ""}">
                    <img src="${e.avatar}" alt="Twytter profile picture" class="avatar"/>
                    <div class="user-twyyt-content">
                        <span class="handle">${e.handle}</span>
                        <p class="twyyt-text">${e.twyytText}</p>
                        <div class="interactions">
                            <div>
                                <i class="replies interact-btn fa-regular fa-comment-dots" data-replies="${e.uuid}"></i>
                                <span>${e.replies ? e.replies.length : 0}</span>
                            </div>
                            <div>
                                <i class="likes interact-btn fa-solid fa-heart ${liked}" data-like="${e.uuid}"></i>
                                <span>${e.likes}</span>
                            </div>
                            <div>
                                <i class="retwyyts interact-btn fa-solid fa-retweet ${retwyyted}" data-retwyyt="${e.uuid}"></i>
                                <span>${e.retwyyts}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="replies ${repliesHidden}" id="replies-${e.uuid}">
                </div>
            </div>
        `
    })

    document.getElementById("feed").innerHTML = feedHtml

    twyyts.forEach(twyyt => {
        let repliesHtml = ""

        if(twyyt.replies){
            twyyt.replies.forEach(reply => {
                repliesHtml += `
                    <div class="replies-twyyt border-bottom">
                        <img src="${reply.avatar}" alt="Twytter profile picture" />
                        <div class="replies-twyyt-content">
                            <span class="handle">${reply.handle}</span>
                            <p class="twyyt-text">${reply.twyytText}</p>
                        </div>
                    </div>
                `
            })
        }
        document.getElementById(`replies-${twyyt.uuid}`).innerHTML = repliesHtml
    })

})

// EVENT LISTENERS

document.addEventListener("click", function(e){
    if(e.target.dataset.replies){
        toggleReplies(e.target.dataset.replies)
    }
    else if(e.target.dataset.like){
        handleLike(e.target.dataset.like)
    }
    else if(e.target.dataset.retwyyt){
        handleRetwyyt(e.target.dataset.retwyyt)
    }
    else if(e.target.id === "twyyt-btn"){
        handlePostTwyyt()
    }
    else if(e.target.dataset.delete){
        handleDelete(e.target.dataset.delete)
    }
})

// FUNCTIONS
function getTwyytSnapshot(twyytId){
    let twyyt
    let refDb

    onValue(twytterData2, function(snapshot){
        const twyytKey = Object.entries(snapshot.val()).filter(e => e[1].uuid === twyytId)[0][0]
        twyyt = Object.values(snapshot.val()).filter(e => e.uuid === twyytId)[0]

        refDb = ref(database,`y/twyyts/${twyytKey}`)
    })

    return [twyyt, refDb]
}

function toggleReplies(twyytId){
    document.getElementById(`replies-${twyytId}`).classList.toggle("hidden")

    const [twyyt, refDb] = getTwyytSnapshot(twyytId)

    const updates = {
        repliesHidden: !twyyt.repliesHidden
    }

    update(refDb, updates)
}

function handleLike(twyytId){

    const [twyyt, refDb] = getTwyytSnapshot(twyytId)

    const updates = {
        isLiked: !twyyt.isLiked,
        likes: twyyt.isLiked ? twyyt.likes-1 : twyyt.likes+1,
    }

    update(refDb, updates)
}

function handleRetwyyt(twyytId){

    const [twyyt, refDb] = getTwyytSnapshot(twyytId)

    const updates = {
        isRetwyyted: !twyyt.isRetwyyted,
        retwyyts: twyyt.isRetwyyted ? twyyt.retwyyts-1 : twyyt.retwyyts+1,
    }

    update(refDb, updates)
}

function handlePostTwyyt(){

    const twyytText = document.getElementById("user-twyyt-text").value
    if(twyytText){
        push(twytterData2,
            {
                handle: "@ownerOfTwytter",
                twyytText: twyytText,
                avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel",
                isLiked: false,
                isRetwyyted: false,
                likes: 0,
                retwyyts: 0,
                replies: [],
                repliesHidden: true,
                uuid: uuidv4(),
                isYourTwyyt: true,
            }
        )
        document.getElementById("user-twyyt-text").value = ""
    }
}

function handleDelete(twyytId){
    const [twyyt, refDb] = getTwyytSnapshot(twyytId)

    remove(refDb)
}