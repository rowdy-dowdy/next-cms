import HomeSideBar from "@/components/admin/HomeSideBar";
import AdminHomeContent from "@/components/admin/content/AdminHomeContent";

export default function Page() {
  return (
    <div className="w-full h-full flex">
      <div className="flex-none">
        <HomeSideBar />
      </div>
      <div className="flex-grow min-w-0">
        <AdminHomeContent data={[]} />
      </div>
    </div>
  );
}
