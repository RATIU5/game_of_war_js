/**
 * Runs a game of cards with provided state and functions for setup and click handling.
 * @function
 * @param {object} state - The current state of the game.
 * @param {function} setupFn - The function to set up the game.
 * @param {function} clickFn - The function to handle user card clicks.
 */
function runGame(state, setupFn, clickFn) {
	const playerCardsContainer = document.getElementById("player_cards");
	if (!playerCardsContainer) {
		console.error("The HTML was modified and the player cards container was not found");
		return;
	}

	// Run the setup function
	setupFn();

	// Renders the top five cards in the player's deck
	function renderPlayerCards() {
		for (let i = 0; i < 5; i++) {
			const cardImage = state.playerDeck.cardAtIndex(i).getImage();

			const element = document.querySelector(`#player_card_${i}`);
			const image = element.querySelector("img");
			if (!image) {
				console.error("Cannot render player cards, image is undefined");
				return;
			}
			image.src = cardImage;
		}
	}

	// Render the player's cards immediately
	renderPlayerCards();

	let isMovingCard = false;
	playerCardsContainer.addEventListener("click", (e) => {
		// Winner was set, don't allow any more clicks
		if (state.winner !== "") {
			// Modify the content of the winner element or log an error if it doesn't exist
			const winner = document.getElementById("winner");
			if (!winner) {
				console.error("Cannot render winner, winner element is undefined");
				return;
			} else {
				winner.innerText = state.winner;
				// Remove the hidden class from the game over element
				document.getElementById("game_over")?.classList.remove("hidden");
				return;
			}
		}
		// Currently moving a card, don't allow another click
		if (isMovingCard) {
			return;
		}

		// A card element was clicked
		if (e.target.classList.contains("card")) {
			// The card is already in the table, don't allow another click with isMovingCard set to true
			isMovingCard = true;
			// Get the opponent's card image
			const oppCardImg = state.computerDeck.cardAtIndex(0).getImage();

			// Get the card element and its position
			const tableUserCard = document.getElementById("card_player_table");
			const cardElement = e.target;
			const userCardBox = cardElement.getBoundingClientRect();
			const tableUserCardBox = tableUserCard.getBoundingClientRect();
			const nthCard = parseInt(cardElement.id.slice(-1));

			// Can't figure out why this needs to be in a setTimeout
			// without it, the next card is animated in
			setTimeout(() => {
				clickFn(nthCard);
				renderPlayerCards();
			}, 200);

			tableUserCard.style.transform = `translate(calc(${
				userCardBox.right - tableUserCardBox.right + 5
			}px - 0.25rem), calc(${userCardBox.top - tableUserCardBox.top}px + 0.1rem))`;
			tableUserCard.firstChild.src = cardElement.firstChild.src;

			// Get the opponent's card element and its position
			const oppCard = document.getElementById("opp_card");
			const tableOppCard = document.getElementById("card_opponent_table");
			const oppCardBox = oppCard.getBoundingClientRect();
			const tableOppCardBox = tableOppCard.getBoundingClientRect();

			// Ensure the invisible cards are in the same position as the visible cards
			tableOppCard.style.transform = `translate(calc(${
				oppCardBox.right - tableOppCardBox.right + 5
			}px - 0.25rem), calc(${oppCardBox.top - tableOppCardBox.top}px + 0.1rem))`;
			tableOppCard.firstChild.src = cardElement.firstChild.src;

			// Delicate code, may be messy but it works
			// Don't touch it, it runs the animations of the cards moving
			setTimeout(() => {
				// Ensure the user's card is visible
				tableUserCard.classList.remove("hidden");
				tableUserCard.style.transform = "translate(0, 0)";

				// Ensure the opponent's card is visible
				tableOppCard.classList.remove("hidden");
				tableOppCard.style.transform = "translate(0, 0)";

				// Set the card images to the correct ones
				tableUserCard.firstElementChild.src = cardElement.firstElementChild.src;

				// Set the opponent's card image
				tableOppCard.firstElementChild.src = oppCardImg;

				// Add the transition class to the cards
				tableUserCard.classList.add("transition");
				tableOppCard.classList.add("transition");

				setTimeout(() => {
					setTimeout(() => {
						tableUserCard.style.transform = "translate(1000px, 0)";
						tableUserCard.classList.add("hidden");

						tableOppCard.style.transform = "translate(1000px, 0)";
						tableOppCard.classList.add("hidden");

						// Update the score board
						document.getElementById(
							"score",
						).innerHTML = `User: ${state.playerDeck.size}<br>Computer: ${state.computerDeck.size}`;

						setTimeout(() => {
							// Reset the table cards
							tableUserCard.style.transform = "translate(0, 0)";
							tableOppCard.style.transform = "translate(0, 0)";

							// The cards are no longer moving
							isMovingCard = false;
						}, 200);
					}, 200);
				}, 800);
			}, 100);
		}
	});
}
