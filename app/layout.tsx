import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import Nav from "@/app/components/nav";
   
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>T Gamess</title>
      </head>
      <body>
      <Header/>
      <Nav/>
        {children}
      <Footer/>
      </body>
    </html>
  );
}
