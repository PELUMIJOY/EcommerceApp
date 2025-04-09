import React, { useState, useEffect } from "react";
import { 
  Typography, 
  Table, 
  Tag, 
  Button, 
  Tabs, 
  Modal, 
  Spin, 
  Empty, 
  Collapse, 
  Timeline, 
  Divider,
  notification
} from "antd";
import { 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  TruckOutlined, 
  ShoppingOutlined,
  RightOutlined,
  DownloadOutlined,
  ReloadOutlined,
  FileDoneOutlined,
  CloseCircleOutlined,
  HourglassOutlined
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/helper";
import Indicator from "../../common/Indicator";
// import { formatCurrency } from "../../../utils/helper";

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const OrdersPage = () => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();
  const recentOrderId = location.state?.recentOrder;
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [trackingModalVisible, setTrackingModalVisible] = useState(false);
  

const IndicatorItems = [
    { name:<Link to="/">Home</Link> , isActive: false },
    { name: "order", isActive: true },
  ];

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, [user]);
  
  useEffect(() => {
    if (recentOrderId) {
      const order = orders.find(o => o.id === recentOrderId);
      if (order) {
        showOrderDetails(order);
      }
    }
  }, [recentOrderId, orders]);
  
  const fetchOrders = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // For demo, get from localStorage
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      // Filter orders for current user in a real app
      // For demo, we'll just use all orders
      setOrders(storedOrders);
      
      // If there's a highlighted order from checkout, open its details
      if (recentOrderId) {
        const order = storedOrders.find(o => o.id === recentOrderId);
        if (order) {
          setSelectedOrder(order);
          setDetailVisible(true);
        }
      }
    } catch (error) {
      notification.error({
        message: "Error fetching orders",
        description: error.message || "Failed to load your orders"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setDetailVisible(true);
  };
  
  const getStatusColor = (status) => {
    const statusMap = {
      "processing": "blue",
      "shipped": "cyan",
      "delivered": "green",
      "cancelled": "red",
      "pending": "orange"
    };
    return statusMap[status.toLowerCase()] || "default";
  };
  
  const getStatusIcon = (status) => {
    const iconMap = {
      "processing": <ClockCircleOutlined />,
      "shipped": <TruckOutlined />,
      "delivered": <CheckCircleOutlined />,
      "cancelled": <CloseCircleOutlined />,
      "pending": <HourglassOutlined />
    };
    return iconMap[status.toLowerCase()] || <ShoppingOutlined />;
  };
  
  const generateShippingUpdates = (order) => {
    const baseUpdates = [
      {
        date: new Date(order.date),
        status: "Order Placed",
        description: "Your order has been received and is being processed."
      }
    ];
    
    if (order.status === "processing") {
      baseUpdates.push({
        date: new Date(new Date(order.date).getTime() + 24 * 60 * 60 * 1000), // 1 day later
        status: "Payment Confirmed",
        description: "Payment has been successfully processed."
      });
    } else if (["shipped", "delivered"].includes(order.status)) {
      baseUpdates.push(
        {
          date: new Date(new Date(order.date).getTime() + 24 * 60 * 60 * 1000), // 1 day later
          status: "Payment Confirmed",
          description: "Payment has been successfully processed."
        },
        {
          date: new Date(new Date(order.date).getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days later
          status: "Order Processed",
          description: "Your order has been prepared and is ready for shipping."
        }
      );
      
      if (order.status === "shipped") {
        baseUpdates.push({
          date: new Date(new Date(order.date).getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days later
          status: "Order Shipped",
          description: `Your order has been shipped with ${order.trackingCompany || "our delivery partner"}.`
        });
      } else if (order.status === "delivered") {
        baseUpdates.push(
          {
            date: new Date(new Date(order.date).getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days later
            status: "Order Shipped",
            description: `Your order has been shipped with ${order.trackingCompany || "our delivery partner"}.`
          },
          {
            date: new Date(new Date(order.date).getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days later
            status: "Order Delivered",
            description: "Your order has been delivered successfully."
          }
        );
      }
    }
    
    return baseUpdates;
  };
  
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <Text strong>{id}</Text>
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => `${items.length} item${items.length > 1 ? 's' : ''}`
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => formatCurrency(total)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag icon={getStatusIcon(status)} color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" onClick={() => showOrderDetails(record)}>
          View Details
        </Button>
      )
    }
  ];
  
  const filteredOrders = orders.filter(order => {
    if (activeTab === "all") return true;
    return order.status.toLowerCase() === activeTab;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
       <Indicator items={IndicatorItems} />
      <Title level={2}>My Orders</Title>
      
      {loading ? (
        <div className="text-center p-16">
          <Spin size="large" />
          <p className="mt-4">Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <Empty
          description="You haven't placed any orders yet"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button type="primary" onClick={() => navigate('/')}>
            Start Shopping
          </Button>
        </Empty>
      ) : (
        <>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="mb-6"
          >
            <TabPane tab="All Orders" key="all" />
            <TabPane tab="Processing" key="processing" />
            <TabPane tab="Shipped" key="shipped" />
            <TabPane tab="Delivered" key="delivered" />
            <TabPane tab="Cancelled" key="cancelled" />
          </Tabs>
          
          <Table
            columns={columns}
            dataSource={filteredOrders}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="bg-white rounded-lg shadow"
          />
        </>
      )}
      
      {/* Order Detail Modal */}
      <Modal
        title={<span className="text-xl">Order Details</span>}
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={[
          <Button key="back" onClick={() => setDetailVisible(false)}>
            Close
          </Button>,
          <Button 
            key="track" 
            type="default"
            icon={<TruckOutlined />}
            onClick={() => {
              setDetailVisible(false);
              setTrackingModalVisible(true);
            }}
          >
            Track Order
          </Button>,
          <Button
            key="receipt"
            type="primary"
            icon={<DownloadOutlined />}
          >
            Download Receipt
          </Button>
        ]}
        width={800}
      >
        {selectedOrder && (
          <div className="p-3">
            <div className="flex justify-between items-center mb-4">
              <div>
                <Text className="text-lg font-semibold">Order {selectedOrder.id}</Text>
                <Text className="block text-gray-500">
                  Placed on {new Date(selectedOrder.date).toLocaleDateString()}
                </Text>
              </div>
              <Tag icon={getStatusIcon(selectedOrder.status)} color={getStatusColor(selectedOrder.status)} className="px-3 py-1 text-sm">
                {selectedOrder.status.toUpperCase()}
              </Tag>
            </div>
            
            <Divider />
            
            <div className="mb-6">
              <Text strong className="text-md">Items</Text>
              <div className="max-h-64 overflow-y-auto mt-2">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center py-3 border-b">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div className="flex-1">
                      <Text className="font-medium">{item.title}</Text>
                      <div className="text-sm text-gray-500">
                        <span>Qty: {item.quantity}</span>
                        <span className="mx-2">|</span>
                        <span>{formatCurrency(item.price)}</span>
                      </div>
                    </div>
                    <Text strong>{formatCurrency(item.price * item.quantity)}</Text>
                  </div>
                ))}
              </div>
            </div>
            
            <Collapse className="mb-4">
              <Panel header="Shipping Details" key="1">
                <p><strong>Address:</strong> {selectedOrder.shippingAddress}</p>
                <p><strong>Contact:</strong> {selectedOrder.contactNumber}</p>
                {selectedOrder.trackingNumber && (
                  <p>
                    <strong>Tracking Number:</strong> {selectedOrder.trackingNumber}
                  </p>
                )}
              </Panel>
              
              <Panel header="Payment Information" key="2">
                <p><strong>Method:</strong> {selectedOrder.paymentMethod === 'card' ? 
                  `${selectedOrder.paymentDetails?.cardType} ending in ${selectedOrder.paymentDetails?.last4}` : 
                  selectedOrder.paymentMethod}
                </p>
                
                <div className="mt-3">
                  <p className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(selectedOrder.subtotal)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{selectedOrder.deliveryFee === 0 ? 'FREE' : formatCurrency(selectedOrder.deliveryFee)}</span>
                  </p>
                  <Divider className="my-2" />
                  <p className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(selectedOrder.total)}</span>
                  </p>
                </div>
              </Panel>
            </Collapse>
            
            <div className="text-right mt-4">
              <Button 
                className="mr-3"
                onClick={() => navigate(`/product/${selectedOrder.items[0].id}`)}
              >
                Buy Again
              </Button>
              {["processing", "pending"].includes(selectedOrder.status.toLowerCase()) && (
                <Button danger>Cancel Order</Button>
              )}
            </div>
          </div>
        )}
      </Modal>
      
      {/* Order Tracking Modal */}
      <Modal
        title={<span className="flex items-center"><TruckOutlined className="mr-2" /> Track Your Order</span>}
        open={trackingModalVisible}
        onCancel={() => setTrackingModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setTrackingModalVisible(false)}>
            Close
          </Button>
        ]}
      >
        {selectedOrder && (
          <div>
            <div className="bg-gray-50 p-3 rounded mb-4">
              <div className="flex justify-between">
                <div>
                  <Text strong>Order ID: {selectedOrder.id}</Text>
                  <div className="text-sm text-gray-500">
                    {new Date(selectedOrder.date).toLocaleDateString()}
                  </div>
                </div>
                <Tag color={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.status.toUpperCase()}
                </Tag>
              </div>
            </div>
            
            <Timeline>
              {generateShippingUpdates(selectedOrder).map((update, idx) => (
                <Timeline.Item 
                  key={idx} 
                  color={idx === generateShippingUpdates(selectedOrder).length - 1 ? "green" : "blue"}
                >
                  <div className="font-semibold">{update.status}</div>
                  <div>{update.description}</div>
                  <div className="text-xs text-gray-500">
                    {update.date.toLocaleString()}
                  </div>
                </Timeline.Item>
              ))}
              
              {selectedOrder.status !== "delivered" && selectedOrder.status !== "cancelled" && (
                <Timeline.Item color="gray" dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                  <div className="font-semibold text-gray-500">Estimated Delivery</div>
                  <div className="text-gray-500">Your package will arrive soon.</div>
                  <div className="text-xs text-gray-500">
                    {new Date(new Date(selectedOrder.date).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </div>
                </Timeline.Item>
              )}
            </Timeline>
            
            {selectedOrder.trackingNumber && (
              <div className="mt-4 border-t pt-4">
                <Text strong>Tracking Number: </Text>
                <Text copyable>{selectedOrder.trackingNumber}</Text>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrdersPage;