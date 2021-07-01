var playing = false;
var score;
var counter;
var remainingTime;
// making a correctAnswer global.
var correctAnswer;

// start or reset game
document.getElementById("startgame").onclick= function ()
{
	if (playing == false) {
		// show score value
		playing = true;
		score = 0;
		document.getElementById("scorevalue").innerHTML = score;

		// change start to reset
		document.getElementById("startgame").innerHTML = "Reset Game"; 

		// hide gameover box
		hide("gameover");

        // change bg of timebox to green
        document.getElementById("timebox").style.background = "#b8e93d";
        document.getElementById("timebox").style.color= "black";
		// show timebox
		show("timebox");

		// set counter
		counter = 60;
		document.getElementById("timevalue").innerHTML = counter;
		// start countdown
		countdown();

		// calling a function generateQA
		generateQA();
	}
	else {
		location.reload();
	}
}

// start countdown
function countdown()
{
	remainingTime = setInterval(function() {
		counter--;
		document.getElementById("timevalue").innerHTML = counter;
		if(counter == 10)
		{
			document.getElementById("timebox").style.background = "red";
			document.getElementById("timebox").style.color= "white";
		}
		if(counter == 0)  // game over
			{ clearInterval(remainingTime)
				show("gameover");
				document.getElementById("gameover").innerHTML = "<p>Game Over!!!</p> <p>Your score is : " + score + "</p>"
				hide("timebox");
				hide("correct");
				hide("wrong");
			  // we need to reset our playing mode to false
			  playing = false;
			  // change reset to start game
			  document.getElementById("startgame").innerHTML = "Start Game";
			}
		} , 1000)
}

// show an element
function show(Id)
{
	document.getElementById(Id).style.display = "block";
}

// hide an element
function hide(Id)
{
	document.getElementById(Id).style.display = "none";
}

// defining generateQA function
function generateQA()
{
	// generate a random value from 1 to 20
	var x = 1 + Math.round(Math.random() * 99);
	var y = 1+ Math.round(Math.random() * 99 );
	correctAnswer = x * y;

	// show question to the box
	document.getElementById("question").innerHTML = x + "*" + y;

	// generate a random value from 1 to 4 
	var boxNumber = 1 + Math.round(Math.random() * 3);

	// filling one box with correct answer
	document.getElementById("box"+boxNumber).innerHTML = correctAnswer;
	
    // filling all remaining boxes with wrong answers
    for (var i = 1; i < 5; i++) {

		// loop will work only if correct answer containing box is not equal to box to fill.
		if(i != boxNumber)
		{
			var wrongAnswer ;
			// until wrong answer is different than correct answer , continue looping
			do
			{
		    //generating a wrong answer
		    wrongAnswer = (1 + Math.round(Math.random() * 99) ) * (1 + Math.round(Math.random() * 99));	
		}while(wrongAnswer == correctAnswer);
		//after getting a different answer
		document.getElementById("box" + i).innerHTML = wrongAnswer;
	}
}
}

// to check if choosen box contains correct answer

for(var i = 1; i<5; i++)
{
	document.getElementById("box" + i).onclick = function ()
	{
		// if we are in playing mode
		if (playing == true) 
		{
			// if choosen answer is correct one
			if (this.innerHTML == correctAnswer)
			{
				score++;
				document.getElementById("scorevalue").innerHTML = score;
				hide("wrong");
				show("correct");
				setTimeout(function(){hide("correct")},1000);
				// generate a new question
				generateQA();
				document.getElementById("question").style.background = "#FDEDEC";
			}
			else
			{
				hide("correct");
				show("wrong");
				document.getElementById("question").style.background = "red";
				setTimeout(function() {hide("wrong")},1000);
				
				
			}
		}
	}
}
