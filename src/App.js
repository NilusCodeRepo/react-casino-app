import DisplayResults from './DisplayResults';
import Header from './Header/Header'
import Login from './Login';
import {useState,useEffect} from 'react'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Footer from './Footer'


function App() {
  let val=9.99
  let userInfo={}
  const [Balance,setBalance]=useState(val)
  const [playerName,setPlayerName]=useState("Guest")
  const [open, setOpen] = useState(true)
  
  
  useEffect(() => {
     userInfo = JSON.parse(localStorage.getItem('userInfo'));
   
  }, [Balance]);


  
  

  useEffect(() => {
    localStorage.setItem('Balance', JSON.stringify(Balance));
  }, [Balance]);

  const updateBalance=(Bal,mode)=>{
      setBalance(Balance=>mode==='CR'?Balance + Bal:Balance - Bal)
    if(Balance <=0){
      setBalance(9.99)

    }

  }

  const updatePlayerName=(name)=>{
    setPlayerName(name)
  }

  const handleClose = () => {
    setOpen(!open)
  }

 

  return (
    <div className="App">
      <Header heading={userInfo.name} balance={Balance}/>
      {Balance<=0 && 
      
      <Snackbar open={open}>
      <Alert variant="filled" severity="error" onClose={handleClose}>You are out of money, The game is over!</Alert>
    </Snackbar>

  }
      <DisplayResults  updateBalance={updateBalance} balance={Balance} />
      <Footer />
    </div>
  );
}

export default App;
