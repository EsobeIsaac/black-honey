import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"
import "@styles/Global.css"

import Nav from '@utils/Nav'
import Provider from "@components/SessionProvider";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Footer from "@utils/Footer";




function Layout({ children, session }) {
  
  return (
    <html lang='en'>
      <body>
          <Provider session={session}>
        <AppRouterCacheProvider>
            <Nav/>
            <main style={{paddingTop: '8vh'}}>
                {children}
            </main>
            {/* <Footer/> */}
        </AppRouterCacheProvider>
          </Provider>
      </body>
    </html>
  );
}

export default Layout;
