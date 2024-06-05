import {
  ClientStore,
  Schema,
  SchemaValue,
  ArrayOf,
  EventType,
} from "client-web-storage";
import { clientStorageConfig } from "./config.store";
import { ingredientsSchema, stepsSchema } from "./recipes.store";

const cartSchema = new Schema("cartSchema", {
  title: new SchemaValue(String, true),
  description: new SchemaValue(String, false, ""),
  image: new SchemaValue(String, true),
  ingredients: new SchemaValue(ArrayOf(ingredientsSchema), false),
  steps: new SchemaValue(ArrayOf(stepsSchema), false),
  quantity: new SchemaValue(Number, false, 1),
});

export const cart = new ClientStore(
  "cartSchema",
  cartSchema,
  clientStorageConfig
);

(() => {
  const updateCartCounter = (amount) => {
    document.querySelector(".cart-counter").innerText = amount ?? 0;
  };

  cart.subscribe(async (eventType) => {
    switch (eventType) {
      case EventType.READY:
      case EventType.LOADED:
      case EventType.CREATED:
      case EventType.REMOVED:
        updateCartCounter(await cart.size());
        break;
    }
  });
})();
