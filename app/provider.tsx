"use client"
import React, { useEffect } from 'react'
import axios from 'axios';
import { User } from '@clerk/nextjs/server';
import { UserDetailsContext } from '@/context/userDetailsContext';

function Provider({children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [userDetails, setUserDetails] = React.useState<any>();
    useEffect(() => {CreateNewUser}, [])
 

    const CreateNewUser = async () => {
        const result = await axios.post('/api/users', {});
        console.log(result.data);
        setUserDetails(result.data?.user);

    }
  return (
    <UserDetailsContext.Provider value={{userDetails, setUserDetails}}>
      <div>{children}</div>
    </UserDetailsContext.Provider>
  )
}

export default Provider
