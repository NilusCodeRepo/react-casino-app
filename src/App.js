import DisplayResults from './DisplayResults';
import Header from './Header/Header'
import Login from './Login';
import {useState,useEffect} from 'react'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


function App() {
  let val=9.99
  const [Balance,setBalance]=useState(val)
  const [playerName,setPlayerName]=useState("Guest")
  const [open, setOpen] = useState(true)

  


  useEffect(() => {
    localStorage.setItem('Balance', JSON.stringify(Balance));
  }, [Balance]);

  const updateBalance=(Bal,mode)=>{
      setBalance(Balance=>mode==='CR'?Balance + Bal:Balance - Bal)
    

  }

  const updatePlayerName=(name)=>{
    setPlayerName(name)
  }

  const handleClose = () => {
    setOpen(!open)
  }

  let heading="Nilam Bhagde"
  let bal=0.0;

  return (
    <div className="App">
      <Header heading={heading} balance={Balance}/>
      {Balance<=0 && <Snackbar open={open}>
      <Alert variant="filled" severity="error" onClose={handleClose}>You are out of money, The game is over!</Alert>
    </Snackbar>}
      <DisplayResults  updateBalance={updateBalance}/>
      
    </div>
  );
}

export default App;
