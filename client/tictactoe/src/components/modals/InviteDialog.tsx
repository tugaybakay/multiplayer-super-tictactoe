import { MouseEventHandler } from "react";
import React from "react";


function InviteDialog({roomId}) {

  function copyToClipboard(event: 	React.MouseEvent<HTMLInputElement>) {
    const value = event.target.value;
    navigator.clipboard.writeText(value);
    event.target.value = "copied!";
    setTimeout(() => {
      event.target.value = value;
    }, 550);
  }

  return(
    <div className="p-6 text-center text-2xl font-semibold">
      <h3 className="mb-2">Share this link!</h3>
      <input 
      onClick={copyToClipboard}
      className="dialog-input font-normal text-center cursor-pointer" 
      readOnly
      value={roomId}
      />
      <p className="text-xl font-normal m-3">or</p>
      <h3 className="mb-2">Share this ID!</h3>
      <input
       onClick={copyToClipboard}
       className="dialog-input font-normal text-center cursor-pointer" 
       value={roomId}
       readOnly/>
    </div>
  )
}

export default InviteDialog;