import UserSection from '@/components/admin/UserSection';
import ProductSection from '@/components/admin/ProductSection';
import OrderSection from '@/components/admin/OrderSection';

export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Menu admin</h1>
      <UserSection />
      <ProductSection />
      <OrderSection />
    </div>
  );
}
