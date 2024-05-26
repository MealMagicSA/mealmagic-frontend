import { LocalStorage } from "./storage";

export class Carrinho {
  constructor() {
    this.itens = LocalStorage.get("carrinho");

    this.updateCounter();
  }

  getAll = () => {
    return this.itens;
  };

  add = (receita) => {
    const newItem = this.transform(receita);
    const hasDuplicate = this.itens.some((item) => item.id === newItem.id);

    // verificar que nenhum dos itens tem o mesmo id / duplicado hehehehe
    if (!hasDuplicate) {
      this.itens.push(newItem);

      this.saveCart();
      this.updateCounter();
    }
  };

  // Transformar os dados da receita
  transform = (receita) => {
    return {
      ...receita,
      // Aqui fica qualquer novos dados que deve ser relacionado na lista de compras
      quantidade: 1,
    };
  };

  updateQuantity = (id, quantidade) => {
    this.itens = this.itens.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantidade,
        };
      }

      return item;
    });

    this.saveCart();
  };

  delete = (id) => {
    this.itens = this.itens.filter(({ id: itemId }) => itemId !== id);

    this.updateCounter();
    this.saveCart();
  };

  saveCart = () => {
    LocalStorage.set("carrinho", this.itens);
  };

  hasItems = () => {
    return this.size() > 0;
  };

  updateCounter = () => {
    document.querySelector(".cart-counter").innerText = this.size() ?? 0;
  };

  size = () => {
    return this.itens.length;
  };

  limpar = () => {
    this.itens = [];
    LocalStorage.set("carrinho", null);
  };
}
