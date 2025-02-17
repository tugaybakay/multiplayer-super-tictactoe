
function UsernameDialog({onSubmit}) {

  return(
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-2 text-center">Enter a username</h2>
      <form action={(formData :FormData) => {onSubmit(formData.get("username"))}}>
        <input 
          placeholder="Username"
          required
          name="username"
          className="dialog-input text-xl"
        />
        <button className="dialog-button px-3 py-1 text-xl">Submit</button>
      </form>
    </div>
  )
}

export default UsernameDialog;