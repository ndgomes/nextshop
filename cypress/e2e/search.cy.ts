describe("Search products", () => {
  it("should be able to search for products", () => {
    cy.visit("/");

    cy.get('input[name="q"]').type("Edition").parent("form").submit();

    cy.location("pathname").should("include", "/search");
    cy.location("search").should("include", "q=Edition");

    cy.get('a[href^="/product"]').should("exist");
  });

  it("should not be able to visit the search page without searching query", () => {
    cy.on("uncaught:exception", () => {
      return false;
    });

    cy.visit("/search");
    cy.location("pathname").should("equal", "/");
  });
});
