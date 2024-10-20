import { z } from "zod";
import data from "../data.json";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // DEV NOTE: simulate a delay for show loading on Home page
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const { searchParams } = request.nextUrl;

  const query = z.string().parse(searchParams.get("q"));

  const products = data.products.filter((product) =>
    product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );

  return Response.json(products);
}
