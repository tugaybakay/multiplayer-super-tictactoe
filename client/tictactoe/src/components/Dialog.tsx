import CreateRoomModal from "./modals/CreateRoomModal";
import InviteDialog from "./modals/InviteDialog";
import UsernameDialog from "./modals/UsernameDialog";
import socket from "../socket";
import { useRef, useEffect, useState } from "react";


function Dialog() {
  let [isSetUsername,setIsSetUsername] = useState(false);
  let [isCreatedRoom,setIsCreatedRoom] = useState(false);
  let [isJoinedRoom,setIsJoinedRoom] = useState(false);
  let modal = useRef(null)
  let username: String = "";
  

  useEffect(()=> {
    if(modal.current) {
      modal.current.showModal();
    }
  },[])
  
  if(isJoinedRoom) {
    modal.current?.close();
  }

  useEffect(() => {
    socket.on("game-ready", () => {
      modal.current?.close();
    });
  
    socket.on("error", (msg) => {
      window.alert(msg);
    });
  
    socket.on("player-created",(name: String) => {
      username = name;
      setIsSetUsername(true);
    })

    socket.on("created-room",() => setIsCreatedRoom(true))

    socket.on("joined-room",() => {
      setIsJoinedRoom(true);
    })

    return () => {
      socket.removeAllListeners();
    }
  },[socket])

  function handleKeyDownEvent(event: KeyboardEvent) {
    if(event.key === "Escape") {
      event.preventDefault();
    }
  }

  function usernameSubmitted(username: String) {
    socket.emit("new-user",username);

  }

  function createRoom(xo: String) {
    socket.emit("create-room",xo);
   
  }

  function joinRoom(joinRoomID: FormDataEntryValue | null) {
    socket.emit("join-room",joinRoomID);
    
  }

  return(
    <dialog onKeyDown={handleKeyDownEvent} ref={modal} className="backdrop:bg-black backdrop:opacity-50 mx-auto my-auto rounded-md border">
      {!isSetUsername && <UsernameDialog onSubmit={usernameSubmitted}/>}
      {!isCreatedRoom && isSetUsername && <CreateRoomModal 
        createRoom={createRoom}
        joinRoom={joinRoom}
      />}
      {isCreatedRoom && <InviteDialog roomId={socket.id?.slice(0,5)}/>}
    </dialog>
  )
}

export default Dialog;