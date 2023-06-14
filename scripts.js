_JSON = {
    "col_titles": ["Words", "Background", "Study Passage", "Cross References", "Random"],
    "questions":{
        "col-1":[
            {
                "text": "What is logos?",
                "answer": "Word",
                "answered": "false"
            },
            
            {
                "text": "What is apostolos?",
                "answer": "Apostle",
                "answered": "false"
            },
            
            {
                "text": "What is disciple?",
                "answer": "Mathetes",
                "answered": "false"
            },
            
            {
                "text": "What is Man?",
                "answer": "Anthropos",
                "answered": "false"
            },
            
            {
                "text": "What is hymn singing?",
                "answer": "Hymnody",
                "answered": "false"
            },
        ],
        "col-2":[
            {
                "text": "Which books did John write?",
                "answer": "John (Gospel), 1 John, 2 John, 3 John, Revelation",
                "answered": "false"
            },
            
            {
                "text": "Where was John when he wrote John the Gospel?",
                "answer": "Ephesus",
                "answered": "false"
            },
            
            {
                "text": "Which sea was beside Turkey?",
                "answer": "Aegean Sea",
                "answered": "false"
            },
            
            {
                "text": "How many churches did John write to in Revelation 1:11?",
                "answer": "7",
                "answered": "false"
            },
            
            {
                "text": "Which city did Christians flee to from Jerusalem in AD 66?",
                "answer": "Pella",
                "answered": "false"
            },
        ],
        "col-3":[],
        "col-4":[],
        "col-5":[]
    }
}

// themes
const html = document.querySelector("html");
const themeSelect = document.querySelector("#theme");

themeSelect.addEventListener("change", () => {
    html.dataset.theme = themeSelect.value;
})

// populate game grid
const gameContainer = document.querySelector("#game-ctr");
var columns = 5;
var rows = 5;

for (let i = 0; i < columns; i++)
{
    let col = document.createElement("div");
    col.id = `col-${i + 1}`;
    col.classList.add("col");
    
    // title
    let title = document.createElement("div");
    title.innerHTML = _JSON.col_titles[i];
    col.appendChild(title)

    for (let j = 0; j < rows; j++)
    {
        let row = document.createElement("div");
        row.classList.add(`row-${j + 1}`);
        row.innerHTML = 100 * (j + 1);
        col.appendChild(row);
    }
    gameContainer.appendChild(col);
}

// open question

const qContainer = document.querySelector("#q-ctr");
const qAnswerInner = document.querySelector("#q-answer-inner")
const qPts = document.querySelector("#q-pts");
const qClose = document.querySelector("#q-ctr-close");
const questions = document.querySelectorAll(".col div:not(:first-child)");

var qOpeningAni = false;
var opening = true;
var selectedQ;

questions.forEach(q => {
    q.addEventListener('click', () => {
        qOpeningAni = true;
        let index = q.classList[0][4] - 1;
        selectedQ = _JSON.questions[q.parentNode.id][index];
        qContainer.style.display = "flex";
        qContainer.querySelector("#q-text").innerHTML = selectedQ.text;
        qContainer.querySelector("#q-answer-back").innerHTML = selectedQ.answer;
        qPts.innerHTML = (index + 1)*100;
        qContainer.style.animationPlayState = "running";
        opening = true;
    })
})

qClose.addEventListener('click', () => {
    qOpeningAni = true;
    qContainer.style.animationName = "grow";
    qContainer.style.animationDirection = "reverse";
    qContainer.style.animationPlayState = "running";
})

qContainer.addEventListener("animationend", () => {
    console.log({qOpeningAni});
    // if animation opening question
    if (qOpeningAni)
    {
        // if question opened
        if (opening)
        {
            qContainer.style.animationPlayState = "paused";
            qContainer.style.animationName = "none";
            opening = false;
            qOpeningAni = false;
        }
        // question closed
        else {
            qContainer.style.display = "";
            qContainer.style.animationName = "";
            qContainer.style.animationDirection = "";
            qContainer.style.animationPlayState = "paused";
            qOpeningAni = false;
        }
    }
    else {
        qAnswerInner.style.animationPlayState = "paused";
    }
})

document.addEventListener("keyup", event => {
    if (event.code == "Space")
    {
        qAnswerInner.style.animationPlayState = "running";
    }
})