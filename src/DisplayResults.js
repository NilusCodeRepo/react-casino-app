import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Button} from '@mui/material'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import diamond from './Assets/diamond.png'
import { Grid} from '@mui/material'
import cardData from './cardData'
import { useState } from 'react';
import Records from './Records';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const btnStyle={
      display:'inline-block',
      padding: '1px 5px',
      margin:'10px',
      marginTop:'0px'
  }
// const columns = [
//   { id: 'id', label: 'ID', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
// ];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

export default function DisplayResults(props) {
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [records, setRecords] = React.useState([{
    id: '',
    slot_1: '',
    slot_2: '',
    slot_3: '',
    time: '',
},]);
  const[cardImages, setCardImages]=useState({
    
        img1_id:0,
        img1:'./Assets/diamond.png',
        img2_id:2,
        img2:'./Assets/club.png',
        img3_id:3,
        img3:'./Assets/heart.png',
    
  })

  console.log("img1 : ",cardImages.img1)
  console.log("img2 : ",cardImages.img2)
  console.log("img3 : ",cardImages.img3)



    function getRandomImage(imgName){
        const cardArray=cardData.data.cards
        const randomNum=Math.floor(Math.random() * cardArray.length)

        let url=cardArray[randomNum].path
        const id=cardArray[randomNum].id
        let name=cardArray[randomNum].name
        let id_name=cardArray[randomNum].id_name

        console.log("random",randomNum)
        console.log("url1",url)    

       setCardImages(cardImages=>{
           return{
               ...cardImages,
              [id_name]:id,
               [imgName]:url,

           }

       })   
       
       return id
          
       }

const handleSpin=(event)=>{
    
    if(props.balance<=0){
        handleClose()
    }else{
    // $2 deducted for spining
    props.updateBalance(2,"DR")
    console.log("2 dedected")

    let idArray=[]
     // setCardImages("")
   let id1= getRandomImage("img1")
   idArray.push(id1)
    console.log(cardImages)
    let id2= getRandomImage("img2")
    idArray.push(id2)
    console.log(cardImages)
    let id3=getRandomImage("img3")
    idArray.push(id3)
    console.log(cardImages)
     
    //setrecords
      setRecords(records=>{
        const temp={
          id:records.length,

          slot_1: cardImages.img1,
          slot_2:cardImages.img2,
          slot_3:cardImages.img3,
          time:new Date().toLocaleString()

        }

        return [...records,temp]
      })

    let credits=checkSimilarCard(idArray)
    if(credits>0){
    props.updateBalance(credits,'CR')
    console.log(credits," Added")
    }
    }
    
}

function checkSimilarCard(idArray){
let credits=0    
let counter1=0,counter2=0,counter3=0,counter4=0
    idArray.map((id)=>{
        console.log("id : ",id)
        if(id==1){
            counter1++
        }else if(id==2){
            counter2++
        }else if(id==3){
            counter3++
        }else{
            counter4++
        }
    })

    if(counter1==3 || counter2==3 || counter3==3 || counter4 ==3)
    {
        console.log("Three similar symbols")

        //If got 3 spades cards
        if(counter4==3){

            credits=5

        }else{
            credits=2
        }
    }else if(counter1==2 || counter2==2 || counter3==2 || counter4 ==2){
        console.log("Two similar symbols")

        credits=0.5
    }else{
        console.log("Three different symbols")
    }

    return credits
}


  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const handleFakeSpin=(event)=>{
      setCardImages({
        img1_id:4,
        img1:'./Assets/spade.png',
        img2_id:4,
        img2:'./Assets/spade.png',
        img3_id:4,
        img3:'./Assets/spade.png',
      } )

      props.updateBalance(5,'CR')

  }

  return (
      <>
     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/*<TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>


      </TableContainer> */}

      <Records data={records}/>

      <div>
       <div style={{display:'inline-block',float:'left'}}>
       <Button variant="contained" color="error" onClick={handleOpen}>START GAME  </Button>
        </div> 

      {/* <TablePagination
        style={{display:'inline-block',float:'right'}}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}      
      /> */}

    </div>

    </Paper>

    {/* model code */}

    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <div>
    <Grid sx={{ flexGrow: 1 }} container spacing={12}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing='12'>
        
            <Grid item>
              <Paper
                sx={{
                  height: 140,
                  width: 100,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                  
                    <img  src={require(''+cardImages.img1)}  style={{height:140,width:100}} alt="card1"/>
              </Paper>    
            </Grid>
        
            <Grid  item>
              <Paper
                sx={{
                  height: 140,
                  width: 100,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                    <img  src={require(''+cardImages.img2)} style={{height:140,width:100}} alt="card2"/>

              </Paper>    
            </Grid>
        
            <Grid item>
              <Paper
                sx={{
                  height: 140,
                  width: 100,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                    <img  src={require(''+cardImages.img3)} style={{height:140,width:100}} alt="card3"/>

              </Paper>    
            </Grid>
        
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing='12'>
         <div>
                <Button variant='contained' color='error' style={btnStyle} onClick={handleSpin}>SPIN</Button>
                <Button variant='contained' color='error'style={btnStyle}  onClick={handleFakeSpin}>FAKE SPIN</Button>
                <Button variant='contained' value={12} color='error' style={btnStyle} onClick={handleClose}>CLOSE</Button>
         </div>       
        </Grid>
      </Grid>

      

      </Grid>
    </div>
  </Box>
</Modal>
</>


  );
}
