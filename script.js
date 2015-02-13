"use strict";

window.onload = function(){

	function getRandomInt(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	var _WIDTH_POSITION_KOEFF = 8.35;
	var _HEIGHT_POSITION_KOEFF = 25;

	function cardClass(card, suit){
		this.card = card;
		this.suit = suit;
	};

	function getKeyOfValue(arr, val){
		for(var key in arr)
			if(arr[key] == val)
				return key;
		return null;
	};
	function inBetween(min, max, val){
		val = parseInt(val);
		min = parseInt(min);
		max = parseInt(max);
		if(val >= min && val <= max ||
			val >= max && val <= min)
			return true;
		return false;
	};
	
	function inArray(arr, val){
		for(var key in arr)
			if(arr[key] == val)
				return true; 
		return false;
	}

	var tableStateList = {
		'strong_pares': {
			"everybody folds": {
				"early": "Raise",
				"middle": "Raise",
				"late": "Raise",
				"blind": "Raise"
			},
			"somebody calls": {
				"early": "Raise",
				"middle": "Raise",
				"late": "Raise",
				"blind": "Raise"
			},
			"one raise was": {
				"early": "Raise",
				"middle": "Raise",
				"late": "Raise",
				"blind": "Raise"
			}
		},
		'middle_pares':{
			"everybody folds": {
				"early": "Raise",
				"middle": "Raise",
				"late": "Raise",
				"blind": "Raise"
			},
			"somebody calls": {
				"early": "Raise",
				"middle": "Raise",
				"late": "Raise",
				"blind": "Raise"
			},
			"one raise was": {
				"early": "Call20",
				"middle": "Call20",
				"late": "Call20",
				"blind": "Call20"
			}
		},
		'99-22':{
			"everybody folds": {
				"early": "Fold",
				"middle": "Call",
				"late": "Raise",
				"blind": "Call"
			},
			"somebody calls": {
				"early": "Fold",
				"middle": "Call",
				"late": "Call",
				"blind": "Call"
			},
			"one raise was": {
				"early": "Call20",
				"middle": "Call20",
				"late": "Call20",
				"blind": "Call20"
			}
		},
		'strong_A':{
			"everybody folds": {
				"early": "Raise",
				"middle": "Raise",
				"late": "Raise",
				"blind": "Raise"
			},
			"somebody calls": {
				"early": "Raise",
				"middle": "Raise",
				"late": "Raise",
				"blind": "Raise"
			},
			"one raise was": {
				"early": "Raise",
				"middle": "Raise",
				"late": "Raise",
				"blind": "Raise"
			}
		},
		'middle_A':{
			"everybody folds": {
				"early": "Fold",
				"middle": "Raise",
				"late": "Raise",
				"blind": "Raise"
			},
			"somebody calls": {
				"early": "Fold",
				"middle": "Fold",
				"late": "Raise",
				"blind": "Call"
			},
			"one raise was": {
				"early": "Fold",
				"middle": "Fold",
				"late": "Fold",
				"blind": "Fold"
			}
		},
		'A9s-A2s':{
			"everybody folds": {
				"early": "Fold",
				"middle": "Fold",
				"late": "Raise",
				"blind": "Raise"
			},
			"somebody calls": {
				"early": "Fold",
				"middle": "Fold",
				"late": "Call",
				"blind": "Call"
			},
			"one raise was": {
				"early": "Fold",
				"middle": "Fold",
				"late": "Fold",
				"blind": "Fold"
			}
		},
		'one_suit_pictures':{
			"everybody folds": {
				"early": "Fold",
				"middle": "Fold",
				"late": "Raise",
				"blind": "Raise"
			},
			"somebody calls": {
				"early": "Fold",
				"middle": "Call",
				"late": "Call",
				"blind": "Call"
			},
			"one raise was": {
				"early": "Fold",
				"middle": "Fold",
				"late": "Fold",
				"blind": "Fold"
			}
		},
		'different_suit_pictures':{
			"everybody folds": {
				"early": "Fold",
				"middle": "Fold",
				"late": "Raise",
				"blind": "Raise"
			},
			"somebody calls": {
				"early": "Fold",
				"middle": "Fold",
				"late": "Fold",
				"blind": "Call"
			},
			"one raise was": {
				"early": "Fold",
				"middle": "Fold",
				"late": "Fold",
				"blind": "Fold"
			}
		},
		'T9s-54s':{
			"everybody folds": {
				"early": "Fold",
				"middle": "Fold",
				"late": "Raise",
				"blind": " Fold"
			},
			"somebody calls": {
				"early": "Fold",
				"middle": "Call",
				"late": "Call",
				"blind": "Call"
			},
			"one raise was": {
				"early": "Fold",
				"middle": "Fold",
				"late": "Fold",
				"blind": "Fold"
			}
		}

	}

	function test(){
		
		var self = this;

		self.cardList = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
		self.suitList = ['K', 'B', 'H', 'P'];
		self.actionBeforeList = ["everybody folds", "somebody calls", "one raise was"];
		self.positionList = ["early", "middle", "late", "blind"];

		self.hand = {};
		self.situation = {};

		self.DOMObj = {
			"htmlObjCardList" : [
				document.getElementById("card_first"),
				document.getElementById("card_second")
			],
			"htmlObjSituation" : {
				"position" : document.getElementById("position"),
				"actionBefore" : document.getElementById("actions_before")
			},
			"answerButtonList" : document.querySelectorAll(".answer_button")
		};

		self.generateNewSituation = function(){		
			var card = self.cardList[getRandomInt(0, 12)];
			var suit = self.suitList[getRandomInt(0, 3)];
			self.hand.first = new cardClass(card, suit);

			do {
				card = self.cardList[getRandomInt(0, 12)];
				suit = self.suitList[getRandomInt(0, 3)];
			} while (self.hand.first.card == card && self.hand.first.suit == suit)
			
			self.hand.second = new cardClass(card, suit);

			self.situation.position = self.positionList[getRandomInt(0, 3)];
			self.situation.actionBefore = self.actionBeforeList[getRandomInt(0, 2)];
		};
		self.refresh = function(){
			self.generateNewSituation();

			var w_pos = parseInt(getKeyOfValue(self.cardList, self.hand.first.card)) * _WIDTH_POSITION_KOEFF;
			var h_pos = parseInt(getKeyOfValue(self.suitList, self.hand.first.suit)) * _HEIGHT_POSITION_KOEFF;
			self.DOMObj.htmlObjCardList[0].style.backgroundPosition = w_pos  + "% " + h_pos + "%";

			w_pos = parseInt(getKeyOfValue(self.cardList, self.hand.second.card)) * _WIDTH_POSITION_KOEFF;
			h_pos = parseInt(getKeyOfValue(self.suitList, self.hand.second.suit)) * _HEIGHT_POSITION_KOEFF;
			self.DOMObj.htmlObjCardList[1].style.backgroundPosition = w_pos  + "% " + h_pos + "%";

			self.DOMObj.htmlObjSituation.position.innerHTML = self.situation.position;
			self.DOMObj.htmlObjSituation.actionBefore.innerHTML = self.situation.actionBefore;
		};

		self.checkPosition = function(data){
			return (data.position[self.situation.position] == self.answer);
		}

		self.checkSituation = function(data){
			data.position = data.situation[self.situation.actionBefore];
			return self.checkPosition(data);
		}

		self.checkCards = function(data){
			var first = self.hand.first;
			var second = self.hand.second;

			if(
				first.card == "A" == second.card ||
				first.card == "Q" == second.card ||
				first.card == "K" == second.card
			) {
				data.situation = tableStateList["strong_pares"];
			}

			if( 
				first.card == "J" == second.card ||
				first.card == "T" == second.card
			) {
				data.situation = tableStateList["middle_pares"];
			}

			if(first.card == second.card && inBetween(2, 9, first.card)) {
				data.situation = tableStateList["99-22"];
			}

			if(
				first.card == "A" && second.card == "K" ||
				first.card == "K" && second.card == "A"
			) {
				data.situation = tableStateList["strong_A"]
			}

			if(
				first.card == "A" && inArray(["T", "Q", "J"], second.card) ||
				second.card == "A" && inArray(["T", "Q", "J"], first.card)
			) {
				data.situation = tableStateList["middle_A"];
			}

			if(
				first.suit == second.suit &&
				(
					first.card == "A" && inBetween(2, 9, second.card) ||
					second.card == "A" && inBetween(2, 9, first.card)
				)
			) {
				data.situation = tableStateList["A9s-A2s"];
			}

			if(
				first.suit == second.suit &&
				inArray(["A", "K", "Q", "J"], first.card) &&
				inArray(["A", "K", "Q", "J"], second.card)
			) {
				data.situation = tableStateList["one_suit_pictures"];
			}

			if(
				first.suit != second.suit &&
				inArray(["A", "K", "Q", "J"], first.card) &&
				inArray(["A", "K", "Q", "J"], second.card)
			) {
				data.situation = tableStateList["different_suit_pictures"];
			}

			if(
				first.suit == second.suit &&
				(
					first.card == "T" && second.card == "9" ||
					first.card == "9" && second.card == "T" ||
					inBetween(4, 9, first.card) && parseInt(second.card) > 3 && Math.abs(parseInt(first.card) - parseInt(second.card)) == 1
				)
			) {
				data.situation = tableStateList["T9s-54s"];
			}

			if(data.situation != undefined) {
				return self.checkSituation(data);
			}
			return "Fold";
		}

		self.checkAnswer = function(data){
			var t = self.checkCards(data);
			if(t !== "Fold")
				return t;
			else
				return self.answer == "Fold";
		}

		this.start = function(){
			self.refresh();
			
			for(var key in self.DOMObj.answerButtonList){
				self.DOMObj.answerButtonList[key].onclick = function(e) {
					self.answer = this.value;
					sweetAlert(self.checkAnswer({"answer" : this.value}));
					self.refresh();
				}
			}
		};
	}

	var Test = new test();
	Test.start();	
}