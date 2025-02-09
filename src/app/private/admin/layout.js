import Sidebar from '@/components/admin/Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="mt-[4.7rem] flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-zinc-100 dark:bg-zinc-900">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
