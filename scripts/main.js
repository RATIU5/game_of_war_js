/**

	The state of the game.
	@typedef {Object} State
	@property {Deck} cardDeck - The main deck of cards.
	@property {Deck} playerDeck - The player's deck of cards.
	@property {Deck} computerDeck - The computer's deck of cards.
	@property {Deck} tableDeck - The table's deck of cards.
	@property {string} winner - The name of the winner.
*/

/**
	The state of the game.
	@type {State}
*/
const state = {
	cardDeck: new Deck(),
	playerDeck: new Deck([]),
	computerDeck: new Deck([]),
	tableDeck: new Deck([]),
	winner: "",
};

/**
	Sets up the game by shuffling the deck and dealing cards to each player.
*/
function setup() {
	state.cardDeck.shuffle();
	const playerCards = state.cardDeck.deal(26);
	const computerCards = state.cardDeck.deal(26);
	state.playerDeck.pushCards(playerCards);
	state.computerDeck.pushCards(computerCards);
}

/**
	Plays the cards on the table and determines the winner.
	@param {number} playerNthCard - The position of the player's card in their deck.
	@param {number} computerNthCard - The position of the computer's card in their deck.
*/
function playCards(playerNthCard, computerNthCard) {
	// Pull the cards from the player's and computer's decks
	const playerCard = state.playerDeck.pullCardAtIndex(playerNthCard);
	const computerCard = state.computerDeck.pullCardAtIndex(computerNthCard);

	if (playerCard === null || computerCard === null) {
		console.error("Player or computer has no cards");
		return;
	}

	// Compare the cards
	if (playerCard.isHigherThan(computerCard)) {
		if (state.tableDeck.size > 0) {
			// Add the table cards to the player's deck
			const tableCards = state.tableDeck.pullAllCards();
			state.playerDeck.pushCards(tableCards);
		}
		// Add the player's and computer's cards to the player's deck
		state.playerDeck.pushCards([playerCard, computerCard]);
		if (state.computerDeck.size === 0) {
			// The computer has no cards left, the player wins
			console.log("Player wins!");
			state.winner = "Player";
			return;
		}
	} else if (playerCard.isLowerThan(computerCard)) {
		if (state.tableDeck.size > 0) {
			// Add the table cards to the computer's deck
			const tableCards = state.tableDeck.pullAllCards();
			state.computerDeck.pushCards(tableCards);
		}
		// Add the player's and computer's cards to the computer's deck
		state.computerDeck.pushCards([playerCard, computerCard]);
		if (state.playerDeck.size === 0) {
			// The player has no cards left, the computer wins
			console.log("Computer wins!");
			state.winner = "Computer";
			return;
		}
	} else {
		// The cards had the same rank, add them to the table deck
		state.tableDeck.pushCards([playerCard, computerCard]);
		console.log("Tie");
		if (state.playerDeck.size === 0 || state.computerDeck.size === 0) {
			// One of the players has no cards left, the game is a tie
			console.log("Game over");
			state.winner = "Tie";
			return;
		}
	}
}

/**
	Handles clicking on a card.
	@param {number} nthCard - The position of the clicked card in the player's deck.
*/
function onCardClick(nthCard) {
	if (state.winner === "") {
		// Play the player's selected card and the first card from the computer's deck
		playCards(nthCard, 0);
	}
}

// Run the game
runGame(state, setup, onCardClick);
