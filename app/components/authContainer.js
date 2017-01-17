import Cart from './Cart';

const authContainer = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar />
      <div className="col-xs-9">
        {children}
      </div>
      <div>
        <Cart />
      </div>
    </div>
)
export default authContainer;

// What is the purpose of this authContainer file? Isn't this code already in main.jsx?
