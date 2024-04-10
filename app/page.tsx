import dynamic from 'next/dynamic';
//to deploy the app

const App = dynamic(() => import('./App'), { ssr: false })

export default App;