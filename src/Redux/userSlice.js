import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:"user",
    initialState:{
     
        name: '',
        password: '',
        isLoggedIn: false,
    
    
    },
    reducers:{
        login:(state,action)=>{
         
          const val ={
              name:action.payload.name,
              password:action.payload.password,
              isLoggedIn:true
          }
        alert(action.payload.name)

        // return{
        //     name:action.payload.name,
        //       password:action.payload.password,
        //       isLoggedIn:true
        // }
               
           return val;
           
        },

        logout:(state)=>{
            const us={  
                name : 'CardCasino',
               password:'',
               isLoggedIn:!state.isLoggedIn,
              }
    
              return us
        }

    },
})

export const {login,logout}=userSlice.actions
export const selectUser=(state)=>state.name
export default userSlice.reducer 