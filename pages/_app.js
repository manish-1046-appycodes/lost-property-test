import '../styles/style.scss'
import '../styles/react-date-range/styles.css'; // main css file
import '../styles/react-date-range/theme/default.css'; // theme css file

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page)

  return (
    getLayout(<Component {...pageProps} />)
  )
}

export default MyApp
