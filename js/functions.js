disabledAnswers = [];
readJson();

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

            console.log(selectedAnswers);
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

function readJson() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const dataUrl = 'https://example.com/data.json';


    fetch(proxyUrl + dataUrl)
        .then(response => response.json())
        .then(data => {
            // 'data' contains the parsed JSON data
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });

}