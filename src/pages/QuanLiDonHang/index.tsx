import OrderFilter from './components/OrderFilter';
import OrderForm from './components/OrderForm';
import OrderTable from './components/OrderTable';
import './index.css'
const OrderPage = () => {
    return (
        <div className="page">
            <h2>Quản lý đơn hàng</h2>

            <div className='filter'>
                <OrderFilter />
            </div>

            <div className="container">
                <div className="form">
                    <OrderForm />
                </div>

                <div className="table">
                    <OrderTable />
                </div>
            </div>
        </div>
    );
};

export default OrderPage;