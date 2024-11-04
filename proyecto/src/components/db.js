import { openDB } from 'idb';

const DB_NAME = 'MagicDecksDB';
const STORE_NAME = 'decks';

// Función para inicializar la base de datos
async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

// Guardar un mazo en IndexedDB
export async function saveDeck(deck) {
  const db = await initDB();
  await db.put(STORE_NAME, deck);
}

// Obtener todos los mazos de IndexedDB
export async function getDecks() {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
}

// Eliminar un mazo de IndexedDB
export async function deleteDeck(id) {
  const db = await initDB();
  return await db.delete(STORE_NAME, id);
}

// Agregar cartas a un mazo en IndexedDB
export async function addCardsToDeck(deckId, cards) {
  const db = await initDB();
  const deck = await db.get(STORE_NAME, deckId);
  
  if (deck) {
    // Si el mazo ya tiene cartas, las combinamos, si no, agregamos las nuevas
    deck.cards = deck.cards ? [...deck.cards, ...cards] : cards;
    await db.put(STORE_NAME, deck); // Guardamos el mazo actualizado
  } else {
    console.error('Deck not found');
  }
}