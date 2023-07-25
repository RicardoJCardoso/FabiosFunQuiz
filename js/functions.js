disabledAnswers = [];
Questions = {}
Answers = {}
AuthorName = "";

const firebaseConfig = {
    apiKey: "AIzaSyAUY6f4vJkgxrsgfXnUq23-xvPvkmJ5tJs",
    authDomain: "quiz-91687.firebaseapp.com",
    databaseURL: "https://quiz-91687-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "quiz-91687",
    storageBucket: "quiz-91687.appspot.com",
    messagingSenderId: "560153117646",
    appId: "1:560153117646:web:a7b83cf3e66642070be19f",
    measurementId: "G-HXKJLJ8E8V"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();


//writeQuestions();
try {
    readQuestions();
} catch (error) {
    console.log(error);

}

try {
    readAnswers();
} catch (error) {
    console.log(error);

}

function writeQuestions() {
    // Write data to the database
    database.ref('Questions').set({
        "1": 'What is your favorite Color?',
    });
}

function readQuestions() {
    // Read data from the database
    const editableList = document.getElementById('editableList');
    const newItemInput = document.getElementById('newItemInput');
    const newItemText = newItemInput.value.trim();


    database.ref('Questions').once('value')
        .then(snapshot => {
            const data = snapshot.val();
            Questions = data;
            data.forEach(element => {
                const editableList = document.getElementById('editableList');
                const a = document.createElement('a');
                a.className = "list-group-item list-group-item-action pt-2"
                a.innerHTML = `<span>${element}</span> 
                    <button class="btn btn-primary" onclick="removeItem(this)">Remove</button>`;
                editableList.appendChild(a);
                newItemInput.value = '';
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });


}

function readAnswers() {
    // Read data from the database
    const editableList = document.getElementById('editableListAnswer');
    const newItemInput = document.getElementById('newItemInputAnswer');
    const newItemText = newItemInput.value.trim();


    database.ref('Answers').once('value')
        .then(snapshot => {
            const data = snapshot.val();
            Answers = data;
            data.forEach(element => {
                const editableList = document.getElementById('editableListAnswer');
                const a = document.createElement('a');
                a.className = "list-group-item list-group-item-action pt-2"
                a.innerHTML = `<span>${element}</span> 
                    <button class="btn btn-primary" onclick="removeItemAnswer(this)">Remove</button>`;
                editableList.appendChild(a);
                newItemInput.value = '';
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });


}

// Function to add a new item to the list
function addItem() {
    const newItemInput = document.getElementById('newItemInput');
    const newItemText = newItemInput.value.trim();

    if (newItemText === '') {
        alert('Please enter a valid item.');
        return;
    }

    const editableList = document.getElementById('editableList');
    const a = document.createElement('a');
    a.className = "list-group-item list-group-item-action pt-2"
    a.innerHTML = `<span>${newItemText}</span> 
                    <button class="btn btn-primary" onclick="removeItem(this)">Remove</button>`;
    editableList.appendChild(a);
    newItemInput.value = '';
    if (Questions === null) {
        Questions = {}
        Questions[0] = newItemText;
    } else {

        var count = Object.keys(Questions).length;
        Questions[count] = newItemText;
    }

    database.ref().update({
        Questions
    });
}


// Function to remove an item from the list
function removeItem(removeButton) {

    const li = removeButton.parentElement;
    let value = li.querySelector('span').textContent;

    const index = Questions.findIndex((element) => element === value);

    Questions.splice(index, 1)

    database.ref().update({
        Questions
    });

    li.remove();
}

// Function to add a new item to the list
function addItemAnswer() {
    const newItemInput = document.getElementById('newItemInputAnswer');
    const newItemText = newItemInput.value.trim();

    if (newItemText === '') {
        alert('Please enter a valid item.');
        return;
    }

    const editableList = document.getElementById('editableListAnswer');
    const a = document.createElement('a');
    a.className = "list-group-item list-group-item-action pt-2"
    a.innerHTML = `<span>${newItemText}</span> 
                    <button class="btn btn-primary" onclick="removeItemAnswer(this)">Remove</button>`;
    editableList.appendChild(a);
    newItemInput.value = '';
    if (Answers === null) {
        Answers = {}
        Answers[0] = newItemText;
    } else {

        var count = Object.keys(Answers).length;
        Answers[count] = newItemText;
    }

    database.ref().update({
        Answers
    });


}

// Function to remove an item from the list
function removeItemAnswer(removeButton) {
    const li = removeButton.parentElement;
    let value = li.querySelector('span').textContent;

    const index = Answers.findIndex((element) => element === value);

    Answers.splice(index, 1)

    database.ref().update({
        Answers
    });

    li.remove();


}



function showQuiz() {
    document.getElementById('formID').classList.add('d-none');
    document.getElementById('quizID').classList.remove('d-none');
}

function checkAnswer(questionId) {
    var inputs = document.getElementsByName(questionId);
    var selectedAnswer = null;

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            selectedAnswer = inputs[i].value;
            break;
        }
    }

    if (selectedAnswer) {
        if (questionId === 'q1') {
            disableSelectedAnswer('q2', selectedAnswer);
            document.getElementById('question1').classList.add('d-none');
            document.getElementById('question2').classList.remove('d-none');
        } else if (questionId === 'q2') {
            disableSelectedAnswer('q3', selectedAnswer);
            document.getElementById('question2').classList.add('d-none');
            document.getElementById('question3').classList.remove('d-none');
            
        } else if (questionId === 'q3') {
            disableSelectedAnswer('q4', selectedAnswer);
            document.getElementById('question3').classList.add('d-none');
            document.getElementById('question4').classList.remove('d-none');
            
        } else if (questionId === 'q4') {
            disableSelectedAnswer('q5', selectedAnswer);
            document.getElementById('question4').classList.add('d-none');
            document.getElementById('question5').classList.remove('d-none');
            
        } else if (questionId === 'q5') {
            disableSelectedAnswer('q6', selectedAnswer);
            document.getElementById('question5').classList.add('d-none');
            document.getElementById('question6').classList.remove('d-none');
            
        } else if (questionId === 'q6') {
            disableSelectedAnswer('q7', selectedAnswer);
            document.getElementById('question6').classList.add('d-none');
            document.getElementById('question7').classList.remove('d-none');
            
        } else if (questionId === 'q7') {
            disableSelectedAnswer('q8', selectedAnswer);
            document.getElementById('question7').classList.add('d-none');
            document.getElementById('question8').classList.remove('d-none');
            
        } else if (questionId === 'q8') {
            disableSelectedAnswer('q9', selectedAnswer);
            document.getElementById('question8').classList.add('d-none');
            document.getElementById('question9').classList.remove('d-none');
            
        } else if (questionId === 'q9') {
            disableSelectedAnswer('q10', selectedAnswer);
            document.getElementById('question9').classList.add('d-none');
            document.getElementById('question10').classList.remove('d-none');
            
        } 
        else if (questionId === 'q10') {
            disableSelectedAnswer('q10', selectedAnswer);
            // Perform final calculations or show results
            // For now, let's just display the selected answers

            var q1 = document.getElementById('question1').getElementsByTagName('h2')[0].outerText;
            var q2 = document.getElementById('question2').getElementsByTagName('h2')[0].outerText;
            var q3 = document.getElementById('question3').getElementsByTagName('h2')[0].outerText;
            var q4 = document.getElementById('question4').getElementsByTagName('h2')[0].outerText;
            var q5 = document.getElementById('question5').getElementsByTagName('h2')[0].outerText;
            var q6 = document.getElementById('question6').getElementsByTagName('h2')[0].outerText;
            var q7 = document.getElementById('question7').getElementsByTagName('h2')[0].outerText;
            var q8 = document.getElementById('question8').getElementsByTagName('h2')[0].outerText;
            var q9 = document.getElementById('question9').getElementsByTagName('h2')[0].outerText;
            var q10 = document.getElementById('question10').getElementsByTagName('h2')[0].outerText;


            var selectedAnswers = {
                    [q1]: document.querySelector('input[name="q1"]:checked').value,
                    [q2]: document.querySelector('input[name="q2"]:checked').value,
                    [q3]: document.querySelector('input[name="q3"]:checked').value,
                    [q4]: document.querySelector('input[name="q4"]:checked').value,
                    [q5]: document.querySelector('input[name="q5"]:checked').value,
                    [q6]: document.querySelector('input[name="q6"]:checked').value,
                    [q7]: document.querySelector('input[name="q7"]:checked').value,
                    [q8]: document.querySelector('input[name="q8"]:checked').value,
                    [q9]: document.querySelector('input[name="q9"]:checked').value,
                    [q10]: document.querySelector('input[name="q10"]:checked').value
            };
  
            console.log(selectedAnswers);

            submitAnswers(selectedAnswers);


        }
    } else {
        alert('Please select an answer.');
    }
}

function disableSelectedAnswer(questionId, selectedAnswer) {
    var inputs = document.getElementsByName(questionId);

    disabledAnswers.push(selectedAnswer);

    for (var i = 0; i < inputs.length; i++) {
        for (var j = 0; j < disabledAnswers.length; j++) {
            if (inputs[i].value === disabledAnswers[j]) {
                inputs[i].disabled = true;
            }
        }
    }
}


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNonRepeatingRandomNumbers(count, min, max) {
    if (max - min + 1 < count) {
        console.log("Cannot generate non-repeating random numbers with the given range and count.");
        return [];
    }

    const numbers = [];
    while (numbers.length < count) {
        const randomNumber = getRandomNumber(min, max);
        if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
        }
    }

    return numbers;
}


function loadQuestionsQ() {
    let questions;
    database.ref('Questions').once('value')
        .then(snapshot => {
            const data = snapshot.val();
            questions = data;
            let numbers = generateNonRepeatingRandomNumbers(10, 0, 9);
            let count = 1;
            numbers.forEach(element => {
                addQuestionHTML(data[element],count);
                count++;
            });
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
}

function addQuestionHTML(question, qID) {

    console.log(question);

    const quiz = document.getElementById("quizID");

    let div = "";

    database.ref('Answers').once('value')
    .then(snapshot => {
        const data = snapshot.val();
        anwswers = data;

        if (qID === 1) {
            div = '<div id="question' + qID +'"> ' +
               '<h2>' + question + '</h2> ' +
               '<p>Select the correct answer:</p>' +
               '<div class="input-group-text">' +
               '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
               'value="' + anwswers[0] + '">'+ anwswers[0] +
               '</div>' +
               '<div class="input-group-text">' +
               '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
               '        value="' + anwswers[1] + '">' + anwswers[1]  +
               '</div>' +
               '<div class="input-group-text">' +
               '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
               '        value="' + anwswers[2] + '">' + anwswers[2] +
               '</div>' +
               '<div class="input-group-text">' +
               '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
               '        value="' + anwswers[3] + '">' + anwswers[3] +
               '</div>' +
               '<div class="input-group-text">' +
               '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
               '        value="' + anwswers[4] + '">' + anwswers[4] +
               '</div>' +
               '<div class="input-group-text">' +
               '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
               '        value="' + anwswers[5] + '">' + anwswers[5] +
               '</div>' +
               '<div class="input-group-text">' +
               '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
               '        value="' + anwswers[6] + '">' + anwswers[6] +
               '</div>' +
               '<div class="input-group-text">' +
               '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
               '        value="' + anwswers[7] + '">' + anwswers[7] +
               '</div>' +

               '<div class="input-group-text">' +
               '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
               '        value="' + anwswers[8] + '">' + anwswers[8] +
               '</div>' +
               '<div class="input-group-text">' +
               '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
               '        value="' + anwswers[9] + '">' + anwswers[9] +
               '</div>' +
               '<button onclick="checkAnswer(\'q1\')" class="btn btn-secondary">Next</button>' +
               '</div>';
   
       }else if(qID === 10){
           div = '<div id="question'+ qID + '" class="d-none"> ' +
           '<h2>' + question + '</h2> ' +
           '<p>Select the correct answer:</p>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           'value="' + anwswers[0] + '">'+ anwswers[0] +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[1] + '">' + anwswers[1]  +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[2] + '">' + anwswers[2] +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[3] + '">' + anwswers[3] +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[4] + '">' + anwswers[4] +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[5] + '">' + anwswers[5] +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[6] + '">' + anwswers[6] +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[7] + '">' + anwswers[7] +
           '</div>' +

           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[8] + '">' + anwswers[8] +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[9] + '">' + anwswers[9] +
           '</div>' +
           '<button onclick="checkAnswer(\'q'+ qID +'\')" class="btn btn-success">Submit</button>' + 
           '</div>';
       }else{
            div = '<div id="question'+ qID + '" class="d-none"> ' +
           '<h2>' + question + '</h2> ' +
           '<p>Select the correct answer:</p>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           'value="' + anwswers[0] + '">'+ anwswers[0] +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[1] + '">' + anwswers[1]  +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[2] + '">' + anwswers[2] +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[3] + '">' + anwswers[3] +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[4] + '">' + anwswers[4] +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[5] + '">' + anwswers[5] +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[6] + '">' + anwswers[6] +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[7] + '">' + anwswers[7] +
           '</div>' +

           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[8] + '">' + anwswers[8] +
           '</div>' +
           '<div class="input-group-text">' +
           '    <input type="radio" aria-label="Radio button for following text input" name="q' + qID +'"' +
           '        value="' + anwswers[9] + '">' + anwswers[9] +
           '</div>' +
           '<button onclick="checkAnswer(\'q'+ qID +'\')" class="btn btn-secondary">Next</button>' +
           '</div>';
       }
       quiz.innerHTML = quiz.innerHTML + div;

    }).catch(error => {
        console.error('Error fetching data:', error);
    });


}

function submitAnswers(selectedAnswers){
    var name = document.getElementById('exampleInputEmail1').value;
    console.log(name);
    const customName = name;
    const ref = database.ref(customName);

    ref.set(selectedAnswers)
    .then(() => {
      console.log("Data sent successfully!");
      alert('Quiz submited!');
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });

}




loadQuestionsQ();