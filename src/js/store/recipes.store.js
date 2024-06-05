import {
  ArrayOf,
  ClientStore,
  Schema,
  SchemaValue,
  EventType,
} from "client-web-storage";
import { recipesList } from "../utils/recipesData";
import { clientStorageConfig } from "./config.store";

export const ingredientsSchema = new Schema("ingredients", {
  name: new SchemaValue(String, true),
  quantity: new SchemaValue(Number, true, 1),
});

export const stepsSchema = new Schema("steps", {
  step: new SchemaValue(Number, true),
  description: new SchemaValue(String, false, ""),
});

export const recipeSchema = new Schema("recipes", {
  title: new SchemaValue(String, true),
  description: new SchemaValue(String, false, ""),
  image: new SchemaValue(String, true),
  ingredients: new SchemaValue(ArrayOf(ingredientsSchema), false),
  steps: new SchemaValue(ArrayOf(stepsSchema), false),
});

export const recipeStore = new ClientStore(
  "recipes",
  recipeSchema,
  clientStorageConfig
);

recipeStore.on(EventType.READY, () => {
  recipeStore.loadItems(recipesList);
});
