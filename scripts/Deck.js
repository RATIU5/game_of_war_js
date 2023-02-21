/**
 * A deck of playing cards.
 * @class
 */
class Deck {
	/**
	 * Constructs a new deck of cards.
	 * @constructor
	 * @param {Array<Card>} cards - The initial set of cards in the deck. If not provided, a new deck will be created.
	 */
	constructor(cards) {
		if (typeof cards === "undefined") {
			this.cards = [];
			this._size = 0;
			for (const suit of SUITS) {
				for (const rank of RANKS) {
					this.cards.push(new Card(rank, suit));
					this._size++;
				}
			}
		} else {
			this.cards = cards;
			this._size = cards.length;
		}
	}

	/**
	 * The number of cards in the deck.
	 * @type {number}
	 * @readonly
	 */
	get size() {
		return this._size;
	}

	/**
	 * Gets the card at the specified index in the deck.
	 * @param {number} index - The index of the card to retrieve.
	 * @returns {Card} - The card at the specified index.
	 */
	cardAtIndex(index) {
		return this.cards[index];
	}

	/**
	 * Removes and returns the card at the specified index in the deck.
	 * @param {number} index - The index of the card to remove.
	 * @returns {Card|null} - The removed card or null if index is out of bounds.
	 */
	pullCardAtIndex(index = 0) {
		if (index < 0 || index >= this._size) {
			console.error("Cannot pull card, index out of bounds");
			return null;
		}
		const card = this.cards.splice(index, 1);
		// The size decreases by 1 as a result of the splice
		this._size--;
		return card[0];
	}

	/**
	 * Removes and returns all cards in the deck.
	 * @returns {Array<Card>} - The removed cards.
	 */
	pullAllCards() {
		const cards = this.cards.splice(0, this._size);
		// The size decreases to 0 as a result of the splice
		this._size = 0;
		return cards;
	}

	/**
	 * Adds a card to the bottom of the deck.
	 * @param {Card} card - The card to add.
	 */
	pushCard(card) {
		this.cards.push(card);
		// The size increases by 1 as a result of the push
		this._size++;
	}

	/**
	 * Adds multiple cards to the bottom of the deck.
	 * @param {Array<Card>} cards - The cards to add.
	 */
	pushCards(cards) {
		this.cards.push(...cards);
		// The size increases by the number of cards added
		this._size += cards.length;
	}

	/**
	 * Shuffles the order of the cards in the deck.
	 */
	shuffle() {
		const size = this._size;
		for (let i = size - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}

	/**
	 * Deals the specified number of cards from the top of the deck.
	 * @param {number} numCards - The number of cards to deal.
	 * @returns {Array<Card>} - The dealt cards.
	 */
	deal(numCards) {
		// If the number of cards to deal is greater than the number of cards in the deck, deal all cards and show a warning
		if (numCards > this._size) {
			console.warn("Card:deal(): Cannot deal more cards than in deck");
			const cards = this.cards.splice(0, this._size);
			this._size = 0;
			return cards;
		}
		const cards = this.cards.splice(0, numCards);
		this._size -= numCards;
		return cards;
	}
}

const SUITS = ["clubs", "diamonds", "hearts", "spades"];
const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
