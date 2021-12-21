import { useEthers } from "@usedapp/core";

import  {useEffect} from "react";

import gql from "graphql-tag";
import axios from "axios";
import { print } from 'graphql'

const {account,active} = useEthers()

const GENERATE_VERIFICATION_TOKEN = gql`
  mutation generateVerificationToken( $data: LoginInput!) {
    generateVerificationToken( data: $data){
      int
    }
  }
`

const LOGIN = gql`
  mutation login( $data: VerificationTokenInput!) {
    login( data: $data)
  }
`
const login = async () =>{  
  console.log("here")
    const veriData = new FormData()
      veriData.append(
        'operations',
        JSON.stringify({
          query: print(GENERATE_VERIFICATION_TOKEN),
          variables: {
            data :account
          },
        })
      )
     
      
      const response = await axios.request({
        method: 'POST',
        url: 'https://api-testflight.soundverse.io/graphql',
        data: veriData,
      })

      console.log("response:  " + response)
      
      const loginData = new FormData()
      loginData.append(
        'operations',
        JSON.stringify({
          query: print(LOGIN),
          variables: {
            data : {ethAddress: account, signature: response.data.data.int}
          },
        })
      )
     
      const loginresponse = await axios.request({
        method: 'POST',
        url: 'https://api-testflight.soundverse.io/graphql',
        data: loginData,
      })

      console.log(loginresponse)
}
useEffect(()=>{
    if(account){
      login()


    }

},[account,active])