/**
 * Represents a playing card with a rank and suit.
 */
class Card {
	/**
	 * @param {number} rank - The rank of the card.
	 * @param {string} suit - The suit of the card.
	 */
	constructor(rank, suit) {
		this.rank = rank;
		this.suit = suit;
	}

	/**
	 * Gets the rank of the card.
	 * @returns {number}
	 */
	getRank() {
		return this.rank;
	}

	/**
	 * Gets the suit of the card.
	 * @returns {string}
	 */
	getSuit() {
		return this.suit;
	}

	/**
	 * Determines whether the current card is higher than the given card.
	 * @param {Card} card - The card to compare.
	 * @returns {boolean} - True if the current card is higher than the given card, false otherwise.
	 */
	isHigherThan(card) {
		return this.rank > card.getRank();
	}

	/**
	 * Determines whether the current card is lower than the given card.
	 * @param {Card} card - The card to compare.
	 * @returns {boolean} - True if the current card is lower than the given card, false otherwise.
	 */
	isLowerThan(card) {
		return this.rank < card.getRank();
	}

	/**
	 * Determines whether the current card is equal to the given card.
	 * @param {Card} card - The card to compare.
	 * @returns {boolean} - True if the current card is equal to the given card, false otherwise.
	 */
	isEqualTo(card) {
		return this.rank === card.getRank();
	}

	/**
	 * Gets the file path of the image for the card.
	 * @returns {string} - The file path of the image for the card.
	 */
	getImage() {
		if (this.rank < 11) {
			return `/img/${this.rank}_of_${this.suit}.png`;
		}
		switch (this.rank) {
			case 11:
				return `/img/jack_of_${this.suit}.png`;
			case 12:
				return `/img/queen_of_${this.suit}.png`;
			case 13:
				return `/img/king_of_${this.suit}.png`;
			case 14:
				return `/img/ace_of_${this.suit}.png`;
			default:
				return "";
		}
	}
}
