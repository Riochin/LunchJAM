import QRPage from './qr/page';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function Home() {
  return (
    <div>
      <Header></Header>
      <main>
        <QRPage></QRPage>
      </main>
      <Footer></Footer>
    </div>
  );
}
