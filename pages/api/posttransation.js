
const handler = async (req, res) => {
    // Update status into Orders table after checking the transaction status
    if(req.body.STATUS =='TXN_SUCCESS'){
        await Order.findOneAndUpdate({orderId: req.body.ORDERID}, {status: 'Paid' , paymentInfo: JSON.stringify(req.body)})
    }
    else if(req.body.STATUS == ' PENDING'){
        await Order.findOneAndUpdate({orderId: req.body.ORDERID}, {status: 'Pending', paymentInfo: JSON.stringify(req.body)})
    }
    
    // Initiate Shipping

    // Redirect user to the order confirmation page
    res.redirect('/order' , 200)
}
export default connectDb(handler);