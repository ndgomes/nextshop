describe("Add product to cart", () => {
  it("should be able to navigate to the product page and add it to the cart", () => {
    cy.visit("http://localhost:3000");
    cy.get('a[href^="/product"]').first().click();

    cy.location("pathname").should("include", "/product");

    cy.get('button[type="button"]').contains("Add to Cart").click();
    cy.contains("Cart (1)").should("exist");
  });

  it("should not count duplicate products in the cart", () => {
    cy.visit("http://localhost:3000");
    cy.get('a[href^="/product"]').first().click();

    cy.location("pathname").should("include", "/product");

    cy.get('button[type="button"]').contains("Add to Cart").click();
    cy.get('button[type="button"]').contains("Add to Cart").click();

    cy.contains("Cart (1)").should("exist");
  });

  it("should be able to search for products and add them to the cart", () => {
    cy.visit("http://localhost:3000");

    cy.get('input[name="q"]').type("Edition").parent("form").submit();

    cy.location("pathname").should("include", "/search");

    cy.get('a[href^="/product"]').first().click();

    cy.location("pathname").should("include", "/product");

    cy.get('button[type="button"]').contains("Add to Cart").click();

    cy.contains("Cart (1)").should("exist");
  });
});
