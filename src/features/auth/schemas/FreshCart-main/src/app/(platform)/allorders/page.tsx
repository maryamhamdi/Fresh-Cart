import OrdersScreen from "@/src/features/orders/screens/ordersScreen";
import { getOrders } from "@/src/features/orders/server/orders.actions";
import { Order } from "@/src/features/orders/types/ordsers.types";

export default async function OrdersPage() {
  let orders: Order[] = [];
  
  try {
    orders = await getOrders();
  } catch (error) {
    // User not authenticated or error fetching orders
    orders = [];
  }

  return <OrdersScreen orders={orders} />;
}
