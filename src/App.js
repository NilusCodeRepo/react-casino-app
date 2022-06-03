import DisplayResults from './DisplayResults';
import Header from './Header/Header'
import Login from './Login';
import {useState} from 'react'

function App() {
  let val=9.99
  const [Balance,setBalance]=useState(val)

  const updateBalance=(Bal,mode)=>{
      setBalance(Balance=>mode==='CR'?Balance + Bal:Balance - Bal)

  }

  let heading="Nilam Bhagde"
  let bal=0.0;

  return (
    <div className="App">
      <Header heading={heading} balance={Balance}/>
      <DisplayResults  updateBalance={updateBalance}/>
      
    </div>
  );
}

export default App;
