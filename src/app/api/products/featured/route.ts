import data from "../data.json";

export async function GET() {
  // DEV NOTE: simulate a delay for show loading on Home page
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const featuredProducts = data.products.filter((product) => product.featured);

  return Response.json(featuredProducts);
}
