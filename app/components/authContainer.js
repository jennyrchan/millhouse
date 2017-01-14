const authContainer = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar />
      {children}
    </div>
)
export default authContainer;

// What is the purpose of this authContainer file? Isn't this code already in main.jsx?
