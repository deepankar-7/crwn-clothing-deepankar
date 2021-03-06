import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss"
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {

    const navigate = useNavigate();

    const { cartItems } = useContext(CartContext)

    const goToCheckOutHandler = () => {
        navigate('/checkout');
    }


    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map(item =>
                    <CartItem key={item.id} cartItem={item} />)}
            </div>
            <Button onClick={goToCheckOutHandler}>checkout</Button>
        </div>
    )
}

export default CartDropdown;