import TweetsComponent from '../components/ui/tweets/tweets';
import Header from '../components/ui/header';

const App = () => {
  return (
    <div className='border-border border px-5 mx-auto max-w-[1500px] min-h-[90vh]'>
      <Header />
      <div className='container py-4'>
        {/* <h1 className='text-xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'> */}
        {/*   Қазақ тілін үйренуге арналған ең тиімді платформа! */}
        {/* </h1> */}
        {/* <p className='max-w-2xl text-lg font-light text-foreground'> */}
        {/*   Soyle.kz, Tilqural, Bala.soyle.kz және Sozdik.kz платформаларын */}
        {/*   салыстырып, өзіңізге ең ыңғайлысын таңдаңыз. Біз сізге мазмұн, */}
        {/*   интерфейс және әдістемелік ерекшеліктер бойынша толық талдау ұсынамыз. */}
        {/* </p> */}

        <TweetsComponent />
      </div>
    </div>
  );
};

export default App;
