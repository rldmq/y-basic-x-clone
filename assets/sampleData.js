import { v4 as uuidv4 } from "https://jspm.dev/uuid"

function avatarQuery(){
    const avatarVariants = ["marble", "beam", "pixel", "sunset", "bauhaus"]
    return avatarVariants[Math.floor(Math.random() * avatarVariants.length)]
}


export const twytterData = [
    {
        handle: "@dontAtMe",
        twyytText: `Milk first before cereal. Don't @ me`,
        avatar: `https://boring-avatars-api.vercel.app/api/avatar?size=50&variant=${avatarQuery()}`,
        isLiked: false,
        isRetwyyted: false,
        likes: 25,
        retwyyts: 18,
        replies: [
            {
                handle: "@eatsSoggyCereals",
                twyytText: `Blasphemy!`,
                avatar: `https://boring-avatars-api.vercel.app/api/avatar?size=50&variant=${avatarQuery()}`,
            },
            {
                handle: "@differentOpinionEnjoyer",
                twyytText: `Preach brother!`,
                avatar: `https://boring-avatars-api.vercel.app/api/avatar?size=50&variant=${avatarQuery()}`,
            }
        ],
        repliesHidden: true,
        uuid: uuidv4(),
        isYourTwyyt: false,
    },
    {
        handle: "@noRepliesNoLikes",
        twyytText: `Someone like or reply my twyyt pleeeeease! 😭`,
        avatar: `https://boring-avatars-api.vercel.app/api/avatar?size=50&variant=${avatarQuery()}`,
        isLiked: false,
        isRetwyyted: false,
        likes: 0,
        retwyyts: 0,
        replies: [],
        repliesHidden: true,
        uuid: uuidv4(),
        isYourTwyyt: false,
    },
    {
        handle: "@codingThoughts",
        twyytText: `I don't remember why I wrote my code this way...😵
        `,
        avatar: `https://boring-avatars-api.vercel.app/api/avatar?size=50&variant=${avatarQuery()}`,
        isLiked: false,
        isRetwyyted: false,
        likes: 1000,
        retwyyts: 575,
        replies: [
            {
                handle: "@yourBoss",
                twyytText: `Hey! What do you mean you don't remember?? Come to my office NOW!! 😡`,
                avatar: `https://boring-avatars-api.vercel.app/api/avatar?size=50&variant=${avatarQuery()}`,
            },
        ],
        repliesHidden: true,
        uuid: uuidv4(),
        isYourTwyyt: false,
    },
]