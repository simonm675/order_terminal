import burgers from "./burger.json";
import sides from "./sides.json";
import subs from "./subs.json";
import bowls from "./bowls.json";
import dips from "./dips.json";
import getraenke from "./drinks.json";

// Hilfsfunktion zur Generierung von IDs
let idCounter = 1;
const generateId = () => idCounter++;

// Funktion, um IDs zu den Produkten hinzuzufügen
const addIdsToProducts = (products) => {
  return products.map((product) => ({
    ...product,
    id: generateId(),
  }));
};

// Kombiniere alle Produkte und füge IDs hinzu
const Products = [
  ...addIdsToProducts(burgers),
  ...addIdsToProducts(sides),
  ...addIdsToProducts(subs),
  ...addIdsToProducts(bowls),
  ...addIdsToProducts(dips),
  ...addIdsToProducts(getraenke),
];

export default Products;
