import TweetsComponent from '../components/ui/tweets/tweets';
import Header from '../components/ui/header';

const App = () => {
  return (
    <div className='border-border border px-5 mx-auto max-w-[1500px] min-h-[90vh]'>
      <Header />
      <div className='container py-4'>
        <TweetsComponent />
      </div>
    </div>
  );
};

export default App;
