import { LocalStorage } from "../storage";

export class Carrinho {
  constructor() {
    this.itens = LocalStorage.get("carrinho");
  }

  buscar = () => {
    return this.itens;
  };

  criar = (receitaObjeto) => {
    const newItem = this.transform(receitaObjeto);

    if (!this.itens.some((item) => item.id === newItem.id)) {
      this.itens.push(newItem);
      LocalStorage.set("carrinho", this.itens);

      this.updateCounter();
    }
  };

  // Transformar os dados da receita
  transform = (receita) => {
    return {
      ...receita,
      // Aqui fica qualquer novos dados relacionado na lista de compras
      quantidade: 1,
    };
  };

  delete = (id) => {
    this.itens = this.itens.filter(({ id: itemId }) => itemId !== id);
    LocalStorage.set("carrinho", this.itens);

    this.updateCounter();
  };

  aumentarQuantidadeIten = (id) => {};

  diminuirQuantidadeIten = (id) => {};

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
