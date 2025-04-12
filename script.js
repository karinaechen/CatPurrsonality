document.getElementById("start-quiz-button").addEventListener("click", function() {
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    // document.getElementById('mbti-confirmation').style.display = 'none';
    questionIdx = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    userAnswers = {};
    displayQuestion(); 
});

const questions = [
{
    question: "You open your eyes and yawn. Something feels different... Across the room, you see your reflection, and you've transformed into a cat! You look down, and you are...",
    image: "Q1.png",
    options: [
    { text: "Curled up in a sunbeam on a windowsill", traits: "I", option_no: 1 },
    { text: "Sprawled across your human's bed", traits: "E", option_no: 2 },
    { text: "On a bookshelf, looking down", traits: "N", option_no: 3 },
    { text: "Hiding in a cozy box", traits: "S", option_no: 4 }
    ]
},
{
    question: "Your stomach growls! What's your first move?",
    image: "Q2.png",
    options: [
    { text: "Demand food immediately with loud meows.", traits: "E", option_no: 1 },
    { text: "Strategically nudge your human awake.", traits: "J", option_no: 2 },
    { text: "Wait patiently, knowing breakfast will come.", traits: "P", option_no: 3 },
    { text: "Try to open the food container yourself.", traits: "T", option_no: 4 }
    ]
},
{
    question: "It's playtime! What's your preferred toy?",
    image: "Q3.png",
    options: [
    { text: "A simple ball that rolls", traits: "S", option_no: 1 },
    { text: "A feather wand", traits: "N", option_no: 2 },
    { text: "A puzzle toy that dispenses treats", traits: "T", option_no: 3 },
    { text: "Whatever makes the biggest mess", traits: "P", option_no: 4 }
    ]
},
{
    question: "You Spot a Mysterious Red Dot! What Do You Do?",
    image: "Q4.png",
    options: [
    { text: "Chase it with full enthusiasm, even if you don't understand it.", traits: ["E", "S"], option_no: 1 },
    { text: "Analyze it from a distance before deciding if it's worth chasing.", traits: ["I", "N"], option_no: 2 },
    { text: "Attempt to figure out the source of the light instead of chasing it.", traits: "T", option_no: 3 },
    { text: "Ignore it. You have more important things to do.", traits: "J", option_no: 4 }
    ]
},
{
    question: "A Stranger Enters the House!",
    image: "Q5.png",
    options: [
    { text: "Hide immediately.", traits: "I", option_no: 1 },
    { text: "Stalk them from a distance until you determine their worth.", traits: ["N", "T"], option_no: 2 },
    { text: "Rub against their legs and demand attention.", traits: ["E", "F"], option_no: 3 },
    { text: "Hiss at them—how dare they enter YOUR domain?", traits: "J", option_no: 4 }
    ]
},
{
    question: "Your Human Leaves for the Day. What Do You Do?",
    image: "Q6.png",
    options: [
    { text: "Nap until they return.", traits: "P" },
    { text: "Patrol the house, making sure everything is in order.", traits: "J", option_no: 1 },
    { text: "Look for a way to escape and explore.", traits: ["N", "P"], option_no: 2 },
    { text: "Feel abandoned and wait anxiously by the door.", traits: "F", option_no: 3 }
    ]
},
{
    question: "A Bird Lands on the Windowsill!",
    image: "Q7.png",
    options: [
    { text: "Chatter and wiggle your tail, eyes locked on your target.", traits: ["S", "P"], option_no: 1 },
    { text: "Strategize how you might catch it if given the chance.", traits: ["N", "T"], option_no: 2 },
    { text: "Ignore it. Birds don't impress you.", traits: "J", option_no: 3 },
    { text: "Run and tell your human about the “threat.”", traits: "F", option_no: 4 }
    ]
},
{
    question: "You Encounter Another Cat in the House. How Do You React?",
    image: "Q8.png",
    options: [
    { text: "Ignore them. You don't need company.", traits: "I", option_no: 1 },
    { text: "Greet them cautiously, waiting to see their reaction.", traits: ["N", "F"], option_no: 2 },
    { text: "Assert dominance immediately. This is YOUR house.", traits: ["J", "T"], option_no: 3 },
    { text: "Try to befriend them! More playmates, more fun!", traits: ["E", "P"], option_no: 4 }
    ]
},
{
    question: "You Knock a Glass Off the Table. Why?",
    image: "Q9.png",
    options: [
    { text: "It was in your way, obviously.", traits: "J", option_no: 1 },
    { text: "You were testing gravity again.", traits: ["N", "T"], option_no: 2 },
    { text: "You wanted to see your human's reaction.", traits: ["E", "P"], option_no: 3 },
    { text: "It was an accident! You feel bad.", traits: "F", option_no: 4 }
    ]
},
{
    question: "It's Time for Grooming! How Do You Feel?",
    image: "Q10.png",
    options: [
    { text: "Self-care is essential. You groom yourself meticulously.", traits: ["J", "S"], option_no: 1 },
    { text: "You'll clean up when you feel like it", traits: "P", option_no: 2 },
    { text: "You tolerate grooming but would rather be doing something else.", traits: "N", option_no: 3 },
    { text: "You demand your human brush you instead.", traits: ["E", "F"], option_no: 4 }
    ]
},
{
    question: "It's Nighttime. Where Do You Sleep?",
    image: "Q11.png",
    options: [
    { text: "Wherever feels right in the moment.", traits: "P", option_no: 1 },
    { text: "The same place every night—it's your routine.", traits: "J", option_no: 2 },
    { text: "Somewhere high up, where you can see everything.", traits: "N", option_no: 3 },
    { text: "Right next to your human.", traits: "F", option_no: 4 }
    ]
},
{
    question: "What's Your Life Philosophy as a Cat?",
    image: "Q12.png",
    options: [
    { text: "If it moves, chase it. If it doesn't, knock it over.", traits: ["E", "P"], option_no: 1 },
    { text: "Think before you pounce.", traits: ["I", "N"], option_no: 2 },
    { text: "Establish order and maintain control.", traits: ["J", "T"], option_no: 3 },
    { text: "Love your human, and they will love you back.", traits: "F", option_no: 4 }
    ]
},
];

let questionIdx = 0;

function displayQuestion() {
    const quizElement = document.getElementById('quiz');
    const question = questions[questionIdx];
    if (question) {
        let html = `<p>${question.question}</p>`;
        if (question.image) {
            html += `<img src="${question.image}" alt="Question ${questionIdx + 1}">`;
        }
        for (const option in question.options) {
            html += `<button class="option-button" value="${option}" id="${option}">${question.options[option].text}</button>`;
        }
        quizElement.innerHTML = html;
        attachButtonClickHandlers();
    }
}

function attachButtonClickHandlers() {
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach((button) => {
        button.addEventListener('click', handleAnswer);
    });
}

function handleAnswer(event) {
    const selectedOption = event.target;
    const answerKey = selectedOption.value;
    const question = questions[questionIdx];
    const answer = question.options[answerKey];
    console.log(answer)

    userAnswers[questionIdx+1] = answer.option_no
    console.log(userAnswers)

    for (const dimension in answer.traits) {
        const letter = answer.traits[dimension]
        scores[letter] += 1
        console.log(scores)
    }

    if (questionIdx < questions.length - 1) {
        questionIdx++;
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const pairs = ["IE", "NS", "TF", "PJ"];
    result = pairs.map(pair => 
        scores[pair[0]] >= scores[pair[1]] ? pair[0] : pair[1]
    ).join('');
    console.log(result)

    // fetch("http://localhost:5000/predict-mbti", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ answers: userAnswers })
    // })
    // .then(res => res.json())
    // .then(data => {
    //     const predictedMBTI = data.prediction;
    //     console.log("Model Prediction:", predictedMBTI);
    // })
    // .catch(err => {
    //     console.error("Prediction error:", err);
    // });

    const mbtiImg = result + ".png";
    if (mbtiImg) {
        document.getElementById('result-text').innerHTML = result;

        document.getElementById('result-image').src = "images/"+mbtiImg;
        document.getElementById('result-image').alt = `${result} Image`;
    }

    document.getElementById('quiz').style.display = 'none'; // Hide the quiz
    document.getElementById('result').style.display = 'block'; // Show the result
    document.getElementById('restart-quiz-button').style.display = 'block'; // Show the restart button
    // document.getElementById('mbti-confirmation').style.display = 'block';
}

// async function submitUserMBTI() {
//     const actualMBTI = document.getElementById('input-mbti').value;
//     if (!actualMBTI) {
//         alert("Please select your MBTI type.");
//         return;
//     }

//     const payload = {
//         answers: window.userAnswers,
//         quizMBTI: window.result,
//         actualMBTI
//       };

//     console.log(JSON.stringify(payload));
// }

function restartQuiz() {
    questionIdx = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    userAnswers = {};
    document.getElementById('result').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    displayQuestion(); // Start the quiz from the beginning
}

const personalityCatMapping = {
    'INTJ': '',
    'INTP': '',
    'ENTJ': '',
    'ENTP': '',
    'INFJ': '',
    'INFP': '',
    'ENFJ': '',
    'ENFP': '',
    'ISTJ': '',
    'ISFJ': '',
    'ESTJ': '',
    'ESFJ': '',
    'ISTP': '',
    'ISFP': '',
    'ESTP': '',
    'ESFP': ''
}
