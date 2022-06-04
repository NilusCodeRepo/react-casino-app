import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import { TableContainer ,TableHead,Paper,TablePagination,Page} from '@mui/material'




  const imgStyle={
    display:'inline-block',
   width:'30px',
   height: '60px',

}

const Records = (props) => {


  
  console.log("REcords " ,props.data)
const url='https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Aceofspades.svg/1200px-Aceofspades.svg.png';
  return (
    <div style={{ height: 500 }}>
      {/* <DataGrid
        rows={props.data}
        columns={columns}
        pageSize={10}
      /> */}

<TableContainer component={Paper}   pageSize={12} options={{ sorting: true }}>
<TableHead >
          <TableRow>
            <TableCell >ID</TableCell>
            <TableCell align="right">Slot-1</TableCell>
            <TableCell align="right">Slot-2</TableCell>
            <TableCell align="right">Slot-3</TableCell>
            <TableCell  align="right">Time</TableCell>
          </TableRow>
        </TableHead>
<TableBody>

    
    { props.data.length>1?
    props.data.map(n =>(
      
        <TableRow key={n.id}>
        <TableCell component="th" scope="row">
          {n.id}
        </TableCell>
        <TableCell>{n.slot_1?<img src={require(""+n.slot_1)} style={imgStyle}></img>:""}</TableCell>
        <TableCell>{n.slot_2?<img src={require(""+n.slot_2)}  style={imgStyle}></img>:""}</TableCell>
        <TableCell>{n.slot_3?<img src={require(""+n.slot_3)}  style={imgStyle}></img>:""}</TableCell>

        <TableCell>{n.time}</TableCell>

      </TableRow>
      
     ) )
     : console.log("data not present") }
     <TableRow>
     <TablePagination
              rowsPerPageOptions={[10, { label: 'All', value: -1 }]}
              colSpan={4}
              count={props.data.length}
              rowsPerPage={10}
              page={1}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              
            />
     </TableRow>
</TableBody>
</TableContainer>
    </div>
  )
}

export default Records