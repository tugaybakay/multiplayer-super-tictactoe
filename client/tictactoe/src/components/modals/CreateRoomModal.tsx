function CreateRoomModal({createRoom, joinRoom}) {
  
  return(
  <div className="p-6 border rounded-md">
    <h2 className="text-center text-2xl mb-4 font-semibold max-sm:text-xl">Join to your friend!</h2>
    <form action={(formData: FormData) => joinRoom(formData.get("room-id"))} className="flex justify-center gap-2 mb-6 text-2xl max-sm:text-xl">
    <input
      placeholder="Enter Room ID"
      className="dialog-input"
      required
      name="room-id"
    />
    <button 
    className="dialog-button px-3 py-1 font-semibold">
      Join
      </button>
    </form>
    <p className="text-center text-2xl max-sm:text-xl">or</p>
    <h2 className="text-center m-3 font-semibold text-2xl max-sm:text-xl">Create a room</h2>
    <div className="flex gap-8 justify-center text-6xl max-sm:text-3xl font-semibold">
      <button className="dialog-button w-30 p-6" onClick={() => createRoom("x")}>X</button>
      <button className="dialog-button w-30 p-6" onClick={() => createRoom("?")}>?</button>
      <button className="dialog-button w-30 p-6" onClick={() => createRoom("y")}>Y</button>
    </div>
  </div>)
}

export default CreateRoomModal;