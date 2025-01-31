const ingredientsSection = '[data-cy="burgerIngredients"]';
const constructorSection = '[data-cy="burgerConstructor"]';
const overlaySection = '[data-cy="overlay"]';
const modalSection = '[data-cy="modal"]';
const submitOrderBtn = '[data-cy="submitOrder"]';
const numberId = '[data-cy="numberId"]';
const emptyBun = '[data-cy="emptyBun"]';
const emptyIngredients = '[data-cy="emptyIngredients"]';
const bunElement = 'Краторная булка N-200i';
const mainElement = 'Биокотлета из марсианской Магнолии';
const sauseElement = 'Соус фирменный Space Sauce';

describe('Тестируем функциональность конструктора', () => {
  beforeEach(() => {
    localStorage.setItem('refreshToken', 'fakeToken');
    cy.setCookie('accessToken', 'Bearer fake');
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredientsMock.json'
    }).as('getIngredients');

    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('order');

    cy.visit('/');
  });

  afterEach(() => {
    localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('Добавление ингредиента', () => {
    cy.wait('@getIngredients');

    cy.get(emptyBun).should('exist');

    cy.get(ingredientsSection)
      .contains(bunElement)
      .parent()
      .find('button')
      .click();

    cy.get(constructorSection).should('contain.text', bunElement);

    cy.get(emptyIngredients).should('exist');

    cy.get(ingredientsSection)
      .contains(mainElement)
      .parent()
      .find('button')
      .click();

    cy.get(constructorSection).should('contain.text', mainElement);

    cy.get(ingredientsSection)
      .contains(sauseElement)
      .parent()
      .find('button')
      .click();

    cy.get(constructorSection).should('contain.text', sauseElement);
  });

  describe('Проверка модального окна', () => {
    beforeEach(() => {
      cy.wait('@getIngredients');
      cy.get(modalSection).should('not.exist');
      cy.get(ingredientsSection).contains(bunElement).click();
    });
    it('Открытые модального окна', () => {
      cy.get(modalSection).should('be.visible');
      cy.get(modalSection).should('contain.text', bunElement);
    });
    it('Закрытие модального окна через кнопку', () => {
      cy.get(modalSection).find('button').click();
      cy.get(modalSection).should('not.exist');
    });
    it('Закрытие модального окна по клину на оверлей', () => {
      cy.get(overlaySection).click({ force: true });
      cy.get(modalSection).should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/api/auth/login', {
        fixture: 'login.json'
      }).as('login');
      cy.intercept('GET', '**/api/auth/user', {
        fixture: 'user.json'
      }).as('user');
    });
    it('Оформление заказа', () => {
      cy.get(submitOrderBtn).should('be.disabled');

      cy.get(emptyBun).should('exist');
      cy.get(emptyIngredients).should('exist');

      cy.get(ingredientsSection)
        .contains(bunElement)
        .parent()
        .find('button')
        .click();

      cy.get(ingredientsSection)
        .contains(mainElement)
        .parent()
        .find('button')
        .click();

      cy.get(ingredientsSection)
        .contains(sauseElement)
        .parent()
        .find('button')
        .click();

      cy.get(submitOrderBtn).should('not.be.disabled');

      cy.get(submitOrderBtn).click();

      cy.get(modalSection).should('be.visible');
      cy.wait('@order').its('response.statusCode').should('eq', 200);
      cy.get(numberId).should('contain.text', 67214);

      cy.get(modalSection).find('button').click();
      cy.get(modalSection).should('not.exist');

      cy.get(emptyBun).should('exist');
      cy.get(emptyIngredients).should('exist');
    });
  });
});
