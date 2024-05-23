import { LocalStorage } from "../storage";

export class Carrinho {
  constructor() {
    this.itens = LocalStorage.get("carrinho");

    this.updateCounter();
  }

  buscar = () => {
    return this.itens;
  };

  criar = (receitaObjeto) => {
    console.log(receitaObjeto);
    const newItem = this.transform(receitaObjeto);

    const test = [true, false, true, false];

    // verificar que nenhum dos itens tem o mesmo id / duplicado hehehehe
    if (!this.itens.some((item) => item.id === newItem.id)) {
      this.itens.push(newItem);
      LocalStorage.set("carrinho", this.itens);

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

    console.log(this.itens);

    this.saveCart();
  };

  delete = (id) => {
    this.itens = this.itens.filter(({ id: itemId }) => itemId !== id);

    this.updateCounter();
    this.saveCart();
  };

  aumentarQuantidadeIten = (id) => {};

  diminuirQuantidadeIten = (id) => {};

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
