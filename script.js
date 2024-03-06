/*
 * Copyright (c) 2021 - 2024 Rajata Thamcharoensatit
 *
 * This software is licensed under the MIT License. Please see the LICENSE file for details.
 *
 * SPDX-License-Identifier: MIT
 *
 * For more information and contributions, please visit:
 * https://github.com/RJTPP/Public-senior-project
 */


var minRandomQuestionPlus = 0
var maxRandomQuestionPlus = 100
var minRandomQuestionMultiply = 1
var maxRandomQuestionMultiply = 12
var difficulty
var start
var second = 0
var myTimer
var questionAnswer
var point = 0
var numberOfQuestion = 1
var allPlayerAnswer = []
var allCorrectAnswer = []
var allQuestion = []
var addValueToRandomAnswer = 10 //value that add when possible RandomAnswer is less than 4 --> prevent infinite loop


function myRandom(min, max) {
    const N = max - min + 1;
    return Math.floor(Math.random() * N) + min;
}

function setDifficulty(mode){
    {minRandomQuestionPlus, maxRandomQuestionPlus, minRandomQuestionMultiply, maxRandomQuestionMultiply, difficulty} globalThis
    difficulty = mode
    if(mode == 1){
        minRandomQuestionPlus = 0
        maxRandomQuestionPlus = 100
        minRandomQuestionMultiply = 1
        maxRandomQuestionMultiply = 12
    }else if (mode == 2){
        minRandomQuestionPlus = 100
        maxRandomQuestionPlus = 1000
        minRandomQuestionMultiply = 12
        maxRandomQuestionMultiply = 100
    }else if (mode == 3){
        minRandomQuestionPlus = 1000
        maxRandomQuestionPlus = 10000
        minRandomQuestionMultiply = 100
        maxRandomQuestionMultiply = 1000
    }
    //console.log('difficulty = ' + minRandomQuestionPlus, maxRandomQuestionPlus, minRandomQuestionMultiply, maxRandomQuestionMultiply, difficulty)
}


function timer(){
    let diff = ((Date.now() - start) / 1000).toFixed(1)
    {second} globalThis
    second = diff
    document.getElementById('timer').innerHTML = '<p>time ' + Math.floor(second) + ' s</p>'
}


function startTimer(){
    {start} globalThis
    start = Date.now()
    myTimer = setInterval(timer,100)
}


function stopTimer(){
    clearInterval(myTimer)
}


// return --> [question, correct answer, random answer1, random answer2, random answer3]
function plus(x,y){
    let allAnswer = [x + ' + ' + y + ' = ?', x + y]
    let minRandomAnswer = (x+y) - Math.floor(0.2 * (x+y))
    let maxRandomAnswer = (x+y) + Math.floor(0.2 * (x+y))

    // check if possible random is more than 4 --> prevent infinite loop
    if(Math.abs(maxRandomAnswer - minRandomAnswer) <= 4 ){
        //console.log('add!!!',minRandomAnswer, maxRandomAnswer)
        if(maxRandomAnswer > minRandomAnswer){
            maxRandomAnswer += addValueToRandomAnswer
        }else{
            minRandomAnswer += addValueToRandomAnswer
        }
        
    }
    //console.log('plus : ', minRandomAnswer, maxRandomAnswer)
    while(allAnswer.length < 5){
        if (minRandomAnswer < 0){

            minRandomAnswer = 0
        }
        let randomAnswer  = myRandom(minRandomAnswer, maxRandomAnswer)
        if(allAnswer.includes(randomAnswer)){
            continue
        }
        else{
            allAnswer.push(randomAnswer)
        }

    }
    return allAnswer
}


function minus(x,y){
    let allAnswer = [x + ' - ' + y + ' = ?', x - y]
    let minRandomAnswer = (x-y) - Math.floor(0.2 * (x-y))
    let maxRandomAnswer = (x-y) + Math.floor(0.2 * (x-y))

    // check if possible random is more than 4 --> prevent infinite loop
    if(Math.abs(maxRandomAnswer - minRandomAnswer) <= 4 ){
        //console.log('add!!!',minRandomAnswer, maxRandomAnswer)
        if(maxRandomAnswer > minRandomAnswer){
            maxRandomAnswer += addValueToRandomAnswer
        }else{
            minRandomAnswer += addValueToRandomAnswer
        }
        
    }
    //console.log('minus : ', minRandomAnswer, maxRandomAnswer)
    while(allAnswer.length < 5){
        let randomAnswer  = myRandom(minRandomAnswer, maxRandomAnswer)
        if(allAnswer.includes(randomAnswer)){
            continue
        }
        else{
            allAnswer.push(randomAnswer)
        }
    }
    return allAnswer
}


function multiply(x,y){
    let allAnswer = [x + ' x ' + y + ' = ?', x * y]
    let minRandomAnswer = (x*y) - Math.floor(0.2 * (x*y))
    let maxRandomAnswer = (x*y) + Math.floor(0.2 * (x*y))

    // check if possible random is more than 4 --> prevent infinite loop
    if(Math.abs(maxRandomAnswer - minRandomAnswer) <= 4 ){
        //console.log('add!!!',minRandomAnswer, maxRandomAnswer)
        if(maxRandomAnswer > minRandomAnswer){
            maxRandomAnswer += addValueToRandomAnswer
        }else{
            minRandomAnswer += addValueToRandomAnswer
        }
        
    }
    //console.log('multiply : ', minRandomAnswer, maxRandomAnswer)
    while(allAnswer.length < 5){
        if (minRandomAnswer < 0){
            minRandomAnswer = 0
        }
        let randomAnswer  = myRandom(minRandomAnswer, maxRandomAnswer)
        if(allAnswer.includes(randomAnswer)){
            continue
        }
        else{
            allAnswer.push(randomAnswer)
        }

    }
    return allAnswer
}


function divide_easy(x,y){
    let allAnswer = [x + ' ÷ ' + y + ' = ?', Math.floor(x/y) + ' เศษ ' + (x % y)]
    let minRandomAnswer = Math.floor(x/y)-10
    let maxRandomAnswer = Math.floor(x/y)+10

    // check if possible random is more than 4 --> prevent infinite loop
    if(Math.abs(maxRandomAnswer - minRandomAnswer) <= 4 ){
        //console.log('add!!!',minRandomAnswer, maxRandomAnswer)
        if(maxRandomAnswer > minRandomAnswer){
            maxRandomAnswer += addValueToRandomAnswer
        }else{
            minRandomAnswer += addValueToRandomAnswer
        }
        
    }
    while(allAnswer.length < 5){
        if (minRandomAnswer < 0){
            minRandomAnswer = 0
        }
        let randomAnswer_m = myRandom(minRandomAnswer, maxRandomAnswer)
        let randomAnswer_r = myRandom(0, randomAnswer_m)
        if(allAnswer.includes(randomAnswer_m + ' เศษ ' + randomAnswer_r)){
            continue
        }
        else{
            allAnswer.push(randomAnswer_m + ' เศษ ' + randomAnswer_r)
        }
        
    }
    //console.log('divide : ' + allAnswer)
    return allAnswer
}

// สุ่มจำนวนเต็ม + สุ่มทศนิยม --> 8 + 0.25 = 8.25
function divide_hard(x,y){
    if(y > ( x* 20/100)){
        y = Math.floor(y/3)
    }
    let allAnswer = [x + ' ÷ ' + y + ' = ?', (x/y).toFixed(2)]
    let minRandomAnswer = Math.floor(x/y)-10
    let maxRandomAnswer = Math.floor(x/y)+10

    // check if possible random is more than 4 --> prevent infinite loop
    if(Math.abs(maxRandomAnswer - minRandomAnswer) <= 4 ){
        //console.log('add!!!',minRandomAnswer, maxRandomAnswer)
        if(maxRandomAnswer > minRandomAnswer){
            maxRandomAnswer += addValueToRandomAnswer
        }else{
            minRandomAnswer += addValueToRandomAnswer
        }
        
    }

    while(allAnswer.length < 5){
        if (minRandomAnswer < 0){
            minRandomAnswer = 0
        }
        let randomAnswer_m = myRandom(minRandomAnswer, maxRandomAnswer)
        let randomAnswer_r = myRandom(0, 99)/100
        //console.log(randomAnswer_m, randomAnswer_r)
        if(allAnswer.includes((randomAnswer_m + randomAnswer_r).toFixed(2))){
            continue
        }
        else{
            allAnswer.push((randomAnswer_m + randomAnswer_r).toFixed(2))
        }
        
    }
    //console.log('divide : ' + allAnswer)
    return allAnswer
}

function divide(x,y){
    
    if(difficulty == 1 || difficulty == 2){
        //console.log('easy')
        return divide_easy(x,y)
    }else{
        //console.log('hard')
        return divide_hard(x,y)
    }
}


function random_question(){
    let allMode = [plus, minus, multiply, divide]
    let mode = Math.floor(Math.random() * allMode.length)
    let selectedMode = allMode[mode]
    // for plus, minus
    let y = myRandom(minRandomQuestionPlus, maxRandomQuestionPlus)
    let x = myRandom(minRandomQuestionPlus, maxRandomQuestionPlus)
    // for multiply, divide
    let a = myRandom(minRandomQuestionMultiply, maxRandomQuestionMultiply)
    let b = myRandom(minRandomQuestionMultiply, maxRandomQuestionMultiply)
    //console.log(mode)

    if (selectedMode == divide){
        if (a > b){
            return selectedMode(a, b)
        }
        else{
            return selectedMode(b, a)
        }
    }
    else if (selectedMode == multiply){
        return selectedMode(a,b)
    }
    else{
        return selectedMode(x,y)
    }
}


function displayQuestionAnswer(question){
    var randomOrderOfQuestion = []  //ex. [3, 2, 1, 4]
    var correctOrderOfRandomOrder  // position 2(randomOrderOfQuestion[2] == 1) because questionAnswer[1] is correct answer
    var incorrectOrder = [] // [0, 1, 3] --> other position of randomOrderOfQuestion
    while(randomOrderOfQuestion.length < 4){
        var x = myRandom(1,4)
        if(randomOrderOfQuestion.includes(x)){
            continue
        }
        else{
            randomOrderOfQuestion.push(x)
        }
        
    }
    document.getElementById('question').innerHTML = '<span style="font-size: 5vmin;" >ข้อที่ ' + numberOfQuestion + '</span>' + '<span style="font-size: 5vmin;" ><br><br></span>' + question[0]
    // a1 = question[randomOrderOfQuestion[0]] == question[3] 
    // a2 = question[randomOrderOfQuestion[1]] == question[2]
    // a3 = question[randomOrderOfQuestion[2]] == question[1] --> correct answer
    // a4 = question[randomOrderOfQuestion[3]] == question[4]
    document.getElementById('answer_container').innerHTML = '<div class="answer_zone"><div class="choice" id="answer1">' + question[randomOrderOfQuestion[0]] + '</div><div class="choice" id="answer2">' + question[randomOrderOfQuestion[1]] + '</div></div> <div class="answer_zone"> <div class="choice" id="answer3"> ' + question[randomOrderOfQuestion[2]] + ' </div> <div class="choice" id="answer4"> ' + question[randomOrderOfQuestion[3]] + ' </div> </div>'
    // find correct position --> question[randomOrderOfQuestion[correctOrderOfRandomOrder]] == question[randomOrderOfQuestion[2]] == question[1]
    // and correctOrderOfRandomOrder == 2 == a3
    for(let i = 0; i < randomOrderOfQuestion.length; i++){
        if(question[randomOrderOfQuestion[i]] == question[1]){
            correctOrderOfRandomOrder = i
            // 2
        }else{
            incorrectOrder.push(i)
            // [0, 1, 3]
        }
    }
    // a2+1 == a3
    document.getElementById('answer'+ (parseInt(correctOrderOfRandomOrder)+1)).onclick = function(){correctChecker(true, question[randomOrderOfQuestion[correctOrderOfRandomOrder]])}
    // a0+1 == a1, a1+1 == a2, a3+1 == a4
    document.getElementById('answer'+ (parseInt(incorrectOrder[0])+1)).onclick = function(){correctChecker(false, question[randomOrderOfQuestion[incorrectOrder[0]]])}
    document.getElementById('answer'+ (parseInt(incorrectOrder[1])+1)).onclick = function(){correctChecker(false,  question[randomOrderOfQuestion[incorrectOrder[1]]])}
    document.getElementById('answer'+ (parseInt(incorrectOrder[2])+1)).onclick = function(){correctChecker(false,  question[randomOrderOfQuestion[incorrectOrder[2]]])}

    //console.log(question)
}


function startGame(mode){
    setDifficulty(mode)
    {questionAnswer} globalThis
    questionAnswer = random_question()
    // clear start page
    document.getElementById('intro').outerHTML = ''
    document.getElementById('start_game_container').outerHTML = ''
    // start question
    document.getElementById('question').innerHTML = '<h1>'+ questionAnswer[0] +'</h1>'
    startTimer()
    {numberOfQuestion, questionAnswer} globalThis
    numberOfQuestion = 1
    document.getElementById('answer_container').innerHTML = '<div class="answer_zone"><div class="choice" id="answer1"></div><div class="choice" id="answer2"></div></div><div class="answer_zone"><div class="choice" id="answer3"></div><div class="choice" id="answer4"></div></div>'
    displayQuestionAnswer(questionAnswer)
    //document.getElementById('answer_container').innerHTML = '<div class="answer_zone"><div class="choice" id="answer1"></div><div class="choice" id="answer2"></div></div><div class="answer_zone"><div class="choice" id="answer3"></div><div class="choice" id="answer4"></div></div>'

}

function showSumScore(){

}
function showEndScore(){
    stopTimer()
    // clear question content
    document.getElementById('answer_container').outerHTML = ''
    document.getElementById('question').outerHTML = ''
    document.getElementById('timer').innerHTML = ''
    // score
    document.getElementById('end_score').innerHTML += '<br> คุณได้ ' + point + ' คะแนน <br><br>' 
    // time used
    if(second < 60){
        document.getElementById('end_score').innerHTML += 'ใช้เวลาไป '+ parseFloat(second).toFixed(1) + ' วินาที'
    }else{
        document.getElementById('end_score').innerHTML += 'ใช้เวลาไป '+ (Math.floor(second / 60)) + ' นาที ' + (Math.floor(second % 60)) + ' วินาที'
    }
    // เฉลย
    document.getElementById('end_score').innerHTML += '<br><br>คำตอบของคุณ'
    for(let i = 0; i < allPlayerAnswer.length; i++){
        if(allPlayerAnswer[i] == allCorrectAnswer[i]){
            document.getElementById('solve').innerHTML += '<br> <span style=" color: green;">&#10003; </span>' + (i+1) + '.) ' + allQuestion[i] + '<br> คำตอบของคุณ : ' + allPlayerAnswer[i] + '  <br>'
        }else{
            document.getElementById('solve').innerHTML += '<br> <span style="color:red;">✗ </span>' + (i+1) + '.) ' + allQuestion[i] + '<br> คำตอบของคุณ : ' + allPlayerAnswer[i] + '<br> คำตอบที่ถูกต้อง : ' + allCorrectAnswer[i] + '<br>'
        }
    }
    // ให้กำลังใจ
    if(point >= 9){
        document.getElementById('appreciate').innerHTML += '<br><br>เก่งมาก!'
    }else if (point >= 5){
        document.getElementById('appreciate').innerHTML += '<br><br>เจ๋ง!'
    }else{
        document.getElementById('appreciate').innerHTML += '<br><br>ต้องพยายามอีกหน่อยนะ!'
    }
    document.getElementById('replay_container').innerHTML += '<br><br><center class="button" id="replay_button" onclick="location.reload()">เริ่มใหม่</center> <br>'
}


function correctChecker(inputIsCorrect,playerInput){
    {point, questionAnswer, numberOfQuestion, allPlayerAnswer} globalThis
    if(inputIsCorrect){
        point += 1
    }
    allPlayerAnswer.push(playerInput)
    allCorrectAnswer.push(questionAnswer[1])
    allQuestion.push(questionAnswer[0])

    numberOfQuestion += 1
    if(numberOfQuestion >= 11){
        showEndScore()
    }else{
        questionAnswer = random_question()

        displayQuestionAnswer(questionAnswer)
    }
}