describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredientsMock.json'
    }).as('getIngredients');
    cy.visit('http://localhost:4000');
  });
  it('passes', () => {
    cy.wait('@getIngredients').then((xhr) => {
      console.log(xhr);
    });
  });
});
