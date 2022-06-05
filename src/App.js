import DisplayResults from './DisplayResults';
import Header from './Header/Header'
import Login from './Login';
import {useState,useEffect} from 'react'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Footer from './Footer'
import { CenterFocusStrong, ConstructionOutlined } from '@mui/icons-material';
import bg from './Assets/Teen-Patti.png'


function App() {
  let val=9.99
  const [Balance,setBalance]=useState(val)
  const [playerName,setPlayerName]=useState("CardCasino")
  const[loggedIn,setLoggedIn]=useState(false)
  const [open, setOpen] = useState(true)
  const [userInfo, setUserInfo] = useState({
    name: '',
    password: '',
    isLoggedIn: false,
});
  
let info
  const updateUserInfo=(values)=>{
 console.log("in APP")
 console.log(values)
 setLoggedIn(!loggedIn)
 const a=loggedIn?'':setBalance(9.99)
setPlayerName(values)
  }

console.log("render",playerName,loggedIn)
  


  useEffect(() => {
    localStorage.setItem('Balance', JSON.stringify(Balance));
  }, [Balance]);

  useEffect(() => {
    info = JSON.parse(localStorage.getItem('userInfo'));
    console.log("useeffect")
    setPlayerName(info.name)
    console.log(info.name,info.isLoggedIn)
  }, [loggedIn]);

  const updateBalance=(Bal,mode)=>{
      setBalance(Balance=>mode==='CR'?Balance + Bal:Balance - Bal)
    if(Balance >=0 && Balance < 1){
      // console.log("entry")
      // setLoggedIn(!loggedIn)
      // setPlayerName('CardCasino')
      
    }

  }

  const updatePlayerName=(name)=>{
    setPlayerName(name)
  }

  const handleClose = () => {
    setOpen(!open)

  }

 

  return (
    <div className="App" >
      <Header heading={playerName}   balance={Balance}  logState={loggedIn} updateUserInfo={updateUserInfo}/>
      {Balance<=0 && 
      
      <Snackbar open={open}>
      <Alert variant="filled" severity="error" onClose={handleClose}>You are out of money, The game is over!</Alert>
    </Snackbar>

  }
    {loggedIn?
      <DisplayResults  updateBalance={updateBalance} balance={Balance} />
      :
      console.log("user not logged in")
    }
      <Footer />
    </div>
  );
}

export default App;
