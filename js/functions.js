disabledAnswers = [];
Questions = {}
Answers = {}

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
readQuestions();
readAnswers();

function writeQuestions() {
    // Write data to the database
    database.ref('Questions').set({
        "1" : 'What is your favorite Color?',
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
    if(Questions === null){
        Questions = {}
        Questions[0] = newItemText;
    }else{
        
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
    let value= li.querySelector('span').textContent;

    const index = Questions.findIndex((element) => element === value);

    Questions.splice(index,1)

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
    if(Answers === null){
        Answers = {}
        Answers[0] = newItemText;
    }else{
        
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
    let value= li.querySelector('span').textContent;

    const index = Answers.findIndex((element) => element === value);

    Answers.splice(index,1)

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
            disableSelectedAnswer('q3', selectedAnswer);
            // Perform final calculations or show results
            // For now, let's just display the selected answers
            var selectedAnswers = {
                q1: document.querySelector('input[name="q1"]:checked').value,
                q2: document.querySelector('input[name="q2"]:checked').value,
                q3: document.querySelector('input[name="q3"]:checked').value
            };

            
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