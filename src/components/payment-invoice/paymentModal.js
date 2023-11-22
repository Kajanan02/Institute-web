import React, {useEffect, useState} from 'react';
import { Customer, CurrencyType, PayhereCheckout, CheckoutParams } from '@payhere-js-sdk/client';
import formHandler from "../../utils/FormHandler";
import {validateEvent, validatePayment} from "../../utils/validation";
import axios from "axios";
import {useDispatch} from "react-redux";
import {toggleLoader} from "../../redux/actions";

const customerAttributes = {
    first_name: 'John',
    last_name: 'Doe',
    phone: '+94771234567',
    email: 'john@johndoe.com',
    address: 'No. 50, Highlevel Road',
    city: 'Panadura',
    country: 'Sri Lanka',
};

const checkoutAttributes = {
    returnUrl: 'http://localhost:3000/return',
    cancelUrl: 'http://localhost:3000/cancel',
    notifyUrl: 'http://localhost:8080/notify',
    order_id: 100,
    itemTitle: 'Demo Item',
    currency: CurrencyType.LKR,
    amount: 4500,
    hash:'244AF1A277D35648F129A09ED315B346',
};



const PaymentModal = (props) => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    function onPayhereCheckoutError(errorMsg) {
        alert(errorMsg);
    }

    const {
        handleChange,
        handleSubmit,
        setValue,
        values,
        initForm,
        deleteErrors,
        errors,
    } = formHandler(isPaymentModal, validatePayment);

    const dispatch = useDispatch();


    function isPaymentModal() {
        setFormSubmitted(true)
    }

    async function checkout(hash,amount,orderId) {
        // using async await
        try {
            const customer = new Customer(customerAttributes);

            const checkoutData = new CheckoutParams({
                returnUrl: 'http://localhost:3000/payment',
                cancelUrl: 'http://localhost:3000/payment',
                notifyUrl: 'http://localhost:8080/payment',
                order_id: orderId,
                itemTitle: 'Fees',
                currency: CurrencyType.LKR,
                amount: amount,
                hash:hash,
            });

            const checkout = new PayhereCheckout(customer, checkoutData, onPayhereCheckoutError);
            checkout.start();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
       if(!formSubmitted){
           return
       }
       dispatch(toggleLoader(true))
       let data = {}
       data.amount = values.amount
       data.orderId = parseInt(Math.random() * 10000000000000000)
        console.log(data)
        axios.post(`http://localhost:5000/api/payment-hash`, data)
            .then((res) => {
                console.log(res)
                if(res.data){
                    checkout(res.data,data.amount,data.orderId)
                }
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setFormSubmitted(false)
            dispatch(toggleLoader(false))

        })
    }, [formSubmitted]);

    return (
        <div>
        <div className={"row"}>
            <div className={"col-md-6"}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input name={"name"} placeholder={"Enter Name"}
                           className={`form-control ${errors.name ? "border-red" : ""}`}
                           id="exampleInputEmail1"
                           onChange={handleChange}
                           value={values.name || ""}
                           aria-describedby="emailHelp"/>
                    {errors.name && <p className={"text-red"}>{errors.name}</p>}
                </div>
            </div>
            <div className={"col-md-6"}>
                <label htmlFor="exampleInputEmail1" className="form-label">Amount</label>
                <input name={"amount"} placeholder={"Enter Amount"}
                       className={`form-control ${errors.amount ? "border-red" : ""}`}
                       id="exampleInputEmail1"
                       onChange={handleChange}
                       value={values.amount || ""}
                       aria-describedby="emailHelp"/>
                {errors.amount && <p className={"text-red"}>{errors.amount}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1"
                       className={`form-label ${errors.month ? "border-red" : ""}`}>Month</label>
                <select className={`form-control ${errors.month ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                        onChange={handleChange}
                        value={values.month || ""}
                        name={"month"}
                        aria-label="Default select example">
                    <option hidden>Month</option>
                    <option value="JANUARY">January</option>
                    <option value="FEBRUARY">February</option>
                    <option value="MARCH">March</option>
                    <option value="APRIL">April</option>
                    <option value="MAY">May</option>
                    <option value="JUNE">June</option>
                    <option value="JULY">July</option>
                    <option value="AUGUST">August</option>
                    <option value="SEPTEMBER">September</option>
                    <option value="OCTOBER">October</option>
                    <option value="NOVEMBER">November</option>
                    <option value="DECEMBER">December</option>
                </select>
                {errors.month && <p className={"text-red"}>{errors.month}</p>}
            </div>
            {/*<button onClick={checkout} style={{ cursor: "pointer" }}>Pay with Payhere</button>*/}
        </div>
            <div className={"text-end"}>

                <button
                    type="button"
                    className={"btn btn-success ms-auto"}
                    onClick={handleSubmit}
                >
                    Pay
                </button>
            </div>
        </div>
    );
};

export default PaymentModal;
