var hangman = {
	wordlist : [
	"pikachu",
	"charmander",
	"squirtle",
	"bulbasaur",
	"meowth",
	"charizard",
	"blastoise",
	"venusaur",
	"mewtwo"],

	sounds : {
		win: "assets/sounds/pika1.mp3",
		lose: "assets/sounds/pika2.wav",
	    right: "assets/sounds/pika3.wav",
	    wrong: "assets/sounds/pika4.wav"
	},

	score: 0,
	currentword : [],
	correct: [],
	printed : [],
	lettersguessed : [],
	guessesremaining : 10,
	audioElement: document.createElement('audio'),


	gameinit: function(){
		var rando = Math.floor(Math.random() * 9);
		var theword = this.wordlist[rando];
		for(i=0; i<theword.length; i++){
			this.currentword.push(theword[i]);
			this.printed.push("_");
		}
		document.getElementById("thescore").innerHTML = "Score: " + this.score;
		console.log(this.score);
		this.printword();
		document.getElementById("guessed").innerHTML = "_";
	},

	gameclear: function(){
		this.currentword = [];
		this.printed = [];
		this.correct = [];
		this.lettersguessed = [];
		this.guessesremaining = 10;
		this.gameinit();
	},

	printword: function(){
		var wordgen = this.printed[0];
		for( i=1; i<this.printed.length; i++){
			wordgen = wordgen + " " + this.printed[i];
		}
		document.getElementById("theword").innerHTML = wordgen;
	},

	printguessed: function(){
		if(this.lettersguessed[0] == null){this.lettersguessed.push(" ")}
		var printgen = this.lettersguessed[0];
		for( i=1; i<this.lettersguessed.length; i++){
			printgen = printgen + " " + this.lettersguessed[i];
		}
		document.getElementById("guessed").innerHTML = printgen;
	},

	checkguess: function(event){
		console.log(event.which);
		if (event.which >= 97 && event.which <= 122){

			var gucci = false;
			var notusedyet = true;
			var guess = String.fromCharCode(event.which).toLowerCase();
			console.log(guess);
			console.log(this.correct)

			for( i=0; i<this.correct.length; i++){
				if(guess==this.correct[i]){
					notusedyet = false;
				}
			}

			for( i=0; i<this.lettersguessed.length; i++){
				if(guess==this.lettersguessed[i]){
					notusedyet = false;
				}
			}

			for( i=0; i<this.currentword.length; i++){
				if(guess==this.currentword[i]){
					gucci = true;
					this.printed[i] = this.currentword[i];
				}
			}			

			if(gucci && notusedyet){
				this.correct.push(guess);
				this.printword();
				var youwin = true;

				for( i=0; i<this.currentword.length; i++){
					if(this.currentword[i] != this.printed[i]){
						youwin = false;
					}
				}


				if(youwin){
					this.audioElement.setAttribute('src', this.sounds.win);
					this.audioElement.play();
					alert("You Win!");
					this.score++;
					this.gameclear();
				}
				else{
					this.correct.push(guess);
					this.audioElement.setAttribute('src', this.sounds.right);
					this.audioElement.play();
				}
			}


			else if(!gucci && notusedyet){
				if(this.guessesremaining==1){
					this.audioElement.setAttribute('src', this.sounds.lose);
					this.audioElement.play();
					alert("You Lost....");
					this.gameclear();
				}

				else{
					this.lettersguessed.push(guess);
					this.printguessed();
					this.audioElement.setAttribute('src', this.sounds.wrong);
					this.audioElement.play();
					this.guessesremaining--;
					document.getElementById("remain").innerHTML = "Remaining guesses: " + this.guessesremaining;
				}
			}

			else{console.log("quit spamming");}
		}
	},
}