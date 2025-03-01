import {Metadata} from "next";
import '@styles/globals.css';
import {Toaster} from "sonner";
import Nav from "@components/Nav";
import Provider from "@components/Provider";


export const metadata: Metadata = {
    title: "PromptBöl",
    description: "Bolis & Koris",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">

        <body>
        <Provider>


            <div className="main">
                <div className="gradient"></div>
            </div>

            <main className="app">
                <Nav/>
                {children}
            </main>


        </Provider>

        <Toaster/>
        </body>
        </html>
    );
}
