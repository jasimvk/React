import React from "react";
import {  useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

export default function Layout({ children }: any) {
  const { currentUser } = useAppSelector((state: RootState) => state.user);
//   const { allUsers } = useAppSelector((state: RootState) => state.allUsers);

//   console.log("===>>> user info is here", currentUser);
//   console.log("===>>> allUsers are here", allUsers);
//   useEffect(() => {
//     if (currentUser) {
//       console.log("logged in", currentUser);
//     } else {
//       console.log("logged out");
//     }
//   });
const SignOut=()=>{

}
const SignIn=()=>{
    
}
  return (
    <>
      {currentUser&&currentUser.userName ? (
        <button onClick={SignOut}>SignOut - {currentUser?.userName}</button>
      ) : (
        <><p>{currentUser?.userName}</p><button onClick={SignIn}>SignOut</button></>
      )}
    </>
  );
}
