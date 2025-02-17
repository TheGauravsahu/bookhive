import { auth } from "@/auth";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  
  if (!req.auth && pathname.startsWith("/books/add")) {
    const newUrl = new URL("/login?redirect=books/add", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  const isProtectedBookRoute =
    pathname.startsWith("/books/") && pathname !== "/books";

  if (!req.auth && isProtectedBookRoute) {
    const newUrl = new URL("/login?redirect=books", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
