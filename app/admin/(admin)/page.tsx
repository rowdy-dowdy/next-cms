import HomeSideBar from "@/components/admin/HomeSideBar";
import AdminHomeContent from "@/components/admin/content/AdminHomeContent";


async function getData() {
  await new Promise((res) => setTimeout(() => {
    res(1)
  }, 5000))

  const res = await fetch('/api/admin/database/data-types')
  if (!res.ok) {
    return {user: null}
  }

  return res.json();
}

export default async function Page() {

  const data = await getData()

  console.log({data})

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
